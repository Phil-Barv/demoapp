from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from datetime import timedelta

from config import flask_env

if flask_env == "production":
    #direct app to the index.html file created after running npm build
    app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')

if flask_env == "development":
    app = Flask(__name__)


app.secret_key = "VerySecretKey" #doesnt matter as this is demo deployment
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False #removes modifications to database warnings
app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
bcrypt = Bcrypt(app)


jwt = JWTManager(app)
db = SQLAlchemy(app)

#import routes after creating app and db to prevent circular import
from backend import routes