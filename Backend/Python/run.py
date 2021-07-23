import requests
import offsetValue
import getGame

from pymongo import MongoClient
connection = MongoClient('localhost', 27017) # connect to mongo_db
url = 'https://id.twitch.tv/oauth2/token?client_id=bvtuqo4e9i0uoscphs9pxqdrb2q2zn&client_secret=xg7svd475js30p3zg27vltcho3co1u&grant_type=client_credentials'

def run():
    response = requests.post(url)
    jsonResponse = response.json()
    authorization_token = jsonResponse['access_token']

    # Create/Update authorization collection in MongoDB
    gameConnect_database = connection['gameConnect'] # gameConnect database
    authorization_collection = gameConnect_database['igdbAuthorization']

    # Get current token key if it exists
    current_token = authorization_collection.find_one()

    # Update the current token with a new one
    old_token_set = {'igdb_token': current_token}
    new_token_set = {'$set' : {'igdb_token': authorization_token}}
    authorization_collection.update_one(old_token_set, new_token_set, upsert= True)

    # Run other two python files
    offsetValue.offset_value_check()
    getGame.getGames()
    
run()