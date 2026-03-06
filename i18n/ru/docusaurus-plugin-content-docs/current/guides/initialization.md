---
title: "dhtmlxScheduler на чистом JS/HTML"
sidebar_label: "dhtmlxScheduler на чистом JS/HTML"
---

import { FrameworkIcon } from '@site/src/components/FrameworkIcon';

# dhtmlxScheduler на чистом JS/HTML

При создании приложения с dhtmlxScheduler первым шагом является настройка и отображение планировщика на странице.

В этом руководстве описано, как инициализировать dhtmlxScheduler с использованием только JS и HTML. Для интеграции с фронтенд-фреймворками вы можете обратиться к следующим руководствам:

<div className="framework-grid">

  <a className="framework-card" href="integrations/react/quick-start/">
    <FrameworkIcon name="react" className="framework-icon" />
    <div className="framework-title">React</div>
    <div className="framework-desc">
      Use the ready-made <code>ReactScheduler</code> component with props and events.
    </div>
  </a>

  <a className="framework-card" href="integrations/angular/howtostart-angular/">
    <FrameworkIcon name="angular" className="framework-icon" />
    <div className="framework-title">Angular</div>
    <div className="framework-desc">
      Integrate Scheduler into Angular projects using a thin wrapper.
    </div>
  </a>

  <a className="framework-card" href="integrations/vue/howtostart-vue/">
    <FrameworkIcon name="vue" className="framework-icon" />
    <div className="framework-title">Vue</div>
    <div className="framework-desc">
      Use Scheduler inside Vue apps with a small wrapper and reactive configuration.
    </div>
  </a>

  <a className="framework-card" href="integrations/svelte/howtostart-svelte/">
    <FrameworkIcon name="svelte" className="framework-icon" />
    <div className="framework-title">Svelte</div>
    <div className="framework-desc">
      Embed Scheduler in Svelte with a simple component that binds config and events.
    </div>
  </a>
</div>


Существует два подхода к инициализации планировщика на странице:

- [использование разметки планировщика](#initializingschedulerviamarkup)
- [использование свойства конфигурации header](#initializingschedulerviaheaderconfig)

## Инициализация планировщика через разметку {#initializingschedulerviamarkup}

Чтобы разместить базовый планировщик на странице с помощью разметки, выполните 3 шага:

1. Подключите [файлы dhtmlxScheduler](#requiredcodefiles) на вашей странице.
2. Добавьте контейнер DIV на страницу вместе с необходимыми дочерними DIV для его элементов.
3. Инициализируйте dhtmlxScheduler в созданном контейнере с помощью метода [init](api/method/init.md). Этот метод принимает HTML-контейнер (или его id), в котором будет отображаться планировщик.

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


[Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)


## Инициализация планировщика через header config {#initializingschedulerviaheaderconfig}

Этот способ рекомендуется использовать, если вы хотите сделать планировщик [адаптивным](guides/initialization.md#makingschedulerresponsive).

Чтобы разместить базовый планировщик на странице, выполните следующие шаги:

1. Подключите [файлы dhtmlxScheduler](#requiredcodefiles) на вашей странице.
2. Добавьте контейнер DIV на страницу.
3. Определите структуру планировщика в объекте конфигурации [header](api/config/header.md).
4. Инициализируйте dhtmlxScheduler в контейнере с помощью метода [init](api/method/init.md), передав контейнер (или его id) в качестве параметра.

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
    scheduler.init('scheduler_here',new Date(2020,0,1),"week"); /*!*/
</script>
</html>
~~~


[Responsive scheduler](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/13_touch_ui.html)

 
## Необходимые файлы {#requiredcodefiles}

Вам необходимо подключить следующие файлы:

- *dhtmlxscheduler.js*
- *dhtmlxscheduler.css* (также вы можете ознакомиться с доступными скинами в [Скины](guides/skins.md))

~~~html
<script src="../scheduler/dhtmlxscheduler.js"></script>
<link rel="stylesheet" href="../scheduler/dhtmlxscheduler.css" type="text/css">
~~~

Ниже приведена краткая структура пакета dhtmlxScheduler, чтобы вы могли быстро найти эти файлы:

- <b>sources</b> - содержит исходные файлы библиотеки. Они не минифицированы и удобны для чтения, в основном используются для отладки.
:::note
Обратите внимание, что в **Trial** версии библиотеки планировщика папка **sources** отсутствует.
:::
- <b>samples</b> - содержит примеры кода.
- <b>codebase</b> - содержит сжатые файлы библиотеки. Они имеют меньший размер и предназначены для использования в продуктивных проектах. <b>В ваших проектах рекомендуется использовать файлы из этой папки.</b>

## Размеры планировщика {#schedulersizing}

Планировщик занимает весь размер своего контейнера (*scheduler_here* div в приведённых выше примерах), не увеличивая размер самого контейнера. 
Это означает, что если вы не зададите высоту контейнера или она будет равна нулю, планировщик также будет иметь нулевую высоту и не будет виден.

В наших примерах планировщик обычно занимает весь экран, устанавливая 100% ширины и высоты как для body документа, так и для контейнера планировщика:

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

Проблемы могут возникнуть, если элемент *scheduler_here* размещён внутри div с настройками размера по умолчанию:

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
   <div id="scheduler_here" class="dhx_cal_container" style="width:100%; height:100%;">
~~~

В этом случае планировщик не отобразится корректно, потому что "scheduler_here" установлен на 100% от родительского элемента, но у родителя не задан размер.

Если вы используете относительные размеры (проценты) для элемента *.dhx_cal_container*, убедитесь, что у его родителя также задана высота. В противном случае вычисленная высота может быть равна нулю, и планировщик не отобразится.

В качестве альтернативы, вы можете использовать другие единицы измерения для размеров основного div планировщика. Следующие примеры будут иметь ожидаемый размер независимо от стилей внешних элементов:

~~~html
<div id="scheduler_here" class="dhx_cal_container" style="width:100%; height:100vh;">
~~~

или:

~~~html
<div id="scheduler_here" class="dhx_cal_container" style="width:100%; height:800px;">
~~~

### Автоматическое изменение размера планировщика {#containerautoresizing}

Расширение **container_autoresize** изменяет стандартное поведение изменения размера планировщика. Обычно dhtmlxScheduler подстраивается под размер своего контейнера и отображает внутренние полосы прокрутки для доступа ко всем данным внутри фиксированного размера контейнера.

С включённым расширением **container_autoresize** планировщик динамически подстраивает свой размер под всё содержимое. Это значит, что он расширяется по высоте и/или ширине, чтобы отобразить все события и данные без внутренних полос прокрутки.

Это гарантирует видимость всех данных без необходимости прокручивать содержимое внутри планировщика, что полезно, когда требуется полный обзор содержимого без ручной прокрутки.

#### Использование

Чтобы активировать расширение **container_autoresize**, включите его в настройках планировщика следующим образом:

~~~js
scheduler.plugins({
    container_autoresize: true
});
~~~


[Autoresizing the scheduler container](https://docs.dhtmlx.com/scheduler/samples/03_extensions/28_container_autoresize.html)


Эта простая настройка активирует функцию **container_autoresize**, позволяя планировщику изменять размер в зависимости от содержимого.

#### Работа с заголовками при использовании container_autoresize

Когда включено расширение **container_autoresize**, Scheduler автоматически изменяет размер, чтобы вместить всё своё содержимое. Иногда это приводит к тому, что Scheduler выходит за пределы экрана, из-за чего на странице или во внешнем контейнере появляются полосы прокрутки.

В этом режиме прокрутка страницы также смещает панель навигации и временные заголовки, поэтому они не остаются видимыми при прокрутке вниз. Обычно такое поведение подходит, но бывают случаи, когда требуется закрепить заголовки. Для этого понадобится добавить некоторые стили и скрипты.

Чтобы закрепить заголовки, используйте CSS-свойство sticky вместе с дополнительными стилями, например:

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
      /* top coordinate is assigned from JS */
      margin-left: -1px;
      box-shadow: 0 1px 0px 0px var(--dhx-scheduler-base-colors-border);
  }
</style>
~~~

Кроме того, потребуется JavaScript, чтобы корректно задать верхнюю позицию для фиксированной временной шкалы, разместив её сразу под панелью навигации.

Поскольку высота панели навигации может меняться в зависимости от стилей и содержимого, её высоту нужно вычислять динамически и применять как top для заголовка, например так:

~~~js
scheduler.attachEvent("onViewChange", function(){
   const navBar = scheduler.$container.querySelector(".dhx_cal_navline");
   const header = scheduler.$container.querySelector(".dhx_cal_header");
   if(navBar && header){
       header.style.top = `${navBar.offsetHeight}px`;
   }
});
~~~

Полный пример можно посмотреть в сниппете ниже:

**Related sample** [Container autoresize and sticky header](https://snippet.dhtmlx.com/syo8wm9s)

## Адаптивность Scheduler {#makingschedulerresponsive}

Когда Scheduler инициализируется с помощью [свойства header конфигурации](#initializingschedulerviaheaderconfig), можно выбрать макет заголовка, подходящий для размера экрана клиента. Также применяются определённые стили, которые позволяют элементам и шрифтам хорошо адаптироваться к небольшим экранам.

Больше информации доступно в отдельной статье: [Мобильная адаптивность Scheduler](guides/touch-support.md).

## Импорт файлов в приложения на ES6/7 и TypeScript {#importfilesintoes67andtypescriptapps}

Используйте следующую команду для импорта файлов:

~~~js
import { scheduler } from 'dhtmlx-scheduler';
~~~

Для Commercial, Enterprise или Ultimate версий импорт выглядит так:

~~~js
import { scheduler, Scheduler } from 'dhtmlx-scheduler';
~~~

## Использование Scheduler с Vite {#usingschedulerwithvite}

Если ваш проект использует Vite, добавьте следующую настройку в файл **vite.config.js**, чтобы Scheduler корректно подключался к вашему приложению:

~~~js title="vite.config.js"
optimizeDeps: {
    include: [
        'dhtmlx-scheduler',
    ]
}
~~~

## Добавление файлов в приложение на RequireJS {#includefilesintoarequirejsbasedapp}
------------------------------------------- 

Чтобы добавить файлы dhtmlxScheduler в приложение на RequireJS, используйте следующий пример:

~~~js
requirejs(["codebase/dhtmlxscheduler"], function(dhx){
    var scheduler = dhx.scheduler;
    var Scheduler = dhx.Scheduler;// для сборок Enterprise
 
    scheduler.init('scheduler_here',new Date(),"week");
    scheduler.parse([
        {
            id: 1, text: "Event 1", start_date: "2022-07-15 09:00", 
            end_date: "2022-07-15 10:00"
        },
        {
            id: 2, text: "Event 2", start_date: "2022-07-15 10:00", 
            end_date: "2022-07-15 11:00"
        }
    ]);
});
~~~

Библиотека dhtmlxScheduler возвращает объект, содержащий `scheduler` и `Scheduler` (в Commercial, Enterprise или Ultimate версиях) - это соответствуют объектам *scheduler* и *Scheduler*, описанным [здесь](guides/multiple-per-page.md).

:::note
При использовании Scheduler с пользовательскими расширениями в RequireJS обязательно указывайте конфигурацию `shim` для RequireJS и объявляйте зависимости расширений от Scheduler.
:::

Ниже приведён пример правильного подключения пользовательского расширения *custom_tooltip_plugin.js*:

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
    var scheduler = dhx.scheduler;
 
    scheduler.init('scheduler_here',new Date(),"week");
    scheduler.parse([
        {
            id: 1, text: "Event 1", start_date: "2022-07-15 09:00", 
            end_date: "2022-07-15 10:00"
        },
        {
            id: 2, text: "Event 2", start_date: "2022-07-15 10:00", 
            end_date: "2022-07-15 11:00"
        }
    ]);
});
~~~

Убедитесь, что имя модуля для любого файла внутри пакета указывается как *относительный путь внутри папки 'codebase' пакета* плюс *имя файла*, например:

**основная библиотека:**

- "dhtmlxscheduler": "./vendor/dhtmlxscheduler/dhtmlxscheduler"
