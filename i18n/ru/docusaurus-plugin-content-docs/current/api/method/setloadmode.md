---
sidebar_label: setLoadMode
title: "setLoadMode method"
description: "устанавливает режим, который позволяет загружать данные по частям (включает динамическую загрузку)"
---

# setLoadMode

### Description

@short: Устанавливает режим, который позволяет загружать данные по частям (включает динамическую загрузку)

@signature: setLoadMode: (mode: string) =\> void

### Parameters

- `mode` - (обязательно) *string* - режим загрузки

### Example

~~~jsx
scheduler.config.load_date = "%Y.%m.%d";
scheduler.init('scheduler_here',new Date(2027,10,1),"month");

scheduler.setLoadMode("month")
scheduler.load("data/events.php");
~~~

### Related samples
- [Загрузка данных из базы данных](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)

### Details

:::note

Метод следует вызывать после вызова **scheduler.init()**, но до загрузки данных в планировщик.

:::

По умолчанию планировщик загружает все данные сразу. Однако это может создать проблему, когда вы используете большие коллекции событий. В таких ситуациях следует загружать данные порциями, необходимых для заполнения видимой области планировщика.

Параметр **mode** может принимать только одно из заранее определённых значений. Предопределённые значения:

- day;  
- week;
- month;
- year.

Например, если установить режим 'month', планировщик будет запрашивать данные только за текущий месяц и подгружать оставшиеся по требованию.  
[Подробнее о режимах загрузки](guides/loading-data.md#dynamic-loading).

#### Запрос

Сгенерированные запросы выглядят так:

~~~php
Data?from=DATEHERE&to=DATEHERE
~~~

*где DATEHERE — корректное значение даты в формате, заданном опцией [load_date](api/config/load_date.md).*

<br>

Если вы используете [dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html) на стороне сервера, вам не нужно выполнять никаких дополнительных операций на стороне сервера для разбора данных.

### Связанные API
- [load_date](api/config/load_date.md)
- [load_format](api/template/load_format.md)

### Связанные руководства
- [Загрузка данных](guides/loading-data.md#dynamic-loading)