import requests
import offsetValue
import getGame

from pymongo import MongoClient
connection = MongoClient('localhost', 27017) # connect to mongo_db
# Create/Update authorization collection in MongoDB
gameConnect_database = connection['gameConnect'] # gameConnect database

url = 'https://id.twitch.tv/oauth2/token?client_id=bvtuqo4e9i0uoscphs9pxqdrb2q2zn&client_secret=xg7svd475js30p3zg27vltcho3co1u&grant_type=client_credentials'

# Insert or update token of 'igdbAuthorization' MongoDB collection
def check_igdbAuthorization_existance(authorization_collection, authorization_token):
    # List all collections
    list_of_collections = gameConnect_database.list_collection_names()
    # Create json objects    
    new_token_set = {'igdb_token': authorization_token}

    if 'igdbAuthorization' in list_of_collections:
        # Update the current token with a new one    
        # Get current token key if it exists
        current_token = authorization_collection.find_one()
        old_token_set = {'igdb_token': current_token}
        authorization_collection.replace_one(old_token_set, new_token_set)
    else: 
        authorization_collection.insert_one(new_token_set)

def run():
    # Get authorization token from IGDB
    response = requests.post(url)
    jsonResponse = response.json()
    authorization_token = jsonResponse['access_token']

    # Create/Update authorization collection in MongoDB
    gameConnect_database = connection['gameConnect'] # gameConnect database
    authorization_collection = gameConnect_database['igdbAuthorization']
    
    check_igdbAuthorization_existance(authorization_collection, authorization_token)       

    # Run other two python files
    offsetValue.offset_value_check()
    getGame.getGames()
    
run()