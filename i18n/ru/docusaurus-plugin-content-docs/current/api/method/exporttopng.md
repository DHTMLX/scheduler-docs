---
sidebar_label: exportToPNG
title: "метод exportToPNG"
description: "экспортирует Scheduler в PNG-формат"
---

# exportToPNG

### Description

@short: Экспортирует Scheduler в PNG-формат

@signature: exportToPNG: (_export_?: any) =\> void

### Parameters

- `export` - (optional) *объект* - объект с настройками экспорта (см. детали)

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

The **exportToPNG()** method takes as a parameter an object with a number of properties (all the properties are optional):

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) имя выходного файла</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>format</b></td>
  <td>(<i>'A0', 'A1', 'A2', 'A3', 'A4', 'A5'</i>) формат выходного PNG-изображения</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>orientation</b></td>
  <td>(<i>'portrait', 'landscape'</i>) задаёт ориентацию выходного PNG-изображения</td>
  </tr> 
  <tr>
  <td class="webixdoc_links0"><b>zoom</b></td>
  <td>(<i>number</i>) задаёт коэффициент масштабирования выходного PNG-изображения</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>header</b></td>
  <td>(<i>string</i>) задаёт заголовок, который будет добавлен к выходному PNG-изображению. Обратите внимание: здесь можно использовать любой HTML</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>footer</b></td>
  <td>(<i>string</i>) задаёт подвал, который будет добавлен к выходному PNG-изображению. Обратите внимание: здесь можно использовать любой HTML</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) задаёт API endpoint для запроса. Может использоваться с локальной установкой сервиса экспорта. Значение по умолчанию: <strong>https://export.dhtmlx.com/scheduler</strong></td>
  </tr>
  </tbody>
</table>

### Related Guides
- [Экспорт в PNG](export/png.md)