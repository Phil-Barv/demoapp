from backend import db
from datetime import datetime

#demo db models

#donor user model 
class Donor(db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    username = db.Column(db.String(20),nullable=False)
    #lastname = db.Column(db.String(20),nullable=False) who cares?
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100),nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    #one to many relationship with projects -> displayed in "my projects"
    projects_list = db.relationship('Project', backref='donor_projects', lazy=True)

    def __repr__(self):
            return f'<Donor Name: {self.firstname} {self.lastname} Email: {self.email} Date Created: {self.date_created}>'
