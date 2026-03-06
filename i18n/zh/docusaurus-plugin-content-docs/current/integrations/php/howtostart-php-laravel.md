---
title: "dhtmlxScheduler 与 PHP:Laravel 集成指南"
sidebar_label: "dhtmlxScheduler 与 PHP:Laravel 集成指南"
---

# dhtmlxScheduler 与 PHP:Laravel 集成指南

本指南将介绍如何在 [Laravel](https://laravel.com/) 应用中集成 dhtmlxScheduler。

同时也提供了其它平台的服务端集成指南:

- [dhtmlxScheduler와 ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxScheduler와 ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxScheduler와 Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxScheduler와 PHP](integrations/php/howtostart-plain-php.md)
- [dhtmlxScheduler와 PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxScheduler와 SalesForce LWC 통합하기](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxScheduler와 Ruby on Rails 연동하기](integrations/other/howtostart-ruby.md)
- [dhtmlxScheduler와 dhtmlxConnector 연동하기](integrations/other/howtostart-connector.md)

你可以在 [GitHub 上查看完整示例](https://github.com/DHTMLX/scheduler-howto-laravel)，也可以按照以下步骤操作。

:::note
完整的源代码已[托管在 GitHub](https://github.com/DHTMLX/scheduler-howto-laravel)。
:::

## 步骤 1. 初始化项目

### 创建项目

首先，使用 [Composer](https://getcomposer.org/) 创建一个新的 Laravel 应用:

~~~php
composer create-project laravel/laravel scheduler-howto-laravel
~~~

该过程会自动下载并设置所有必需的文件。完成后，你可以运行以下命令验证环境是否搭建成功:

~~~php
cd scheduler-howto-laravel
php artisan serve
~~~

此时，你应该能看到 Laravel 默认的欢迎页面:

![howtostart_laravel_blank_page](/img/howtostart_laravel_blank_page.png)

## 步骤 2. 向页面添加 Scheduler

### 添加视图

接下来，向应用中添加一个包含 dhtmlxScheduler 的新页面。在 *resources/views* 目录下创建一个名为 *scheduler.blade.php* 的视图文件:

~~~js title="resources/views/scheduler.blade.php"
<!DOCTYPE html>
<head>
   <meta http-equiv="Content-type" content="text/html; charset="utf-8"">

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
<div id="scheduler_here" class="dhx_cal_container">
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

以上代码设置了基础的 HTML 结构，从 [CDN](guides/cdn-links-list.md) 引入 dhtmlxScheduler 资源，并通过 [init](api/method/init.md) 方法初始化调度器。

注意，body 和 scheduler 容器都设置为 100% 高度。由于调度器会自适应其容器大小，因此需要设置这些尺寸。

### 修改默认路由

为了让新页面可访问，需要修改默认路由，使访问应用时直接显示 scheduler 页面。

编辑 *routes/web.php*，修改根路由如下:

~~~js title="routes/web.php"
<?php

Route::get('/', function () {
    return view('scheduler');
});
~~~

重启应用后，验证调度器页面是否正常加载:

![howtostart_laravel_empty_scheduler](/img/howtostart_laravel_empty_scheduler.png)

## 步骤 3. 准备数据库

当前调度器页面是空的。下一步，将其连接到数据库并填充一些数据。

### 创建数据库

请确保在 *.env* 文件中正确配置数据库连接，例如:

~~~js title=".env"
DB_CONNECTION="mysql"
DB_HOST="127.0.0.1"
DB_PORT="3306"
DB_DATABASE="scheduler-test"
DB_USERNAME="root"
DB_PASSWORD=
~~~

然后，使用 Artisan 创建 [模型类](https://laravel.com/docs/11.x/eloquent#defining-models) 和 [迁移文件](https://laravel.com/docs/11.x/migrations#generating-migrations):

~~~js
php artisan make:model Event --migration
~~~

该命令会在 `database/migrations` 文件夹中生成迁移文件。请根据 [Scheduler 期望的表结构](guides/loading-data.md#databasestructure) 定义数据库结构。

以下为 Events 表的迁移代码:

~~~js title="database/migrations/_create_events_table.php"
<?php

use IlluminateSupportFacadesSchema;
use IlluminateDatabaseSchemaBlueprint;
use IlluminateDatabaseMigrationsMigration;

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

运行迁移以创建数据表:

~~~php
php artisan migrate
~~~

:::note
如果你在较老的 MySQL 版本下遇到 "Syntax error or access violation: 1071 Specified key was too long; max key length is 1000 bytes" 错误，请按照以下步骤操作。
:::

为解决该问题，打开 `app/Providers/AppServiceProvider.php`，在 **AppServiceProvider** 类中添加如下内容:

~~~php
<?php

namespace AppProviders;

use IlluminateSupportServiceProvider;
use IlluminateSupportFacadesSchema; /*!*/

class AppServiceProvider extends ServiceProvider
{
   public function boot()
   {
       Schema::defaultStringLength(191); /*!*/
   }
   ...
}
~~~

[关于此错误的更多信息请见此处](https://laravel-news.com/laravel-5-4-key-too-long-error)。

接下来，使用 [seeder](https://laravel.com/docs/11.x/seeding) 类生成一些示例数据:

~~~php
php artisan make:seeder EventsTableSeeder
~~~

在 **EventsTableSeeder** 中添加示例事件:

~~~js title="database/seeds/EventsTableSeeder.php"
<?php
use IlluminateDatabaseSeeder;
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

然后，在 **DatabaseSeeder.php** 中调用该 seeder:

~~~js title="database/seeds/DatabaseSeeder.php"
<?php

use IlluminateDatabaseSeeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call(EventsTableSeeder::class);
    }
}
~~~

最后，使用以下命令填充数据库:

~~~php
php artisan db:seed
~~~

### 定义模型类

数据通过 [Eloquent model](https://laravel.com/docs/11.x/eloquent) 类进行处理。之前创建的 Event 模型已可直接用于 scheduler，无需额外调整。

## 步骤 4. 加载数据

数据库和模型准备好后，下一步是将数据加载到 scheduler。由于客户端期望特定的 [日期格式](guides/data-formats.md#json)，需要创建一个控制器动作，输出所需结构的 JSON。

运行以下命令创建控制器:

~~~php
php artisan make:controller EventController
~~~

打开 **app/Http/Controllers/EventController.php** 并添加 `index` 方法:

~~~js title="app/Http/Controllers/EventController.php"
<?php
namespace AppHttpControllers;
use AppEvent; /*!*/

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

注册一个路由以便客户端访问该方法。将以下内容添加到 [api.php 路由文件](https://laravel.com/docs/8.x/routing#basic-routing):

~~~js title="routes/api.php"
<?php

use IlluminateHttpRequest;

Route::get('/data', 'EventController@index');
~~~

最后，更新 scheduler 视图以从该接口加载数据:

~~~js title="resources/views/scheduler.blade.php"
scheduler.config.date_format = "%Y-%m-%d %H:%i:%s";
scheduler.init("scheduler_here", new Date(2018, 11, 3), "week");

scheduler.load("/api/data");
~~~

[scheduler.load](api/method/load.md) 方法会向指定 URL 发送 AJAX 请求，并期望收到如上结构的 JSON 响应。

指定 [date_format](api/config/date_format.md) 的值可以让 scheduler 正确解析日期格式。

此时，scheduler 应能显示从数据库加载的事件:

![Loaded events](/img/howtostart_laravel_loaded_events.png)

### 动态加载

目前，所有事件会在 scheduler 启动时一次性加载。如果数据量较小，这种方式没有问题。但对于预订、计划等应用，数据会随着时间增长，全部加载会变得低效且缓慢。

动态加载可以解决这个问题，仅请求当前日期范围内可见的事件。当用户切换日期时，scheduler 会只拉取相关数据。

要启用动态加载，在 `resources/views/scheduler.blade.php` 中添加如下代码:

~~~js title="resources/views/scheduler.blade.php"
scheduler.config.date_format = "%Y-%m-%d %H:%i:%s";

scheduler.setLoadMode("day"); /*!*/

scheduler.init("scheduler_here", new Date(2018, 5, 6), "week");
scheduler.load("/api/events");
~~~

调整控制器以根据请求的日期范围过滤事件:

~~~js title="app/Http/Controllers/EventController.php"
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

## 步骤 5. 保存更改

到目前为止，scheduler 已能从后端读取数据。下一步是支持将更改保存回数据库。

客户端以 REST 模式运行，会针对事件操作发送 POST、PUT 和 DELETE 请求。[请求与路由格式详见](guides/server-integration.md#request-and-response-details)。

此时，需要创建控制器处理这些操作、定义相应路由，并在客户端启用数据保存功能。

### 添加控制器

首先设置控制器。对于每个模型，我们将创建一个 RESTful [resource controller](https://laravel.com/docs/controllers#resource-controllers)，包含添加、删除和更新模型的方法。

#### 事件控制器

~~~php
<?php

namespace AppHttpControllers;

use IlluminateHttpRequest;
use AppEvent;

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

以下是对应的 [路由](https://laravel.com/docs/controllers#resource-controllers):

~~~js title="routes/api.php"
<?php

use IlluminateHttpRequest;

Route::resource('events', 'EventController');
~~~

关于上述代码，有几点说明:

- 当添加新任务时，服务器会在响应对象的 **tid** 属性中返回其 id。
- **progress** 参数有默认值。许多请求参数是可选的，因此如果客户端任务未包含这些参数，它们不会被发送到服务器。
- JSON 响应可以包含额外的属性，所有这些属性都可以通过 [客户端处理器](guides/server-integration.md#errorhandling) 访问。

### 启用客户端数据保存

接下来，我们将[配置客户端](guides/server-integration.md#technique)以配合刚刚创建的 API:

~~~js title="resources/views/scheduler.blade.php"
scheduler.config.date_format = "%Y-%m-%d %H:%i:%s";
scheduler.setLoadMode("day"); /*!*/

scheduler.init("scheduler_here", new Date(2018, 11, 3), "week");

scheduler.load("/api/events"); /*!*/
var dp = scheduler.createDataProcessor("/api/events"); /*!*/
dp.init(scheduler);
dp.setTransactionMode("REST");
~~~

这样你就拥有了一个完全交互式的日程表，事件可以被查看、添加、更新和删除。

![CRUD operations](/img/howtostart_laravel_crud.png)

如需了解更多功能，请参阅[我们的指南](/guides/)。

## 循环事件

如果要支持循环事件（如每日重复），你需要在 **scheduler.blade.php** 中添加扩展，更新模型，并调整 Events 控制器。

首先，在 **scheduler.blade.php** 中启用循环扩展:

~~~js title="resourcesviewsscheduler.blade.php"
<!DOCTYPE html>
...
<body>
    ...
    <script type="text/javascript">
        scheduler.plugins({
            recurring: true /*!*/
        });
        
        scheduler.config.date_format = "%Y-%m-%d %H:%i:%s";
        scheduler.init("scheduler_here", new Date(2018, 11, 3), "week");
    </script> 
</body>
~~~

接下来，更新模型。

如果你是全新开始，可以使用如下完整数据表结构:

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

或者，你也可以创建如下迁移:

~~~php
php artisan make:migration add_recurrings_to_events_table --table="events"
~~~


~~~php
<?php

use IlluminateSupportFacadesSchema;
use IlluminateDatabaseSchemaBlueprint;
use IlluminateDatabaseMigrationsMigration;

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

然后运行迁移:

~~~php
php artisan migrate
~~~

现在，更新控制器。

加载数据时无需更改，但写操作需要更新，因为编辑循环系列[需要一些特殊步骤](guides/recurring-events.md#editingdeletingacertainoccurrenceintheseries)。

首先，确保在 "store" 和 "update" 方法中包含 Event 模型的新属性:

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

还有三种情况需要处理。

循环系列本身作为单条记录存储，而系列中被删除的实例作为单独的记录存储，并与系列关联且标记为 'deleted'。当服务器遇到这样的项时，应返回 "deleted" 状态。这些记录可以通过检查 **$event->rec_type == "none"** 来判断:

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

被修改的循环实例也作为单独记录存储，并通过时间戳与循环系列关联，以防止渲染原始实例。当用户删除已修改的实例时，不是直接删除，而是将 *rec_type* 设为 "none":

~~~js
public function destroy($id){
    $event = Event::find($id);

    // 删除循环系列的已修改实例
    if($event->event_pid){
        $event->rec_type = "none";
        $event->save();
    }else{
        // 删除普通实例
        $event->delete();
    }

    $this->deleteRelated($event);
    return response()->json([
        "action"=> "deleted"
    ]);
}
~~~

最后，当循环系列被更新或删除时，其所有已修改的实例也应被移除。由于修改的实例通过时间戳与原始事件关联，这一步是必须的:

~~~php
private function deleteRelated($event){
  if($event->event_pid && $event->event_pid !== "none"){
      Event::where("event_pid", $event->id)->delete();
  }
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
        $this->deleteRelated($event); /*!*/
        return response()->json([
        "action"=> "updated"
    ]);
}

public function destroy($id){
    $event = Event::find($id);

       // 删除循环系列的已修改实例
    if($event->event_pid){
        $event->rec_type = "none";
        $event->save();
    }else{
         // 删除普通实例
        $event->delete();
    }
    $this->deleteRelated($event);/*!*/
    return response()->json([
          "action"=> "deleted"
    ]);
}
~~~

### 解析循环系列

循环事件在数据库中作为一条记录存储，但在客户端 Scheduler 中可以被拆分为单独的实例。如果你需要在服务器端获取每个事件的日期，可以使用 PHP 的循环事件解析辅助库。 


你可以在 [GitHub 上找到现成的库](https://github.com/DHTMLX/scheduler-helper-php)。

## 应用安全性

Scheduler 本身不提供内置的 SQL 注入、XSS 或 CSRF 等安全防护。确保应用安全是后端开发者的责任。详情请参阅[相关文档](guides/app-security.md)。

## 故障排查

如果你已按照步骤将 Scheduler 与 PHP 集成，但事件未显示，请参阅 [백엔드 통합 문제 해결](guides/troubleshooting.md) 文章，获取识别和解决常见问题的指导。

## 后续步骤

至此，你已经拥有一个完整可用的 Scheduler。完整代码可在 [GitHub](https://github.com/DHTMLX/scheduler-howto-laravel) 获取，你可以克隆或下载用于自己的项目。

此外，还可以探索[涵盖 Scheduler 多种功能的指南](/guides/)或[与其他后端框架集成的教程](/integrations/howtostart-guides/)。

