
from collections import defaultdict

from pandas.core.frame import DataFrame
from MongoDB_Object import MongoDB
import pandas as pd
import numpy as np 

list_users_saved_games = defaultdict()
list_users_genres = defaultdict()
jacard_sim = defaultdict()
genres_sim = defaultdict()

def getSavedGamesArrayFromUsers():
    user_data = MongoDB(database_name = 'gameConnect', collection_name = 'userData')
    records = user_data.get_all_saved_games()
    for rec in records:
        list_users_saved_games[rec['username']] = rec['saved_games']
        
def getGenres():  
    games_data = MongoDB(database_name = 'gameConnect', collection_name = 'gameData')
    #data = games_data.get_genre_id()
    for username,saved_games in list_users_saved_games.items():   
        list_users_genres[username] = []      
        for id in saved_games:
            genres = games_data.get_genre_id(int(id))      
            list_users_genres[username].append(genres)           

def getJacardSimFromSavedGames():
    df = pd.DataFrame.from_dict(list_users_saved_games, orient="index")   
    for i in range(0, len(df)):
        jacard_sim[df.index[i]] = []
        for j in range(0, len(df)):
           u1 = df.iloc[i].tolist()
           u2 = df.iloc[j].tolist()
           if(i==j):
               jacard_sim[df.index[i]].append(0.0)
           else:
                sim =  compute_jaccard_similarity_score(u1, u2)
                jacard_sim[df.index[i]].append(sim)
    
    jacard_sim_games_df = pd.DataFrame.from_dict(jacard_sim, orient="index")
    return (jacard_sim_games_df)

def getJacardSimFromSavedGenres():
    #np.random.seed(0)
    #df = pd.DataFrame([(k, v[0][0]) for k, v in list_users_saved_games.items()], 
                   #columns=['username', 'games_id'])
    df = pd.DataFrame.from_dict(list_users_genres, orient="index")
    #print(df)
    
    for i in range(0, len(df)):
        genres_sim[df.index[i]] = []
        for j in range(0, len(df)):
            u1 = list(filter(None,df.iloc[i].tolist()))
            u2 = list(filter(None,df.iloc[j].tolist()))
            flatten_u1 = [item for sublist in u1 for item in sublist]
            flatten_u2 = [item for sublist in u2 for item in sublist]
            if(i==j):
               genres_sim[df.index[i]].append(0.0)
            else:
                sim =  compute_jaccard_similarity_score(flatten_u1, flatten_u2)
                genres_sim[df.index[i]].append(sim)
    
    jacard_sim_genres_df = pd.DataFrame.from_dict(genres_sim, orient="index")
    return jacard_sim_genres_df

def compute_jaccard_similarity_score(x, y):
    """
    Jaccard Similarity J (A,B) = | Intersection (A,B) | /
                                    | Union (A,B) |
    """
    intersection_cardinality = len(set(x).intersection(set(y)))
    union_cardinality = len(set(x).union(set(y)))
    return intersection_cardinality / float(union_cardinality)

def insert_recomended_friend(recom_friend,friend_key):
    
    print("place holder ")

if __name__ == "__main__":
    getSavedGamesArrayFromUsers()
    #print(list_users_saved_games)
    getGenres()
    #getGames()
    df1 = getJacardSimFromSavedGames()
    df2  = getJacardSimFromSavedGenres()
    frames = [df1,df2]
    results = pd.concat(frames)
    recom_friend = defaultdict()
    friend_key = []
    #print(results)
    for i in range(0, len(results)):
        df = pd.DataFrame((results.iloc[i]>=0.3))
        key = results.index[i]
        friend_key.append(key)
        values = df.values.tolist()
        flat_list = [item for sublist in values for item in sublist]
        recom_friend[key] = flat_list
        #print(recom_friend)
        #print(friend_key)
