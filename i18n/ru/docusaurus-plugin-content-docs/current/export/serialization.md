---
title: "Сериализация данных в XML, JSON, iCal"
sidebar_label: "Сериализация данных в XML, JSON, iCal"
---

# Сериализация данных в XML, JSON, iCal

## Подготовка

Чтобы включить эту функциональность, просто активируйте расширение **serialize**.

~~~js
scheduler.plugins({
    serialize: true
});
~~~

## Экспорт в XML

Чтобы преобразовать данные планировщика в XML-строку, используйте метод [toXML](api/method/toxml.md):

~~~js
const xml = scheduler.toXML(); // xml string
~~~


[Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)


## Экспорт в JSON

Чтобы преобразовать данные планировщика в JSON-строку, используйте метод [toJSON](api/method/tojson.md):

~~~js
const json_string = scheduler.toJSON(); // json string
~~~

:::note
Имейте в виду, что этот метод возвращает JSON-строку, а не JavaScript-объект. Если вам нужен JSON-объект, используйте метод [getEvents](api/method/getevents.md).
:::


[Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)


## Экспорт в iCal

Чтобы преобразовать данные планировщика в iCal-строку, используйте метод [toICal](api/method/toical.md):

~~~js
const ical_string = scheduler.toICal(); // ical string
~~~

Также существует [внешний скрипт для операций импорта-экспорта iCal](guides/ical-export-import.md)


[Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)


## Атрибуты при сериализации

:::note
Этот подход не применяется к формату iCal.
:::

По умолчанию в экспорт включаются только стандартные атрибуты (свойства):

1. id
2. text
3. start_date (*формат сериализации контролируется свойством [date_format](api/config/date_format.md)*)
4. end_date

Чтобы включить пользовательские атрибуты, можно переопределить метод **data_attributes**. Простой пример:

~~~js
scheduler.data_attributes = function(){
    return [
        ["id"],["text"],["date_start"],["date_end"],
        ["custom_attribute"]
    ];
};
~~~

По сути, этот метод возвращает список имён атрибутов.

Также можно указать функцию форматирования для обработки данных атрибута перед сериализацией.

Это удобно для обработки дат, которые требуют форматирования перед добавлением в XML.

~~~js
scheduler.data_attributes = function(){
    return [
        ["id"],
        ["text"],
        ["start_date",scheduler.templates.format_date],
        ["end_date",scheduler.templates.format_date]];
}
~~~

## Сериализация повторяющихся событий

:::note
Этот способ не применим для формата iCal.
:::

Если используется расширение "recurring", необходимо определить дополнительные атрибуты, связанные с повторяющимися событиями:

~~~js
scheduler.data_attributes = function(){
    const empty = function(a){ return a || ""; }
    return [["id"],
        ["text"],
        ["start_date",scheduler.templates.xml_format],
        ["end_date",scheduler.templates.xml_format],
        ["rec_type",empty],
        ["event_length",empty],
        ["event_pid",empty]];
}
~~~

## Сохранение данных в XML-файл

Сериализация позволяет сохранять данные, просто помещая их в XML-файл, без необходимости использования базы данных.

- Сначала включите расширение **serialize**:

~~~js
scheduler.plugins({
    serialize: true
});
~~~

- Далее добавьте на страницу скрытую форму для сохранения данных:

~~~xml
<form id="xml_form" action="xml_writer.php" method="post" target="hidden_frame" >
    <input type="hidden" name="data" value="" id="data">
</form>
~~~

- Разместите на странице кнопку "Сохранить":

~~~html
<input type="button" name="save" value="save" onclick="save()" >
~~~

~~~js
function save(){
    const form = document.getElementById("xml_form");
    form.elements.data.value = scheduler.toXML();
    form.submit();
}
~~~

- На сервере запишите данные в существующий файл. Пример xml_writer.php:

~~~php
<?php
    file_put_contents("./data.xml",$_POST["data"]);
?>
~~~

Пустой файл data.xml выглядит так:

~~~xml
<data></data>
~~~

С такой настройкой планировщик сможет загружать события из data.xml, а при нажатии кнопки "save" будет сериализовать текущее состояние планировщика в XML и сохранять его обратно в файл.

Таким образом, при следующей загрузке планировщика будут отображаться ранее сохранённые события.

## Решение проблем

Если вы замечаете нежелательное экранирование данных при сохранении, убедитесь, что в вашей конфигурации PHP отключена опция "magic_quotes".
