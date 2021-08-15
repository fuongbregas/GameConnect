# This file is used in getGame.py, getGenres.py and offsetValue.py to init a connection to MongoDB

try:
    from pymongo import MongoClient
except ImportError:
    raise ImportError('PyMongo is not installed')

def createMongoClient():
    connection = MongoClient('localhost', 27017) # connect to mongoDB
    return connection