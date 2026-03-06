---
title: "dhtmlxScheduler mit Ruby on Rails"
sidebar_label: "dhtmlxScheduler mit Ruby on Rails"
---

# dhtmlxScheduler mit Ruby on Rails

Dieser Artikel zeigt, wie Sie einen Scheduler einrichten und serverseitig mit dem [Ruby on Rails](https://rubyonrails.org/) Framework sowie einer REST API integrieren.

Falls Sie mit einer anderen Technologie arbeiten, finden Sie unten weitere Integrationsoptionen:

- [dhtmlxScheduler mit ASP.NET Core](/integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxScheduler mit ASP.NET MVC](/integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxScheduler mit Node.js](/integrations/node/howtostart-nodejs.md)
- [dhtmlxScheduler mit PHP](/integrations/php/howtostart-plain-php.md)
- [dhtmlxScheduler mit PHP:Slim](/integrations/php/howtostart-php-slim4.md)
- [dhtmlxScheduler mit PHP:Laravel](/integrations/php/howtostart-php-laravel.md)
- [dhtmlxScheduler mit SalesForce LWC](/integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxScheduler mit dhtmlxConnector](/integrations/other/howtostart-connector.md)

Wenn Ruby on Rails bereits auf Ihrem Rechner installiert ist, können Sie direkt mit der Integration beginnen. Andernfalls müssen Sie das Framework gemäß den Anweisungen im [Installationsleitfaden](https://guides.rubyonrails.org/getting_started.html#installing-rails) installieren.

Sobald alles eingerichtet ist, können Sie mit der Integration Schritt für Schritt fortfahren.

## Schritt 1. Erstellen eines Projekts

Um ein neues Projekt zu erstellen, führen Sie folgenden Befehl im Terminal aus:

~~~js
rails new path/to/your/project
~~~

## Schritt 2. Erstellen eines Controllers

Fügen Sie als Nächstes einen Controller hinzu, der Benutzeranfragen an den Server innerhalb der Anwendung verarbeitet. Da die Anfragen je nach Typ variieren, empfiehlt es sich, für verschiedene Anfragearten separate Controller zu verwenden.

Routing wird genutzt, um Controller mit den jeweiligen Anfragetypen zu verbinden. Unterschiedliche Routen entsprechen verschiedenen Aktionen, und diese Aktionen sammeln die an die View übergebenen Informationen.

Erstellen Sie einen neuen Controller namens "home" mit einer Action "index" durch Ausführen von:

~~~js
cd path/to/your/project
rails generate controller home index
~~~

Die Ausgabe bestätigt die Erstellung der neuen Dateien.

## Schritt 3. Routing festlegen

Um das Routing einzurichten, öffnen Sie *config/routes.rb*. Suchen Sie die folgende Zeile am Anfang:

~~~js
get 'home/index'
~~~

und ersetzen Sie diese durch:

~~~js
root :to => 'home#index'
get "data", :to=>"event#get", :as=>"data"
post "data(/:id)", :to => "event#add"
put "data/:id", :to => "event#update"
delete "data/:id", :to => "event#delete"
~~~

Danach können Sie den Server mit folgendem Befehl testen:

~~~js
rails server
~~~

Öffnen Sie dann *http://localhost:3000/* in Ihrem Browser. Sie sollten eine Seite wie diese sehen:

![ruby_routing](/img/ruby_routing.png)

Der Server ist jetzt bereit, sodass Sie mit dem Hinzufügen der Views fortfahren können.

## Schritt 4. Einbinden der Quell-Dateien

Laden Sie zunächst das dhtmlxScheduler-Paket von [hier](https://dhtmlx.com/docs/products/dhtmlxScheduler/download.shtml) herunter.

Gehen Sie wie folgt vor:

1) Entpacken Sie *codebase/dhtmlxscheduler.js* sowie die Ordner *codebase/ext* und *codebase/locale* aus dem Paket in *vendor/assets/javascripts/* Ihres Projektverzeichnisses.

Sie sollten ungefähr folgendes sehen:

![ruby_unpack_js](/img/ruby_unpack_js.png)

2) Entpacken Sie die folgenden Style-Dateien:

- *codebase/dhtmlxscheduler.css*
- *codebase/dhtmlxscheduler_classic.css*
- *codebase/dhtmlxscheduler_flat.css* 
- *codebase/dhtmlxscheduler_glossy.css* 

nach *vendor/assets/stylesheets/*.

Das Ergebnis sieht wie folgt aus:

![ruby_unpack_styles](/img/ruby_unpack_styles.png)

3) Erstellen Sie im Verzeichnis "public" einen Ordner "assets" und entpacken Sie diese Ordner hinein:

- *codebase/imgs*
- *codebase/imgs_dhx_terrace*
- *codebase/imgs_flat*
- *codebase/imgs_glossy*

Dies sollte folgendermaßen aussehen:

![ruby_unpack_assets](/img/ruby_unpack_assets.png)

4) Öffnen Sie **config/initializers/assets.rb** und fügen Sie *dhtmlxscheduler.js* und *dhtmlxscheduler.css* zur Precompile-Liste hinzu, indem Sie Folgendes ergänzen:

~~~js
Rails.application.config.assets.precompile += %w( dhtmlxscheduler.css )
Rails.application.config.assets.precompile += %w( dhtmlxscheduler.js )
~~~

## Schritt 5. Erstellen von Views

Nun ist es Zeit, eine View zu erstellen. Views zeigen die von den Aktionen gesammelten Informationen an.

Wenn kein spezifisches Layout für einen Controller existiert, verwendet Rails *app/views/layouts/application.html.erb* als Template für alle Seiten mit gemeinsamen Elementen. Es empfiehlt sich, die JS- und CSS-Dateien des Schedulers hier einzubinden, indem Sie folgende Zeilen im Header ergänzen:

~~~html
<!DOCTYPE html>
<html>
<head>
 <title>SchedulerRubyRest</title>
 (= stylesheet_link_tag 'application',media:'all','data-turbolinks-track'=>true )
 (= javascript_include_tag 'application', 'data-turbolinks-track' => true )
 (= stylesheet_link_tag 'dhtmlxscheduler',media:'all','data-turbolinks-track'=>true )
 (= javascript_include_tag 'dhtmlxscheduler', 'data-turbolinks-track' => true )
 (= csrf_meta_tags )
</head>
<body>

(= yield )

</body>
</html>
~~~

Legen Sie anschließend eine View für den zuvor erstellten "home"-Controller aus [Schritt 2](/integrations/other/howtostart-ruby.md#step2creatingacontroller) an. Öffnen Sie *app/views/home/index.html.erb* und fügen Sie einen Container für den Scheduler sowie Initialisierungscode hinzu:

~~~html
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
      <div class="dhx_cal_header">
      </div>
      <div class="dhx_cal_data">
      </div>
</div>

<script>    
    scheduler.init("scheduler_here", new Date(2016,4,27), "week");
</script>
~~~

Wenn Sie nun *http://localhost:3000/* in Ihrem Browser öffnen, sehen Sie einen leeren Scheduler:

![ruby_empty_scheduler](/img/ruby_empty_scheduler.png)

An diesem Punkt ermöglicht der Scheduler das Hinzufügen und Bearbeiten von Ereignissen, speichert diese jedoch noch nicht. Um das Speichern zu aktivieren, müssen Sie Modelle erstellen.

## Schritt 6. Erstellen von Modellen

Da der Scheduler mit Event-Entitäten arbeitet, benötigen Sie ein Modell für Events.

Erstellen Sie ein Event-Modell mit folgenden Eigenschaften, indem Sie ausführen:

~~~js
rails generate model Event start_date:datetime end_date:datetime text:string
~~~

Eine Liste der erforderlichen Eigenschaften des Event-Objekts und deren Beschreibung finden Sie im [zugehörigen Artikel](/guides/loading-data.md#dataproperties).

Nachdem Sie das Modell generiert haben, legen Sie die Datenbank mit folgendem Befehl an:

~~~js
rake db:migrate
~~~

Sie können das Hinzufügen eines Eintrags wie folgt testen:

1. Öffnen Sie die Rails-Konsole:

~~~js
rails c
~~~

2. Fügen Sie ein Event wie folgt hinzu:

~~~js
Event.create 
    :start_date => "2016-05-27 10:00:00", 
    :end_date => "2016-05-27 15:00:00", 
    :text => "Test";
~~~

3. Um alle Events anzuzeigen, führen Sie aus:

~~~js
Event.all
~~~

4. Geben Sie "exit" ein, um die Konsole zu schließen.

![ruby_console](/img/ruby_console.png)

Als Nächstes implementieren Sie das Laden und Speichern von Daten im Scheduler mithilfe von Controllern.

## Schritt 7. Erstellen des Event-Controllers

### Allgemeine Technik zum Laden von Daten mittels REST API

Es gibt einen [Standardansatz](/guides/server-integration.md#technique) zum Laden von Daten in den Scheduler von der Serverseite.

Die Anforderungen auf Client-Seite sowie die [Details zu Requests und Responses](/guides/server-integration.md#request-parameters) sind im Artikel [Serverseitige Integration](/guides/server-integration.md) beschrieben.

Im Folgenden finden Sie Anweisungen, wie Sie Daten mit einem Ruby on Rails Backend in den Scheduler laden.

### Event-Controller

Um einen neuen Controller für Events einzurichten, verwenden Sie folgenden Befehl:

~~~js
rails generate controller event
~~~

Fügen Sie anschließend den Code zum Hinzufügen, Aktualisieren und Löschen von Daten in die Event-Controller-Datei unter *app/controllers/event_controller.rb* ein:

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

Der Code des Event-Controllers unterstützt verschiedene Anfragetypen:

- Eine GET-Anfrage lädt Daten für den Scheduler. Sie erstellt ein Objekt mit Eventdaten für das Gantt-Diagramm, wobei die Daten als Strings formatiert werden.
- Eine POST-Anfrage fügt einen neuen Datensatz zur Datenbank hinzu.
- Eine PUT-Anfrage aktualisiert einen bestehenden Datensatz.
- Eine DELETE-Anfrage entfernt einen Datensatz.

Jede Aktion gibt eine JSON-Antwort zurück, die die ausgeführte Operation angibt oder "error", falls ein Fehler aufgetreten ist.

Beim Einfügen neuer Datensätze enthält die Antwort zusätzlich die Datenbank-ID des neuen Elements. Dies ermöglicht es der Client-Seite, das neue Event mit dem Datenbankeintrag zu verknüpfen.

## Schritt 8. Scheduler initialisieren

Fügen Sie abschließend den folgenden Code in die &#60;script&#62;&#60;/script&#62;-Tags in *app/views/home/index.html.erb* ein:

~~~js
scheduler.config.xml_date="%Y-%m-%d %H:%i";
scheduler.init("scheduler_here", new Date(2016,4,27), "week");
scheduler.load("(= data_path )/");

var dp = scheduler.createDataProcessor("(= data_path )/");
dp.init(scheduler);
dp.setTransactionMode("REST");
~~~

Dieser Code richtet den Scheduler ein und ermöglicht das Laden und Speichern von Daten. Sobald dies erledigt ist, können Sie die Anwendung im Browser starten und in Aktion sehen.

![ruby_ready_scheduler](/img/ruby_ready_scheduler.png)

Hier wird ein Event im Scheduler angezeigt. Dieses Event wurde zuvor in [Schritt 6](/integrations/other/howtostart-ruby.md#step6creatingmodels) hinzugefügt. Sie können jetzt Events hinzufügen oder bearbeiten, wobei alle Änderungen in der Datenbank gespeichert werden.

## Wiederkehrende Events

Zur Unterstützung von wiederkehrenden Events sind drei zusätzliche Felder erforderlich:

- **rec_type** (definiert das Wiederholungsmuster);


- **event_pid** (die übergeordnete ID für eine Serie von Events);


- **event_length** (die tatsächliche Dauer der Eventserie).

Entfernen Sie zunächst das alte Modell mit:

~~~
rails destroy model Event
~~~

Erstellen Sie dann ein neues Modell mit den zusätzlichen Feldern:

~~~
rails generate model Event start_date:datetime end_date:datetime text:string 
rec_type:string event_length:integer event_pid:integer
~~~

Entfernen Sie die bestehende events-Tabelle aus der Datenbank oder löschen Sie *db/development.sqlite3*.

Führen Sie die Migration aus, um das Datenbankschema zu aktualisieren:

~~~
rake db:migrate
~~~

Öffnen Sie anschließend *app/controllers/home_controller.rb* und aktualisieren Sie die Methoden "db_action" und "data", um das Speichern und Laden von wiederkehrenden Events zu unterstützen:

~~~
class HomeController < ApplicationController
 def index
 end

 def data
   events = Event.all

   render :json => events.map {|event| {
              :id => event.id,
              :start_date => event.start_date.to_formatted_s(:db),
              :end_date => event.end_date.to_formatted_s(:db),
              :text => event.text,
              :rec_type => event.rec_type,
              :event_length => event.event_length,
              :event_pid => event.event_pid
          }}
 end

 def db_action
   mode = params['!nativeeditor_status']
   id = params['id']
   start_date = params['start_date']
   end_date = params['end_date']
   text = params['text']
   rec_type = params['rec_type']
   event_length = params['event_length']
   event_pid = params['event_pid']
   tid = id

   case mode
     when 'inserted'
       event = Event.create :start_date => start_date, :end_date => end_date, 
                               :text => text,:rec_type => rec_type, 
                            :event_length => event_length, :event_pid => event_pid
       tid = event.id
       if rec_type == 'none'
         mode = 'deleted'
       end

     when 'deleted'
       if rec_type != ''
         Event.where(event_pid: id).destroy_all
       end

       if event_pid != 0 and event_pid != ''
         event = Event.find(id)
         event.rec_type = 'none'
         event.save
       else
         Event.find(id).destroy
       end

     when 'updated'
       if rec_type != ''
         Event.where(event_pid: id).destroy_all
       end
       event = Event.find(id)
       event.start_date = start_date
       event.end_date = end_date
       event.text = text
       event.rec_type = rec_type
       event.event_length = event_length
       event.event_pid = event_pid
       event.save
   end

   render :json => {
              :type => mode,
              :sid => id,
              :tid => tid,
          }
 end
end
~~~

Fügen Sie danach in *app/views/home/index.html.erb* die Initialisierung des **recurring**-Plugins hinzu:

~~~js
scheduler.plugins({
    recurring: true
});

scheduler.init("scheduler_here", new Date(2016,4,27), "week");
scheduler.load("(= data_path )/");

var dp = scheduler.createDataProcessor({
    url: "(= data_path )/",
    mode: "REST"
});
~~~

Starten Sie abschließend den Rails-Server erneut, um den Scheduler mit wiederkehrenden Events zu testen:

~~~
rails server
recurring events on rails
~~~

Wenn Sie diese Schritte sorgfältig befolgen, erhalten Sie einen voll funktionsfähigen Scheduler mit Unterstützung für wiederkehrende Events im Rails-Framework.

## Fehlerbehebung

Falls der Scheduler nach Abschluss dieser Schritte keine Events anzeigt, lesen Sie den Artikel [Fehlerbehebung bei Backend-Integrationsproblemen](/guides/troubleshooting.md). Dort finden Sie Hinweise zur Diagnose häufiger Probleme.

## Wie geht es weiter?

Entdecken Sie [Anleitungen zu verschiedenen Funktionen des Schedulers](/guides/) oder sehen Sie sich Tutorials zur Integration des Schedulers mit anderen Backend-Frameworks in [[Wie man mit dhtmlxScheduler startet](/integrations/howtostart-guides.md)] an.
