from backend.models.charity import Charity
from backend.models.donor import Donor
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, SelectField, TextAreaField, EmailField
from wtforms.validators import InputRequired, Length, Email 


#Sign up for donor
class DonorSignUpForm(FlaskForm):

    username = StringField('username', 
                    validators=[InputRequired(), Length(min=4, max=20)], 
                    render_kw={'placeholder':'User name'})

    email = EmailField('email', 
                    validators=[InputRequired(), Length(min=10, max=100), 
                    Email(message="Invalid Email!",check_deliverability=True)], 
                    render_kw={'placeholder':'Email'})

    password = PasswordField('password', 
                    validators=[InputRequired(), Length(min=4,max=100)], 
                    render_kw={'placeholder':'Password'})

    submit = SubmitField('Sign Up As a Donor!')

    def __init__(self, *args, **kwargs):
        super(DonorSignUpForm, self).__init__(*args, **kwargs)

    def validate(self):
        initial_validation = super(DonorSignUpForm, self).validate()
        if not initial_validation:
            return False
        donor = Donor.query.filter_by(username=self.username.data).first()
        if donor:
            self.username.errors.append("Username already registered")
            return False
        donor = Donor.query.filter_by(email=self.email.data).first()
        if donor:
            self.email.errors.append("Email already registered")
            return False
        return True

#login for Demo

class DonorLoginForm(FlaskForm):
    email = EmailField('email', 
                    validators=[InputRequired(), Length(min=10, max=100), 
                    Email(message="Invalid Email!",check_deliverability=True)], 
                    render_kw={'placeholder':'Email'})

    password = PasswordField('password', 
                    validators=[InputRequired(), Length(min=4,max=100)], 
                    render_kw={'placeholder':'Password'})
    #remember_me = BooleanField('Keep me logged in')
    submit = SubmitField('Log In')

    def __init__(self, *args, **kwargs):
        super(DonorLoginForm, self).__init__(*args, **kwargs)

    def validate(self):
        initial_validation = super(DonorLoginForm, self).validate()
        if not initial_validation:
            return False
        donor = Donor.query.filter_by(email=self.email.data).first()
        if not donor:
            self.email.errors.append('Unknown email')
            return False
        if not donor.verify_password(self.password.data):
            self.password.errors.append('Invalid password')
            return False
        return True



#charity singup

class CharitySignUpForm(FlaskForm):
    charity_name = StringField('charity_name', 
                    validators=[InputRequired(), Length(min=4, max=20)], 
                    render_kw={'placeholder':'Charity name'})

    email = EmailField('email', 
                    validators=[InputRequired(), Length(min=10, max=100), 
                    Email(message="Invalid Email!",check_deliverability=True)], 
                    render_kw={'placeholder':'Email'})

    password = PasswordField('password', 
                    validators=[InputRequired(), Length(min=4,max=100)], 
                    render_kw={'placeholder':'Password'})

    submit = SubmitField('Sign Up As a Donor!')

    def __init__(self, *args, **kwargs):
        super(CharitySignUpForm, self).__init__(*args, **kwargs)

    def validate(self):
        initial_validation = super(CharitySignUpForm, self).validate()
        if not initial_validation:
            return False
        charity = Charity.query.filter_by(username=self.username.data).first()
        if charity:
            self.charity_name.errors.append("Charity name already registered")
            return False
        charity = Charity.query.filter_by(email=self.email.data).first()
        if charity:
            self.email.errors.append("Email already registered")
            return False
        return True


#login for charity

class CharityLoginForm(FlaskForm):
    email = EmailField('email', 
                    validators=[InputRequired(), Length(min=10, max=100), 
                    Email(message="Invalid Email!",check_deliverability=True)], 
                    render_kw={'placeholder':'Email'})

    password = PasswordField('password', 
                    validators=[InputRequired(), Length(min=4,max=100)], 
                    render_kw={'placeholder':'Password'})
    #remember_me = BooleanField('Keep me logged in')
    submit = SubmitField('Log In')


    def __init__(self, *args, **kwargs):
        super(CharityLoginForm, self).__init__(*args, **kwargs)

    def validate(self):
        initial_validation = super(CharityLoginForm, self).validate()
        if not initial_validation:
            return False
        donor = Donor.query.filter_by(email=self.email.data).first()
        if not donor:
            self.email.errors.append('Unknown email')
            return False
        if not donor.verify_password(self.password.data):
            self.password.errors.append('Invalid password')
            return False
        return True

    
    
