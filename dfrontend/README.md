### Leo App -> Tracking The Emissions Of Your Tech Stack
- Blockchain
- Cloud Services
- Common AI Algorithms


## For Dev

**Running Locally**
git clone https://github.com/pabloguarneros/leo.git \
cd leo \
npm install \
npm run start \

**Deploying To Firebase**
*To be done in special cases, when github CD crashes*
npm install firebase  \
firebase login  \
firebase init (only select hosting for firebase and github deploy)  \
npm run build  \
serve -s build  \
firebase deploy \

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

## Deploy locally
npm install \
npm run build  \
serve -s build  \
firebase deploy \

 \

## For Biz

### Current Business Idea
- Depend on the good grace of people (buy me a coffee)

### Some other options:
- Public API for others to use
- Consulting service to lower emission's of client's tech stack