from os import rename
from flask_app import app
from flask import render_template,redirect,request, session
from flask_app.models.post import Post
from flask_app.models.user import User
from flask_app.models.comment import Comment
from flask_bcrypt import Bcrypt
from flask import flash

bcrypt = Bcrypt(app)

@app.route('/posts/new')
def create_post():
    if session['user_id']== False:
        return redirect('/')
    return render_template("create_post.html")

@app.route('/posts/create', methods=['POST'])
def add_post():
    if not Post.validate_post(request.form):
        return redirect('/posts/new')
    # data = {
    #     'user_id': request.form['user_id']
    # }
    print(request.form)
    Post.save(request.form)
    return redirect('/profile')

@app.route('/posts/<int:id>')
def view_post(id):
    if session['user_id']== False:
        return redirect('/')
    data = {
        "id":id
    }
    # data = {
    #     "id":id
    # }
    one_posting = Post.get_one_post(data)
    all_comments = Post.get_all_comments_one_post(data)
    return render_template("view_post.html", one_post=one_posting, comments=  all_comments)

@app.route('/posts/<int:id>/edit')
def edit_post(id):
    if session['user_id']== False:
        return redirect('/')
    data= {
        "id": id
    }
    return render_template("edit_post.html", post_now= Post.get_one_post(data))

@app.route('/posts/update', methods=["POST"])
def updated():
    if not Post.validate_post(request.form):
        return redirect(f"/posts/{request.form['id']}/edit")
    Post.update(request.form)
    return redirect('/profile')

@app.route('/posts/all')
def users_posts():
    if session['user_id']== False:
        return redirect('/')
    data= {
        "id": session['user_id']
    }
    return render_template("all_post.html", user=User.get_by_id(data), posts=Post.get_all_posts_with_user())

@app.route('/posts/comment', methods=["POST"])
def comments():
    if session['user_id']== False:
        return redirect('/')
    Comment.insert_comment(request.form)
    return redirect(f"/posts/{request.form['id']}")

@app.route('/posts/delete/<int:id>')
def deleted(id):
    data={"id": id}
    Post.delete(data)
    return redirect('/profile')
