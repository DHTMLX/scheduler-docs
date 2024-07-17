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

### Installation of dependencies

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

Now we should get the DHTMLX Scheduler code. Firstly, we need to stop the app by pressing **Ctrl+C** in the command line.
Then we can proceed with installing the Scheduler package.

## Step 1. Package installation

There are two options available: you can install the **Pro** package from a local folder, or install the **trial** version using **npm** or **yarn**.

### Installing the package from a local folder

Copy the Scheduler package into some local directory inside the project. In the project directory run the command below replacing *scheduler-local-package-path* with the actual path:

~~~
npm install ./scheduler-local-package-path
// or
yarn add "./scheduler-local-package-path"
~~~

For example:

~~~
npm install ./scheduler_7.0.0_enterprise
// or
yarn add "./scheduler_7.0.0_enterprise"
~~~

### Installing the trial version via a package manager

To install the trial version of the Scheduler, you need to create a file with the **.npmrc** type and add the **&#64;dhx:registry=https://npm.dhtmlx.com/** string into it.

After that, you can install the trial version of Scheduler using **npm** or **yarn** commands:

- for npm:

~~~
npm install @dhx/trial-scheduler
~~~

- for yarn:

~~~
yarn add @dhx/trial-scheduler
~~~

## Step 2. Component creation

Now we should create a component to add a Scheduler into the application. Let's create the **scheduler** folder in the **src/app/** directory, 
add new files into it and call them **scheduler.component.ts**, **scheduler.component.css** and **scheduler.component.html**.

The newly created **scheduler.component.html** file inside the **scheduler** folder will contain the template for the scheduler. Let's add the following lines of code into it:

{{snippet scheduler/scheduler.component.html}}
~~~html
<div #scheduler_here class="dhx_cal_container" style="width: 100%; height:100vh">
   <div class="dhx_cal_navline">
       <div class="dhx_cal_prev_button"></div>
       <div class="dhx_cal_next_button"></div>
       <div class="dhx_cal_today_button"></div>
       <div class="dhx_cal_date"></div>
       <div class="dhx_cal_tab" data-tab="day"></div>
       <div class="dhx_cal_tab" data-tab="week"></div>
       <div class="dhx_cal_tab" data-tab="month"></div>
   </div>
   <div class="dhx_cal_header"></div>
   <div class="dhx_cal_data"></div>
</div>
~~~

We'll declare scheduler styles in a separate file named **scheduler.component.css**. The default styles can look like this:

{{snippet scheduler/scheduler.component.css}}
~~~css
@import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";
:host {
   display: block;
   position: relative;
   height: 100%;
   width: 100%;
}
~~~

To make the Scheduler container occupy the entire space of the body, you need to add the following styles to the **styles.css** file located in the **src** folder:

{{snippet src/styles.css}}
~~~css
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

### Importing source files

Open the ***scheduler.component.ts*** and ***scheduler.component.css*** files and import Scheduler source files. Note that:

- if you've installed the Scheduler package from a local folder, your import paths will look like this:

{{snippet scheduler.component.ts}}
~~~
import { Scheduler, SchedulerStatic } from 'dhtmlx-scheduler';
~~~

{{snippet scheduler.component.css}}
~~~
@import "@dhtmlx-scheduler/codebase/dhtmlxscheduler.css";
~~~

- if you've chosen to install the trial version, the import paths should be as in:

{{snippet scheduler.component.ts}}
~~~
import { Scheduler, SchedulerStatic } from '@dhx/trial-scheduler';
~~~

{{snippet scheduler.component.css}}
~~~
@import "@dhx/trial-scheduler/codebase/dhtmlxscheduler.css";
~~~

In this tutorial we will use the **trial** version of Scheduler.

### Setting the container and adding Scheduler

To display Scheduler on the page, we need to set the container to render the component inside. Use the code below:

{{snippet scheduler.component.ts}}
~~~js
import { Scheduler, SchedulerStatic } from "@dhx/trial-scheduler";
import { Component, ElementRef, OnInit, OnDestroy, 
	ViewChild, ViewEncapsulation } from "@angular/core";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "scheduler",
  styleUrls: ["./scheduler.component.css"],
  templateUrl: 'scheduler.component.html'
})

export class SchedulerComponent implements OnInit, OnDestroy {
  @ViewChild("scheduler_here", { static: true }) schedulerContainer!: ElementRef;
  private _scheduler?: SchedulerStatic;

  ngOnInit() {
    let scheduler = Scheduler.getSchedulerInstance();
    scheduler.init(
      this.schedulerContainer.nativeElement,
      new Date(2024, 9, 7),
      "week", 
    );
    this._scheduler = scheduler;
  }

  ngOnDestroy() {
    if (this._scheduler) this._scheduler.destructor();
  }
}
~~~

In the above code we've used the **ngOnInit()** method of Angular and also specified the **ngOnDestroy()** method that 
contains the [**scheduler.destructor()**](api/scheduler_destructor.md) call to clear the component when it is no longer needed.

## Step 3. Adding Scheduler into the app

Now it's time to add the component into our app. Open **src/app/app.component.ts** and use the Scheduler Component instead of the default content by inserting the code below:

{{snippet src/app/app.component.ts}}
~~~js
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<scheduler></scheduler>`,
})
export class AppComponent {
  name = '';
}
~~~

Then create the ***app.module.ts*** file in the **src/app/** directory and insert *SchedulerComponent* as provided below:

{{snippet src/app/app.module.ts}}
~~~js
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
 
import { AppComponent } from "./app.component";
import { SchedulerComponent } from "./scheduler/scheduler.component";
 
@NgModule({
  declarations: [AppComponent, SchedulerComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
~~~

The last step is to open the ***src/main.ts*** file and replace the existing code with the following one:

{{snippet src/main.ts}}
~~~js
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
~~~

After that, when we start the app, we should see an empty Scheduler on a page. 

![Adding Scheduler into an app](frontend_frameworks_howtostart/scheduler_angular_init.png)

## Step 4. Providing Data

To add data loading to the Angular Scheduler, you need to add an event service. But before that, let's define the event model.

For creating the event model, run the following command:

~~~
ng generate class models/event --skip-tests
~~~

In the newly created ***event.ts*** file inside the ***models*** folder, we will add the following lines of code:

{{snippet models/event.ts}}
~~~
export class Event {
	id!:  number;
    start_date!: string;
    end_date!: string;
    text!: string;
}
~~~

Now let's create an event service. A service is a class that will be responsible for creating a specific event. Services in Angular can be injected by
using the Dependency Injection mechanism. They can include data, functions or some features necessary for the application. You need to create a data service 
that will be used to provide the scheduler with events.

For creating an event service, run the following command:

~~~
ng generate service services/event --flat --skip-tests
~~~

In the newly created ***event.service.ts*** file inside the ***services*** folder it is required to add the following lines of code:

{{snippet services/event.service.ts}}
~~~
import { Injectable } from '@angular/core';
import { Event } from "../models/event";

@Injectable()
export class EventService {
    get(): Promise<Event[]>{
        return Promise.resolve([
            { id: 1, start_date: "2023-05-16 09:00", end_date: "2023-05-16 13:00", 
            	text: "Event 1" },
            { id: 2, start_date: "2023-05-18 10:00", end_date: "2023-05-18 14:00", 
            	text: "Event 2" },
        ]);
    }
}
~~~

We've added the **@Injectable()** decorator to our service. It marks a class as available for an injector to instantiate. We'll inject it into our component further.

Currently, the **get()** method returns a resolved promise with hardcoded data. However, you can load data from the server side and also return a promise.
The scheduler component is supposed to use **EventService** to get events. To enable this, let's add **EventService** to the component. 
First, import the necessary module for the service in ***scheduler.component.ts***:

{{snippet scheduler.component.ts}}
~~~
import {EventService} from "../services/event.service";
~~~

You should also specify **EventService** as a provider in the **@Component** decorator:

{{snippet scheduler.component.ts}}
~~~
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "scheduler",
  providers: [EventService],
  styleUrls: ["./scheduler.component.css"],
  templateUrl: 'scheduler.component.html'
})
~~~

Now, every time a new *SchedulerComponent* is initialized, a fresh instance of the service will be created. The service should be prepared to be injected into the component.
For this purpose, add the following constructor to the **SchedulerComponent** class:

{{snippet scheduler.component.ts}}
~~~
constructor(private eventService: EventService){}
~~~

Modify the **ngOnInit()** function:

- set the data format for loading events (XML in this case)
- call the services to get the function and then wait for a response to put the data to the scheduler

{{snippet scheduler.component.ts}}
~~~
scheduler.config.date_format = "%Y-%m-%d %H:%i";
scheduler.init(this.schedulerContainer.nativeElement, new Date(2024, 9, 7));
this.eventService.get()
    .then((data) => {
         scheduler.parse(data);
    });
~~~

The complete code of the ***scheduler.components.ts*** file will look like this:

{{snippet scheduler.component.ts}}
~~~
import { Scheduler, SchedulerStatic } from "@dhx/trial-scheduler";
import { Component, ElementRef, OnInit, OnDestroy, 
	ViewChild, ViewEncapsulation } from "@angular/core";
import {EventService} from "../services/event.service";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "scheduler",
  providers: [EventService],
  styleUrls: ['scheduler.component.css'],
  templateUrl: 'scheduler.component.html'
})

export class SchedulerComponent implements OnInit, OnDestroy {
  @ViewChild("scheduler_here", { static: true }) schedulerContainer!: ElementRef;
  private _scheduler?: SchedulerStatic;
  constructor(private eventService: EventService) { }

  ngOnInit() {
    let scheduler = Scheduler.getSchedulerInstance();
    scheduler.config.date_format = "%Y-%m-%d %H:%i";
    scheduler.init(
      this.schedulerContainer.nativeElement,
      new Date(2024, 9, 7),
      "week", 
    );
    this.eventService.get().then((data) => {scheduler.parse(data);});
    this._scheduler = scheduler;
  }

  ngOnDestroy() {
    if (this._scheduler) this._scheduler.destructor();
  }
}
~~~

Now, if you reopen the app page, you should see a Scheduler with events.

![Scheduler with Angular events](frontend_frameworks_howtostart/scheduler_angular_events.png)

## Step 5. Saving Data

To capture changes made in the Scheduler, you can use a [dataProcessor](https://docs.dhtmlx.com/dataprocessor__index.html) 
handler that lets you "communicate" with the server-side backend. The handler can be declared either as a function or a router object.
The scheduler accepts Promise response from the handler, so the scheduler will correctly process the completion of an action. 

You can create a **DataProcessor** via the **createDataProcessor()** API method and capture changes, like this:

~~~
scheduler.createDataProcessor(function(entity, action, data, id) {​
    scheduler.message(`${​entity} ${​action}`);
});
~~~

If your service changes the event id after creating a new record (which it usually does), make sure that your Promise returns an object with 
**{id: databaseId}** or **{tid: databaseId}** as a result, so the Scheduler could apply the new database id to the record.
Get [more information about the server side](server_integration.md).

Well, Angular Scheduler is ready, you are welcome to [check out the full demo on GitHub](https://github.com/DHTMLX/angular-scheduler-demo).

## XSS, CSRF and SQL Injection Attacks

Pay attention that Scheduler doesn't provide any means of preventing an application from various threats, such as SQL injections or 
XSS and CSRF attacks. It is important that responsibility for keeping an application safe is on the developers implementing the backend.

Check the [Application Security](app_security.md) article to learn the most vulnerable points of the component and the measures you can take to improve the safety of your application.