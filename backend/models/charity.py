from backend import db
from datetime import datetime

#charity user model 
class Charity(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True) 
    charity_name = db.Column(db.String(50),nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100),nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    #about charity?? maybe to be added
    #charity url???  maybe url
    #one to many relationship with projects that the charity owns
    projects_list = db.relationship('Project', backref='charity_projects', lazy=True)

    #expand model to request charity registration documents at sign up (to vet authenticity of charity)

    def __repr__(self):
            return f'<Charity Name: {self.firstname} {self.lastname} Email: {self.email} Date Created: {self.date_created}>'


