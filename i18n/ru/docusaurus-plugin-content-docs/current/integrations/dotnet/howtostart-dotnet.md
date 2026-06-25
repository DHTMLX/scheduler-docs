---
title: "dhtmlxScheduler с ASP.NET MVC"
sidebar_label: "dhtmlxScheduler с ASP.NET MVC"
---

# dhtmlxScheduler с ASP.NET MVC

Это руководство описывает процесс создания планировщика с помощью [ASP.NET](https://dotnet.microsoft.com/apps/aspnet) и REST API на серверной стороне.

Если вас интересуют другие серверные интеграции с Scheduler, ознакомьтесь с этими руководствами:

- [dhtmlxScheduler с ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxScheduler с Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxScheduler с PHP](integrations/php/howtostart-plain-php.md)
- [dhtmlxScheduler с PHP: Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxScheduler с PHP:Laravel](integrations/php/howtostart-php-laravel.md)
- [dhtmlxScheduler с SalesForce LWC](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxScheduler с Ruby on Rails](integrations/other/howtostart-ruby.md)
- [dhtmlxScheduler с dhtmlxConnector](integrations/other/howtostart-connector.md)

В этом примере мы используем ASP.NET MVC 5 вместе с контроллером Web API для реализации REST API и создания приложения с планировщиком. Для работы с базой данных будет использоваться [Entity Framework](https://learn.microsoft.com/en-us/aspnet/entity-framework). Разработка ведётся в среде Visual Studio.

:::note
Полный исходный код доступен [на GitHub](https://github.com/DHTMLX/scheduler-howto-dotnet).
:::

## Шаг 1. Создание проекта

Запустите Visual Studio 2022 и выберите *Create a new project*.

![New project](/img/how_to_start_net_create_project.png)

Затем выберите "ASP.NET Web Application" и задайте имя *DHX.Scheduler.Web*. Если шаблон отсутствует, обратитесь к разделу [Troubleshooting](#troubleshooting).

![New project](/img/how_to_start_net_project_template.png)

![Project config](/img/how_to_start_net_project_config.png)

Выберите шаблон "Empty project" и отметьте опции MVC и Web API справа:

![Empty project](/img/how_to_start_net_empty_project.png)

## Шаг 2. Добавление планировщика на страницу

### Создание контроллера

После создания пустого проекта следующим шагом будет добавление MVC-контроллера, который отобразит страницу с планировщиком.

Кликните правой кнопкой мыши по папке Controllers, выберите Add -> Controller. В открывшемся окне выберите MVC 5 Controller -> Empty и нажмите Add. Назовите контроллер "HomeController".

![Home controller](/img/how_to_start_net_controller.png)

В HomeController уже присутствует метод *Index()* класса *ActionResult*, поэтому дополнительная логика не требуется. Нужно лишь добавить представление для этого метода.

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

### Создание представления

Далее создайте страницу index. Перейдите в Views/Home и добавьте пустое представление с именем Index:

![Index view](/img/how_to_start_net_index_view.png)

Откройте новое представление и вставьте следующий код:

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
            scheduler.init("scheduler_here", new Date(2027,0,15));

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

Что здесь происходит:

- создаётся базовый макет страницы для приложения с планировщиком
- подключаются JS и CSS dhtmlx scheduler через [CDN-ссылки](guides/installation.md#cdn)
- создаётся сам планировщик на странице

Также планировщик настраивается для работы с RESTful API по адресу ["/api/scheduler/"](guides/server-integration.md#technique) для загрузки данных и как основной маршрут:

~~~js title="Views/Home/Index.cshtml"
scheduler.load("/api/scheduler");
// initializing dataProcessor
var dp = scheduler.createDataProcessor("/api/scheduler");
// and attaching it to scheduler
dp.init(scheduler);
// setting the REST mode for dataProcessor
dp.setTransactionMode("REST");
~~~

Реализация серверной части будет рассмотрена далее. Пока что вы можете запустить приложение и увидеть отображение планировщика.

![Scheduler initialization](/img/how_to_start_net_scheduler_init.png)

## Шаг 3. Создание моделей и базы данных

### Создание моделей

Далее определим классы моделей для планировщика. Вам понадобится класс, описывающий события планировщика. Обратите внимание, что dhtmlxScheduler использует определённые имена свойств в своей модели данных, отличающиеся от стандартного C#-стиля. Некоторые клиентские свойства могут не храниться в базе, но использоваться в логике клиента или сервера.

Чтобы это учесть, мы применим паттерн [Data Transfer Object](https://learn.microsoft.com/en-us/aspnet/web-api/overview/data/using-web-api-with-entity-framework/part-5): определим отдельные классы доменной модели для EF и внутреннего использования, а также отдельные DTO-классы для обмена с Web API. Позднее будет настроено сопоставление между этими моделями.

#### Модель события планировщика

Начнем с создания класса для события. Пример базовой реализации:

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

Имейте в виду, что события планировщика могут содержать и другие свойства, расширяющие функциональность календаря. В этом примере приведён минимальный набор.

### Настройка подключения к базе данных

#### Установка Entity Framework

Добавить фреймворк можно через NuGet package manager:

![Entity Framework via NuGet](/img/how_to_start_net_entity_nuget.png)

Или выполните команду в Package Manager Console:

~~~
PM> Install-Package EntityFramework
~~~

#### Создание контекста базы данных

Создайте класс Context. Он представляет сессию с базой данных и отвечает за получение и сохранение данных.

Кликните правой кнопкой мыши по папке *Models*, выберите Add -> Class, задайте имя "SchedulerContext" и добавьте следующий код:

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

#### Добавление начальных записей в базу данных

Теперь добавим несколько тестовых записей.

Entity Framework может автоматически создать базу данных при запуске приложения. Мы хотим, чтобы база удалялась и пересоздавалась при каждом изменении модели.

Для этого создайте инициализатор базы данных - новый класс в *App_Start*, наследующий *DropCreateDatabaseIfModelChanges*. Назовём его "SchedulerInitializer".

В этом классе переопределите метод *Seed()* для наполнения базы тестовыми данными.

Полный класс *SchedulerInitializer*:

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
                    StartDate = new DateTime(2027, 1, 11, 2, 0, 0),
                    EndDate = new DateTime(2027, 1, 11, 4, 0, 0)
                },
                new SchedulerEvent()
                {
                    Id = 2,
                    Text = "Event 2",
                    StartDate = new DateTime(2027, 1, 14, 3, 0, 0),
                    EndDate = new DateTime(2027, 1, 14, 6, 0, 0)
                },
                new SchedulerEvent()
                {
                    Id = 3,
                    Text = "Multiday event",
                    StartDate = new DateTime(2027, 1, 11, 0, 0, 0),
                    EndDate = new DateTime(2027, 1, 16, 0, 0, 0)
                }
            };

            events.ForEach(s => context.SchedulerEvents.Add(s));
            context.SaveChanges();

        }

    }
}
~~~
  
Откройте *Global.asax*. В этом файле размещается код, выполняющийся при старте приложения. Добавьте необходимое пространство имён и установите инициализатор контекста внутри *Application_Start()*:

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
            // Code that runs on application startup
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            Database.SetInitializer(new SchedulerInitializer()); /*!*/
        }
    }
}
~~~

### Описание DTO и сопоставление

Теперь определим DTO-классы, которые будет использовать Web API. Для сопоставления между Model и DTO реализуем явные операторы преобразования.

Вот структура класса WebAPIEvent:

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

## Шаг 4. Реализация Web API

### Контроллер Scheduler

Чтобы добавить новый контроллер:

- Кликните правой кнопкой мыши на папке Controllers и выберите Add -> Controller.
- Выберите Web API 2 Controller -> Empty, затем введите "SchedulerController" в качестве имени контроллера.

Теперь настроим базовые действия CRUD для управления событиями планировщика:

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

В этом коде:

- События планировщика загружаются из базы данных, а их DTO возвращаются в действиях GET.
- Для действий PUT и POST DTO принимаются на вход, преобразуются обратно в модели SchedulerEvent и изменения сохраняются в контексте базы данных.

С этим набором действий приложение готово к запуску и предоставляет полностью работоспособный планировщик.

![Ready Scheduler](/img/how_to_start_net_ready_scheduler.png)

[Готовый пример доступен на github](https://github.com/DHTMLX/scheduler-howto-dotnet).

:::note
Если Scheduler не отображает события на странице, ознакомьтесь со статьёй [Устранение проблем с интеграцией Backend](guides/troubleshooting.md).
:::

## Динамическая загрузка

В текущей реализации при каждом вызове GET действия планировщика загружается вся таблица событий. Это может быть приемлемо на начальном этапе, но по мере роста объёма данных количество передаваемой информации значительно увеличится. Внедрение динамической загрузки позволит загружать только те события, которые необходимы для определённого диапазона времени.

На клиентской стороне это включается с помощью метода [scheduler.setLoadMode](api/method/setloadmode.md):

~~~js title="Views/Home/Index.cshtml"
scheduler.setLoadMode("day");
// загрузка данных с сервера
scheduler.load("/api/scheduler");
~~~

С этим методом планировщик будет включать параметры *from* и *to* в GET-запросы, чтобы сервер возвращал только события в указанном диапазоне.

Чтобы обработать это на сервере, GET-действие может принимать эти параметры и фильтровать события соответствующим образом:

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
Если Scheduler не отображает события на странице, ознакомьтесь со статьёй [Устранение проблем с интеграцией Backend](guides/troubleshooting.md).
:::

## Повторяющиеся события

Чтобы поддерживать повторяющиеся события (например, ежедневные повторы), необходимо включить соответствующее расширение на странице планировщика:

~~~js
scheduler.plugins({
    recurring: true
});
~~~

### Обновление моделей

Модель также нужно обновить для хранения информации о повторяемости:

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

И DTO должен быть обновлён соответствующим образом:

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

### Обновление API-контроллера

В завершение, действия PUT/POST/DELETE необходимо скорректировать для корректной поддержки [особых правил для повторяющихся событий](guides/recurring-events.md#editingdeletingacertainoccurrenceintheseries).

Начнём с действия POST, которое обрабатывает особый случай для повторяющихся событий: при удалении одного вхождения из серии повторяющихся событий необходимо создать новую запись в базе данных, и клиент инициирует действие вставки:

~~~js title="Controllers/SchedulerController.cs"
// POST: api/scheduler/5
[HttpPost]
public IHttpActionResult CreateSchedulerEvent(WebAPIEvent webAPIEvent)
{
  var newSchedulerEvent = (SchedulerEvent)webAPIEvent;
  db.SchedulerEvents.Add(newSchedulerEvent);
  db.SaveChanges();

  // удаление одного вхождения из серии повторяющихся событий
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

В действии PUT важно обновлять все свойства модели. Кроме того, при изменении серии повторяющихся событий все изменённые вхождения этой серии должны быть удалены:

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
      //при обновлении серии повторяющихся событий все изменённые вхождения должны быть удалены
      //https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
      
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

Наконец, действие DELETE должно учитывать две особые ситуации:

- Если у удаляемого события заполнено поле `event_pid`, это значит, что удаляется изменённое вхождение серии повторяющихся событий. Вместо удаления записи её поле `rec_type` должно быть установлено в `'none'`, чтобы планировщик игнорировал это вхождение.
- При удалении всей серии повторяющихся событий все изменённые вхождения этой серии также должны быть удалены.

~~~js title="Controllers/SchedulerController.cs"
// DELETE: api/scheduler/5
[HttpDelete]
public IHttpActionResult DeleteSchedulerEvent(int id)
{
    var schedulerEvent = db.SchedulerEvents.Find(id);
    if (schedulerEvent != null)
    {
     //логика, специфичная для поддержки повторяющихся событий
     //https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
          
     if(schedulerEvent.EventPID != default(int))
     {
       // удаление изменённого вхождения из серии повторяющихся событий
       // Если событие с event_pid было удалено, его нужно обновить, 
       // установив rec_type==none вместо удаления.

       schedulerEvent.RecType = "none";
     }
     else
     {
       // при удалении серии повторяющихся событий удалить все изменённые вхождения серии
            
       if (!string.IsNullOrEmpty(schedulerEvent.RecType) && 
         schedulerEvent.RecType != "none")
       {
       //при обновлении серии повторяющихся событий все изменённые вхождения должны быть удалены
      //https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
                
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


### Разбор повторяющихся событий

Повторяющееся событие хранится в базе данных как одна запись, которую Scheduler разбивает на отдельные вхождения на стороне клиента. Если вам необходимо получить даты отдельных событий на стороне сервера, доступна вспомогательная библиотека для разбора повторяющихся событий dhtmlxScheduler в ASP.NET. 


Готовую библиотеку можно найти на [GitHub](https://github.com/DHTMLX/scheduler-recurring-events-dotnet).

## Обработка ошибок

[Фильтры исключений](https://learn.microsoft.com/en-us/previous-versions/aspnet/gg416513(v="vs.98))" предоставляют способ перехвата исключений в обработчиках CRUD и возврата ответов, которые клиентская часть Scheduler сможет распознать, как описано в разделе [обработка ошибок](guides/server-integration.md#errorhandling).

Чтобы настроить обработку ошибок для Scheduler, выполните следующие шаги:

Создайте новый класс с именем *SchedulerAPIExceptionFilterAttribute* внутри *App_Start*:

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

Затем добавьте этот атрибут в ваш WebAPI контроллер (SchedulerController) следующим образом:

~~~js title="Controllers/SchedulerController.cs"
namespace DHX.Scheduler.Web.Controllers
{
    [SchedulerAPIExceptionFilter]
    public class SchedulerController : ApiController
    {
~~~

Теперь, если при обработке запроса в Web API контроллере произойдёт исключение, клиент получит статус ошибки и сообщение, которые можно обработать или отобразить по необходимости.

Имейте в виду, что в рабочей среде не рекомендуется напрямую отправлять клиенту сообщения исключений.

## Безопасность приложения

Scheduler сам по себе не включает защиту от распространённых угроз, таких как SQL-инъекции, XSS или CSRF-атаки. Защита приложения лежит на ответственности разработчиков, управляющих серверной частью. Подробнее об этом читайте в [соответствующей статье](guides/app-security.md).


### Защита от XSS

Простой способ - кодировать текстовые поля при отправке данных клиенту.

Если вы ещё не установили пакет encoder, его можно добавить через Package Manager Console:

~~~
PM> Install-Package System.Text.Encodings.Web -Version 6.0.0
~~~

Например, следующий код использует встроенный HtmlEncoder для экранирования HTML-символов в тексте события. Это позволяет оставить данные в базе без изменений, но гарантирует, что клиент получит безопасное значение `event.text`.

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

В качестве альтернативы можно использовать специализированные библиотеки, такие как [HtmlAgilityPack](https://html-agility-pack.net/), чтобы полностью удалять HTML-контент при сохранении или загрузке данных.

## Поиск и устранение неисправностей {#troubleshooting}

### Шаблон ASP.NET Web Application отсутствует

Если шаблон проекта "ASP.NET Web Application" отсутствует в Visual Studio 2022, попробуйте следующее:

1. Закройте Visual Studio 2022

2. Откройте меню Пуск и запустите Visual Studio Installer

3. Найдите *Visual Studio Community 2022* и нажмите *Modify*

![vsinstaller](/img/vsinstaller.png)

4. В открывшемся окне выберите *Individual components*, отметьте пункт *".NET Framework Project and item templates"* в списке и нажмите *Modify*

![components](/img/components.png)

После выполнения этих шагов перезапустите Visual Studio 2022 - шаблон должен появиться.

### Проблемы с отображением задач и связей

Если после интеграции с ASP.NET MVC Scheduler не отображает события на странице, обратитесь к статье [Устранение проблем с интеграцией Backend](guides/troubleshooting.md). В ней содержатся рекомендации по диагностике причин подобных проблем.

## Что дальше

На этом этапе Scheduler полностью работоспособен. Вы можете изучить полный исходный код на [GitHub](https://github.com/DHTMLX/scheduler-howto-dotnet), клонировать его или скачать для своих проектов.

Также ознакомьтесь с [руководствами по различным функциям Scheduler](/guides/) или [уроками по интеграции Scheduler с другими backend-фреймворками](integrations/howtostart-guides.md).
