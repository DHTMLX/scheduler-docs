---
title: "Мобильная адаптивность Scheduler"
sidebar_label: "Мобильная адаптивность Scheduler"
---

# Мобильная адаптивность Scheduler

dhtmlxScheduler поддерживает сенсорные устройства, такие как:

- устройства iOS (iPad, iPhone, iPod);
- планшеты и мониторы с сенсорным экраном на Windows 10;
- устройства Android.

_Сcheduler также работает на смартфонах, но из-за ограниченного пространства экрана может потребоваться дополнительная настройка._

**Полезные советы!**


+ Поддержка сенсорных экранов включена по умолчанию и работает во всех режимах Scheduler.
+ Для приложений, ориентированных на сенсорные устройства, настоятельно рекомендуется использовать ['material' skin](guides/skins.md#materialskin), поскольку он предлагает крупные, удобные для нажатия кнопки.
+ Если вы ожидаете пользователей с мобильных устройств, обычно разумно добавить [Quick Info](guides/extensions-list.md#quickinfo).
+ Добавление следующего meta-тега на страницу увеличит элементы Scheduler и упростит взаимодействие с ними:
  
~~~js
<meta name="viewport" content="width="device-width," initial-scale="1"">
~~~

## Адаптивный макет {#responsivelayout}

Когда вы [инициализируете Scheduler с помощью свойства конфигурации header](guides/initialization.md#initializingschedulerviaheaderconfig), вы можете выбрать макет header, который подходит для размера экрана клиента.
Также применяются стили, корректирующие размеры элементов и шрифтов для небольших экранов.


### Header

Например, вы можете разделить header на несколько строк:

![header_responsive](/img/header_responsive.png)

На скриншоте выше показан Scheduler на небольшом экране.

Эту настройку можно менять динамически, поэтому вы можете определить разные конфигурации header для больших и маленьких экранов:

~~~js
// определяем конфигурации
const compactHeader = {
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
            
const fullHeader = [
    "day",
    "week",
    "month",
    "date",
    "prev",
    "today",
    "next"
];

// добавляем переключатель для выбора подходящей конфигурации в зависимости от размера экрана

function resetConfig(){
    let header;
    if (window.innerWidth < 1000) {
        header = compactHeader;
    } else {
        header = fullHeader;
    
    }
    scheduler.config.header = header;
    return true;
}

// применяем конфигурацию при инициализации и каждый раз при перерисовке или изменении размера Scheduler:

resetConfig();
scheduler.attachEvent("onBeforeViewChange", resetConfig);
scheduler.attachEvent("onSchedulerResize", resetConfig);

scheduler.config.responsive_lightbox = true; // адаптивный lightbox

scheduler.init("scheduler_here");
~~~


[Responsive scheduler](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/13_touch_ui.html)


### Lightbox

API Scheduler включает опцию [responsive_lightbox](api/config/responsive_lightbox.md), чтобы lightbox адаптировался к разным размерам экранов.

~~~~js
scheduler.config.responsive_lightbox = true; //по умолчанию выключено
//установите true для включения адаптивности lightbox
~~~~

Вот как lightbox изменяется на небольших экранах:

![lightbox_responsive](/img/lightbox_responsive.png)


[Responsive scheduler](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/13_touch_ui.html)


Вы можете настроить внешний вид lightbox в адаптивном режиме. В этом режиме он получает дополнительный CSS-класс <b>dhx_cal_light_responsive</b>, который можно использовать в ваших стилях.

По умолчанию этот класс содержит media-запросы, которые применяются только на небольших экранах (менее 1024px), что позволяет вам изменять внешний вид lightbox на этих устройствах.

## Опции конфигурации для сенсорных устройств {#touchconfigurationoptions}

Ниже приведены опции конфигурации, связанные с мобильной поддержкой и адаптивностью:

- [header](api/config/header.md) - управляет макетом header
- [touch](api/config/touch.md) - включает или отключает поддержку сенсорных экранов в Scheduler
- [touch_drag](api/config/touch_drag.md) - задаёт время в миллисекундах для различения долгого нажатия и прокрутки
- [touch_tip](api/config/touch_tip.md) - включает или отключает всплывающие сообщения в правом верхнем углу
- [touch_swipe_dates](api/config/touch_swipe_dates.md) - включает или отключает свайпы для переключения дат
- [responsive_lightbox](api/config/responsive_lightbox.md) - включает адаптивные стили для lightbox (по умолчанию выключено)


## Сенсорные жесты в Scheduler {#touch-gestures-in-the-scheduler}

- **Двойное нажатие** - работает как двойной клик, открывая редактирование или создание события;
- **Долгое нажатие и перетаскивание** - используется для перемещения или создания событий;
- **Свайп** - переключает представление на следующий или предыдущий временной промежуток ([по умолчанию выключено](api/config/touch_swipe_dates.md)).

## Расширение 'Quick info' {#quickinfoextension}

Для улучшения работы на сенсорных устройствах библиотека включает расширение ["Quick Info"](guides/extensions-list.md#quickinfo).

Это расширение заменяет стандартные кнопки боковой панели и маленькую форму редактирования (которые трудно нажимать на сенсорных устройствах) на более крупные и удобные элементы управления.

Чтобы включить режим Scheduler с большими кнопками, добавьте расширение ["Quick Info"](guides/extensions-list.md#quickinfo) на страницу:

~~~js
<script>
    scheduler.plugins({
        quick_info: true
    });
    scheduler.init('scheduler_here',new Date(2019,5,30),"day");
      ...
<script>
~~~


[Touch-oriented scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/29_quick_info.html)


После активации Scheduler заменяет стандартные кнопки на более крупные:

![quick_info_extension.png](/img/quick_info_extension.png)

:::note
Обратите внимание, что боковое меню выбора quick-info и меню выбора в стандартном Scheduler используют одну и ту же конфигурацию, описанную в [icons_select](api/config/icons_select.md).
:::


Расширение предоставляет:


- **3 шаблона** 

- [quick_info_content](api/template/quick_info_content.md) - определяет содержимое всплывающей формы редактирования
- [quick_info_date](api/template/quick_info_date.md) - определяет отображаемую дату во всплывающей форме
- [quick_info_title](api/template/quick_info_title.md) - определяет заголовок всплывающей формы

- **1 опция конфигурации**

- [quick_info_detached](api/config/quick_info_detached.md) - управляет тем, появляется ли форма события сбоку экрана или рядом с выбранным событием


- **2 метода** 

- [hideQuickInfo](api/method/hidequickinfo.md) - скрывает всплывающую форму события, если она открыта
- [showQuickInfo](api/method/showquickinfo.md) - показывает всплывающую форму события для конкретного события


- **2 события**

- [onQuickInfo](api/event/onquickinfo.md) - срабатывает при появлении всплывающей формы редактирования
- [onAfterQuickInfo](api/event/onafterquickinfo.md) - срабатывает после закрытия всплывающей формы события
