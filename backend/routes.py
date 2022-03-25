from backend import app

#from flask import send_from_directory
#from flask_cors import CORS, cross_origin ###for when we want to host on heroku

#CORS(app)

@app.route('/api', methods=['GET'])
#@cross_origin()
def index():
    return {
        "tutorial": "Flask React Heroku"
    }


### For when we're hosting on herolu
# @app.route('/')
# @cross_origin()
# def serve():
#     return send_from_directory(app.static_folder, 'index.html') 