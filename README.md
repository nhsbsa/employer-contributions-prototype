# NHS-TEMPLATE-CREATOR

## Requirements

1. nvm (node version mananger to install npm)
2. npm (install via nvm)
3. git
4. git-flow

## What is it?

The  NHS-TEMPLATE-CREATOR elements repo is based on the [GOV.UK elements](https://github.com/alphagov/govuk_elements) projects repo. Is three things:

1. a locally runnable project, explaining how to make your service look consistent with the rest of NHS
2. A centralised repository containing a number of sass resources based on the [GOV.UK frontend toolkit](https://github.com/alphagov/govuk_frontend_toolkit) and the [GOV.UK elements](https://github.com/alphagov/govuk_elements) projects
3. A tool to automatically create a versioned build for the gitlab nhs-frontend-template repository which is the ultimate resource developers shall add as a dependency in their nhs-based projects

## Project Structure

### Sass maintainable resources
The ./public folder contains 3 sass-based key folders:

1. public/govuk_frontend_toolkit-sass - The [GOV.UK frontend toolkit](https://github.com/alphagov/govuk_frontend_toolkit) provides Sass variables, functions and mixins, they must be imported before any of the GOV.UK elements Sass files. Some of the sass files (i.e. colour variables) have been amended in order to meet NHS design guidelines.
2. public/sass - This folder contains the sass files for the NHS elements (i.e. form, tabs, grid elements etc) which will sit in the page body. This is in turn derived from the [GOV.UK elements](https://github.com/alphagov/govuk_elements) project.
3. public/nhs-sass - This folder contains sass files defining NHS specific elements like page header & footer for either the NHS public facing & BSA pages.
4. scripts/ - This contains utility scripts and at the moment the deploy.sh script

### Locally Runnable App

The app/ folder contains the nodejs express-based application key files used to run the application locally. The app/views/ folder contains all the templates which can be used as an example for building a branded NHS application. The app/views/govuk_template.html main layout file is based on the [GOV.UK template project](https://github.com/alphagov/govuk_template)

To run the application locally install the project dependencies first of all by running:

```
npm install
```

Then build & run the application:

```
npm start
```

At this point the app should be running and available at [localhost:3000](http://localhost:3000)

## Adding Elements and/or amending styles

Developers/users will need to amended/add sass files. The public/govuk_frontend_toolkit-sass folder is normally for the base styles & colours inherited from the GOV.UK front-end toolkit. The mixins & functions defined in this folder are normally used throughout the other sass dependencies.

If one wants to add an extra element say a new tab element item, then the right sass folder would be public/sass as this contains the NHS elements sass definitions. A new file i.e. _tabs.scss shall be created in public/sass/elements/_tabs.scss and it will feature sass definitions for the new tabs element. Then the newly created _tabs.scss file shall be added to public/sass/_govuk-elements.scss so it can be picked by the sass processor when converting it to css.

An example page will be added within the app/views folder i.e. app/views/guide_tabs.html and a new route be defined in app/routes.js. Any HTML snippets shall be created within app/views/snippets i.e. app/views/snippets/tabs.html (any snippet file will be automatically html-encoded so it can be displayed correctly when the app is run locally). The /app/views/index.html page shall also be updated to include the link & description reference to the newly created element.

To have a better insight please check out the following files:

### App
1. app/views/guide_tabs.html
2. app/views/index.html
3. app/views/snippets/tabs.html

### Sass
1. public/sass/elements/_tabs.scss
2. public/sass/_govuk-elements.scss

### Deploy

Assuming you have created a feature git branch to develop the new elements, once the development is over it is time to merge it into the development branch and then merge it into the master branch. A number of steps to be taken for this can be summarised as following:

```
git flow release start tabs-release

```

once the development is over finish up the release by running:

```
git flow release finish tabs-release
```

finally the repo can be pushed:

```
git push --tags
```

## Tasks

### Run the local app
```
npm start
```

### Run linter
```
npm run test
```

### Check updates
Check if one or more GOV.UK dependency packages can be upgraded, if so please run the 'npm run upgrade' task
```
npm run check-updates
```

### Upgrade
Upgrade GOV.UK* package versions in package.json file and re-install dependencies
```
npm run upgrade
```

### Deploy
This task should never be used by the developer, rather it should be invoked by GITLAB CI whenever the master branch is merged with develop branch and pushed to the repo. If additions/amends are applied to the sass files or assets then the package.json file version number and description should be amended accordingly. The deploy task will run the scripts/deploy.sh file which in turn will work out the package.json version/description and will create a new tagged version on the nhs-template based on the package.json 'version' property.
```
npm run deploy
```


### Copy GOV.UK sass resources for diff comparison

A good open-source tool to perform file comparison is [Meff](http://meldmerge.org/). It works either on Windows/Linux/Mac machines.

```
npm run copy-uk-gov
```

This task will re-install the latest version of GOV.UK-based packages and copy the sass resources into the following folders (within the newly-created 'sass-orig' folder):

1. sass-orig/govuk_frontend_toolkit-sass-copy
2. sass-orig/sass

At this point a file diff tool (i.e. [Meff](http://meldmerge.org/)) can be used to perform a file comparison to see how newer versions of GOV.UK front-end toolkit & elements evolve in relation to the current NHS elements project. The folders to compare are the following:

1. sass-orig/govuk_frontend_toolkit-sass-copy -> public/govuk_frontend_toolkit-sass
2. sass-orig/sass -> public/sass
