---
title: "RTL (Right-to-left) режим"
sidebar_label: "RTL (Right-to-left) режим"
---

# RTL (Right-to-left) режим

Вы можете включить режим RTL для планировщика через опцию конфигурации [rtl](api/config/rtl.md).

~~~js
scheduler.config.rtl = true;
~~~

После внедрения режима RTL все элементы календаря будут автоматически отображаться справа налево, за исключением элементов заголовка планировщика.

![rtl](/img/rtl.png)


[Базовая инициализация](https://docs.dhtmlx.com/scheduler/samples/14_rtl/01_basic_init.html)


Чтобы поменять порядок элементов заголовка планировщика, необходимо переопределить CSS-классы элементов, как показано:

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

## Примеры режима RTL

<b>Просмотр месяца в режиме RTL</b>

Давайте посмотрим, как выглядит просмотр месяца в режиме RTL. Заголовки событий и их детали теперь располагаются справа от блока события.

![month_view_rtl](/img/month_view_rtl.png)

<b>Окно события в режиме RTL</b>

Ниже приведён хороший пример того, как внешний вид окна с деталями события изменяется после применения режима RTL на изображении ниже.

![window_with_details](/img/window_with_details.png)

<b>Таймлайн в режиме RTL</b>

Режим RTL автоматически располагает таймлайны в планировщике справа налево.

![timeline_rtl](/img/timeline_rtl.png)

## Настройка элементов в режиме RTL

Вы можете использовать дополнительные CSS-классы для применения уникальных стилей к отдельным элементам в режиме RTL.

Это список CSS-классов, которые можно задать:

- <b>dhx_cal_container_rtl</b> - применяет стили ко всему контейнеру
- <b>dhx_tooltip_rtl</b> - применяет стили к тултипу
- <b>dhx_quick_info_rtl</b> - применяет стили к всплывающему окну 'быстрая информация'
- <b>dhx_cal_light_rtl</b> - применяет стили к лайтбоксу

Например:

~~~css
.dhx_cal_container_rtl .dhx_cal_event{
    margin-right: -5px;
}
~~~

Все события контейнера планировщика перемещены на 5px вправо.