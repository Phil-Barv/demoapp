from flask_restx import Resource,Namespace,fields
from models import UserDonor, UserCharity
from werkzeug.security import generate_password_hash,check_password_hash
from flask_jwt_extended import (JWTManager,
create_access_token,create_refresh_token,
get_jwt_identity,
jwt_required)
from flask import Flask,request,jsonify,make_response


auth_ns=Namespace('auth',description="A namespace for Authentication")



signupdonor_model=auth_ns.model(
    'SignUpDonor',
    {
        "username":fields.String(),
        "email":fields.String(),
        "password":fields.String()
    }
)

signupcharity_model=auth_ns.model(
    'SignUpCharity',
    {
        "username":fields.String(),
        "email":fields.String(),
        "password":fields.String()
    }
)


login_model=auth_ns.model(
    'Login',
    {
        'username':fields.String(),
        'password':fields.String()
    }
)

@auth_ns.route('/signupcharity')
class SignUpCharity(Resource):
    @auth_ns.expect(signupcharity_model)
    def post(self):
        data=request.get_json()


        username=data.get('username')

        db_user=UserCharity.query.filter_by(username=username).first()

        if db_user is not None:
            return jsonify({"message":f"User with username {username} already exists"})

        new_user=UserCharity(
            username=data.get('username'),
            email=data.get('email'),
            password=generate_password_hash(data.get('password'))
        )

        new_user.save()

        return make_response(jsonify({"message":"User created successfuly"}),201)

@auth_ns.route('/signupdonor')
class SignUpDonor(Resource):
    @auth_ns.expect(signupdonor_model)
    def post(self):
        data=request.get_json()


        username=data.get('username')

        db_user=UserDonor.query.filter_by(username=username).first()

        if db_user is not None:
            return jsonify({"message":f"User with username {username} already exists"})

        new_user=UserDonor(
            username=data.get('username'),
            email=data.get('email'),
            password=generate_password_hash(data.get('password'))
        )

        new_user.save()

        return make_response(jsonify({"message":"User created successfuly"}),201)


@auth_ns.route('/login')
class Login(Resource):

    @auth_ns.expect(login_model)
    def post(self):
        data=request.get_json()

        username=data.get('username')
        password=data.get('password')

        db_userdonor=UserDonor.query.filter_by(username=username).first()
        db_usercharity = UserCharity.query.filter_by(username=username).first()
        if db_usercharity and check_password_hash(db_usercharity.password, password):

            access_token=create_access_token(identity=db_usercharity.username)
            refresh_token=create_refresh_token(identity=db_usercharity.username)

            return jsonify(
                {"access_token":access_token,"refresh_token":refresh_token}
            )

        elif db_userdonor and check_password_hash(db_userdonor.password, password):
    
            access_token=create_access_token(identity=db_userdonor.username)
            refresh_token=create_refresh_token(identity=db_userdonor.username)

            return jsonify(
                {"access_token":access_token,"refresh_token":refresh_token}
            )

        else:
            return jsonify({"message":"Invalid username or password"})


'''
@auth_ns.route('/refresh')
class RefreshResource(Resource):
    @jwt_required(refresh=True)
    def post(self):

        current_user=get_jwt_identity()

        new_access_token=create_access_token(identity=current_user)

        return make_response(jsonify({"access_token":new_access_token}),200)

'''