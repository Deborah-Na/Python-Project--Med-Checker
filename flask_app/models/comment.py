from flask_app.config.mysqlconnection import connectToMySQL
import re
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
from flask import flash
from flask_app.models import user
from flask_app.models import post

class Comment:
    def __init__(self, data):
        self.id = data['id']    
        self.name = data['name']
        self.content= data['content']
        self.created_at = data['created_at']
        self.updated_at= data['updated_at']
        self.user_id= data['user_id']
        self.post_id= data['post_id']


    @classmethod
    def insert_comment(cls, data):
        query = "INSERT INTO comments (name, content, created_at, updated_at, user_id, post_id) VALUES ( %(name)s, %(content)s, NOW(),NOW(), %(user_id)s, %(post_id)s);" 
        print(query)
        return connectToMySQL('medical_schema').query_db( query, data )

    
