from backend import db
from datetime import datetime

#demo db models

#donor user model 
class Donor(db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    firstname = db.Column(db.String(20),nullable=False)
    lastname = db.Column(db.String(20),nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100),nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    #one to many relationship with projects -> displayed in "my projects"
    projects_list = db.relationship('Project', backref='donor_projects', lazy=True)

    def __repr__(self):
            return f'<Donor Name: {self.firstname} {self.lastname} Email: {self.email} Date Created: {self.date_created}>'

#charity user model 
class Charity(db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    charityname = db.Column(db.String(50),nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100),nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    #one to many relationship with projects that the charity owns
    projects_list = db.relationship('Project', backref='charity_projects', lazy=True)

    #expand model to request charity registration documents at sign up (to vet authenticity of charity)

    def __repr__(self):
            return f'<Charity Name: {self.firstname} {self.lastname} Email: {self.email} Date Created: {self.date_created}>'


#charity project model
class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(20), nullable=False)  
    decsription = db.Column(db.String(600), nullable=False)  
    target_amount = db.Column(db.Integer(), nullable=False)  
    raised_amount = db.Column(db.Integer(), nullable=False)  
    date_created = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    charity_id = db.Column(db.Integer, db.ForeignKey('charity.id'), nullable=False)
    donor_id = db.Column(db.Integer, db.ForeignKey('donor.id'), nullable=False)

    def __repr__(self):
        return f'<Project Title: {self.title} Target: {self.target_amount} Raised: {self.raised_amount} Date Created: {self.date_created}>'