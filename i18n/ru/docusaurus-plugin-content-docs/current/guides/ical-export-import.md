---
title: "iCal экспорт/импорт"
sidebar_label: "iCal экспорт/импорт"
---

# iCal экспорт/импорт

:::note
Этот инструмент устарел и больше не поддерживается. Пожалуйста, не используйте его в своих приложениях!
:::

Устаревший экспортер/импортер реализован на PHP, поэтому приведённые ниже фрагменты кода являются примерами на PHP. Если вы используете другой бэкэнд, воспользуйтесь библиотекой iCalendar вашей платформы и сопоставьте поля со свойствами событий Scheduler.


У вас есть возможность импортировать/экспортировать данные формата iCal, используя либо готовую к использованию утилиту, либо методы API. 

## iCal экспортёр (клиентская часть)

![ical_exporter1.png](/img/ical_exporter1.png)

Клиентская часть утилиты состоит из двух частей:

- **Конфигурация ресурса** 
- **Конфигурация базы данных**.

В первой части вы устанавливаете путь к данным. Это можно сделать либо выбрав путь из открытого диалогового окна (**файл iCal**, кнопка «Обзор») либо указав его вручную (**URL iCal**).
  
  
Вторая часть содержит стандартные настройки базы данных (хост, имя базы данных и имя таблицы, имя пользователя и пароль), в которые вы хотите сохранить данные iCal. Здесь также можно задать, следует ли удалять старые данные (**Удалить все данные**).

## Методы API

Здесь вы можете найти все API-методы, которые можно использовать для реализации экспорта/импорта iCal в приложении.
 
### Инициализация

Чтобы инициализировать экспортер/импортер iCal, используйте следующий код:


~~~php
require_once("codebase/class.php");
$export = new ICalExporter();

~~~

### Импорт iCalendar

Вы можете импортировать данные iCal, используя следующие методы:

- **setTitle($title)** - устанавливает заголовок файла iCal в методе toICal()
- **getTitle()** - возвращает заголовок файла iCal
- **toICal($events)** -  преобразует информацию из массива или XML-строки в формат iCalendar

### Экспорт iCalendar

Вы можете экспортировать данные iCal, используя следующие методы:

- **toHash($ical)** - преобразует строку iCal в массив событий
- **toXML($ical)** - преобразует строку iCal в XML-формат


#### Примеры
Ниже приведено несколько фрагментов кода, демонстрирующих выполнение экспорта/импорта iCal.


+ Установка заголовка iCalendar

Следующий код позволяет установить заголовок импортируемых/экспортируемых данных iCalendar.

~~~php
$xml = file_get_contents("events_rec.xml");
require_once("codebase/class.php");
$export = new ICalExporter();
$export->setTitle("Calendar name");
$ical = $export->toICal($xml);
file_put_contents("ical.ics", $ical);

~~~

+ Массив событий

Это пример массива событий, который используется в импорте/экспорте данных из/в массив.

~~~php
$events = array(
    array(
        "id" => 1,
        "start_date" => "2027-04-05 08:00:00",
        "end_date" => "2027-04-09 09:00:00",
        "text" => "text1",
        "rec_type" => "week_2___3,5",
        "event_pid" => null,
        "event_length" => 3600
    ),

    array(
        "id" => 2,
        "start_date" => "2027-04-06 12:00:00",
        "end_date" => "2027-04-06 18:00:00",
        "text" => "text2",
        "rec_type" => "",
        "event_pid" => null,
        "event_length" => null
    ),

    array(
        "id" => 3,
        "start_date" => "2027-04-07 12:00:00",
        "end_date" => "2027-04-07 18:00:00",
        "text" => "text3",
        "rec_type" => "",
        "event_pid" => null,
        "event_length" => null
    ),

    array(
        "id" => 4,
        "start_date" => "2027-04-08 12:00:00",
        "end_date" => "2027-04-08 18:00:00",
        "text" => "text4",
        "rec_type" => "",
        "event_pid" => null,
        "event_length" => null
    )
);

~~~


+ Из массива в iCal

Используйте этот код, чтобы экспортировать данные из массива в строку iCal:

~~~php
require_once("codebase/class.php");
$export = new ICalExporter();
$ical = $export->toICal($events);
file_put_contents("ical.ics");

~~~


+ Из XML в iCal

Используйте этот код, чтобы экспортировать данные из XML в iCal:

~~~php
$xml = file_get_contents("events_rec.xml");
require_once("codebase/class.php");
$export = new ICalExporter();
$ical = $export->toICal($xml);
file_put_contents("ical.ics");

~~~


+ Из iCal в массив

Используйте этот код, чтобы экспортировать данные из iCal в массив:

~~~php
$ical = file_get_contents("ical.ics");
require_once("codebase/class.php");
$export = new ICalExporter();
$events = $export->toHash($ical);

~~~


+ Из iCal в XML

Используйте этот код, чтобы экспортировать данные из iCal в XML:

~~~php
$ical = file_get_contents("ical.ics");
require_once("codebase/class.php");
$export = new ICalExporter();
$xml = $export->toXML($ical);
file_put_contents("events_rec.xml", $xml);

~~~