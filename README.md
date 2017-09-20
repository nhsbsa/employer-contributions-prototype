# nhs-template-prototype

The nhs-template-prototype is a small node.js/express-based app aimed at a designer who quickly wants to put together a prototype using the latest version of the styles defined in the  [nhs-template-creator](https://dps-gitlab.service.nhsbsa/nhsbsa-frameworks/BSA-Design/nhs-template-creator)

## Requirements

You must have the following packages installed on your machine and available from shell/command line:

1. npm
2. git
3. Git-Bash on Windows or Terminal on Linux/Mac

Furthermore you will need a wireless connection and the bsa-nhs vpn client running so you will be able to connect to bsa-nhs' gitlab.

## Getting started

First of all run the following command to get all the required dependencies for the project:

```
npm install
```

This command will install all the dependencies for the project

```
npm run get-template
```

The system will git clone the latest version of the [nhs-template](https://dps-gitlab.service.nhsbsa/nhsbsa-frameworks/BSA-Design/nhs-template) assets which will be made available to the node/express app.

You will now be able to run the application locally:

```
npm start
```

The app will run and be available from port 3001, so you can point your browser to [localhost](http://localhost:3001)

## Documentation

Prototype Application Components

The BSA-NHS prototype app is simply based on the nunjucks template engine technology.

The views main directory is defined in the ./app/views directory.

The main nunjucks-html file where the root html is defined is 'base.html'

5 Key Blocks

In each page you create for your prototype you would need to set text or html for the following nunjuck blocks:

1. breadcrumb
2. title
3. subtitle
4. content
5. breadcrumb

By using the {{ super() }} keyord the block will display the defined content as defined in the breadcrumb block in the base.html parent file. The extra html 'li' tag will be appended like in the following example:

```
{% block breadcrumb %}
    {{ super() }}
     <li><a href="/docs">Documentation</a></li>
{% endblock  %}
```
### title
The 'title' block would only generally accept plain text which will populate the page main 'h1' tag

```
{% block title %}
    Some title
{% endblock  %}
```

### subtitle

Similarly, the 'subtitle' block would only generally accept plain text which will populate the 'p' tag following the page main 'h1' tag

```
{% block subtitle %}
    Some subtitle text goes here
{% endblock  %}
```

### content

The 'content' block will display the actual page content which in page will reside between the page 'h1' block and 'footer' tags:
```
{% block content %}
    <div class="grid-row">
        <div class="column-one-half">
            <h2 class="heading-large">Based on the Nunjucks template engine</h2>
            <ul class="list list-bullet">
              <li>See the <a href="https://mozilla.github.io/nunjucks/templating.html" target="_blank">Nunjucks Templating Documentation (open in a new window)</a></li>
              <li>Node.js &amp; Express-based app</li>
              <li>Automatically pulls BSA's <a href="https://dps-gitlab.service.nhsbsa/nhsbsa-frameworks/BSA-Design/nhs-template" target="_blank">NHS-TEMPLATE</a> latest version</li>
              <li>Focus on your product's prototype rather than on configuration.</li>
            </ul>

        </div>

        <div class="column-one-half">
            <h2 class="heading-large">4 blocks only</h2>
            <p>
                Create a page only defining the following Nunjucks' blocks:
            </p>
            <ul class="list list-bullet">
              <li>Breadcrumb</li>
              <li>Title</li>
              <li>Subtitle</li>
              <li>Content</li>
            </ul>
            <p>
                Read more on how to <a href="/docs">create a new prototype page</a> on the documentation page
            </p>

        </div>

    </div>
{% endblock  %}
```

### A full example

Suppose you want to create a new endpoint '/documentation'. Create a new file named 'documentation.html' in the './app/views'. Make sure to extend the 'base.html' parent file as following:

```
{% extends 'base.html' %}

{% block breadcrumb %}
    {{ super() }}
     <li><a href="/docs">Documentation</a></li>
{% endblock  %}

{% block title %}
    Some title
{% endblock  %}

{% block subtitle %}
    Some subtitle text goes here
{% endblock  %}

{% block content %}
    <div class="grid-row">
        <div class="column-one-half">
            <h2 class="heading-large">Based on the Nunjucks template engine</h2>
            <ul class="list list-bullet">
              <li>See the <a href="https://mozilla.github.io/nunjucks/templating.html" target="_blank">Nunjucks Templating Documentation (open in a new window)</a></li>
              <li>Node.js &amp; Express-based app</li>
              <li>Automatically pulls BSA's <a href="https://dps-gitlab.service.nhsbsa/nhsbsa-frameworks/BSA-Design/nhs-template" target="_blank">NHS-TEMPLATE</a> latest version</li>
              <li>Focus on your product's prototype rather than on configuration.</li>
            </ul>

        </div>

        <div class="column-one-half">
            <h2 class="heading-large">4 blocks only</h2>
            <p>
                Create a page only defining the following Nunjucks' blocks:
            </p>
            <ul class="list list-bullet">
              <li>Breadcrumb</li>
              <li>Title</li>
              <li>Subtitle</li>
              <li>Content</li>
            </ul>
            <p>
                Read more on how to <a href="/docs">create a new prototype page</a> on the documentation page
            </p>

        </div>

    </div>
{% endblock  %}
```

### Add the endpoint route in 'routes.js' file

At this point create an endpoint in the ./app/routes.js file.
```

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.html');
});

// add this new route
// add this new route
router.get('/documentation', (req, res) => {
    res.render('documentation.html');
});


module.exports = router;
```
