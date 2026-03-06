---
sidebar_label: "exportToPNG"
title: "exportToPNG method"
description: "позволяет экспортировать Scheduler в виде PNG-изображения"
---

# exportToPNG

### Description

@short: Позволяет экспортировать Scheduler в виде PNG-изображения

@signature: exportToPNG: (_export_?: any) =\> void

### Parameters

- `export` - (optional) *object* - объект, содержащий параметры экспорта (подробности ниже)

### Example

~~~jsx
scheduler.exportToPNG();
 
//или
scheduler.exportToPNG({
      name:"my_beautiful_scheduler.png"
});

scheduler.exportToPNG({
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
 Этот метод является частью расширения **export**, поэтому убедитесь, что оно подключено на вашей странице:
~~~html
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>  
~~~
Для дополнительной информации смотрите статью [Экспорт в PNG](export/png.md).
 
:::

Метод **exportToPNG()** принимает объект с различными необязательными свойствами:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) имя файла для экспортируемого PNG</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>format</b></td>
  <td>(<i>'A0', 'A1', 'A2', 'A3', 'A4', 'A5'</i>) размер страницы для PNG-выхода</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>orientation</b></td>
  <td>(<i>'portrait', 'landscape'</i>) ориентация макета PNG-изображения</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>zoom</b></td>
  <td>(<i>number</i>) уровень масштабирования для экспортируемого PNG</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) HTML-содержимое, которое будет добавлено в верхнюю часть PNG-изображения</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) HTML-содержимое, которое будет добавлено в нижнюю часть PNG-изображения</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) API endpoint, используемый для запроса экспорта. Может указывать на локально установленный сервис экспорта. По умолчанию <strong>https://export.dhtmlx.com/scheduler</strong></td>
  </tr>
  </tbody>
</table>

### Related Guides
- [Экспорт в PNG](export/png.md)
