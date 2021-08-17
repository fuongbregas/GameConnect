import requests
from MongoDB_Object import MongoDB

import createMongoClient
connection = createMongoClient.createMongoClient()

# Get genre ID and name
url ='https://api.igdb.com/v4/genres/' # Get genre information
client_id = 'bvtuqo4e9i0uoscphs9pxqdrb2q2zn'

def createGenres():
    # MongoDB object for genre
    game_genre = MongoDB(database_name = 'gameConnect', collection_name = 'gameGenres')

    # MongoDB object for authorization token
    igdb_authorization = MongoDB(database_name = 'gameConnect', collection_name = 'igdbAuthorization')
    authorization_token = igdb_authorization.get_authorization_token() # token

    for x in range(37):
        # Get genre name
        raw_body = 'fields name; where id = ' + str(x) + ';'
        response = requests.post(url, raw_body, headers = {'Client-ID':client_id, 'Authorization':authorization_token,})

        # Check for connection
        if response.status_code != 200:
            print('Failed to get data: ', response.status_code)
        else:
            print('Connected in getGenres.py')
        
        jsonResponse = response.json() # Convert response to json
        
        # Genre dictionary
        if len(jsonResponse) != 0: # If response is not empty
            print(str(jsonResponse[0]))            
            game_genre.insert(jsonResponse[0]) # Insert into gameGenres database
        else:
            print("Empty response!")

def getGenres():
    gameConnect_database = connection['gameConnect']
    # List all collections
    list_of_collections = gameConnect_database.list_collection_names()

    # check if gameGenres collection is available
    if 'gameGenres' in list_of_collections:
        print('gameGenres collection exists') # Do nothing!
    else:
        # Create gameGenres
        createGenres()