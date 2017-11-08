# Development enviroment setup instructions

## Setup an account with github
Create an account at github.com and ensure you can log in with it.

## Install GIT and setup with Github.com
You need to install git onto your local machine, setup a ssh public private key pair and put the public key into github. These instructions work for windows:

 - Download the Git for Windows installer - https://git-for-windows.github.io/
 - Follow the wizard. - Make sure you select "Run Git and included Unix tools from the Windows Command Prompt" when prompted
 - Start a command prompt and run the following commands, replacing "My Name" with your name and "myemail@server.com" with your email address
````
git config --global user.name "My Name"
git config --global user.email "myemail@server.com"
````
 - You need to use SSH keys to identify yourself to services like create yourself public and private keypair. Launch "Git Bash" and run this command to create these keys:
````
ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa
````
This process will create two files. id_rsa and id_rsa.pub. id_rsa is your private key and you must never share this with anyone. id_rsa.pub is your public key. You will need to give this to github so it can identify you. In the gitbash window type the following.
````
notepad ~/.ssh/id_rsa.pub
````

Browse to github.com and login. Click on your profile photo and select settings.
Select ssh and GPB keys
Press new ssh key
For the title enter text that identifies your machine. e.g. 'Work Laptop' etc.
In the key section paster the contents of id_rsa.pub. (This should be open in notepad based on previous command.) Careful you paste the id_rsa.pub file not the id_rsa file. Only the public key should be given to github.


## Install nodeJS
NodeJS is a javascript server framework. It allows us to develop the webapplication on our local machine and have our local machine act as the web server. It also comes with node package manager which is a tool that will find and download software libraries and frameworks.

Navigate to https://nodejs.org/en/download/ and download and install nodeJS. (The windows installer is probally the one you want.)

TODO install notes and ensuring npm is installed

## Install Quasar
Quasar is a webapp framework which delivers user interface widgets and a build process. It is very good for modern webapps which can be run on mobile, tablet and desktop platforms.

Once nodeJS and npm is installed installing quasar is very easy, just type the following command
````
npm install -g quasar-cli
````

## Fork and Clone repository
Make sure you are logged into github then navigate to https://github.com/rmetcalf9/quasar_google_sheet_datasource_sample
At the top you should see a fork button. Press it. This will create a fork of the project which you have control of. The fork will be under your own github user area.

In your working directory type the command
````
git clone X
````
where X is the location of your fork. It should be something like:
git@github.com:GITHUBUSER/quasar_google_sheet_datasource_sample.git
(Make sure GITHUBUSER is not rmetcalf9 - this is the main repo, you need to clone your fork which will be under your own username.)

This will create a subdirectory named quasar_google_sheet_datasource_sample
cd into this directory and run the command
````
npm install
````
This will download extra nodeJS dependancies into the directory.

## Setup google application and add api key

Google needs to monitor usage of it's api's. To do this applications that use them need to access using an Client ID. A webapp has all it's source code public as it is downloaded into the users browser to run. This means it is not possible for a webapp to have a client secret. Instead the apis are restricted to certain origin uri's. We need to add this to the client in google api console.

Navigate to https://console.developers.google.com/apis

Create a new project (I called mine ExampleQuasarFramework)

Select credentials and fill in the Product name on the consent screen and save

Select Credentials and create an oauth client id.

For app type select web application.

Enter a name (I choose ExampleQuasarFramework)

Under authorized javascript origins add the following:
````
http://localhost:8080
http://127.0.0.1:8080
````

(127.0.0.1 may not be nessecary but I added it anyway.)
This will allow our client id to be used locally on our development machine.

When you create the app you will be given a client ID and client secret. You do not need the client secret for now, but copy the client ID into your clipboard.

Open the following file in your cloned repo:
````
/src/tenantSpecific.js
````

Set the google docs client id to the value you copied:
````
googleDocsClientID: 'XXX'
````
(In the above example you replace XXX with what you copied)

Finally we need to allocate which google api's that can be run by your application. Go back to the google api console and in your project select dashboard. It should say 'No APIs or services are enabled'. We need to enable the google sheets api 

Google sheets API. You can browse to select it and click enable.


## Run app on dev machine

Run a command prompt, change into the directory you cloned and run the command:
````
quasar dev
````

A browser should launch and show the first page of the applicaiton. As you change the source code it should automatically recompile and reload.


