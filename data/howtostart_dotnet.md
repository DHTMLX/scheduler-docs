dhtmlxScheduler with ASP.NET MVC  
===============================

This tutorial will show you the way of using Scheduler with the ASP.NET and REST API on the server side.

You can also explore other server-side integration possibilities of Scheduler by choosing one of the following tutorials:

- howtostart_php.md
- howtostart_nodejs.md
- howtostart_ruby.md

We will make use of ASP.NET MVC 5 web platform and Web API 2 controller for REST API to create a Scheduler application.
To organize communication with database we will use the [Entity Framework](http://www.asp.net/entity-framework).
We will build our application with the help of the Visual Studio IDE. 

Step 1. Making Preparations
-----------------------------

###Creating a new Visual Studio Project project

Let's start by running Visual Studio and creating a new project. For this, select the File menu tab and choose:<br>
New -> Project. Then select ASP.NET Web Application and name it *scheduler-rest-net*. 

<img src="vs_project.png">

Select an Empty project among available templates and check MVC and Web API checkboxes below the list of templates.

<img src="select_template.png">

###Installing dhtmlxScheduler package

Now we need to install dhtmlxScheduler from NuGet. For this, run the following command in the Package Manager Console:

~~~js
Install-Package DHTMLX.Scheduler
~~~

Step 2. Adding Models, Views and Controllers
--------------------------------

###Creating a Controller

We also need to add a controller for our web page. It will process incoming requests from the user and run the needed logic.

The controller will call a particular view to generate a necessary HTML for the request.

To create it, call the context menu for the Controllers folder and choose Add->Controller.

<img src="creating_controller.png">

In the opened window select MVC 5 Controller -> Empty and name a newly added controller “HomeController”.

The HomeController has the Index() method of the ActionResult class by default, so it doesn't require any additional logic. We will just add a view for it. 

###Сreating a View

In the Views folder find the Home directory. Right click to call the context menu and select Add -> View. 

<img src="creating_view.png">

Name the new view "Index".
Open the newly created view and put the following code into it:

~~~html
@{
    ViewBag.Title = "Index";
}
<script src="@Url.Content("~/scripts/dhtmlxscheduler/dhtmlxscheduler.js")" type="text/javascript"></script>
<link rel="stylesheet" href="@Url.Content("~/content/dhtmlxscheduler/dhtmlxscheduler_flat.css")" />
/>


<div id="scheduler_here" class="dhx_cal_container" style='width:100%; height:500px;'>
    <div class="dhx_cal_navline">
        <div class="dhx_cal_prev_button">&nbsp;</div>
        <div class="dhx_cal_next_button">&nbsp;</div>
        <div class="dhx_cal_today_button"></div>
        <div class="dhx_cal_date"></div>
        <div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div>
        <div class="dhx_cal_tab" name="week_tab" style="right:140px;"></div>
        <div class="dhx_cal_tab" name="month_tab" style="right:76px;"></div>
    </div>
    <div class="dhx_cal_header">
    </div>
    <div class="dhx_cal_data">
    </div>
</div>

<script>
    (function () {
    	// specifying the date format 
        scheduler.config.xml_date = "%Y-%m-%d %H:%i";
        // initialilizing scheduler
        scheduler.init("scheduler_here", new Date(2016, 4, 23), "week");

		// enabling data loading
        scheduler.load("/api/Event", "json");
        // initializing dataProcessor
        var dp = new dataProcessor("/api/Event/");
        // and attaching it to scheduler
        dp.init(scheduler);
        // setting dataProcessor to the REST mode
        dp.setTransactionMode("REST");
    })()
</script>
~~~


In the above code we have done the following:

- set a container for the scheduler 
- specified the dates format to load data from the server side
- initialized scheduler
- enabled data loading 
- initialized dataProcessor in the REST mode to work with the server side

The server side itself will be implemented a bit later. For now, you can run the application and see an empty scheduler on the page.

<img src="adding_scheduler.png">

###Creating a Model

Model is an object that will represent data in the Scheduler. Scheduler can load data either in [JSON or XML formats](data_formats.md).

Data is represented in Scheduler in the form of Event. So we should create a simple model for events.

Right click on the Models folder to call the context menu and select Add->Class. 

<img src="creating_model.png">

Name the created class "Event".
Open the newly created "Event" class and add the necessary properties into it:

~~~js
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace scheduer_rest_net.Models
{
    public class Event
    {
        public int id { get; set; }
        public string text { get; set; }
        public DateTime start_date { get; set; }
        public DateTime end_date { get; set; }

    }
}
~~~

You can find the list of mandatory properties of the Event object with their descriptions 
in the [corresponding article](loading_data.md#dataproperties) of documentation.

Step 3. Configuring DataBase Connection
--------------------------------------

###Installing Entity Framework

We are going to organize work with a database with the help of the [Entity Framework](http://www.asp.net/entity-framework).

So, first of all we need to install the framework. To do it, you need to run the following command in the Package Manager Console:

~~~js
Install-Package EntityFramework
~~~

To use the Entity Framework functionality, we need to apply the following namespace:

~~~js
using System.Data.Entity;
~~~

###Creating Context

The next step is to create Context. Context represents a session with the DataBase. It allows working with Events.

Call the context menu for the Models folder and select Add->Class. The new class will be called "SchedulerContext" and will have the following content:

~~~js

using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace scheduer_rest_net.Models
{
    public class SchedulerContext: DbContext
    {
        public DbSet<Event> Events { get; set; }
    }
}
~~~

###Adding Initial Records to Database

Now we can add some records into the database.

The Entity Framework can automatically create a database when application runs. 
We should specify that a database should be dropped and re-created whenever the model changes.

First, we should create a database initializer. For this purpose, we need to add a new class in the *App_Start* folder
that will be inherited from the DropCreateDatabaseIfModelChanges class. Let's call it "SchedulerContextInitializer".

In this class we are going to redefine the Seed() method to populate it with test data.
Then we will add an entities collection into the context with the AddRange() method.

The full code of the *SchedulerContextInitializer* class is given below:

~~~js
using scheduer_rest_net.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace scheduer_rest_net.App_Start
{
public class SchedulerContextInitializer: DropCreateDatabaseIfModelChanges<SchedulerContext>
   {
		protected override void Seed(SchedulerContext context)
        {
            context.Events.AddRange(new List<Event>
            {
                new Event {id = 1, text = "Test Event 1", 
                	start_date = new DateTime(2016, 5, 23, 1, 0, 0), 
                    	end_date = new DateTime(2016, 5, 23, 6, 0, 0) },
                new Event {id = 2, text = "Test Event 2", 
                	start_date = new DateTime(2016, 5, 23, 7, 0, 0), 
                    	end_date = new DateTime(2016, 5, 23, 12, 0, 0) },
                new Event {id = 3, text = "Test Event 3", 
                	start_date = new DateTime(2016, 5, 24, 10, 0, 0), 
                    	end_date = new DateTime(2016, 5, 24, 15, 0, 0) },
                new Event {id = 4, text = "Test Event 4", 
                	start_date = new DateTime(2016, 5, 25, 9, 0, 0), 
                    	end_date = new DateTime(2016, 5, 25, 13, 0, 0) },
                new Event {id = 5, text = "Test Event 5", 
                	start_date = new DateTime(2016, 5, 26, 13, 0, 0), 
                    	end_date = new DateTime(2016, 5, 26, 18, 0, 0) },
                new Event {id = 6, text = "Test Event 6", 
                	start_date = new DateTime(2016, 5, 27, 4, 0, 0), 
                    	end_date = new DateTime(2016, 5, 27, 15, 0, 0) },
            });
        }
    }
}
~~~

Open the *Global.asax* file. It contains code that runs on the application start.

<img src="global_asax.png">

Add the necessary namespace and the code line that will set Initializer for our context into the *Application_Start()* method:

~~~js
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.Http;
using System.Data.Entity;           
using scheduler_rest_net.App_Start;     /*!*/
 
namespace gantt_rest_net
{
    public class Global : HttpApplication
    {
        void Application_Start(object sender, EventArgs e)
        {
            Database.SetInitializer(new SchedulerContextInitializer());  /*!*/
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes); 
        }
    }
}
~~~


Step 4. Creating a Controller for REST API
---------------------------------------

###General technique of loading data using REST API

There's a [common technique](server_integration.md#technique) for loading data into Scheduler from the server side.

You will find the requirements to the client side,
as well as the [description of possible requests and responses](server_integration.md#requestresponsedetails)
in the server_integration.md article.

Below we will consider how to load data into Scheduler using .Net server side.

<h3 id="scheduler_data">Adding object with Scheduler data</h3>

Let's create a controller that will be responsible for loading tasks and links data into Scheduler.

Activate a context menu for the Controllers folder and select  Add -> Controller.<br>
Choose the Web API 2 Controller -> Empty. The new controller will be called "EventController".

Open the newly created controller and put the following code into it:

~~~js
using scheduler_rest_net.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;

namespace scheduer_rest_net.Controllers
{
    public class EventController : ApiController
    {
        private string _dateFormat = "yyyy-MM-dd HH:mm";
        private SchedulerContext db = new SchedulerContext();

        private JsonResult<Dictionary<string, string>> _getResult(string action, int? tid)
        {
            var res = new Dictionary<string, string>();
            res.Add("action", action);
            if (tid != null)
                res.Add("tid", tid.ToString());
            return Json(res);
        }

        [HttpGet]
        public IEnumerable<object> Get()
        {
            var res = new List<object>();
            foreach (var item in db.Events)
            {
                res.Add(new {
                    id = item.id,
                    text = item.text,
                    start_date = item.start_date.ToString(_dateFormat),
                    end_date = item.end_date.ToString(_dateFormat)
                });
            }

            return res;
        }


        [HttpPost]
        public IHttpActionResult Post(Event ev)
        {
            if (!ModelState.IsValid)
            {
                return _getResult("error", null);
            }

            db.Events.Add(ev);
            db.SaveChanges();

            return _getResult("inserted", ev.id);
        }

        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            var ev = db.Events.Find(id);
            if(ev == null)
            {
                return _getResult("error", null);
            }

            db.Events.Remove(ev);
            db.SaveChanges();

            return _getResult("deleted", null);
        }

        [HttpPut]
        public IHttpActionResult Put(int id, Event ev)
        {
            if (!ModelState.IsValid)
            {
                return _getResult("error", null);
            }

            ev.id = id;
            db.Entry(ev).State = EntityState.Modified;
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return _getResult("error", null);
            }

            return _getResult("updated", null);
        }
    }
}
~~~

- POST request means that a new item needs to be inserted into db, 
- PUT updates an existing record and 
- DELETE goes for deleting.

All actions return a JSON response containing the type of the performed operation or “error” if something went wrong.

