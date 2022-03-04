from flask_app.config.mysqlconnection import connectToMySQL
import re
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
from flask import flash
from flask_app.models import user
from flask_app.models import comment

class Post:
    def __init__(self, data):
        self.id = data['id']    
        self.title = data['title']
        self.child_age = data['child_age']
        self.content= data['content']
        self.created_at = data['created_at']
        self.updated_at= data['updated_at']
        self.user_id= data['user_id']

    @classmethod
    def get_all_posts_with_user(cls):
        query= "SELECT * from posts JOIN users on users.id=posts.user_id"
        results= connectToMySQL('medical_schema').query_db(query)
        print(results)
        posts = []
        if results:
            for row in results:  
                this_post= cls(row)
                user_data= {
                    **row, #destructuring the row
                    "id": row["users.id"],
                    "created_at": row["users.created_at"],
                    "updated_at":   row["users.updated_at"]
                }
                #custom attribute to make it into an object
                this_post.user = user.User(user_data)
                posts.append(this_post)
        return posts

    @classmethod
    def save(cls, data):
        query = "INSERT INTO posts (title, child_age, content, created_at, updated_at, user_id) VALUES ( %(title)s , %(child_age)s, %(content)s, NOW(),NOW(), %(user_id)s);" 
        return connectToMySQL('medical_schema').query_db( query, data )

    @staticmethod
    def validate_post(post):
        is_valid= True # we assume this is true
        if len(post['title']) < 2:
            flash("Name must be at least 2 characters.", 'add_post')
            is_valid = False
        if len(post['child_age']) < 0:
            flash("You forgot the age.", "add_post")
            is_valid = False
        elif int(post['child_age']) < 1:
            flash("Invalid age!", "add_post")
            is_valid = False
        if len(post['content']) < 10:
            flash("Share your story, thank you.", "add_post")
            is_valid = False
        return is_valid

    @classmethod
    def update(cls, data):
        query="UPDATE posts SET title = %(title)s, child_age = %(child_age)s, content = %(content)s WHERE id = %(id)s;"
        print(query)
        return connectToMySQL('medical_schema').query_db( query, data )

    @classmethod
    def get_one_post(cls, data):
        query = "SELECT * from posts LEFT JOIN users on users.id=posts.user_id WHERE posts.id= %(id)s;"
        results= connectToMySQL('medical_schema').query_db(query, data)
        print(results)
        if results:
            my_post = cls (results[0])
            for row in results:
                user_data = {
                
                    "id":row['users.id'],
                    "created_at": row['users.created_at'],
                    'updated_at': row['users.updated_at'],
                    'first_name': row["first_name"],
                    'last_name': row["last_name"],
                    'email': row['email'],
                    'password': row['password']
                }
                my_post.user = user.User(user_data)
            return my_post

    @classmethod
    def get_all_comments_one_post(cls,data):
        query = "SELECT * from posts LEFT JOIN comments ON posts.id =comments.post_id LEFT JOIN users ON comments.user_id = users.id WHERE posts.id = %(id)s;"
        results= connectToMySQL('medical_schema').query_db(query)
        comment = []
        if results:
            for row in results:
                this_post = cls(row)
                comment_data ={
                    **row,
                    "id": row["comments.id"],
                    "created_at": row["comments.created_at"],
                    "updated_at": row ["comments.updated_at"],
                    "user_id": row ["comments.user_id"],
                    "post_id": row['comments.post_id']
                }
                this_post.user = comment.Comment(comment_data)
                comment.append(this_post)
        return comment
        

    @classmethod
    def delete(cls, data):
        query= "DELETE from posts WHERE id =%(id)s;"
        return connectToMySQL('medical_schema').query_db( query, data )