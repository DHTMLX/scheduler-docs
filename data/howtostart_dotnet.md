dhtmlxScheduler with ASP.NET MVC
=============================

This tutorial will give you step-by-step instructions on creating Scheduler with [ASP.NET](https://www.asp.net/) and REST API on the server side. 

You can also explore other server-side integration possibilities of Scheduler by choosing one of the following tutorials:

- howtostart_dotnet_core.md
- howtostart_nodejs.md
- howtostart_php.md
- howtostart_php_laravel.md
- howtostart_ruby.md
- howtostart_connector.md

We will make use of the ASP.NET MVC 5 web platform and the Web API controller for REST API to create a Scheduler application. To organize communication with a database we will use 
the [Entity Framework](http://www.asp.net/entity-framework). We will build our application with the help of the Visual Studio IDE.

{{note
The complete source code is [available on GitHub](https://github.com/DHTMLX/scheduler-howto-dotnet).
}}

Step 1. Creating a project
----------------------------

###Creating a new Visual Studio Project

Let's start by running Visual Studio and creating a new project. For this, open the File menu tab and choose:<br> New -> Project. Then Select ASP.NET Web Application and press Next.

![New project](how_to_start_net_create_project.png)

Enter the project name *DHX.Scheduler.Web* and choose the location (if needed): 

![Project config](how_to_start_net_project_config.png)

Select an Empty project among available templates and check MVC and Web API checkboxes to the right of the list of templates: 

![Empty project](how_to_start_net_empty_project.png)


Step 2. Adding Scheduler to the page
------------------------------------

###Creating a Controller

Now we have an empty project and everything is ready for implementing our scheduler.

Firstly, we will add an MVC controller which will show a page with a  scheduler.

To create it, call the context menu for the Controllers folder and choose Add -> Controller. In the opened window select MVC 5 Controller -> Empty and press Add. Enter the name of the new controller, let it be
"HomeController".

![Home controller](how_to_start_net_controller.png)

HomeController has the *Index()* method of the *ActionResult* class by default, so it doesn't require any additional logic. We will just add a view for it. 

{{snippet Controllers/HomeController.cs}}
~~~
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DHX.Scheduler.Web.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
    }
}
~~~

###Creating a View

Now it's time to create our index page. Go to View/Home and add an empty view named Index: 

![Index view](how_to_start_net_index_view.png)

Open the newly created view and put the following code into it: 

{{snippet Views/Home/Index.html}}
~~~
@{
    Layout = null;
}

<!DOCTYPE html>

<html>
<head>
    <meta name="viewport" content="width=device-width" />
    <title>Index</title>
    <link href="https://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler_material.css"
          rel="stylesheet" type="text/css" />
    <script src="https://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function(event) {
            // initializing scheduler
            scheduler.init("scheduler_here", new Date(2019,0,15));

            // initiating data loading
            scheduler.load("/api/scheduler");
            // initializing dataProcessor
            var dp = new dataProcessor("/api/scheduler");
            // and attaching it to scheduler
            dp.init(scheduler);
            // setting the REST mode for dataProcessor
            dp.setTransactionMode("REST");
        });
    </script>
</head>
<body>
  <div id="scheduler_here" class="dhx_cal_container" style='width:100%; height:100vh;'>
        <div class="dhx_cal_navline">
            <div class="dhx_cal_prev_button">&nbsp;</div>
            <div class="dhx_cal_next_button">&nbsp;</div>
            <div class="dhx_cal_today_button"></div>
            <div class="dhx_cal_date"></div>
            <div class="dhx_cal_tab" name="day_tab"></div>
            <div class="dhx_cal_tab" name="week_tab"></div>
            <div class="dhx_cal_tab" name="month_tab"></div>
        </div>
        <div class="dhx_cal_header"></div>
        <div class="dhx_cal_data"></div>
  </div>
</body>
</html>
~~~

What we have done here: 

- defined a simple page markup for our scheduler application
- added dhtmlx scheduler js/css sources using [CDN links](install_with_bower.md#cdn)
- created scheduler on the page

And also we told the scheduler that it's going to work with the RESTful API on a backend and use ["/api/scheduler/"](server_integration.html#technique) to get all data during loading and as a default route:

{{snippet Views/Home/Index.cshtml}}
~~~
scheduler.load("/api/scheduler");
// initializing dataProcessor
var dp = new dataProcessor("/api/scheduler");
// and attaching it to scheduler
dp.init(scheduler);
// setting the REST mode for dataProcessor
dp.setTransactionMode("REST");
~~~

The server side itself will be implemented a bit later. For now, you can run the application and see that a scheduler is rendered on the page.

![Scheduler initialization](how_to_start_net_scheduler_init.png)


Step 3. Creating models and database
---------------------------------

###Creating Models

Now we should define model classes for scheduler. You'll need a class for scheduler events. As you can see, dhtmlxScheduler uses a certain naming convention for data model that is different from 
the one traditionally used in C#. The client-side model can also contain some properties that you don't need to store in a database, but which will be used either in the client logic or in the backend one.

Because of this, we'll go with the [Data Transfer Object](https://docs.microsoft.com/en-us/aspnet/web-api/overview/data/using-web-api-with-entity-framework/part-5) pattern here: 
we'll define domain model classes that will be used with EF and inside the app, and DTO classes that will be used to communicate with Web API. Then mapping between the two models will be implemented.


####Scheduler Event Model

First we will create a class for Event. This is how the model can look like:

{{snippet Models/SchedulerEvent.cs}}
~~~
using System;

namespace DHX.Scheduler.Web.Models
{
    public class SchedulerEvent
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

    }
}
~~~

Note that scheduler events can have all kinds of additional properties, which can be utilized in the calendar. We're showing you the basic stuff here.


###Configuring Database Connection

####Installing Entity Framework

You can either install the framework via the NuGet package manager:

![Entity Framework via NuGet](how_to_start_net_entity_nuget.png)

or you can run the following command in the Package Manager Console:

~~~
PM> Install-Package EntityFramework
~~~

####Creating Database Context

The next step is to create Context. Context represents a session with the Database. It allows getting and saving data.

Call the context menu for the *Models* folder and select Add -> Class. The new class will be called "SchedulerContext" and will have the following content: 

{{snippet Models/SchedulerContext.cs}}
~~~
using System.Data.Entity;

namespace DHX.Scheduler.Web.Models
{
    public class SchedulerContext : DbContext
    {
        public DbSet<SchedulerEvent> SchedulerEvents { get; set; }
    }
}
~~~

####Adding initial records to database

Now we can add some records into the database.

The Entity Framework can automatically create a database when an application runs. We should specify that a database should be dropped and re-created whenever the model changes.

First, we should create a database initializer. For this, we need to add a new class in the *App_Start* folder that will be inherited from the *DropCreateDatabaseIfModelChanges* class. Let's call it "SchedulerInitializer": 

In this class we are going to redefine the *Seed()* method to populate it with test data. Then we will add the entities collection into the context with the *Add()* method.

The full code of the *SchedulerInitializer* class is given below:

{{snippet App_Start/SchedulerInitializer.cs}}
~~~
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

using DHX.Scheduler.Web.Models;

namespace DHX.Scheduler.Web.App_Start
{
  public class SchedulerInitializer:DropCreateDatabaseIfModelChanges<SchedulerContext>
    {
        protected override void Seed(SchedulerContext context)
        {
            List<SchedulerEvent> events = new List<SchedulerEvent>()
            {
                new SchedulerEvent()
                {
                    Id = 1,
                    Text = "Event 1",
                    StartDate = new DateTime(2019, 1, 15, 2, 0, 0),
                    EndDate = new DateTime(2019, 1, 15, 4, 0, 0)
                },
                new SchedulerEvent()
                {
                    Id = 2,
                    Text = "Event 2",
                    StartDate = new DateTime(2019, 1, 17, 3, 0, 0),
                    EndDate = new DateTime(2019, 1, 17, 6, 0, 0)
                },
                new SchedulerEvent()
                {
                    Id = 3,
                    Text = "Multiday event",
                    StartDate = new DateTime(2019, 1, 15, 0, 0, 0),
                    EndDate = new DateTime(2019, 1, 20, 0, 0, 0)
                }
            };

            events.ForEach(s => context.SchedulerEvents.Add(s));
            context.SaveChanges();

        }

    }
}
~~~
   
Open the *Global.asax* file. It contains the code that runs on the application start. Add the necessary namespace and the code line that will set Initializer for our context into the *Application_Start()* method:

{{snippet Global.asax.cs}}
~~~
using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Http;

using System.Data.Entity;
using DHX.Scheduler.Web.App_Start;

namespace DHX.Scheduler.Web
{
    public class Global : HttpApplication
    {
        void Application_Start(object sender, EventArgs e)
        {
            // Code that runs on application startup
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            Database.SetInitializer(new SchedulerInitializer()); /*!*/
        }
    }
}
~~~

###Defining DTOs and Mapping

It's time to declare DTO classes that will be used for Web API. As for mapping between Model and DTO, we'll define an explicit conversion operator for our classes.
  
The WebAPIEvent class will look like this: 

{{snippet WebAPIEvent.cs}}
~~~
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DHX.Scheduler.Web.Models
{
    public class WebAPIEvent
    {
        public int id { get; set; }
        public string text { get; set; }
        public string start_date { get; set; }
        public string end_date { get; set; }

        public static explicit operator WebAPIEvent(SchedulerEvent schedulerEvent)
        {
            return new WebAPIEvent
            {
                id = schedulerEvent.Id,
                text = schedulerEvent.Text,
                start_date = schedulerEvent.StartDate.ToString("yyyy-MM-dd HH:mm"),
                end_date = schedulerEvent.EndDate.ToString("yyyy-MM-dd HH:mm")
            };
        }

        public static explicit operator SchedulerEvent(WebAPIEvent schedulerEvent)
        {
            return new SchedulerEvent
            {
                Id = schedulerEvent.id,
                Text = schedulerEvent.text,
                StartDate = DateTime.Parse(
                	schedulerEvent.start_date, 
                	System.Globalization.CultureInfo.InvariantCulture),
                EndDate = DateTime.Parse(
                	schedulerEvent.end_date,
                    System.Globalization.CultureInfo.InvariantCulture)
            };
        }

    }
}
~~~

Step 4. Implementing Web API
--------------------------

###Scheduler Controller

To create a new controller:

- Call the context menu for the Controllers folder and select Add -> Controller. 
- Choose the Web API 2 Controller -> Empty. Type the name of a new controller - "SchedulerController".

Now we should implement basic CRUD actions for the scheduler events entry:

{{snippet Controllers/SchedulerController.cs}}
~~~
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Http;

using DHX.Scheduler.Web.App_Start;
using DHX.Scheduler.Web.Models;

namespace DHX.Scheduler.Web.Controllers
{
    public class SchedulerController : ApiController
    {
        private SchedulerContext db = new SchedulerContext();

        // GET: api/scheduler
        public IEnumerable<WebAPIEvent> Get()
        {
            return db.SchedulerEvents
                .ToList()
                .Select(e => (WebAPIEvent)e);
        }

        // GET: api/scheduler/5
        public WebAPIEventGet(int id)
        {
            return (WebAPIEvent)db.SchedulerEvents.Find(id);
        }

        // PUT: api/scheduler/5
        [HttpPut]
        public IHttpActionResult EditSchedulerEvent(int id, WebAPIEvent webAPIEvent)
        {
            var updatedSchedulerEvent = (SchedulerEvent)WebAPIEvent;
            updatedSchedulerEvent.Id = id;
            db.Entry(updatedSchedulerEvent).State = EntityState.Modified;
            db.SaveChanges();

            return Ok(new
            {
                action = "updated"
            });
        }

        // POST: api/scheduler/5
        [HttpPost]
        public IHttpActionResult CreateSchedulerEvent(WebAPIEvent webAPIEvent)
        {
            var newSchedulerEvent = (SchedulerEvent)WebAPIEvent;
            db.SchedulerEvents.Add(newSchedulerEvent);
            db.SaveChanges();

            return Ok(new
            {
                tid = newSchedulerEvent.Id,
                action = "inserted"
            });
        }

        // DELETE: api/scheduler/5
        [HttpDelete]
        public IHttpActionResult DeleteSchedulerEvent(int id)
        {
            var schedulerEvent = db.SchedulerEvents.Find(id);
            if (schedulerEvent != null)
            {
                db.SchedulerEvents.Remove(schedulerEvent);
                db.SaveChanges();
            }

            return Ok(new
            {
                action = "deleted"
            });
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
~~~

In the above code we: 

- load scheduler events from database and output their data transfer objects in the GET actions  
- get DTOs as an input, converting it to a SchedulerEvent model and saving changes to the DB Context in the PUT/POST actions

Everything is ready. You can run the application and see the fully-fledged Scheduler.

![Ready Scheduler](how_to_start_net_ready_scheduler.png)

[You can find a ready demo at github](https://github.com/DHTMLX/scheduler-howto-dotnet).


Dynamic loading
---------------

Each time scheduler calls our GET action, it loads the whole events table. It may be ok for a start, but after the app is used for a several months the amount of transferred data will significantly grow. 
So it may be useful to implement dynamic loading, which allows scheduler to load only a required range of events.

On the client side it is enabled by the [scheduler.setLoadMode](api/scheduler_setloadmode.md) method: 

{{snippet Views/Home/Index.cshtml}}
~~~
scheduler.setLoadMode("day");
// load data from the backend
scheduler.load("/api/scheduler", "json");
~~~

After that scheduler will start adding *from* and *to* date parameters to GET requests, so that the backend could return only events between these dates.

All we need to do is to get these parameters in our GET action and to filter events appropriately. This is how we can do it:

{{snippet Controllers/SchedulerController.cs}}
~~~
// GET: api/scheduler
public IEnumerable<WebAPIEvent> Get(DateTime from, DateTime to)
{
	return db.SchedulerEvents
       .Where(e => e.StartDate < to && e.EndDate >= from)
       .ToList()
       .Select(e => (WebAPIEvent)e);
}
~~~


Recurring events
-------------------

In order to enable recurrence (e.g. "repeat event daily"), you'll need to add an appropriate extension to the scheduler page: 

~~~
<script src="https://cdn.dhtmlx.com/scheduler/edge/ext/dhtmlxscheduler_recurring.js">
	</script>
~~~

###Updating the Models

We also need to update our model in order for it to store the recurrence info: 

{{snippet Models/SchedulerEvent.cs}}
~~~
using System;

namespace DHX.Scheduler.Web.Models
{
    public class SchedulerEvent
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public int EventPID { get; set; }
        public string RecType { get; set; }
        public long EventLength { get; set; }

    }
}
~~~

as well as the DTO: 

{{snippet Models/WebAPIEvent.cs}}
~~~
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DHX.Scheduler.Web.Models
{
    public class WebAPIEvent
    {
        public int id { get; set; }
        public string text { get; set; }
        public string start_date { get; set; }
        public string end_date { get; set; }

        public int? event_pid { get; set; }
        public string rec_type { get; set; }
        public long? event_length { get; set; }

        public static explicit operator WebAPIEvent(SchedulerEvent schedulerEvent)
        {
            return new WebAPIEvent
            {
                id = schedulerEvent.Id,
                text = schedulerEvent.Text,
                start_date = schedulerEvent.StartDate.ToString("yyyy-MM-dd HH:mm"),
                end_date = schedulerEvent.EndDate.ToString("yyyy-MM-dd HH:mm"),

                event_pid = schedulerEvent.EventPID,
                rec_type = schedulerEvent.RecType,
                event_length = schedulerEvent.EventLength
            };
        }

        public static explicit operator SchedulerEvent(WebAPIEvent schedulerEvent)
        {
            return new SchedulerEvent
            {
                Id = schedulerEvent.id,
                Text = schedulerEvent.text,
                StartDate = DateTime.Parse(
                	schedulerEvent.start_date, 
                	System.Globalization.CultureInfo.InvariantCulture),
                EndDate = DateTime.Parse(
                	schedulerEvent.end_date, 
                    System.Globalization.CultureInfo.InvariantCulture),
                EventPID = schedulerEvent.event_pid != null ? 
                	schedulerEvent.event_pid.Value : 0,
        		EventLength = schedulerEvent.event_length != null ? 
                	schedulerEvent.event_length.Value : 0,
                RecType = schedulerEvent.rec_type
            };
        }

    }
}
~~~

###Updating API Controller

Lastly, we need to modify our PUT/POST/DELETE actions in order to handle [special rules of recurring events](recurring_events.md#editingdeletingacertainoccurrenceintheseries). 

First, let's take a look at the POST action. We need to process a special case for recurring events: deletion of a specific occurrence of the recurring series 
requires creating a new database record and the client will call the insert action for it:

{{snippet Controllers/SchedulerEvent.cs}}
~~~
// POST: api/scheduler/5
[HttpPost]
public IHttpActionResult CreateSchedulerEvent(WebAPIEvent webAPIEvent)
{
  var newSchedulerEvent = (SchedulerEvent)WebAPIEvent;
  db.SchedulerEvents.Add(newSchedulerEvent);
  db.SaveChanges();

  // delete a single occurrence from a recurring series
  var resultAction = "inserted";
  if(newSchedulerEvent.RecType == "none")
  {
     resultAction = "deleted";
  }

  return Ok(new
  {
  	tid = newSchedulerEvent.Id,
    action = resultAction
  });
}
~~~

In the PUT action we need to make sure to update all properties of the model. Additionally, we need to handle a different special case there: when a recurring series 
is modified, we need to delete all modified occurrences of that series:


{{snippet Controllers/SchedulerController.cs}}
~~~
// PUT: api/scheduler/5
[HttpPut]
public IHttpActionResult EditSchedulerEvent(int id, WebAPIEvent webAPIEvent)
{
	var updatedSchedulerEvent = (SchedulerEvent)WebAPIEvent;
    updatedSchedulerEvent.Id = id;
    db.Entry(updatedSchedulerEvent).State = EntityState.Modified;

    if (!string.IsNullOrEmpty(updatedSchedulerEvent.RecType) && 
    	updatedSchedulerEvent.RecType != "none")
    {
      //all modified occurrences must be deleted when we update a recurring series
      //https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
      
      db.SchedulerEvents.RemoveRange(
         db.SchedulerEvents.Where(e => e.EventPID == id)
      );
    }

    db.SaveChanges();

    return Ok(new
    {
       action = "updated"
    });
}
~~~

And finally, the DELETE action. Here we have to check two special cases:

- if the event you are going to delete has a non-empty event_pid, it means a user deletes a modified instance of the recurring series. Instead of deleting such a record from the database, you need to give it rec_type='none', 
in order for scheduler to skip this occurrence.
- if a user deletes a whole recurring series, you also need to delete all the modified instances of that series.

{{snippet Controllers/SchedulerController.cs}}
~~~
// DELETE: api/scheduler/5
[HttpDelete]
public IHttpActionResult DeleteSchedulerEvent(int id)
{
	var schedulerEvent = db.SchedulerEvents.Find(id);
    if (schedulerEvent != null)
    {
     //some logic specific to recurring events support
     //https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
          
     if(schedulerEvent.EventPID != default(int))
     {
       // deleting a modified occurrence from a recurring series
       // If an event with the event_pid value was deleted, it should be updated 
       // with rec_type==none instead of deleting.

       schedulerEvent.RecType = "none";
     }
     else
     {
       // if a recurring series deleted, delete all modified occurrences of the series
            
       if (!string.IsNullOrEmpty(schedulerEvent.RecType) && 
         schedulerEvent.RecType != "none")
       {
       //all modified occurrences must be deleted when we update recurring series
	  //https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
            	
         db.SchedulerEvents.RemoveRange(
             db.SchedulerEvents.Where(ev => ev.EventPID == id)
         );
       }

       db.SchedulerEvents.Remove(schedulerEvent);
     }
     db.SaveChanges();
    }

    return Ok(new
    {
      action = "deleted"
    });
}
~~~

### Parsing recurring series

A recurring event is stored in the database as a single record that can be splitted up by Scheduler on the client side.
If you need to get dates of separate events on the server side, use a helper library for parsing recurring events of dhtmlxScheduler on ASP.NET. <br>
You will find [the ready library on GitHub](https://github.com/DHTMLX/scheduler-recurring-events-dotnet).

Error handling
----------------

[Exception filters](https://msdn.microsoft.com/en-us/library/gg416513(v=vs.98).aspx) can be used for capturing exceptions in CRUD handlers and returning a client response that can be
[recognized](server_integration.md#errorhandling) by the client-side scheduler.

To provide error handling for the scheduler, follow the steps below:

Go to *App_Start* and add a new class called *SchedulerAPIExceptionFilterAttribute*:

{{snippet App_Start/SchedulerAPIExceptionFilterAttribute.cs}}
~~~
using System;
using System.Net;
using System.Net.Http;
using System.Web.Http.Filters;

namespace DHX.Scheduler.Web.App_Start
{
 public class SchedulerAPIExceptionFilterAttribute : ExceptionFilterAttribute
  {
   public override void OnException(HttpActionExecutedContext context)
    {
      context.Response = context.Request.CreateResponse(
      	HttpStatusCode.InternalServerError, new
        {
          action = "error",
          message = context.Exception.Message
        });
    }
  }
}
~~~

Then we will add this class to our WebAPI controller (SchedulerController) as in:

{{snippet Controllers/SchedulerController.cs}}
~~~
namespace DHX.Scheduler.Web.Controllers
{
    [SchedulerAPIExceptionFilter]
    public class SchedulerController : ApiController
    {
~~~

Now if any Web API controller fires an exception while processing the request, the client side will receive an error status and an error message that can be either somehow processed or shown to the user.

Note that returning an exception message to the client might not be the best idea for a production environment.

Application Security
----------------------

Scheduler doesn't provide any means of preventing an application from various threats, such as SQL injections, XSS and CSRF attacks. The responsibility for keeping an application safe is on the developers who implement the backend. Read the details in the [corresponding article](app_security.md).


###XSS protection

A simple solution would be to encode the text properties of data items when we send them to the client side.

For example, in the below code a built-in HtmlEncoder is used to escape HTML values in the text of events. That way our database will contain unmodified data, but the client side will receive safe values of `event.text`.

{{snippet Model.WebAPIEvent.cs}}
~~~
using System.Text.Encodings.Web;

public static explicit operator WebAPIEvent(SchedulerEvent schedulerEvent)
{
  return new WebAPIEvent
    {
      id = schedulerEvent.Id,
      text = HtmlEncoder.Default.Encode(schedulerEvent.Text),
      start_date = schedulerEvent.StartDate.ToString("yyyy-MM-dd HH:mm"),
      end_date = schedulerEvent.EndDate.ToString("yyyy-MM-dd HH:mm")
    };
}
~~~

Another approach would be to use a specialized library, e.g. [HtmlAgilityPack](https://html-agility-pack.net/) and completely strip any HTML event when we save/load data.

Troubleshooting
---------------

In case you've completed the above steps to implement Scheduler integration with ASP.NET MVC, but Scheduler doesn't render events on a page, have a look at the troubleshooting.md article. 
It describes the ways of identifying the roots of the problems.


What's next
---------------

Now you have a fully functioning Scheduler. You can view the full code on [GitHub](https://github.com/DHTMLX/scheduler-howto-dotnet), clone or download it and use it for your projects.

You can also check [guides on the numerous features of Scheduler](guides.md) or [tutorials on integration of Scheduler with other backend frameworks](howtostart_guides.md).
