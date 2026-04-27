---
title: "Select"
sidebar_label: "Select"
---

# Select 

![Editor-Auswahl](/img/select_editor.png)

~~~js
const alert_opts = [
    { key: 1, label: 'None' },
    { key: 2, label: 'On start date' },
    { key: 3, label: '1 day before' }
];
            
scheduler.locale.labels.section_select = 'Alert';

scheduler.config.lightbox.sections = [
    { name:"text", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"select", height:40, map_to:"type", type:"select", options:alert_opts},
    { name:"time", height:72, type:"time", map_to:"auto"}
];
~~~            

[Basic select editor in the lightbox](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/08_options.html)


## Initialisierung

Um das Select-Steuerelement dem Lightbox hinzuzufügen, befolgen Sie diese Schritte:

1. <b>Fügen Sie den Abschnitt zur Lightbox-Konfiguration hinzu:</b>
~~~js
scheduler.config.lightbox.sections = [
    { name:"description", ... },
    { name:"alert", height:40,map_to:"type",type:"select", options:alert_opts},
    { name:"time", ...}
];
~~~
2. <b>Setzen Sie die Bezeichnung für den Abschnitt:</b>
~~~js
scheduler.locale.labels.section_select = "Alert";
~~~



[Basic select editor in the lightbox](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/08_options.html)


## Eigenschaften

Hier sind einige wichtige Eigenschaften, die üblicherweise für das 'select'-Steuerelement gesetzt werden (die vollständige Liste finden Sie [lightbox](api/config/lightbox.md)):

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) Der Name des Abschnitts</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) Die Höhe des Abschnitts</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>string</i>) Der Name einer Daten-Eigenschaft, die dem Abschnitt zugeordnet wird</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) Die Art des Abschnitts-Steuerelements</td>
  </tr>
  <tr>
  <td class="webixdoc_links0" style="vertical-align: top;"><b>options</b></td>
  <td>(<i>array of objects</i>) Definiert die Optionen des Steuerelements (für 'select', 'multiselect', 'radio', 'combo'-Steuerungen). Jedes Objekt im Array definiert eine einzelne Option und nimmt folgende Eigenschaften an: <ul> <li><b>key</b> - (<i>string</i>) Die Option-ID. Dieses Attribut wird mit der Daten-Eigenschaft des Ereignisses verglichen, um Optionen Ereignissen zuzuordnen</li> <li><b>label</b> - (<i>string</i>) Die Bezeichnung der Option</li> </ul></td> 
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>onchange</b></td>
  <td>(<i>function</i>) Gibt die Funktion des 'onchange'-Ereignisses für den Abschnitts-Steuerung an [Linking select controls in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/26_linked_selects_in_lightbox.html)</td>
  </tr>
  </tbody>
</table>


## Das Steuerelement mit Daten befüllen

Allgemein sollten Sie zum Festlegen der Werte für das Select-Steuerelement den [options]-Parameter verwenden:

~~~js
scheduler.config.lightbox.sections = [
    {      name:"alert", type:"select", 
        ...
        options:[
            { key: 1, label: 'None'},
            { key: 2, label: 'On start date'},
            { key: 3, label: '1 day before'}
    ]},
    ...
];
~~~

Items im [options]-Parameter müssen zwei Pflicht-Eigenschaften besitzen:

- **key** - die Option-ID
- **label** - die Option-Bezeichnung

## Optionen dynamisch ändern

Um das Steuerelement vom Server zu befüllen, setzen Sie die [options]-Option auf den von der [serverList]-Methode zurückgegebenen Wert:

~~~js
scheduler.config.lightbox.sections = [
    {name:"description", ...},
    {name:"type",map_to:"type",type:"select",options:scheduler.serverList("type")},
    {name:"time", ...}
];

scheduler.load("/api/types");
~~~

:::note
Die Details zur **serverList**-Methode finden Sie im entsprechenden Artikel.
:::

Die Datenantwort für die [load]-Methode sollte eine Sammlung enthalten, deren Name der Serverliste im JSON [folgendem Format](guides/data-formats.md#json-with-collections) angegeben ist:

~~~js
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2027-03-02 15:00:00",
          "end_date":"2027-03-04 16:00:00",
          "text":"Interview",
          "type":"1"
      },
      {
          "id":"2",
          "start_date":"2027-03-02 17:00:00",
          "end_date":"2027-03-04 18:00:00",
          "text":"Performance review",
          "type":"2"
      }
   ], 
   "collections": {/*!*/
      "type":[/*!*/      
         {"value":"1","label":"Interview"},/*!*/
         {"value":"2","label":"Performance review"},/*!*/
         {"value":"3","label":"Request"}/*!*/
      ]/*!*/
   }/*!*/
}
~~~


Die [parse](api/method/parse.md) Methode kann auch verwendet werden, wenn Sie Optionen nach der Initialisierung des Schedulers laden möchten.

Wenn Sie die angegebenen Optionen des Steuerelements mit neuen Werten aktualisieren müssen, können Sie die [updateCollection](api/method/updatecollection.md) Methode verwenden:

~~~js
scheduler.updateCollection("type", [      
    {"key":"1","label":"Interview"},
    {"key":"2","label":"Performance review"},
    {"key":"3","label":"Request"}
]);
~~~

Details finden Sie im Artikel scheduler.serverList (api/method/serverlist.md).