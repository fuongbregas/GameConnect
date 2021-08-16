# This file is used in getGame.py, getGenres.py and offsetValue.py to init a connection to MongoDB

try:
    from pymongo import MongoClient
except ImportError:
    raise ImportError('PyMongo is not installed')

uri = "mongodb://root:CMPE295BFALL2021@52.14.35.109:27017/?authSource=admin"

def createMongoClient():
    connection = MongoClient(uri)  # connect to AWS 52.14.35.109

    return connection 