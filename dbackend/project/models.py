from sqlalchemy import func
from . import db
 #user model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True) # primary keys are required by SQLAlchemy
    email = db.Column(db.String(100), unique=True,nullable=False) #email of the user
    password = db.Column(db.String(100),nullable=False) #password of  the user
    name = db.Column(db.String(100),nullable=False) #name  of the user.
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
   
   #print user  name as defult
    def __repr__(self):
            return '<User %r>' % self.name



#charity project model
class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True) #id for a partciluar charity
    project_title = db.Column(db.String())  #title of the project
    project_decsription = db.Column(db.String())  # detail description of the project
    target_amount = db.Column(db.Integer())  #target ampount to raise
    currently_raised = db.Column(db.Integer())  #amount currently raised
    project_id = db.Column(db.Integer, db.ForeignKey('profile.id'), #this should be linked to profile id
        nullable=False)

   #print project title as default
    def __repr__(self):
        return f"{self.project_title}"

#Post model for creating donation
class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    org_name= db.Column(db.String(100), unique=True)
    about=db.Column(db.Text())
    website_url=db.Column(db.String(80)) 
    org_id = db.Column(db.Integer, db.ForeignKey('user.id')) #this should be linked to profile inullable=False)


#crude operation for creating, updating and deleting any  of this