# Quasar project to demo a webApp which uses a google doc as a data source

This project is deployed to github pages and can be accessed here: https://rmetcalf9.github.io/quasar_google_sheet_datasource_sample/


1. [How to setup development enviroment](DEVSETUP.md)
2. [How to deploy to github pages](GITHUBDEPLOYMENT.md)



## Useful Quasar Information
Quasar is a framework that includes widgets for webapplications.

The showcase app is good for viewing the availiable widgets. The showcase source is a great way of finding out how to use the widgets.
Showcase: http://quasar-framework.org/quasar-play/android/index.html#/showcase/ 
Showcase source: https://github.com/quasarframework/quasar-play/tree/dev/src/components/showcase 

Quasar uses material design icons. You can see what you can choose from here:
Icons: https://material.io/icons/

## Useful Google Sheets Information
This app uses the Google Sheets API to access google sheets data.
It is documented here: https://developers.google.com/sheets/
This is a Javascript App.

The Quasar compnent I have created to call the sheets API is located [here](./src/components/googleDocs.js)

## Useful VueJS Information
Quasar makes use of the vueJS framework to provide compoenents. This is documented here: https://vuejs.org/

## Useful Git and Guthub Information
Git is a sourcecontrol tool and github is a online site that provides a git server and allows colerbration (like logging issues, wikis, forking, etc.)

My most used git command is
````
git status
````
run it in the folder of the clone.

When you make a local change on your clone you can get the changes into the online version by running commands like:
````
git add --all
git commit -m"Thi is a sample change I am making"
git push
````

These commands will:
 - Add all changes into your change set
 - Commit the change set with some text explaining what you are changing
 - Push all the commits that are on your computer to the repository in github

Git does way more than this, but this is a good start.
