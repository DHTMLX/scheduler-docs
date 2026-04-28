--- 
title: "미니 달력(날짜 선택기)"
sidebar_label: "미니 달력(날짜 선택기)"
---

# 미니 달력(날짜 선택기)

미니 달력(날짜 선택기)은 페이지의 HTML 컨테이너에 작은 달 뷰를 렌더링할 수 있도록 하는 특수 확장 기능입니다.

![mini_calendar](/img/mini_calendar.png)


[스케줄러 없이 미니 달력](https://docs.dhtmlx.com/scheduler/samples/05_calendar/02_without_scheduler.html)


:::note
앱에서 미니 달력을 사용하려면 페이지에 **minical** 확장을 포함하세요.
 :::


## 헤더에서

스케줄러의 헤더에 미니 달력(날짜 선택기)을 배치하려면 아래의 절차를 따르십시오(아래 그림 참조):

![calendar_in_header](/img/calendar_in_header.png)

1. 페이지에 확장 파일을 포함합니다:
~~~js
scheduler.plugins({
    minical: true
});
~~~
2. 미니 달력의 컨테이너를 지정하고 스케줄러 마크업에 추가합니다:
~~~js
<div class="dhx_cal_navline">
    ...
    <div class="dhx_cal_date"></div>
    <div class="dhx_minical_icon" id="dhx_minical_icon" 
    onclick="show_minical()">&nbsp;</div>
</div>
~~~
3. 미니 달력을 초기화(renderCalendar)하고 파괴(destroyCalendar)하는 로직을 제공합니다:
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

[스케줄러 헤더의 미니 달력](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)


## 헤더 안에서(Third-party Date Picker)

이 섹션에서는 스케줄러의 헤더에 타사 미니 달력(날짜 선택기)을 추가하는 방법을 보여드립니다.

![custom_minicalendar](/img/custom_minicalendar.png)

관련 샘플 [3rd party Mini Calendar in the header](https://snippet.dhtmlx.com/5/0dca14de9)

샘플에서는 [jQuery](https://jquery.com)와 [Bootstrap Datepicker](https://bootstrap-datepicker.readthedocs.io/en/latest/)를 기반으로 미니 달력을 추가합니다. 다른 라이브러리를 사용하시는 경우에도 코드를 수정해야 할 수 있지만 주된 접근 방식은 동일하게 유지됩니다:

1. *헤더를 클릭할 때 날짜 선택기를 표시*

우선, 미니 달력의 DIV 컨테이너(또는 다른 컨트롤)를 스케줄러 헤더에 정의해야 합니다. 초기화에 대한 [마크업 방식(markup approach)으로의 초기화](guides/initialization.md#initializing-scheduler-via-markup)을 사용하는 경우, 아래와 같이 할 수 있습니다:

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

만약 [header config](guides/initialization.md#initializing-scheduler-via-header-config)를 사용한다면, 커스텀 요소를 추가해야 합니다:

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

날짜를 탐색 패널의 날짜를 클릭하면 날짜 선택기를 표시하도록 하려면, 스케줄러가 준비되자마자 클릭 이벤트를 초기화합니다:

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

           // date 라벨 아래에 팝업 중앙 정렬
        centerDatepicker($(".dhx_cal_date"));
    });
    ...
    
});
~~~

`centerDatepicker`는 필요한 위치에 드롭다운 날짜 선택기를 렌더링하기 위해 우리가 구현하는 보조 함수입니다:

~~~js
    ...
    function centerDatepicker(referenceElement) {

        if (!$('.datepicker-dropdown').is(':visible')) {
            return;
           }
        // date 라벨 아래에 팝업 중앙 정렬
        let offset = $(".dhx_cal_date").offset();
        let width = $(".dhx_cal_date").width();
        let popupWidth = $(".datepicker-dropdown").width();
        $(".datepicker-dropdown").css({
            top: offset.bottom + "px",
            left: (width - popupWidth) / 2 + "px"
        });
    }
~~~

2. *사용자가 날짜 선택기에 날짜를 클릭하면 스케줄러를 선택된 날짜로 전환합니다*

날짜 선택기를 필요에 따라 표시한 뒤, 달력에서 날짜를 선택하면 스케줄러의 날짜를 변경해야 합니다:

~~~js
    $node.datepicker().on("changeDate", function () {
        scheduler.setCurrentView($node.datepicker("getDate"));
    });
~~~ 

3. *날짜 선택기에 현재 날짜를 하이라이트*

날짜 선택기에 현재 스케줄러에 표시된 날짜를 하이라이트하려면 간단한 CSS 클래스를 사용합니다:

~~~js
.datepicker table .scheduler-date{
    background-color: #fff3e4;
}
~~~

달력 안의 모든 셀 중에서 현재 스케줄러에 표시되는 날짜는 이 클래스를 받게 됩니다:

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

스케줄러에서 현재 보이는 날짜를 얻으려면 `scheduler.getState`를 사용할 수 있습니다:

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

4. *날짜 선택기에서 이벤트가 있는 날짜를 하이라이트*

다음으로, 이벤트가 있는 날짜를 하이라이트하도록 합니다. 이를 위해서는 위와 동일한 방식으로 CSS 클래스를 추가합니다:

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

위 예시에서 보듯, 미니 달력에서 이벤트가 있는 날짜를 하이라이트합니다.

마우스를 올려 놓으면 해당 날짜의 이벤트 수를 표시하는 툴팁을 보려면, 날짜 선택기에 현재 보이는 월의 이벤트를 가져와야 합니다:

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

위 예제에서 이벤트 정보는 스케줄러로부터 가져옵니다. 즉, 이미 로드된 이벤트만 하이라이트할 수 있습니다. 동적 로딩을 사용하는 경우 전체 이벤트 중 일부만 스케줄러에 로드되므로 이 방식은 특히 성능에 불리할 수 있습니다.

대안은 서버로부터 이벤트 데이터를 요청하는 것입니다.

이벤트가 포함된 셀의 타임스탬프와 셀당 이벤트 수에 대한 데이터가 있을 때, 이를 이용해 날짜 선택기에 이 정보를 채워 넣을 수 있습니다, 예시는 다음과 같습니다:

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

5. *스케줄러의 활성 날짜와 날짜 선택기의 표시 라벨을 동기화*

마지막으로, 창 크기가 바뀌거나 사용자가 날짜 선택기에서 현재 날짜를 바꿀 때 날짜 선택기를 다시 중심에 맞추고 하이라이트를 적용해야 합니다:

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
        // call from timeout so code fires after the datepicker popup is updated
        setTimeout(function () {
            fillDatepicker(scheduler);
        });
    }
~~~

별도의 요소를 사용해 스케줄러의 활성 날짜를 표시하는 경우, [onViewChange](api/event/onviewchange.md) 이벤트를 캡처하고 거기서 날짜 레이블을 업데이트해야 합니다:

~~~js
scheduler.attachEvent("onViewChange", function (newMode , newDate){
    const state = scheduler.getState();
    const minDate = state.min_date;
    const maxDate = state.max_date;
    const dateToStr = scheduler.date.str_to_date("%d-%m-%Y");

    $(dateHeader).html(dateToStr(minDate) + " - " + dateToStr(minDate));
});
~~~

참고로, 기본 날짜 헤더가 자동으로 업데이트되도록 코드를 구성하였으므로 본 코드 샘플에서는 이 핸들러를 사용하지 않습니다. 기본 날짜 헤더를 숨겼거나(active date를 여러 위치에 표시해야 하는 경우 등) 이 필요가 있을 때만 이러한 코드를 사용해야 합니다. 
계속하여 사용하면 됩니다.

## 라이트박스에서

미니 달력(날짜 선택기)은 시작 날짜와 종료 날짜를 선택하기 위한 라이트박스에서도 사용할 수 있습니다.

![in_the_lightbox](/img/in_the_lightbox.png)

미니 달력을 라이트박스에 배치하려면 아래 절차를 따르세요:

1. 페이지에서 확장을 활성화합니다:
~~~js
scheduler.plugins({
    minical: true
});
~~~
2. 시간 섹션의 <i>type</i>을 <b>calendar_time</b>으로 설정합니다(대신 <b>time</b>이 아닌):
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


[미니 달력 라이트박스에서](https://docs.dhtmlx.com/scheduler/samples/05_calendar/03_in_form.html)


## 스케줄러 밖에서

미니 달력(날짜 선택기)은 페이지의 어떤 위치에서도 사용할 수 있습니다.

![outside_the_scheduler](/img/outside_the_scheduler.png)

스케줄러 외부의 HTML 컨테이너에 미니 달력을 배치하려면 아래의 절차를 따르십시오:

1. 페이지에서 확장을 활성화합니다:
~~~js
scheduler.plugins({
    minical: true
});
~~~
2. 페이지의 미니 달력 컨테이너를 지정합니다:
~~~js
<div id="scheduler_here" class="dhx_cal_container" ...>
...
</div>

<div style='float: left; padding:10px;'>
        <div id="cal_here" style='width:250px;'></div>
</div>
~~~
3. 페이지에 미니 달력을 렌더링(renderCalendar)하는 메서드를 호출합니다:
~~~js
const calendar = scheduler.renderCalendar({
    container:"cal_here", 
    navigation:true,
    handler:function(date){
        scheduler.setCurrentView(date, scheduler._mode);
    }
});
~~~


[미니 달력 스케줄러 밖 샘플](https://docs.dhtmlx.com/scheduler/samples/05_calendar/05_plain_structure.html)


## 템플릿과 스타일

### 템플릿
미니 달력(날짜 선택기)에 표시되는 날짜 형식을 사용자 정의하려면 [미니 달력 템플릿(Mini Calendar Templates)](guides/mini-calendar-templates.md) 문서에 나열된 여러 템플릿을 사용할 수 있습니다.

~~~js
scheduler.templates.calendar_month = scheduler.date.date_to_str("%M, %Y");
scheduler.init('scheduler_here',new Date(2019,2,1),"day");
...
const calendar = scheduler.renderCalendar({..});
~~~

![mini_calendar_custom_template](/img/mini_calendar_custom_template.png)


### CSS 클래스
미니 달력(날짜 선택기)의 날짜 모양을 사용자 정의하려면 아래의 CSS 클래스를 재정의하면 됩니다:

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <th>CSS class</th>
  <th>Applied to</th>
  </thead>
  <tbody>
  <tr>
  <td style="width:490px;text-align:left;font-weight: bold;">.dhx_cal_container.dhx_mini_calendar .dhx_month_head</td>
  <td>a day's cell</td>
  </tr>
  <tr>
  <td style="text-align:left;font-weight: bold;">.dhx_cal_container.dhx_mini_calendar .dhx_month_head.dhx_year_event</td>
  <td>a day's cell with the assigned event(s)</td>
  </tr>
  <tr>
  <td style="text-align:left;font-weight: bold;">.dhx_cal_container.dhx_mini_calendar .dhx_now .dhx_month_head</td>
  <td>a day's cell with the current date</td>
  </tr>
  <tr>
  <td style="text-align:left;font-weight: bold;">.dhx_cal_container.dhx_mini_calendar .dhx_calendar_click</td>
  <td>a day's cell with the currently active date</td>
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
날짜에 사용자 정의 CSS 클래스를 지정하려면 [markCalendar](api/method/markcalendar.md) 메서드를 사용할 수 있습니다:

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
  <td>destroys the previously created mini-calendar</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[isCalendarVisible](api/method/iscalendarvisible.md)</td>
  <td>checks whether the calendar is currently opened in the scheduler</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[linkCalendar](api/method/linkcalendar.md)</td>
  <td>'says' to change the active date in the mini calendar each time the active date in the scheduler is changed</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[markCalendar](api/method/markcalendar.md)</td>
  <td>applies a CSS class to the specified date</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[renderCalendar](api/method/rendercalendar.md)</td>
  <td>creates a mini calendar</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[unmarkCalendar](api/method/unmarkcalendar.md)</td>
  <td>removes a CSS class from the specified date</td>
  </tr>
  <tr>
  <td class="webixdoc_links0">[updateCalendar](api/method/updatecalendar.md)</td>
  <td>displays the specified date in the mini calendar</td>
  </tr>
  </tbody>
</table>


## 이벤트 핸들링

미니 달력은 보이는 달을 변경하거나, 날짜 위에 마우스를 올리거나 날짜를 클릭하는 등의 일반적인 사용자 동작에 대한 콜백을 제공합니다. 이러한 콜백은 구성 객체의 `events` 속성에 지정할 수 있습니다:

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