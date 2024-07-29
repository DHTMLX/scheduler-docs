Ways to Install Scheduler 
================================

You can use [Bower](https://bower.io/) or [npm](https://www.npmjs.com/) package managers to install the dhtmlxScheduler package into your project.

It's also possible to include the necessary JS/CSS files from CDN.

npm - standard free version
-------------------------

You can install the Standard version of Scheduler from [npmjs.com](https://www.npmjs.com/package/dhtmlx-scheduler) by executing the following command line:

~~~html
npm install dhtmlx-scheduler
~~~

{{note Only the Standard version of the Scheduler is available at [npmjs.com](https://www.npmjs.com/package/dhtmlx-scheduler) }}

npm - Evaluation and PRO versions
-----------------------------------

**Professional Evaluation version**

Download the [trial Scheduler package](https://dhtmlx.com/docs/products/dhtmlxScheduler/download.shtml) and follow the steps mentioned in the README file. 
Note that the trial Scheduler version is available 30 days only.

**Professional version**

Send your **license number** to the ***contact@dhtmlx.com*** email to receive a login and a password for a private **npm** as well as a detailed guide on how to
install Scheduler. Note that a private **npm** is available before the expiration of the proprietary Scheduler license.


Bower
-------------------------

To install the Standard version of Scheduler through [Bower](https://bower.io/), execute the following command line:

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

All public sources (CDN, Bower, and npm) contain the Standard edition of the component which is distributed under the GPL license.

We also provide our [private npm registry](#npmevaluationandproversions) from where the Professional and Evaluation versions of the component can be installed. 

If for some reason the methods described above are not available to you, there are two possible ways out:
 
- you can add the Pro version to your project by hand
- you can install the Pro version to your project via npm from a local directory

### Installing the package from a local folder {#installfromlocalfolder}

If case of **npm** you can install the Pro package from a local folder using  [`npm install ./local_path`](https://docs.npmjs.com/cli/install) or [`npm link`](https://docs.npmjs.com/cli/link) commands.
There are step-by-step instructions for both variants:

### npm install

1. Copy the Scheduler package into some local directory
2. Go to your project directory
3. Call `npm install ../scheduler-local-package-path`

### npm link

1. Copy the Scheduler package into some local directory
2. Call `npm link` in the package folder
3. Go to your project directory
4. Call `npm link dhtmlx-scheduler`

To see the difference between the Standard and PRO versions of the dhtmlxScheduler library, check the related article [Standard vs PRO Library Versions](editions_comparison.md).

@index:
- cdn_links_list.md