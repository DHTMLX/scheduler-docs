---
title: "Daten-Serialisierung nach XML, JSON, iCal"
sidebar_label: "Daten-Serialisierung nach XML, JSON, iCal"
---

# Daten-Serialisierung nach XML, JSON, iCal 

## Vorbereitungen 

Um diese Funktionalität zu aktivieren, müssen Sie lediglich die **serialize**-Erweiterung aktivieren.

~~~js
scheduler.plugins({
    serialize: true
});
~~~

## Export nach XML 

Um die Daten des Schedulers in einen XML-String zu konvertieren, verwenden Sie die Methode [toXML](api/method/toxml.md):


~~~js
var xml = scheduler.toXML(); //xml string

~~~


[Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)


## Export nach JSON 

Um die Daten des Schedulers in einen JSON-String zu konvertieren, verwenden Sie die Methode [toJSON](api/method/tojson.md): 


~~~js
var json_string = scheduler.toJSON(); //json string
~~~


:::note
Beachten Sie, dass diese Methode einen JSON-String und kein JavaScript-Objekt zurückgibt. Wenn Sie ein JSON-Objekt benötigen, verwenden Sie stattdessen die Methode [getEvents](api/method/getevents.md).
:::


[Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)


## Export nach iCal 

Um die Daten des Schedulers in einen iCal-String zu konvertieren, verwenden Sie die Methode [toICal](api/method/toical.md): 


~~~js
var ical_string = scheduler.toICal(); //ical string
~~~


Zusätzlich gibt es ein [externes Skript für iCal Import-Export-Operationen](guides/ical-export-import.md)


[Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)


## Attribute bei der Serialisierung

:::note
Dieser Ansatz gilt nicht für das iCal-Format.
:::

Standardmäßig werden beim Export nur die Standardattribute (Eigenschaften) berücksichtigt:

1. id
2. text
3. start_date (*das Serialisierungsformat wird durch die Eigenschaft [date_format](api/config/date_format.md) gesteuert*)
4. end_date

  
Um benutzerdefinierte Attribute einzubeziehen, können Sie die Methode **data_attributes** überschreiben. Ein einfaches Beispiel sieht so aus:


~~~js
scheduler.data_attributes = function(){
    return [
        ["id"],["text"],["date_start"],["date_end"],
        ["custom_attribute"]
    ];
};
~~~


Im Wesentlichen gibt diese Methode eine Liste von Attributnamen zurück. 


Sie können auch eine Formatierungsfunktion angeben, um Attributdaten vor der Serialisierung zu verarbeiten.

Dies ist nützlich, um Datumsangaben vor dem Hinzufügen zu XML zu formatieren.

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
Diese Technik ist für das iCal-Format nicht anwendbar.
:::

Wenn die "recurring"-Erweiterung verwendet wird, müssen zusätzliche Attribute für wiederkehrende Ereignisse definiert werden:

~~~js
scheduler.data_attributes = function(){
    var empty = function(a){ return a||""; }
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

Die Serialisierung ermöglicht es, Daten einfach durch Speichern in einer XML-Datei zu sichern, ohne dass eine Datenbank erforderlich ist. 

- Aktivieren Sie zunächst die **serialize**-Erweiterung:

~~~js
scheduler.plugins({
    serialize: true
});
~~~


- Fügen Sie als Nächstes ein verstecktes Formular zur Seite hinzu, um die Daten zu speichern:


~~~xml
<form id="xml_form" action="xml_writer.php" method="post" target="hidden_frame" >
    <input type="hidden" name="data" value="" id="data">
</form>
~~~


- Fügen Sie eine "Speichern"-Schaltfläche auf der Seite hinzu


~~~html
<input type="button" name="save" value="save" onclick="save()" >

~~~


~~~js
function save(){
    var form = document.getElementById("xml_form");
    form.elements.data.value = scheduler.toXML();
    form.submit();
}
~~~


- Schreiben Sie serverseitig die Daten in eine bestehende Datei. Die xml_writer.php könnte folgendermaßen aussehen:


~~~php
<?php
    file_put_contents("./data.xml",$_POST["data"]);
?>
~~~


Eine leere data.xml-Datei sieht so aus:


~~~xml
<data></data>
~~~


Mit dieser Konfiguration kann der Scheduler Ereignisse aus data.xml laden, und durch Drücken der "save"-Schaltfläche wird der aktuelle Zustand des Schedulers serialisiert und in der Datei gespeichert. 

So werden beim nächsten Laden des Schedulers die zuvor gespeicherten Ereignisse angezeigt. 


## Fehlerbehebung

Wenn Sie beim Speichern unerwünschtes Escaping der Daten bemerken, stellen Sie sicher, dass "magic_quotes" in Ihrer PHP-Konfiguration deaktiviert ist. 
