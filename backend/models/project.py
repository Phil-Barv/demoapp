from backend import db
from datetime import datetime

#charity project model
class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(20), nullable=False) #project name
    decsription = db.Column(db.String(600), nullable=False) #project description 
    imageUrl=db.Column(db.String(600), nullable=False) # project image
    goal=db.Column(db.String(600), nullable=False) # project goal
    deadline=db.Column(db.DateTime,  nullable=False) #deadline to raise money
    target_amount = db.Column(db.Integer(), nullable=False)  #amount to raise
    raised_amount = db.Column(db.Integer(), nullable=False)  #currently raised
    date_created = db.Column(db.DateTime, default=datetime.utcnow, nullable=False) #porject creation date
    charity_id = db.Column(db.Integer, db.ForeignKey('charity.id'), nullable=False)
    donor_id = db.Column(db.Integer, db.ForeignKey('donor.id'), nullable=False)

    def __repr__(self):
        return f'<Project Title: {self.title} Target: {self.target_amount} Raised: {self.raised_amount} Date Created: {self.date_created}>'

    def jsonify(self):
        return {    "id":self.id,
                    "title":self.title,
                    "description":self.description,
                    "image_url":self.image_url,
                    "goal":self.goal,
                    "deadline":self.deadline,
                    "target_amount":self.target_amount,
                    "raised_amount":self.raised_amount
                }
        