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

root = db.reference('/')
recipe_ref = db.reference('recipes')

recipes = recipe_ref.get()

# references
u_ref = root.child('users')

# user ratings on recipes
for recipe_id, recipe in recipes.items():
    for user in auth.list_users().iterate_all():
        if user.uid in recipe['ratings']:
            users_ref = u_ref.child(f'{user.uid}').child('ratings')
            users_ref.update({
                recipe_id: recipe['ratings'][user.uid]
            })

# populate followers
users = auth.list_users().users
for user in auth.list_users().iterate_all():
    u_list = []
    # generate 5-10 uids
    following = random.randint(5, 10)
    follows_ref = u_ref.child(f'{user.uid}').child('follows')
    for i in range(following):
        u = random.choice(users)
        if u not in u_list and user != u:
            u_list.append(u.uid)
    follows_ref.update({
        "following": u_list,
        "num_followers": 0
    })

# calc num_followers of each user
for user in auth.list_users().iterate_all():
    following = u_ref.child(f'{user.uid}').child('follows').child('following').get()
    # iterate followers and increment num_follower of each user respectively
    for otr_users in following:
        tmp_ref = u_ref.child(f'{otr_users}').child('follows')
        tmp_val = tmp_ref.child('num_followers').get()
        tmp_val += 1
        tmp_ref.update({
            "num_followers": tmp_val
        })

# generate random saved recipes
for user in auth.list_users().iterate_all():
    s_list = []
    saved_recipes = u_ref.child(f'{user.uid}')
    # generate 5-10 recipes
    num_rand = random.randint(5, 10)
    for _ in range(num_rand):
        s = random.choice(list(recipes))
        if s not in s_list:
            s_list.append(s)
    saved_recipes.update({
        "saved_recipes": s_list
    })

# generate random created recipes by users
u_created = []

for recipe_id, recipe in recipes.items():
    u = random.choice(users)
    created_recipes = u_ref.child(f'{u.uid}')
    tmp = []
    tmp.append(recipe_id)
    created_recipes.update({
        "created_recipes": tmp
    })
    u_created.append(u.uid)