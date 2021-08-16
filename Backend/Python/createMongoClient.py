# This file is used in getGame.py, getGenres.py and offsetValue.py to init a connection to MongoDB

try:
    from pymongo import MongoClient
except ImportError:
    raise ImportError('PyMongo is not installed')

def createMongoClient():
    connection = MongoClient('52.14.35.109',
                            username='root',
                            password='CMPE295BFALL2021',
                            authSource='gameConnect',
                            authMechanism='SCRAM-SHA-1') # connect to MongoClient('52.14.35.109',
                            

    return connection