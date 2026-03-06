---
title: "Экспорт в PDF"
sidebar_label: "Экспорт в PDF"
---

# Экспорт в PDF

*В этой статье рассматривается экспорт с помощью dhtmlxScheduler версии 4.1 и выше. Для версий 4.0 и ранее, пожалуйста, обратитесь к [этому руководству](export/pdf-legacy.md).*

Начиная с версии 4.1, dhtmlxScheduler предоставляет новый способ экспорта планировщика в PDF-файл с помощью [онлайн-сервиса экспорта](export/pdf.md#defaultexporttopdf).

:::note
Сервис является бесплатным, однако PDF-файлы, созданные под лицензией GPL, будут содержать водяной знак библиотеки. Покупка лицензии удаляет водяной знак в течение активного периода поддержки (12 месяцев для всех PRO-лицензий).
:::

## Использование сервисов экспорта {#usingexportservices}

Доступно несколько сервисов экспорта, которые можно установить локально для экспорта Scheduler в PDF.

Имейте в виду, что сервисы экспорта являются отдельными от пакета Scheduler. Для получения информации об условиях использования ознакомьтесь с [соответствующей статьей](https://dhtmlx.com/docs/products/dhtmlxScheduler/export.shtml).

## Ограничения на размер запроса {#limitsonrequestsize}

API-эндпоинт <b>*https://export.dhtmlx.com/scheduler*</b> обрабатывает запросы на экспорт (*exportToPDF*, *exportToPNG* и др.). Максимально допустимый размер запроса - **10 МБ**.

## Экспорт по умолчанию в PDF {#defaultexporttopdf}

Чтобы экспортировать планировщик в PDF, выполните следующие шаги:

- Включите плагин <b>export_api</b> с помощью метода [plugins](api/method/plugins.md):

~~~js
scheduler.plugins({
      export_api: true
});
~~~

:::note
Для версий Scheduler ниже 7.0, подключите скрипт **https://export.dhtmlx.com/scheduler/api.js** на вашей странице для активации онлайн-сервиса экспорта, например:

~~~js
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>
~~~
:::

- Используйте метод <a href="#parametersoftheexportmethod">exportToPDF</a> для выполнения экспорта:

~~~html
<input value="Export to PDF" type="button" onclick='scheduler.exportToPDF()'>/*!*/
~~~


[Export to PDF/PNG](https://docs.dhtmlx.com/scheduler/samples/04_export/06_online_export.html)


## Параметры метода экспорта {#parametersoftheexportmethod}

Метод [exportToPDF()](api/method/exporttopdf.md) принимает необязательный объект с различными свойствами:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) имя файла для экспортируемого PDF</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>format</b></td>
  <td>(<i>'A0', 'A1', 'A2', 'A3', 'A4', 'A5'</i>) размер бумаги для PDF</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>orientation</b></td>
  <td>(<i>'portrait', 'landscape'</i>) ориентация страниц PDF</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>zoom</b></td>
  <td>(<i>number</i>) уровень масштабирования PDF</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) HTML-контент для включения в заголовок PDF</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) HTML-контент для включения в подвал PDF</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) URL API-эндпоинта для запросов на экспорт. Полезно при использовании локального сервиса экспорта. По умолчанию <strong>https://export.dhtmlx.com/scheduler</strong></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) дополнительные параметры экспорта, включая: <ul> <li><b>format</b> - (<i>string</i>) формат выходного файла: <i>'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'</i></li> <li><b>landscape</b> - (<i>boolean</i>) ориентация страницы, применяется только если задан "format"</li> <li><b>width</b> - (<i>string|number|"content"</i>) ширина выходной страницы, актуально для экспорта на несколько страниц</li> <li><b>height</b> - (<i>string|number|"content"</i>) высота выходной страницы, актуально для экспорта на несколько страниц</li> </ul></td>
  </tr>
  </tbody>
</table>


~~~js title="Пример вызова exportToPDF с опциями"
scheduler.exportToPDF({
    name:"myscheduler.pdf",
    format:"A4",
    orientation:"portrait",
    zoom:1,
    header:"<h1>My company</h1>",
    footer:"<h4>Bottom line</h4>",
    server:"https://myapp.com/myexport/scheduler"
});
~~~

## Имя выходного файла {#nameoftheoutputfile}

Чтобы указать индивидуальное имя для экспортируемого PDF-файла, используйте свойство **name** в опциях [exportToPDF](export/pdf.md#parametersoftheexportmethod):

~~~js
scheduler.exportToPDF({
    name:"my_beautiful_scheduler.pdf"/*!*/
});
~~~

## Заголовок/подвал выходного файла {#headerfooteroftheoutputfile}

Заголовки и подвал можно добавить в экспортируемый PDF с помощью свойств **header** и **footer** в опциях [exportToPDF](export/pdf.md#parametersoftheexportmethod):

:::note
В этих свойствах можно использовать любой HTML. При добавлении изображений указывайте абсолютные URL в атрибуте "src".
:::

~~~js
scheduler.exportToPDF({
    name:"myscheduler.pdf",
    header:"<h1>My company</h1>",/*!*/
    footer:"<h4>Bottom line</h4>"/*!*/
});
~~~

## Пользовательские стили для выходного файла {#customstylefortheoutputfile}

Пользовательские стили можно применить, подключив таблицу стилей с вашими CSS-классами:

- Через ссылку на внешний файл стилей:

~~~js
scheduler.exportToPDF({
    name:"calendar.pdf",
    header:'<link rel="stylesheet" href="http://mysite.com/custom.css">' /*!*/
});
~~~

- Или встроив стили в тег `<style>`:

~~~js
scheduler.exportToPDF({
    name:"calendar.pdf",
    header:'<style>... custom css classes here ...</style>' /*!*/
});
~~~

Обратите внимание, что этот подход работает с общедоступными HTTP-URL. Для локальных или корпоративных сред вы можете встроить все стили напрямую, например:

~~~js
scheduler.exportToPDF({
    header:"<style>.tier1{background: red; color:white;}</style>"
});
~~~

## Экспорт HTML-элементов {#exportinghtmlelements}

При экспорте Scheduler в PDF существуют некоторые ограничения по поддержке HTML-элементов из соображений безопасности.

Некоторые элементы, такие как `<canvas>`, `<svg>`, `<script>`, а также изображения с Base64-кодированным *src*, не поддерживаются полностью. Однако есть безопасные альтернативы для экспорта изображений в SVG и Base64-форматах:

- Используйте тег `<img>` с атрибутом *src*, указывающим на URL SVG-изображения (работает для экспорта в PNG и JPG, но не с Base64), например:

~~~html
<img src="https://www.svgrepo.com/download/530597/hat.svg">
~~~

- Используйте CSS-стили, такие как *background* или *background-image* с `url()`, указывающим на URL изображения или строку Base64 (работает для PNG, JPG и SVG):

~~~css
.red {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH1ggDCwMADQ4NnwAAAFVJREFUGJWNkMEJADEIBEcbSDkXUnfSgnBVeZ8LSAjiwjyEQXSFEIcHGP9oAi+H0Bymgx9MhxbFdZE2a0s9kTZdw01ZhhYkABSwgmf1Z6r1SNyfFf4BZ+ZUExcNUQUAAAAASUVORK5CYII=") 100%/contain no-repeat;
    display: inline-block;
    width: 32px;
    height: 32px;
}
~~~

Если у вас есть собственный модуль экспорта и требуется экспортировать неподдерживаемые HTML-элементы, вы можете обратиться в службу поддержки за рекомендациями по модификации модуля для обхода ограничений. Помните, что это может привести к уязвимости вашего сервера для XSS-атак.
