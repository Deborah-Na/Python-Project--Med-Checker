from os import rename
from re import S
from flask_app import app
from flask_bcrypt import Bcrypt
from flask import flash
bcrypt = Bcrypt(app)
from flask import render_template,redirect,request, session
from flask_app.models.user import User
from flask_app.models.post import Post
app.url_map.strict_slashes=False

@app.route('/')
def cover_page():
    return render_template("cover_page.html")

@app.route('/signup')
def log():
    return render_template('sign_up.html')

@app.route('/profile')
def success():
    if session['user_id']== False:
        return redirect('/')
    data= {
        'id': session['user_id']
    }
    # data_post={
    #     'id': id
    # }
    # session['user_id']= True
    return render_template('profile.html', user=User.get_by_id(data), all_post = User.get_one_user_all_post(data))

@app.route('/register', methods=["POST"])
def register():
    if not User.validate_login(request.form):
        return redirect('/signup')

    pw_hash = bcrypt.generate_password_hash(request.form['password'])
    print(pw_hash)

    data = {
        "first_name": request.form["first_name"],
        "last_name": request.form["last_name"],
        "email": request.form["email"],
        "password": pw_hash
    }

    user_id = User.save(data)
    session['user_id']= user_id

    return redirect('/profile')

@app.route('/login')
def login():
    return render_template("login.html")

@app.route('/login_page', methods=["POST"])
def login_page():
    data = {"email" : request.form["email"] }
    user_in_db = User.get_by_email(data)
    if not user_in_db:
        flash("Invalid Email/Password", 'login')
        return redirect('/login')
    if not bcrypt.check_password_hash(user_in_db.password, request.form['password']):
        flash("Invalid Email/Password", "login")
        return redirect('/login')

    session['user_id']= user_in_db.id
    session['first_name']= user_in_db.first_name
    return redirect('/profile')

@app.route('/users/<int:id>/edit')
def edit_users(id):
    if session['user_id']== False:
        return redirect('/')
    data= {
        "id": id
    }
    return render_template("edit_user.html", user= User.get_by_id(data))

@app.route('/users/update', methods=["POST"])
def updates():
    # if not User.validate_login(request.form):
    #     return redirect(f"/users/{request.form['id']}/edit")
    User.update(request.form)
    return redirect('/profile')

@app.route('/resources')
def statment():
    return render_template("resources.html")

@app.route('/check')
def symptoms():
    return render_template("check.html")

@app.route('/logout')
def logout():
    print(session.clear())
    session['user_id']= False
    return redirect('/')
