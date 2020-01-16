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

url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random"

querystring = {"number":"1"}

headers = {
    'x-rapidapi-host': "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    'x-rapidapi-key': "3a0f44ba75msh200632adcc2b317p12c823jsn901f6aeabc1b"
    }

recipes = list()

# Start listing users from the beginning, 1000 at a time.
page = auth.list_users()

ref = db.reference('recipes')
# rating_ref = ref.child('ratings')
# reviews_ref = ref.child('reviews')

if ref.get() is not None:
    num_recipes = len(ref.get())
else:
    num_recipes = 0

cwd = os.getcwd()  # Get the current working directory (cwd)
files = os.listdir(cwd)  # Get all the files in that directory
fpath = cwd + "\\backend\\database_init\\data.json"
# get recipes
with open(fpath, encoding='utf8') as json_file:
    r_json = json.load(json_file)

    for i in range(20):
        recipe = r_json['recipes'][i]
        new_recipe_ref = ref.push(recipe) # push the recipe to the database
        recipe_id = new_recipe_ref.key # id of the recipe
        recipe_ref = ref.child(recipe_id) # reference to the recipe
        recipe_ref.child('ratings').delete() # delete original ratings
        ratings = []
        _sum = 0
        # advanced: give rating using the following distribution
        # 5: 0.8, 4: 0.14 3: 0.03 2: 0.02 1: 0.01
        scores = [1, 2, 3, 4, 5]
        weights = [0.01, 0.02, 0.03, 0.14, 0.8]

        # want random 60% of the user rate on a recipe
        users_list = auth.list_users().users
        percent = .6
        population = num_users = int(len(users_list) * percent)
        samples_rating = random.choices(scores, weights, k=population)
        samples_users = random.sample(users_list, k=population)

        for idx, user in enumerate(samples_users):
            # give a random rating from 1 to 5
            # score = random.randint(1, 5)
            score = samples_rating[idx]
            ratings.append(score) # calculate avg rating
            _sum += score
            rating_ref = recipe_ref.child('ratings')
            rating_ref.update({user.uid : score})

            # give a random review based on the rating
            reviews_ref = recipe_ref.child('reviews')
            if score == 1:
                reviews_ref.update({user.uid: "very bad"})
            elif score == 2:
                reviews_ref.update({user.uid: "bad"})
            elif score == 3:
                reviews_ref.update({user.uid: "ok"})
            elif score == 4:
                reviews_ref.update({user.uid: "good"})
            else:
                reviews_ref.update({user.uid: "very good"})

        # generate random viewcounts
        viewcount = random.randint(50001,100001)
        viewcount_week = random.randint(1, 50000)
        recipe_ref.update({
            'avg_rating': _sum / len(ratings),
            'key': recipe_id,
            'viewcount': viewcount,
            'viewcount_week': viewcount_week
        })

# ref.child('-LtfJs4ds-UWfEWPy1rb').child('ratings').update({
#     "ddd": 5
# })

# with open('data.json', 'w') as outfile:
#     json.dump({'recipes': recipes}, outfile)