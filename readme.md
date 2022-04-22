# Limpid Charitable Donations cs162

This is a Flask React app hosted on Heroku that allows the user to keep track of the projects they have donated to and keep tabs on the progress that a charity organization is making on a given project. Charities can perform CRUD operations on the projects they upload.


### Getting the app running

1. Clone the repo to your local machine!
2. Open your terminal and cd to the location of the cloned repo.
3. In the clone's root directory, input:

#### macOS
```python3
python3.6 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
python app.py
```

#### macOS with Anaconda
```python3
conda create -n venv python=3.6.8
conda activate venv
pip install -r requirements.txt
python app.py
```

#### Windows
```python3
python3.6 -m venv venv
venv\Scripts\activate.bat
pip3 install -r requirements.txt
python app.py
```

#### Git Bash
```python3
python3.6 -m venv venv
venv/Scripts/activate.bat
pip3 install -r requirements.txt
python app.py
```

4. Once you run the commands, the app will spool up and give you a link in the terminal (usually: http://127.0.0.1:5000/).

5. Paste the link into your favorite browser (Google Chrome is recommended) and oops! 404 error. This is because we have not yet built the frontend. For now,  adjust the route to http://127.0.0.1:5000/api and you should see the following data packet on your browser:

```javascript
{
  "tutorial": "Flask React Heroku"
}
```

6. If you see this, you have successfully set up the backend, now onto the frontend. Leave the backend running and open a separate terminal.

7. For this bit, you need to cd into the frontend/ directory and run the following commands to install all necessary packages for the app and optimize the build to create a single 'index.html' file for hosting on Heroku.

> ```javascript 
> npm install \
> npm run build \
> ```

8. Start the app.
> ```javascript
> npm start \
> ```


This app also features tests that you can run by accessing the /tests directory. To successfully run the tests you will need to be in the virtual environment venv, with the necessary packages in the requirements.txt already pip installed. While in the /tests directory, run the following command:

```python
python3.6 -m unittest discover
```

<br>

## Deployment
Heroku is currently the best tool for deployment as it is FREE.

With the Procfile included, follow these steps:

1. Have admin permission to be able to add and deploy your repo to Heroku
2. Create a database for your website. [Heroku Postgres](https://dev.to/prisma/how-to-setup-a-free-postgresql-database-on-heroku-1dc1) is recommended.
3. Add environment variables ([Resource](https://devcenter.heroku.com/articles/config-vars#using-the-heroku-dashboard))


Note: You can find an already deployed version here.