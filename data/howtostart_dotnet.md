dhtmlxScheduler with ASP.NET MVC
=============================

This tutorial will give you step-by-step instructions on creating Scheduler with [ASP.NET](https://www.asp.net/) and REST API on the server side. 

You can also explore other server-side integration possibilities of Scheduler by choosing one of the following tutorials:

- howtostart_dotnet_core.md
- howtostart_nodejs.md
- howtostart_php.md
- howtostart_php_laravel.md
- howtostart_ruby.md

We will make use of the ASP.NET MVC 5 web platform and the Web API controller for REST API to create a Scheduler application. To organize communication with a database we will use 
the [Entity Framework](http://www.asp.net/entity-framework). 
We will build our application with the help of the Visual Studio IDE.

Have a look at the [demo](https://github.com/DHTMLX/scheduler-howto-dotnet) on GitHub.

Step 1. Creating a Project
----------------------------

###Creating a new Visual Studio Project

Let’s start by running Visual Studio and creating a new project. For this, open the File menu tab and choose: New -> Project. Then Select ASP.NET Web Application and press Next.

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

![Index view](how_to_start_index_view.png)

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

![image]()


