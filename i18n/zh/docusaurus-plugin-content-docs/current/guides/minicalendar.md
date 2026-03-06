---
title: "迷你日历（日期选择器）"
sidebar_label: "迷你日历（日期选择器）"
---

# 迷你日历（日期选择器）

迷你日历（日期选择器）是一个实用的扩展，可以让你在页面的 HTML 容器中显示一个紧凑的月份视图。

![mini_calendar](/img/mini_calendar.png)


[Mini calendar without the scheduler](https://docs.dhtmlx.com/scheduler/samples/05_calendar/02_without_scheduler.html)


:::note
要在你的应用中使用迷你日历，请确保在页面上添加 **minical** 扩展。
:::


## 在头部添加 {#intheheader}

要将迷你日历（日期选择器）添加到调度器的头部（如下图所示），请按照以下步骤操作:

![calendar_in_header](/img/calendar_in_header.png)

1. 在页面上引入扩展文件:
~~~js
scheduler.plugins({
    minical: true
});
~~~
2. 定义迷你日历的容器，并将其添加到调度器的标记中:
~~~js
<div class="dhx_cal_navline">
    ...
    <div class="dhx_cal_date"></div>
    <div class="dhx_minical_icon" id="dhx_minical_icon" 
    onclick="show_minical()">&nbsp;</div>
</div>
~~~
3. 实现初始化（使用 [renderCalendar](api/method/rendercalendar.md) 方法）和销毁（使用 [destroyCalendar](api/method/destroycalendar.md) 方法）迷你日历的逻辑:
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


## 在头部集成第三方日期选择器 {#intheheaderthirdpartydatepicker}

本节展示如何将第三方迷你日历（日期选择器）集成到调度器的头部。

![custom_minicalendar](/img/custom_minicalendar.png)

**Related sample** [3rd party Mini Calendar in the header](https://snippet.dhtmlx.com/5/0dca14de9)

我们的示例使用 [jQuery](https://jquery.com) 和 [Bootstrap Datepicker](https://bootstrap-datepicker.readthedocs.io/en/latest/) 来添加迷你日历。如果你使用其他库，需要相应调整代码，但整体思路类似:

1. *点击日历头部时显示日期选择器*

首先，在调度器头部内定义一个用于迷你日历（或其他控件）的 DIV 容器。采用 [标记初始化方式](guides/initialization.md#initializing-scheduler-via-markup) 时，类似如下:

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

如果你使用 [header config](guides/initialization.md#initializing-scheduler-via-header-config)，可以像这样添加 [自定义元素](api/config/header.md):

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

接下来，在调度器准备好后，设置点击调度器导航面板中的日期时显示日期选择器的事件:

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

           // 将弹出层居中显示在日期标签下方
        centerDatepicker($(".dhx_cal_date"));
    });
    ...
    
});
~~~

`centerDatepicker` 函数用于正确定位下拉日期选择器:

~~~js
    ...
    function centerDatepicker(referenceElement) {

        if (!$('.datepicker-dropdown').is(':visible')) {
            return;
           }
        // 将弹出层居中显示在日期标签下方
        var offset = $(".dhx_cal_date").offset();
        var width = $(".dhx_cal_date").width();
        var popupWidth = $(".datepicker-dropdown").width();
        $(".datepicker-dropdown").css({
            top: offset.bottom + "px",
            left: (width - popupWidth) / 2 + "px"
        });
    }
~~~

2. *用户选择日期时更新调度器当前日期*

显示日期选择器后，当选择某天时更新调度器的日期:

~~~js
    $node.datepicker().on("changeDate", function () {
        scheduler.setCurrentView($node.datepicker("getDate"));
    });
~~~

3. *在日期选择器中高亮显示当前日期*

为了突出显示调度器当前显示的日期，可以应用一个简单的 CSS 类:

~~~js
.datepicker table .scheduler-date{
    background-color: #fff3e4;
}
~~~

调度器中可见的所有日期单元格都会添加此类:

~~~js
    function fillDatepicker(scheduler) {
          // 重置高亮事件和活动日期
          ...
          $(".datepicker-dropdown").find("[data-date]").removeClass("scheduler-date");

          // 高亮调度器日期
          var visibleDates = getVisibleDates(scheduler);
          visibleDates.forEach(function (date) {
            $(".datepicker-dropdown").find(
                "[data-date='" + date + "']"
            ).addClass("scheduler-date");
          });
          ...
    }
~~~

要获取当前可见日期，可使用 `scheduler.getState`：

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

4. *在日期选择器中标记有事件的日期*

为了高亮显示调度器中有事件的日期，可以添加另一个 CSS 类:

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

这将高亮显示迷你日历中有事件的日期。

要在鼠标悬停日期时显示事件数量的提示，可以获取当前日期选择器所显示月份的事件:

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

该方法从调度器中获取事件数据，因此只会高亮当前已加载的事件。如果你的应用使用动态加载，可能无法覆盖所有事件，因为只加载了一部分。


另一种方式是从服务器请求事件数据。

获得事件时间戳和数量后，可以如下更新日期选择器:

~~~js
    function fillDatepicker(scheduler) {
        // 重置高亮事件和活动日期
        $(".datepicker-dropdown").find("[data-date]").removeClass("has-event");
        $(".datepicker-dropdown").find("[data-date]").removeAttr("title");
        ...

        // 高亮事件
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

5. *保持显示的日期标签与调度器当前日期同步*

最后，在窗口尺寸变化时重新居中日期选择器，并在用户更改日期时更新高亮:

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
        // 使用 timeout 以确保在日期选择器弹窗更新后执行
        setTimeout(function () {
            fillDatepicker(scheduler);
        });
    }
~~~

如果你使用独立元素显示调度器当前日期，可以监听 [onViewChange](api/event/onviewchange.md) 事件并在其中更新标签:

~~~js
scheduler.attachEvent("onViewChange", function (newMode , newDate){
    const state = scheduler.getState();
    const minDate = state.min_date;
    const maxDate = state.max_date;
    const dateToStr = scheduler.date.str_to_date("%d-%m-%Y");

    $(dateHeader).html(dateToStr(minDate) + " - " + dateToStr(minDate));
});
~~~

请注意，该处理器在示例代码中未使用，因为内置日期头会自动更新。只有在你 [隐藏默认日期头](guides/scheduler-markup.md#hidingtheheaderofscheduler) 或需要在多个地方显示当前日期时，才需要这样做。


## 在弹窗（lightbox）中使用 {#inthelightbox}

迷你日历（日期选择器）也可以在弹窗中用于选择"开始"和"结束"日期。

![in_the_lightbox](/img/in_the_lightbox.png)

要在弹窗中添加迷你日历，请按照以下步骤操作:

1. 在页面上启用扩展:
~~~js
scheduler.plugins({
    minical: true
});
~~~
2. 将 time 区块的 type 属性从 time 修改为 calendar_time:
~~~js
// 默认弹窗配置
scheduler.config.lightbox.sections="["
  {name:"description", height:200, map_to:"text", type:"textarea", focus:true},
  {name:"time", height:72, type:"time", map_to:"auto"}
];
// 修改 type:"time" -> type:"calendar_time"
scheduler.config.lightbox.sections = [
  {name:"description", height:200, map_to:"text", type:"textarea", focus:true},
  {name:"time", height:72, type:"calendar_time", map_to:"auto" }
];
~~~


[Mini calendar in the lightbox](https://docs.dhtmlx.com/scheduler/samples/05_calendar/03_in_form.html)


## 在调度器外部使用 {#outsidethescheduler}

迷你日历（日期选择器）可以放置在页面的任意位置。

![outside_the_scheduler](/img/outside_the_scheduler.png)

要在调度器外的 HTML 容器中添加迷你日历，请按照以下步骤操作:

1. 在页面上启用扩展:
~~~js
scheduler.plugins({
    minical: true
});
~~~
2. 在页面上定义迷你日历的容器:
~~~js
<div id="scheduler_here" class="dhx_cal_container" ...>
...
</div>

<div>
        <div id="cal_here"></div>
</div>
~~~
3. 调用 [renderCalendar](api/method/rendercalendar.md) 方法来渲染迷你日历:
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


## 模板与样式 {#templatesandstyles}

### 模板
您可以通过使用 [Mini Calendar Templates](guides/mini-calendar-templates.md) 文章中描述的各种模板，轻松更改日期在迷你日历（日期选择器）中的显示方式。

~~~js
scheduler.templates.calendar_month = scheduler.date.date_to_str("%M, %Y");
scheduler.init('scheduler_here',new Date(2019,2,1),"day");
...
const calendar = scheduler.renderCalendar({..});
~~~

![mini_calendar_custom_template](/img/mini_calendar_custom_template.png)

### CSS 类
要调整迷你日历（日期选择器）中日期的外观，您可以覆盖以下 CSS 类:

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <th>CSS 类</th>
  <th>应用于</th>
  </thead>
  <tbody>
  <tr>
  <td>.dhx_cal_container.dhx_mini_calendar .dhx_month_head</td>
  <td>单天的单元格</td>
  </tr>
  <tr>
  <td>.dhx_cal_container.dhx_mini_calendar .dhx_month_head.dhx_year_event</td>
  <td>带有分配事件的单天单元格</td>
  </tr>
  <tr>
  <td>.dhx_cal_container.dhx_mini_calendar .dhx_now .dhx_month_head</td>
  <td>当前日期的单天单元格</td>
  </tr>
  <tr>
  <td>.dhx_cal_container.dhx_mini_calendar .dhx_calendar_click</td>
  <td>当前活动日期的单天单元格</td>
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

### 使用 markCalendar() 方法标记日期
要为某一天分配特定的 CSS 类，可以使用 [markCalendar](api/method/markcalendar.md) 方法:

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
  <td>移除先前创建的迷你日历</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[isCalendarVisible](api/method/iscalendarvisible.md)</td>
  <td>检查日历当前是否在调度器中打开</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[linkCalendar](api/method/linkcalendar.md)</td>
  <td>确保当调度器的活动日期变化时，迷你日历的活动日期也会更新</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[markCalendar](api/method/markcalendar.md)</td>
  <td>为指定日期应用 CSS 类</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[renderCalendar](api/method/rendercalendar.md)</td>
  <td>创建一个迷你日历</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[unmarkCalendar](api/method/unmarkcalendar.md)</td>
  <td>移除指定日期的 CSS 类</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[updateCalendar](api/method/updatecalendar.md)</td>
  <td>在迷你日历中显示指定日期</td>
  </tr>
  </tbody>
</table>

## 事件处理 {#eventhandling}

迷你日历支持对典型用户交互的回调，如更改可见月份、悬停日期和点击日期。这些可以在配置对象的 `events` 属性中设置:

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
