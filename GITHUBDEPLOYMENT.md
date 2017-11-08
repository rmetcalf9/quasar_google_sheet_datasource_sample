# Github pages deployment instructions

Github includes a useful feature called github pages. This allows github to host static content - like this webapplication. This page includes instructions on how to set this up.

## First time setup
 - Log into git hub and browse to the site for your forked copy of this project
 - Goto project settings
 - Scroll down to github pages
 - Select master branch /docs folder and press save
 - If you scroll down again after the save you will see a message "Your site is ready to be published at URL - keep a note of this URL.
 - You should also edit README.md and change the link so it points to the correct github pages

Google API's restrict the origins the site can be loaded from to work. This is why you will start to get errors about 'X-Frame-Options' to overcome these:
 - Log into https://console.developers.google.com/apis
 - Navigate to the project created for this app
 - Click credentials and then click the edit pencil next to the client ID that this app is using
 - Under https://console.developers.google.com/apis add the host used by github pages. It should be something like https://GITHUBUSER.github.io where GITHUBUSER is your github username
 - Press Save
 - Test the app by going to the github pages url and checking the google login and queries work

## Steps to update the site

 - Check the project is working without errors
 - Commit and push latest changes to github
 - In a command prompt browse to the project folder
 - Run "deploy_to_gh_pages.bat" - this will build a copy of the 
 - Run commands to push your changes to git (git add --all, git commit -m"Updating pages", git push
 - Wait a few minutes
 - Visit the URL - new version should be published


TODO
