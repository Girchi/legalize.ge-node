# Legalize
Node application, which connects to a Drupal database and exchanges the information about users.
Users can create Legalize's card by inputting their personal information and the card will be generated immediately, which can be converted as PDF files and get printed easily. 
Each one of them gets their unique card.
Users can see preview of their card, while inputting the details, after authorization.



## Default configuration
1. Make local instance of the project: `git clone git@github.com:Girchi/legalize.ge-node.git; cd legalize.ge-node`
2. Create `.env` file in the project's root directory(where `package.json` is) and use `example.env` as a template

     A. Create `/keys` directory also in the root directory

     B. Generate SSL key and certificate in the `/keys` folder(`.gitignore` will automatically ignore it)
     
     C. Insert client_id and client_secret in `.env` from Drupal's Ouath module
     
     D. To set up a localhost environment, put in your SSL key(for example: `SSL_KEY=./keys/example.key`)
3. **It's essential** to have configured JSON:API, Simple Oauth and Token, Simple Oauth Facebook Connect and Social Auth Facebook in Drupal side
4. Change `"DRUPAL_DOMAIN"` in `assets/js/auth_config.json ` to http://girchi.docker.localhost for testing purposes
5. Run `npm run launch` in terminal to automatically install all the neccessary npm packages and start the app


## Configuration for Facebook authorization
1. Create Facebook application at https://developers.facebook.com/
2. Configure Facebook and Drupal front-side access locations at: `assets/js/auth_config.js`

### NOTE: Make sure the project uses SSL connection, Facebook only allows domains that use SSL.

User cards will be generated into `/cards-download`

