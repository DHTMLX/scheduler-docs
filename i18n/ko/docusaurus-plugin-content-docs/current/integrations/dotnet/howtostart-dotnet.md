---
title: "dhtmlxScheduler와 ASP.NET MVC"
sidebar_label: "dhtmlxScheduler와 ASP.NET MVC"
---

# dhtmlxScheduler와 ASP.NET MVC

이 가이드는 [ASP.NET](https://dotnet.microsoft.com/apps/aspnet)과 서버 측 REST API를 사용하여 Scheduler를 구축하는 과정을 단계별로 안내합니다.

Scheduler의 다른 서버 사이드 설정에 관심이 있다면 아래 튜토리얼도 참고하실 수 있습니다:

- ["dhtmlxScheduler와 ASP.NET Core"](integrations/dotnet/howtostart-dotnet-core.md)
- ["dhtmlxScheduler와 Node.js"](integrations/node/howtostart-nodejs.md)
- ["dhtmlxScheduler와 PHP"](integrations/php/howtostart-plain-php.md)
- ["dhtmlxScheduler와 PHP:Slim"](integrations/php/howtostart-php-slim4.md)
- ["dhtmlxScheduler와 PHP:Laravel 연동하기"](integrations/php/howtostart-php-laravel.md)
- ["dhtmlxScheduler와 SalesForce LWC 통합하기"](integrations/salesforce/howtostart-salesforce.md)
- ["dhtmlxScheduler와 Ruby on Rails 연동하기"](integrations/other/howtostart-ruby.md)
- ["dhtmlxScheduler와 dhtmlxConnector 연동하기"](integrations/other/howtostart-connector.md)

여기서는 ASP.NET MVC 5와 REST API를 위한 Web API 컨트롤러를 함께 사용하여 Scheduler 앱을 구축합니다. 데이터베이스 연동은 [Entity Framework](https://learn.microsoft.com/en-us/aspnet/entity-framework)를 활용하며, 개발 환경은 Visual Studio IDE를 사용합니다.

:::note
전체 소스 코드는 [GitHub](https://github.com/DHTMLX/scheduler-howto-dotnet)에서 확인할 수 있습니다.
:::

## 1단계. 프로젝트 생성

Visual Studio 2022를 실행하고 *새 프로젝트 만들기*를 선택하세요.

![New project](/img/how_to_start_net_create_project.png)

"ASP.NET Web Application"을 선택하고 이름을 *DHX.Scheduler.Web*으로 지정합니다. 템플릿이 보이지 않는 경우 [문제 해결](#문제-해결) 섹션을 참고하세요.

![New project](/img/how_to_start_net_project_template.png)

![Project config](/img/how_to_start_net_project_config.png)

템플릿에서 Empty 프로젝트를 선택한 뒤, 오른쪽에서 MVC와 Web API 옵션을 체크하세요:

![Empty project](/img/how_to_start_net_empty_project.png)


## 2단계. 페이지에 Scheduler 추가

### 컨트롤러 생성

빈 프로젝트가 준비되면, Scheduler 페이지를 표시할 MVC 컨트롤러를 추가해야 합니다.

Controllers 폴더에서 마우스 오른쪽 버튼을 클릭하고 Add -> Controller를 선택합니다. 대화 상자에서 MVC 5 Controller -> Empty를 선택하고 Add를 클릭하세요. 컨트롤러 이름은 "HomeController"로 지정합니다.

![Home controller](/img/how_to_start_net_controller.png)

HomeController에는 기본적으로 *ActionResult* 클래스의 *Index()* 메서드가 포함되어 있으므로 추가적인 로직은 필요하지 않습니다. 이제 뷰만 추가하면 됩니다.

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

### 뷰(View) 생성

이제 index 페이지를 만들어야 합니다. Views/Home으로 이동하여 Index라는 이름의 빈 뷰를 추가하세요:

![Index view](/img/how_to_start_net_index_view.png)

새로 생성된 뷰를 열고 아래 코드를 삽입합니다:

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

이 코드는 다음을 수행합니다:

- Scheduler 앱을 위한 기본 페이지 레이아웃을 설정합니다.
- dhtmlx scheduler의 JS와 CSS를 [CDN 링크](guides/installation.md#cdn)에서 불러옵니다.
- 페이지에 scheduler를 생성합니다.

또한, ["/api/scheduler/"](guides/server-integration.md#technique) 경로의 RESTful API 백엔드와 통신하도록 scheduler를 구성합니다:

~~~js title="Views/Home/Index.cshtml"
scheduler.load("/api/scheduler");
// initializing dataProcessor
var dp = scheduler.createDataProcessor("/api/scheduler");
// and attaching it to scheduler
dp.init(scheduler);
// setting the REST mode for dataProcessor
dp.setTransactionMode("REST");
~~~

서버 측 구현은 이후에 진행합니다. 지금은 앱을 실행하면 Scheduler가 정상적으로 표시되는 것을 확인할 수 있습니다.

![Scheduler initialization](/img/how_to_start_net_scheduler_init.png)


## 3단계. 모델 및 데이터베이스 생성

### 모델 생성

이제 scheduler를 위한 모델 클래스를 정의해야 합니다. Scheduler 이벤트를 나타내는 클래스를 만들어야 하며, dhtmlxScheduler는 데이터 모델에 대해 특정 네이밍 규칙을 사용합니다. 일부 클라이언트 측 속성은 데이터베이스에 저장되지 않고, 클라이언트 또는 백엔드 로직에서만 사용될 수 있습니다.

이를 위해 [Data Transfer Object](https://learn.microsoft.com/en-us/aspnet/web-api/overview/data/using-web-api-with-entity-framework/part-5) 패턴을 따릅니다. 즉, EF 및 내부 사용을 위한 도메인 모델 클래스와, Web API 통신을 위한 별도의 DTO 클래스를 정의합니다. 이후 이 모델들 간의 매핑을 설정합니다.


#### Scheduler 이벤트 모델

먼저 Event 클래스를 생성합니다. 기본 예시는 아래와 같습니다:

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

Scheduler 이벤트에는 캘린더 기능을 확장하는 다양한 속성이 있을 수 있지만, 예제에서는 필수 항목만 포함했습니다.


### 데이터베이스 연결 구성

#### Entity Framework 설치

NuGet 패키지 관리자를 통해 프레임워크를 추가할 수 있습니다:

![Entity Framework via NuGet](/img/how_to_start_net_entity_nuget.png)

또는 패키지 관리자 콘솔에서 아래 명령어를 실행하세요:

~~~
PM> Install-Package EntityFramework
~~~

#### 데이터베이스 컨텍스트 생성

다음으로 Context 클래스를 생성합니다. 이 클래스는 데이터베이스와의 세션을 나타내며, 데이터 조회 및 저장을 관리합니다.

*Models* 폴더에서 마우스 오른쪽 버튼을 클릭하고 Add -> Class를 선택한 뒤, "SchedulerContext"로 이름을 지정하고 아래 내용을 추가합니다:

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

#### 데이터베이스에 초기 레코드 추가

이제 샘플 레코드를 추가해보겠습니다.

Entity Framework는 앱 실행 시 자동으로 데이터베이스를 생성할 수 있습니다. 모델이 변경될 때마다 데이터베이스를 삭제하고 다시 생성하도록 설정합니다.

먼저 *App_Start*에 *DropCreateDatabaseIfModelChanges*를 상속하는 데이터베이스 이니셜라이저 클래스를 추가합니다. 이름은 "SchedulerInitializer"로 합니다.

이 클래스에서 *Seed()* 메서드를 오버라이드하여 테스트 데이터를 컨텍스트에 추가합니다.

*SchedulerInitializer* 클래스 전체 코드는 다음과 같습니다:

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
  
*Global.asax* 파일을 엽니다. 이 파일에는 애플리케이션 시작 시 실행되는 코드가 포함되어 있습니다. 필요한 네임스페이스를 추가하고 *Application_Start()* 내부에서 컨텍스트의 이니셜라이저를 설정하세요:

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

### DTO 및 매핑 정의

다음으로, Web API에서 사용할 DTO 클래스를 정의합니다. Model과 DTO 간의 매핑을 위해 명시적 변환 연산자를 클래스에 구현합니다.

WebAPIEvent 클래스의 구조는 다음과 같습니다:

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

## 4단계. Web API 구현

### 스케줄러 컨트롤러

새 컨트롤러를 추가하려면:

- Controllers 폴더에서 마우스 오른쪽 버튼을 클릭한 후 Add -> Controller를 선택합니다.
- Web API 2 Controller -> Empty를 선택한 뒤, 컨트롤러 이름으로 "SchedulerController"를 입력합니다.

이제, 스케줄러 이벤트를 관리하기 위한 기본 CRUD 액션을 설정해보겠습니다:

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

이 코드에서는:

- 스케줄러 이벤트가 데이터베이스에서 로드되고, GET 액션에서 DTO가 반환됩니다.
- PUT 및 POST 액션에서는 DTO를 입력으로 받아 SchedulerEvent 모델로 변환한 후, 변경 사항을 데이터베이스 컨텍스트에 저장합니다.

이렇게 설정하면 애플리케이션이 실행할 준비가 되어 완전한 기능의 스케줄러를 제공합니다.

![Ready Scheduler](/img/how_to_start_net_ready_scheduler.png)

[github에서 완성된 데모를 확인할 수 있습니다.](https://github.com/DHTMLX/scheduler-howto-dotnet)

:::note
스케줄러가 페이지에 이벤트를 렌더링하지 않는 경우, ["백엔드 통합 문제 해결"](guides/troubleshooting.md) 문서를 확인하세요.
:::

## 동적 로딩

현재는 스케줄러가 GET 액션을 호출할 때마다 전체 이벤트 테이블을 가져옵니다. 초반에는 괜찮을 수 있지만, 시간이 지나면서 데이터가 많아지면 전송되는 데이터 양이 상당히 커질 수 있습니다. 동적 로딩을 구현하면 스케줄러가 특정 기간에 필요한 이벤트만 로드할 수 있습니다.

클라이언트 측에서는 [scheduler.setLoadMode](api/method/setloadmode.md) 메서드를 사용하여 활성화할 수 있습니다:

~~~js title="Views/Home/Index.cshtml"
scheduler.setLoadMode("day");
// 백엔드에서 데이터 로드
scheduler.load("/api/scheduler");
~~~

이렇게 하면, 스케줄러는 GET 요청에 *from*과 *to* 날짜 파라미터를 포함시켜 백엔드가 해당 범위 내의 이벤트만 반환할 수 있습니다.

서버 측에서는, GET 액션이 이 파라미터를 받아 이벤트를 필터링하도록 구현할 수 있습니다:

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
스케줄러가 페이지에 이벤트를 렌더링하지 않는 경우, ["백엔드 통합 문제 해결"](guides/troubleshooting.md) 문서를 확인하세요.
:::

## 반복 이벤트

반복 이벤트(예: 매일 반복)를 지원하려면, 스케줄러 페이지에서 관련 확장 기능을 활성화해야 합니다:

~~~js
scheduler.plugins({
    recurring: true
});
~~~

### 모델 업데이트

모델도 반복 정보를 저장할 수 있도록 업데이트해야 합니다:

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

DTO도 이에 맞게 업데이트해야 합니다:

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

### API 컨트롤러 업데이트

마지막으로, PUT/POST/DELETE 액션을 반복 이벤트에 대한 [특수 규칙](guides/recurring-events.md#editingdeleting-a-certain-occurrence-in-the-series)을 올바르게 지원하도록 조정해야 합니다.

POST 액션부터 살펴보면, 반복 이벤트의 단일 반복을 삭제하는 특별한 경우를 처리합니다. 반복 시리즈에서 단일 반복을 삭제할 때는 새로운 데이터베이스 레코드가 생성되어야 하며, 클라이언트가 insert 액션을 트리거합니다:

~~~js title="Controllers/SchedulerController.cs"
// POST: api/scheduler/5
[HttpPost]
public IHttpActionResult CreateSchedulerEvent(WebAPIEvent webAPIEvent)
{
  var newSchedulerEvent = (SchedulerEvent)webAPIEvent;
  db.SchedulerEvents.Add(newSchedulerEvent);
  db.SaveChanges();

  // 반복 시리즈에서 단일 반복 삭제
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

PUT 액션에서는 모든 모델 속성이 업데이트되어야 하며, 반복 시리즈가 수정될 때 해당 시리즈의 수정된 모든 반복도 삭제되어야 합니다:

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
      // 반복 시리즈를 업데이트할 때 모든 수정된 반복을 삭제해야 합니다.
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

마지막으로, DELETE 액션은 두 가지 특별한 상황을 처리해야 합니다:

- 삭제할 이벤트에 `event_pid`가 비어 있지 않다면, 반복 시리즈의 수정된 인스턴스를 삭제하는 것입니다. 레코드를 삭제하는 대신 `rec_type`을 `'none'`으로 설정하여 스케줄러가 이 반복을 무시하도록 해야 합니다.
- 반복 시리즈 전체를 삭제할 경우, 해당 시리즈의 모든 수정된 인스턴스도 함께 삭제해야 합니다.

~~~js title="Controllers/SchedulerController.cs"
// DELETE: api/scheduler/5
[HttpDelete]
public IHttpActionResult DeleteSchedulerEvent(int id)
{
    var schedulerEvent = db.SchedulerEvents.Find(id);
    if (schedulerEvent != null)
    {
     // 반복 이벤트 지원을 위한 일부 로직
     //https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
          
     if(schedulerEvent.EventPID != default(int))
     {
       // 반복 시리즈에서 수정된 반복을 삭제
       // event_pid 값이 있는 이벤트를 삭제하는 경우, 삭제하는 대신 rec_type==none으로 업데이트해야 합니다.

       schedulerEvent.RecType = "none";
     }
     else
     {
       // 반복 시리즈 전체를 삭제할 경우, 해당 시리즈의 모든 수정된 반복도 함께 삭제
       if (!string.IsNullOrEmpty(schedulerEvent.RecType) && 
         schedulerEvent.RecType != "none")
       {
       // 반복 시리즈를 업데이트할 때 모든 수정된 반복을 삭제해야 합니다.
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


### 반복 시리즈 파싱하기

반복 이벤트는 데이터베이스에서 하나의 레코드로 저장되며, Scheduler가 클라이언트 측에서 개별 발생 건으로 분할하여 처리합니다. 만약 서버 측에서 개별 이벤트의 날짜를 추출해야 한다면, dhtmlxScheduler 반복 이벤트를 ASP.NET에서 파싱할 수 있도록 도와주는 헬퍼 라이브러리가 제공됩니다. 


[GitHub에서 바로 사용할 수 있는 라이브러리](https://github.com/DHTMLX/scheduler-recurring-events-dotnet)를 확인하세요.

## 오류 처리

[예외 필터](https://learn.microsoft.com/en-us/previous-versions/aspnet/gg416513(v="vs.98))를" 사용하면 CRUD 핸들러에서 예외를 포착하고, 클라이언트 측 스케줄러가 이해할 수 있는 응답을 반환할 수 있습니다. 자세한 내용은 [오류 처리](guides/server-integration.md#error-handling) 문서를 참고하세요.

스케줄러에 대한 오류 처리를 설정하려면 아래 단계를 따르세요:

*App_Start* 폴더 내에 *SchedulerAPIExceptionFilterAttribute*라는 새 클래스를 생성합니다:

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

이제 이 속성을 WebAPI 컨트롤러(SchedulerController)에 추가합니다:

~~~js title="Controllers/SchedulerController.cs"
namespace DHX.Scheduler.Web.Controllers
{
    [SchedulerAPIExceptionFilter]
    public class SchedulerController : ApiController
    {
~~~

이 설정을 통해 Web API 컨트롤러에서 요청을 처리하는 중 예외가 발생하면, 클라이언트는 오류 상태와 메시지를 받아 적절히 처리하거나 표시할 수 있습니다.

단, 예외 메시지를 클라이언트에 직접 노출하는 것은 실제 운영 환경에서는 권장되지 않습니다.

## 애플리케이션 보안

Scheduler 자체에는 SQL 인젝션, XSS, CSRF 공격과 같은 일반적인 위협에 대한 보호 기능이 포함되어 있지 않습니다. 백엔드를 관리하는 개발자가 애플리케이션의 보안을 책임져야 합니다. 자세한 내용은 [관련 문서](guides/app-security.md)를 참고하세요.


### XSS 보호

가장 간단한 방법은 데이터를 클라이언트로 전송할 때 텍스트 필드를 인코딩하는 것입니다.

아직 인코더 패키지를 설치하지 않았다면, Package Manager Console을 통해 추가할 수 있습니다:

~~~
PM> Install-Package System.Text.Encodings.Web -Version 6.0.0
~~~

예를 들어, 아래 코드는 내장 HtmlEncoder를 사용하여 이벤트 텍스트 내 HTML 문자를 이스케이프 처리합니다. 데이터베이스에는 원본 데이터가 저장되지만, 클라이언트에는 안전한 `event.text` 값만 전달됩니다.

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

또는 [HtmlAgilityPack](https://html-agility-pack.net/)과 같은 전문 라이브러리를 사용하여 데이터를 저장하거나 불러올 때 HTML 내용을 완전히 제거할 수도 있습니다.

## 문제 해결

### ASP.NET Web Application 템플릿이 없는 경우

Visual Studio 2022에서 "ASP.NET Web Application" 프로젝트 템플릿이 보이지 않는다면 아래 절차를 따라주세요:

1. Visual Studio 2022를 종료합니다.

2. 시작 메뉴에서 Visual Studio Installer를 실행합니다.

3. *Visual Studio Community 2022*를 찾아 *수정(Modify)* 버튼을 클릭합니다.

![vsinstaller](/img/vsinstaller.png)

4. 열린 창에서 *개별 구성 요소(Individual components)*를 선택한 후, 목록에서 *".NET Framework Project and item templates"*를 체크하고 *수정(Modify)*을 클릭합니다.

![components](/img/components.png)

이 과정을 거친 후 Visual Studio 2022를 재시작하면 해당 템플릿을 사용할 수 있습니다.

### 작업 및 링크 렌더링 문제

ASP.NET MVC와의 통합 단계를 마친 후에도 Scheduler가 페이지에 이벤트를 표시하지 않는 경우, ["백엔드 통합 문제 해결"](guides/troubleshooting.md) 문서를 참고하세요. 해당 문서에서 문제의 원인을 진단하는 방법을 안내합니다.

## 다음 단계

이제 Scheduler가 정상적으로 동작합니다. [GitHub](https://github.com/DHTMLX/scheduler-howto-dotnet)에서 전체 소스 코드를 확인하거나, 클론 또는 다운로드하여 직접 프로젝트에 활용할 수 있습니다.

또한 [다양한 Scheduler 기능 가이드](/guides/)나 [다른 백엔드 프레임워크와의 통합 튜토리얼](integrations/howtostart-guides.md)도 참고해보세요.

