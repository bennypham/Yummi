import pickle

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

# load model
cwd = os.getcwd()  # Get the current working directory (cwd)
files = os.listdir(cwd)  # Get all the files in that directory
fpath = cwd + "\\backend\\recommendation\\model\\collab_model.pkl"
model = pickle.load(open(fpath, "rb"))

root = db.reference('/')
recipe_ref = db.reference('recipes')
recipes = recipe_ref.get()

# Get a database reference to our posts
ref = db.reference('users')

users = ref.get()

num_recommendations = 10

# function to sort by est
def takeSecond(elem):
    return elem[1]

# predict result
for user_uid, attr in users.items():
    user_ref = ref.child(f'{user_uid}').child('recommendation')
    recom = []
    count = 0
    ratings = attr['ratings']
    for recipe in recipes:
        if recipe not in ratings:
            prediction = model.predict(user_uid, recipe)
            # f.write(str(prediction) + "\n")
        else:
            prediction = model.predict(user_uid, recipe, ratings[recipe])
            # f.write(str(prediction) + "\n")
        recom.append((recipe, prediction.est))
    recom = sorted(recom, reverse=True, key=takeSecond)
    if len(recom) > 10:
        # return top 10
        for i in range(num_recommendations):
            user_ref.update({
                f"{i}": recom[i][0]
            })
    else:
        for i in range(len(recom)):
            user_ref.update({
                f"{i}": recom[i][0]
            })