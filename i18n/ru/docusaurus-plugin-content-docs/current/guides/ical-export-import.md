---
title: "iCal экспорт/импорт"
sidebar_label: "iCal экспорт/импорт"
---

# iCal экспорт/импорт

:::note
Этот инструмент устарел и больше не поддерживается. Пожалуйста, не используйте его в своих приложениях!
:::

Можно импортировать или экспортировать данные в формате iCal с помощью готовой утилиты или API-методов.

## iCal экспортер (Фронтенд)

![ical_exporter1.png](/img/ical_exporter1.png)

Фронтенд утилиты состоит из двух разделов:

- **Конфигурация ресурса**
- **Конфигурация базы данных**.

В первом разделе указывается путь к данным. Это можно сделать, выбрав путь через открывающееся диалоговое окно (**Ical file**, кнопка "Overview") или введя его вручную (**Ical URL**).

Второй раздел включает стандартные параметры базы данных (хост, имена базы данных и таблицы, имя пользователя и пароль), в которую будут сохраняться данные iCal. Здесь также можно выбрать, удалять ли старые данные (**Delete all data**).

## API-методы

Ниже приведены API-методы, доступные для реализации экспорта/импорта iCal в приложении.

### Инициализация

Чтобы настроить iCal экспортер/импортер, используйте следующий код:

~~~php
require_once("codebase/class.php");
$export = new ICalExporter();

~~~

### Импорт iCalendar

Для импорта данных iCal используются следующие методы:

- **setTitle($title)** - задаёт заголовок для файла iCal в методе toICal()
- **getTitle()** - возвращает заголовок файла iCal
- **toICal($events)** - преобразует данные из массива или XML-строки в формат iCalendar

### Экспорт iCalendar

Для экспорта данных iCal используются следующие методы:

- **toHash($ical)** - преобразует строку iCal в массив событий
- **toXML($ical)** - преобразует строку iCal в формат XML

#### Примеры
Ниже приведены примеры кода, демонстрирующие экспорт/импорт iCal.

+ Установка заголовка iCalendar

В этом примере показано, как задать заголовок для импортируемых или экспортируемых данных iCalendar.

~~~php
$xml = file_get_contents("events_rec.xml");
require_once("codebase/class.php");
$export = new ICalExporter();
$export->setTitle("Calendar name");
$ical = $export->toICal($xml);
file_put_contents("ical.ics", $ical);

~~~

+ Массив событий

В этом примере представлен массив событий, используемый для импорта/экспорта данных из/в массив.

~~~php
$events = array(
    array(
        "id" => 1,
        "start_date" => "2010-04-05 08:00:00",
        "end_date" => "2012-04-09 09:00:00",
        "text" => "text1",
        "rec_type" => "week_2___3,5",
        "event_pid" => null,
        "event_length" => 3600
    ),

    array(
        "id" => 2,
        "start_date" => "2010-04-06 12:00:00",
        "end_date" => "2010-04-06 18:00:00",
        "text" => "text2",
        "rec_type" => "",
        "event_pid" => null,
        "event_length" => null
    ),

    array(
        "id" => 3,
        "start_date" => "2010-04-07 12:00:00",
        "end_date" => "2010-04-07 18:00:00",
        "text" => "text3",
        "rec_type" => "",
        "event_pid" => null,
        "event_length" => null
    ),

    array(
        "id" => 4,
        "start_date" => "2010-04-08 12:00:00",
        "end_date" => "2010-04-08 18:00:00",
        "text" => "text4",
        "rec_type" => "",
        "event_pid" => null,
        "event_length" => null
    )
);

~~~

+ Из массива в iCal

Этот пример экспортирует данные из массива в строку iCal:

~~~php
require_once("codebase/class.php");
$export = new ICalExporter();
$ical = $export->toICal($events);
file_put_contents("ical.ics");

~~~

+ Из XML в iCal

Этот пример экспортирует данные из XML в формат iCal:

~~~php
$xml = file_get_contents("events_rec.xml");
require_once("codebase/class.php");
$export = new ICalExporter();
$ical = $export->toICal($xml);
file_put_contents("ical.ics");

~~~

+ Из iCal в массив

Этот пример экспортирует данные из файла iCal в массив:

~~~php
$ical = file_get_contents("ical.ics");
require_once("codebase/class.php");
$export = new ICalExporter();
$events = $export->toHash($ical);

~~~

+ Из iCal в XML

Этот пример экспортирует данные из файла iCal в формат XML:

~~~php
$ical = file_get_contents("ical.ics");
require_once("codebase/class.php");
$export = new ICalExporter();
$xml = $export->toXML($ical);
file_put_contents("events_rec.xml", $xml);

~~~
