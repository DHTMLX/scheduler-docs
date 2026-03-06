---
sidebar_label: "exportToPDF"
title: "exportToPDF method"
description: "экспортирует Scheduler в формат PDF"
---

# exportToPDF

### Description

@short: Экспортирует Scheduler в формат PDF

@signature: exportToPDF: (_export_?: any) =\> void

### Parameters

- `export` - (optional) *object* - объект с настройками экспорта (см. детали)

### Example

~~~jsx
scheduler.exportToPDF();
 
//или
scheduler.exportToPDF({
  name: "myscheduler.pdf"
});

scheduler.exportToPDF({
    name:"myscheduler.pdf",
    format:"A4",
    orientation:"portrait",
    zoom:1,
    header:"<h1>Моя компания</h1>",
    footer:"<h4>Нижняя часть</h4>",
    server:"https://myapp.com/myexport/scheduler"
});
~~~

### Details

:::note
 Этот метод является частью расширения **export**, поэтому убедитесь, что вы подключили его на вашей странице:
~~~html
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>  
~~~
Для дополнительной информации смотрите статью [Экспорт в PDF](export/pdf.md).
 
:::

Метод **exportToPDF()** принимает объект с различными необязательными свойствами для настройки экспорта:


<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) задает имя экспортируемого PDF-файла</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>format</b></td>
  <td>(<i>'A0', 'A1', 'A2', 'A3', 'A4', 'A5'</i>) определяет размер формата экспортируемого PDF</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>orientation</b></td>
  <td>(<i>'portrait', 'landscape'</i>) устанавливает ориентацию страницы PDF</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>zoom</b></td>
  <td>(<i>number</i>) контролирует уровень масштабирования содержимого экспортируемого PDF</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) HTML-содержимое, добавляемое в шапку PDF</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) HTML-содержимое, добавляемое в нижний колонтитул PDF</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) URL API-эндпоинта, обрабатывающего запрос экспорта. Может указывать на локальный сервис экспорта. По умолчанию <strong>https://export.dhtmlx.com/scheduler</strong></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) объект с дополнительными параметрами конфигурации, включая:<ul><li><b>format</b> - (<i>string</i>) задает формат выходного файла, например <i>'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'</i></li><li><b>landscape</b> - (<i>boolean</i>) управляет ориентацией вывода: портрет или ландшафт; действует только если задан параметр "format".</li><li><b>width</b> - (<i>string|number|"content"</i>) задает ширину выходной страницы, полезно для многостраничного экспорта.</li><li><b>height</b> - (<i>string|number|"content"</i>) задает высоту выходной страницы, также используется для многостраничного экспорта.</li></ul></td>
  </tr>
  </tbody>
</table>

### Related Guides
- [Экспорт в PDF](export/pdf.md)
