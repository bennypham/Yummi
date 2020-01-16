import requests
import json
import random

import firebase_admin
from firebase_admin import db
from firebase_admin import credentials
from firebase_admin import auth

import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import config
path_to_json = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'account_key.json')

cred = credentials.Certificate(path_to_json)
firebase_admin.initialize_app(cred, {
    'databaseURL' : config.databaseURL
})

ref = db.reference('trending_recipes_by_week')
recipe_ref = db.reference('/').child('recipes')

recipes = recipe_ref.get()

tmp = []
# store top 10 recipes
for recipe_id, recipe in recipes.items():
    tmp.append({
        recipe_id: recipe['viewcount_week']
    })

tmp = sorted(tmp, key=lambda i: list(i.values())[0], reverse=True)
tmp = tmp[:10]
ret = []
for t in tmp:
    ref.update({list(t.keys())[0]: recipes[list(t.keys())[0]]})
