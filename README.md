# Legalize
Node application, which connects to a Drupal database and exchanges the information about users.
Users can create Legalize's card by inputting their personal information and the card will be generated immediately, which can be converted as pdf files and get printed easily. 
Each one of them gets their unique card.
Users can see preview of their card, while inputting the details, after authorization.



## Default configuration
1. Configure `.env` file for your application just like `example.env`

     A. Generate SSL key and certificate and put it in the `.env` file
2. Change `"DRUPAL_DOMAIN"` in `assets/js/auth_config.json ` to http://girchi.docker.localhost for testing purposes
3. Insert client_id and client_secret from Drupal's Ouath module
4. It's essential to have configured JSON:API, Simple Oauth and Token, Simple Oauth Facebook Connect and Social Auth Facebook in Drupal side


## Configuration for Facebook authorization
1. Create Facebook application at https://developers.facebook.com/
2. Configure Facebook and Drupal front-side access locations at: `assets/js/auth_config.js`

### NOTE: Make sure the project uses SSL connection, Facebook only allows domains that use SSL.

User cards will be generated into `/cards-download`

