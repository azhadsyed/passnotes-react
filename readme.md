# Passnotes

Musical passwords that let you unlock a secret message board.

## Deployment Configuration Branch

Goals for deployment:

1. Define workflow requirements: files should be organized in such a way that:

   - npm start is responsible for building the static files in production environment
   - a one-line command can start the api and client servers in development environment
   - react listens for code changes and refreshes automatically

2. Split this branch into two:

   - deploy-glitch: a branch setup to meet the requirements and be hosted on glitch.
   - deploy-heroku: a branch setup to meet the requirements and be hosted on heroku.

3. Evaluate the pros/cons between Glitch and Heroku
   - Can all the goals of step 1 be achieved in either environment?
   - How temperamental is maintaining these requirements in environment?
