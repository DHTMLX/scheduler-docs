---
title: "Combo"
sidebar_label: "Combo"
---

# Combo

Eine Combo-Box, bereitgestellt durch die <a href="https://docs.dhtmlx.com/combo__index.html">DHTMLX Combo-Komponente</a>.

![combo_editor](/img/combo_editor.png)

~~~js
const holders = [
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

Um die Combo-Steuerung zum Lightbox hinzuzufügen, befolgen Sie diese Schritte:

1. <b>Integrieren Sie die <a href="https://docs.dhtmlx.com/combo__index.html">dhtmlxCombo</a>-Dateien:</b>
~~~js
<script src="../codebase/dhtmlxscheduler.js" ...></script>
<link rel="stylesheet" href="../codebase/dhtmlxscheduler.css" ...>

<link rel="stylesheet" href="common/dhtmlxCombo/dhtmlxcombo.css" ..>
<script src="common/dhtmlxCombo/dhtmlxcombo.js" ...></script>
~~~
2. <b>Aktivieren Sie die [editors](guides/extensions-list.md#editors) Erweiterung auf der Seite</b>:
~~~js
scheduler.plugins({
    editors: true
});
~~~
3. <b>Fügen Sie die Sektion zur Lightbox-Konfiguration hinzu:</b>
~~~js
scheduler.config.lightbox.sections = [
    { name:"description", ... },
    { name:"holders", options:holders, map_to:"holders", type:"combo", 
    image_path:"../common/dhtmlxCombo/imgs/", height:30, filtering:true},
    { name:"time", ...}
];
~~~
4. <b>Setzen Sie das Label für die Sektion</b>:
~~~js
scheduler.locale.labels.section_holders = "Holder";
~~~

[Combo box in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/15_combo_select.html)


## Eigenschaften

Die folgenden Eigenschaften sind größtenteils wichtig und werden häufig für die 'combo'-Steuerung festgelegt (siehe die vollständige Liste [hier](api/config/lightbox.md)):

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) der Name des Abschnitts</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) die Höhe des Abschnitts</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>string</i>) der Name einer Daten-Eigenschaft, die dem Abschnitt zugeordnet wird</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) der Typ des Abschnitts-Steuerelements</td>
  </tr>
  <tr>
  <td class="webixdoc_links0" style="vertical-align: top;"><b>options</b></td>
  <td>(<i>array von Objekten</i>) definiert die Auswahloptionen des Steuerelements (<b>für 'select', 'multiselect, 'radio', 'combo'-Steuerungen</b>). Jedes Objekt im Array spezifiziert eine einzelne Option und nimmt folgende Eigenschaften auf: <ul> <li><b>key</b> - (<i>string</i>) die Option-ID. Dieses Attribut wird mit der Daten-Eigenschaft des Events verglichen, um Optionen Events zuzuordnen</li> <li><b>label</b> - (<i>string</i>) die Bezeichnung der Option</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>image_path</b></td>
  <td>(<i>string</i>) der Pfad zu den dhtmlxCombo-Bildern</td>
  </tr>
  <tr>
  <td class="webixdoc_links0" style="vertical-align: top;"><b>filtering</b></td>
  <td>(<i>boolean, string</i>) aktiviert die Auto-Filter-Unterstützung (Optionen werden beim Tippen gefiltert). Optional Der Parameter kann einen der folgenden Werte annehmen: <ul> <li><b>false</b> - Filterung deaktivieren</li> <li><b>true oder "start"</b> - Filterung aktivieren, Suche beginnt am Anfang des Elements</li> <li><b>"between"</b> - Filterung aktivieren, Suche nach jeder Vorkommen des eingegebenen Texts in den Elementen</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>script_path</b></td>
  <td>(<i>string</i>) der Pfad zum serverseitigen Skript, das die Optionen des Combos vom Server lädt. Optional</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>cache</b></td>
  <td>(<i>boolean</i>) aktiviert/deaktiviert das Caching der Skriptantworten (empfohlen, die Eigenschaft zu aktivieren). Optional</td>
  </tr>
  </tbody>
</table>


## Befüllung der Steuerung mit Daten

Im Allgemeinen sollten Sie, um Werte für die Combo-Steuerung festzulegen, den Parameter [options](api/config/lightbox.md) verwenden:

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

Elemente im Parameter [options](api/config/lightbox.md) müssen zwei Pflicht-Eigenschaften haben:

- **key** - (<i>string</i>) die Option-ID
- **label** - (<i>string</i>) die Bezeichnung der Option

## Befüllung der Steuerung mit Daten vom Server

Um die Combo-Steuerung vom Server zu befüllen, verwenden Sie die Eigenschaft **script_path**, wobei der Pfad zum serverseitigen Skript angegeben wird, das Anfragen vom Server bearbeitet.

~~~js
scheduler.config.lightbox.sections = [
    { name: "country", type: "combo", script_path: "data/combo_select", ... },
        ...
];
~~~

Die Eigenschaft **script_path** gibt eine URL an, von der das Combo seine Optionen lädt, d. h. wenn script_path angegeben ist, versucht das Combo, Daten von dieser URL per AJAX zu laden.

Der Combo-Auswahl-Selector basiert auf [dhtmlxCombo](https://docs.dhtmlx.com/combo__index.html), daher sollte der Server Daten zurückliefern, die damit kompatibel sind.
Sie können in dem Artikel [Loading Options](https://docs.dhtmlx.com/combo__adding_options.html) nachlesen, wie Daten in das Combo eingefügt werden.

Die URL wird in zwei Fällen angefragt:

1) Wenn das Lightbox-Fenster geöffnet wird und das Combo einen ausgewählten Wert hat – das Steuerelement sendet eine Anfrage an den Server und lädt eine Bezeichnung für die ausgewählte Option.

Die Anfrage enthält einen Query-Parameter **id**:

~~~
GET /url?id="1"
~~~

Die Antwort sollte ein Array mit nur dem Element mit der angegebenen id im folgenden Format zurückgeben:

~~~
[
   { "value": 1, "text": "Marketing"}
]
~~~


2) Wenn der Benutzer Text in das Eingabefeld eingibt – das Steuerelement lädt gefilterte Werte. Die Client-Anwendung sendet eine Anfrage mit dem eingegebenen Text im Parameter **mask** der Abfrage:

~~~
GET /url?mask="al"
~~~

Die Server-Antwort sollte alle Elemente zurückgeben, die dem Maskenwert entsprechen:
~~~
[
   { "value": 1, "text": "Albania"},
   { "value": 3, "text": "Algeria"},
]
~~~

Beispiel eines Backend-Handlers (Node.js/Express):

~~~js
app.get("/api/countries", async (req, res) => {
  const { id, mask } = req.query;
  // Abfrage Ihrer Datenquelle nach id oder mask
  const items = await countriesService.find({ id, mask });
  res.json(items); // [{ value: 1, text: "Albania" }, ...]
});
~~~


[Populating a combo box from the server](https://docs.dhtmlx.com/scheduler/samples/02_customization/18_combo_select_from_db.html)


## Auto-Filtering-Modus

Der Auto-Filtering-Modus ist der Modus, in dem Optionen automatisch gefiltert werden, während der Benutzer tippt. Um den Modus zu aktivieren, setzen Sie die Eigenschaft **filtering** auf true:

~~~js
scheduler.config.lightbox.sections = [
    { name:"holders", type:"combo", filtering:true, ... },
    ...
];
~~~
:::note
Hinweis: Sie können den Auto-Filtering-Modus verwenden, unabhängig von der Quelle, von der Sie Daten laden (Client- oder Server-Seite).
:::


Weitere Informationen finden Sie in der Dokumentation zu dhtmlxCombo unter <a href="https://docs.dhtmlx.com/combo__filtering.html">dhtmlxCombo. Filtering</a>.