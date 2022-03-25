from flask import Flask
from flask_sqlalchemy import SQLAlchemy

#direct app to the index.html file created after running npm build ### to use when deploying to heroku
#app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')

app = Flask(__name__)


app.secret_key = "VerySecretKey" #change before deployment
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False #removes modifications to database warnings

db = SQLAlchemy(app)

#import routes after creating app and db to prevent circular import
from backend import routes