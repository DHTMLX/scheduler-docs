---
title: "Экспорт в PNG"
sidebar_label: "Экспорт в PNG"
---

# Экспорт в PNG

Начиная с версии 4.1, dhtmlxScheduler предоставляет [онлайн-сервис экспорта](export/png.md#defaultexporttopng), который позволяет экспортировать Scheduler как изображение PNG.

:::note
Сервис является бесплатным, однако экспортируемое PNG будет содержать водяной знак библиотеки при использовании по лицензии GPL. При покупке лицензии экспорт будет осуществляться без водяного знака в течение активного периода поддержки (12 месяцев для всех PRO-лицензий).
:::

## Использование сервисов экспорта {#usingexportservices}

Существует несколько сервисов экспорта, которые вы можете использовать. Вы можете установить их локально на свой компьютер, чтобы экспортировать Scheduler в PNG без использования онлайн-сервиса.

Имейте в виду, что сервисы экспорта не входят в пакет Scheduler. Для получения подробной информации об условиях использования каждого сервиса ознакомьтесь с [соответствующей статьёй](https://dhtmlx.com/docs/products/dhtmlxScheduler/export.shtml).

## Ограничения на размер запроса {#limitsonrequestsize}

Все методы экспорта (*exportToPDF*, *exportToPNG* и др.) используют общий API-эндпоинт **https://export.dhtmlx.com/scheduler**. Максимально допустимый размер запроса - **10 МБ**.


## Экспорт в PNG по умолчанию {#defaultexporttopng}

Чтобы экспортировать Scheduler как изображение PNG, выполните следующие шаги:

- Включите плагин <b>export_api</b> с помощью метода [plugins](api/method/plugins.md):

~~~js
scheduler.plugins({
      export_api: true
});
~~~

:::note
Для версий Scheduler младше 7.0 необходимо также добавить скрипт **https://export.dhtmlx.com/scheduler/api.js** на вашу страницу для активации онлайн-сервиса экспорта, например:

~~~js
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>
~~~
:::

- Используйте метод <a href="#parametersoftheexportmethod">exportToPNG</a> для запуска экспорта:

~~~html
<input value="Export to PNG" type="button" onclick='scheduler.exportToPNG()'>/*!*/
~~~


[Export to PDF/PNG](https://docs.dhtmlx.com/scheduler/samples/04_export/06_online_export.html)


## Параметры метода экспорта {#parametersoftheexportmethod}

Метод [exportToPNG()](api/method/exporttopng.md) принимает объект с несколькими необязательными свойствами:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) задаёт имя выходного файла</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>format</b></td>
  <td>(<i>'A0', 'A1', 'A2', 'A3', 'A4', 'A5'</i>) устанавливает формат выходного PNG-изображения</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>orientation</b></td>
  <td>(<i>'portrait', 'landscape'</i>) устанавливает ориентацию выходного PNG-изображения</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>zoom</b></td>
  <td>(<i>number</i>) управляет уровнем масштабирования выходного PNG-изображения</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) добавляет заголовок к выходному PNG-изображению; здесь можно использовать любой HTML</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) добавляет подвал к выходному PNG-изображению; здесь можно использовать любой HTML</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) указывает API-эндпоинт для запроса экспорта. Полезно, если вы используете локальный сервис экспорта. По умолчанию <strong>https://export.dhtmlx.com/scheduler</strong></td>
  </tr>
  </tbody>
</table>


~~~js title="Пример вызова метода экспорта с дополнительными параметрами"
scheduler.exportToPNG({
    format:"A4",
    orientation:"portrait",
    zoom:1,
    header:"<h1>My company</h1>",
    footer:"<h4>Bottom line</h4>",
    server:"https://myapp.com/myexport/scheduler"
});
~~~


## Имя выходного файла {#exportinghtmlelements}

Вы можете задать своё имя для экспортируемого PNG, используя свойство **name** в методе 
[exportToPNG](export/png.md#parametersoftheexportmethod):

~~~js
scheduler.exportToPNG({
    name:"my_beautiful_scheduler.png"/*!*/
});
~~~


## Заголовок/подвал выходного файла {#headerfooteroftheoutputfile}

Чтобы добавить заголовок или подвал в выходной PNG, используйте свойства **header** и **footer** в методе 
[exportToPNG](export/png.md#parametersoftheexportmethod):

:::note
Здесь вы можете вставить любой HTML. При добавлении изображений убедитесь, что используете глобальные URL в атрибуте "src".
:::

~~~js
scheduler.exportToPNG({
    name:"myscheduler.png",
    header:"<h1>My company</h1>",
    footer:"<h4>Bottom line</h4>"
});
~~~


## Пользовательский стиль для выходного файла {#customstylefortheoutputfile}

Чтобы применить пользовательские стили к экспортируемому Scheduler, добавьте ваш CSS одним из следующих способов:

- Подключите внешний файл стилей:

~~~js
scheduler.exportToPNG({
    name:"calendar.png",
    header:'<link rel="stylesheet" href="http://mysite.com/custom.css">' /*!*/
});
~~~

- Или вставьте стили напрямую с помощью тега 'style':

~~~js
scheduler.exportToPNG({
    name:"calendar.png",
    header:'<style>... custom css classes here ...</style>' /*!*/
});
~~~

Если ваш CSS размещён локально или во внутренней сети, вы можете вставить все стили как inline:

~~~js
scheduler.exportToPNG({
    header:"<style>.tier1{   background: red;   color:white;}</style>"
});
~~~


## Экспорт HTML-элементов {#exportinghtmlelements}

При экспорте Scheduler в PNG учитывайте, что экспорт некоторых HTML-элементов ограничен по соображениям безопасности.

Такие элементы, как `<canvas>`, `<svg>`, `<script>`, а также изображения с Base64 в атрибуте *src* поддерживаются не полностью. Тем не менее, есть безопасные способы включения изображений в SVG и Base64 форматах:

- Используйте тег `<img>` с атрибутом *src*, указывающим на URL SVG-изображения (работает для экспорта в PNG и JPG, но не для Base64), например:

~~~html
<img src="https://www.svgrepo.com/download/530597/hat.svg">
~~~

- Используйте CSS-свойства *background* или *background-image* с `url`, указывающим на URL изображения или на изображение в формате Base64 (работает при экспорте в PNG/JPG/SVG):

~~~css
.red {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH1ggDCwMADQ4NnwAAAFVJREFUGJWNkMEJADEIBEcbSDkXUnfSgnBVeZ8LSAjiwjyEQXSFEIcHGP9oAi+H0Bymgx9MhxbFdZE2a0s9kTZdw01ZhhYkABSwgmf1Z6r1SNyfFf4BZ+ZUExcNUQUAAAAASUVORK5CYII=") 100%/contain no-repeat;
    display: inline-block;
    width: 32px;
    height: 32px;
}
~~~

Если у вас есть собственный модуль экспорта и требуется экспортировать HTML-элементы, которые не поддерживаются онлайн-сервером экспорта, вы можете обратиться в службу поддержки для получения рекомендаций по доработке вашего модуля с целью снятия этих ограничений. Имейте в виду, что это может привести к уязвимости вашего сервера для XSS-атак.
