---
title: "Мини-календарь (Date Picker)"
sidebar_label: "Мини-календарь (Date Picker)"
---

# Мини-календарь (Date Picker)

Мини-календарь (date picker) - это удобное расширение, которое позволяет разместить компактный месячный просмотр внутри HTML-контейнера на вашей странице.

![mini_calendar](/img/mini_calendar.png)


[Mini calendar without the scheduler](https://docs.dhtmlx.com/scheduler/samples/05_calendar/02_without_scheduler.html)


:::note
Чтобы использовать мини-календарь в вашем приложении, убедитесь, что на странице добавлено расширение **minical**.
:::


## В заголовке {#intheheader}

Чтобы добавить мини-календарь (date picker) в заголовок планировщика (как на изображении ниже), выполните следующие шаги:

![calendar_in_header](/img/calendar_in_header.png)

1. Подключите файл расширения на вашей странице:
~~~js
scheduler.plugins({
    minical: true
});
~~~
2. Определите контейнер для мини-календаря и добавьте его в разметку планировщика:
~~~js
<div class="dhx_cal_navline">
    ...
    <div class="dhx_cal_date"></div>
    <div class="dhx_minical_icon" id="dhx_minical_icon" 
    onclick="show_minical()">&nbsp;</div>
</div>
~~~
3. Реализуйте логику инициализации (с помощью метода [renderCalendar](api/method/rendercalendar.md)) и уничтожения (с помощью метода [destroyCalendar](api/method/destroycalendar.md)) мини-календаря:
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


## В заголовке (Сторонний Date Picker) {#intheheaderthirdpartydatepicker}

В этом разделе показано, как встроить сторонний мини-календарь (date picker) в заголовок планировщика.

![custom_minicalendar](/img/custom_minicalendar.png)

**Related sample** [3rd party Mini Calendar in the header](https://snippet.dhtmlx.com/5/0dca14de9)

В примере используются [jQuery](https://jquery.com) и [Bootstrap Datepicker](https://bootstrap-datepicker.readthedocs.io/en/latest/) для добавления мини-календаря. Если вы используете другие библиотеки, код потребуется адаптировать, однако общий подход останется похожим:

1. *Показать date picker при клике по заголовку календаря*

Для начала определите DIV-контейнер для мини-календаря (или другого элемента) внутри заголовка планировщика. Используя [инициализацию через разметку](guides/initialization.md#initializingschedulerviamarkup), это выглядит так:

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

Если вы используете [header config](guides/initialization.md#initializingschedulerviaheaderconfig), добавьте [кастомный элемент](api/config/header.md) следующим образом:

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

Далее, чтобы показывать date picker при клике на дату в панели навигации планировщика, настройте обработчик клика после готовности планировщика:

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

           // центрировать popup под датой
        centerDatepicker($(".dhx_cal_date"));
    });
    ...
    
});
~~~

Функция `centerDatepicker` помогает правильно позиционировать выпадающий date picker:

~~~js
    ...
    function centerDatepicker(referenceElement) {

        if (!$('.datepicker-dropdown').is(':visible')) {
            return;
           }
        // центрировать popup под датой
        var offset = $(".dhx_cal_date").offset();
        var width = $(".dhx_cal_date").width();
        var popupWidth = $(".datepicker-dropdown").width();
        $(".datepicker-dropdown").css({
            top: offset.bottom + "px",
            left: (width - popupWidth) / 2 + "px"
        });
    }
~~~

2. *Обновлять текущую дату планировщика при выборе даты*

После показа date picker обновите дату планировщика при выборе дня:

~~~js
    $node.datepicker().on("changeDate", function () {
        scheduler.setCurrentView($node.datepicker("getDate"));
    });
~~~

3. *Подсветить текущие даты в date picker*

Чтобы выделить даты, которые сейчас отображаются в планировщике, используйте простой CSS-класс:

~~~js
.datepicker table .scheduler-date{
    background-color: #fff3e4;
}
~~~

Всем ячейкам date picker, которые видны в планировщике, присваивается этот класс:

~~~js
    function fillDatepicker(scheduler) {
          // сбросить выделение событий и активных дат
          ...
          $(".datepicker-dropdown").find("[data-date]").removeClass("scheduler-date");

          // выделить дату планировщика
          var visibleDates = getVisibleDates(scheduler);
          visibleDates.forEach(function (date) {
            $(".datepicker-dropdown").find(
                "[data-date='" + date + "']"
            ).addClass("scheduler-date");
          });
          ...
    }
~~~

Чтобы получить текущие видимые даты, используйте `scheduler.getState`:

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

4. *Пометить дни с событиями в date picker*

Чтобы выделить даты, в которые есть события в планировщике, добавьте еще один CSS-класс:

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

Это выделяет даты мини-календаря, в которых есть события.

Чтобы показать тултип с количеством событий при наведении на дату, получите события для месяца, который отображается в date picker:

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

Этот метод получает данные о событиях из планировщика, поэтому выделяются только те события, которые уже загружены. Если ваше приложение использует динамическую загрузку, могут быть показаны не все события, так как загружается только часть. 


В качестве альтернативы можно получать данные о событиях с сервера.

Когда у вас есть временные метки событий и их количество, обновите date picker следующим образом:

~~~js
    function fillDatepicker(scheduler) {
        // сбросить выделение событий и активных дат
        $(".datepicker-dropdown").find("[data-date]").removeClass("has-event");
        $(".datepicker-dropdown").find("[data-date]").removeAttr("title");
        ...

        // выделить события
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

5. *Синхронизировать отображаемую дату с активной датой планировщика*

В завершение, повторно центрируйте date picker при изменении размера окна и обновляйте выделение при изменении даты в picker:

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
        // вызывается через timeout, чтобы код сработал после обновления popup datepicker
        setTimeout(function () {
            fillDatepicker(scheduler);
        });
    }
~~~

Если вы используете отдельный элемент для отображения активной даты планировщика, слушайте событие [onViewChange](api/event/onviewchange.md) и обновляйте метку там:

~~~js
scheduler.attachEvent("onViewChange", function (newMode , newDate){
    const state = scheduler.getState();
    const minDate = state.min_date;
    const maxDate = state.max_date;
    const dateToStr = scheduler.date.str_to_date("%d-%m-%Y");

    $(dateHeader).html(dateToStr(minDate) + " - " + dateToStr(minDate));
});
~~~

Обратите внимание, что этот обработчик не используется в примере, так как встроенный заголовок даты обновляется автоматически. Используйте его только если вы [скрываете стандартный заголовок даты](guides/scheduler-markup.md) или хотите показывать активную дату в нескольких местах.


## В lightbox {#inthelightbox}

Мини-календарь (date picker) можно также использовать внутри lightbox для выбора "начала" и "конца" события.

![in_the_lightbox](/img/in_the_lightbox.png)

Чтобы добавить мини-календарь в lightbox, выполните следующие шаги:

1. Включите расширение на странице:
~~~js
scheduler.plugins({
    minical: true
});
~~~
2. Измените type секции time на calendar_time вместо time:
~~~js
// стандартное определение lightbox
scheduler.config.lightbox.sections="["
  {name:"description", height:200, map_to:"text", type:"textarea", focus:true},
  {name:"time", height:72, type:"time", map_to:"auto"}
];
// изменить type:"time" -> type:"calendar_time"
scheduler.config.lightbox.sections = [
  {name:"description", height:200, map_to:"text", type:"textarea", focus:true},
  {name:"time", height:72, type:"calendar_time", map_to:"auto" }
];
~~~


[Mini calendar in the lightbox](https://docs.dhtmlx.com/scheduler/samples/05_calendar/03_in_form.html)


## Вне планировщика {#outsidethescheduler}

Мини-календарь (date picker) можно разместить в любом месте страницы.

![outside_the_scheduler](/img/outside_the_scheduler.png)

Чтобы добавить мини-календарь в HTML-контейнер вне планировщика, выполните следующие шаги:

1. Включите расширение на странице:
~~~js
scheduler.plugins({
    minical: true
});
~~~
2. Определите контейнер для мини-календаря на странице:
~~~js
<div id="scheduler_here" class="dhx_cal_container" ...>
...
</div>

<div>
        <div id="cal_here"></div>
</div>
~~~
3. Вызовите метод [renderCalendar](api/method/rendercalendar.md) для отображения мини-календаря:
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


## Шаблоны и стили {#templatesandstyles}

### Шаблоны
Вы можете легко изменить отображение дат в мини-календаре (выбор дате) с помощью различных шаблонов, описанных в статье [Шаблоны мини-календаря](guides/mini-calendar-templates.md).

~~~js
scheduler.templates.calendar_month = scheduler.date.date_to_str("%M, %Y");
scheduler.init('scheduler_here',new Date(2019,2,1),"day");
...
const calendar = scheduler.renderCalendar({..});
~~~

![mini_calendar_custom_template](/img/mini_calendar_custom_template.png)

### CSS-классы
Чтобы изменить внешний вид дней в мини-календаре (выбор дате), вы можете переопределить следующие CSS-классы:

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <th>CSS class</th>
  <th>Применяется к</th>
  </thead>
  <tbody>
  <tr>
  <td>.dhx_cal_container.dhx_mini_calendar .dhx_month_head</td>
  <td>ячейка дня</td>
  </tr>
  <tr>
  <td>.dhx_cal_container.dhx_mini_calendar .dhx_month_head.dhx_year_event</td>
  <td>ячейка дня с назначенным событием(ями)</td>
  </tr>
  <tr>
  <td>.dhx_cal_container.dhx_mini_calendar .dhx_now .dhx_month_head</td>
  <td>ячейка дня с текущей датой</td>
  </tr>
  <tr>
  <td>.dhx_cal_container.dhx_mini_calendar .dhx_calendar_click</td>
  <td>ячейка дня с текущей активной датой</td>
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

### Выделение дней с помощью метода markCalendar()
Чтобы назначить определённый CSS-класс дню, вы можете использовать метод [markCalendar](api/method/markcalendar.md):

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
  <td>удаляет ранее созданный мини-календарь</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[isCalendarVisible](api/method/iscalendarvisible.md)</td>
  <td>проверяет, открыт ли календарь в данный момент в планировщике</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[linkCalendar](api/method/linkcalendar.md)</td>
  <td>обеспечивает обновление активной даты в мини-календаре при изменении активной даты в планировщике</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[markCalendar](api/method/markcalendar.md)</td>
  <td>применяет CSS-класс к определённой дате</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[renderCalendar](api/method/rendercalendar.md)</td>
  <td>создаёт мини-календарь</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[unmarkCalendar](api/method/unmarkcalendar.md)</td>
  <td>удаляет CSS-класс с определённой даты</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[updateCalendar](api/method/updatecalendar.md)</td>
  <td>отображает указанную дату в мини-календаре</td>
  </tr>
  </tbody>
</table>

## Обработка событий {#eventhandling}

Мини-календарь поддерживает колбэки для типичных пользовательских действий, таких как смена видимого месяца, наведение курсора на дату и клик по дате. Эти обработчики можно задать в свойстве `events` объекта конфигурации:

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
