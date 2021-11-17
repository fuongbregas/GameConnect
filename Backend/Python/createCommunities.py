# Used in getGame.py to insert a community to DB
def create_community_dict(game_document):
    community_dict = {
        'id' : game_document['id'],
        'name' : game_document['name'],
        'mod_list': [],
        'total_members': [],
    }
    return community_dict