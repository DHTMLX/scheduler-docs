---
title: "Select"
sidebar_label: "Select"
---

# Select 

![select_editor](/img/select_editor.png)

~~~js
var alert_opts = [
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

Um das Select-Steuerelement in die Lightbox einzubinden, gehen Sie wie folgt vor:

1. Binden Sie den Abschnitt in die Lightbox-Konfiguration ein:
~~~js
scheduler.config.lightbox.sections = 
    { name:"description", ... },
    { name:"alert", height:40,map_to:"type",type:"select", options:alert_opts},
    { name:"time", ...}
];
~~~
2. Definieren Sie das Label für den Abschnitt:
~~~js
scheduler.locale.labels.section_select = "Alert";
~~~

  


[Basic select editor in the lightbox](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/08_options.html)


## Eigenschaften {#properties}

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
  <td>(<i>string</i>) Der Name der Daten-Eigenschaft, auf die der Abschnitt abgebildet wird</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) Der Typ des Steuerelements, das im Abschnitt verwendet wird</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>options</b></td>
  <td>(<i>Array von Objekten</i>) Definiert die Auswahlmöglichkeiten für Steuerelemente wie 'select', 'multiselect', 'radio' und 'combo'. Jedes Objekt repräsentiert eine Option und enthält: <ul> <li><b>key</b> - (<i>string</i>) Die Kennung der Option, die mit der Daten-Eigenschaft des Events abgeglichen wird</li> <li><b>label</b> - (<i>string</i>) Die angezeigte Bezeichnung der Option</li> </ul></td> 
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>onchange</b></td>
  <td>(<i>function</i>) Die Event-Handler-Funktion, die bei Änderungen am Steuerelement ausgelöst wird [Linking select controls in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/26_linked_selects_in_lightbox.html)</td>
  </tr>
  </tbody>
</table>


## Befüllen des Steuerelements mit Daten {#populating-the-control-with-data}

Typischerweise werden Werte für das Select-Steuerelement über den [options](api/config/lightbox.md)-Parameter gesetzt:

~~~js
scheduler.config.lightbox.sections = 
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

Jedes Element im [options](api/config/lightbox.md)-Array muss diese beiden erforderlichen Eigenschaften enthalten:

- **key** - Die Kennung der Option
- **label** - Die angezeigte Bezeichnung der Option

## Optionen dynamisch ändern

Um Optionen vom Server zu laden, weisen Sie die [options](api/config/lightbox.md)-Eigenschaft dem von der [serverList](api/method/serverlist.md)-Methode zurückgegebenen Wert zu:

~~~js
scheduler.config.lightbox.sections = [
    {name:"description", ...},
    {name:"type",map_to:"type",type:"select",options:scheduler.serverList("type")},
    {name:"time", ...}
];

scheduler.load("./data/types");
~~~

:::note
Details zur **serverList**-Methode finden Sie im [zugehörigen Artikel](api/method/serverlist.md).
:::

Die Datenantwort für die [load](api/method/load.md)-Methode sollte eine Collection enthalten, die dem Namen der Serverliste entspricht, und als JSON
[wie hier](guides/data-formats.md#json-with-collections) formatiert ist:

~~~js
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2019-03-02 15:00:00",
          "end_date":"2019-03-04 16:00:00",
          "text":"Interview",
          "type":"1"
      },
      {
          "id":"2",
          "start_date":"2019-03-02 17:00:00",
          "end_date":"2019-03-04 18:00:00",
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


[Populating a select editor from the server](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/09_connector_options.html)


Die [parse](api/method/parse.md)-Methode kann ebenfalls verwendet werden, um Optionen nach der Initialisierung des Schedulers zu laden.

Um die Optionen eines Steuerelements mit neuen Werten zu aktualisieren, kann die [updateCollection](api/method/updatecollection.md)-Methode verwendet werden:

~~~js
scheduler.updateCollection("type", [      
    {"key":"1","label":"Interview"},
    {"key":"2","label":"Performance review"},
    {"key":"3","label":"Request"}
]);
~~~

Weitere Informationen finden Sie im Artikel [scheduler.serverList](api/method/serverlist.md).
