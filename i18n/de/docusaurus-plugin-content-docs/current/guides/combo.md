---
title: "Combo"
sidebar_label: "Combo"
---

# Combo

In diesem Abschnitt wird das Kombinationsfeld (Combo-Box) der <a href="https://docs.dhtmlx.com/combo__index.html">DHTMLX Combo Komponente</a> behandelt.

![combo_editor](/img/combo_editor.png)

~~~js
var holders = [
    { key: 1, label: 'James' },
    { key: 2, label: 'Alex' },
    { key: 3, label: 'Antony' },
    { key: 4, label: 'Andrew' }
];
            
scheduler.locale.labels.section_holder = "Holder";

scheduler.config.lightbox.sections = [
    { name:"description", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"holders", options:holders, map_to:"holders", type:"combo", 
    image_path:"../common/dhtmlxCombo/imgs/", height:30, filtering:true},
    { name:"time", height:72, type:"time", map_to:"auto"}
];
~~~ 


[Combo box in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/15_combo_select.html)


## Initialisierung

Um das Combo-Steuerelement in der Lightbox zu verwenden, gehen Sie wie folgt vor:

1. Binden Sie die Dateien von dhtmlxCombo ein:
~~~js
<script src="../codebase/dhtmlxscheduler.js" ...></script>
<link rel="stylesheet" href="../codebase/dhtmlxscheduler.css" ...>

<link rel="stylesheet" href="common/dhtmlxCombo/dhtmlxcombo.css" ..>
<script src="common/dhtmlxCombo/dhtmlxcombo.js" ...></script>
~~~
2. Aktivieren Sie die editors-Erweiterung auf der Seite:
~~~js
scheduler.plugins({
    editors: true
});
~~~
3. Fügen Sie die Sektion zur Lightbox-Konfiguration hinzu:
~~~js
scheduler.config.lightbox.sections = [
    { name:"description", ... },
    { name:"holders", options:holders, map_to:"holders", type:"combo", 
    image_path:"../common/dhtmlxCombo/imgs/", height:30, filtering:true},
    { name:"time", ...}
];
~~~
4. Legen Sie das Label für die Sektion fest:
~~~js
scheduler.locale.labels.section_holders = "Holder";
~~~

  


[Combo box in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/15_combo_select.html)


## Eigenschaften

Hier sind einige wichtige und häufig genutzte Eigenschaften für das 'combo'-Steuerelement (die vollständige Liste finden Sie [hier](api/config/lightbox.md)):

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) Der Name der Sektion</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) Die Höhe der Sektion</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>string</i>) Der Name der Daten-Eigenschaft, die der Sektion zugeordnet wird</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) Der Typ des Steuerelements der Sektion</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>options</b></td>
  <td>(<i>Array von Objekten</i>) Definiert die Auswahloptionen des Steuerelements (<b>für 'select', 'multiselect', 'radio', 'combo' Steuerelemente</b>). Jedes Objekt im Array spezifiziert eine einzelne Option und besitzt folgende Eigenschaften: <ul> <li><b>key</b> - (<i>string</i>) Die ID der Option. Dieses Attribut wird mit der Daten-Eigenschaft des Events verglichen, um Optionen zuzuweisen</li> <li><b>label</b> - (<i>string</i>) Die Bezeichnung der Option</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>image_path</b></td>
  <td>(<i>string</i>) Der Pfad zu den dhtmlxCombo-Bildern</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>filtering</b></td>
  <td>(<i>boolean, string</i>) Aktiviert die Auto-Filter-Unterstützung (Optionen werden beim Tippen gefiltert). Optional Der Parameter kann folgende Werte annehmen: <ul> <li><b>false</b> - Deaktiviert das Filtern</li> <li><b>true oder "start"</b> - Aktiviert das Filtern, Suche ab Beginn des Eintrags</li> <li><b>"between"</b> - Aktiviert das Filtern, sucht jede Vorkommen des eingegebenen Textes in den Einträgen</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>script_path</b></td>
  <td>(<i>string</i>) Der Pfad zum serverseitigen Skript, das die Combo-Optionen bereitstellt. Optional</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>cache</b></td>
  <td>(<i>boolean</i>) Aktiviert oder deaktiviert das Caching der Skript-Antworten (Aktivierung empfohlen). Optional</td>
  </tr>
  </tbody>
</table>


## Befüllen des Steuerelements mit Daten

Um Werte für das Combo-Steuerelement bereitzustellen, verwenden Sie den [options](api/config/lightbox.md) Parameter:

~~~js
scheduler.config.lightbox.sections = 
    { 
        name:"holders", type:"combo", 
        ...
        options:[
            { key: 1, label: 'James' },
            { key: 2, label: 'Alex' },
            { key: 3, label: 'Antony' },
            { key: 4, label: 'Andrew' }
    ]},
    ...
];
~~~

Jeder Eintrag im [options](api/config/lightbox.md) Parameter muss zwei erforderliche Eigenschaften besitzen:

- **key** - Die ID der Option
- **label** - Die Bezeichnung der Option

## Befüllen des Steuerelements mit Daten vom Server

Um Combo-Optionen vom Server zu laden, verwenden Sie die **script_path** Eigenschaft, um die URL des serverseitigen Skripts anzugeben, das die Anfragen verarbeitet.

~~~js
scheduler.config.lightbox.sections = [
    { name: "country", type: "combo", script_path: "data/combo_select", ... },
        ...
];
~~~

Die **script_path** Eigenschaft definiert die URL, von der die Combo ihre Optionen per AJAX lädt.

Da der Combo-Selektor auf [dhtmlxCombo](https://docs.dhtmlx.com/combo__index.html) basiert, sollte der Server die Daten in einem kompatiblen Format zurückgeben.
Details zum Hinzufügen von Daten zur Combo finden Sie im Artikel [Loading Options](https://docs.dhtmlx.com/combo__adding_options.html). 

Anfragen werden in zwei Szenarien gestellt:

1) Wenn die Lightbox geöffnet wird und die Combo einen ausgewählten Wert besitzt, sendet das Steuerelement eine Anfrage, um das Label für diese Option zu laden.

Die Anfrage enthält einen **id** Query-Parameter:

~~~
GET /url?id="1"
~~~

Die Antwort sollte ein Array enthalten, das nur das Element mit der angegebenen ID enthält, formatiert wie folgt:

~~~
[
   { "value": 1, "text": "Marketing"}
]
~~~


2) Wenn ein Benutzer beginnt, im Combo-Eingabefeld zu tippen, lädt das Steuerelement gefilterte Optionen.

Die Anfrage enthält den eingegebenen Text als **mask** Query-Parameter:

~~~
GET /url?mask="al"
~~~

Der Server sollte alle Elemente zurückgeben, die mit dem Filter übereinstimmen:

~~~
[
   { "value": 1, "text": "Albania"},
   { "value": 3, "text": "Algeria"},
]
~~~

Wenn Sie die [PHP Connector](https://github.com/DHTMLX/connector-php) Bibliothek verwenden, könnte der serverseitige Code wie folgt aussehen:

~~~js
<?php
    require_once('../../connector-php/codebase/combo_connector.php');
    require_once("../common/config.php");

    $combo = new ComboConnector($res, $dbtype);

    $combo->event->attach("beforeFilter", "by_id");
    function by_id($filter) {
        if (isset($_GET['id']))
            $filter->add("item_id", $_GET['id'], '=');
    }    

    $combo->dynamic_loading(3);
    $combo->render_table("Countries","item_id","item_nm");

?>
~~~


[Populating a combo box from the server](https://docs.dhtmlx.com/scheduler/samples/02_customization/18_combo_select_from_db.html)


## Auto-Filtering Modus

Der Auto-Filtering Modus bedeutet, dass die Optionen automatisch beim Tippen gefiltert werden. Um diesen Modus zu aktivieren, setzen Sie die **filtering** Eigenschaft auf *true*:

~~~js
scheduler.config.lightbox.sections = [
    { name:"holders", type:"combo", filtering:true, ... },
    ...
];
~~~
:::note
Beachten Sie, dass Auto-Filtering sowohl bei clientseitig als auch serverseitig geladenen Daten verwendet werden kann.
:::


Weitere Details finden Sie in der dhtmlxCombo Dokumentation unter <a href="https://docs.dhtmlx.com/combo__filtering.html">Filtering</a>.
