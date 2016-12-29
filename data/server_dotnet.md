ASP.NET MVC Code Samples
==================================

This article will give you instructions on how to configure server side built with ASP.NET and REST API to load data into Scheduler and save changes on the server. 

There's a [detailed tutorial](howtostart_dotnet.md) on using Scheduler with ASP.NET MVC.

You can also explore peculiarities of implementing integration of Scheduler with server side using other technologies:

- server_php.md
- server_nodejs.md
- server_ruby.md

Creating Models
-----------------------

Model is an object that will represent data in the Scheduler. Scheduler can load data either in [JSON or XML formats](data_formats.md).

Data is represented in Scheduler in the form of Event. So we should create a simple model for events.

Create the "Event" class and add the necessary properties into it:

~~~js
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace scheduler_rest_net.Models
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

Configuring DataBase Connection
------------------------------

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

namespace scheduler_rest_net.Models
{
    public class SchedulerContext: DbContext
    {
        public DbSet<Event> Events { get; set; }
    }
}
~~~

Loading and Saving Data
-------------------------

There's a [common technique](server_integration.md#technique) for loading data into Scheduler from the server side.

You will find the requirements to the client side,
as well as the [description of possible requests and responses](server_integration.md#requestresponsedetails)
in the server_integration.md article.

[On the client side](server_integration.md#technique) we've initialized scheduler and added the following line:

~~~js
scheduler.load("events.php");
~~~


Below we will consider how to load data into Scheduler using ASP.NET MVC server side.

<h3 id="scheduler_data">Adding object with Scheduler data</h3>

Let's create a controller that will be responsible for loading events into Scheduler and providing CRUD API for events.

Activate a context menu for the Controllers folder and select Add -> Controller.<br>
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
		
     // specifies the logic of forming a response
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

In the first part of the code we specify the desired date format, use the *SchedulerContext* variable for access to the database and set the format of a response.

After that all necessary types of requests are described.

####Requests

- GET request loads events into the scheduler

It will create an object with data for Scheduler which will contain a list of events. The dates of events should be converted into appropriate strings.

- POST request means that a new item needs to be inserted into the database
- PUT request updates an existing record 
- DELETE request goes for deleting

####Responses

All actions return a JSON response containing the type of the performed operation or “error” if something went wrong. 

Note that a response for the "insert" action also contains a database id of the new record. 
It will be applied on the client side, so the new item could be mapped to the database entity. 

You can find the detailed list of requests and responses in the article server_integration.md#requestresponsedetails.