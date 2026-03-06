---
title: "RTL (Справа налево) режим"
sidebar_label: "RTL (Справа налево) режим"
---

# RTL (Справа налево) режим

Планировщик поддерживает RTL режим, который можно активировать с помощью [rtl configuration option](api/config/rtl.md).

~~~js
scheduler.config.rtl = true;
~~~

После включения RTL режима элементы календаря будут отображаться справа налево по умолчанию, за исключением элементов заголовка планировщика.

![rtl](/img/rtl.png)


[Basic initialization](https://docs.dhtmlx.com/scheduler/samples/14_rtl/01_basic_init.html)


Чтобы изменить порядок элементов заголовка планировщика, необходимо настроить их CSS-классы следующим образом:

~~~js
<style type="text/css" >
    html, body{
        margin:0px;
        padding:0px;
        height:100%;
        overflow:hidden;
    }    
    
      .dhx_cal_prev_button{right: auto !important; left: 16px !important;}
      .dhx_cal_next_button{right: auto !important; left: 148px !important;}
      .dhx_cal_today_button{right: auto !important; left: 57px !important;}
      .dhx_cal_tab[name="day_tab"]{left: auto !important; right: 16px !important;}
      .dhx_cal_tab[name="week_tab"]{left: auto !important; right: 103px !important;}
      .dhx_cal_tab[name="month_tab"]{left: auto !important; right: 192px !important;}
      .dhx_cal_container_rtl  .dhx_cal_tab {
        border-right-style: solid;
        border-right-width: 1px;
       }
</style>
~~~

![reorder_header_rtl](/img/reorder_header_rtl.png)

## Примеры RTL режима

<b>Месячный вид в RTL режиме</b>

Вот как выглядит месячный вид в RTL режиме. Названия и детали событий теперь выравниваются по правой стороне каждого блока события.

![month_view_rtl](/img/month_view_rtl.png)

<b>Окно события в RTL режиме</b>

На изображении ниже показано, как окно деталей события визуально адаптируется при включении RTL режима.

![window_with_details](/img/window_with_details.png)

<b>Таймлайн в RTL режиме</b>

В RTL режиме таймлайны автоматически располагаются справа налево внутри планировщика.

![timeline_rtl](/img/timeline_rtl.png)

## Настройка элементов в RTL режиме

Для уникального оформления отдельных элементов в RTL режиме доступны дополнительные CSS-классы.

Вот классы, которые можно использовать:

- <b>dhx_cal_container_rtl</b> - применяется ко всему контейнеру планировщика
- <b>dhx_tooltip_rtl</b> - применяется к тултипу
- <b>dhx_quick_info_rtl</b> - применяется к всплывающему окну "быстрая информация"
- <b>dhx_cal_light_rtl</b> - применяется к lightbox

Например:

~~~js
.dhx_cal_container_rtl .dhx_cal_event{
    margin-right: -5px;
}
~~~

Этот стиль сдвигает все события планировщика на 5px вправо внутри контейнера.
