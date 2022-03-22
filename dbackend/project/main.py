from flask import Blueprint, abort, render_template,request,redirect

from project.models import Project
from . import db


main = Blueprint('main', __name__)
#blue print method for creating new project

@main.before_first_request
def create_table():
    db.create_all()

@main.route('/project/create' , methods = ['GET','POST'])
def create_project():
    if request.method == 'GET':
        return render_template('create_project.html') #get the create project page
     #if this is a post request
     #set this to the form
    if request.method == 'POST':
        id = request.form['id']
        project_title= request.form['project_title']
        project_decsription = request.form['project_decsription']
        target_amount = request.form['target_amount']
        currently_raised=request.form['currently_raised']
        project_id=request.form['project_id']

        #we create an instance of project class
        project = Project(
            id=id,
            project_title=project_title,
             project_decsription=project_decsription,
             target_amount=target_amount,
             currently_raised=currently_raised,
             project_id=project_id
             )
        db.session.add(project)
        db.session.commit()
        return redirect('/project')




 #retreiving  all projects
@main.route('/project')
def RetrieveAllProjects():
    projects = Project.query.all()
    return render_template('project_list.html',projects = projects)

 #retreiving a single Project by ID
@main.route('/project/<int:id>')
def RetrieveSingleProject(id):
    project = Project.query.filter_by(id=id).first()
    if project:
        return render_template('project.html', project = project)
    return f"Sorry, project  with id ={id} Does not  exist"

 #update project 

@main.route('/project/<int:id>/update',methods = ['GET','POST'])
def updateProject(id):
    project = Project.query.filter_by(employee_id=id).first()
    if request.method == 'POST':
        if project:
            db.session.delete(project)
            db.session.commit()

            #pass all the necessary  requirement
            project_title= request.form['project_title']
            project_decsription = request.form['project_decsription']
            target_amount = request.form['target_amount']
            currently_raised=request.form['currently_raised']
            project_id=request.form['project_id']

        #we create an instance of project class
            project = Project(
            id=id,
            project_title=project_title,
             project_decsription=project_decsription,
             target_amount=target_amount,
             currently_raised=currently_raised,
             project_id=project_id
             )
 
            db.session.add(project)
            db.session.commit()
            return redirect(f'/project/{id}')
        return f" sorry project  with id = {id} Does not exist"
 
    return render_template('update.html', project = project)


 #delect project

@main.route('/project/<int:id>/delete', methods=['GET','POST'])
def deleteProject(id):
    project = Project.query.filter_by(employee_id=id).first()
    if request.method == 'POST':
        if project:
            db.session.delete(project)
            db.session.commit()
            return redirect('/project')
        abort(404)
 
    return render_template('delete.html')



