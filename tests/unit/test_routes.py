from unit import app
import unittest
import requests

app = 'http://127.0.0.1:5000'

class appClientTests(unittest.TestCase):

    def test_api_returns_data_packet(self):
        """
        Test that checks the /api route returns the exact json packet.
        """
        response = requests.get(f'{app}/api')
        expected_response = {
                                "tutorial": "Flask React Heroku"
                            }
    
        self.assertEqual(response.json(), expected_response)


    def test_index_not_implemented(self):
        """
        Test that checks the / route returns 404 Not Found
        """
        response = requests.get(f'{app}/')

        self.assertEqual(response.status_code, 404)


    def test_token_created(self):
        """
        Test that checks the /token route returns token created with existing user
        """
        data = {
                'user'         : 'Charity',
                'charity_name' : 'testingA',
                'email'        : 'A@minerva.edu.kgi',
                 'password'    : 'greenEngs'
        }

        response = requests.post(f'{app}/token', json=data, allow_redirects=True)
        self.assertEqual(response.status_code, 200)


    def test_token_not_created(self):
        """
        Test that checks the /token route returns token Not created with false user
        """
        data = {
            'user'     : 'Donor',     
            'name'     : 'User Not Exist',
            'email'    : 'userdoesntexist@gmail.com',
            'password' : 'ABcd1234++'
        }

        response = requests.post(f'{app}/token', json=data, allow_redirects=True)
        expected_response = {
                            'access_token ': False
                        }

        self.assertEqual(response.json(), expected_response)


    def test_logout_returns_data_packet(self):
        """
        Test that checks the /api route returns the exact json packet
        """
        response = requests.post(f'{app}/logout')
        expected_response = {
                                "msg": "logout successful"
                            }
    
        self.assertEqual(response.json(), expected_response)


    def test_projects_access_unauthorized(self):
        """
        Test that checks the /project route returns 401 Not Authorized
        """
        response = requests.get(f'{app}/project')

        self.assertEqual(response.status_code, 401)


    def test_project_access_unauthorized(self):
        """
        Test that checks the /project/<int:id> route returns 401 Not Authorized
        """
        from random import randint
        response = requests.get(f'{app}/project/{randint(1,99)}')

        self.assertEqual(response.status_code, 401)


    def test_register_successfully_registered(self):
        """
        Test that checks the /register route returns 200 OK 
        """
        data = {
            'user'     : 'Donor',     
            'name'     : 'Quinton',
            'email'    : 'quinton@gmail.com',
            'password' : 'ABcd1234++'
        }

        response = requests.post(f'{app}/register', json=data, allow_redirects=True)
        self.assertEqual(response.status_code, 200)


    def test_register_not_registered(self):
        """
        Test that checks the /register route returns False with wrong credentials
        """
        data = {
            'user'     : '',        #purposefully left out to prevent registration
            'name'     : 'Quinton',
            'email'    : 'quinton@gmail.com',
            'password' : 'Quinton)1sthe(goat'
        }

        response = requests.post(f'{app}/register', json=data)
        expected_response = {
                                'registered': False
                            }
    
        self.assertEqual(response.json(), expected_response)
