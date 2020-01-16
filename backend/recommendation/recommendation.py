import pandas as pd

# Import database module.
import firebase_admin
from firebase_admin import db
from firebase_admin import credentials
from firebase_admin import initialize_app

import json
from surprise import Reader, Dataset, SVD
from surprise.model_selection import cross_validate
import pickle

import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import config
path_to_json = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'account_key.json')

cred = credentials.Certificate(path_to_json)
firebase_admin.initialize_app(cred, {
    'databaseURL' : config.databaseURL
})

# Get a database reference to our posts
ref = db.reference('users')

# Read the data at the posts reference (this is a blocking operation)
# print(ref.get())

users = ref.get()

# change data to dataframe
df_list = []
# restructure data as [user_id, recipe_id, rating]
for user_uid, ratings in users.items():
    for recipe_id, recipe_rating in ratings['ratings'].items():
        df_list.append([user_uid, recipe_id, recipe_rating])

df = pd.DataFrame(df_list, columns=['user_uid', 'recipe_id', 'rating'], dtype=float)

# print(df.head(3))
reader = Reader()

data = Dataset.load_from_df(df[['user_uid', 'recipe_id', 'rating']], reader)

# single value decomposition 
svd = SVD()
cross_validate(svd, data, measures=['RMSE', 'MAE'])

# fit the data
trainset = data.build_full_trainset()
svd.fit(trainset)

# save model
cwd = os.getcwd()  # Get the current working directory (cwd)
files = os.listdir(cwd)  # Get all the files in that directory
fpath = cwd + "\\backend\\recommendation\\model\\collab_model.pkl"
pickle.dump(svd, open(fpath, 'wb'))