---
title: "dhtmlxScheduler mit ASP.NET Core"
sidebar_label: "dhtmlxScheduler mit ASP.NET Core"
---

# dhtmlxScheduler mit ASP.NET Core

Diese Anleitung führt Sie durch den Prozess der Erstellung eines Schedulers mit [ASP.NET](https://dotnet.microsoft.com/apps/aspnet) Core auf der Serverseite.

Sie können auch Anleitungen für andere serverseitige Plattformen erkunden:

- [dhtmlxScheduler mit ASP.NET MVC](/integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxScheduler mit Node.js](/integrations/node/howtostart-nodejs.md)
- [dhtmlxScheduler mit PHP](/integrations/php/howtostart-plain-php.md)
- [dhtmlxScheduler mit PHP:Slim](/integrations/php/howtostart-php-slim4.md)
- [dhtmlxScheduler mit PHP:Laravel](/integrations/php/howtostart-php-laravel.md)
- [dhtmlxScheduler mit SalesForce LWC](/integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxScheduler mit Ruby on Rails](/integrations/other/howtostart-ruby.md)
- [dhtmlxScheduler mit dhtmlxConnector](/integrations/other/howtostart-connector.md)

Die Datenbankinteraktion wird mit [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/) umgesetzt. Das Beispiel wurde mit Visual Studio 2022 entwickelt.

:::note
Der vollständige Quellcode ist [auf GitHub verfügbar](https://github.com/DHTMLX/scheduler-howto-dotnet-core).
:::

## Schritt 1. Erstellen eines Projekts

Starten Sie Visual Studio 2022 und erstellen Sie ein neues Projekt, indem Sie "Create a new project" auswählen.

![Scheduler App](/img/howtostart_dotnetcore_newapp.png)

Wählen Sie dann "ASP.NET Core Web App" und setzen Sie den Projektnamen auf *SchedulerApp*.

![Scheduler App](/img/howtostart_dotnetcore_app.png)

![Scheduler App](/img/howtostart_dotnetcore_configapp.png)

![API template](/img/howtostart_dotnetcore_additional.png)

An diesem Punkt ist das Projekt bereit und Sie können mit dem Hinzufügen von Markup und Skripten für den Scheduler fortfahren.

## Schritt 2. Hinzufügen des Schedulers zur Seite

Navigieren Sie zu **wwwroot** und erstellen Sie eine neue Datei mit dem Namen *index.html*.

![Explorer](/img/howtostart_dotnetcore_indexpage.png)

Erstellen Sie in dieser Datei eine einfache Seite zur Anzeige des Schedulers.

Beachten Sie, dass in diesem Beispiel die Scheduler-Dateien von einem [CDN](/guides/installation.md#cdn) geladen werden. Wenn Sie die Professional Edition besitzen, müssen Sie die 
[Scheduler-Dateien manuell zu Ihrem Projekt hinzufügen](/guides/installation.md#addingproeditionintoproject).

~~~js title="index.html"
<!DOCTYPE html>
<html>
<head>
    <title>Getting started with dhtmlxScheduler</title>
    <meta charset="utf-8">
    <script src="https://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.js"></script>
    <link href="https://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.css" 
        rel="stylesheet" type="text/css" charset="utf-8">
    <style>
        html, body {
            margin: 0px;
            padding: 0px;
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
    <script>
        scheduler.init('scheduler_here', new Date(2019, 0, 20), "week");
    </script>
</body>
</html>
~~~

Öffnen Sie nun **Program.cs** und konfigurieren Sie die Anwendung so, dass sie die **index.html**-Seite bereitstellt, indem Sie statische Dateien aus dem *wwwroot*-Ordner aktivieren.
Fügen Sie die Methode `app.UseDefaultFiles()` hinzu.
Weitere Details finden Sie [hier](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/static-files?view=aspnetcore-2.1&tabs=aspnetcore2x).

~~~js title="Program.cs"
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. 
    // You may want to change this for production scenarios, 
    // see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseDefaultFiles(); /*!*/

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
~~~

Die Middleware `app.UseDefaultFiles()` ermöglicht es der Anwendung, Standarddateien bereitzustellen, indem nach diesen Dateien im **wwwroot**-Ordner gesucht wird:

- index.html
- index.htm
- default.html
- default.htm

Sie können eine dieser Dateien verwenden, in diesem Tutorial wird "index.html" verwendet.
Beachten Sie, dass `UseDefaultFiles()` nur die URL auf die Standarddatei umschreibt, daher ist `UseStaticFiles()` ebenfalls notwendig, um die Datei tatsächlich auszuliefern.

Nach diesen Änderungen zeigt die Anwendung beim Ausführen einen leeren Scheduler auf der Seite an.

![Scheduler init](/img/howtostart_dotnetcore_init.png)

Die nächsten Schritte zeigen, wie Sie ein Backend-API erstellen und den Scheduler damit verbinden.

## Schritt 3. Modelle und Datenbank erstellen

Beginnen Sie mit dem Datenmodell. Die Scheduler-Ereignisse benötigen eine Klassenrepräsentation. Da dhtmlxScheduler [nicht standardisierte Eigenschaftsnamen](/guides/data-formats.md#json) im Vergleich zu typischen .NET-Konventionen verwendet, wird das 
[Data Transfer Object (DTO)](https://learn.microsoft.com/en-us/aspnet/web-api/overview/data/using-web-api-with-entity-framework/part-5)-Muster angewendet. Dies beinhaltet die Definition von:

- Domänenmodellklassen für EF Core und die interne Nutzung der App
- DTO-Klassen für die Kommunikation mit der Web-API.

Die Abbildung zwischen diesen Modellen wird ebenfalls implementiert.

### Modelle

Fügen Sie dem Projekt einen neuen Ordner namens **Models** hinzu. Hier werden die Modellklassen und der EF-Kontext abgelegt.

### Event-Modell

Erstellen Sie eine Klasse, die Kalendereinträge repräsentiert. Fügen Sie eine Datei namens **SchedulerEvent.cs** im Ordner Models hinzu.

Hier ein einfaches Beispiel für das Modell:

~~~js title="SchedulerApp/Models/SchedulerEvent.cs"
namespace SchedulerApp.Models
{
    public class SchedulerEvent
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
~~~

Beachten Sie, dass Scheduler-Ereignisse viele weitere Eigenschaften enthalten können, dieses Beispiel konzentriert sich jedoch auf das Wesentliche.

### Datenbankkontext

Installieren Sie zunächst Entity Framework Core für ASP.NET Core. Dies kann über den NuGet-Paketmanager erfolgen:

![Entity via Nuget](/img/howtostart_dotnetcore_enitityvianuget.png)

Oder durch Ausführen der folgenden Befehle in der Package Manager Console:

~~~
PM> Install-Package Microsoft.EntityFrameworkCore.SqlServer
PM> Install-Package Microsoft.EntityFrameworkCore
PM> Install-Package Microsoft.EntityFrameworkCore.Design
~~~

Entity Framework Core übernimmt die Datenkommunikation zwischen der App und der Datenbank.

### Entity Context erstellen

Definieren Sie als Nächstes eine Datenbanksitzung und ermöglichen Sie das Laden und Speichern von Daten, indem Sie eine Context-Klasse erstellen:

- Fügen Sie eine Datei mit dem Namen **SchedulerContext.cs** im Ordner **Models** hinzu
- Definieren Sie den Datenbankkontext wie folgt:

~~~js title="SchedulerApp/Models/SchedulerContext.cs"
using Microsoft.EntityFrameworkCore;

namespace SchedulerApp.Models
{
    public class SchedulerContext : DbContext
    {
        public SchedulerContext(DbContextOptions<SchedulerContext> options)
           : base(options)
        {
        }
        public DbSet<SchedulerEvent> Events { get; set; } = null!;
    }
}
~~~

### Erste Datensätze zur Datenbank hinzufügen

Jetzt ist es Zeit, einige Anfangsdaten in die Datenbank einzufügen. Erstellen Sie einen Datenbank-Initialisierer, der die Datenbank mit Beispielereignissen füllt.

Fügen Sie im Ordner **Models** eine Klasse mit dem Namen **SchedulerSeeder** hinzu. Sie enthält eine **Seed()**-Methode, die Ereignisse in die Datenbank einfügt.

~~~js title="SchedulerApp/Models/SchedulerSeeder.cs"
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

### Registrierung der Datenbank

Der nächste Schritt besteht darin, die Datenbank in **Program.cs** zu registrieren. Dafür wird zunächst eine Verbindungszeichenfolge benötigt. Diese Zeichenfolge wird 
[in einer JSON-Datei innerhalb der Anwendungseinstellungen](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-2.1&tabs=basicconfiguration#configuration-by-environment) abgelegt. 
Falls das Projekt mit dem `API`-Template erstellt wurde, ist diese Datei bereits im Projektordner vorhanden. Wer das `Empty template` verwendet hat, muss die Datei noch anlegen.

Erstellen Sie die Datei *appsettings.json* (oder öffnen Sie sie, falls sie bereits existiert), und fügen Sie die Verbindungszeichenfolge für die Datenbank hinzu:

~~~js title="appsettings.json"
{
  "ConnectionStrings": {
    "DefaultConnection":"Server="(localdb)mssqllocaldb;"
        Database=SchedulerDatabase;Trusted_Connection=True;"  }
}
~~~

Anschließend registrieren Sie den Datenbankkontext über 
[Dependency Injection](https://learn.microsoft.com/en-us/aspnet/core/data/ef-rp/intro?view=aspnetcore-2.1&tabs=visual-studio).

Fügen Sie diese Namespaces zu **Program.cs** hinzu:

~~~js title="Program.cs"
using Microsoft.EntityFrameworkCore;
using SchedulerApp.Models;
using Microsoft.Extensions.Configuration;
~~~

Die Registrierung sieht dann wie folgt aus:

~~~js title="Program.cs"
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<SchedulerContext>(
    options => options.UseSqlServer(connectionString));
~~~

Um die Controller zu aktivieren, rufen Sie die Methode `services.AddControllers()` auf.

~~~js title="Program.cs"
builder.Services.AddControllers();
~~~

Hier ist der vollständige Inhalt von **Program.cs**:

~~~js title="Program.cs"
using Microsoft.EntityFrameworkCore;
using SchedulerApp.Models;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<SchedulerContext>(
    options => options.UseSqlServer(connectionString));

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. 
    // You may want to change this for production scenarios, 
    // see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseDefaultFiles();

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.MapControllers();

app.Run();

~~~

Abschließend muss die Datenbank beim Starten der App initialisiert und mit Daten befüllt werden. Normalerweise werden dafür Migrationen verwendet, in diesem Beispiel wird jedoch zur Vereinfachung darauf verzichtet.

Erstellen Sie zunächst eine Klasse zur Initialisierung. Fügen Sie die Datei **SchedulerInitializerExtension.cs** im Ordner **Models** hinzu:

~~~js title="Models/SchedulerInitializerExtension.cs"
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;

namespace SchedulerApp.Models
{
 public static class SchedulerInitializerExtension
   {
    public static IHost InitializeDatabase(this IHost webHost)
     {
      var serviceScopeFactory =
      (IServiceScopeFactory?)webHost.Services.GetService(typeof(IServiceScopeFactory));

        using (var scope = serviceScopeFactory!.CreateScope())
        {
           var services = scope.ServiceProvider;
           var dbContext = services.GetRequiredService<SchedulerContext>();
           dbContext.Database.EnsureDeleted();
           dbContext.Database.EnsureCreated();
           SchedulerSeeder.Seed(dbContext);
        }

        return webHost;
     }
   }
}
~~~

Anschließend rufen Sie **InitializeDatabase()** auf:

~~~js title="Program.cs"
app.InitializeDatabase();
~~~

Damit ist dieser Teil abgeschlossen; als Nächstes folgt der Scheduler.

### Definieren von DTOs und Mapping

Nun ist es an der Zeit, die DTO-Klassen für die Web API zu definieren. Beginnen Sie mit der DTO-Klasse für SchedulerEvent. Erstellen Sie im Ordner **Models** eine Datei und definieren Sie die Klasse **WebAPIEvent.cs**:

~~~js title="Models/WebApiEvent.cs"
using System;

namespace SchedulerApp.Models
{
    public class WebAPIEvent
    {
        public int id { get; set; }
        public string? text { get; set; }
        public string? start_date { get; set; }
        public string? end_date { get; set; }

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
                StartDate = ev.start_date != null ? DateTime.Parse(ev.start_date,
                  System.Globalization.CultureInfo.InvariantCulture) : new DateTime(),
                EndDate = ev.end_date != null ? DateTime.Parse(ev.end_date,
                  System.Globalization.CultureInfo.InvariantCulture) : new DateTime()
            };
        }
    }
}
~~~

Nach Abschluss dieses Schrittes sollte die Ordnerstruktur wie folgt aussehen:

![Models](/img/howtostart_dotnetcore_models.png)

An dieser Stelle kann die App gestartet werden, um zu überprüfen, ob alles korrekt eingerichtet ist. Wenn keine Laufzeitfehler auftreten, war die Einrichtung erfolgreich.

## Schritt 4. Implementierung der Web API

Als Nächstes folgt die Implementierung der REST-API.

### Hinzufügen eines API-Controllers

Erstellen Sie einen Ordner **Controllers** und fügen Sie einen leeren API-Controller für Events hinzu:

~~~js title="Controllers/EventsController.cs"
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

        // GET api/events/5.md
        [HttpGet("{id}")]
        public SchedulerEvent? Get(int id)
        {
            return _context
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

        // PUT api/events/5.md
        [HttpPut("{id}")]
        public ObjectResult? Put(int id, [FromForm] WebAPIEvent apiEvent)
        {
            var updatedEvent = (SchedulerEvent)apiEvent;
            var dbEvent = _context.Events.Find(id);
            if (dbEvent == null)
            {
                return null;
            }
            dbEvent.Name = updatedEvent.Name;
            dbEvent.StartDate = updatedEvent.StartDate;
            dbEvent.EndDate = updatedEvent.EndDate;
            _context.SaveChanges();

            return Ok(new
            {
                action = "updated"
            });
        }

        // DELETE api/events/5.md
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

### Konfiguration des Clients

Mit der fertigen Web API können Sie nun zur HTML-Seite zurückkehren und den Scheduler für die Zusammenarbeit mit der API konfigurieren:

~~~js title="wwwroot/index.html"
scheduler.config.date_format = "%Y-%m-%d %H:%i";
scheduler.init("scheduler_here", new Date(2019, 0, 20), "week");

// load data from backend
scheduler.load("/api/events");
// connect backend to scheduler
var dp = scheduler.createDataProcessor("/api/events");
dp.init(scheduler);
// set data exchange mode
dp.setTransactionMode("REST");
~~~

Jetzt ist alles bereit. Beim Ausführen der Anwendung wird ein voll funktionsfähiger Scheduler angezeigt.

![Scheduler CRUD](/img/howtostart_dotnetcore_webapi.png)

## Dynamisches Laden

Derzeit ruft der Scheduler bei jedem Aufruf der `GET`-Aktion die gesamte Events-Tabelle ab. Das ist anfangs in Ordnung, aber mit zunehmender Nutzung und wachsender Datenmenge steigt auch das übertragene Datenvolumen deutlich an.
Mit dynamischem Laden kann der Scheduler nur den jeweils benötigten Bereich von Events abrufen.

Auf der Clientseite wird dies mit der Methode `scheduler.setLoadMode` aktiviert:
~~~js title="wwwroot/index.html"
scheduler.setLoadMode("day");
// load data from backend
scheduler.load("/api/events");
~~~

Danach fügt der Scheduler den `GET`-Anfragen die Parameter `from` und `to` hinzu, sodass das Backend nur Events im angegebenen Zeitraum zurückgeben kann.

Das Backend muss diese Parameter lediglich im `GET`-Handler akzeptieren und die Events entsprechend filtern:

~~~js title="Controllers/EventsController.cs"
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

## Wiederkehrende Events

Um wiederkehrende Events (wie z. B. „Event täglich wiederholen") zu unterstützen, muss die entsprechende Erweiterung auf der Scheduler-Seite aktiviert werden:

~~~js
scheduler.plugins({
    recurring: true
});
~~~

### Aktualisierung des Modells

Das Modell muss aktualisiert werden, um Wiederholungsinformationen korrekt zu verarbeiten:


~~~js title="Models/SchedulerEvent.cs"
using System;

namespace SchedulerApp.Models
{
    public class SchedulerEvent
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public int EventPID { get; set; } /*!*/
        public string? RecType { get; set; } /*!*/
        public long EventLength { get; set; } /*!*/

    }
}
~~~

Ebenso sollte das Data Transfer Object wie folgt aktualisiert werden:

~~~js title="Models/WebAPIEvent.cs"
using System;
using System.Text.Encodings.Web;

namespace SchedulerApp.Models
{
    public class WebAPIEvent
    {
        public int id { get; set; }
        public string? text { get; set; }
        public string? start_date { get; set; }
        public string? end_date { get; set; }

        public int? event_pid { get; set; } /*!*/
        public string? rec_type { get; set; } /*!*/
        public long? event_length { get; set; } /*!*/

        public static explicit operator WebAPIEvent(SchedulerEvent ev)
        {
            return new WebAPIEvent
            {
                id = ev.Id,
                text = HtmlEncoder.Default.Encode(ev.Name != null ? ev.Name : ""), 
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
                StartDate = ev.start_date != null ? DateTime.Parse(ev.start_date,
                  System.Globalization.CultureInfo.InvariantCulture) : new DateTime(),
                EndDate = ev.end_date != null ? DateTime.Parse(ev.end_date,
                  System.Globalization.CultureInfo.InvariantCulture) : new DateTime(),
    ///
                EventPID = ev.event_pid != null ? ev.event_pid.Value : 0, 
                EventLength = ev.event_length != null ? ev.event_length.Value : 0,
                RecType = ev.rec_type
            };
        }
    }
}
~~~


### Aktualisierung des API-Controllers

Die Aktionen PUT, POST und DELETE müssen angepasst werden, damit sie die speziellen Fälle im Zusammenhang mit wiederkehrenden Ereignissen korrekt behandeln, wie im Abschnitt [handling recurring events](/guides/recurring-events.md#editingdeleting-a-certain-occurrence-in-the-series) beschrieben.

Beginnen wir mit der `POST`-Aktion. Sie behandelt einen Sonderfall, bei dem das Löschen eines einzelnen Vorkommens aus einer wiederkehrenden Serie das Hinzufügen eines neuen Datenbankeintrags erfordert. In diesem Fall ruft der Client die `insert`-Aktion auf:

~~~js title="Controllers/EventsController.cs"
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

Für die `PUT`-Aktion ist es wichtig, alle Modelleigenschaften zu aktualisieren. Zusätzlich müssen beim Ändern einer wiederkehrenden Serie alle modifizierten Vorkommen dieser Serie gelöscht werden:

~~~js title="Controllers/EventsController.cs"
// PUT api/events/5.md
[HttpPut("{id}")]
public ObjectResult? Put(int id, [FromForm] WebAPIEvent apiEvent)
{
    var updatedEvent = (SchedulerEvent)apiEvent;
    var dbEvent = _context.Events.Find(id);
    if (dbEvent == null)
    {
        return null;
    }
    dbEvent.Name = updatedEvent.Name;
    dbEvent.StartDate = updatedEvent.StartDate;
    dbEvent.EndDate = updatedEvent.EndDate;
    dbEvent.EventPID = updatedEvent.EventPID;
    dbEvent.RecType = updatedEvent.RecType;
    dbEvent.EventLength = updatedEvent.EventLength;

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

Abschließend muss die `DELETE`-Aktion zwei Szenarien behandeln:

- Wenn das zu löschende Ereignis einen nicht-leeren `event_pid`-Wert hat, bedeutet dies, dass eine modifizierte Instanz einer wiederkehrenden Serie gelöscht wird. Statt den Eintrag zu entfernen, sollte er mit `rec_type='none'` aktualisiert werden, sodass der Scheduler dieses Vorkommen überspringt.
- Beim Löschen einer ganzen wiederkehrenden Serie sollten alle modifizierten Instanzen dieser Serie ebenfalls entfernt werden.

~~~js title="Controllers/EventsController.cs"
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


### Parsen von Wiederholungsserien

Ein wiederkehrendes Ereignis wird in der Datenbank als einzelner Eintrag gespeichert, den der Scheduler auf der Client-Seite in einzelne Vorkommen aufteilt. Um die Daten der einzelnen Ereignisse serverseitig abzurufen, steht eine Hilfsbibliothek zum Parsen von Wiederholungsereignissen in dhtmlxScheduler mit ASP.NET Core zur Verfügung.

Diese Bibliothek ist auf [GitHub](https://github.com/DHTMLX/scheduler-recurring-events-dotnet) verfügbar.

## Fehlerbehandlung

Um Fehler effektiv zu behandeln, sollte eine Middleware-Klasse erstellt werden. Diese Middleware fängt Laufzeitausnahmen ab und formatiert die Antworten entsprechend. Nach dem Erstellen der Middleware muss sie in die Request-Pipeline der App eingefügt werden. Die Schritte sind wie folgt:

1. Erstellen Sie eine Middleware-Klasse anhand einer Vorlage im Projektordner.

![Create middleware class](/img/howtostart_dotnetcore_middleware.png)

Es ist notwendig, das JSON-Framework für ASP.NET Core sowie die HTTP-Abstraktionen für die Verarbeitung von HTTP-Anfragen und -Antworten zu installieren. Dies kann über den NuGet-Paketmanager erfolgen:

![Nuget PM](/img/howtostart_dotnetcore_nuget.png)

Oder durch Ausführen der folgenden Befehle in der Paket-Manager-Konsole:

~~~
PM> Install-Package Microsoft.AspNetCore.Http.Abstractions
PM> Install-Package Microsoft.Newtonsoft.Json
~~~

2. Suchen Sie die **Invoke**-Methode in der Middleware-Klasse und beachten Sie den Aufruf von *_next*. Da einige Handler Ausnahmen auslösen könnten, umschließen Sie den *_next*-Aufruf mit einem `try-catch`-Block, um Fehler abzufangen und mit einem dedizierten Handler zu verarbeiten.

~~~js title="SchedulerErrorMiddleware.cs"
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

Fügen Sie folgenden Namespace zu **SchedulerErrorMiddleware.cs** hinzu:

~~~js title="SchedulerErrorMiddleware.cs"
using Newtonsoft.Json;
~~~

3. Nachdem die Middleware bereit ist, öffnen Sie **Program.cs** und registrieren Sie sie, indem Sie diesen Namespace hinzufügen:

~~~js title="Program.cs"
using SchedulerApp;
~~~

Rufen Sie anschließend **app.UseSchedulerErrorMiddleware()** auf, um sie in die Pipeline einzubinden:

~~~js title="Program.cs"
app.UseSchedulerErrorMiddleware();
~~~


## Anwendungssicherheit

Der Scheduler selbst bietet keinen eingebauten Schutz gegen gängige Sicherheitsrisiken wie SQL-Injection, XSS oder CSRF-Angriffe. Die Sicherheit der Anwendung liegt in der Verantwortung der Entwickler, die das Backend implementieren. Weitere Informationen finden Sie im [dedicated article](/guides/app-security.md).

### XSS-Schutz

Eine einfache Möglichkeit, sich vor XSS zu schützen, besteht darin, Text-Eigenschaften vor der Übertragung an den Client zu kodieren. Im folgenden Beispiel wird der integrierte HtmlEncoder verwendet, um HTML-Zeichen im Ereignistext zu maskieren. Diese Methode hält die Datenbankdaten unverändert und liefert dem Client sichere Inhalte:

~~~js title="Models/WebAPIEvent.cs"
using System.Text.Encodings.Web;
 
public static explicit operator WebAPIEvent(SchedulerEvent ev)
{
  return new WebAPIEvent
    {
      id = ev.Id,
      text = HtmlEncoder.Default.Encode(ev.Name != null ? ev.Name : ""), 
      start_date = ev.StartDate.ToString("yyyy-MM-dd HH:mm"),
      end_date = ev.EndDate.ToString("yyyy-MM-dd HH:mm")
    };
}
~~~

Alternativ kann eine spezialisierte Bibliothek wie [HtmlAgilityPack](https://html-agility-pack.net/) verwendet werden, um HTML-Tags beim Speichern oder Laden der Daten vollständig zu entfernen.

## Fehlerbehebung

Wenn alle Schritte zur Integration des Schedulers mit ASP.NET Core durchgeführt wurden, aber die Ereignisse nicht auf der Seite angezeigt werden, lesen Sie den Artikel [Fehlerbehebung bei Backend-Integrationsproblemen](/guides/troubleshooting.md). Dieser bietet Hilfestellung zur Diagnose und Lösung häufiger Probleme.


## Wie geht es weiter?

An diesem Punkt sollte der Scheduler vollständig funktionsfähig sein. Der vollständige Quellcode steht auf [GitHub](https://github.com/DHTMLX/scheduler-howto-dotnet-core) zum Klonen oder Herunterladen für Ihre Projekte bereit.

Weitere Ressourcen sind [Anleitungen zu den vielen Funktionen des Schedulers](/guides/) und Tutorials zur [Integration des Schedulers mit anderen Backend-Frameworks](/integrations/howtostart-guides.md).
