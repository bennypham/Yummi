from flask import Flask, abort, make_response, jsonify
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS

import firebase_admin
from firebase_admin import db
from firebase_admin import credentials
from firebase_admin import auth

import random

import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import config
path_to_json = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'account_key.json')

cred = credentials.Certificate(path_to_json)
firebase_admin.initialize_app(cred, {
    'databaseURL' : config.databaseURL
})

root = db.reference('/')
recipe_ref = db.reference('recipes')
recipes = recipe_ref.get()

# Create the application instance
app = Flask(__name__)
api = Api(app)
CORS(app)

# get random recipe
@app.route("/api/get_random", methods=['GET'])
def get_random():
    _, recipe_detail = random.choice(list(recipes.items()))
    return recipe_detail

# get recipe detail by its id
@app.route("/api/recipe/<string:recipe_id>", methods=['GET'])
def get_recipe(recipe_id):
    # find id in recipes
    if recipe_id in recipes:
        return recipes[recipe_id]
    abort(404) # recipe id not found

# not found error
@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

# If we're running in stand alone mode, run the application
if __name__ == '__main__':
    app.run(port=5000, debug=True)