### Donatello Front-End Application

## Dev

**Running Locally**
git clone https://github.com/pabloguarneros/donatello-frontend.git \
cd donatello-frontend \
npm install \
npm run start \

**Making Changes**
Branch off test branch, make changes naming the branch with either feature/CD-XX or bug-fix/CD-XX, where XX is the number of the ticket we are responding to.
 \
To make the branch: \
git pull \
git checkout test \
git checkout -b feature/CD-XX \
 \
Making changes and pushing them: \
git push -u origin feature/CD-XX \
 \
When you push the new branch, create a new pull request to merge with test branch. Tag any relevant person to review the request.  \
 \
When we merge with main branch, that's when we'll see the live deployments.  \
 \

 ## Live Version
The Live Version is hosted on https://donatello-a5e2e.firebaseapp.com/. \
However, given we are only testing locally and not ready to rest publically, we have disabled database acccess from people without the local environment variables.
