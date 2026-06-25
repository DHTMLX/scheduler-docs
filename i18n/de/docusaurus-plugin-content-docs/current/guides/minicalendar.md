--- 
title: "Mini-Kalender (Datumswähler)"
sidebar_label: "Mini-Kalender (Datumswähler)"
---

# Mini-Kalender (Datumswähler)

Der Mini-Kalender (Datumswähler) ist eine spezielle Erweiterung, die es ermöglicht, eine kleine Monatsansicht in einen HTML-Container auf einer Seite zu rendern.

![mini_calendar](/img/mini_calendar.png)


[Mini-Kalender ohne Scheduling](https://docs.dhtmlx.com/scheduler/samples/05_calendar/02_without_scheduler.html)


:::note
Um den Mini-Kalender in einer App zu verwenden, binden Sie die **minical**-Erweiterung in die Seite ein.
:::


## In der Kopfzeile

Um den Mini-Kalender (Datumswähler) in die Kopfzeile des Schedulers zu integrieren (wie im Bild unten gezeigt), gehen Sie wie folgt vor:

![calendar_in_header](/img/calendar_in_header.png)

1. Binden Sie die Erweiterungsdatei in die Seite ein:
~~~js
scheduler.plugins({
    minical: true
});
~~~
2. Geben Sie den Container für den Mini-Kalender an und fügen Sie ihn dem Scheduler-Markup hinzu:
~~~js
<div class="dhx_cal_navline">
    ...
    <div class="dhx_cal_date"></div>
    <div class="dhx_minical_icon" id="dhx_minical_icon" 
    onclick="show_minical()">&nbsp;</div>
</div>
~~~
3. Stellen Sie die Logik bereit, die den Mini-Kalender initialisiert (die renderCalendar-Methode) und zerstört (die destroyCalendar-Methode) den Mini-Kalender:
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


[Mini-Kalender in der Scheduler-Kopfzeile](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)


## In der Kopfzeile (Third-party Date Picker)

In diesem Abschnitt zeigen wir Ihnen, wie Sie einen Datumswähler von Drittanbietern in die Kopfzeile des Schedulers integrieren.

![custom_minicalendar](/img/custom_minicalendar.png)

**Verwandtes Beispiel** [3rd party Mini Calendar in the header](https://snippet.dhtmlx.com/5/0dca14de9)

In unserem Beispiel fügen wir einen Mini-Kalender basierend auf [jQuery](https://jquery.com) und [Bootstrap Datepicker](https://bootstrap-datepicker.readthedocs.io/en/latest/) hinzu. Wenn Sie andere Bibliotheken verwenden, müssen Sie den Code möglicherweise anpassen, aber der grundlegende Ansatz sollte derselbe bleiben:

1. *Den Date Picker anzeigen, wenn man auf die Kalenderüberschrift klickt*

Zunächst müssen Sie den DIV-Container für den Mini-Kalender (oder eine andere Kontrolle) in der Scheduler-Kopfzeile definieren.
Verwenden Sie den [Markup-Initialisierungsansatz](guides/initialization.md#initializing-scheduler-via-markup), können Sie dies wie folgt tun:

~~~js
<div id="scheduler_here" class="dhx_cal_container" style="width:100%; height:100%;">
  <div class="dhx_cal_navline">
    <div class="dhx_cal_prev_button">&nbsp;</div>
    <div class="dhx_cal_next_button">&nbsp;</div>
    <div class="dhx_cal_today_button"></div>
    <div class="dhx_cal_date"></div>
    <!--- HERE -->
    <div class="input-group date" style="display: none;">
      <input type="text" class="form-control">
      <div class="dhx_minical_icon input-group-addon" id="dhx_minical_icon">&nbsp;</div>
    </div>
    <!--- end HERE -->
~~~

Wenn Sie die [Header-Konfiguration](guides/initialization.md#initializing-scheduler-via-header-config) verwenden, müssen Sie dort ein [benutzerdefiniertes Element](api/config/header.md) hinzufügen:

~~~js
scheduler.config.header = [
  "day",
  "week",
  "month",
  {html:'<div class="input-group date" style="display: none;">'+
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

Um den Date Picker beim Klicken auf das Datum im Navigationsfeld des Schedulers anzuzeigen, initialisieren wir das Klick-Ereignis, sobald der Scheduler bereit ist:

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

           // center popup below date label
        centerDatepicker($(".dhx_cal_date"));
    });
    ...
    
});
~~~

`centerDatepicker` ist eine Hilfsfunktion, die wir implementieren, um den Dropdown-Daterpicker an der notwendigen Stelle darzustellen:

~~~js
    ...
    function centerDatepicker(referenceElement) {

        if (!$('.datepicker-dropdown').is(':visible')) {
            return;
           }
        // center popup below date label
        let offset = $(".dhx_cal_date").offset();
        let width = $(".dhx_cal_date").width();
        let popupWidth = $(".datepicker-dropdown").width();
        $(".datepicker-dropdown").css({
            top: offset.bottom + "px",
            left: (width - popupWidth) / 2 + "px"
        });
    }
~~~

2. *Wechseln des Schedulers zum ausgewählten Datum, wenn der Benutzer im Date Picker auf das Datum klickt*

Nachdem wir den Datepicker bei Bedarf anzeigen, müssen wir das Scheduler-Datum ändern, wenn ein Tag im Kalender ausgewählt wird:

~~~js
    $node.datepicker().on("changeDate", function () {
        scheduler.setCurrentView($node.datepicker("getDate"));
    });
~~~

3. *Aktuelle Daten im Datepicker hervorheben*

Um die Daten im Datepicker hervorzuheben, die derzeit im Scheduler angezeigt werden, verwenden wir eine einfache CSS-Klasse:

~~~js
.datepicker table .scheduler-date{
    background-color: #fff3e4;
}
~~~

Alle Zellen des Datepickers, die derzeit im Scheduler sichtbar sind, erhalten diese Klasse:

~~~js
    function fillDatepicker(scheduler) {
          // reset highlighted events and active dates
          ...
          $(".datepicker-dropdown").find("[data-date]").removeClass("scheduler-date");

          // highlight scheduler date
          const visibleDates = getVisibleDates(scheduler);
          visibleDates.forEach(function (date) {
            $(".datepicker-dropdown").find(
                "[data-date='" + date + "']"
            ).addClass("scheduler-date");
          });
          ...
    }
~~~

Um die aktuell sichtbaren Daten zu erhalten, können Sie `scheduler.getState` verwenden:

~~~js
    function getVisibleDates(scheduler) {
        const minVisible = scheduler.getState().min_date;
        const maxVisible = scheduler.getState().max_date;

        let current = minVisible;
        let result = [];
        while (current.valueOf() < maxVisible.valueOf()) {
            let currentUTC = Date.UTC(
                current.getFullYear(),current.getMonth(),current.getDate()
            );
            result.push(currentUTC.valueOf());

            current = scheduler.date.add(current, 1, "day");
          }
         return result;
    }
~~~

4. *Tage mit Ereignissen im Datepicker hervorheben*

Als Nächstes möchten wir, dass der Datepicker die Tage mit Ereignissen hervorhebt, die im Scheduler angegeben sind. Dafür verwenden wir denselben Ansatz wie im vorherigen Schritt und fügen eine CSS-Klasse hinzu:

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

Wie Sie im obigen Beispiel sehen können, markieren wir die Tage des Mini-Kalenders, die Ereignisse enthalten. 

Um den Tooltip mit der Anzahl der Ereignisse für das Datum anzuzeigen, über dem der Benutzer die Maus bewegt, müssen wir die Ereignisse der Monate abrufen, die im Datepicker aktuell angezeigt werden:

~~~js
    function getVisibleEvents(calendarDate, scheduler) {
          const min = scheduler.date.month_start(new Date(calendarDate));
          const max = scheduler.date.add(calendarDate, 1, "month");
          min = scheduler.date.week_start(min);
          if(scheduler.date.week_start(new Date(max)) < max){
             max = scheduler.date.week_start(new Date(max));
             max = scheduler.date.add(max, 1, "week");
          }
          const events = scheduler.getEvents(min, max);
          let days = {};

          events.forEach(function (event) {
             let eventDate = event.start_date;
             while(eventDate < event.end_date){
                   let day = Date.UTC(
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

          let result = [];
          for (let i in days) {
             result.push({ timestamp: i, count: days[i] });
          }
          return result;
       }
~~~

Im obigen Beispiel erhalten wir Informationen über die Ereignisse aus dem Scheduler. Das bedeutet, dass wir nur die Ereignisse hervorheben können, die bereits in den Scheduler geladen wurden. Dieser Ansatz funktioniert besonders dann nicht gut, wenn Sie dynamisches Laden verwenden, da nur ein kleiner Teil aller Ereignisse zum Zeitpunkt geladen wird.

Der alternative Ansatz wäre, die Daten zu den Ereignissen vom Server abzurufen.

Wenn wir Daten zu den Zeitstempeln der Zellen haben, die Ereignisse enthalten, und zur Anzahl der Ereignisse pro Zelle, können wir den Datepicker mit diesen Informationen befüllen, wie zum Beispiel:

~~~js
    function fillDatepicker(scheduler) {
        // reset highlighted events and active dates
        $(".datepicker-dropdown").find("[data-date]").removeClass("has-event");
        $(".datepicker-dropdown").find("[data-date]").removeAttr("title");
        ...

        // highlight events
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

5. *Synchronisieren des angezeigten Datumslabels mit dem aktiven Datum im Scheduler*

Schließlich müssen wir den Date Picker neu zentrieren, wenn sich die Fenstergröße ändert, und die Hervorhebung anwenden, wenn der Benutzer das aktuelle Datum im Date Picker ändert:

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
        // Aufruf aus dem Timeout, damit der Code nach Aktualisierung des Datepicker-Popups ausgelöst wird
        setTimeout(function () {
            fillDatepicker(scheduler);
        });
    }
~~~

Wenn Sie ein separates Element verwenden, um das aktive Datum des Schedulers anzuzeigen, müssen Sie das onViewChange-Ereignis des Schedulers erfassen und das Datums-Label von dort aus aktualisieren:

~~~js
scheduler.attachEvent("onViewChange", function (newMode , newDate){
    const state = scheduler.getState();
    const minDate = state.min_date;
    const maxDate = state.max_date;
    const dateToStr = scheduler.date.str_to_date("%d-%m-%Y");

    $(dateHeader).html(dateToStr(minDate) + " - " + dateToStr(minDate));
});
~~~

Beachten Sie, dass wir diesen Handler in unserem Codebeispiel nicht verwenden, da wir uns auf die integrierte Datumsüberschrift des Schedulers verlassen, die automatisch aktualisiert wird. Sie müssen einen solchen Code nur verwenden, wenn Sie [die Standard-Datumsüberschrift ausblenden](guides/scheduler-markup.md#hiding-the-header-of-scheduler), oder wenn Sie das aktive Datum an mehreren Stellen anzeigen müssen.


## Im Lightbox-Fenster

Der Mini-Kalender (Datumswähler) kann im Lightbox-Fenster für die Auswahl von Start- und Enddatum verwendet werden.

![in_the_lightbox](/img/in_the_lightbox.png)

Um den Mini-Kalender im Lightbox-Fenster zu platzieren, befolgen Sie diese Schritte:


1. Erweiterung auf der Seite aktivieren:
~~~js
scheduler.plugins({
    minical: true
});
~~~
2. Den Typ des <i>time</i>-Abschnitts auf <b>calendar_time</b> setzen (statt <b>time</b>):
~~~js
//default lightbox definition
scheduler.config.lightbox.sections= [
  {name:"description", height:200, map_to:"text", type:"textarea", focus:true},
  {name:"time", height:72, type:"time", map_to:"auto"}
];
//change type:"time" -> type:"calendar_time"
scheduler.config.lightbox.sections = [
  {name:"description", height:200, map_to:"text", type:"textarea", focus:true},
  {name:"time", height:72, type:"calendar_time", map_to:"auto" }
];
~~~


[Mini-Kalender im Lightbox](https://docs.dhtmlx.com/scheduler/samples/05_calendar/03_in_form.html)


## Außerhalb des Schedulers

Der Mini-Kalender (Datumswähler) kann an jeder beliebigen Stelle auf der Seite platziert werden.

![outside_the_scheduler](/img/outside_the_scheduler.png)

Um den Mini-Kalender in einen HTML-Container außerhalb des Schedulers zu platzieren, gehen Sie wie folgt vor:

1. Erweiterung auf der Seite aktivieren:
~~~js
scheduler.plugins({
    minical: true
});
~~~
2. Den Container für den Mini-Kalender auf der Seite festlegen:
~~~js
<div id="scheduler_here" class="dhx_cal_container" ...>
...
</div>

<div style='float: left; padding:10px;'>
        <div id="cal_here" style='width:250px;'></div>
</div>
~~~
3. Die [renderCalendar](api/method/rendercalendar.md)-Methode aufrufen, um den Mini-Kalender auf der Seite zu rendern:
~~~js
const calendar = scheduler.renderCalendar({
    container:"cal_here", 
    navigation:true,
    handler:function(date){
        scheduler.setCurrentView(date, scheduler._mode);
    }
});
~~~


[Mini-Kalender außerhalb des Schedulers](https://docs.dhtmlx.com/scheduler/samples/05_calendar/05_plain_structure.html)


## Vorlagen und Stile

### Vorlagen
Um das Format der im Mini-Kalender (Datumswähler) dargestellten Daten anzupassen, können Sie eine Reihe von Vorlagen verwenden, die im Artikel [Mini Calendar Templates](guides/mini-calendar-templates.md) aufgeführt sind. 

~~~js
scheduler.templates.calendar_month = scheduler.date.date_to_str("%M, %Y");
scheduler.init('scheduler_here',new Date(2019,2,1),"day");
...
const calendar = scheduler.renderCalendar({..});
~~~

![mini_calendar_custom_template](/img/mini_calendar_custom_template.png)


### CSS-Klassen
Um das Aussehen der Tage im Mini-Kalender (Datumswähler) anzupassen, können Sie die folgenden CSS-Klassen neu definieren: 

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <th>CSS-Klasse</th>
  <th>Angewendet auf</th>
  </thead>
  <tbody>
  <tr>
  <td style="width:490px;text-align:left;font-weight: bold;">.dhx_cal_container.dhx_mini_calendar .dhx_month_head</td>
  <td>eine Zelle eines Tages</td>
  </tr>
  <tr>
  <td style="text-align:left;font-weight: bold;">.dhx_cal_container.dhx_mini_calendar .dhx_month_head.dhx_year_event</td>
  <td>eine Zelle eines Tages mit dem zugewiesenen Ereignis(en)</td>
  </tr>
  <tr>
  <td style="text-align:left;font-weight: bold;">.dhx_cal_container.dhx_mini_calendar .dhx_now .dhx_month_head</td>
  <td>eine Zelle eines Tages mit dem aktuellen Datum</td>
  </tr>
  <tr>
  <td style="text-align:left;font-weight: bold;">.dhx_cal_container.dhx_mini_calendar .dhx_calendar_click</td>
  <td>eine Zelle eines Tages mit dem aktuell aktiven Datum</td>
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

### Marking days with the markCalendar() method
Um einer bestimmten Zelle eine benutzerdefinierte CSS-Klasse zuzuweisen, können Sie die Methode [markCalendar](api/method/markcalendar.md) verwenden:

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


## API

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0">[destroyCalendar](api/method/destroycalendar.md)</td>
  <td>löscht den zuvor erstellten Mini-Kalender</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[isCalendarVisible](api/method/iscalendarvisible.md)</td>
  <td>prüft, ob der Kalender derzeit im Scheduler geöffnet ist</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[linkCalendar](api/method/linkcalendar.md)</td>
  <td>'sagt' das aktive Datum im Mini-Kalender zu ändern, jedes Mal, wenn das aktive Datum im Scheduler geändert wird</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[markCalendar](api/method/markcalendar.md)</td>
  <td>wendet eine CSS-Klasse auf das angegebene Datum an</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[renderCalendar](api/method/rendercalendar.md)</td>
  <td>erstellt einen Mini-Kalender</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[unmarkCalendar](api/method/unmarkcalendar.md)</td>
  <td>entfernt eine CSS-Klasse von dem angegebenen Datum</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[updateCalendar](api/method/updatecalendar.md)</td>
  <td>zeigt das angegebene Datum im Mini-Kalender an</td>
  </tr>
  </tbody>
</table>


## Ereignisbehandlung

Der Mini-Kalender bietet Callback-Funktionen für gängige Benutzeraktionen, wie das Ändern des sichtbaren Monats, das Überfahren eines Datums mit der Maus und das Klicken auf Daten. Diese Callback-Funktionen können im `events`-Eigenschaft des Konfigurationsobjekts angegeben werden:

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