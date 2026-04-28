--- 
sidebar_label: exportToPDF
title: "exportToPDF метод"
description: "Экспортирует Scheduler в формате PDF"
---

# exportToPDF

### Description

@short: Экспортирует Scheduler в формате PDF

@signature: exportToPDF: (_export_?: any) =\> void

### Parameters

- `export` - (optional) *object* - объект настроек экспорта (см. детали)

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
    header:"<h1>My company</h1>",
    footer:"<h4>Bottom line</h4>",
    server:"https://myapp.com/myexport/scheduler"
});
~~~

### Details

:::note
 Этот метод является частью расширения **export**, поэтому убедитесь, что вы подключили его на вашей странице:
~~~html
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>  
~~~
Подробнее в статье [Экспорт в PDF](export/pdf.md).

:::

Метод **exportToPDF()** принимает в качестве параметра объект с набором свойств (все свойства являются необязательными):

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) имя выходного файла</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>format</b></td>
  <td>(<i>'A0', 'A1', 'A2', 'A3', 'A4', 'A5'</i>) формат выходного PDF</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>orientation</b></td>
  <td>(<i>'portrait', 'landscape'</i>) задает ориентацию выходного PDF</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>zoom</b></td>
  <td>(<i>number</i>) задает коэффициент масштабирования выходного PDF</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) задает заголовок, который будет добавлен к выходному PDF. Обратите внимание, здесь можно использовать любой HTML</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) задает нижний колонтитул, который будет добавлен к выходному PDF. Обратите внимание, здесь можно использовать любой HTML</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) задает API endpoint для запроса. Может использоваться с локальной установкой сервиса экспорта. Значение по умолчанию <strong>https://export.dhtmlx.com/scheduler</strong></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>additional_settings</b></td>
  <td>(<i>object</i>) объект с дополнительными настройками. Объект может содержать следующие атрибуты:<ul><li><b>format</b> - (<i>string</i>) формат выходного файла: <i>'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'</i></li><li><b>landscape</b> - (<i>boolean</i>) ориентация файла: портретная или альбомная. Этот атрибут применяется только когда указан атрибут "format".</li><li><b>width</b> - (<i>string|number|"content"</i>) ширина выходной страницы. Атрибут используется при экспорте нескольких страниц. </li><li><b>height</b> - (<i>string|number|"content"</i>) высота выходной страницы. Атрибут используется при экспорте нескольких страниц.</li></ul></td>
  </tr>
  </tbody>
</table>

### Related Guides
- [Экспорт в PDF](export/pdf.md)