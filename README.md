# ESGR app, mobile version

This project was bootstrapped with: expo init ESGR-mobile-app, with template tabs (TypeScript)

It is a simple React Native app (using Typescript) that runs a tinder-like presentation of articles related to environmental topics : the user indicates if he or she likes (right swipe) or dislikes (left swipe) the content.
A score is computed based on those decisions, using an algorithm which is coded inside function calculateScore.
Please also note that cards are presented in a certain order, based on the above algorithm and other parameters (see class TestScreen.tsx, method getMaximizedCard).

Data source: currently, articles comme from a hardcoded file inside the project (data.json).
This should become an external source eventually (REST API probably).

Data sink: a backend is implemented in a separate project (ESGR-backend) to store the results of tests. The url of that backend has to be set inside environment variable REACT_APP_ESGR_BACKEND_URL.
It should be set in file .env.development or .env.production depending if it is a DEBUG our RELEASE build.
Please note that those two .env files are not saved into the git repository in order to keep their content secret.
However, file .env.template.development, which is saved into the repo, contains an example of the expected format.
