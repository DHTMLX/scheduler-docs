dhtmlxScheduler with Angular
==============================

You should be familiar with the basic concepts and patterns of Angular to use this documentation.
If you are not, please refer to the [Angular documentation](https://angular.io/docs) for a getting-started tutorial. 

DHTMLX Scheduler is compatible with Angular. We have prepared code examples of how to use DHTMLX Scheduler with Angular.
To check online samples, please refer to the corresponding [Example on Replit](https://replit.com/@dhtmlx/dhtmlx-scheduler-with-angular). 

You can also [check the demo on GitHub](https://github.com/DHTMLX/angular-scheduler-demo).

## Creating a project

Before you start to create a new project, install [Angular CLI](https://angular.io/cli) and [Node.js](https://nodejs.org/en/). Then run the following command:

~~~
ng new my-angular-scheduler-app
~~~

The above command will install all the necessary tools and dependencies, so you don't need any additional commands. 

## Installation of dependencies

After that go to the app directory by running:

~~~
cd my-angular-scheduler-app
~~~

Then run the app with one of the following commands:

~~~
yarn start
~~~

or

~~~
npm start
~~~

Now the app should be running on [http://localhost:4200](http://localhost:4200).

![Scheduler with Angular](frontend_frameworks_howtostart/scheduler_angular_front.png)

## Creating Scheduler

Now we should get the DHTMLX Scheduler code. Firstly, we need to stop the app by pressing `Ctrl+C` in the command line.
Then we can proceed with installing the Scheduler package.

### Step 1. Package installation

There are two options available: you can install the Pro package from a local folder, or install the trial version using `npm` or `yarn`.

#### Installing the package from a local folder

Copy the Scheduler package into some local directory inside the project. In the project directory run the command below replacing *scheduler-local-package-path* with the actual path:

~~~
npm install ./scheduler-local-package-path
~~~

or

~~~
yarn add "./scheduler-local-package-path"
~~~

For example:

~~~
npm install ./scheduler_7.0.0_enterprise
~~~

or

~~~
yarn add "./scheduler_7.0.0_enterprise"
~~~

#### Installing the trial version via a package manager

To install the trial version of the Scheduler, you need to create a file with the type **.npmrc** and add the string **&#64;dhx:registry=https://npm.dhtmlx.com/**.


After that, you can install the trial version of Scheduler using **npm** or **yarn** commands:

- for npm:

~~~
npm install @dhx/trial-scheduler
~~~

- for yarn:

~~~
yarn add @dhx/trial-scheduler
~~~

