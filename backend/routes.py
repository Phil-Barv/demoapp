from backend import app,db
from flask import render_template, request, redirect
from backend.models.charity import Charity
from backend.models.donor import Donor
from backend.models.project import Project
from backend.forms import DonorSignUpForm, DonorLoginForm

from datetime import datetime


#from flask import send_from_directory
#from flask_cors import CORS, cross_origin ###for when we want to host on heroku

#CORS(app)

@app.route('/api', methods=['GET'])
#@cross_origin()
def index():
    return {
        "tutorial": "Flask React Heroku"
    }


### For when we're hosting on heroku
# @app.route('/')
# @cross_origin()
# def serve():
#     return send_from_directory(app.static_folder, 'index.html') 


#Get all projects
#retreiving  all projects
@app.route('/project', methods =['GET'])
def getAllProjects():
    projects = Project.query.all()
    response = [project.jsonify() for project in projects]
    return {
        "response": response
    }

#Get a single project - filter by project id
@app.route('/project/<int:id>')
def getOneProject(id):
    project = Project.query.filter_by(id=id).first()
    if project:
        return {
            "response": project
        }
    return {
        "response": "Sorry, project does not exist"
    }


#Get a list of Projects donated to by a donor - if we need to sort by donated projects
#Add the user id as the selection criteria to retrieve the projects. This will work by using the user id as a secondary key that would map to each project, if I donated to them. Hence in a case we need to retrieve the donated projects, we will filter by the secondary key of the projects. A slight modification of the Retrieve single projects.

# @app.route('/project/<int:user_id>')
# def RetrieveDonorProject(id):
#     project = Project.query.filter_by(id=user_id).first()
#     if project:
#         return render_template('project.html', project = project)
#     return f"Sorry, project  with id ={id} does not exist"


#Creating a new project
@app.route('/project/create', methods = ['POST'], strict_slashes=False)
def createProject():

    # deleting this GET to make this an api call instead
    # if request.method == 'GET':
    #   return render_template('create_project.html') #return project page
     
    #if post request
    #set this to the form
    if request.method == 'POST':

        if not Charity.query.filter_by(id=1).first():
            charity = Charity(
                charity_name="testingA",
                email="A@minerva.edu.kgi",
                password="greenEngs",
            )
            db.session.add(charity)
            db.session.commit()

        title = request.json['title']
        description = request.json['description']
        image_url = request.json['imageURL']
        goal = request.json['goal']
        deadline = datetime.strptime(request.json['deadline'], '%Y-%m-%dT%H:%M')
        target_amount = request.json['targetAmount']
        raised_amount = request.json['raisedAmount']

        #we create an instance of project class
        project = Project(
            title = title,
            description = description,
            image_url = image_url,
            goal = goal,
            deadline = deadline,
            target_amount = target_amount,
            raised_amount = raised_amount,
            charity_id = 0,
        )
            
        db.session.add(project)
        db.session.commit()

        return {
            "response": 200
        }

#update project 
@app.route('/project/<int:id>/update',methods = ['GET','POST'])
def updateProject(id):

    project = Project.query.filter_by(employee_id=id).first()

    if request.method == 'POST':
        if project:
            db.session.delete(project)
            db.session.commit()

            #pass all the necessary  requirement
            project_title= request.form['project_title']
            project_description = request.form['project_description']
            target_amount = request.form['target_amount']
            currently_raised=request.form['currently_raised']
            project_id=request.form['project_id']

            #we create an instance of project class
            project = Project(
            id=id,
            project_title=project_title,
             project_description=project_description,
             target_amount=target_amount,
             currently_raised=currently_raised,
             project_id=project_id
             )
 
            db.session.add(project)
            db.session.commit()

        else:
            return {
                "response": "sorry project  with does not exist"
            }
 
    return {
        "response": project
    }

 #delete project

@app.route('/project/<int:id>/delete', methods=['GET','POST'])
def deleteProject(id):
    
    project = Project.query.filter_by(employee_id=id).first()
    
    if request.method == 'POST':
        
        if project:
            db.session.delete(project)
            db.session.commit()

        return { "response": 200 }
    
    return { "response": 500 }


@app.route("/signup/", methods=["POST", "GET"])
def login():
    form = DonorSignUpForm()

    if form.validate_on_submit():

        #pass all the necessary  requirement
        username= form['username']
        email = form['email']
        password = form['password']

        #we create an instance of project class
        donor = Donor(
            username=username,
            email=email,
            password=password,
            )

        db.session.add(donor)
        db.session.commit()

#login user
'''
@app.route("/login/", methods=["POST", "GET"])
def login():

    #note: no parameters are passed into the form
    form = DonorLoginForm()

    if form.validate_on_submit():
        #we can create a join table called users containing all charities and donors
        user = Donor.query.filter_by(email=form.email.data).first() 

        if user:
            if bcrypt.check_password_hash(user.password, form.password.data):
                login_user(user)
                return redirect(url_for('home'))
            else:
                flash(f"Oops, you put the wrong password, {form.email.data}. Try again.", "info") 
        else:
            flash(f"{form.email.data}, please create an account!", "info")
    
    return render_template("login.html", form=form)


@app.route("/logout", methods=["POST", "GET"])
def logout():
    logout_user()
    return redirect(url_for('main.index'))
'''