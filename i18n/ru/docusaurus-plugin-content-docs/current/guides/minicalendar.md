---
title: "Мини-календарь (Date Picker)"
sidebar_label: "Мини-календарь (Date Picker)"
---

# Мини-календарь (Date Picker)

Мини-календарь (date picker) - это удобное расширение, которое позволяет разместить компактный месячный просмотр внутри HTML-контейнера на вашей странице.

![mini_calendar](/img/mini_calendar.png)


[Мини-календарь без планировщика](https://docs.dhtmlx.com/scheduler/samples/05_calendar/02_without_scheduler.html)


:::note
Чтобы использовать мини-календарь в приложении, подключите на страницу расширение **minical**.
:::


## В заголовке

Чтобы разместить мини-календарь (выбор даты) в заголовке планировщика (как показано на изображении ниже), выполните следующие шаги:

![calendar_in_header](/img/calendar_in_header.png)

1. Подключите файл расширения на страницу:
~~~js
scheduler.plugins({
    minical: true
});
~~~
2. Укажите контейнер для мини-календаря и добавьте его в разметку планировщика:
~~~js
<div class="dhx_cal_navline">
    ...
    <div class="dhx_cal_date"></div>
    <div class="dhx_minical_icon" id="dhx_minical_icon" 
    onclick="show_minical()">&nbsp;</div>
</div>
~~~
3. Обеспечьте логику инициализации (метод [renderCalendar](api/method/rendercalendar.md)) и уничтожения (метод [destroyCalendar](api/method/destroycalendar.md)) мини-календаря:
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


[Мини-календарь в заголовке планировщика](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)


## В заголовке (Сторонний Date Picker) 

В этом разделе покажем, как добавить мини-календарь (выбор даты от сторонних библиотек) в заголовок планировщика.

![custom_minicalendar](/img/custom_minicalendar.png)

**Related sample** [3rd party Mini Calendar in the header](https://snippet.dhtmlx.com/5/0dca14de9)

В нашем примере мы добавим мини-календарь на основе [jQuery](https://jquery.com) и [Bootstrap Datepicker](https://bootstrap-datepicker.readthedocs.io/en/latest/). Если вы используете другие библиотеки, вам потребуется изменить код, но общий подход останется тем же:

1. *Показать выбор даты при клике по заголовку календаря*

Во-первых, нужно определить DIV‑контейнер для мини-календаря (или любого другого элемента управления) в заголовке планировщика.
Если вы используете [маркап-инициализацию](guides/initialization.md#initializing-scheduler-via-markup), вы можете сделать это так, как показано в примере:

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

Если вы используете [header config](guides/initialization.md#initializing-scheduler-via-header-config), вам нужно добавить [настраиваемый элемент](api/config/header.md) туда:

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

Чтобы отображать выбор даты при клике по дате в панели навигации планировщика, инициализируем обработчик клика сразу после готовности планировщика:

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

           // центрируем выпадающий список выборa даты под подписью даты
        centerDatepicker($(".dhx_cal_date"));
    });
    ...
    
});
~~~

`centerDatepicker` — вспомогательная функция, которую мы реализуем для отображения выпадающего выбора даты в нужном месте:

~~~js
    ...
    function centerDatepicker(referenceElement) {

        if (!$('.datepicker-dropdown').is(':visible')) {
            return;
           }
        // центрируем выпадающее окно под меткой даты
        let offset = $(".dhx_cal_date").offset();
        let width = $(".dhx_cal_date").width();
        let popupWidth = $(".datepicker-dropdown").width();
        $(".datepicker-dropdown").css({
            top: offset.bottom + "px",
            left: (width - popupWidth) / 2 + "px"
        });
    }
~~~

2. *Переключать планировщик на выбранную дату, когда пользователь кликает по дате в date picker*

После того как мы отображаем datepicker по запросу, необходимо менять дату планировщика при выборе дня в календаре:

~~~js
    $node.datepicker().on("changeDate", function () {
        scheduler.setCurrentView($node.datepicker("getDate"));
    });
~~~

3. *Подсветить текущие даты в datepicker*

Чтобы подсветить даты date picker'а, которые в данный момент отображаются в планировщике, используем простой CSS‑класс:

~~~js
.datepicker table .scheduler-date{
    background-color: #fff3e4;
}
~~~

Все клетки date picker, которые сейчас видны в планировщике, будут получать этот класс:

~~~js
    function fillDatepicker(scheduler) {
          // сброс подсветки событий и активных дат
          ...
          $(".datepicker-dropdown").find("[data-date]").removeClass("scheduler-date");

          // подсветка даты планировщика
          const visibleDates = getVisibleDates(scheduler);
          visibleDates.forEach(function (date) {
            $(".datepicker-dropdown").find(
                "[data-date='" + date + "']"
            ).addClass("scheduler-date");
          });
          ...
    }
~~~

Чтобы получить даты, которые в данный момент видны, можно использовать `scheduler.getState`:

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

4. *Подсветить дни с событиями в date picker*

Далее, мы хотим, чтобы date picker подсвечивал даты, на которые приходятся события планировщика.
Для этого используем тот же подход, добавив CSS‑класс:

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

Как видно из приведенного выше примера, мы подсвечиваем даты мини-календаря, которые содержат события. Чтобы показать тултип с количеством событий для даты, на которую usuário наводит курсор, нужно получить события месяцев, которые в данный момент отображаются в date picker:

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

В примере выше мы получаем информацию о событиях из планировщика. Это означает, что мы сможем подсветить только те события, которые уже загружены в планировщик. Такой подход не всегда хорош при динамической загрузке, поскольку в плане загружаются лишь небольшая часть всех событий.

Альтернативный подход состоит в запросе данных о событиях с сервера.

Когда у нас есть данные о временных метках клеток, содержащих события, и количестве событий в каждой клетке, мы можем заполнить date picker этой информацией, как в примере:

~~~js
    function fillDatepicker(scheduler) {
        // сброс подсветки событий и активных дат
        $(".datepicker-dropdown").find("[data-date]").removeClass("has-event");
        $(".datepicker-dropdown").find("[data-date]").removeAttr("title");
        ...

        // подсветка событий
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

5. *Синхронизация отображаемой метки даты с активной датой в планировщике*

Наконец, нужно заново центрировать date picker при изменении размера окна и применить подсветку, когда пользователь меняет текущую дату в date picker:

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
        // вызов через timeout, чтобы код сработал после обновления выпадающего окна datepicker
        setTimeout(function () {
            fillDatepicker(scheduler);
        });
    }
~~~

Если вы используете отдельный элемент для отображения активной даты планировщика, вам нужно будет поймать событие [onViewChange](api/event/onviewchange.md) планировщика и обновлять метку даты именно оттуда:

~~~js
scheduler.attachEvent("onViewChange", function (newMode , newDate){
    const state = scheduler.getState();
    const minDate = state.min_date;
    const maxDate = state.max_date;
    const dateToStr = scheduler.date.str_to_date("%d-%m-%Y");

    $(dateHeader).html(dateToStr(minDate) + " - " + dateToStr(minDate));
});
~~~

Обратите внимание, что мы не используем этот обработчик в нашем примере кода, поскольку опираемся на встроенный заголовок даты планировщика, который обновляется автоматически. Такой код следует использовать только если вы [скрываете заголовок даты по умолчанию](guides/scheduler-markup.md#hiding-the-header-of-scheduler), или если вам нужно отображать активную дату в нескольких местах.


## В окне (lightbox)

Мини-календарь (выбор даты) можно использовать во всплывающем окне для выбора дат начала и конца.

![in_the_lightbox](/img/in_the_lightbox.png)

Чтобы разместить мини-календарь во всплывающем окне, выполните следующие шаги:


1. Включите расширение на странице:
~~~js
scheduler.plugins({
    minical: true
});
~~~
2. Установите <i>тип</i> раздела <b>time</b> как <b>calendar_time</b> (вместо <b>time</b>):
~~~js
// дефолтное определение lightbox
scheduler.config.lightbox.sections= [
  {name:"description", height:200, map_to:"text", type:"textarea", focus:true},
  {name:"time", height:72, type:"time", map_to:"auto"}
];
//изменить type:"time" -> type:"calendar_time"
scheduler.config.lightbox.sections = [
  {name:"description", height:200, map_to:"text", type:"textarea", focus:true},
  {name:"time", height:72, type:"calendar_time", map_to:"auto" }
];
~~~


[Мини-календарь во всплывающем окне (lightbox)](https://docs.dhtmlx.com/scheduler/samples/05_calendar/03_in_form.html)


## Вне планировщика

Мини-календарь может располагаться в любом месте на странице.

![outside_the_scheduler](/img/outside_the_scheduler.png)

Чтобы разместить мини-календарь в каком‑либо HTML‑контейнере вне планировщика, выполните следующие шаги:

1. Включите расширение на странице:
~~~js
scheduler.plugins({
    minical: true
});
~~~
2. Укажите контейнер для мини‑календаря на странице:
~~~js
<div id="scheduler_here" class="dhx_cal_container" ...>
...
</div>

<div style='float: left; padding:10px;' >
        <div id="cal_here" style='width:250px;'></div>
</div>
~~~
3. Вызовите метод [renderCalendar](api/method/rendercalendar.md) для отрисовки мини-календаря на странице:
~~~js
const calendar = scheduler.renderCalendar({
    container:"cal_here", 
    navigation:true,
    handler:function(date){
        scheduler.setCurrentView(date, scheduler._mode);
    }
});
~~~


[Мини-календарь вне планировщика](https://docs.dhtmlx.com/scheduler/samples/05_calendar/05_plain_structure.html)


## Шаблоны и стили

### Шаблоны
Чтобы настроить формат отображаемых дат в мини-календаре (выборе даты), можно воспользоваться набором шаблонов, перечисленных в статье [Шаблоны мини‑календаря](guides/mini-calendar-templates.md). 

~~~js
scheduler.templates.calendar_month = scheduler.date.date_to_str("%M, %Y");
scheduler.init('scheduler_here',new Date(2019,2,1),"day");
...
const calendar = scheduler.renderCalendar({..});
~~~

![mini_calendar_custom_template](/img/mini_calendar_custom_template.png)


### CSS‑классы
Чтобы настроить внешний вид дней в мини-календаре (выборе даты), можно переопределить следующие CSS‑классы:

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <th>CSS класс</th>
  <th>Применяется к</th>
  </thead>
  <tbody>
  <tr>
  <td style="width:490px;text-align:left;font-weight: bold;">.dhx_cal_container.dhx_mini_calendar .dhx_month_head</td>
  <td>ячейке дня</td>
  </tr>
  <tr>
  <td style="text-align:left;font-weight: bold;">.dhx_cal_container.dhx_mini_calendar .dhx_month_head.dhx_year_event</td>
  <td>ячейке дня с назначенным событием(ями)</td>
  </tr>
  <tr>
  <td style="text-align:left;font-weight: bold;">.dhx_cal_container.dhx_mini_calendar .dhx_now .dhx_month_head</td>
  <td>ячейке дня с текущей датой</td>
  </tr>
  <tr>
  <td style="text-align:left;font-weight: bold;">.dhx_cal_container.dhx_mini_calendar .dhx_calendar_click</td>
  <td>ячейке дня с выбранной активной датой</td>
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


### Пометка дней с помощью метода markCalendar()
Чтобы присвоить дню пользовательский CSS‑класс, можно использовать метод [markCalendar](api/method/markcalendar.md):

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
  <td>удаляет ранее созданный мини‑календарь</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[isCalendarVisible](api/method/iscalendarvisible.md)</td>
  <td>проверяет, открыт ли календарь в данный момент в планировщике</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[linkCalendar](api/method/linkcalendar.md)</td>
  <td>'говорит' о смене активной даты в мини‑календаре каждый раз, когда изменяется активная дата в планировщике</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[markCalendar](api/method/markcalendar.md)</td>
  <td>применяет CSS‑класс к указанной дате</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[renderCalendar](api/method/rendercalendar.md)</td>
  <td>создает мини‑календарь</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[unmarkCalendar](api/method/unmarkcalendar.md)</td>
  <td>удаляет CSS‑класс с указанной даты</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[updateCalendar](api/method/updatecalendar.md)</td>
  <td>отображает указанную дату в мини‑календаре</td>
  </tr>
  </tbody>
</table>


## Обработчики событий

Мини‑календарь предоставляет обратные вызовы для распространённых действий пользователя, таких как изменение отображаемого месяца, наведение на дату и нажатие по датам. Эти обратные вызовы можно задать в свойстве `events` объекта конфигурации:

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