dhtmlxScheduler with Ruby on Rails 
=========================

In this article we'll show you how to create a Scheduler and implement server-side integration based on [Ruby on Rails](http://rubyonrails.org/) framework and REST API.

If you use some other technology, check the list of available integration variants below:

- howtostart_php.md
- howtostart_nodejs.md
- howtostart_dotnet.md


If you have Ruby on Rails installed, you can begin to implement the integration at once. 
Otherwise, you should install the framework by following the steps described in the [installation guide](http://guides.rubyonrails.org/getting_started.html#installing-rails).

Once everything is ready, we can start completing the integration step by step.

Step 1. Creating a Project
-----------------------------

To add a new project just run the following command in the terminal:

~~~js
rails new path/to/your/project
~~~

Step 2. Creating a Controller 
------------------------------------------

Now we need to add a controller that will process users' request to the server through the application.
Since requests differ in their type, we need separate controllers for certain requests.

To define the connection between a controller and the type of request, we will use routing. Different routes can be served by different actions.
The actions collect information which will be passed to the view.

Let’s create a new controller with the name "home" and a new action called "index".

~~~js
cd path/to/your/project
rails generate controller home index
~~~

The output should confirm that new files were created.

Step 3. Specifying Routing
-----------------------------

To configure the routing, open the file *config/routes.rb*. Find the following line at the very beginning of this file:

~~~js
get 'home/index'
~~~

and replace it with the following one:

~~~js
root :to => 'home#index'
get "data", :to=>"event#get", :as=>"data"
post "data(/:id)", :to => "event#add"
put "data/:id", :to => "event#update"
delete "data/:id", :to => "event#delete"
~~~

After that we can test our server by running in the command line: 

~~~js
rails server
~~~

Open *http://localhost:3000/* in your browser. The result should be like this:

<img src="ruby_routing.png">

So the server is ready and we can proceed with views adding.

Step 4. Including Source Files
-------------------------------

To begin with, we should [download the dhtmlxScheduler package](https://dhtmlx.com/docs/products/dhtmlxScheduler/download.shtml). 

Complete the next steps:

1) Unpack the file *codebase/dhtmlxscheduler.js* and the directories *codebase/ext* and *codebase/locale* 
from the package to the directory *vendor/assets/javascripts/* of your project

You should get something like following:

<img src="ruby_unpack_js.png">

2) Unpack the files 

- *codebase/dhtmlxscheduler.css*
- *codebase/dhtmlxscheduler_classic.css*
- *codebase/dhtmlxscheduler_flat.css* 
- *codebase/dhtmlxscheduler_glossy.css* 

from the package to the directory *vendor/assets/stylesheets/* of your project.

You should get something like following:

<img src="ruby_unpack_styles.png">

3) In the "public" directory create the "assets" folder and unpack the following files into it:

- *codebase/imgs*
- *codebase/imgs_dhx_terrace*
- *codebase/imgs_flat*
- *codebase/imgs_glossy*

You should get something like following:

<img src="ruby_unpack_assets.png">

4) Open the **config/initializers/assets.rb** file and add *dhtmlxscheduler.js* and *dhtmlxscheduler.css* files to the precompile array. 
For this purpose, use the code below:

~~~js
Rails.application.config.assets.precompile += %w( dhtmlxscheduler.css )
Rails.application.config.assets.precompile += %w( dhtmlxscheduler.js )
~~~

Step 5. Creating Views
------------------------

Now we are ready to create a view. Views will visualize the information gathered by actions. 

If there's no controller-specific layout, Rails will use the *app/views/layouts/application.html.erb* file
as a template for all pages that have common elements. We should add scheduler js and css files here, so add following strings to header:

~~~html
<!DOCTYPE html>
<html>
<head>
  <title>SchedulerRubyRest</title>
  <%= stylesheet_link_tag 'application',media:'all','data-turbolinks-track'=>true %>
  <%= javascript_include_tag 'application', 'data-turbolinks-track' => true %>
  <%= stylesheet_link_tag 'dhtmlxscheduler',media:'all','data-turbolinks-track'=>true %>
  <%= javascript_include_tag 'dhtmlxscheduler', 'data-turbolinks-track' => true %>
  <%= csrf_meta_tags %>
</head>
<body>

<%= yield %>

</body>
</html>
~~~

At this point we can specify a view for the "home" controller that we've created at the [Step 2](howtostart_ruby.md#step2creatingacontroller). 
For this, open the file *app/views/home/index.html.erb*. We need to add a container for the future scheduler and initialize the Scheduler, like this:

~~~html
<div id="scheduler_here" class="dhx_cal_container" style='width:100%; height:800px;'>
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
    scheduler.init("scheduler_here", new Date(2016,4,27), "week");
</script>
~~~

After that we can have a look at the current result. Open *http://localhost:3000/* (the rails server) in a browser.
You will see an empty scheduler:

<img src="ruby_empty_scheduler.png">

Thus you've got a scheduler where you can add events and modify them. But it lacks the saving ability. 

To provide it, we need to proceed with creating models.

Step 6. Creating Models
----------------------

Since Scheduler operates events entities, we need to add a model for them.

To create a model for events, we need to run the following command that contains the event's properties:

~~~js
rails generate model Event start_date:datetime end_date:datetime text:string
~~~

You can find the list of mandatory properties of the Event object with their descriptions 
in the [corresponding article](loading_data.md#dataproperties) of documentation.


After that we can create a new database:

~~~js
rake db:migrate
~~~

Now you can try to add an entry into it. The algorithm is the following:

1 . Open the Rails console by running:

~~~js
rails c
~~~

2 . Add the desired events like this:

~~~js
Event.create 
	:start_date => "2016-05-27 10:00:00", 
    :end_date => "2016-05-27 15:00:00", 
	:text => "Test";
~~~


3 . To display all events, run the command:

~~~js
Event.all
~~~

4 . Enter "exit" to close the console.

<img src="ruby_console.png">

Next we need to implement data loading and saving in the scheduler with the help of controllers.


Step 7. Creating Event Controller
--------------------

###General technique of loading data using REST API

There's a [common technique](server_integration.md#technique) for loading data into Scheduler from the server side.

You will find the requirements to the client side, as well as the [description of possible requests and responses](server_integration.md#requestresponsedetails) 
in the server_integration.md article.

Below we will consider how to load data into Scheduler using Ruby on Rails server side.

###Event Controller

To create a new controller event, run the following command:

~~~js
rails generate controller event
~~~

We will add the code that will enable data adding, changing and deleting into the file of this event - *app/controllers/event_controller.rb*:

~~~js
class EventController < ApplicationController
	protect_from_forgery

	def get
		 events = Event.all

		render :json => events.map {|event| {
			:id => event.id,
            :start_date => event.start_date.to_formatted_s(:db),
            :end_date => event.end_date.to_formatted_s(:db),
            :text => event.text
        }}		
	end
	
	def add
		event = Event.create 
        	:text=>params["text"], 
            :start_date=>params["start_date"], 
            :end_date=>params["end_date"]
            
		render :json=>{:action => "inserted", :tid => event.id}
	end
	
	def update
		event = Event.find(params["id"])
		event.text = params["text"]
		event.start_date = params["start_date"]
		event.end_date = params["end_date"]
		event.save
		
		render :json=>{:action => "updated"}
	end
	
	def delete
		Event.find(params["id"]).destroy
        
		render :json=>{:action => "deleted"}
	end
end
~~~

The code of Task Controller includes the following types of requests:

- GET request is used to load data into Scheduler

It will make an object with data for a Gantt chart and will contain a list of events. 
The dates of events should be converted into appropriate strings.

- POST request means that a new item needs to be inserted into the database
- PUT request updates an existing record 
- DELETE request goes for deleting

All actions return a JSON response containing the type of the performed operation or "error" if something went wrong.

Note that a response for the "insert" action also contains a database id of the new record. 
It will be applied on the client side, so the new item could be mapped to the database entity. 


Step 8. Initializing Scheduler
--------------------------

The last thing we have to do is to put the following code into the &#60;script&#62;&#60;/script&#62; part of the *app/views/home/index.html.erb* file.

~~~js
scheduler.config.xml_date="%Y-%m-%d %H:%i";
scheduler.init("scheduler_here", new Date(2016,4,27), "week");
scheduler.load("<%= data_path %>/", "json");

var dp = new dataProcessor("<%= data_path %>/");
dp.init(scheduler);
dp.setTransactionMode("REST");
~~~

It initializes Scheduler and enables it to load and save data. That's all. Now we can run our application in a browser and see the result.

<img src="ruby_ready_scheduler.png">

As you can see, an event appeared in the scheduler. We have added it at the [Step 6](howtostart_ruby.md#step6creatingmodels).  
Now you can add more events and modify them. All the changes will be saved in the database.