---
title: "dhtmlxScheduler with Blazor"
sidebar_label: "Blazor"
---

# dhtmlxScheduler with Blazor

This tutorial gives you step-by-step instructions on how to host Scheduler inside a Blazor Web App. Blazor renders the host page, [JavaScript interop](https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/) initializes the Scheduler widget, and an ASP.NET Core Web API controller serves CRUD requests.

The application is built with the .NET 10 SDK and Visual Studio Code with the [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit). Visual Studio 2022 works as well. To keep the example focused on Scheduler integration, the demo stores events in an in-memory list rather than a database; for a persistent storage example see the [ASP.NET Core integration guide](integrations/dotnet/howtostart-dotnet-core.md#step-3-creating-models-and-database).

:::note
The complete source code is [available on GitHub](https://github.com/DHTMLX/scheduler-howto-blazor).
:::

## Step 1. Creating a project

Create a new Blazor Web App from the command line:

~~~bash
dotnet new blazor -o BlazorApp
cd BlazorApp
~~~

Open the resulting folder in VS Code (`code .`) or in Visual Studio 2022. The default template gives you `Components/App.razor`, `Components/Pages/Home.razor`, `Program.cs`, and a `wwwroot/` folder - all the entry points we need.

## Step 2. Adding Scheduler to the page

Scheduler ships as a JavaScript library. Place its files together with our own initialization script under **wwwroot/lib/scheduler/**, so the `wwwroot` folder structure looks like this:

~~~text
wwwroot/
  lib/
    bootstrap/
    scheduler/
      dhtmlxscheduler.js
      dhtmlxscheduler.css
      scheduler.js
~~~

Note, that scheduler files are [added from the project's local copy](guides/installation.md#adding-pro-edition-into-project) in this demo. If you prefer the [CDN](guides/installation.md#cdn) version, replace the `<link>` and `<script>` tags below with CDN URLs.

Create `scheduler.js` with a minimal initialization function:

~~~js title="wwwroot/lib/scheduler/scheduler.js"
function initScheduler() {
    scheduler.init("scheduler_here", new Date(), "week");
}
~~~

Open **Components/App.razor** and reference the Scheduler CSS in `<head>` and the two scripts at the end of `<body>`:

~~~html title="Components/App.razor"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <base href="/" />
    <ResourcePreloader />
    <link rel="stylesheet" href="@Assets["lib/bootstrap/dist/css/bootstrap.min.css"]" />
    <link rel="stylesheet" href="@Assets["app.css"]" />
    <link rel="stylesheet" href="@Assets["BlazorApp.styles.css"]" />
    <link rel="stylesheet" href="@Assets["lib/scheduler/dhtmlxscheduler.css"]" /> /*!*/
    <ImportMap />
    <link rel="icon" type="image/png" href="favicon.png" />
    <HeadOutlet />
</head>
<body>
    <Routes />
    <ReconnectModal />
    <script src="@Assets["_framework/blazor.web.js"]"></script>
    <script src="@Assets["lib/scheduler/dhtmlxscheduler.js"]"></script> /*!*/
    <script src="@Assets["lib/scheduler/scheduler.js"]"></script> /*!*/
</body>
</html>
~~~

Now host Scheduler on the home page. Replace the contents of **Components/Pages/Home.razor** with:

~~~razor title="Components/Pages/Home.razor"
@page "/"
@inject IJSRuntime JSRuntime
@rendermode InteractiveServer

<h3>Scheduler</h3>

<div id="scheduler_here" style="width: 100%; height: 600px; border: 1px solid #ccc;"></div>

@code {
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await JSRuntime.InvokeVoidAsync("initScheduler");
        }
    }
}
~~~

The page renders an empty `<div>` and, after the first render pass, calls into JavaScript via `IJSRuntime` to attach Scheduler to it. Run the application now (`dotnet run`) and you should see an empty Scheduler on the home page.

Next steps will show you how to create a backend API and connect Scheduler to it.

## Step 3. Creating models

Let's begin with a data model. You'll need a class for scheduler events. dhtmlxScheduler uses [non-conventional names for model properties](guides/data-formats.md#json) from the .NET world perspective. This uses the same DTO pattern explained in the [ASP.NET Core tutorial](integrations/dotnet/howtostart-dotnet-core.md#define-dtos-and-mapping); the Blazor-adapted version is below.

Create a **Models** folder in the project root. First, the domain model:

~~~csharp title="Models/SchedulerEvent.cs"
namespace BlazorApp.Models;

public class SchedulerEvent
{
    public int Id { get; set; }
    public string? Text { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}
~~~

Note, that scheduler events can have all kinds of additional properties, which can be utilized in the calendar. We're showing you the basic stuff here.

The DTO uses the snake_case names that Scheduler expects on the wire and converts dates to and from ISO `yyyy-MM-ddTHH:mm:ss` strings:

~~~csharp title="Models/WebAPIEvent.cs"
namespace BlazorApp.Models;

public class WebAPIEvent
{
    public int id { get; set; }
    public string? text { get; set; }
    public string? start_date { get; set; }
    public string? end_date { get; set; }

    // SchedulerEvent -> WebAPIEvent
    public static explicit operator WebAPIEvent(SchedulerEvent ev)
    {
        return new WebAPIEvent
        {
            id = ev.Id,
            text = ev.Text,
            start_date = ev.StartDate.ToString("yyyy-MM-ddTHH:mm:ss"),
            end_date = ev.EndDate.ToString("yyyy-MM-ddTHH:mm:ss")
        };
    }

    // WebAPIEvent -> SchedulerEvent
    public static explicit operator SchedulerEvent(WebAPIEvent ev)
    {
        return new SchedulerEvent
        {
            Id = ev.id,
            Text = ev.text,
            StartDate = ev.start_date != null ? DateTime.Parse(ev.start_date) : DateTime.UtcNow,
            EndDate = ev.end_date != null ? DateTime.Parse(ev.end_date) : DateTime.UtcNow
        };
    }
}
~~~

## Step 4. Implementing Web API

Now it's time for the actual REST API implementation. Create the **Controllers** folder and add a controller for our events:

~~~csharp title="Controllers/SchedulerController.cs"
using BlazorApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace BlazorApp.Controllers;

[ApiController]
[Route("api/scheduler")]
public class SchedulerController : ControllerBase
{
    private static List<SchedulerEvent> _events = new()
    {
        new SchedulerEvent
        {
            Id = 1,
            Text = "Test event 1",
            StartDate = DateTime.Now.Date.AddHours(6),
            EndDate = DateTime.Now.Date.AddHours(8)
        },
        new SchedulerEvent
        {
            Id = 2,
            Text = "Test event 2",
            StartDate = DateTime.Now.Date.AddHours(9),
            EndDate = DateTime.Now.Date.AddHours(11)
        }
    };

    private static int _nextId = 3;

    [HttpGet]
    public IActionResult Get() => Ok(_events.Select(e => (WebAPIEvent)e));

    [HttpPost]
    public IActionResult Post([FromBody] WebAPIEvent dto)
    {
        if (!ModelState.IsValid) return BadRequest();
        var evt = (SchedulerEvent)dto;
        evt.Id = _nextId++;
        _events.Add(evt);
        return Ok(new { tid = evt.Id, action = "inserted" });
    }

    [HttpPut("{id:int}")]
    public IActionResult Put(int id, [FromBody] WebAPIEvent dto)
    {
        if (!ModelState.IsValid) return BadRequest();
        var index = _events.FindIndex(e => e.Id == id);
        if (index == -1) return NotFound();
        var evt = (SchedulerEvent)dto;
        evt.Id = id;
        _events[index] = evt;
        return Ok(new { action = "updated" });
    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        var removed = _events.RemoveAll(e => e.Id == id) > 0;
        return removed ? Ok(new { action = "deleted" }) : NotFound();
    }
}
~~~

:::note
This implementation uses a static `List<SchedulerEvent>` for simplicity - data does not persist across app restarts or multiple users. Perfect for trying CRUD; for production swap the list for an [Entity Framework Core context](integrations/dotnet/howtostart-dotnet-core.md#step-3-creating-models-and-database).
:::

Next, update **Program.cs** to register the controller:

~~~csharp title="Program.cs"
using BlazorApp.Components;

var builder = WebApplication.CreateBuilder(args);

// Blazor services
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();
builder.Services.AddServerSideBlazor()
    .AddCircuitOptions(options =>
    {
        options.DetailedErrors = true;
    });

// Web API controllers
builder.Services.AddControllers(); /*!*/

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    app.UseHsts();
}
app.UseStatusCodePagesWithReExecute("/not-found", createScopeForStatusCodePages: true);
app.UseHttpsRedirection();
app.UseAntiforgery();

app.MapStaticAssets();
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

// Map API endpoints
app.MapControllers(); /*!*/

app.Run();
~~~

The last part is to load events from the API and connect a [data processor](guides/server-integration.md#technique) so changes flow back to the controller. Update `scheduler.js`:

~~~js title="wwwroot/lib/scheduler/scheduler.js"
function initScheduler() {
    // The C# DTO emits ISO yyyy-MM-ddTHH:mm:ss; the default date_format config can't
    // express the "T" delimiter, so override the format_date / parse_date templates.
    scheduler.templates.format_date = function (date) { /*!*/
        return date.toISOString(); /*!*/
    }; /*!*/
    scheduler.templates.parse_date = function (datestr) { /*!*/
        return new Date(datestr); /*!*/
    }; /*!*/

    scheduler.init("scheduler_here", new Date(), "week");

    // load data from backend
    scheduler.load("/api/scheduler"); /*!*/
    // connect backend to scheduler
    const dp = scheduler.createDataProcessor({ /*!*/
        url: "/api/scheduler", /*!*/
        mode: "REST-JSON" /*!*/
    }); /*!*/
}
~~~

The default `date_format` config string can't express the ISO `T` delimiter, so the demo overrides the [format_date](api/template/format_date.md) and [parse_date](api/template/parse_date.md) templates instead. `toISOString()` always emits UTC with a trailing `Z`, and `new Date(datestr)` parses both the UTC strings the client produces and the local-time strings the server emits.

Everything is ready. You can run the application and see the fully-fledged Scheduler.

## See also

The Web API controller in this tutorial is a basic CRUD skeleton on top of in-memory storage. The topics below apply equally to a Blazor host but are not duplicated here - follow the ASP.NET Core integration guide:

- [Dynamic loading](integrations/dotnet/howtostart-dotnet-core.md#dynamic-loading) - only fetch events in the visible date range
- [Recurring events](integrations/dotnet/howtostart-dotnet-core.md#recurring-events) - model, DTO, and POST/PUT/DELETE handling
- [Error handling middleware](integrations/dotnet/howtostart-dotnet-core.md#error-handling)
- [Application security / XSS protection](integrations/dotnet/howtostart-dotnet-core.md#application-security)
- [Troubleshooting backend integration](guides/troubleshooting.md)

For a persistent backend (Entity Framework Core + SQL Server), the [ASP.NET Core tutorial](integrations/dotnet/howtostart-dotnet-core.md) covers the full setup.

## What's next

Now you have a fully functioning Scheduler. You can view the full code on [GitHub](https://github.com/DHTMLX/scheduler-howto-blazor), clone or download it and use it for your projects.

You can also check [guides on the numerous features of Scheduler](/guides/) or tutorials on [integration of Scheduler with other backend frameworks](integrations/howtostart-guides.md).
