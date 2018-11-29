Ruby on Rails Code Samples
==============================

In this article we'll show you how to integrate Scheduler with the server side based on [Ruby on Rails](http://rubyonrails.org/) framework and REST API.

You can read the [complete tutorial](howtostart_ruby.md) on using Scheduler with Ruby on Rails.

If you use some other technology, check the list of below to find the appropriate variant:

- server_php.md
- server_nodejs.md
- server_dotnet.md


Creating Models
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

Next we need to implement data loading and saving in the scheduler with the help of controllers.


Loading and Saving Data
---------------


There's a [common technique](server_integration.md#technique) for loading data into Scheduler from the server side.

You will find the requirements to the client side, as well as the [description of possible requests and responses](server_integration.md#requestresponsedetails) 
in the server_integration.md article.

[On the client side](server_integration.md#technique) we've initialized scheduler and added the following line:

~~~js
scheduler.load("events.php");
~~~

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
		event = Event.create :text=>params["text"], :start_date=>params["start_date"], :end_date=>params["end_date"]
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
- POST request means that a new item needs to be inserted into the database
- PUT request updates an existing record 
- DELETE request goes for deleting

All actions return a JSON response containing the type of the performed operation or "error" if something went wrong.

Note that a response for the "insert" action also contains a database id of the new record. 
It will be applied on the client side, so the new item could be mapped to the database entity. 

