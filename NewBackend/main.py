from flask import Flask

from flask_restx import Api, Resource, fields
from flask_jwt_extended import (JWTManager,
create_access_token,create_refresh_token,
get_jwt_identity,
jwt_required)
from config import DevConfig
from models import UserCharity
from models import UserDonor
from exts import db

from flask_migrate import Migrate

from auth import auth_ns
from flask_cors import CORS




    
app=Flask(__name__)
app.config.from_object(DevConfig)

CORS(app)
JWTManager(app)
db.init_app(app)
migrate = Migrate(app,db)
    

api=Api(app,doc='/docs')
api.add_namespace(auth_ns)


@api.route('/hello')

class Hello(Resource):

    def get(self):
        return {"messages": "Hello Aben"}    
        
@app.shell_context_processor
def make_shell_context():
    return {
        "db":db,
        "userdonor":UserDonor,
        "usercharity": UserCharity
    }


if __name__ == '__main__':
    app.run()

