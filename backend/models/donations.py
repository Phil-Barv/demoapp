from backend import db
from datetime import datetime

#demo db models

#table to track donations from donors

class Donation(db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    #amount donated
    amount_donated = db.Column(db.Integer(), nullable=False) 
    #date donated
    date_donated = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    #one to many relationship with donor -> displayed in "my donations"
    donor_id = db.Column(db.Integer(),nullable=False,foreign_keys='donor.id')
    donations_list = db.relationship('donor', backref='donor_projects', lazy=True)
    #something default to print here
    def __repr__(self):
            return f'<Donor Name: {self.firstname} {self.lastname} Email: {self.email} Date Created: {self.date_created}>'
