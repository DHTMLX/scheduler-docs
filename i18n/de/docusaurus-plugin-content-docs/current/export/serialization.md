---
title: "Datenserialisierung in XML, JSON, iCal"
sidebar_label: "Datenserialisierung in XML, JSON, iCal"
---

# Datenserialisierung in XML, JSON, iCal

## Vorbereitungen

Um solche Funktionalität zu aktivieren, aktiviere die **serialize**-Erweiterung.

~~~js
scheduler.plugins({
    serialize: true
});
~~~


## Export nach XML

Um Scheduler-Daten in einen XML-String zu serialisieren, verwenden Sie die [toXML](api/method/toxml.md) Methode:


~~~js
const xml = scheduler.toXML(); // xml string
~~~


[Scheduler-Ereignisse serialisieren](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)


## Export nach JSON

Um Scheduler-Daten in einen JSON-String zu serialisieren, verwenden Sie die [toJSON](api/method/tojson.md) Methode: 


~~~js
const json_string = scheduler.toJSON(); //json string
~~~


:::note
Hinweis, die Methode gibt einen JSON-String zurück, kein Objekt. Wenn Sie ein JSON-Objekt benötigen - verwenden Sie die [getEvents](api/method/getevents.md) Methode.
:::


[Scheduler-Ereignisse serialisieren](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)


## Export nach iCal

Um Scheduler-Daten in einen ICal-String zu serialisieren, verwenden Sie die [toICal](api/method/toical.md) Methode: 


~~~js
const ical_string = scheduler.toICal(); //ical string
~~~


Außerdem gibt es ein [externes Skript für iCal-Import-Export-Operationen](guides/ical-export-import.md)


[Scheduler-Ereignisse serialisieren](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)


## Attribute in der Serialisierung

:::note
Die folgende Technik gilt nicht für das iCal-Format.
:::

Standardmäßig enthält der Export nur Standardattribute (Eigenschaften):

1. id
2. text
3. start_date (*Format der Serialisierung wird durch die [date_format](api/config/date_format.md) Eigenschaft definiert*)
4. end_date

  
Wenn Sie einige benutzerdefinierte Attribute einbeziehen müssen, können Sie die **data_attributes**-Methode neu definieren. Im einfachsten Fall sieht es wie folgt aus:


~~~js
scheduler.data_attributes = function(){
    return [
        ["id"],["text"],["date_start"],["date_end"],
        ["custom_attribute"]
    ];
};
~~~


Im Wesentlichen definiert die Methode eine Liste von Attributnamen. 


Aber Sie können die Formatierungsfunktion definieren, die beschreibt, wie Attributdaten vor der Serialisierung verarbeitet werden müssen.

Es kann nützlich sein für Datumsangaben, die vor der Platzierung in XML konvertiert werden müssen

~~~js
scheduler.data_attributes = function(){
    return [
        ["id"],
        ["text"],
        ["start_date",scheduler.templates.format_date],
        ["end_date",scheduler.templates.format_date]];
}
~~~

## Serialisierung von wiederkehrenden Ereignissen

:::note
Die untenstehende Technik ist für das iCal-Format nicht anwendbar.
:::

Wenn Sie die Erweiterung "recurring" verwenden, müssen Sie zusätzliche Attribute definieren, die von wiederkehrenden Ereignissen verwendet werden:

~~~js
scheduler.data_attributes = function(){
    const empty = function(a){ return a||""; }
    return [["id"],
        ["text"],
        ["start_date",scheduler.templates.xml_format],
        ["end_date",scheduler.templates.xml_format],
        ["rec_type",empty],
        ["event_length",empty],
        ["event_pid",empty]];
}
~~~


## Speichern von Daten in einer XML-Datei

Die Serialisierung ermöglicht es Ihnen, eine einfache Routine zum Speichern von Daten zu implementieren, die keine DB benötigt – die Daten werden in einer XML-Datei gespeichert. 

- Zunächst aktivieren Sie die **serialize**-Erweiterung:

~~~js
scheduler.plugins({
    serialize: true
});
~~~


- Platzieren Sie anschließend ein verstecktes Formular zum Speichern der Daten auf der Seite:


~~~xml
<form id="xml_form" action="xml_writer.php" method="post" target="hidden_frame" >
    <input type="hidden" name="data" value="" id="data">
</form>
~~~


- Platzieren Sie den "Save"-Button auf der Seite


~~~html
<input type="button" name="save" value="save" onclick="save()" >

~~~


~~~js
function save(){
    let form = document.getElementById("xml_form");
    form.elements.data.value = scheduler.toXML();
    form.submit();
}
~~~


- Auf der Serverseite schreiben Sie die Daten in eine vorhandene Datei. xml_writer.php könnte wie folgt aussehen:


~~~php
<?php
    file_put_contents("./data.xml",$_POST["data"]);
?>
~~~


Die leere data.xml lautet:


~~~xml
<data></data>
~~~


Så ist alles erledigt, jetzt kann der Scheduler aus data.xml geladen werden, der Klick auf den "save"-Button serialisiert den aktuellen Zustand des Schedulers nach XML und speichert ihn zurück in die Datei. 

Beim nächsten Laden werden die zuvor gespeicherten Ereignisse geladen. 


## Fehlerbehebung

Wenn beim Speichern der Daten unerwünschte Escaping auftreten, stellen Sie sicher, dass in der PHP-Konfiguration magic_quotes deaktiviert ist.