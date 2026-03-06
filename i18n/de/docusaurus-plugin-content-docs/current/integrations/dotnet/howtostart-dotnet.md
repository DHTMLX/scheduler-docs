---
title: "dhtmlxScheduler mit ASP.NET MVC"
sidebar_label: "dhtmlxScheduler mit ASP.NET MVC"
---

# dhtmlxScheduler mit ASP.NET MVC

Diese Anleitung führt Sie durch die Erstellung eines Schedulers mit [ASP.NET](https://dotnet.microsoft.com/apps/aspnet) und einer REST-API auf der Serverseite.

Wenn Sie sich für andere serverseitige Integrationen mit dem Scheduler interessieren, können Sie folgende Tutorials ansehen:

- [dhtmlxScheduler mit ASP.NET Core](/integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxScheduler mit Node.js](/integrations/node/howtostart-nodejs.md)
- [dhtmlxScheduler mit PHP](/integrations/php/howtostart-plain-php.md)
- [dhtmlxScheduler mit PHP:Slim](/integrations/php/howtostart-php-slim4.md)
- [dhtmlxScheduler mit PHP:Laravel](/integrations/php/howtostart-php-laravel.md)
- [dhtmlxScheduler mit SalesForce LWC](/integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxScheduler mit Ruby on Rails](/integrations/other/howtostart-ruby.md)
- [dhtmlxScheduler mit dhtmlxConnector](/integrations/other/howtostart-connector.md)

Hier verwenden wir ASP.NET MVC 5 zusammen mit einem Web API Controller für die REST-API, um eine Scheduler-Anwendung zu erstellen. Für die Datenbankinteraktion nutzen wir das [Entity Framework](https://learn.microsoft.com/en-us/aspnet/entity-framework). Die Entwicklung erfolgt mit der Visual Studio IDE.

:::note
Den vollständigen Quellcode finden Sie [auf GitHub](https://github.com/DHTMLX/scheduler-howto-dotnet).
:::

## Schritt 1. Projekt erstellen

Starten Sie Visual Studio 2022 und wählen Sie *Neues Projekt erstellen*.

![Neues Projekt](/img/how_to_start_net_create_project.png)

Wählen Sie dann "ASP.NET Web Application" und geben Sie als Namen *DHX.Scheduler.Web* ein. Falls die Vorlage fehlt, schauen Sie im Abschnitt [Troubleshooting](#troubleshooting) nach.

![Neues Projekt](/img/how_to_start_net_project_template.png)

![Projektkonfiguration](/img/how_to_start_net_project_config.png)

Wählen Sie aus den Vorlagen ein leeres Projekt und aktivieren Sie auf der rechten Seite die Optionen für MVC und Web API:

![Leeres Projekt](/img/how_to_start_net_empty_project.png)


## Schritt 2. Scheduler zur Seite hinzufügen

### Controller erstellen

Mit dem leeren Projekt als Basis ist der nächste Schritt, einen MVC-Controller hinzuzufügen, der die Scheduler-Seite anzeigt.

Klicken Sie mit der rechten Maustaste auf den Ordner Controllers, wählen Sie Hinzufügen -> Controller. Im Dialog wählen Sie MVC 5 Controller -> Leer und klicken auf Hinzufügen. Nennen Sie den Controller "HomeController".

![Home controller](/img/how_to_start_net_controller.png)

Der HomeController enthält standardmäßig die Methode *Index()* der Klasse *ActionResult*, es ist keine zusätzliche Logik erforderlich. Wir fügen lediglich eine View dafür hinzu.

~~~js title="Controllers/HomeController.cs"
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

### View erstellen

Als nächstes erstellen Sie die Index-Seite. Navigieren Sie zu Views/Home und fügen Sie eine leere View mit dem Namen Index hinzu:

![Index view](/img/how_to_start_net_index_view.png)

Öffnen Sie die neue View und fügen Sie folgenden Code ein:

~~~js title="Views/Home/Index.cshtml"
@{
    Layout = null;
}

<!DOCTYPE html>

<html>
<head>
    <meta name="viewport" content="width="device-width"" />
    <title>Index</title>
    <link href="https://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.css"
          rel="stylesheet" type="text/css" />
    <script src="https://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function(event) {
            // initializing scheduler
            scheduler.init("scheduler_here", new Date(2022,0,15));

            // initiating data loading
            scheduler.load("/api/scheduler");
            // initializing dataProcessor
            var dp = scheduler.createDataProcessor("/api/scheduler");
            // and attaching it to scheduler
            dp.init(scheduler);
            // setting the REST mode for dataProcessor
            dp.setTransactionMode("REST");
        });
    </script>
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
</body>
</html>
~~~

Das passiert hier:

- Erstellt ein einfaches Seitenlayout für die Scheduler-Anwendung
- Bindet das JavaScript und CSS des dhtmlxScheduler von [CDN-Links](/guides/installation.md#cdn) ein
- Erstellt den Scheduler auf der Seite

Außerdem wird der Scheduler so konfiguriert, dass er mit einem RESTful API-Backend unter ["/api/scheduler/"](/guides/server-integration.md#technique) arbeitet, um Daten beim Laden sowie als Standard-Route abzurufen:

~~~js title="Views/Home/Index.cshtml"
scheduler.load("/api/scheduler");
// initializing dataProcessor
var dp = scheduler.createDataProcessor("/api/scheduler");
// and attaching it to scheduler
dp.init(scheduler);
// setting the REST mode for dataProcessor
dp.setTransactionMode("REST");
~~~

Die serverseitige Implementierung folgt später. Für den Moment können Sie die Anwendung starten und den Scheduler angezeigt sehen.

![Scheduler initialisierung](/img/how_to_start_net_scheduler_init.png)


## Schritt 3. Modelle und Datenbank erstellen

### Modelle erstellen

Als nächstes werden Modellklassen für den Scheduler definiert. Sie benötigen eine Klasse, die Scheduler-Ereignisse repräsentiert. Beachten Sie, dass dhtmlxScheduler eine bestimmte Namenskonvention für sein Datenmodell verwendet, die sich von der üblichen C#-Schreibweise unterscheidet. Einige Client-seitige Eigenschaften werden möglicherweise nicht in der Datenbank gespeichert, sondern dienen der Logik im Client oder Backend.

Um dies zu handhaben, folgen wir dem [Data Transfer Object](https://learn.microsoft.com/en-us/aspnet/web-api/overview/data/using-web-api-with-entity-framework/part-5)-Muster: Wir definieren Domänenmodellklassen für EF und die interne Nutzung sowie separate DTO-Klassen für die Kommunikation mit der Web API. Später wird ein Mapping zwischen diesen Modellen eingerichtet.


#### Scheduler Event Model

Beginnen wir mit einer Klasse für Event. Hier ein einfaches Beispiel:

~~~js title="Models/SchedulerEvent.cs"
using System;

namespace DHX.Scheduler.Web.Models
{
    public class SchedulerEvent
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

    }
}
~~~

Beachten Sie, dass Scheduler-Ereignisse viele weitere Eigenschaften enthalten können, die den Kalender erweitern. Dieses Beispiel deckt die Grundlagen ab.


### Datenbankverbindung konfigurieren

#### Entity Framework installieren

Sie können das Framework über den NuGet-Paketmanager hinzufügen:

![Entity Framework via NuGet](/img/how_to_start_net_entity_nuget.png)

Alternativ können Sie diesen Befehl in der Package Manager Console ausführen:

~~~
PM> Install-Package EntityFramework
~~~

#### Datenbank-Kontext erstellen

Erstellen Sie als nächstes eine Context-Klasse. Sie repräsentiert die Sitzung mit der Datenbank und verwaltet das Abrufen und Speichern von Daten.

Klicken Sie mit der rechten Maustaste auf den Ordner *Models*, wählen Sie Hinzufügen -> Klasse, nennen Sie sie "SchedulerContext" und fügen Sie Folgendes hinzu:

~~~js title="Models/SchedulerContext.cs"
using System.Data.Entity;

namespace DHX.Scheduler.Web.Models
{
    public class SchedulerContext : DbContext
    {
        public DbSet<SchedulerEvent> SchedulerEvents { get; set; }
    }
}
~~~

#### Anfangsdaten zur Datenbank hinzufügen

Nun fügen wir einige Beispieldatensätze hinzu.

Entity Framework kann die Datenbank beim Start der Anwendung automatisch erstellen. Wir möchten, dass die Datenbank gelöscht und neu erstellt wird, wenn sich das Modell ändert.

Erstellen Sie zunächst einen Datenbank-Initializer, indem Sie eine neue Klasse in *App_Start* hinzufügen, die von *DropCreateDatabaseIfModelChanges* erbt. Wir nennen sie "SchedulerInitializer".

In dieser Klasse überschreiben Sie die Methode *Seed()*, um die Datenbank mit Testdaten zu befüllen, indem Sie Entitäten zum Kontext hinzufügen.

Hier die vollständige Klasse *SchedulerInitializer*:

~~~js title="App_Start/SchedulerInitializer.cs"
using System;
using System.Collections.Generic;
using System.Data.Entity;

using DHX.Scheduler.Web.Models;

namespace DHX.Scheduler.Web.App_Start
{
  public class SchedulerInitializer:DropCreateDatabaseIfModelChanges<SchedulerContext>
    {
        protected override void Seed(SchedulerContext context)
        {
            List<SchedulerEvent> events = new List<SchedulerEvent>()
            {
                new SchedulerEvent()
                {
                    Id = 1,
                    Text = "Event 1",
                    StartDate = new DateTime(2022, 1, 11, 2, 0, 0),
                    EndDate = new DateTime(2022, 1, 11, 4, 0, 0)
                },
                new SchedulerEvent()
                {
                    Id = 2,
                    Text = "Event 2",
                    StartDate = new DateTime(2022, 1, 14, 3, 0, 0),
                    EndDate = new DateTime(2022, 1, 14, 6, 0, 0)
                },
                new SchedulerEvent()
                {
                    Id = 3,
                    Text = "Multiday event",
                    StartDate = new DateTime(2022, 1, 11, 0, 0, 0),
                    EndDate = new DateTime(2022, 1, 16, 0, 0, 0)
                }
            };

            events.ForEach(s => context.SchedulerEvents.Add(s));
            context.SaveChanges();

        }

    }
}
~~~
  
Öffnen Sie *Global.asax*. Diese Datei enthält Code, der beim Start der Anwendung ausgeführt wird. Fügen Sie den benötigten Namespace hinzu und setzen Sie den Initializer für den Kontext innerhalb von *Application_Start()*:

~~~js title="Global.asax.cs"
using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Http;

using System.Data.Entity;
using DHX.Scheduler.Web.App_Start;

namespace DHX.Scheduler.Web
{
    public class Global : HttpApplication
    {
        void Application_Start(object sender, EventArgs e)
        {
            // Code, der beim Start der Anwendung ausgeführt wird
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            Database.SetInitializer(new SchedulerInitializer()); /*!*/
        }
    }
}
~~~

### DTOs und Mapping definieren

Als nächstes definieren wir die DTO-Klassen, die von der Web API verwendet werden. Um das Mapping zwischen Model und DTO zu handhaben, implementieren wir explizite Konvertierungsoperatoren in unseren Klassen.

So ist die WebAPIEvent-Klasse aufgebaut:

~~~js title="Models/WebAPIEvent.cs"
using System;

namespace DHX.Scheduler.Web.Models
{
    public class WebAPIEvent
    {
        public int id { get; set; }
        public string text { get; set; }
        public string start_date { get; set; }
        public string end_date { get; set; }

        public static explicit operator WebAPIEvent(SchedulerEvent schedulerEvent)
        {
            return new WebAPIEvent
            {
                id = schedulerEvent.Id,
                text = schedulerEvent.Text,
                start_date = schedulerEvent.StartDate.ToString("yyyy-MM-dd HH:mm"),
                end_date = schedulerEvent.EndDate.ToString("yyyy-MM-dd HH:mm")
            };
        }

        public static explicit operator SchedulerEvent(WebAPIEvent schedulerEvent)
        {
            return new SchedulerEvent
            {
                Id = schedulerEvent.id,
                Text = schedulerEvent.text,
                StartDate = DateTime.Parse(
                    schedulerEvent.start_date, 
                    System.Globalization.CultureInfo.InvariantCulture),
                EndDate = DateTime.Parse(
                    schedulerEvent.end_date,
                    System.Globalization.CultureInfo.InvariantCulture)
            };
        }

    }
}
~~~

## Schritt 4. Web API implementieren

### Scheduler Controller

Um einen neuen Controller hinzuzufügen:

- Klicken Sie mit der rechten Maustaste auf den Controllers-Ordner und wählen Sie Hinzufügen -> Controller.
- Wählen Sie Web API 2 Controller -> Leer und geben Sie "SchedulerController" als Namen des Controllers ein.

Nun richten wir die grundlegenden CRUD-Aktionen zur Verwaltung von Scheduler-Ereignissen ein:

~~~js title="Controllers/SchedulerController.cs"
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;

using DHX.Scheduler.Web.App_Start;
using DHX.Scheduler.Web.Models;

namespace DHX.Scheduler.Web.Controllers
{
    public class SchedulerController : ApiController
    {
        private SchedulerContext db = new SchedulerContext();

        // GET: api/scheduler
        public IEnumerable<WebAPIEvent> Get()
        {
            return db.SchedulerEvents
                .ToList()
                .Select(e => (WebAPIEvent)e);
        }

        // GET: api/scheduler/5
        public WebAPIEvent Get(int id)
        {
            return (WebAPIEvent)db.SchedulerEvents.Find(id);
        }

        // PUT: api/scheduler/5
        [HttpPut]
        public IHttpActionResult EditSchedulerEvent(int id, WebAPIEvent webAPIEvent)
        {
            var updatedSchedulerEvent = (SchedulerEvent)webAPIEvent;
            updatedSchedulerEvent.Id = id;
            db.Entry(updatedSchedulerEvent).State = EntityState.Modified;
            db.SaveChanges();

            return Ok(new
            {
                action = "updated"
            });
        }

        // POST: api/scheduler/5
        [HttpPost]
        public IHttpActionResult CreateSchedulerEvent(WebAPIEvent webAPIEvent)
        {
            var newSchedulerEvent = (SchedulerEvent)webAPIEvent;
            db.SchedulerEvents.Add(newSchedulerEvent);
            db.SaveChanges();

            return Ok(new
            {
                tid = newSchedulerEvent.Id,
                action = "inserted"
            });
        }

        // DELETE: api/scheduler/5
        [HttpDelete]
        public IHttpActionResult DeleteSchedulerEvent(int id)
        {
            var schedulerEvent = db.SchedulerEvents.Find(id);
            if (schedulerEvent != null)
            {
                db.SchedulerEvents.Remove(schedulerEvent);
                db.SaveChanges();
            }

            return Ok(new
            {
                action = "deleted"
            });
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
~~~

In diesem Code:

- Scheduler-Ereignisse werden aus der Datenbank geladen und deren DTOs in den GET-Aktionen zurückgegeben.
- Für PUT- und POST-Aktionen werden DTOs als Eingabe empfangen, zurück in SchedulerEvent-Modelle konvertiert und die Änderungen im Datenbankkontext gespeichert.

Mit dieser Konfiguration ist die Anwendung einsatzbereit und stellt einen voll funktionsfähigen Scheduler zur Verfügung.

![Ready Scheduler](/img/how_to_start_net_ready_scheduler.png)

[Ein fertiges Demo finden Sie auf github](https://github.com/DHTMLX/scheduler-howto-dotnet).

:::note
Falls der Scheduler keine Ereignisse auf der Seite anzeigt, lesen Sie den Artikel [Fehlerbehebung bei Backend-Integrationsproblemen](/guides/troubleshooting.md).
:::

## Dynamisches Laden

Derzeit lädt der Scheduler bei jedem Aufruf der GET-Aktion die gesamte Ereignistabelle. Das ist anfangs unproblematisch, aber mit wachsendem Datenbestand wird die übertragene Datenmenge sehr groß. Durch die Implementierung des dynamischen Ladens kann der Scheduler nur die Ereignisse für einen bestimmten Zeitraum laden.

Auf der Client-Seite wird dies mit der Methode [scheduler.setLoadMode](api/method/setloadmode.md) aktiviert:

~~~js title="Views/Home/Index.cshtml"
scheduler.setLoadMode("day");
// Daten vom Backend laden
scheduler.load("/api/scheduler");
~~~

Damit fügt der Scheduler *from*- und *to*-Datumsparameter in seine GET-Anfragen ein, sodass das Backend nur die Ereignisse innerhalb dieses Bereichs zurückgeben kann.

Um dies serverseitig zu unterstützen, kann die GET-Aktion diese Parameter übernehmen und die Ereignisse entsprechend filtern:

~~~js title="Controllers/SchedulerController.cs"
// GET: api/scheduler
public IEnumerable<WebAPIEvent> Get(DateTime from, DateTime to)
{
    return db.SchedulerEvents
       .Where(e => e.StartDate < to && e.EndDate >= from)
       .ToList()
       .Select(e => (WebAPIEvent)e);
}
~~~

:::note
Falls der Scheduler keine Ereignisse auf der Seite anzeigt, lesen Sie den Artikel [Fehlerbehebung bei Backend-Integrationsproblemen](/guides/troubleshooting.md).
:::

## Wiederkehrende Ereignisse

Um wiederkehrende Ereignisse (wie tägliche Wiederholungen) zu unterstützen, muss die entsprechende Erweiterung auf der Scheduler-Seite aktiviert werden:

~~~js
scheduler.plugins({
    recurring: true
});
~~~

### Aktualisierung der Modelle

Auch das Modell muss aktualisiert werden, um Wiederholungsinformationen zu speichern:

~~~js title="Models/SchedulerEvent.cs"
using System;

namespace DHX.Scheduler.Web.Models
{
    public class SchedulerEvent
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public int EventPID { get; set; }
        public string RecType { get; set; }
        public long EventLength { get; set; }

    }
}
~~~

Und auch das DTO muss entsprechend angepasst werden:

~~~js title="Models/WebAPIEvent.cs"
using System;

namespace DHX.Scheduler.Web.Models
{
    public class WebAPIEvent
    {
        public int id { get; set; }
        public string text { get; set; }
        public string start_date { get; set; }
        public string end_date { get; set; }

        public int? event_pid { get; set; }
        public string rec_type { get; set; }
        public long? event_length { get; set; }

        public static explicit operator WebAPIEvent(SchedulerEvent schedulerEvent)
        {
            return new WebAPIEvent
            {
                id = schedulerEvent.Id,
                text = schedulerEvent.Text,
                start_date = schedulerEvent.StartDate.ToString("yyyy-MM-dd HH:mm"),
                end_date = schedulerEvent.EndDate.ToString("yyyy-MM-dd HH:mm"),

                event_pid = schedulerEvent.EventPID,
                rec_type = schedulerEvent.RecType,
                event_length = schedulerEvent.EventLength
            };
        }

        public static explicit operator SchedulerEvent(WebAPIEvent schedulerEvent)
        {
            return new SchedulerEvent
            {
                Id = schedulerEvent.id,
                Text = schedulerEvent.text,
                StartDate = DateTime.Parse(
                    schedulerEvent.start_date, 
                    System.Globalization.CultureInfo.InvariantCulture),
                EndDate = DateTime.Parse(
                    schedulerEvent.end_date, 
                    System.Globalization.CultureInfo.InvariantCulture),
                EventPID = schedulerEvent.event_pid != null ? 
                    schedulerEvent.event_pid.Value : 0,
                EventLength = schedulerEvent.event_length != null ? 
                    schedulerEvent.event_length.Value : 0,
                RecType = schedulerEvent.rec_type
            };
        }

    }
}
~~~

### Aktualisierung des API Controllers

Abschließend müssen die PUT/POST/DELETE-Aktionen angepasst werden, um [Sonderregeln für wiederkehrende Ereignisse](/guides/recurring-events.md#editingdeleting-a-certain-occurrence-in-the-series) korrekt zu unterstützen.

Beginnen wir mit der POST-Aktion, die einen besonderen Fall für wiederkehrende Ereignisse behandelt: Wenn ein einzelnes Vorkommen aus einer Serie gelöscht wird, muss ein neuer Datensatz in der Datenbank erstellt werden und der Client löst die Insert-Aktion aus:

~~~js title="Controllers/SchedulerController.cs"
// POST: api/scheduler/5
[HttpPost]
public IHttpActionResult CreateSchedulerEvent(WebAPIEvent webAPIEvent)
{
  var newSchedulerEvent = (SchedulerEvent)webAPIEvent;
  db.SchedulerEvents.Add(newSchedulerEvent);
  db.SaveChanges();

  // Einzelnes Vorkommen aus einer wiederkehrenden Serie löschen
  var resultAction = "inserted";
  if(newSchedulerEvent.RecType == "none")
  {
     resultAction = "deleted";
  }

  return Ok(new
  {
      tid = newSchedulerEvent.Id,
    action = resultAction
  });
}
~~~

In der PUT-Aktion ist es wichtig, alle Modelleigenschaften zu aktualisieren. Außerdem müssen beim Ändern einer wiederkehrenden Serie alle geänderten Vorkommen dieser Serie gelöscht werden:

~~~js title="Controllers/SchedulerController.cs"
// PUT: api/scheduler/5
[HttpPut]
public IHttpActionResult EditSchedulerEvent(int id, WebAPIEvent webAPIEvent)
{
    var updatedSchedulerEvent = (SchedulerEvent)webAPIEvent;
    updatedSchedulerEvent.Id = id;
    db.Entry(updatedSchedulerEvent).State = EntityState.Modified;

    if (!string.IsNullOrEmpty(updatedSchedulerEvent.RecType) && 
        updatedSchedulerEvent.RecType != "none")
    {
      // Alle geänderten Vorkommen müssen gelöscht werden, wenn eine Serie geändert wird
      // https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
      
      db.SchedulerEvents.RemoveRange(
         db.SchedulerEvents.Where(e => e.EventPID == id)
      );
    }

    db.SaveChanges();

    return Ok(new
    {
       action = "updated"
    });
}
~~~

Abschließend muss die DELETE-Aktion zwei besondere Situationen abdecken:

- Wenn das zu löschende Ereignis ein nicht-leeres `event_pid` besitzt, handelt es sich um eine geänderte Instanz einer wiederkehrenden Serie. Anstatt den Datensatz zu entfernen, sollte dessen `rec_type` auf `'none'` gesetzt werden, damit der Scheduler dieses Vorkommen ignoriert.
- Beim Löschen einer ganzen Serie müssen auch alle geänderten Instanzen dieser Serie entfernt werden.

~~~js title="Controllers/SchedulerController.cs"
// DELETE: api/scheduler/5
[HttpDelete]
public IHttpActionResult DeleteSchedulerEvent(int id)
{
    var schedulerEvent = db.SchedulerEvents.Find(id);
    if (schedulerEvent != null)
    {
     // Logik speziell für die Unterstützung wiederkehrender Ereignisse
     // https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
          
     if(schedulerEvent.EventPID != default(int))
     {
       // Löschen eines geänderten Vorkommens aus einer Serie
       // Wenn ein Ereignis mit event_pid gelöscht wird, soll es mit rec_type==none aktualisiert und nicht gelöscht werden.

       schedulerEvent.RecType = "none";
     }
     else
     {
       // Beim Löschen einer Serie alle geänderten Vorkommen dieser Serie löschen
            
       if (!string.IsNullOrEmpty(schedulerEvent.RecType) && 
         schedulerEvent.RecType != "none")
       {
       // Alle geänderten Vorkommen müssen gelöscht werden, wenn eine Serie geändert wird
      // https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
                
         db.SchedulerEvents.RemoveRange(
             db.SchedulerEvents.Where(ev => ev.EventPID == id)
         );
       }

       db.SchedulerEvents.Remove(schedulerEvent);
     }
     db.SaveChanges();
    }

    return Ok(new
    {
      action = "deleted"
    });
}
~~~


### Wiederkehrende Serien parsen

Ein wiederkehrendes Ereignis wird in der Datenbank als einzelner Datensatz gespeichert, den der Scheduler auf der Client-Seite in einzelne Vorkommen aufteilt. Wenn Sie die Termine einzelner Ereignisse auf der Server-Seite extrahieren müssen, steht eine Hilfsbibliothek zum Parsen von dhtmlxScheduler-Wiederholungsevents in ASP.NET zur Verfügung.


Die [einsatzbereite Bibliothek finden Sie auf GitHub](https://github.com/DHTMLX/scheduler-recurring-events-dotnet).

## Fehlerbehandlung

[Exception filters](https://learn.microsoft.com/en-us/previous-versions/aspnet/gg416513(v="vs.98))" bieten eine Möglichkeit, Ausnahmen in CRUD-Handlern abzufangen und Antworten zurückzugeben, die der clientseitige Scheduler versteht, wie in [Fehlerbehandlung](/guides/server-integration.md#errorhandling) beschrieben.

Um die Fehlerbehandlung für den Scheduler einzurichten, gehen Sie wie folgt vor:

Erstellen Sie eine neue Klasse mit dem Namen *SchedulerAPIExceptionFilterAttribute* im Verzeichnis *App_Start*:

~~~js title="App_Start/SchedulerAPIExceptionFilterAttribute.cs"
using System.Net;
using System.Net.Http;
using System.Web.Http.Filters;

namespace DHX.Scheduler.Web.App_Start
{
 public class SchedulerAPIExceptionFilterAttribute : ExceptionFilterAttribute
  {
   public override void OnException(HttpActionExecutedContext context)
    {
      context.Response = context.Request.CreateResponse(
          HttpStatusCode.InternalServerError, new
        {
          action = "error",
          message = context.Exception.Message
        });
    }
  }
}
~~~

Fügen Sie dieses Attribut anschließend Ihrem WebAPI-Controller (SchedulerController) wie folgt hinzu:

~~~js title="Controllers/SchedulerController.cs"
namespace DHX.Scheduler.Web.Controllers
{
    [SchedulerAPIExceptionFilter]
    public class SchedulerController : ApiController
    {
~~~

Mit dieser Konfiguration erhält der Client bei einer Ausnahme während der Verarbeitung einer Anfrage im Web API Controller einen Fehlerstatus und eine Fehlermeldung, die entsprechend verarbeitet oder angezeigt werden kann.

Beachten Sie, dass es in Produktionsumgebungen nicht ratsam ist, Ausnahme-Meldungen direkt an den Client auszugeben.

## Anwendungssicherheit

Der Scheduler selbst enthält keinen Schutz vor gängigen Bedrohungen wie SQL-Injection, XSS oder CSRF-Angriffen. Die Absicherung der Anwendung liegt in der Verantwortung der Backend-Entwickler. Weitere Informationen finden Sie im [zugehörigen Artikel](/guides/app-security.md).


### XSS-Schutz

Eine einfache Methode ist das Codieren von Textfeldern beim Senden von Daten an den Client.

Falls Sie das Encoder-Paket noch nicht installiert haben, können Sie es über die Package Manager Console hinzufügen:

~~~
PM> Install-Package System.Text.Encodings.Web -Version 6.0.0
~~~

Zum Beispiel verwendet der folgende Code den integrierten HtmlEncoder, um HTML-Zeichen im Event-Text zu maskieren. Dadurch bleiben die Daten in der Datenbank unverändert, während der Client sichere `event.text`-Werte erhält.

~~~js title="Model.WebAPIEvent.cs"
using System.Text.Encodings.Web;

public static explicit operator WebAPIEvent(SchedulerEvent schedulerEvent)
{
  return new WebAPIEvent
    {
      id = schedulerEvent.Id,
      text = HtmlEncoder.Default.Encode(schedulerEvent.Text),
      start_date = schedulerEvent.StartDate.ToString("yyyy-MM-dd HH:mm"),
      end_date = schedulerEvent.EndDate.ToString("yyyy-MM-dd HH:mm")
    };
}
~~~

Alternativ können Sie spezialisierte Bibliotheken wie [HtmlAgilityPack](https://html-agility-pack.net/) verwenden, um bei der Speicherung oder beim Laden von Daten jeglichen HTML-Inhalt vollständig zu entfernen.

## Fehlerbehebung {#troubleshooting}

### ASP.NET Web Application-Vorlage fehlt

Falls die Projektvorlage "ASP.NET Web Application" in Visual Studio 2022 nicht verfügbar ist, gehen Sie wie folgt vor:

1. Schließen Sie Visual Studio 2022

2. Öffnen Sie das Startmenü und starten Sie den Visual Studio Installer

3. Suchen Sie *Visual Studio Community 2022* und klicken Sie auf *Ändern*

![vsinstaller](/img/vsinstaller.png)

4. Wählen Sie im geöffneten Fenster den Reiter *Individuelle Komponenten*, aktivieren Sie *".NET Framework Project and item templates"* in der Liste und klicken Sie auf *Ändern*

![components](/img/components.png)

Nach diesen Schritten sollte die Vorlage nach einem Neustart von Visual Studio 2022 zur Verfügung stehen.

### Probleme beim Rendern von Aufgaben und Verknüpfungen

Wenn der Scheduler nach den Integrationsschritten mit ASP.NET MVC keine Ereignisse auf der Seite anzeigt, lesen Sie bitte den Artikel [Fehlerbehebung bei Backend-Integrationsproblemen](/guides/troubleshooting.md). Dort finden Sie Hinweise zur Diagnose der Ursachen solcher Probleme.

## Wie geht es weiter

An diesem Punkt ist der Scheduler vollständig einsatzbereit. Sie können den vollständigen Quellcode auf [GitHub](https://github.com/DHTMLX/scheduler-howto-dotnet) einsehen, klonen oder für eigene Projekte herunterladen.

Darüber hinaus finden Sie [Anleitungen zu verschiedenen Scheduler-Funktionen](/guides/) sowie [Tutorials zur Integration des Schedulers mit anderen Backend-Frameworks](/integrations/howtostart-guides.md).
