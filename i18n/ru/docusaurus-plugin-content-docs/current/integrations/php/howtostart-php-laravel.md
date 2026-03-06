---
title: "dhtmlxScheduler с PHP:Laravel"
sidebar_label: "dhtmlxScheduler с PHP:Laravel"
---

# dhtmlxScheduler с PHP:Laravel

В этом руководстве описывается интеграция dhtmlxScheduler в приложение на [Laravel](https://laravel.com/).

Также доступны руководства по серверной интеграции с использованием других платформ:

- [dhtmlxScheduler с ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxScheduler с ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxScheduler с Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxScheduler с PHP](integrations/php/howtostart-plain-php.md)
- [dhtmlxScheduler с PHP: Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxScheduler с SalesForce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxScheduler с Ruby on Rails](integrations/other/howtostart-ruby.md)
- [dhtmlxScheduler с dhtmlxConnector](integrations/other/howtostart-connector.md)

Вы можете ознакомиться с [полной демонстрацией на GitHub](https://github.com/DHTMLX/scheduler-howto-laravel) или следовать пошаговым инструкциям ниже.

:::note
Полный исходный код размещён на [GitHub](https://github.com/DHTMLX/scheduler-howto-laravel).
:::

## Шаг 1. Инициализация проекта

### Создание проекта

Начните с создания нового приложения Laravel с помощью [Composer](https://getcomposer.org/):

~~~php
composer create-project laravel/laravel scheduler-howto-laravel
~~~

Этот процесс займет некоторое время для загрузки и настройки всех необходимых файлов. После завершения вы можете проверить установку, выполнив:

~~~php
cd scheduler-howto-laravel
php artisan serve
~~~

На этом этапе вы должны увидеть стандартную приветственную страницу Laravel:

![howtostart_laravel_blank_page](/img/howtostart_laravel_blank_page.png)

## Шаг 2. Добавление Scheduler на страницу

### Добавление представления

Далее добавьте новую страницу с dhtmlxScheduler в приложение. Создайте новый файл представления с именем *scheduler.blade.php* в директории *resources/views*:

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

Это создаёт базовую HTML-структуру, подключает ресурсы dhtmlxScheduler с [CDN](guides/cdn-links-list.md) и инициализирует scheduler с помощью метода [init](api/method/init.md).

Обратите внимание, что и body, и контейнер scheduler имеют высоту 100%. Поскольку scheduler подстраивается под размер контейнера, необходимо явно задать эти размеры.

### Изменение маршрута по умолчанию

Чтобы сделать новую страницу доступной, обновите маршрут по умолчанию, чтобы при открытии приложения отображался scheduler.

Измените файл *routes/web.php* следующим образом:

~~~js title="routes/web.php"
<?php

Route::get('/', function () {
    return view('scheduler');
});
~~~

Перезапустите приложение и убедитесь, что страница scheduler загружается:

![howtostart_laravel_empty_scheduler](/img/howtostart_laravel_empty_scheduler.png)

## Шаг 3. Подготовка базы данных

В данный момент scheduler пуст. Далее подключим его к базе данных и заполним данными.

### Создание базы данных

Убедитесь, что вы настроили подключение к базе данных в файле *.env*, например:

~~~js title=".env"
DB_CONNECTION="mysql"
DB_HOST="127.0.0.1"
DB_PORT="3306"
DB_DATABASE="scheduler-test"
DB_USERNAME="root"
DB_PASSWORD=
~~~

После этого создайте [классы моделей](https://laravel.com/docs/11.x/eloquent#defining-models) и [миграции](https://laravel.com/docs/11.x/migrations#generating-migrations) с помощью Artisan:

~~~js
php artisan make:model Event --migration
~~~

Эта команда создаст файлы миграций в папке `database/migrations`. Определите схему таблицы на основе [ожидаемой структуры таблицы для Scheduler](guides/loading-data.md#databasestructure).

Пример кода миграции для таблицы Events:

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

Выполните миграцию для создания таблицы:

~~~php
php artisan migrate
~~~

:::note
Если вы столкнулись с ошибкой "Syntax error or access violation: 1071 Specified key was too long; max key length is 1000 bytes" в старых версиях MySQL, выполните следующие шаги.
:::

Для исправления откройте `app/Providers/AppServiceProvider.php` и добавьте следующий код в класс **AppServiceProvider**:

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

[Подробнее об этой ошибке здесь](https://laravel-news.com/laravel-5-4-key-too-long-error).

Далее создайте тестовые данные с помощью класса [seeder](https://laravel.com/docs/11.x/seeding):

~~~php
php artisan make:seeder EventsTableSeeder
~~~

Добавьте тестовые события в **EventsTableSeeder**:

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

Далее вызовите этот seeder из **DatabaseSeeder.php**:

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

Наконец, заполните базу данных:

~~~php
php artisan db:seed
~~~

### Определение классов моделей

Данные обрабатываются через [Eloquent model](https://laravel.com/docs/11.x/eloquent). Ранее созданная модель Event готова к использованию и не требует дополнительных изменений для работы с scheduler.

## Шаг 4. Загрузка данных

Когда база данных подготовлена и модели определены, следующим шагом будет загрузка данных в scheduler. Поскольку клиент ожидает даты в определённом [формате](guides/data-formats.md#json), создайте метод контроллера, который будет возвращать JSON в нужной структуре.

Создайте контроллер командой:

~~~php
php artisan make:controller EventController
~~~

Откройте **app/Http/Controllers/EventController.php** и добавьте метод `index`:

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

Зарегистрируйте маршрут, чтобы клиент мог обращаться к этому методу. Добавьте в [файл маршрутов api.php](https://laravel.com/docs/8.x/routing#basic-routing):

~~~js title="routes/api.php"
<?php

use IlluminateHttpRequest;

Route::get('/data', 'EventController@index');
~~~

Теперь обновите представление scheduler для загрузки данных с этого endpoint:

~~~js title="resources/views/scheduler.blade.php"
scheduler.config.date_format = "%Y-%m-%d %H:%i:%s";
scheduler.init("scheduler_here", new Date(2018, 11, 3), "week");

scheduler.load("/api/data");
~~~

Метод [scheduler.load](api/method/load.md) отправляет AJAX-запрос по указанному URL и ожидает ответ в формате JSON, как показано выше.

Указание значения [date_format](api/config/date_format.md) сообщает scheduler, в каком формате ожидать даты и позволяет правильно их парсить на клиенте.

Теперь scheduler должен отображать события, загруженные из базы данных:

![Загруженные события](/img/howtostart_laravel_loaded_events.png)

### Динамическая загрузка

В текущей реализации все события загружаются сразу при запуске scheduler. Это подходит для небольших объёмов данных. Однако для приложений типа бронирования или планирования, где данные накапливаются со временем, загрузка всех записей сразу может стать неэффективной и замедлить работу.

Динамическая загрузка решает эту проблему, запрашивая только события, видимые в текущем диапазоне дат. При переходе пользователя к другим датам scheduler будет запрашивать только соответствующие данные.

Чтобы включить динамическую загрузку, обновите `resources/views/scheduler.blade.php` так:

~~~js title="resources/views/scheduler.blade.php"
scheduler.config.date_format = "%Y-%m-%d %H:%i:%s";

scheduler.setLoadMode("day"); /*!*/

scheduler.init("scheduler_here", new Date(2018, 5, 6), "week");
scheduler.load("/api/events");
~~~

Измените контроллер для фильтрации событий по запрошенному диапазону дат:

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

## Шаг 5. Сохранение изменений

На данный момент scheduler может только читать данные с backend. Следующий шаг - реализовать сохранение изменений обратно в базу данных.

Клиент работает в REST-режиме, отправляя запросы POST, PUT и DELETE для операций с событиями. [Подробнее о форматах запросов и маршрутов](guides/server-integration.md#requestresponsedetails).

Теперь необходимо создать контроллер для обработки этих действий, определить маршруты и включить сохранение данных на клиенте.

### Добавление контроллеров

Начнем с настройки контроллеров. Для каждой модели мы создадим RESTful [resource controller](https://laravel.com/docs/controllers#resource-controllers), который будет включать методы для добавления, удаления и обновления модели.

#### Контроллер для событий

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

А вот соответствующий [маршрут](https://laravel.com/docs/controllers#resource-controllers):

~~~js title="routes/api.php"
<?php

use IlluminateHttpRequest;

Route::resource('events', 'EventController');
~~~

Несколько моментов по этому коду:

- Когда добавляется новая задача, сервер возвращает её id в свойстве **tid** объекта ответа.
- Параметр **progress** имеет значение по умолчанию. Многие параметры запроса являются необязательными, поэтому если клиентская задача их не содержит, они не будут отправлены на сервер.
- JSON-ответ может содержать дополнительные свойства, которые можно получить из [обработчика на клиенте](guides/server-integration.md#errorhandling).


### Включение сохранения данных на клиенте

Далее мы [настроим клиентскую часть](guides/server-integration.md#technique) для работы с только что созданным API:

~~~js title="resources/views/scheduler.blade.php"
scheduler.config.date_format = "%Y-%m-%d %H:%i:%s";
scheduler.setLoadMode("day"); /*!*/

scheduler.init("scheduler_here", new Date(2018, 11, 3), "week");

scheduler.load("/api/events"); /*!*/
var dp = scheduler.createDataProcessor("/api/events"); /*!*/
dp.init(scheduler);
dp.setTransactionMode("REST");
~~~

Теперь у вас есть полностью интерактивный Scheduler, в котором можно просматривать, добавлять, изменять и удалять события.

![CRUD operations](/img/howtostart_laravel_crud.png)

Для получения дополнительных возможностей ознакомьтесь с [нашими руководствами](/guides/).

## Повторяющиеся события

Для поддержки повторяющихся событий (например, ежедневных) потребуется добавить расширение в **scheduler.blade.php**, обновить модель и внести изменения в контроллер Events.

Начните с включения расширения recurring в **scheduler.blade.php**:

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

Далее обновите модель.

Если начинаете с нуля, вот полная схема:

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

Либо можно создать такую миграцию:

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

Затем выполните миграцию:

~~~php
php artisan migrate
~~~

Теперь обновите контроллер.

Для загрузки данных изменений не требуется, но действия записи нужно обновить, поскольку редактирование серий повторяющихся событий
[требует некоторых особенностей](guides/recurring-events.md#editingdeletingacertainoccurrenceintheseries).

Сначала убедитесь, что новые свойства модели Event добавлены в методы "store" и "update":

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

Есть ещё три случая, которые нужно обработать.

Сама серия повторяющихся событий хранится как одна запись, а удалённые экземпляры внутри серии - как отдельные записи, связанные с серией и помеченные как 'deleted'. Когда сервер встречает такой элемент, он должен вернуть статус "deleted". Такие записи можно определить, если **$event->rec_type == "none"**:

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

Изменённые экземпляры также сохраняются как отдельные записи, связанные с серией, и имеют отметку времени, чтобы не отображать исходный экземпляр. Когда пользователь удаляет изменённый экземпляр, вместо удаления нужно установить *rec_type* в "none":

~~~js
public function destroy($id){
    $event = Event::find($id);

    // удалить изменённый экземпляр серии
    if($event->event_pid){
        $event->rec_type = "none";
        $event->save();
    }else{
        // удалить обычный экземпляр
        $event->delete();
    }

    $this->deleteRelated($event);
    return response()->json([
        "action"=> "deleted"
    ]);
}
~~~

Наконец, при обновлении или удалении серии повторяющихся событий все её изменённые экземпляры также должны быть удалены. Так как изменённые экземпляры связаны с оригиналом через временные метки, этот шаг обязателен:

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

       // удалить изменённый экземпляр серии
    if($event->event_pid){
        $event->rec_type = "none";
        $event->save();
    }else{
         // удалить обычный экземпляр
        $event->delete();
    }
    $this->deleteRelated($event);/*!*/
    return response()->json([
          "action"=> "deleted"
    ]);
}
~~~

### Парсинг повторяющихся серий

Повторяющееся событие хранится как одна запись в базе данных, но может быть разбито на отдельные экземпляры на клиентской стороне Scheduler. Если вам нужно получить даты отдельных событий на сервере, рассмотрите возможность использования вспомогательной библиотеки для парсинга повторяющихся событий на PHP. 


Готовую библиотеку можно найти [на GitHub](https://github.com/DHTMLX/scheduler-helper-php).

## Безопасность приложения

Scheduler сам по себе не обеспечивает защиту от угроз, таких как SQL-инъекции, XSS или CSRF-атаки. Защита приложения - ответственность бэкенд-разработчиков. Подробнее смотрите [в соответствующей статье](guides/app-security.md).

## Решение проблем

Если вы выполнили все шаги по интеграции Scheduler с PHP, но события не отображаются, обратитесь к статье [Устранение проблем с интеграцией Backend](guides/troubleshooting.md). В ней даны рекомендации по поиску и устранению наиболее частых проблем.


## Что дальше

Теперь у вас есть полностью рабочий Scheduler. Полный код доступен на [GitHub](https://github.com/DHTMLX/scheduler-howto-laravel), откуда вы можете клонировать или скачать его для своих проектов.

Также изучите [руководства по дополнительным возможностям Scheduler](/guides/) или уроки по [интеграции Scheduler с другими backend-фреймворками](integrations/howtostart-guides.md).
