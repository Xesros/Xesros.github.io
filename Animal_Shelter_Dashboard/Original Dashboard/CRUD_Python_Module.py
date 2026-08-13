from pymongo import MongoClient 
from bson.objectid import ObjectId 

"""
class AnimalShelter(object):  

    def __init__(self): 
        # Initializing the MongoClient. This helps to access the MongoDB 
        # databases and collections. This is hard-wired to use the aac 
        # database, the animals collection, and the aac user. 
        
        # Connection Variables 
        USER = 'aacuser' 
        PASS = 'M0ng0L34Rn' #Password Changed
        HOST = 'localhost' 
        PORT = 27017 
        DB = 'aac' 
        COL = 'animals' 
        
        # Initialize Connection 
        self.client = MongoClient('mongodb://%s:%s@%s:%d' % (USER,PASS,HOST,PORT)) 
        self.database = self.client['%s' % (DB)] 
        self.collection = self.database['%s' % (COL)] 
"""
           
class AnimalShelter(object): 
    """ CRUD operations for Animal collection in MongoDB """ 

    def __init__(self, username, password): 
        # Initializing the MongoClient. This helps to access the MongoDB 
        # databases and collections. This is hard-wired to use the aac 
        # database, the animals collection, and the aac user. 
        
        # Connection Variables 
        USER = username 
        PASS = password #Password Changed
        HOST = 'localhost' 
        PORT = 27017 
        DB = 'aac' 
        COL = 'animals' 
        
        # Initialize Connection 
        self.client = MongoClient('mongodb://%s:%s@%s:%d' % (USER,PASS,HOST,PORT)) 
        self.database = self.client['%s' % (DB)] 
        self.collection = self.database['%s' % (COL)] 
    #Implement the C in CRUD. 
    def create(self, data):
        if data is not None: 
            result = self.database.animals.insert_one(data)  # data should be dictionary  
            if(result.acknowledged): #Was document inserted?
                return True #Yes.
            else:
                return False #No.
        else: 
            raise Exception("Nothing to save, because data parameter is empty") #Potential empty data exception
            return False

    #Implement the R in CRUD.
    def read(self, query):
        if query is not None:
            results = list(self.database.animals.find(query)) #Searching all applicable - add to a list
            if results is not None:
                return results #Return matching documents
            else:
                return [] #Return an empty list
        raise Exception("Nothing to read because the query is empty")
    
    #Implement the U in CRUD
    def update(self, search, update, many_or_one): 
        if search is not None: #No empty query
            if many_or_one is not False: # True means many
                results = self.database.animals.update_many(search, update)  #Update multiple docs  
            else:
                results = self.database.animals.update_one(search, update) #Update a single doc
            return results.modified_count #Total docs affected
        else: 
            raise Exception("Nothing to update because query is empty") #Potential empty data exception
            return False
            
    #Implement the D in CRUD
    def delete(self, query, many_or_one):
        if query is not None:
            if many_or_one is not False: # True means many
                results = self.database.animals.delete_many(query) #Match all applicable then delete
            else:
                results = self.database.animals.delete_one(query) # Match one then delete
            return results.deleted_count #Return an empty list
        else:
            raise Exception("Nothing to delete because query is empty")