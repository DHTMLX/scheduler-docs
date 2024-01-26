Ways to Install Scheduler 
================================

You can use [Bower](https://bower.io/) or [npm](https://www.npmjs.com/) package managers to install the dhtmlxScheduler package into your project.

It's also possible to include the necessary JS/CSS files from CDN.

npm
-------------------------


**Standard (Free) version**

You can install a Stardard version of Scheduler from [npmjs.com](https://www.npmjs.com/package/dhtmlx-scheduler), execute the following command line:
~~~html
npm install dhtmlx-scheduler
~~~

A trial and paid versions of Scheduler can be installed from DHTMLX npm registry using following commands:

**Professional Evaluation version:**
~~~html
npm config set @dhx\:registry https://npm.dhtmlx.com
npm install @dhx/trial-scheduler
~~~

**Professional version:**
~~~html
npm config set @dhx\:registry https://npm.dhtmlx.com
npm install @dhx/scheduler
~~~

{{note Only the Standard version of the Scheduler is available at [npmjs.com](https://www.npmjs.com/package/dhtmlx-scheduler) }}


Bower
-------------------------
To install a Stardard version of Scheduler through [Bower](https://bower.io/), execute the following command line:

~~~html
bower install scheduler
~~~

CDN
-----

To include JS/CSS files from CDN, you should set direct links to **dhtmlxscheduler.js** and **dhtmlxscheduler.css** files:

~~~html
<link rel="stylesheet" href="http://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.css" 
	type="text/css"> 
<script src="http://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.js" 
	type="text/javascript"></script>  
~~~

You can find the full list of links you can include from CDN, depending on the version of dhtmlxScheduler in a [separate article](cdn_links_list.md).

Adding PRO Edition into Project
---------------------------------

All public sources (CDN, Bower, and npm) contain a Stardard edition of the component, which is distributed under the GPL license.

We also provide our [private npm registry](#npm) from where the Professional and Evaluation versions of the component can be installed. 

If for some reason methods described above are not available to you, there are two possible ways out:
 
- you can add the Pro version to your project by hand.
- you can make a package out of the Pro version of the component by yourself and add it to your projects from a local directory.

If case of npm, you can install the Pro package from a local folder using  [`npm install ./local_path`](https://docs.npmjs.com/cli/install) or [`npm link`](https://docs.npmjs.com/cli/link).
There are step-by-step instructions for both variants:

###npm install

1. Copy the Scheduler codebase into some local directory.
2. [Initialize the npm package there](https://docs.npmjs.com/cli/init). Name the package *dhtmlx-scheduler* or whatever you like.
Make sure to set *dhtmlxscheduler.js* as a main file in package.json as `"main": "codebase/dhtmlxscheduler.js"`.
3. Go to your project directory. 
4. Call `npm install ../scheduler-local-package-path`.

###npm link

1. Copy the Scheduler codebase into some local directory.
2. [Initialize the npm package there](https://docs.npmjs.com/cli/init). Name the package *dhtmlx-scheduler* or whatever you like.
Make sure to set *dhtmlxscheduler.js* as a main file in package.json as `"main": "codebase/dhtmlxscheduler.js"`.
3. Call `npm link` in the package folder.
4. Go to your project directory.
5. Call `npm link dhtmlx-scheduler`.



@index:
- cdn_links_list.md