---
title: "Mini-Kalender (Datumsauswahl)"
sidebar_label: "Mini-Kalender (Datumsauswahl)"
---

# Mini-Kalender (Datumsauswahl)

Der Mini-Kalender (Date Picker) ist eine praktische Erweiterung, mit der Sie eine kompakte Monatsansicht in einem HTML-Container auf Ihrer Seite anzeigen können.

![mini_calendar](/img/mini_calendar.png)


[Mini calendar without the scheduler](https://docs.dhtmlx.com/scheduler/samples/05_calendar/02_without_scheduler.html)


:::note
Um den Mini-Kalender in Ihrer App zu verwenden, stellen Sie sicher, dass Sie die **minical**-Erweiterung auf der Seite einbinden.
:::


## Im Header {#intheheader}

Um den Mini-Kalender (Date Picker) im Header des Schedulers anzuzeigen (wie im Bild unten), gehen Sie wie folgt vor:

![calendar_in_header](/img/calendar_in_header.png)

1. Binden Sie die Erweiterungsdatei auf Ihrer Seite ein:
~~~js
scheduler.plugins({
    minical: true
});
~~~
2. Definieren Sie den Container für den Mini-Kalender und fügen Sie ihn in das Scheduler-Markup ein:
~~~js
<div class="dhx_cal_navline">
    ...
    <div class="dhx_cal_date"></div>
    <div class="dhx_minical_icon" id="dhx_minical_icon" 
    onclick="show_minical()">&nbsp;</div>
</div>
~~~
3. Implementieren Sie die Logik, um den Mini-Kalender zu initialisieren (mit der Methode [renderCalendar](api/method/rendercalendar.md)) und zu zerstören (mit der Methode [destroyCalendar](api/method/destroycalendar.md)):
~~~js
function show_minical(){
    if (scheduler.isCalendarVisible()){
        scheduler.destroyCalendar();
    } else {
        scheduler.renderCalendar({
            position:"dhx_minical_icon",
            date:scheduler._date,
            navigation:true,
            handler:function(date,calendar){
                scheduler.setCurrentView(date);
                scheduler.destroyCalendar()
            }
        });
    }
}
~~~


[Mini calendar in the scheduler header](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)


## Im Header (Drittanbieter-Datumsauswahl) {#intheheaderthirdpartydatepicker}

In diesem Abschnitt wird gezeigt, wie Sie einen Mini-Kalender (Date Picker) eines Drittanbieters in den Header des Schedulers integrieren.

![custom_minicalendar](/img/custom_minicalendar.png)

**Related sample** [3rd party Mini Calendar in the header](https://snippet.dhtmlx.com/5/0dca14de9)

Unser Beispiel verwendet [jQuery](https://jquery.com) und [Bootstrap Datepicker](https://bootstrap-datepicker.readthedocs.io/en/latest/), um den Mini-Kalender hinzuzufügen. Wenn Sie mit anderen Bibliotheken arbeiten, müssen Sie den Code entsprechend anpassen, aber das grundlegende Vorgehen bleibt ähnlich:

1. *Datumsauswahl beim Klick auf den Kalender-Header anzeigen*

Definieren Sie zunächst einen DIV-Container für den Mini-Kalender (oder ein anderes Steuerelement) im Scheduler-Header. Mit dem [Markup-Initialisierungsansatz](guides/initialization.md#initializing-scheduler-via-markup) sieht das so aus:

~~~js
<div id="scheduler_here" class="dhx_cal_container">
  <div class="dhx_cal_navline">
    <div class="dhx_cal_prev_button">&nbsp;</div>
    <div class="dhx_cal_next_button">&nbsp;</div>
    <div class="dhx_cal_today_button"></div>
    <div class="dhx_cal_date"></div>
    <!--- HERE -->
    <div class="input-group date">
      <input type="text" class="form-control">
      <div class="dhx_minical_icon input-group-addon" id="dhx_minical_icon">&nbsp;</div>
    </div>
    <!--- end HERE -->
~~~

Wenn Sie die [header config](guides/initialization.md#initializing-scheduler-via-header-config) verwenden, fügen Sie [ein benutzerdefiniertes Element](api/config/header.md) wie folgt hinzu:

~~~js
scheduler.config.header = [
  "day",
  "week",
  "month",
  {html:'<div class="input-group date">'+
    '<input type="text" class="form-control">'+
    '<div class="dhx_minical_icon input-group-addon" id="dhx_minical_icon">&nbsp;</div>'+
       '</div>'},
  "date",
  "prev",
  "today",
  "next"
];
scheduler.init("scheduler_here");
~~~

Um den Date Picker beim Klick auf das Datum im Navigationsbereich des Schedulers anzuzeigen, richten Sie das Click-Event ein, sobald der Scheduler bereit ist:

~~~js
scheduler.attachEvent("onSchedulerReady", function(){

    const $node = $('#scheduler_here .input-group.date').datepicker({
        autoclose: true,
        todayHighlight: true,
        todayBtn: "linked",
       });

       $("#scheduler_here").delegate(".dhx_cal_date", "click", function () {
           $node.datepicker("show");
       });

       $node.datepicker().on("show", function () {
        $node.datepicker("update", scheduler.getState().date);

           // Popup unterhalb des Datumslabels zentrieren
        centerDatepicker($(".dhx_cal_date"));
    });
    ...
    
});
~~~

Die Funktion `centerDatepicker` hilft dabei, den Dropdown-Date Picker korrekt zu positionieren:

~~~js
    ...
    function centerDatepicker(referenceElement) {

        if (!$('.datepicker-dropdown').is(':visible')) {
            return;
           }
        // Popup unterhalb des Datumslabels zentrieren
        var offset = $(".dhx_cal_date").offset();
        var width = $(".dhx_cal_date").width();
        var popupWidth = $(".datepicker-dropdown").width();
        $(".datepicker-dropdown").css({
            top: offset.bottom + "px",
            left: (width - popupWidth) / 2 + "px"
        });
    }
~~~

2. *Aktuelles Scheduler-Datum bei Auswahl im Date Picker aktualisieren*

Nachdem der Date Picker angezeigt wurde, aktualisieren Sie das Scheduler-Datum, wenn ein Tag ausgewählt wird:

~~~js
    $node.datepicker().on("changeDate", function () {
        scheduler.setCurrentView($node.datepicker("getDate"));
    });
~~~

3. *Aktuelle Daten im Date Picker hervorheben*

Um die aktuell im Scheduler angezeigten Daten hervorzuheben, wenden Sie eine einfache CSS-Klasse an:

~~~js
.datepicker table .scheduler-date{
    background-color: #fff3e4;
}
~~~

Alle im Scheduler sichtbaren Date-Picker-Zellen erhalten diese Klasse:

~~~js
    function fillDatepicker(scheduler) {
          // Hervorgehobene Ereignisse und aktive Daten zurücksetzen
          ...
          $(".datepicker-dropdown").find("[data-date]").removeClass("scheduler-date");

          // Scheduler-Datum hervorheben
          var visibleDates = getVisibleDates(scheduler);
          visibleDates.forEach(function (date) {
            $(".datepicker-dropdown").find(
                "[data-date='" + date + "']"
            ).addClass("scheduler-date");
          });
          ...
    }
~~~

Um die aktuell sichtbaren Daten zu erhalten, verwenden Sie `scheduler.getState`:

~~~js
    function getVisibleDates(scheduler) {
        var minVisible = scheduler.getState().min_date;
        var maxVisible = scheduler.getState().max_date;

        var current = minVisible;
        var result = [];
        while (current.valueOf() < maxVisible.valueOf()) {
            var currentUTC = Date.UTC(
                current.getFullYear(),current.getMonth(),current.getDate()
            );
            result.push(currentUTC.valueOf());

            current = scheduler.date.add(current, 1, "day");
          }
         return result;
    }
~~~

4. *Tage mit Ereignissen im Date Picker markieren*

Um Daten mit Ereignissen im Scheduler hervorzuheben, fügen Sie eine weitere CSS-Klasse hinzu:

~~~js
.datepicker table .has-event::after {
    content: " ";
    width: 6px;
    height: 6px;
    position: absolute;
    background-color: #6b96f7;
    border-radius: 4px;
}
~~~

Dadurch werden die Mini-Kalender-Daten mit Ereignissen hervorgehoben.

Um beim Überfahren eines Datums einen Tooltip mit der Anzahl der Ereignisse anzuzeigen, holen Sie die Ereignisse für den aktuell im Date Picker angezeigten Monat:

~~~js
    function getVisibleEvents(calendarDate, scheduler) {
          var min = scheduler.date.month_start(new Date(calendarDate));
          var max = scheduler.date.add(calendarDate, 1, "month");
          min = scheduler.date.week_start(min);
          if(scheduler.date.week_start(new Date(max)) < max){
             max = scheduler.date.week_start(new Date(max));
             max = scheduler.date.add(max, 1, "week");
          }
          var events = scheduler.getEvents(min, max);
          var days = {};

          events.forEach(function (event) {
             var eventDate = event.start_date;
             while(eventDate < event.end_date){
                   var day = Date.UTC(
                     eventDate.getFullYear(),
                     eventDate.getMonth(),
                    eventDate.getDate()
                   );

            if (!days[day.valueOf()]) {
                     days[day.valueOf()] = 0;
                   }
                   days[day.valueOf()]++;  
                   eventDate = scheduler.date.add(eventDate, 1, "day");
                   eventDate = scheduler.date.day_start(eventDate);
             }
          });

          var result = [];
          for (var i in days) {
             result.push({ timestamp: i, count: days[i] });
          }
          return result;
       }
~~~

Mit dieser Methode werden Ereignisdaten aus dem Scheduler geholt, sodass nur aktuell geladene Ereignisse hervorgehoben werden. Wenn Ihre App dynamisches Laden verwendet, werden möglicherweise nicht alle Ereignisse angezeigt, da nur ein Teil geladen ist. 


Alternativ können Sie Ereignisdaten vom Server anfordern.

Sobald Sie die Ereignis-Timestamps und -Zahlen haben, können Sie den Date Picker wie folgt aktualisieren:

~~~js
    function fillDatepicker(scheduler) {
        // Hervorgehobene Ereignisse und aktive Daten zurücksetzen
        $(".datepicker-dropdown").find("[data-date]").removeClass("has-event");
        $(".datepicker-dropdown").find("[data-date]").removeAttr("title");
        ...

        // Ereignisse hervorheben
        const eventCells = getVisibleEvents($node.datepicker("getDate"), scheduler);
        eventCells.forEach(function (cellEvents) {
            $(".datepicker-dropdown").find(
                "[data-date='" + cellEvents.timestamp + "']"
            ).addClass("has-event");
            $(".datepicker-dropdown").find(
                "[data-date='" + cellEvents.timestamp + "']"
            ).attr("title", cellEvents.count + " events");
          });
    }
~~~

5. *Das angezeigte Datums-Label mit dem aktiven Scheduler-Datum synchronisieren*

Schließlich zentrieren Sie den Date Picker neu, wenn sich die Fenstergröße ändert, und aktualisieren Sie die Hervorhebungen, wenn der Benutzer das Datum im Picker ändert:

~~~js
    $(window).on('resize', function () {
        setTimeout(function(){
            centerDatepicker($(".dhx_cal_date"));
        }, 10);
    });
    $node.datepicker().on("changeDate", function () {
          scheduler.setCurrentView($node.datepicker("getDate"));
       });
    $node.datepicker().on("changeMonth", function () {
          refreshDatepicker(scheduler);
    });
    $node.datepicker().on("changeYear", function () {
        refreshDatepicker(scheduler);
    });
    $node.datepicker().on("changeDecade", function () {
        refreshDatepicker(scheduler);
    });
    $node.datepicker().on("changeCentury", function () {
        refreshDatepicker(scheduler);
    });
    function refreshDatepicker(scheduler) {
        // Aus Timeout heraus aufrufen, damit der Code nach dem Aktualisieren des Datepicker-Popups ausgeführt wird
        setTimeout(function () {
            fillDatepicker(scheduler);
        });
    }
~~~

Wenn Sie ein separates Element verwenden, um das aktive Datum des Schedulers anzuzeigen, hören Sie auf das [onViewChange](api/event/onviewchange.md)-Event und aktualisieren dort das Label:

~~~js
scheduler.attachEvent("onViewChange", function (newMode , newDate){
    const state = scheduler.getState();
    const minDate = state.min_date;
    const maxDate = state.max_date;
    const dateToStr = scheduler.date.str_to_date("%d-%m-%Y");

    $(dateHeader).html(dateToStr(minDate) + " - " + dateToStr(minDate));
});
~~~

Beachten Sie, dass dieser Handler im Beispielcode nicht verwendet wird, da das integrierte Datums-Header automatisch aktualisiert wird. Verwenden Sie dies nur, wenn Sie [das Standard-Datums-Header ausblenden](guides/scheduler-markup.md#hidingtheheaderofscheduler) oder das aktive Datum an mehreren Stellen anzeigen möchten.


## Im Lightbox {#in-the-lightbox}

Der Mini-Kalender (Date Picker) kann auch innerhalb des Lightbox zur Auswahl von "Start"- und "Ende"-Daten genutzt werden.

![in_the_lightbox](/img/in_the_lightbox.png)

Um den Mini-Kalender im Lightbox hinzuzufügen, gehen Sie wie folgt vor:

1. Aktivieren Sie die Erweiterung auf der Seite:
~~~js
scheduler.plugins({
    minical: true
});
~~~
2. Ändern Sie den type des time-Abschnitts zu calendar_time anstelle von time:
~~~js
// Standard-Lightbox-Definition
scheduler.config.lightbox.sections="["
  {name:"description", height:200, map_to:"text", type:"textarea", focus:true},
  {name:"time", height:72, type:"time", map_to:"auto"}
];
// type:"time" -> type:"calendar_time" ändern
scheduler.config.lightbox.sections = [
  {name:"description", height:200, map_to:"text", type:"textarea", focus:true},
  {name:"time", height:72, type:"calendar_time", map_to:"auto" }
];
~~~


[Mini calendar in the lightbox](https://docs.dhtmlx.com/scheduler/samples/05_calendar/03_in_form.html)


## Außerhalb des Schedulers {#outsidethescheduler}

Der Mini-Kalender (Date Picker) kann an beliebiger Stelle auf der Seite platziert werden.

![outside_the_scheduler](/img/outside_the_scheduler.png)

Um den Mini-Kalender in einem HTML-Container außerhalb des Schedulers hinzuzufügen, gehen Sie wie folgt vor:

1. Aktivieren Sie die Erweiterung auf der Seite:
~~~js
scheduler.plugins({
    minical: true
});
~~~
2. Definieren Sie den Container für den Mini-Kalender auf Ihrer Seite:
~~~js
<div id="scheduler_here" class="dhx_cal_container" ...>
...
</div>

<div>
        <div id="cal_here"></div>
</div>
~~~
3. Rufen Sie die Methode [renderCalendar](api/method/rendercalendar.md) auf, um den Mini-Kalender zu rendern:
~~~js
const calendar = scheduler.renderCalendar({
    container:"cal_here", 
    navigation:true,
    handler:function(date){
        scheduler.setCurrentView(date, scheduler._mode);
    }
});
~~~


[Mini calendar outside the scheduler](https://docs.dhtmlx.com/scheduler/samples/05_calendar/05_plain_structure.html)


## Templates und Styles {#templatesandstyles}

### Templates
Sie können das Anzeigeformat von Daten im Mini-Kalender (Datumsauswahl) einfach anpassen, indem Sie verschiedene in dem Artikel [Mini-Kalender-Vorlagen](guides/mini-calendar-templates.md) beschriebene Templates verwenden.

~~~js
scheduler.templates.calendar_month = scheduler.date.date_to_str("%M, %Y");
scheduler.init('scheduler_here',new Date(2019,2,1),"day");
...
const calendar = scheduler.renderCalendar({..});
~~~

![mini_calendar_custom_template](/img/mini_calendar_custom_template.png)

### CSS-Klassen
Um das Erscheinungsbild der Tage im Mini-Kalender (Datumsauswahl) anzupassen, können Sie die folgenden CSS-Klassen überschreiben:

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <th>CSS-Klasse</th>
  <th>Angewendet auf</th>
  </thead>
  <tbody>
  <tr>
  <td>.dhx_cal_container.dhx_mini_calendar .dhx_month_head</td>
  <td>eine Tageszelle</td>
  </tr>
  <tr>
  <td>.dhx_cal_container.dhx_mini_calendar .dhx_month_head.dhx_year_event</td>
  <td>eine Tageszelle mit zugewiesenem/n Ereignis(sen)</td>
  </tr>
  <tr>
  <td>.dhx_cal_container.dhx_mini_calendar .dhx_now .dhx_month_head</td>
  <td>eine Tageszelle mit dem aktuellen Datum</td>
  </tr>
  <tr>
  <td>.dhx_cal_container.dhx_mini_calendar .dhx_calendar_click</td>
  <td>eine Tageszelle mit dem aktuell aktiven Datum</td>
  </tr>
  </tbody>
</table>

~~~js
<style>
.dhx_cal_container.dhx_mini_calendar .dhx_calendar_click{
    color:red;
}
</style>
<script>
    const calendar = scheduler.renderCalendar({...});
</script>
~~~

![mini_calendar_custom_css](/img/mini_calendar_custom_css.png)

### Markieren von Tagen mit der Methode markCalendar()
Um einem Tag eine bestimmte CSS-Klasse zuzuweisen, können Sie die Methode [markCalendar](api/method/markcalendar.md) verwenden:

~~~js
<style>
.my_style{
    background: red !important;
}
</style>
<script>
    const calendar = scheduler.renderCalendar({...});
     ...
    scheduler.markCalendar(calendar, new Date(2019,3,1), "my_style");
</script>
~~~

![mini_calendar_custom_marking](/img/mini_calendar_custom_marking.png)

## API {#api}

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0">[destroyCalendar](api/method/destroycalendar.md)</td>
  <td>entfernt den zuvor erstellten Mini-Kalender</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[isCalendarVisible](api/method/iscalendarvisible.md)</td>
  <td>prüft, ob der Kalender aktuell im Scheduler geöffnet ist</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[linkCalendar](api/method/linkcalendar.md)</td>
  <td>sorgt dafür, dass das aktive Datum im Mini-Kalender aktualisiert wird, sobald sich das aktive Datum des Schedulers ändert</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[markCalendar](api/method/markcalendar.md)</td>
  <td>wendet eine CSS-Klasse auf ein bestimmtes Datum an</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[renderCalendar](api/method/rendercalendar.md)</td>
  <td>erstellt einen Mini-Kalender</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[unmarkCalendar](api/method/unmarkcalendar.md)</td>
  <td>entfernt eine CSS-Klasse von einem bestimmten Datum</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[updateCalendar](api/method/updatecalendar.md)</td>
  <td>zeigt das angegebene Datum im Mini-Kalender an</td>
  </tr>
  </tbody>
</table>

## Event-Handling {#event-handling}

Der Mini-Kalender unterstützt Callbacks für typische Benutzerinteraktionen wie das Wechseln des sichtbaren Monats, das Überfahren von Daten mit der Maus sowie das Klicken auf Daten. Diese können in der `events`-Eigenschaft des Konfigurationsobjekts gesetzt werden:

~~~js
const dateToStr = (date) => date ? scheduler.templates.format_date(date) : null;
const calendar = scheduler.renderCalendar({
    container: "cal_here",
    navigation: true,
    events: {
        onBeforeMonthChange: function(oldDate, newDate) {
            scheduler.message(`Before change from ${dateToStr(oldDate)} 
                to ${dateToStr(newDate)}`);
            return true;
        },
        onMonthChange: function(oldDate, newDate) {
            scheduler.message(`Changed from ${dateToStr(oldDate)} 
                to ${dateToStr(newDate)}`);
        },
        onDateClick: function(date, e) {
            scheduler.setCurrentView(date);
            scheduler.message(`Selected date ${dateToStr(date)}`);
        },
        onDateMouseOver: function(date, e){
            scheduler.message(`Mouse over ${dateToStr(date)}`)

        }
    }
});
~~~
