---
sidebar_label: "header"
title: "header config"
description: "richtet das Layout für den Scheduler-header (Navigationspanel) ein"
---

# header

### Description

@short: Richtet das Layout für den Scheduler-header (Navigationspanel) ein

@signature: header: any

### Example

~~~jsx
scheduler.config.header = [
    "day",
    "week",
    "month",
    "date",
    "prev",
    "today",
    "next"
];
scheduler.init("scheduler_here");
~~~

**Default value:** null

### Details

Wenn der Scheduler mit dieser Einstellung initialisiert wird, wird jegliches vorhandenes HTML im Scheduler-Container durch generiertes Markup ersetzt.

Diese Konfiguration kann entweder ein einfaches Array von Elementen oder eine verschachtelte Struktur sein, um ein komplexeres Layout zu definieren.

Beachte, dass die Höhe der header/Navigationsleiste weiterhin über die Option [scheduler.xy.nav_height](api/other/xy.md#day) gesteuert wird.


~~~js
scheduler.xy.nav_height = 80;
scheduler.config.header = {
    rows: [
        {
            cols: [
                "prev",
                "date",
                "next",
            ]
        },
        {
            cols: [
                "day",
                "week",
                "month",
                "spacer",
                "today"
            ]
        }
    ]
};
scheduler.init("scheduler_here");
~~~

~~~html
<div id="scheduler_here"></div>
~~~

Unterstützte Werte umfassen:

 - **\{rows: Array, css:string\}** - Container für einen header mit mehreren Reihen  
 - **\{cols: Array, css:string\}** - eine einzelne Reihe innerhalb eines mehrreihigen headers  
 - **"prev","next","today"** - Buttons zur Datumsnavigation  
 - **"date"** - Label, das das aktuelle Datum anzeigt  
 - **"day", "week", "month", etc.** - Tabs zum Wechseln der Ansichten  
 - **"spacer"** - ein transparentes Element, das den verfügbaren Platz auffüllt, nützlich um Elemente nach rechts zu schieben  
 - **\{html: string, click: function, css: string\}** - Objekt zum Hinzufügen benutzerdefinierter Buttons oder Icons im header  
 - **"minicalendar"** - Umschalter für den [Mini Calendar](guides/minicalendar.md).

~~~js
scheduler.config.header = [
    "day",
    "week",
    "month",
    {html:"click me!", click:function(){alert("done!") }},
    "date",
    "prev",
    "today",
    "next"
];
scheduler.init("scheduler_here");
~~~

#### Mini Calendar Einstellungen:

Die Option "minicalendar" fügt einen Button hinzu, der den Mini Calendar mit folgendem click handler ein- und ausblendet:

~~~
function showCalendar () {
    if (scheduler.isCalendarVisible()) {
        scheduler.destroyCalendar();
    } else {
        scheduler.renderCalendar({
            position: this,
            date: scheduler.getState().date,
            navigation: true,
            handler: function (date, calendar) {
                scheduler.setCurrentView(date);
                scheduler.destroyCalendar();
            }
        });
    }
};
~~~

Um das Verhalten des Mini Calendars mit anderen Parametern anzupassen, geben Sie Ihren eigenen click handler für den minicalendar-Button wie folgt an:

~~~
scheduler.config.header = [
    "day",
    "week",
    "month",
    {view: "minicalendar", click: function () {
        if (scheduler.isCalendarVisible()) {
            scheduler.destroyCalendar();
        } else {
            scheduler.renderCalendar({
                position: this,
                date: scheduler.getState().date,
                navigation: true,
                handler: function (date, calendar) {
                    scheduler.setCurrentView(date);
                    scheduler.destroyCalendar();
                }
            });
        }
     
}},
    "date",
    "prev",
    "today",
    "next"
];
~~~

### Related Guides
- [Mobile Responsive Scheduler](guides/touch-support.md)
- [dhtmlxScheduler in Plain JS/HTML](guides/initialization.md#initializing-scheduler-via-header-config)
- [Mini-Kalender (Datumsauswahl)](guides/minicalendar.md)
