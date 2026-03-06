---
sidebar_label: "setLoadMode"
title: "setLoadMode method"
description: "устанавливает режим загрузки данных по частям, позволяя динамическую подгрузку"
---

# setLoadMode

### Description

@short: Устанавливает режим загрузки данных по частям, позволяя динамическую подгрузку

@signature: setLoadMode: (mode: string) =\> void

### Parameters

- `mode` - (required) *string* - режим загрузки

### Example

~~~jsx
scheduler.config.load_date = "%Y.%m.%d";
scheduler.init('scheduler_here',new Date(2009,10,1),"month");

scheduler.setLoadMode("month")
scheduler.load("data/events.php");
~~~

### Related samples
- [Loading data from a database](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)

### Details

:::note

Этот метод следует вызывать после **scheduler.init()**, но до загрузки каких-либо данных в планировщик.
 
:::

По умолчанию планировщик загружает все данные сразу. Это может быть неэффективно при работе с большими коллекциями событий. В таких случаях лучше загружать данные частями, только те, которые нужны для отображения текущего вида.

Параметр **mode** принимает одно из следующих предопределённых значений:

- day;  
- week;
- month;
- year.


Например, установка режима в 'month' заставит планировщик запрашивать данные только за текущий месяц, подгружая дополнительные данные по мере необходимости. 
[Подробнее о режимах загрузки](guides/loading-data.md#dynamic-loading).

#### Запрос

Сгенерированные запросы выглядят следующим образом:

~~~php
Data?from=DATEHERE&to=DATEHERE
~~~

*где DATEHERE - это валидная дата, отформатированная согласно настройкам из [load_date](api/config/load_date.md).*

<br>

При использовании [dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html) на серверной стороне, дополнительная серверная обработка для парсинга данных не требуется.

### Related API
- [load_date](api/config/load_date.md)
- [load_format](api/template/load_format.md)

### Related Guides
- [Загрузка данных](guides/loading-data.md#dynamic-loading)
