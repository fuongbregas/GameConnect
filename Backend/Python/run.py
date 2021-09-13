# For using .env
import os
from dotenv import load_dotenv
load_dotenv()

import requests
import offsetValue
import getGame
import getGenres

import createMongoClient
connection = createMongoClient.createMongoClient()

# Create/Update authorization collection in MongoDB
gameConnect_database = connection['gameConnect'] # gameConnect database

url = os.getenv('IGDB_URL')

# Insert or update token of 'igdbAuthorization' MongoDB collection
def save_token(authorization_collection, authorization_token):
    # List all collections
    #list_of_collections = gameConnect_database.list_collection_names()
    # Create json objects    
    

    #if 'igdbAuthorization' in list_of_collections:
    #    # Update the current token with a new one        
    #    current_token = authorization_collection.find_one() # Get current token key if it exists
    #    old_token_set = {'igdb_token': current_token}
    #    authorization_collection.replace_one(old_token_set, new_token_set) # Replace old token
    #else: 
    
    # New code:
    new_token_set = {'igdb_token': authorization_token}
    authorization_collection.insert_one(new_token_set) # Insert new token to DB

def run():
    # Get authorization token from IGDB
    response = requests.post(url)
    jsonResponse = response.json()
    authorization_token = jsonResponse['access_token']
    
    # Create/Update authorization collection in MongoDB
    gameConnect_database = connection['gameConnect'] # gameConnect database
    authorization_collection = gameConnect_database['igdbAuthorization']
    authorization_collection.remove() # Remove the old data from the collection
    save_token(authorization_collection, authorization_token)       

    # Run other python files
    getGenres.getGenres()
    offsetValue.offset_value_check()
    getGame.getGames()
    
run()