from . import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True) # primary keys are required by SQLAlchemy
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    name = db.Column(db.String(1000))

#models for org profile
#models for donor profile
#models for 

#dontaion for a particular project
class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    org_name= db.Column(db.String())
    project_id = db.Column(db.Integer(),unique = True)
    project_title = db.Column(db.String())
    project_decsription = db.Column(db.String())
    target_amount = db.Column(db.Integer())
    currently_raised = db.Column(db.Integer())
 

    def __repr__(self):
        return f"{self.name}:{self.employee_id}"

#Post model for creating donation
#model for profile
#model for tracking donation
#crude operation for creating, updating and deleting any  of this