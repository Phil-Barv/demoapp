from backend import app,db,abort
from flask import render_template, request, redirect
from backend.models import Donor, Charity, Project


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
    return render_template('project_list.html',projects = projects)

#Get a single project - filter by project id
@app.route('/project/<int:id>')
def getOneProject(id):
    project = Project.query.filter_by(id=id).first()
    if project:
        return render_template('project.html', project = project)
    return f"Sorry, project  with id ={id} does not exist"


#Get a list of Projects donated to by a donor - if we need to sort by donated projects
#Add the user id as the selection criteria to retrieve the projects. This will work by using the user id as a secondary key that would map to each project, if I donated to them. Hence in a case we need to retrieve the donated projects, we will filter by the secondary key of the projects. A slight modification of the Retrieve single projects.


# @app.route('/project/<int:user_id>')
# def RetrieveDonorProject(id):
#     project = Project.query.filter_by(id=user_id).first()
#     if project:
#         return render_template('project.html', project = project)
#     return f"Sorry, project  with id ={id} does not exist"



#Creating a new project
@app.route('/project/create' , methods = ['GET','POST'])
def createProject():
    #check for 2 conditions, for GET and for POST
    if request.method == 'GET':
        return render_template('create_project.html') #return project page
     #if post request
     #set this to the form
    if request.method == 'POST':
        id = request.form['id']
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
        return redirect('/project')






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
            return redirect(f'/project/{id}')
        return {"response" : f"sorry project  with id = {id} Does not exist"}
 
    return render_template('update.html', project = project)


 #delete project

@app.route('/project/<int:id>/delete', methods=['GET','POST'])
def deleteProject(id):
    project = Project.query.filter_by(employee_id=id).first()
    if request.method == 'POST':
        if project:
            db.session.delete(project)
            db.session.commit()
            return redirect('/project')
        abort(404)
 
    return render_template('delete.html')