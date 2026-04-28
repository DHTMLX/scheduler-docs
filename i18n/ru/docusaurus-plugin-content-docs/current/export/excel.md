---
title: "Экспорт в Excel и iCal"
sidebar_label: "Экспорт в Excel и iCal"
---

# Экспорт в Excel и iCal

Начиная с версии 4.2, dhtmlxScheduler позволяет экспортировать все данные планировщика в форматы Excel и iCal.

## Ограничения на размер запроса

Существует общий API-эндпоинт **https://export.dhtmlx.com/scheduler**, используемый для различных методов экспорта (*exportToPDF*, *exportToPNG* и др.). **Максимальный размер запроса - 10 МБ**.


## Экспорт в Excel

Чтобы экспортировать данные планировщика в файл Excel, выполните следующие шаги:

1. Добавьте скрипт "https://export.dhtmlx.com/scheduler/api.js" на вашу страницу для активации онлайн-сервиса экспорта:
~~~html
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>  /*!*/
<link rel="stylesheet" href="codebase/dhtmlxscheduler.css" type="text/css">
~~~
2. Используйте метод exportToExcel для экспорта данных планировщика: 
~~~html
<input value="Export to Excel" type="button" onclick="scheduler.exportToExcel()">/*!*/

<script>
    scheduler.init("scheduler_here",new Date(2019,5,30),"month");
    scheduler.load("data/events");
</script>
~~~


#### Параметры метода экспорта

Метод **exportToExcel()** принимает необязательный объект с несколькими свойствами:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) имя выходного файла с расширением '.xlsx'</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>columns</b></td>
  <td>(<i>array</i>) настройка колонок в результирующем листе <ul> <li>'id' - (string/number) ID свойства события, отображаемого в колонке</li> <li>'header' - (string) текст заголовка колонки</li> <li>'width' - (number) ширина колонки в пикселях</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) указывает API-эндпоинт для запроса экспорта. Может указывать на локально установленный сервис экспорта. По умолчанию <strong>https://export.dhtmlx.com/scheduler</strong></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>start</b></td>
  <td>(<i>string|object</i>) устанавливает начальную дату диапазона данных для экспорта</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>end</b></td>
  <td>(<i>string|object</i>) устанавливает конечную дату диапазона данных для экспорта</td>
  </tr>
  </tbody>
</table>


~~~js title="Вызов метода экспорта с дополнительными параметрами"
scheduler.exportToExcel({
    name:"My document.xls", 
    columns:[
        { id:"text",  header:"Title", width:150 },
        { id:"start_date",  header:"Start date", width:250 }
    ],
    server:"https://myapp.com/myexport/scheduler",
    start: new Date(1999, 01, 01),
    end:  new Date(2027, 01, 01)
});
~~~

#### Настройка формата даты

Чтобы управлять отображением дат в экспортируемом файле Excel, задайте шаблон **xml_format** следующим образом:

~~~js
scheduler.templates.xml_format = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
~~~

**Related sample** [Setting date format](https://snippet.dhtmlx.com/5/6d3de8fa2)

Подробнее о форматировании дат смотрите в спецификации [здесь](guides/settings-format.md).

## Экспорт в iCal

Чтобы экспортировать данные планировщика в строку iCal, выполните следующие шаги:

- Подключите скрипт <b>"https://export.dhtmlx.com/scheduler/api.js"</b> для активации онлайн-сервиса экспорта:

~~~html
<script src="codebase/dhtmlxscheduler.js"></script>
<script src="https://export.dhtmlx.com/scheduler/api.js"></script>  /*!*/
<link rel="stylesheet" href="codebase/dhtmlxscheduler.css" type="text/css">
~~~

- Используйте метод <b>exportToICal</b> для экспорта данных планировщика:

~~~html
<input value="Export to iCal" type="button" onclick="scheduler.exportToICal()">/*!*/

<script>
    scheduler.init("scheduler_here",new Date(2027,5,30),"month");
    scheduler.load("data/events");
</script>
~~~


#### Параметры метода экспорта

Метод **exportToICal()** принимает необязательный объект со следующим свойством:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>server</b></td>
  <td>(<i>string</i>) указывает API-эндпоинт для запроса экспорта. Может быть настроен на локально размещённый сервис экспорта. По умолчанию <strong>https://export.dhtmlx.com/scheduler</strong></td>
  </tr>
  </tbody>
</table>


~~~js title="Вызов метода экспорта с server параметром"
scheduler.exportToICal({
    server:"https://myapp.com/myexport/scheduler"
});
~~~
