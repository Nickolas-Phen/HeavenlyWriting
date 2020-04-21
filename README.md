# Heavenly Writing Web App by Team Green
## Description of Features
The features in this project include creating an account, obtaining interpretations, adding a user to Mailchimp audience, sending a welcome email to users, and an admin page with ability to change the interpretation database. In regard to creating an account, the user can accomplish this by navigating to the sign up page. Once at the sign up page, the user enters information into the input boxes that are provided. This includes their first and last name, email address, username, password, a password confirmation, phone number, city of birth, birthdate, birth time and selects whether they would like to be added to a Mailchimp list. The requirements on the fields include a unique username, a unique email address, a password that matches the confirmation password, and proper formatting for the phone number, birth date and birth time. If any of these requirements are not met, an error message is displayed to inform the user of what to change. This information is then stored in a database and allows the user to log in at a later time.
	In order to obtain interpretations, the user must sign up for a new account and supply appropriate information or log into a current account. The interpretations, based on house, zodiac sign, and other information, is displayed on the first page that the user reaches after signing up or signing in. The interpretations page greets the user with their full name, a quote and follows with the interpretation. This page varies in color depending on the zodiac sign of the user and an image appears relating to the user’s information. The date of birth, moon sign, house sign, sun birth sign, and ascendant sign is also given to the user on this page. 
	On the sign up page, the user has an option to “Receive emails when the moon sign changes” or get added to the audience of the connected Mailchimp account. When a user selects this option and creates a new account, the user will receive an email welcoming them and the administrator can then send emails to the users in this list from Mailchimp. 
	If the user who has signed in is an admin, they will have access to the admin page where they can view interpretations. The table portrays five rows of interpretations, however, this can easily be changed by the user, and has the columns: house, sign, moon phase, quote, picture, and article. Each interpretation has a unique combination of house, zodiac sign, and moon phase. The user can filter which interpretations they are viewing by selecting from the drop-down options (of house, zodiac sign, and moon phase) below the table. When an interpretation is selected, the user has an option to update the information that is currently displayed or delete the interpretation. There is further information on this feature in the following section.
## Description and Navigation for Client to Update Admin Content Page
### Navigating to Admin Page
Getting to the admin content page is a quick and easy process. First an administrator has to navigate to the sign in page to sign in. The link to this page is located on a tab labeled “Sign In” in the upper-center of the home page, the first page a user sees when they view the website.
	Then, the admin should sign in with the username “admin” and the password “He4venly_Writing”. They will then be directed to the today page, where they will have to press the three lines in the top-left corner to reveal the “Admin” tab.
Finally, the admin will have to click on the text that says “Admin.”
### Using the Admin Content Page
The admin content page allows an admin to update, add, and delete an interpretation to the database through a simple user interface. 
(https://imgur.com/a/Snx7hkY)
1. Interpretation table. This table displays every combination of a moon house, sign, and phase, and ties them with a quote, picture, and article. An administrator can choose how many rows to display per page with the “Rows per page” box, as well as navigate the table using the arrows in the bottom-right corner of the table. Choosing information about interpretations in the drop-down menus (item 2) acts as a filter for the table.
 	
2. Drop-down menus. These menus allow an administrator to select a moon house, sign, or phase to either filter the above table or select a specific interpretation. When a combination is entered in the menus, the interpretation corresponding to this information will appear in the quote and article boxes (items 4 and 5).
 	
3. Delete button. Once an interpretation is selected, an administrator can choose to delete it by clicking the delete button and confirming from the window that pops up. This will completely remove that interpretation from the database.
 	
4. Quote text box. This box allows an administrator to edit the quote for an interpretation. The quote is a separate item of text that displays above the main interpretation’s article. Simply click on the box and type to edit the text. When finished, the administrator has to click on the “Update” button (item 6) to update the database with the new quote.
 	
5. Article text box. This box allows an administrator to edit the article for an interpretation. The article is the main text that a user will see about their interpretation. Simply click on the box and type to edit the text. When finished, the administrator has to click on the “Update” button (item 6) to update the database with the new article.
 	
6. Update button. Clicking the update button will update the selected interpretation with the information entered in the quote and article text boxes (items 4 and 5). If no quote or article is found for a selected combination of moon house, sign, and phase, the update button will add a new interpretation to the database for that combination.


After making changes to an interpretation, the new information will be displayed to any user whose today page information corresponds to that interpretation. For example, for one user, the moon’s sign corresponds to house 10, today’s moon sign is Aquarius, and it’s a Balsamic Moon. If an admin selected “House 10” for house, “Aquarius” for sign, and “Balsamic Moon” for phase, edited the text in the article or quote boxes or both, and pressed the “Update” button, the user would now see whatever information was typed in those boxes on their “Today” page.

## System Requirements
The APIs used to complete this project include those for mongo DB, OpenCage, Bing Map, Mailchimp and Google. These APIs are stored in the config_example.js file in /server/config and in /client/src/config/. This file can be copied and pasted into a config.js file and manually changed by the user. 
The mongo DB API is in the first file location on line 3. This API is used to connect the users information to a database so it can be stored for login and will allow you to see changes to the database. This API can be obtained by logging into (or creating an account for) MongoDB, navigating to “Clusters”, “Connect”, “Connect your application”, and copying the string that is shown. The OpenCage API is in the first file location on line 13. This key can be obtained by signing up for an OpenCage API on their website and is free to the user.
The Bing Map API is in the first file location on line 16. This API key is used to obtain time zones of the various cities that the user is born in. This API can be obtained by going to the Microsoft website (https://www.microsoft.com/en-us/maps/choose-your-bing-maps-api) logging into a Microsoft account, navigating to “My Account” and “My Keys” and completing a form to create the API key.
The Mailchimp API is in the first file location and on lines 19 to 21. The mailchimpInstance variable refers to the first four characters that appear in the URL when a user logs into their Mailchimp account and often starts with “us” followed by a numerical value. The listUniqueId variable refers to a list that new users will be added to. This can be obtained by logging into Mailchimp, navigating to “Audience”, “Manage Audience”, “Settings” and “Audience name and defaults”. The mailchimpApiKey variable refers to a unique API for a Mailchimp account. This value can be obtained by logging into Mailchimp, navigating to the upper right-hand corner, “Account”, “Extras” and then “API keys”. The Mailchimp account will be fined for Audiences with more than 2000 contacts.
The Google API is in the second file location on line 4. This API key is used to generate results when the user searches for their city of birth during sign up. This API key from Google must have both the Google Maps and Google Places API enabled. The Google API requires a billing account to be used and is free for at least 10,000 requests, which is counted per character entered. 
The environmental variables in this project are primarily the API keys and have been discussed above. The files that use environmental variables locations and the variables that are currently in use are listed in the following section. These environmental variables can all be found in the config.js and config_example.js file and will only need to be changed in this location. The log-in credentials for the administrator is the username “admin” and the password “He4venly_Writing”. 

## Project Handoff Guidelines
When moving the project off Heroku, first create a fork of the website https://floating-cliffs-61030.herokuapp.com/. This is the most up to date code for the website that works with Heroku and will be the easiest for migrating to a different host. Once a fork is created, some code will have to be edited to fix the environment variables used by Heroku for API keys or checking if the website is in development mode. Here are the files that use any environment variables, indicated by a process.env variable:
* client/src/httpUser.js
* client/src/serviceWorker.js
* server/authHelperFunctions.js
* server/controllers/coordinatesController.js
* server/index.js
* server/swissEph.js
And the environment variables needed for those files:
* bingMap: AnxfM8n3m1Zr6H0pXfmiTxP9NBD1Y0NwimpNzIO4zu7AMxqjRwUc4wIekGKtGLA0
* googleAPI: AIzaSyCL07PegVvOkQbIG9iFHa5MkfpSaSvOrWY
* listUniqueId: de644ad1de
* mailchimpApiKey:  31d36951a5db54c9db20da653fb109b3-us19
* mailchimpInstance: us19
* MONGODB_URI: mongodb+srv://user:test@cluster0-6wnxv.mongodb.net/test?retryWrites=true&w=majority
* NODE_ENV: production
* openCage: d8f1bb88bbfa4f7ca0f0484c90a11383
* PORT: 40387 (but in this case whatever port is used by the new host’s server)
* secret: fjidas0jfisan8e9fhn9a88n
	Additionally, to communicate between the client and server for the site, we used the Axios library to send data between and requires a base URL and port to function. These are defined in httpUser.js and must be changed to the desired URL and server port for the new host.
	More information on migration from Heroku to a different host can also be found at
https://devcenter.heroku.com/articles/app-migration.


## File structure
#### `client` - Holds the client application
- #### `public` - This holds all of our static files
- #### `src`
    - #### `assets` - This folder holds assets such as images, docs, and fonts
    - #### `components` - This folder holds all of the different components that will make up our views
        - #### 'Header' - This holds components important for the header of the Home page.
        - #### 'User' - This holds the many components and views that are important for what the user sees.
    - #### `views` - These represent a unique page on the website i.e. Home or About. These are still normal react components
    - #### `App.js` - This is what renders all of our browser routes and different views
    - #### `index.js` - This is what renders the react app by rendering App.js, should not change
- #### `package.json` - Defines npm behaviors and packages for the client
#### `server` - Holds the server application
- #### `config` - This holds our configuration files, like mongoDB uri
- #### `controllers` - These hold all of the callback functions that each route will call
- #### 'Ephe' - This holds all information important for Swiss Ephemeris.
- #### `models` - This holds all of our data models
- #### `routes` - This holds all of our HTTP to URL path associations for each unique url
- #### `tests` - This holds all of our server tests that we have defined
- #### `server.js` - Defines npm behaviors and packages for the client
#### `package.json` - Defines npm behaviors like the scripts defined in the next section of the README
#### `.gitignore` - Tells git which files to ignore
#### `README` - This file!
