---
title: "dhtmlxScheduler на чистом JS/HTML"
sidebar_label: "Быстрый старт"
---

import { FrameworkIcon } from '@site/src/components/FrameworkIcon';

# dhtmlxScheduler на чистом JS/HTML

Когда вы разрабатываете приложение с dhtmlxScheduler, первым делом нужно инициализировать его, или, проще говоря, отобразить Scheduler на странице.

Этот гид рассказывает об инициализации dhtmlxScheduler в простом JS и HTML. Вы также можете ознакомиться с руководствами по интеграции с фронтенд-фреймворками:

<div className="framework-grid">

  <a className="framework-card" href="../../integrations/react/quick-start/">
    <FrameworkIcon name="react" className="framework-icon" />
    <div className="framework-title">React</div>
    <div className="framework-desc">
      Используйте готовый компонент <code>ReactScheduler</code> с пропсами и событиями.
    </div>
  </a>

  <a className="framework-card" href="../../integrations/angular/howtostart-angular/">
    <FrameworkIcon name="angular" className="framework-icon" />
    <div className="framework-title">Angular</div>
    <div className="framework-desc">
      Интегрируйте Scheduler в проекты на Angular с помощью тонкого обертчика.
    </div>
  </a>

  <a className="framework-card" href="../../integrations/vue/howtostart-vue/">
    <FrameworkIcon name="vue" className="framework-icon" />
    <div className="framework-title">Vue</div>
    <div className="framework-desc">
      Используйте Scheduler во Vue-приложениях с небольшой обёрткой и реактивной конфигурацией.
    </div>
  </a>

  <a className="framework-card" href="../../integrations/svelte/howtostart-svelte/">
    <FrameworkIcon name="svelte" className="framework-icon" />
    <div className="framework-title">Svelte</div>
    <div className="framework-desc">
      Встраивайте Scheduler в Svelte с помощью простого компонента, который привязывает конфигурацию и события.
    </div>
  </a>

  <a className="framework-card" href="../../integrations/salesforce/howtostart-salesforce/">
    <FrameworkIcon name="salesforce" className="framework-icon" />
    <div className="framework-title">Salesforce</div>
    <div className="framework-desc">
      Используйте Scheduler в Salesforce Lightning Web Components и подключайте его к данным организации.
    </div>
  </a>

</div>


Существует два способа инициализации scheduler на странице:

- [через разметку Scheduler](#initializing-scheduler-via-markup)
- [через свойство конфигурации заголовка](#initializing-scheduler-via-header-config)

## Инициализация Scheduler через разметку

Чтобы отобразить базовый Scheduler на странице через разметку, выполните 3 шага:

1. Подключите файлы кода dhtmlxScheduler на страницу.
2. Создайте DIV‑контейнер на странице и определите соответствующие DIV‑контейнеры для его элементов.
3. Инициализируйте dhtmlxScheduler в созданном контейнере с помощью метода [init](api/method/init.md). В качестве параметра метод принимает HTML‑контейнер (или его ID), в который будет отображаться Scheduler.

~~~html
<!DOCTYPE html>
<html>
<head>
   <script src="../scheduler/dhtmlxscheduler.js" type="text/javascript"></script>
   <link rel="stylesheet" href="../scheduler/dhtmlxscheduler.css" 
        type="text/css">
</head>
<body>
    <!--Контейнер для планировщика и стандартный набор 'div'-->
   <div id="scheduler_here" class="dhx_cal_container">
        <div class="dhx_cal_navline">
            <div class="dhx_cal_prev_button">&nbsp;</div>
            <div class="dhx_cal_next_button">&nbsp;</div>
            <div class="dhx_cal_today_button"></div>
            <div class="dhx_cal_date"></div>
            <div class="dhx_cal_tab" data-tab="day"></div>
            <div class="dhx_cal_tab" data-tab="week" ></div>
               <div class="dhx_cal_tab" data-tab="month"></div>
           </div>
        <div class="dhx_cal_header"></div>
        <div class="dhx_cal_data"></div>       
   </div>
   <script type="text/javascript">
     scheduler.init("scheduler_here"); /*!*/
   </script>
</body>
</html>
~~~

![Scheduler initialization](/img/init_scheduler_front.png)

[Базовая инициализация](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)

## Инициализация Scheduler через конфигурацию заголовка

Вы должны инициализировать Scheduler таким способом, чтобы сделать его [адаптивным](guides/initialization.md#making-scheduler-responsive).

Чтобы отобразить базовый Scheduler на странице, выполните следующие шаги:

1. Подключите файлы кода dhtmlxScheduler на страницу.
2. Создайте DIV‑контейнер на странице.
3. Укажите структуру Scheduler в конфигурационном объекте [header](api/config/header.md). 
4. Инициализируйте dhtmlxScheduler в созданном ранее контейнере с помощью метода [init](api/method/init.md). В качестве параметра метод принимает HTML‑контейнер (или его ID), в который будет отображаться Scheduler.

~~~html
<!DOCTYPE html>
<html>
<head>
   <script src="../scheduler/dhtmlxscheduler.js"></script>
   <link rel="stylesheet" href="../scheduler/dhtmlxscheduler.css" 
        type="text/css">
</head>
<body>
   <!--Контейнер для планировщика-->
   <div id="scheduler_here">
   </div>
</body>   
<script>
    //Структура планировщика
    scheduler.config.header = [
        "day",
        "week",
        "month",
        "date",
        "prev",
        "today",
        "next"
    ];
    scheduler.init('scheduler_here',new Date(2027,0,1),"week"); /*!*/
</script>
</html>
~~~


[Адаптивный Scheduler](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/13_touch_ui.html)

## Необходимые файлы кода

Необходимые файлы кода:

- dhtmlxscheduler.js
- dhtmlxscheduler.css (также можно [изучить доступные скины](guides/skins.md))

~~~html
<script src="../scheduler/dhtmlxscheduler.js"></script>
<link rel="stylesheet" href="../scheduler/dhtmlxscheduler.css" type="text/css">
~~~

Давайте быстро исследуем структуру пакета dhtmlxScheduler, чтобы узнать, где искать файлы.

- <b>sources</b> - исходные файлы библиотеки. Файлы не минифицированы и читаются легко. Пакет в основном предназначен для отладки компонентов.
:::note
Обратите внимание, что в версии **Trial** библиотеки Scheduler папка **sources** отсутствует.
:::
- <b>samples</b> - примеры кода.
- <b>codebase</b> - упакованные файлы кода библиотеки. Эти файлы имеют значительно меньший размер и предназначены для использования в продакшне. <b>В ваших приложениях вам нужно использовать файлы из этой папки.</b>

## Размеры планировщика {#schedulersizing}

Scheduler занимает весь размер своего контейнера (*scheduler_here* див в приведённом выше примере) без его расширения.
Это означает, что если вы не укажете высоту контейнера или установите её в 0, scheduler также будет иметь нулевую высоту и не будет отображаться.

В наших примерах мы обычно делаем Scheduler полноэкранным, устанавливая ширину и высоту 100% для и тела документа, и для контейнера Scheduler:

~~~html
<style>
    html, body{
        margin:0px;
        padding:0px;
        height:100%;
        overflow:hidden;
    }
</style>
</head>
<body>
 <div id="scheduler_here" class="dhx_cal_container" style="width:100%; height:100%;">
~~~

Это легко может пойти не так, если поместить элемент *scheduler_here* внутрь div с размерами по умолчанию:

~~~html
<style>
    html, body{
        margin:0px;
        padding:0px;
        height:100%;
        overflow:hidden;
    }
</style>
</head>
<body>
 <div class="outer_container"> /*!*/
   <div id="scheduler_here" class="dhx_cal_container" style="width:100%;height:100%;">
~~~

Scheduler не будет корректно отображаться в этом случае, потому что "scheduler_here" установлен на 100% от размера родителя, а размер родителя не задан.

Если вы используете относительные размеры (%, проценты) для элемента *.dhx_cal_container*, убедитесь, что у его родителя также задана высота. Иначе итоговая высота может оказаться нулевой, и Scheduler не будет отображаться.

Или можно использовать разные единицы измерения для основных размеров div планировщика. Следующие элементы будут иметь ожидаемые размеры независимо от стилей внешних элементов:

~~~html
<div id="scheduler_here" class="dhx_cal_container" style="width:100%; height:100vh;">
~~~

или:

~~~html
<div id="scheduler_here" class="dhx_cal_container" style="width:100%; height:800px;">
~~~

### Автоматическое изменение размера планировщика {#containerautoresizing}

Расширение **container_autoresize** для dhtmlxScheduler изменяет поведение изменения размера по умолчанию у планировщика. По умолчанию dhtmlxScheduler автоматически подгоняет размер под контейнер и использует внутренние полосы прокрутки, чтобы все данные были доступны внутри фиксированного размера контейнера.

Когда включено расширение **container_autoresize**, Scheduler динамически изменяет размер, чтобы вместить всё содержимое. Это означает, что Scheduler будет расширяться по высоте и/или ширине, чтобы отобразить все события и данные без необходимости внутренних полос прокрутки.

Это поведение обеспечивает видимость всего содержимого без прокрутки внутри планировщика, что делает его идеальным для случаев, когда требуется полная видимость содержимого планировщика без ручной прокрутки.

#### Использование

Чтобы включить расширение **container_autoresize**, добавьте его в настройку планировщика следующим образом:

~~~js
scheduler.plugins({
    container_autoresize: true
});
~~~


[Autoresizing the scheduler container](https://docs.dhtmlx.com/scheduler/samples/03_extensions/28_container_autoresize.html)

Это простое изменение конфигурации активирует поведение **container_autoresize**, позволяющее Scheduler подстраивать размер под содержимое, которое он содержит.

#### Управление заголовками при использовании container_autoresize

Когда включено расширение **container_autoresize**, Scheduler подгоняет размер под всё содержимое. Это может привести к тому, что Scheduler выйдет за пределы экрана, что приведёт к появлению внешнего контейнера или полосы прокрутки на странице.

В этом режиме прокрутка страницы будет также прокручивать навигационные и временные заголовки, делая их невидимыми при прокрутке страницы вниз. Хотя это обычно ожидаемое поведение, бывают ситуации, когда заголовки стоит зафиксировать. Это можно достичь с помощью дополнительного кода и стилей.

Чтобы зафиксировать заголовки, можно использовать позицию sticky вместе с дополнительными стилями, например:

~~~js
<style>
    
  .dhx_cal_container{
    overflow: visible!important;
   }
  .dhx_cal_navline,
  .dhx_cal_header {
      position: sticky;
      z-index: 10;
      background:var(--dhx-scheduler-container-background);
    
  }
  .dhx_cal_navline{
      z-index: 11;
      top:0;
  }
  .dhx_cal_header{
      /* верхняя координата задаётся в JS */
      margin-left: -1px;
      box-shadow: 0 1px 0px 0px var(--dhx-scheduler-base-colors-border);
  }
</style>
~~~

Кроме того, вам понадобится некоторый JavaScript, чтобы обеспечить правильную верхнюю позицию зафиксированной шкалы времени, размещённой чуть ниже панели навигации.

Поскольку панель навигации гибкая и может изменять свою высоту в зависимости от других стилей и содержимого, нужно динамически вычислять её высоту и применять её в качестве верхней координаты для заголовка, как показано ниже:

~~~js
scheduler.attachEvent("onViewChange", function(){
   const navBar = scheduler.$container.querySelector(".dhx_cal_navline");
   const header = scheduler.$container.querySelector(".dhx_cal_header");
   if(navBar && header){
       header.style.top = `${navBar.offsetHeight}px`;
   }
});
~~~

Проверьте полный демонстрационный пример в сниппете ниже:

**Связанный пример** [Container autoresize and sticky header]

## Адаптивность Scheduler {#makingschedulerresponsive}

Когда вы инициализируете Scheduler через [свойство конфигурации header](#initializing-scheduler-via-header-config), вы сможете выбрать структуру заголовка, которая соответствует размеру экрана клиента.
Это также применит определённые стили, делающие элементы и размеры шрифтов адаптивными на маленьких экранах.

Вы можете найти больше деталей в отдельной статье: [Мобильный адаптивный Scheduler](guides/touch-support.md).

## Импорт файлов в приложения на ES6/7 и TypeScript {#importfilesintoes67andtypescriptapps}

Используйте следующую команду для импорта файлов:

~~~js
import { scheduler } from 'dhtmlx-scheduler';
~~~

Для коммерческой, корпоративной или Ultimate версии команда выглядит так:

~~~js
import { scheduler, Scheduler } from 'dhtmlx-scheduler';
~~~

## Использование Scheduler с Vite {#usingschedulerwithvite}

Если вы используете Vite в проекте, для файла **vite.config.js** требуется следующая настройка, чтобы Scheduler корректно включался в приложение:

~~~js title="vite.config.js"
optimizeDeps: {
    include: [
        'dhtmlx-scheduler',
    ]
}
~~~

## Добавление файлов в приложение на RequireJS {#includefilesintoarequirejsbasedapp}

Чтобы подключить файлы dhtmlxScheduler в приложение на RequireJS, следуйте логике, показанной в примере ниже:

~~~js
requirejs(["codebase/dhtmlxscheduler"], function(dhx){
    const scheduler = dhx.scheduler;
    const Scheduler = dhx.Scheduler;// for Enterprise builds
 
    scheduler.init('scheduler_here',new Date(),"week");
    scheduler.parse([
        {
            id: 1, text: "Event 1", start_date: "2027-07-15 09:00", 
            end_date: "2027-07-15 10:00"
        },
        {
            id: 2, text: "Event 2", start_date: "2027-07-15 10:00", 
            end_date: "2027-07-15 11:00"
        }
    ]);
});
~~~

Библиотека dhtmlxScheduler вернёт объект со свойствами `scheduler` и `Scheduler` (в коммерческих, Enterprise или Ultimate версиях) - объекты *scheduler* и *Scheduler*, описанные [здесь](guides/multiple-per-page.md).

:::note
При использовании Scheduler с пользовательскими расширениями в RequireJS следует указать конфигурацию `shim` для RequireJS и напрямую задать зависимость расширений от Scheduler в ней.
:::

Ниже приведён пример, демонстрирующий, как файл пользовательского расширения *custom_tooltip_plugin.js* можно корректно подключить:

~~~js
requirejs.config({
    paths: {
        "dhtmlxscheduler": "../../codebase/dhtmlxscheduler",
        "ext/dhtmlxscheduler_custom_tooltip": "../custom_tooltip_plugin"
    },
    shim: {
        "ext/dhtmlxscheduler_custom_tooltip": ["dhtmlxscheduler"]
    }
});
 
requirejs(["dhtmlxscheduler"], 
function (dhx) {
    const scheduler = dhx.scheduler;
 
    scheduler.init('scheduler_here',new Date(),"week");
    scheduler.parse([
        {
            id: 1, text: "Event 1", start_date: "2027-07-15 09:00", 
            end_date: "2027-07-15 10:00"
        },
        {
            id: 2, text: "Event 2", start_date: "2027-07-15 10:00", 
            end_date: "2027-07-15 11:00"
        }
    ]);
});
~~~

Проверьте, что имя модуля для любого файла внутри пакета указано как *относительный путь внутри папки 'codebase' пакета* плюс *имя файла*, например:

**ядро библиотеки:**

- "dhtmlxscheduler": "./vendor/dhtmlxscheduler/dhtmlxscheduler"