from flask_app.controllers import users, posts
from flask_app import app
app.url_map.strict_slashes=False


if __name__ == "__main__":
    app.run(debug=True)