---
title: "dhtmlxScheduler mit PHP:Laravel"
sidebar_label: "dhtmlxScheduler mit PHP:Laravel"
---

# dhtmlxScheduler mit PHP:Laravel

Diese Anleitung beschreibt die Integration von dhtmlxScheduler in eine [Laravel](https://laravel.com/) Anwendung.

Es gibt auch Anleitungen zur Server-seitigen Integration mit anderen Plattformen:

- [dhtmlxScheduler mit ASP.NET Core](/integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxScheduler mit ASP.NET MVC](/integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxScheduler mit Node.js](/integrations/node/howtostart-nodejs.md)
- [dhtmlxScheduler mit PHP](/integrations/php/howtostart-plain-php.md)
- [dhtmlxScheduler mit PHP:Slim](/integrations/php/howtostart-php-slim4.md)
- [dhtmlxScheduler mit SalesForce LWC](/integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxScheduler mit Ruby on Rails](/integrations/other/howtostart-ruby.md)
- [dhtmlxScheduler mit dhtmlxConnector](/integrations/other/howtostart-connector.md)

Den [kompletten Beispielcode findest du auf GitHub](https://github.com/DHTMLX/scheduler-howto-laravel) oder folge den untenstehenden Schritt-für-Schritt-Anweisungen.

:::note
Der vollständige Quellcode ist [auf GitHub verfügbar](https://github.com/DHTMLX/scheduler-howto-laravel).
:::

## Schritt 1. Initialisierung eines Projekts

### Projekt erstellen

Beginne mit dem Erstellen einer neuen Laravel-Anwendung mit [Composer](https://getcomposer.org/):

~~~php
composer create-project laravel/laravel scheduler-howto-laravel
~~~

Dieser Vorgang dauert einen Moment, um alle notwendigen Dateien herunterzuladen und einzurichten. Nach Abschluss kannst du die Einrichtung mit folgendem Befehl überprüfen:

~~~php
cd scheduler-howto-laravel
php artisan serve
~~~

Nun solltest du die Standard-Willkommensseite von Laravel sehen:

![howtostart_laravel_blank_page](/img/howtostart_laravel_blank_page.png)

## Schritt 2. Scheduler zur Seite hinzufügen

### Eine View hinzufügen

Als Nächstes fügst du eine neue Seite hinzu, die dhtmlxScheduler enthält. Erstelle eine neue View-Datei mit dem Namen *scheduler.blade.php* im Verzeichnis *resources/views*:

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

Dies erstellt eine grundlegende HTML-Struktur, bindet die dhtmlxScheduler-Ressourcen vom [CDN](/guides/cdn-links-list.md) ein und initialisiert den Scheduler mit der [init](api/method/init.md) Methode.

Beachte, dass sowohl für den Body als auch für den Scheduler-Container eine Höhe von 100% festgelegt ist. Da der Scheduler sich an die Größe seines Containers anpasst, ist diese Angabe notwendig.

### Die Standardroute ändern

Damit die neue Seite erreichbar ist, passe die Standardroute an, damit der Scheduler beim Aufruf der App angezeigt wird.

Bearbeite *routes/web.php*, um die Root-Route zu ändern:

~~~js title="routes/web.php"
<?php

Route::get('/', function () {
    return view('scheduler');
});
~~~

Starte die App neu und prüfe, ob die Scheduler-Seite geladen wird:

![howtostart_laravel_empty_scheduler](/img/howtostart_laravel_empty_scheduler.png)

## Schritt 3. Eine Datenbank vorbereiten

Der Scheduler ist derzeit leer. Im nächsten Schritt erfolgt die Anbindung an eine Datenbank und das Befüllen mit Daten.

### Eine Datenbank erstellen

Stelle sicher, dass du die Datenbankverbindung in der *.env*-Datei konfigurierst, zum Beispiel:

~~~js title=".env"
DB_CONNECTION="mysql"
DB_HOST="127.0.0.1"
DB_PORT="3306"
DB_DATABASE="scheduler-test"
DB_USERNAME="root"
DB_PASSWORD=
~~~

Erstelle anschließend die [Model-Klassen](https://laravel.com/docs/11.x/eloquent#defining-models) und [Migrationen](https://laravel.com/docs/11.x/migrations#generating-migrations) mit Artisan:

~~~js
php artisan make:model Event --migration
~~~

Dieser Befehl erzeugt Migrationsdateien im Ordner `database/migrations`. Definiere darin das Datenbankschema entsprechend der [erwarteten Tabellenstruktur für Scheduler](/guides/loading-data.md#databasestructure).

Hier ist der Migrationscode für die Events-Tabelle:

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

Führe die Migration aus, um die Tabelle zu erstellen:

~~~php
php artisan migrate
~~~

:::note
Falls du auf einen Fehler wie "Syntax error or access violation: 1071 Specified key was too long; max key length is 1000 bytes" mit älteren MySQL-Versionen stößt, folge den untenstehenden Schritten.
:::

Um das zu beheben, öffne `app/Providers/AppServiceProvider.php` und ergänze die **AppServiceProvider**-Klasse wie folgt:

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

[Weitere Informationen zu diesem Fehler findest du hier](https://laravel-news.com/laravel-5-4-key-too-long-error).

Erzeuge als Nächstes Beispieldaten mit einer [Seeder](https://laravel.com/docs/11.x/seeding)-Klasse:

~~~php
php artisan make:seeder EventsTableSeeder
~~~

Füge Beispiel-Events in **EventsTableSeeder** hinzu:

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

Rufe diesen Seeder in **DatabaseSeeder.php** auf:

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

Fülle die Datenbank schließlich mit:

~~~php
php artisan db:seed
~~~

### Model-Klassen definieren

Die Daten werden über [Eloquent Model](https://laravel.com/docs/11.x/eloquent)-Klassen verarbeitet. Das zuvor erstellte Event-Modell ist bereits einsatzbereit und benötigt keine Anpassungen für die Zusammenarbeit mit dem Scheduler.

## Schritt 4. Daten laden

Nachdem die Datenbank eingerichtet und die Models definiert sind, ist der nächste Schritt, die Daten in den Scheduler zu laden. Da der Client die Daten in einem bestimmten [Format](/guides/data-formats.md#json) erwartet, erstelle eine Controller-Action, die JSON im erforderlichen Format ausgibt.

Führe diesen Befehl aus, um den Controller zu erstellen:

~~~php
php artisan make:controller EventController
~~~

Öffne **app/Http/Controllers/EventController.php** und ergänze die `index`-Methode:

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

Registriere eine Route, damit der Client auf diese Action zugreifen kann. Füge dies zur [api.php Routen-Datei](https://laravel.com/docs/8.x/routing#basic-routing) hinzu:

~~~js title="routes/api.php"
<?php

use IlluminateHttpRequest;

Route::get('/data', 'EventController@index');
~~~

Aktualisiere abschließend die Scheduler-View, um die Daten von diesem Endpunkt zu laden:

~~~js title="resources/views/scheduler.blade.php"
scheduler.config.date_format = "%Y-%m-%d %H:%i:%s";
scheduler.init("scheduler_here", new Date(2018, 11, 3), "week");

scheduler.load("/api/data");
~~~

Die [scheduler.load](api/method/load.md)-Methode sendet eine AJAX-Anfrage an die angegebene URL und erwartet eine JSON-Antwort im oben gezeigten Format.

Durch die Angabe des [date_format](api/config/date_format.md)-Werts weiß der Scheduler, welches Datumsformat erwartet wird, und kann die Daten korrekt interpretieren.

Nun sollte der Scheduler die aus der Datenbank geladenen Events anzeigen:

![Geladene Events](/img/howtostart_laravel_loaded_events.png)

### Dynamisches Laden

Derzeit werden alle Events beim Start des Schedulers auf einmal geladen. Das ist unproblematisch bei kleinen Datenmengen. Für Anwendungen wie Buchungssysteme oder Planungswerkzeuge, bei denen die Datenmenge im Laufe der Zeit wächst, kann das Laden aller Datensätze auf einmal jedoch ineffizient und langsam werden.

Dynamisches Laden löst dieses Problem, indem jeweils nur die Events angefordert werden, die im aktuellen Datumsbereich sichtbar sind. Beim Navigieren zu anderen Daten ruft der Scheduler nur die relevanten Daten ab.

Um dynamisches Laden zu aktivieren, ergänze `resources/views/scheduler.blade.php` um folgende Zeile:

~~~js title="resources/views/scheduler.blade.php"
scheduler.config.date_format = "%Y-%m-%d %H:%i:%s";

scheduler.setLoadMode("day"); /*!*/

scheduler.init("scheduler_here", new Date(2018, 5, 6), "week");
scheduler.load("/api/events");
~~~

Passe den Controller an, um Events anhand des angeforderten Datumsbereichs zu filtern:

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

## Schritt 5. Änderungen speichern

Bisher kann der Scheduler Daten vom Backend lesen. Im nächsten Schritt wird das Speichern von Änderungen in der Datenbank ermöglicht.

Der Client arbeitet im REST-Modus und sendet POST-, PUT- und DELETE-Anfragen für Event-Operationen. [Weitere Informationen zu Request- und Routenformaten findest du hier](/guides/server-integration.md#request-parameters).

Nun musst du einen Controller erstellen, der diese Aktionen verarbeitet, entsprechende Routen definieren und das Speichern von Daten auf Client-Seite aktivieren.

### Controller hinzufügen

Beginnen wir mit dem Anlegen der Controller. Für jedes Model wird ein RESTful [Resource Controller](https://laravel.com/docs/controllers#resource-controllers) erstellt, der Methoden zum Hinzufügen, Löschen und Aktualisieren des Modells enthält.

#### Controller für Events

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

Und hier ist die entsprechende [Route](https://laravel.com/docs/controllers#resource-controllers):

~~~js title="routes/api.php"
<?php

use IlluminateHttpRequest;

Route::resource('events', 'EventController');
~~~

Einige Hinweise zu diesem Code:

- Wenn eine neue Aufgabe hinzugefügt wird, antwortet der Server mit deren ID in der **tid**-Eigenschaft des Antwortobjekts.
- Der **progress**-Parameter hat einen Standardwert. Viele Anfrageparameter sind optional, sodass sie nicht an den Server gesendet werden, wenn sie auf der Client-Seite nicht gesetzt wurden.
- Die JSON-Antwort kann zusätzliche Eigenschaften enthalten, auf die alle im [Client-Handler](/guides/server-integration.md#errorhandling) zugegriffen werden kann.


### Speichern von Daten auf der Client-Seite aktivieren

Als Nächstes [richten wir die Client-Seite](/guides/server-integration.md#technique) ein, damit sie mit der gerade erstellten API funktioniert:

~~~js title="resources/views/scheduler.blade.php"
scheduler.config.date_format = "%Y-%m-%d %H:%i:%s";
scheduler.setLoadMode("day"); /*!*/

scheduler.init("scheduler_here", new Date(2018, 11, 3), "week");

scheduler.load("/api/events"); /*!*/
var dp = scheduler.createDataProcessor("/api/events"); /*!*/
dp.init(scheduler);
dp.setTransactionMode("REST");
~~~

Damit erhalten Sie einen voll interaktiven Scheduler, in dem Sie Events anzeigen, hinzufügen, aktualisieren und löschen können.

![CRUD operations](/img/howtostart_laravel_crud.png)

Weitere Funktionen finden Sie in [unseren Guides](/guides/).

## Wiederkehrende Events

Um wiederkehrende Events (wie tägliche Wiederholungen) zu unterstützen, müssen Sie eine Erweiterung zu **scheduler.blade.php** hinzufügen, das Model anpassen und den Events-Controller aktualisieren.

Beginnen Sie damit, die Recurring-Erweiterung in **scheduler.blade.php** zu aktivieren:

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

Anschließend aktualisieren Sie das Model.

Wenn Sie neu starten, hier das komplette Schema:

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

Alternativ können Sie diese Migration erstellen:

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

Führen Sie dann die Migration aus:

~~~php
php artisan migrate
~~~

Nun aktualisieren Sie den Controller.

Das Laden der Daten erfordert keine Änderungen, aber die Schreibaktionen müssen aktualisiert werden, da das Bearbeiten von Serien
[besondere Schritte erfordert](/guides/recurring-events.md#editingdeleting-a-certain-occurrence-in-the-series).

Stellen Sie zuerst sicher, dass die neuen Eigenschaften des Event-Models in den Methoden "store" und "update" enthalten sind:

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

Es gibt drei weitere Fälle zu berücksichtigen.

Die wiederkehrende Serie selbst wird als einzelner Datensatz gespeichert, während gelöschte Instanzen innerhalb der Serie als einzelne Datensätze gespeichert werden, die mit der Serie verknüpft und als 'deleted' markiert sind. Wenn der Server auf ein solches Element trifft, sollte er mit dem Status "deleted" antworten. Diese Datensätze können erkannt werden, indem geprüft wird, ob **$event->rec_type == "none"**:

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

Modifizierte Vorkommen werden ebenfalls als einzelne Datensätze gespeichert, die mit der wiederkehrenden Serie verknüpft und mit einem Zeitstempel versehen sind, um das Rendern des ursprünglichen Vorkommens zu verhindern. Wenn ein Benutzer eine modifizierte Instanz löscht, sollte statt des Entfernens *rec_type* auf "none" gesetzt werden:

~~~js
public function destroy($id){
    $event = Event::find($id);

    // Lösche die modifizierte Instanz der wiederkehrenden Serie
    if($event->event_pid){
        $event->rec_type = "none";
        $event->save();
    }else{
        // Lösche eine normale Instanz
        $event->delete();
    }

    $this->deleteRelated($event);
    return response()->json([
        "action"=> "deleted"
    ]);
}
~~~

Schließlich sollten beim Aktualisieren oder Löschen einer wiederkehrenden Serie alle modifizierten Vorkommen ebenfalls entfernt werden. Da modifizierte Vorkommen über Zeitstempel mit dem Original verknüpft sind, ist dieser Schritt notwendig:

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

       // Lösche die modifizierte Instanz der wiederkehrenden Serie
    if($event->event_pid){
        $event->rec_type = "none";
        $event->save();
    }else{
         // Lösche eine normale Instanz
        $event->delete();
    }
    $this->deleteRelated($event);/*!*/
    return response()->json([
          "action"=> "deleted"
    ]);
}
~~~

### Wiederkehrende Serien parsen

Ein wiederkehrendes Event wird als einzelner Datensatz in der Datenbank gespeichert, kann aber vom Scheduler auf der Client-Seite in einzelne Vorkommen aufgeteilt werden. Wenn Sie die Daten einzelner Events auf dem Server benötigen, empfiehlt es sich, eine Hilfsbibliothek zum Parsen wiederkehrender Events in PHP zu verwenden. 


Sie finden [eine fertige Bibliothek auf GitHub](https://github.com/DHTMLX/scheduler-helper-php).

## Anwendungssicherheit

Scheduler selbst bietet keinen eingebauten Schutz gegen Bedrohungen wie SQL-Injections, XSS oder CSRF-Angriffe. Die Sicherheit Ihrer Anwendung liegt in der Verantwortung der Backend-Entwickler. Weitere Details finden Sie im [entsprechenden Artikel](/guides/app-security.md).

## Fehlerbehebung

Wenn Sie die Schritte zur Integration des Schedulers mit PHP befolgt haben, aber keine Events angezeigt werden, lesen Sie den Artikel [Fehlerbehebung bei Backend-Integrationsproblemen](/guides/troubleshooting.md). Dort finden Sie Hinweise zur Identifikation und Behebung häufiger Probleme.


## Wie geht es weiter?

An diesem Punkt haben Sie einen voll funktionsfähigen Scheduler. Der vollständige Code ist auf [GitHub](https://github.com/DHTMLX/scheduler-howto-laravel) verfügbar, wo Sie ihn für Ihre Projekte klonen oder herunterladen können.

Zusätzlich können Sie [Guides zu den vielen Funktionen des Schedulers](/guides/) oder Tutorials zur [Integration des Schedulers mit anderen Backend-Frameworks](/integrations/howtostart-guides.md) erkunden.
