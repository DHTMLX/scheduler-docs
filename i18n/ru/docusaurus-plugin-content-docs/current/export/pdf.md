---
title: "Экспорт в PDF"
sidebar_label: "Экспорт в PDF"
---

# Экспорт в PDF

*Статья относится к экспорту dhtmlxScheduler 4.1+. Если вы используете dhtmlxScheduler 4.0 или более ранние версии, см. детали [здесь](export/pdf-legacy.md).*

Начиная с версии 4.1, dhtmlxScheduler предлагает новый подход к экспорту планировщика в формат PDF: [онлайн-сервис экспорта](export/pdf.md#default-export-to-pdf).

:::info
Сервис бесплатный, но результирующий PDF-файл будет содержать водяной знак библиотеки под лицензией GPL. В случае покупки лицензии результат экспорта будет доступен без водяного знака
во время действительного срока поддержки (12 месяцев для всех PRO лицензий).
:::

## Использование сервисов экспорта

Доступно несколько сервисов экспорта. Вы можете установить их на ваш компьютер и локально экспортировать Scheduler в PDF.

Обратите внимание, что сервисы экспорта не входят в пакет Scheduler,  
прочитайте [соответствующую статью](https://dhtmlx.com/docs/products/dhtmlxScheduler/export.shtml), чтобы узнать условия использования каждого из них.

## Ограничения на размер запроса

Существует общий API-эндпойнт `https://export.dhtmlx.com/scheduler`, который предоставляет методы экспорта, такие как `exportToPDF()` и `exportToPNG()`. Максимальный размер запроса — 10 МБ.

## По умолчанию экспорт в PDF

Чтобы экспортировать планировщик в PDF-документ, выполните следующие шаги:

- Чтобы использовать онлайн-сервис экспорта, включите плагин `export_api` через метод [`plugins()`](api/method/plugins.md):

~~~js
scheduler.plugins({
    export_api: true
});
~~~

:::note
Если версия Scheduler старше 7.0, вам нужно подключить файл `https://export.dhtmlx.com/scheduler/api.js` на вашей странице, чтобы включить онлайн-сервис экспорта, например:

~~~html
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>
~~~
:::

- Вызовите метод [`exportToPDF()`](#parameters-of-the-export-method) для экспорта Scheduler:

~~~html {1}
<input value="Export to PDF" type="button" onclick='scheduler.exportToPDF()'>
~~~


### Связанные примеры
- [Export to PDF/PNG](https://docs.dhtmlx.com/scheduler/samples/04_export/06_online_export.html)


## Параметры метода экспорта

Метод [`exportToPDF()`](api/method/exporttopdf.md) принимает в качестве параметра объект с рядом свойств. Все свойства являются необязательными:



<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) имя выходного файла</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>format</b></td>
  <td>(<i>'A0', 'A1', 'A2', 'A3', 'A4', 'A5'</i>) формат выходного PDF-изображения</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>orientation</b></td>
  <td>(<i>'portrait', 'landscape'</i>) задаёт ориентацию выходного PDF-изображения</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>zoom</b></td>
  <td>(<i>number</i>) задаёт коэффициент масштабирования выходного PDF-изображения</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) задаёт заголовок, который будет добавлен к выходному PDF‑изображению. Обратите внимание, здесь можно использовать любой HTML</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) задаёт нижний колонтитул, который будет добавлен к выходному PDF‑изображению. Обратите внимание, здесь можно использовать любой HTML</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) устанавливает API-эндпойнт для запроса. Может использоваться с локальной установкой сервиса экспорта. Значение по умолчанию: <strong>https://export.dhtmlx.com/scheduler</strong></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) объект с дополнительными настройками. Объект может содержать следующие атрибуты: <ul> <li><b>format</b> - (<i>string</i>) формат выходного файла: <i>'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'</i></li> <li><b>landscape</b> - (<i>boolean</i>) портретная или альбомная ориентация выходного файла. Атрибут действует только когда задан атрибут "format".</li> <li><b>width</b> - (<i>string|number|"content"</i>) ширина выходной страницы. Атрибут используется при экспорте нескольких страниц. </li> <li><b>height</b> - (<i>string|number|"content"</i>) высота выходной страницы. Атрибут используется при экспорте нескольких страниц.</li> </ul></td>
  </tr>
  </tbody>
</table>

### Вызов метода экспорта с опциональными свойствами
~~~js
scheduler.exportToPDF({
    name: "myscheduler.pdf",
    format: "A4",
    orientation: "portrait",
    zoom: 1,
    header: "<h1>My company</h1>",
    footer: "<h4>Bottom line</h4>",
    server: "https://myapp.com/myexport/scheduler"
});
~~~


## Имя выходного файла

Чтобы задать произвольное имя выходного файла, используйте свойство `name` в параметре метода [`exportToPDF()`](export/pdf.md#parameters-of-the-export-method):

~~~js {2}
scheduler.exportToPDF({
    name: "my_beautiful_scheduler.pdf"
});
~~~


## Заголовок/нижний колонтитул выходного файла

Чтобы добавить заголовок/нижний колонтитул к выходному PDF-файлу, используйте свойства `header`/`footer` в параметре метода [`exportToPDF()`](export/pdf.md#parameters-of-the-export-method):

:::note
Обратите внимание: при указании параметров можно использовать любой HTML. При указании изображений помните, что нужно задавать глобальные пути в значениях атрибута "src".
:::

~~~js {3-4}
scheduler.exportToPDF({
    name: "myscheduler.pdf",
    header: "<h1>My company</h1>",
    footer: "<h4>Bottom line</h4>"
});
~~~


## Пользовательский стиль для выходного файла

Чтобы применить пользовательский стиль к планировщику, предоставьте таблицу стилей со своими пользовательскими CSS-классами:

- через ссылку:

~~~js {3}
scheduler.exportToPDF({
    name: "calendar.pdf",
    header: '<link rel="stylesheet" href="http://mysite.com/custom.css">'
});
~~~

- или через тег 'style':

~~~js {3}
scheduler.exportToPDF({
    name: "calendar.pdf",
    header: '<style>... custom css classes here ...</style>'
});
~~~

Примечание: вышеупомянутое решение работает для глобальной HTTP-ссылки. Если у вас CSS‑классы указаны во внутреннем/локальном окружении, вы можете встроить все стили следующим образом:

~~~js
scheduler.exportToPDF({
    header: "<style>.tier1{background: red; color:white;}</style>"
});
~~~


## Экспорт HTML‑элементов

При экспорте Scheduler в PDF‑формат учтите, что экспорт HTML‑элементов ограничен из‑за возможной небезопасности.

Существуют HTML‑элементы, которые не полностью допускаются для экспорта, например `<canvas>`, `<svg>`, `<script>` и изображения с атрибутом *src*, содержащим изображение в формате Base64. Однако существуют безопасные способы экспорта изображений в форматах SVG и Base64:

- можно использовать элемент `<img>` с атрибутом *src*, который содержит URL изображения в формате SVG (подходит для форматов PNG и JPG, не работает для Base64), например:

~~~html
<img src="https://www.svgrepo.com/download/530597/hat.svg">
~~~

- можно использовать элементы style, такие как *background* или *background-image* и указать атрибут `url` со ссылкой на изображение или изображение в формате Base64 в качестве значения (подходит для форматов PNG/JPG/SVG)

~~~css
.red {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH1ggDCwMADQ4NnwAAAFVJREFUGJWNkMEJADEIBEcbSDkXUnfSgnBVeZ8LSAjiwjyEQXSFEIcHGP9oAi+H0Bymgx9MhxbFdZE2a0s9kTZdw01ZhhYkABSwgmf1Z6r1SNyfFf4BZ+ZUExcNUQUAAAAASUVORK5CYII=") 100%/contain no-repeat;
    display: inline-block;
    width: 32px;
    height: 32px;
}
~~~

Если у вас есть экспортный модуль и вам нужно экспортировать HTML‑элементы, которые не поддерживаются нашим онлайн‑сервером экспорта, вы можете отправить запрос в службу поддержки, чтобы получить инструкции по изменениям в вашем модуле, необходимых для снятия ограничений. Однако следует учитывать, что ваш сервер будет подвержен XSS‑атакам.