# Donatello Front-End Application

## Dev

### Running Locally (windows)

1. Clone the repo to your local machine.
> In a terminal, paste:
> ```git 
> git clone https://github.com/pabloguarneros/donatello-frontend.git \
> ```

2. cd to the location of the cloned repo.
> ```python 
> cd donatello-frontend \
> ```

3. In the clone's root directory, create a .env file
> Paste in these commands into the .env file.
> ```javascript
> REACT_APP_APIKEY=AIzaSyDK_ymMCKcCZVIlXsI9wu3y34Ivq5z-zAU
> REACT_APP_AUTHDOMAIN=donatello-a5e2e.firebaseapp.com
> REACT_APP_DATABASEURL=https://donatello-a5e2e-default-rtdb.firebaseio.com/
> REACT_APP_PROJECTID=donatello-a5e2e
> REACT_APP_STORAGEBUCKET=donatello-a5e2e.appspot.com
> REACT_APP_MESSAGINGSENDERID=629008595788
> REACT_APP_APPID=1:629008595788:web:082b2028d825acea65ede9
> REACT_APP_MEASUREMENTID=G-VQGXRWJRME
> ```

4. Install all necessary packages for the app and optimize.
> ```javascript 
> npm install \
> npm build \
> ```

5. Start the app.
> ```javascript
> npm start \
> ```


### Making Changes

1. Branch off test branch
2. Make changes naming the branch with either feature/CD-XX or bug-fix/CD-XX, where XX is the number of the ticket we are responding to.
3. To make the branch use the commands:
> ```git
> git pull \
> git checkout test \
> git checkout -b feature/CD-XX \
> ```
 
4. To push the changes, use:
> ```git
> git push -u origin feature/CD-XX \
> ```

When you push the new branch, create a new pull request to merge with test branch. Tag any relevant person to review the request. Live deployments are seen once the pull request is approved and the branch is merged with main. **Note:** Keep running tests after your changes and before committing to the repo.


### Running Tests
Please keep running tests after your changes and before committing to the repo. To run the test suite we use Jest. You should run the following command:
```javascript
> npm run test \
> and then press "a" \
```

## Live Version
The Live Version is hosted on https://donatello-a5e2e.firebaseapp.com/. \
However, given we are only testing locally and not ready to rest publically, we have disabled database acccess from people without the local environment variables.
