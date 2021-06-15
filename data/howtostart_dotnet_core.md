dhtmlxScheduler with ASP.NET Core
============================

This tutorial gives you step-by-step instructions on how to create Scheduler with [ASP.NET](https://dotnet.microsoft.com/apps/aspnet) Core on the server side.

You can also read tutorials on other server-side technologies:

- howtostart_dotnet.md
- howtostart_nodejs.md
- howtostart_plain_php.md
- howtostart_php_slim4.md
- howtostart_php_laravel.md
- howtostart_ruby.md
- howtostart_connector.md


To organize communication with database, the [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/) is used. The application is built with the help of the Visual Studio 2017.

{{note
The complete source code is [available on GitHub](https://github.com/DHTMLX/scheduler-howto-dotnet-core).
}}

Step 1. Creating a project
-------------------

Launch Visual Studio 2017 and create a new project. Open the **File** menu and select: *New -> Project*.

Next select ASP.NET Core Web Application and name it *SchedulerApp*.

![Scheduler App](howtostart_dotnetcore_newapp.png)

Select an API template.

![API template](howtostart_dotnetcore_apitemplate.png)


Thus you've created a project and can proceed to add markup and script for Scheduler.


Step 2. Adding Scheduler to the page
---------------------------

Go to **wwwroot** and create an *index.html* file.

![Explorer](howtostart_dotnetcore_indexpage.png)

In the newly created file make a simple page for a scheduler chart.

Note, that scheduler files are [added from CDN](install_with_bower.md#cdn) in this demo. If you use the Professional version of the component, you'll need to 
[add scheduler files to the project manually](install_with_bower.md#addingproeditionintoproject).

{{snippet index.html}}
~~~js
<!DOCTYPE html>
<html>
<head>
    <title>Getting started with dhtmlxScheduler</title>
    <meta charset="utf-8">
    <script src="https://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.js"></script>
    <link href="https://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler_material.css" 
    	rel="stylesheet" type="text/css" charset="utf-8">
    <style>
        html, body {
            margin: 0px;
            padding: 0px;
        }
    </style>
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
    <script>
        scheduler.init('scheduler_here', new Date(2019, 0, 20), "week");
    </script>
</body>
</html>
~~~

Next go to **Startup.cs** and tell the application to use the **index.html** page. In order to do so, we need to configure the app to serve static files from the *wwwroot* folder.
It's done in the `Configure` method by calling the `app.UseStaticFiles()` method. 
You can [find more details here](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/static-files?view=aspnetcore-2.1&tabs=aspnetcore2x).

You also need to add the required middleware to **Startup.cs**, by replacing the "Hello world" stub in the `Configure()` method with two highlighted lines of code:

{{snippet Startup.cs }}
~~~js
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace SchedulerApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. 
        // Use it to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
          services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

		// This method gets called by the runtime. 
        // Use it to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            app.UseDefaultFiles(); /*!*/
            app.UseStaticFiles();  /*!*/

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
~~~


The 2 added middleware are:

- `app.UseDefaultFiles()` – allows serving default files. It will search the **wwwroot** folder for the following files:
	- index.html
	- index.htm
	- default.html
	- default.htm
Thus, you can choose any of them, while in this tutorial "index.html" is used.
`UseDefaultFiles()` is just an URL-rewriter that doesn't actually serve the file. For this purpose you need to also add the `UseStaticFiles()` file.

- `app.UseStaticFiles()` – is responsible for serving all [static files present in the **wwwroot** folder](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/static-files?view=aspnetcore-2.1).


Once you are done with it, an empty scheduler should appear on the page when you run the application.

![Scheduler init](howtostart_dotnetcore_init.png)

Next steps will show you how to create a backend API and connect scheduler to it.

Step 3. Creating models and database
-------------------------

Let's begin with data model. You'll need a class for scheduler events. dhtmlxScheduler uses [non-conventional names for model properties](data_formats.md#json) from the .NET world perspective.

To deal with this, the [Data Transfer Object (DTO)](https://docs.microsoft.com/en-us/aspnet/web-api/overview/data/using-web-api-with-entity-framework/part-5) pattern will be used. Two kinds of models will be defined:

- domain model classes that will be used with EF Core and inside the app
- DTO classes that will be used to communicate with Web API.

Then mapping between the two models should be implemented.

### Models

Create a new folder called **Models** in the project folder. This is where model classes and EF context will be implemented.

### Event Model

First, create a class for events of the calendar. Create a file in the Models folder and name it **SchedulerEvent.cs**. 

This is how the model can look like:

{{snippet SchedulerApp/Models/SchedulerEvent.cs}}
~~~js
using System;

namespace SchedulerApp.Models
{
    public class SchedulerEvent
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
~~~

Note, that scheduler events can have all kinds of additional properties, which can be utilized in the calendar. We're showing you the basic stuff here.


###Database context

Firstly, we need to install the Entity Framework for ASP.NET Core. You can either do it via the NuGet package manager:

![Entity via Nuget](howtostart_dotnetcore_enitityvianuget.png)

Or use the Package Manager command line:

~~~
PM> Install-Package Microsoft.EntityFrameworkCore.SqlServer
~~~

The Entity Framework Core will be used to manage communication of the app with a database.


###Creating Entity Context

Next you need to define a session with the database and enable loading and saving data. For this, create a Context class:

- add the **SchedulerContext.cs** file in the **Models** folder 
- define the database context:

{{snippet SchedulerApp/Models/SchedulerContext.cs}}
~~~
using Microsoft.EntityFrameworkCore;

namespace SchedulerApp.Models
{
    public class SchedulerContext : DbContext
    {
        public SchedulerContext(DbContextOptions<SchedulerContext> options)
           : base(options)
        {
        }
        public DbSet<SchedulerEvent> Events { get; set; }

    }
}
~~~


###Adding first records to database

Now we can add records to the database. Let's create the database initializer that will populate the database with events. 

In the **Models** folder define a class and call it **SchedulerSeeder**. The class will have the **Seed()** method that will add events and links to the database.

{{snippet SchedulerApp/Models/SchedulerSeeder.cs}}
~~~
using System;
using System.Collections.Generic;
using System.Linq;

namespace SchedulerApp.Models
{
    public static class SchedulerSeeder
    {
        public static void Seed(SchedulerContext context)
        {
            if (context.Events.Any())
            {
                return;   // DB has been seeded
            }

            var events = new List<SchedulerEvent>()
            {
                new SchedulerEvent
                {
                    Name = "Event 1",
                    StartDate = new DateTime(2019, 1, 15, 2, 0, 0),
                    EndDate = new DateTime(2019, 1, 15, 4, 0, 0)
                },
                new SchedulerEvent()
                {
                    Name = "Event 2",
                    StartDate = new DateTime(2019, 1, 17, 3, 0, 0),
                    EndDate = new DateTime(2019, 1, 17, 6, 0, 0)
                },
                new SchedulerEvent()
                {
                    Name = "Multiday event",
                    StartDate = new DateTime(2019, 1, 15, 0, 0, 0),
                    EndDate = new DateTime(2019, 1, 20, 0, 0, 0)
                }
            };

            events.ForEach(s => context.Events.Add(s));
            context.SaveChanges();
        }
    }
}
~~~



###Registering Database

Now you should register the database in **Startup.cs**. But first you need a connection string for it. It will be stored
[in a JSON file in the application settings](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-2.1&tabs=basicconfiguration#configuration-by-environment). 
If you used `API` template when created the project, this file should already exist in project folder. If you used `Empty template`, you’ll need to create one.

Create the *appsettings.json* file (or open it if we have it already) and add a connection string to the database:

{{snippet appsettings.json }} 
~~~
{
  "ConnectionStrings": {
    "DefaultConnection":"Server=(localdb)\\mssqllocaldb;
    	Database=SchedulerDatabase;Trusted_Connection=True;"  }
}
~~~


After that you can register the database context via 
[dependency injection](https://docs.microsoft.com/en-us/aspnet/core/data/ef-rp/intro?view=aspnetcore-2.1&tabs=visual-studio).

Add the following namespaces to **Startup.cs**:

{{snippet Startup.cs }}
~~~
using Microsoft.EntityFrameworkCore;
using SchedulerApp.Models;
using Microsoft.Extensions.Configuration;
~~~

The declaration will look like this:

{{snippet Startup.cs }}
~~~
public IConfiguration Configuration { get; }
public Startup(IConfiguration configuration)
{
    Configuration = configuration;
}
 
public void ConfigureServices(IServiceCollection services)
{
    services.AddDbContext<SchedulerContext>(options => 
        options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
}
~~~

Here is the complete code of **Startup.cs**:

{{snippet Startup.cs }}
~~~
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
 
using Microsoft.EntityFrameworkCore;
using DHX.Scheduler.Models;
using Microsoft.Extensions.Configuration;
 
namespace DHX.Scheduler
{
 public class Startup
   {
    public IConfiguration Configuration { get; }
    public Startup(IConfiguration configuration)
     {
        Configuration = configuration;
     }
 
 
     //This method is called by the runtime. Use it to add services to the container.
     //More info on app config here - https://go.microsoft.com/fwlink/?LinkID=398940
     public void ConfigureServices(IServiceCollection services)
     {
       services.AddDbContext<SchedulerContext>(options => 
         options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
     }
 
     //The method is called by the runtime. Use it to configure HTTP request pipeline.
     public void Configure(IApplicationBuilder app, IHostingEnvironment env)
     {
       if (env.IsDevelopment())
       {
          app.UseDeveloperExceptionPage();
       }
 
       app.UseDefaultFiles();
       app.UseStaticFiles();
     }
  }
}
~~~

Finally, you need to initialize and seed the database on the app startup. Normally, we'd want to use migrations for that, but for simplicity they aren't used here.

Let's begin with creating a class where initialization will be done. Create the **SchedulerInitializerExtension.cs** file in the **Models** folder:

{{snippet Models/SchedulerInitializerExtension.cs}} 
~~~
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;

namespace SchedulerApp.Models
{
 public static class SchedulerInitializerExtension
   {
    public static IWebHost InitializeDatabase(this IWebHost webHost)
     {
      var serviceScopeFactory =
      (IServiceScopeFactory)webHost.Services.GetService(typeof(IServiceScopeFactory));

        using (var scope = serviceScopeFactory.CreateScope())
        {
           var services = scope.ServiceProvider;
           var dbContext = services.GetRequiredService<SchedulerContext>();
           dbContext.Database.EnsureCreated();
           SchedulerSeeder.Seed(dbContext);
        }

        return webHost;
     }
   }
}
~~~


Next call **InitializeDatabase()** in the **Program.Main** pipeline:

{{snippet Program.cs }} 
~~~
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using SchedulerApp.Models;

namespace SchedulerApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args)
                .Build()
                .InitializeDatabase() //!
                .Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
~~~


The current part is finished, let's return to Scheduler.

###Define DTOs and Mapping

It is high time to define DTO classes that will be used for Web API. Let's begin with the DTO class for SchedulerEvent. In the **Models** folder create a file and define the **WebAPIEvent.cs** class:

{{snippet Models/WebApiEvent.cs}}
~~~
using System;

namespace SchedulerApp.Models
{
    public class WebAPIEvent
    {
        public int id { get; set; }
        public string text { get; set; }
        public string start_date { get; set; }
        public string end_date { get; set; }

        public static explicit operator WebAPIEvent(SchedulerEvent ev)
        {
            return new WebAPIEvent
            {
                id = ev.Id,
                text = ev.Name,
                start_date = ev.StartDate.ToString("yyyy-MM-dd HH:mm"),
                end_date = ev.EndDate.ToString("yyyy-MM-dd HH:mm")
            };
        }

        public static explicit operator SchedulerEvent(WebAPIEvent ev)
        {
            return new SchedulerEvent
            {
                Id = ev.id,
                Name = ev.text,
                StartDate = DateTime.Parse(ev.start_date,
                    System.Globalization.CultureInfo.InvariantCulture),
                EndDate = DateTime.Parse(ev.end_date,
                    System.Globalization.CultureInfo.InvariantCulture)
            };
        }
    }
}
~~~

When you finish this step, you should get the following folder structure:

![Models](howtostart_dotnetcore_models.png)

Now we can run the app in order to check that everything is in place. If we don't see a runtime error, then everything is fine.

Step 4. Implementing Web API
---------------------------

Now it's time for the actual REST API implementation. Go to **Startup.cs** and enable MVC routing, if it's not enabled yet:

{{snippet Startup.cs}}
~~~
public void ConfigureServices(IServiceCollection services)
{
  services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1); /*!*/
  services.AddDbContext<SchedulerContext>(options =>
     options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
}
 
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
   if (env.IsDevelopment())
   {
      app.UseDeveloperExceptionPage();
   }
   else
   {
      app.UseHsts();
   }
   app.UseDefaultFiles();
   app.UseStaticFiles();

   app.UseHttpsRedirection();
   app.UseMvc();/*!*/
}
~~~

###Adding API Controller

Create the **Controllers** folder and create an empty API controller for our events::

{{snippet Controllers/EventController.cs}}
~~~
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SchedulerApp.Models;

namespace SchedulerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly SchedulerContext _context;
        public EventsController(SchedulerContext context)
        {
            _context = context;
        }

        // GET api/events
        [HttpGet]
        public IEnumerable<WebAPIEvent> Get()
        {
            return _context.Events
                .ToList()
                .Select(e => (WebAPIEvent)e);
        }

        // GET api/events/5
        [HttpGet("{id}")]
        public WebAPIEvent Get(int id)
        {
            return (WebAPIEvent)_context
                .Events
                .Find(id);
        }

        // POST api/events
        [HttpPost]
        public ObjectResult Post([FromForm] WebAPIEvent apiEvent)
        {
            var newEvent = (SchedulerEvent)apiEvent;

            _context.Events.Add(newEvent);
            _context.SaveChanges();

            return Ok(new
            {
                tid = newEvent.Id,
                action = "inserted"
            });
        }

        // PUT api/events/5
        [HttpPut("{id}")]
        public ObjectResult Put(int id, [FromForm] WebAPIEvent apiEvent)
        {
            var updatedEvent = (SchedulerEvent)apiEvent;
            var dbEvent = _context.Events.Find(id);
            dbEvent.Name = updatedEvent.Name;
            dbEvent.StartDate = updatedEvent.StartDate;
            dbEvent.EndDate = updatedEvent.EndDate;
            _context.SaveChanges();

            return Ok(new
            {
                action = "updated"
            });
        }

        // DELETE api/events/5
        [HttpDelete("{id}")]
        public ObjectResult DeleteEvent(int id)
        {
            var e = _context.Events.Find(id);
            if (e != null)
            {
            _context.Events.Remove(e);
            _context.SaveChanges();
            }
 
            return Ok(new
            {
                action = "deleted"
            });
        }
    
    }
}
~~~

###Configuring the Client

Web API is done, now we can return to our HTML page and configure scheduler to make use of it:

{{snippet wwwroot/index.html }}
~~~
scheduler.config.xml_date = "%Y-%m-%d %H:%i";
scheduler.init("scheduler_here", new Date(2019, 0, 20), "week");

// load data from backend
scheduler.load("/api/events", "json");
// connect backend to scheduler
var dp = new dataProcessor("/api/events");
dp.init(scheduler);
// set data exchange mode
dp.setTransactionMode("REST");
~~~

Everything is ready. You can run the application and see the fully-fledged Scheduler.

![Scheduler CRUD](howtostart_dotnetcore_webapi.png)

Dynamic loading
-------------------

Each time scheduler calls our `GET` action, it loads the whole events table. It may be ok for a start, but after the app is used for a several months the amount of data transferred will grow dramatically.
So it may be worthwhile to implement dynamic loading, which allows scheduler to load only a required events range.

On the client side it is enabled by the `scheduler.setLoadMode` method:
{{snippet wwwroot/index.html }}
~~~
scheduler.setLoadMode("day");
// load data from backend
scheduler.load("/api/events", "json");
~~~

After that scheduler will start adding `from` and `to` date parameters to `GET` requests, so the backend could return only events between these dates.

All we need to do is to get these parameters in our `GET` action and to filter events appropriately:

{{snippet Controllers/EventsController.cs }}
~~~
// GET api/events
[HttpGet]
public IEnumerable<WebAPIEvent> Get([FromQuery] DateTime from, [FromQuery] DateTime to)
{
	return _context.Events
    	.Where(e => e.StartDate < to && e.EndDate >= from)
        .ToList()
        .Select(e => (WebAPIEvent)e);
}
~~~

Recurring events
---------------

In order to enable recurrence (e.g. "repeat event daily") you'll need to add an appropriate extension to the scheduler page:

~~~
<script src="https://cdn.dhtmlx.com/scheduler/edge/ext/dhtmlxscheduler_recurring.js" ></script>
~~~


###Updating the model

We also need to update our model in order for it to store recurrence info:


{{snippet  Models/SchedulerEvent.cs}}
~~~
using System;

namespace SchedulerApp.Models
{
    public class SchedulerEvent
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public int EventPID { get; set; } /*!*/
        public string RecType { get; set; } /*!*/
        public long EventLength { get; set; } /*!*/

    }
}
~~~

And the data transfer object:

{{snippet Models/WebAPIEvent.cs }}
~~~
using System;
using System.Text.Encodings.Web;

namespace SchedulerApp.Models
{
    public class WebAPIEvent
    {
        public int id { get; set; }
        public string text { get; set; }
        public string start_date { get; set; }
        public string end_date { get; set; }

        public int? event_pid { get; set; } /*!*/
        public string rec_type { get; set; } /*!*/
        public long? event_length { get; set; } /*!*/

        public static explicit operator WebAPIEvent(SchedulerEvent ev)
        {
            return new WebAPIEvent
            {
                id = ev.Id,
                text = HtmlEncoder.Default.Encode(ev.Name), 
                start_date = ev.StartDate.ToString("yyyy-MM-dd HH:mm"),
                end_date = ev.EndDate.ToString("yyyy-MM-dd HH:mm"),
                event_pid  = ev.EventPID,
                rec_type = ev.RecType,
                event_length = ev.EventLength
            };
        }

        public static explicit operator SchedulerEvent(WebAPIEvent ev)
        {
            return new SchedulerEvent
            {
                Id = ev.id,
                Name = ev.text,
                StartDate = DateTime.Parse(ev.start_date,
                    System.Globalization.CultureInfo.InvariantCulture),
                EndDate = DateTime.Parse(ev.end_date,
                    System.Globalization.CultureInfo.InvariantCulture),
    ///
                EventPID = ev.event_pid != null ? ev.event_pid.Value : 0, 
                EventLength = ev.event_length != null ? ev.event_length.Value : 0,
                RecType = ev.rec_type
            };
        }
    }
}
~~~


###Updating API controller

Lastly, we need to modify our PUT/POST/DELETE actions in order to [handle special rules of recurring events](recurring_events.md#editingdeletingacertainoccurrenceintheseries).
Firstly, let's take a look at the `POST` action.
We need to process a special case for recurring events - deletion of a specific occurrence of the recurring series requires creating a new database record and the client will call the `insert` action for it:

{{snippet Controllers/EventsController.cs}}
~~~
// POST api/events
[HttpPost]
public ObjectResult Post([FromForm] WebAPIEvent apiEvent)
{
   var newEvent = (SchedulerEvent)apiEvent;

   _context.Events.Add(newEvent);
   _context.SaveChanges();

  // delete a single occurrence from a recurring series
  var resultAction = "inserted"; /*!*/
  if(newEvent.RecType == "none") /*!*/
  {
     resultAction = "deleted"; /*!*/
  }

  return Ok(new
  {
     tid = newEvent.Id,
     action = resultAction /*!*/
  });
}
~~~

In the `PUT` action we need to make sure to update all properties of the model.
Additionally, we need to handle a different special case there: when a recurring series is modified, we need to delete all modified occurrences of that series:

{{snippet Controllers/EventsController.cs}}
~~~
// PUT api/events/5
[HttpPut("{id}")]
public ObjectResult Put(int id, [FromForm] WebApiEvent apiEvent)
{
	var updatedEvent = (SchedulerEvent)apiEvent;
	var dbEveht = _context.Events.Find(id);
	dbEveht.Name = updatedEvent.Name;
	dbEveht.StartDate = updatedEvent.StartDate;
	dbEveht.EndDate = updatedEvent.EndDate;
	dbEveht.EventPID = updatedEvent.EventPID;
	dbEveht.RecType = updatedEvent.RecType;
	dbEveht.EventLength = updatedEvent.EventLength;

	if (!string.IsNullOrEmpty(updatedEvent.RecType) && updatedEvent.RecType != "none")
	{
	 //all modified occurrences must be deleted when we update a recurring series
	 //https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents

		_context.Events.RemoveRange(
			_context.Events.Where(e => e.EventPID == id)
		);
	}

	_context.SaveChanges();

	return Ok(new
	{
		action = "updated"
	});
}
~~~

And finally, the `DELETE` action. Here we have to check two special cases:

- if the event you are going to delete has a non-empty `event_pid`, it means a user deletes a modified instance of the recurring series. Instead of deleting such a record from the database, 
you need to give it `rec_type='none'`, in order for scheduler to skip this occurrence.
- if a user deletes a whole recurring series, you also need to delete all the modified instances of that series.

{{snippet Controllers/EventsController.cs}}
~~~
[HttpDelete("{id}")]
public ObjectResult DeleteEvent(int id)
{
  var e = _context.Events.Find(id);
  if (e != null)
  {
   //some logic specific to recurring events support
   //https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents

	 if (e.EventPID != default(int))
	 {
		// deleting a modified occurrence from a recurring series
		// If an event with the event_pid value was deleted, it should be updated 
		// with rec_type==none instead of deleting.

		e.RecType = "none";
	 }
	 else
	 {
	  //if a recurring series deleted, delete all modified occurrences of the series
	  if (!string.IsNullOrEmpty(e.RecType) && e.RecType != "none")
	   {
	//all modified occurrences must be deleted when we update recurring series
	//https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
		 _context.Events.RemoveRange(
			_context.Events.Where(ev => ev.EventPID == id)
		);
	   }

		_context.Events.Remove(e);
	 }

	 _context.SaveChanges();
  }

  return Ok(new
  {
	 action = "deleted"
  });
}
~~~

###Parsing recurring series 

A recurring event is stored in the database as a single record that can be splitted up by Scheduler on the client side.
If you need to get dates of separate events on the server side, use a helper library for parsing recurring events of dhtmlxScheduler on ASP.NET Core.  

You will find [the ready library on GitHub](https://github.com/DHTMLX/scheduler-recurring-events-dotnet).

Error handling
-------------

In order to handle errors, we need to declare a special [middleware class](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/startup?view=aspnetcore-2.1#startup-filters) 
that will capture runtime exceptions and write responses. Next it will be added to the app request pipeline. Follow the steps below:

1\. Create a middleware class from a template in the project folder.

![Create middleware class](howtostart_dotnetcore_middleware.png)

2\. Find the **invoke** method and note the *_next* call. Some handlers can throw exceptions, so let's catch them. Wrap the *_next* call with a `try-catch` block and run our handler if an error is captured.

{{snippet SchedulerErrorMiddleware.cs }}
~~~
public async Task Invoke(HttpContext httpContext)
{
  try
    {
       await _next(httpContext);
    }catch (Exception ex)
  	{
     	await HandleExceptionAsync(httpContext, ex);
    }
}

private static Task HandleExceptionAsync(HttpContext context, Exception exception)
{
   var result = JsonConvert.SerializeObject(new{
       action = "error"
   });
   context.Response.ContentType = "application/json";
   context.Response.StatusCode = StatusCodes.Status500InternalServerError;
   return context.Response.WriteAsync(result);
}
~~~

3\. The middleware is ready. Now go to **Startup.cs** and connect the middleware in the **Configure()** method:

{{snippet Startup.cs }}
~~~
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
   if (env.IsDevelopment())
   {
       app.UseDeveloperExceptionPage();
   }
   else
   {
     app.UseHsts();
   }
   app.UseDefaultFiles();
   app.UseStaticFiles();
   app.UseSchedulerErrorMiddleware(); /*!*/
   app.UseHttpsRedirection();
   app.UseMvc();
}
~~~

The important thing is that you add it before the `UseMvc` call.


Application security
-------------------

Scheduler doesn't provide any means of preventing an application from various threats, such as SQL injections, XSS and CSRF attacks. The responsibility for keeping an application safe is on the developers
who implement the backend. Read the details in the [corresponding article](app_security.md).

###XSS protection

A simple solution would be to encode the text properties of data items when we send them to the client side.

For example, in the below code a built-in HtmlEncoder is used to escape HTML values in the text of events. That way our database will contain unmodified data, but the client side will receive safe values of `event.text`.

{{snippet Models/WebAPIEvent.cs }}
~~~
using System.Text.Encodings.Web;
 
public static explicit operator WebAPIEvent(SchedulerEvent ev)
{
  return new WebAPIEvent
    {
      id = ev.Id,
      text = HtmlEncoder.Default.Encode(ev.Name), 
      start_date = ev.StartDate.ToString("yyyy-MM-dd HH:mm"),
      end_date = ev.EndDate.ToString("yyyy-MM-dd HH:mm")
    };
}
~~~

Another approach would be to use a specialized library, e.g. [HtmlAgilityPack](https://html-agility-pack.net/) and completely strip any HTML event when we save/load data.

Trouble shooting
-----------------

In case you've completed the above steps to implement Scheduler integration with ASP.NET Core, but Scheduler doesn't render events on a page, have a look at the troubleshooting.md article. It describes 
the ways of identifying the roots of the problems.


What's next
------------

Now you have a fully functioning Scheduler. You can view the full code on [GitHub](https://github.com/DHTMLX/scheduler-howto-dotnet-core), clone or download it and use it for your projects.

You can also check [guides on the numerous features of Scheduler](guides.md) or tutorials on [integration of Scheduler with other backend frameworks](howtostart_guides.md).

