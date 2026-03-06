---
title: "dhtmlxScheduler с ASP.NET Core"
sidebar_label: "dhtmlxScheduler с ASP.NET Core"
---

# dhtmlxScheduler с ASP.NET Core

Это руководство описывает процесс создания Scheduler с использованием [ASP.NET](https://dotnet.microsoft.com/apps/aspnet) Core на серверной стороне.

Вы также можете ознакомиться с руководствами для других серверных платформ:

- [dhtmlxScheduler с ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxScheduler с Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxScheduler с PHP](integrations/php/howtostart-plain-php.md)
- [dhtmlxScheduler с PHP: Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxScheduler с PHP:Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxScheduler с SalesForce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxScheduler с Ruby on Rails](integrations/other/howtostart-ruby.md)
- [dhtmlxScheduler с dhtmlxConnector](integrations/other/howtostart-connector.md)

Взаимодействие с базой данных осуществляется с помощью [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/). Пример разработан с использованием Visual Studio 2022.

:::note
Полный исходный код [доступен на GitHub](https://github.com/DHTMLX/scheduler-howto-dotnet-core).
:::

## Шаг 1. Создание проекта

Запустите Visual Studio 2022 и создайте новый проект, выбрав "Create a new project".

![Scheduler App](/img/howtostart_dotnetcore_newapp.png)

Затем выберите "ASP.NET Core Web App" и задайте имя проекта *SchedulerApp*

![Scheduler App](/img/howtostart_dotnetcore_app.png)

![Scheduler App](/img/howtostart_dotnetcore_configapp.png)

![API template](/img/howtostart_dotnetcore_additional.png)

На этом этапе проект готов, и вы можете перейти к добавлению разметки и скриптов для Scheduler.

## Шаг 2. Добавление Scheduler на страницу

Перейдите в папку **wwwroot** и создайте новый файл с именем *index.html*.

![Explorer](/img/howtostart_dotnetcore_indexpage.png)

В этом файле создайте простую страницу для отображения scheduler.

Обратите внимание, что в этом примере файлы scheduler загружаются с [CDN](guides/installation.md#cdn). Если у вас есть Professional-версия, необходимо 
[добавить файлы scheduler в проект вручную](guides/installation.md#addingproeditionintoproject).

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

Далее откройте **Program.cs** и настройте приложение для обслуживания страницы **index.html**, разрешив работу со статическими файлами из папки *wwwroot*.
Добавьте метод `app.UseDefaultFiles()`.
Подробнее об этом можно узнать [здесь](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/static-files?view=aspnetcore-2.1&tabs=aspnetcore2x).

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

Промежуточное ПО `app.UseDefaultFiles()` позволяет приложению обслуживать стандартные файлы, ища их в папке **wwwroot**:

- index.html
- index.htm
- default.html
- default.htm

Вы можете использовать любой из этих файлов, но в этом руководстве используется "index.html".
Обратите внимание, что `UseDefaultFiles()` только переписывает URL на стандартный файл, поэтому также необходимо использовать `UseStaticFiles()` для фактической отдачи файла.

После этих изменений при запуске приложения на странице отобразится пустой scheduler.

![Scheduler init](/img/howtostart_dotnetcore_init.png)

Дальнейшие шаги покажут, как создать backend API и подключить к нему scheduler.

## Шаг 3. Создание моделей и базы данных

Начнем с модели данных. Для событий scheduler требуется класс-представление. Поскольку dhtmlxScheduler использует [нестандартные имена свойств](guides/data-formats.md#json) по сравнению с типичными соглашениями .NET, будет применен 
паттерн [Data Transfer Object (DTO)](https://learn.microsoft.com/en-us/aspnet/web-api/overview/data/using-web-api-with-entity-framework/part-5). Это подразумевает определение:

- доменных моделей для EF Core и внутреннего использования в приложении
- DTO-классов для обмена данными с Web API.

Также будет реализовано сопоставление между этими моделями.

### Модели

Добавьте в проект новую папку **Models**. Здесь будут храниться классы моделей и EF-контекст.

### Модель события

Создайте класс, представляющий события календаря. Добавьте файл **SchedulerEvent.cs** в папку Models.

Пример простой модели:

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

Имейте в виду, что события scheduler могут содержать и другие свойства, но в этом примере рассмотрены только основные.

### Контекст базы данных

Сначала установите Entity Framework Core для ASP.NET Core. Это можно сделать через менеджер пакетов NuGet:

![Entity via Nuget](/img/howtostart_dotnetcore_enitityvianuget.png)

Или выполнив следующие команды в консоли диспетчера пакетов:

~~~
PM> Install-Package Microsoft.EntityFrameworkCore.SqlServer
PM> Install-Package Microsoft.EntityFrameworkCore
PM> Install-Package Microsoft.EntityFrameworkCore.Design
~~~

Entity Framework Core будет отвечать за взаимодействие приложения с базой данных.

### Создание Entity Context

Далее определите сессию базы данных и настройте загрузку и сохранение данных, создав класс Context:

- добавьте файл **SchedulerContext.cs** в папку **Models**
- определите контекст базы данных следующим образом:

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

### Добавление первых записей в базу данных

Теперь пора добавить первые записи в базу данных. Создайте инициализатор базы данных, который заполнит её примерами событий.

В папке **Models** добавьте класс **SchedulerSeeder**. В нем будет метод **Seed()**, который вставляет события в базу данных.

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

### Регистрация базы данных

Следующим шагом является регистрация базы данных в **Program.cs**. Перед этим потребуется строка подключения. Эта строка будет храниться
[в JSON-файле в настройках приложения](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-2.1&tabs=basicconfiguration#configuration-by-environment).
Если проект был создан с помощью шаблона `API`, этот файл уже должен присутствовать в папке проекта. Для тех, кто использовал `Empty template`, файл необходимо создать вручную.

Создайте файл *appsettings.json* (или откройте его, если он уже существует) и добавьте строку подключения к базе данных:

~~~js title="appsettings.json"
{
  "ConnectionStrings": {
    "DefaultConnection":"Server="(localdb)mssqllocaldb;"
        Database=SchedulerDatabase;Trusted_Connection=True;"  }
}
~~~

После этого зарегистрируйте контекст базы данных через
[dependency injection](https://learn.microsoft.com/en-us/aspnet/core/data/ef-rp/intro?view=aspnetcore-2.1&tabs=visual-studio).

Добавьте следующие пространства имён в **Program.cs**:

~~~js title="Program.cs"
using Microsoft.EntityFrameworkCore;
using SchedulerApp.Models;
using Microsoft.Extensions.Configuration;
~~~

Регистрация будет выглядеть так:

~~~js title="Program.cs"
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<SchedulerContext>(
    options => options.UseSqlServer(connectionString));
~~~

Для активации контроллеров вызовите метод `services.AddControllers()`.

~~~js title="Program.cs"
builder.Services.AddControllers();
~~~

Ниже приведено полное содержимое файла **Program.cs**:

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

Наконец, база данных должна быть инициализирована и заполнена начальными данными при запуске приложения. Обычно для этого используются миграции, но здесь они опущены для простоты.

Начните с создания класса для инициализации. Добавьте файл **SchedulerInitializerExtension.cs** в папку **Models**:

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

Затем вызовите **InitializeDatabase()**:

~~~js title="Program.cs"
app.InitializeDatabase();
~~~

На этом этапе эта часть завершена; далее внимание переключается на Scheduler.

### Определение DTO и маппинга

Пора определить классы DTO для Web API. Начните с класса DTO для SchedulerEvent. В папке **Models** создайте файл и определите класс **WebAPIEvent.cs**:

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

После этого структура папки будет выглядеть так:

![Models](/img/howtostart_dotnetcore_models.png)

На этом этапе можно запустить приложение и убедиться, что всё настроено правильно. Если во время выполнения не возникает ошибок, значит настройка прошла успешно.

## Шаг 4. Реализация Web API

Далее реализуется REST API.

### Добавление API-контроллера

Создайте папку **Controllers** и добавьте в неё пустой API-контроллер для событий:

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

### Настройка клиента

Когда Web API готов, вернитесь к HTML-странице и настройте scheduler для работы с ним:

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

Теперь всё готово. После запуска приложения будет отображаться полностью функциональный Scheduler.

![Scheduler CRUD](/img/howtostart_dotnetcore_webapi.png)

## Динамическая подгрузка

В данный момент при каждом вызове действия `GET` scheduler получает всю таблицу событий. На начальном этапе это может быть приемлемо, но по мере использования приложения в течение нескольких месяцев объём передаваемых данных значительно увеличится.
Реализация динамической подгрузки позволяет scheduler получать только нужный диапазон событий.

На стороне клиента это активируется с помощью метода `scheduler.setLoadMode`:
~~~js title="wwwroot/index.html"
scheduler.setLoadMode("day");
// load data from backend
scheduler.load("/api/events");
~~~

После этого scheduler будет добавлять параметры дат `from` и `to` к запросам `GET`, чтобы сервер возвращал только события в этом диапазоне.

На сервере достаточно принять эти параметры в действии `GET` и отфильтровать события соответствующим образом:

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

## Повторяющиеся события

Для поддержки повторяющихся событий (например, "повторять событие ежедневно") необходимо включить соответствующее расширение на странице scheduler:

~~~js
scheduler.plugins({
    recurring: true
});
~~~

### Обновление модели

Модель необходимо обновить для корректной обработки информации о повторяющихся событиях:


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

Аналогично, объект передачи данных должен быть обновлён следующим образом:

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


### Обновление API-контроллера

Методы PUT, POST и DELETE необходимо скорректировать для корректной работы с особыми случаями, связанными с повторяющимися событиями, как описано в разделе [обработка повторяющихся событий](guides/recurring-events.md#editingdeletingacertainoccurrenceintheseries).

Начнём с действия `POST`, которое обрабатывает уникальный случай, когда удаление одного вхождения из серии повторяющихся событий требует добавления новой записи в базу данных. В этом случае клиент вызывает действие `insert`:

~~~js title="Controllers/EventsController.cs"
// POST api/events
[HttpPost]
public ObjectResult Post([FromForm] WebAPIEvent apiEvent)
{
   var newEvent = (SchedulerEvent)apiEvent;

   _context.Events.Add(newEvent);
   _context.SaveChanges();

  // удаление одного вхождения из серии повторяющихся событий
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

В методе `PUT` важно обновлять все свойства модели. Кроме того, при изменении серии повторяющихся событий необходимо удалить все изменённые вхождения этой серии:

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
     // все изменённые вхождения должны быть удалены при обновлении серии повторяющихся событий
     // https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents

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

Наконец, метод `DELETE` должен обрабатывать два сценария:

- Если у удаляемого события непустой `event_pid`, это означает, что удаляется изменённый экземпляр повторяющейся серии. Вместо удаления записи необходимо обновить её, установив `rec_type='none'`, чтобы планировщик пропустил это вхождение.
- Если удаляется вся серия повторяющихся событий, также должны быть удалены все изменённые экземпляры этой серии.

~~~js title="Controllers/EventsController.cs"
[HttpDelete("{id}")]
public ObjectResult DeleteEvent(int id)
{
  var e = _context.Events.Find(id);
  if (e != null)
  {
   // логика, специфичная для поддержки повторяющихся событий
   // https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents

     if (e.EventPID != default(int))
     {
        // удаление изменённого вхождения из серии повторяющихся событий
        // Если событие с event_pid было удалено, его нужно обновить 
        // с rec_type==none вместо удаления.

        e.RecType = "none";
     }
     else
     {
      // если удаляется серия повторяющихся событий, удаляются все изменённые вхождения серии
      if (!string.IsNullOrEmpty(e.RecType) && e.RecType != "none")
       {
    // все изменённые вхождения должны быть удалены при обновлении серии повторяющихся событий
    // https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
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


### Разбор серии повторяющихся событий

Повторяющееся событие хранится в базе данных как одна запись, которую Scheduler разбивает на отдельные вхождения на стороне клиента. Для получения дат отдельных событий на сервере доступна вспомогательная библиотека для разбора повторяющихся событий в dhtmlxScheduler с использованием ASP.NET Core.

Эта библиотека доступна на [GitHub](https://github.com/DHTMLX/scheduler-recurring-events-dotnet).

## Обработка ошибок

Для эффективного управления ошибками следует создать middleware-класс. Этот middleware перехватывает исключения времени выполнения и формирует ответы соответствующим образом. После создания middleware его необходимо добавить в цепочку обработки запросов приложения. Действия следующие:

1. Создайте middleware-класс по шаблону в папке проекта.

![Создание middleware-класса](/img/howtostart_dotnetcore_middleware.png)

Требуется установить фреймворк JSON для ASP.NET Core и HTTP-абстракции для обработки HTTP-запросов и ответов. Это можно сделать с помощью NuGet Package Manager:

![Nuget PM](/img/howtostart_dotnetcore_nuget.png)

Или выполнить следующие команды в консоли диспетчера пакетов:

~~~
PM> Install-Package Microsoft.AspNetCore.Http.Abstractions
PM> Install-Package Microsoft.Newtonsoft.Json
~~~

2. Найдите метод **Invoke** в middleware-классе и обратите внимание на вызов *_next*. Поскольку некоторые обработчики могут выбрасывать исключения, оберните вызов *_next* в блок `try-catch`, чтобы перехватить ошибки и обработать их с помощью специального обработчика.

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

Добавьте следующий namespace в **SchedulerErrorMiddleware.cs**:

~~~js title="SchedulerErrorMiddleware.cs"
using Newtonsoft.Json;
~~~

3. После подготовки middleware откройте **Program.cs** и зарегистрируйте его, добавив этот namespace:

~~~js title="Program.cs"
using SchedulerApp;
~~~

Затем вызовите **app.UseSchedulerErrorMiddleware()** для включения его в цепочку обработки:

~~~js title="Program.cs"
app.UseSchedulerErrorMiddleware();
~~~


## Безопасность приложения

Scheduler сам по себе не предоставляет встроенной защиты от распространённых угроз безопасности, таких как SQL-инъекции, XSS или CSRF-атаки. Обеспечение безопасности приложения лежит на разработчиках, реализующих серверную часть. Подробнее см. в [отдельной статье](guides/app-security.md).

### Защита от XSS

Простой способ защититься от XSS - кодировать текстовые свойства перед отправкой их клиенту. Например, в приведённом ниже примере используется встроенный HtmlEncoder для экранирования HTML-символов в тексте события. Такой подход сохраняет данные в базе без изменений, но отправляет клиенту безопасное содержимое:

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

Альтернативно можно использовать специализированную библиотеку, например [HtmlAgilityPack](https://html-agility-pack.net/), чтобы полностью удалять HTML-теги при сохранении или загрузке данных.

## Решение проблем

Если все шаги по интеграции Scheduler с ASP.NET Core были выполнены, но события не отображаются на странице, обратитесь к статье [Устранение проблем с интеграцией Backend](guides/troubleshooting.md). В ней содержатся рекомендации по диагностике и устранению распространённых проблем.


## Что дальше

На данном этапе Scheduler должен быть полностью работоспособен. Полный исходный код доступен на [GitHub](https://github.com/DHTMLX/scheduler-howto-dotnet-core) для клонирования или скачивания в поддержку ваших проектов.

Дополнительные ресурсы включают [руководства, охватывающие множество возможностей Scheduler](/guides/) и туториалы по [интеграции Scheduler с другими backend-фреймворками](integrations/howtostart-guides.md).
