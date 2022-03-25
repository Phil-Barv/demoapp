from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, SelectField, TextAreaField, EmailField
from wtforms.validators import InputRequired, Length, Email 


# demo sign in form

class DonorSignUpForm(FlaskForm):
    firstname = StringField('firstname', 
                    validators=[InputRequired(), Length(min=4, max=20)], 
                    render_kw={'placeholder':'First Name'})
    
    lastname = StringField('lastname', 
                    validators=[InputRequired(), Length(min=4, max=20)], 
                    render_kw={'placeholder':'Last Name'})

    email = EmailField('email', 
                    validators=[InputRequired(), Length(min=10, max=100), 
                    Email(message="Invalid Email!",check_deliverability=True)], 
                    render_kw={'placeholder':'Email'})

    password = PasswordField('password', 
                    validators=[InputRequired(), Length(min=4,max=100)], 
                    render_kw={'placeholder':'Password'})

    submit = SubmitField('Sign Up As a Donor!')