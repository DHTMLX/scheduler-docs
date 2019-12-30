dhtmlxScheduler with PHP:Laravel
=========================

This tutorial describes how to add dhtmlxScheduler into a [Laravel](https://laravel.com/) app.

There are tutorials intended for building server-side integration with the help of other platforms:

- howtostart_dotnet_core.md
- howtostart_dotnet.md
- howtostart_nodejs.md
- howtostart_plain_php.md
- howtostart_php_slim4.md
- howtostart_ruby.md
- howtostart_connector.md

You can get the [ready demo on GitHub](https://github.com/DHTMLX/scheduler-howto-laravel) or follow a step-by-step guide below.

{{note
The complete source code is [available on GitHub](https://github.com/DHTMLX/scheduler-howto-laravel).
}}

Step 1. Initializing a project
-----------------------

###Creating a project

Create a new application using [Composer](https://getcomposer.org/):

~~~php
composer create-project laravel/laravel scheduler-howto-laravel
~~~

It should take a minute to download and create all necessary files. Once everything is done, you can check that everything is correct so far:

~~~php
cd scheduler-howto-laravel
php artisan serve
~~~

At this step you should get a default Laravel page:

<img src="howtostart_laravel_blank_page.png"/>

Step 2. Adding Scheduler to the page
-----------------------

### Adding a View

Firstly, we'll add a new page with dhtmlxScheduler to our app. Go to the *resources/views* folder and create a new view named *scheduler.blade.php*:

{{snippet resources/views/scheduler.blade.php }}
~~~html
<!DOCTYPE html>
<head>
   <meta http-equiv="Content-type" content="text/html; charset=utf-8">

   <script src="https://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.js"></script>
   <link href="https://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.css"
   		rel="stylesheet">

   <style type="text/css">
       html, body{
           height:100%;
           padding:0px;
           margin:0px;
           overflow: hidden;
       }

   </style>
</head>
<body>
<div id="scheduler_here" class="dhx_cal_container" style='width:100%; height:100%;'>
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
<script type="text/javascript">
   scheduler.init("scheduler_here");
</script>
</body>
~~~

Here we've defined a simple HTML layout, added sources of dhtmlxScheduler from [CDN](cdn_links_list.md) and initialized scheduler using the api/scheduler_init.md method.

Note that we've also specified **100% height** for the document body and for the scheduler container. Scheduler will use the size of its container, so some initial sizes are required.

### Changing the default route

After we've added a new page, we need to make it accessible from a browser. For this tutorial, we'll make our scheduler the default page of an app.

Go to *routes/web.php* and change the default route:

{{snippet routes/web.php}}
~~~php
<?php

Route::get('/', function () {
    return view('scheduler');
});
~~~

Run the app again to make sure it did the trick:

<img src="howtostart_laravel_empty_scheduler.png"/>


Step 3. Preparing a database
-------------------

So, we've got an empty scheduler. Let's connect it to the database and populate it with data.

###Creating a database

Be sure to update database configuration in .env, for example:

{{snippet .env}}
~~~php
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=scheduler-test
DB_USERNAME=root
DB_PASSWORD=
~~~

The next step is to create [model classes](https://laravel.com/docs/eloquent#defining-models) and [migrations](https://laravel.com/docs/migrations#generating-migrations).
You can generate classes and migration files using the Artisan command:

~~~js
php artisan make:model Event --migration
~~~

After that find the migrations in the `database/migrations` folder and define a [database schema](https://laravel.com/docs/migrations#migration-structure).
Have a look at the [database schema expected by Scheduler](loading_data.md#databasestructure).

The code for the Events table looks like this:

{{snippet database/migrations/_create_events_table.php}}
~~~php
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->increments('id');
            $table->string('text');
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('events');
    }
}
~~~

And run the migration:

~~~php
php artisan migrate
~~~

{{note
At this step, if you use an older version of MySQL database, you may get an error which looks like this: "Syntax error or access violation: 1071 Specified key was too long; max key length is 1000 bytes".}}

If it happens, go to `app/Providers/AppServiceProvider.php` and add required settings to **AppServiceProvider**:

~~~php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema; /*!*/

class AppServiceProvider extends ServiceProvider
{
   public function boot()
   {
       Schema::defaultStringLength(191); /*!*/
   }
   ...
}
~~~

[Here are more details on this particular error](https://laravel-news.com/laravel-5-4-key-too-long-error).


While we are at the migration, we can generate some test data for our app. Generate a [seeder](https://laravel.com/docs/seeding) class using the artisan command:

~~~php
php artisan make:seeder EventsTableSeeder
~~~

Add some data to **EventsTableSeeder**:

{{snippet database/seeds/EventsTableSeeder.php}}
~~~php
<?php
use Illuminate\Database\Seeder;
class EventsTableSeeder extends Seeder
{
   public function run()
   {
       DB::table('events')->insert([
           ['id'=>1, 'text'=>'Event #1', 'start_date'=>'2018-12-05 08:00:00',
                'end_date'=>'2018-12-05 12:00:00'],
           ['id'=>2, 'text'=>'Event #2', 'start_date'=>'2018-12-06 15:00:00',
                'end_date'=>'2018-12-06 16:30:00'],
           ['id'=>3, 'text'=>'Event #3', 'start_date'=>'2018-12-04 00:00:00',
                'end_date'=>'2018-12-20 00:00:00'],
           ['id'=>4, 'text'=>'Event #4', 'start_date'=>'2018-12-01 08:00:00',
                'end_date'=>'2018-12-01 12:00:00'],
           ['id'=>5, 'text'=>'Event #5', 'start_date'=>'2018-12-20 08:00:00',
                'end_date'=>'2018-12-20 12:00:00'],
           ['id'=>6, 'text'=>'Event #6', 'start_date'=>'2018-12-25 08:00:00',
                'end_date'=>'2018-12-25 12:00:00']
       ]);
   }
}
~~~

And call table seeders from **DatabaseSeeder.php**:

{{snippet database/seeds/DatabaseSeeder.php}}
~~~php
<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call(EventsTableSeeder::class);
    }
}
~~~

After that we can seed our database from the command line:

~~~php
php artisan db:seed
~~~

###Defining model classes

The data is managed via the [Eloquent model](https://laravel.com/docs/eloquent) classes. We've already generated a class for events at the previous step.
It is ready to use and doesn't require any changes to work with scheduler.

Step 4. Loading data
---------------------

Once the database is created and the models are defined, we can load data into our scheduler. The client side requires dates of [the following format](data_formats.md#json),
so let's create a controller with an action that produces such a JSON. Execute the following command in the console:

~~~php
php artisan make:controller EventController
~~~

Then open a new controller at **app/Http/Controllers/EventController.php** and add the `index` action:

{{snippet app/Http/Controllers/EventController.php}}
~~~php
<?php
namespace App\Http\Controllers;
use App\Event; /*!*/

class EventController extends Controller
{
    public function index(){ /*!*/
        $events = new Event();

        return response()->json([
            "data" => $events->all()
        ]);
    }
}
~~~

And register a route, so the client could call this action. Note that we'll add the route to the [api.php routes file](https://laravel.com/docs/routing#basic-routing):

{{snippet routes/api.php}}
~~~php
<?php

use Illuminate\Http\Request;

Route::get('/data', 'EventController@index');
~~~

And finally, call this action from the view:

{{snippet resources/views/scheduler.blade.php}}
~~~php
scheduler.config.date_format = "%Y-%m-%d %H:%i:%s";
scheduler.init("scheduler_here", new Date(2018, 11, 3), "week");

scheduler.load("/api/data", "json");
~~~

[scheduler.load](api/scheduler_load.md) sends an AJAX request to the specified URL and will expect a JSON response as we've defined before.

Also, note that we've specified the api/scheduler_date_format_config.md value. This is how we tell the scheduler which format of dates the data source will use, so the client side could parse them.

If you check the app now, you should see that there are now tasks in our scheduler:

![Loaded events](howtostart_laravel_loaded_events.png)

###Dynamic loading

Currently, scheduler loads all records from the events table on startup. It can work well if you know that the amount of data will remain small over time. But when scheduler is used for something like a planning/booking
application and you don't delete or move obsolete records to another table, the amounts of data will build up fairly quickly and in a couple of months of active usage you may find that your app requests a couple of MBs
of events each time a user loads the page.

It can be easily avoided by using dynamic loading. Scheduler will add the displayed dates to the request parameters and you'll be able to return only the records that need to be displayed.
Each time a user switches to a new data range, scheduler will request a new portion of data.

In order to enable this mode on the client go to `resources/views/scheduler.blade.php` and add the following line:

{{snippet resources/views/scheduler.blade.php}}
~~~php
scheduler.config.date_format = "%Y-%m-%d %H:%i:%s";

scheduler.setLoadMode("day"); /*!*/

scheduler.init("scheduler_here", new Date(2018, 5, 6), "week");
scheduler.load("/api/events", "json");
~~~

And update the app controller accordingly as in:

{{snippet app/Http/Controllers/EventController.php}}
~~~php
class EventController extends Controller
{
	public function index(Request $request){
		$events = new Event();

		$from = $request->from;
		$to = $request->to;

		return response()->json([
			"data" => $events->
				where("start_date", "<", $to)->
				where("end_date", ">=", $from)->get()
		]);
	}
}
~~~


Step 5. Saving changes
------------------

For now, our scheduler can read data from the backend. Let's make it write changes back to the database.

The client side will work in the REST mode, meaning that it will send POST/PUT/DELETE requests for events actions.
[Check the format of requests and all the routes the scheduler will use](server_integration.md#requestresponsedetails).

Now we need to define a controller that handles actions on the model, create route for it and enable data saving on the client side.

###Adding controllers

Let's start with controllers. We'll create one RESTful [resource controller](https://laravel.com/docs/controllers#resource-controllers) for each model. It will contain methods for adding/deleting and updating the model.

####Controller for events

~~~php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Event;

class EventController extends Controller
{
   public function index(Request $request){
       $events = new Event();

       $from = $request->from;
       $to = $request->to;

       return response()->json([
           "data" => $events->
               where("start_date", "<", $to)->
               where("end_date", ">=", $from)->get()
       ]);
   }

   public function store(Request $request){

       $event = new Event();

       $event->text = strip_tags($request->text);
       $event->start_date = $request->start_date;
       $event->end_date = $request->end_date;
       $event->save();

       return response()->json([
           "action"=> "inserted",
           "tid" => $event->id
       ]);
   }

   public function update($id, Request $request){
       $event = Event::find($id);

       $event->text = strip_tags($request->text);
       $event->start_date = $request->start_date;
       $event->end_date = $request->end_date;
       $event->save();

       return response()->json([
           "action"=> "updated"
       ]);
   }

   public function destroy($id){
       $event = Event::find($id);
       $event->delete();

       return response()->json([
           "action"=> "deleted"
       ]);
   }
}
~~~

And a [route](http://laravel.com/docs/controllers#restful-resource-controllers) for it:

{{snippet routes/api.php}}
~~~php
<?php

use Illuminate\Http\Request;

Route::resource('events', 'EventController');
~~~

A couple of notes regarding this code:

- When a new task is inserted, we return its id back to the client in the **tid** property of the response object.
- We assign a default value to the **progress** parameter. Many request parameters are optional, which means that if a client-side task doesn't have them assigned, they won't be sent to the server action.
- The response JSON can have any number of additional properties, they all can be accessed from the [client-side handler](server_integration.md#errorhandling).


###Enabling data saving on the client side

Finally, we will [configure the client side](server_integration.md#technique) to utilize the API we've just implemented:

{{snippet resources/views/scheduler.blade.php}}
~~~js
scheduler.config.date_format = "%Y-%m-%d %H:%i:%s";
scheduler.setLoadMode("day"); /*!*/

scheduler.init("scheduler_here", new Date(2018, 11, 3), "week");

scheduler.load("/api/events", "json"); /*!*/
var dp = new dataProcessor("/api/events"); /*!*/
dp.init(scheduler);
dp.setTransactionMode("REST");
~~~

Now you have a fully interactive Scheduler with the ability to view, add, update and delete events.

![CRUD operations](howtostart_laravel_crud.png)

Please check more of [our guides](guides.md) for other features of dhtmlxGantt.

Recurring events
-----------

In order to enable recurrence (e.g. "repeat event daily") you'll need to add an appropriate extension to the **scheduler.blade.php**, update the model and the code of the Events controller.

Firstly, go to **scheduler.blade.php** and add a recurring extension after *dhtmlxscheduler.js*:

{{snippet resources\views\scheduler.blade.php }}
~~~html
<!DOCTYPE html>
<head>
  <meta http-equiv="Content-type" content="text/html; charset=utf-8">

  <script src="https://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.js"></script>
  <script src="https://cdn.dhtmlx.com/scheduler/edge/ext/dhtmlxscheduler_recurring.js"></script>
</head>
~~~

Now, update the model.

Here is a complete schema, if you're starting from scratch:

~~~php
Schema::create('events', function (Blueprint $table) {
	$table->increments('id');
	$table->string('text');
	$table->dateTime('start_date');
	$table->dateTime('end_date');

	$table->string('rec_type')->nullable();
	$table->bigInteger('event_length')->nullable();
	$table->string('event_pid')->nullable();

	$table->timestamps();
});
~~~

Or, you can create the following migration:

~~~php
php artisan make:migration add_recurrings_to_events_table --table=events
~~~
<br>
~~~php
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddRecurringsToEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('events', function (Blueprint $table) {
            $table->string('rec_type')->nullable();
            $table->bigInteger('event_length')->nullable()->default(null);
            $table->string('event_pid')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn('rec_type');
            $table->dropColumn('event_length');
            $table->dropColumn('event_pid');
        });
    }
}
~~~

And run the migration:

~~~php
php artisan migrate
~~~

Now, it's time to update the controller

Data loading does not require any changes, but we'll need to update the write actions since editing recurring series
[require some non-intuitive steps](recurring_events.md#editingdeletingacertainoccurrenceintheseries).

Firstly, make sure to write new properties of the Event model in the "store" and "update" actions:

~~~php
public function store(Request $request){

	$event = new Event();

	$event->text = strip_tags($request->text);
	$event->start_date = $request->start_date;
	$event->end_date = $request->end_date;
	$event->rec_type = $request->rec_type;
	$event->event_length = $request->event_length;
	$event->event_pid = $request->event_pid;
	$event->save();

	return response()->json([
		"action"=> "inserted",
		"tid" => $event->id
	]);
}

public function update($id, Request $request){
	$event = Event::find($id);

	$event->text = strip_tags($request->text);
	$event->start_date = $request->start_date;
	$event->end_date = $request->end_date;
	$event->rec_type = $request->rec_type;
	$event->event_length = $request->event_length;
	$event->event_pid = $request->event_pid;
	$event->save();

	return response()->json([
		"action"=> "updated"
	]);
}
~~~

After that, there are three additional cases which need handling.

The recurring series itself is stored as a single record, and the deleted instances of series are stored as individual records linked to series marked as 'deleted'. Due to the current implementation,
when a server sees such item added, it should reply with the "deleted" status. Such records can be detected by the **$event->rec_type == "none"** value:

~~~php
public function store(Request $request){

	$event = new Event();

	$event->text = strip_tags($request->text);
	$event->start_date = $request->start_date;
	$event->end_date = $request->end_date;
	$event->rec_type = $request->rec_type;
	$event->event_length = $request->event_length;
	$event->event_pid = $request->event_pid;
	$event->save();

	$status = "inserted";
	if($event->rec_type == "none"){
		$status = "deleted";
	}

	return response()->json([
		"action"=> $status,
		"tid" => $event->id
	]);
}
~~~

Modified occurrences of the series are stored as individual instances as well. They are linked to the recurring series and a timestamp of the default occurrences that has been modified,
so scheduler doesn't render an occurrence created by the recurring rule. When user deletes the recurring instance, instead of deleting the modified instance, we must
mark this item as removed by setting *rec_type* to "none":

~~~js
public function destroy($id){
	$event = Event::find($id);

	// delete the modified instance of the recurring series
	if($event->event_pid){
		$event->rec_type = "none";
		$event->save();
	}else{
		// delete a regular instance
		$event->delete();
	}

	$this->deleteRelated($event);
	return response()->json([
		"action"=> "deleted"
	]);
}
~~~

And finally, when user modifies or deletes a recurring series, we should delete all modified occurrences of that series. It is required, because modified occurrences are linked to the original ones via timestamps.

~~~php
private function deleteRelated($event){
  if($event->event_pid && $event->event_pid !== "none"){
  	RecurringEvent::where("event_pid", $event->id)->delete();
  }
}

public function update($id, Request $request){
		$event = RecurringEvent::find($id);

		$event->text = strip_tags($request->text);
		$event->start_date = $request->start_date;
		$event->end_date = $request->end_date;
		$event->rec_type = $request->rec_type;
		$event->event_length = $request->event_length;
		$event->event_pid = $request->event_pid;
		$event->save();
		$this->deleteRelated($event); /*!*/
		return response()->json([
		"action"=> "updated"
	]);
}

public function destroy($id){
	$event = RecurringEvent::find($id);

   	// delete the modified instance of the recurring series
    if($event->event_pid){
    	$event->rec_type = "none";
        $event->save();
    }else{
     	// delete a regular instance
        $event->delete();
    }
    $this->deleteRelated($event);/*!*/
    return response()->json([
          "action"=> "deleted"
    ]);
}
~~~

### Parsing recurring series

A recurring event is stored in the database as a single record that can be splitted up by Scheduler on the client side.
If you need to get dates of separate events on the server side, use a helper library for parsing recurring events of dhtmlxScheduler on PHP. 
<br>
You will find [the ready library on GitHub](https://github.com/DHTMLX/scheduler-helper-php).

Application security
---------------------

Scheduler doesn't provide any means of preventing an application from various threats, such as SQL injections or XSS and CSRF attacks.
It is important that responsibility for keeping an application safe is on the developers implementing the backend. Read the details [in the corresponding article](app_security.md).

Trouble shooting
-----------------

In case you've completed the above steps to implement Scheduler integration with PHP, but Scheduler doesn't render events on a page, have a look at the troubleshooting.md article. It describes
the ways of identifying the roots of the problems.


What's next
------------

Now you have a fully functioning Scheduler. You can view the full code on [GitHub](https://github.com/DHTMLX/scheduler-howto-laravel), clone or download it and use it for your projects.

You can also check [guides on the numerous features of Scheduler](guides.md) or tutorials on [integration of Scheduler with other backend frameworks](howtostart_guides.md).