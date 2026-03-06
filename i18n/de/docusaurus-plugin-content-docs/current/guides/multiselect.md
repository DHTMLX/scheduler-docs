---
title: "Multiselect"
sidebar_label: "Multiselect"
---

# Multiselect 

Dieses Steuerelement stellt eine Gruppe von Checkboxen bereit.

![multiselect_editor](/img/multiselect_editor.png)

:::note
Stellen Sie sicher, dass Sie die **multiselect**-Erweiterung aktivieren, um dieses Steuerelement im Lightbox-Editor zu verwenden.
:::

~~~js
scheduler.plugins({
    multiselect: true /*!*/
});

scheduler.locale.labels.section_userselect = "Teilnehmer";
 
scheduler.config.lightbox.sections="["    
    { name:"description", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"userselect", height:22, map_to:"user_id", type:"multiselect", 
    options: scheduler.serverList("users"), vertical:"false" },
    { name:"time", height:72, type:"time", map_to:"auto"}    
];
~~~


[Multiselect control in the lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/21_multiselect_options.html)


## Initialisierung

Um das Multiselect-Steuerelement im Lightbox-Editor einzubinden, gehen Sie wie folgt vor:

1. Aktivieren Sie die 'multiselect'-Erweiterung auf Ihrer Seite:
~~~js
scheduler.plugins({
    multiselect: true
});
~~~
2. Fügen Sie die multiselect-Sektion zur Lightbox-Konfiguration hinzu:
~~~js
scheduler.config.lightbox.sections = 
    { name:"description", ... },
    { name:"userselect", height:22, map_to:"user_id", type:"multiselect", 
    options: scheduler.serverList("user_id"), vertical:false },
    { name:"time", ...}
];
~~~
3. Definieren Sie die Beschriftung für die Sektion:
~~~js
scheduler.locale.labels.section_userselect = "Teilnehmer";
~~~
  

[Multiselect control in the lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/21_multiselect_options.html)


## Eigenschaften {#properties}

Hier sind einige wichtige Eigenschaften, die häufig mit dem 'multiselect'-Steuerelement verwendet werden (die vollständige Liste finden Sie [hier](api/config/lightbox.md)):

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
  <td>(<i>string</i>) Der Name der Daten-Eigenschaft, die dieser Sektion zugeordnet ist</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) Der Steuerelement-Typ für die Sektion</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>options</b></td>
  <td>(<i>Array von Objekten</i>) Definiert die Auswahloptionen für das Steuerelement (<b>gilt für 'select', 'multiselect', 'radio', 'combo' Steuerelemente</b>). Jedes Objekt stellt eine einzelne Option mit folgenden Eigenschaften dar: <ul> <li><b>key</b> - (<i>string</i>) Die ID der Option. Diese wird mit der Daten-Eigenschaft des Events abgeglichen, um Optionen zuzuweisen</li> <li><b>label</b> - (<i>string</i>) Die angezeigte Bezeichnung der Option</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>script_url</b></td>
  <td>(<i>string</i>) Die URL des serverseitigen Skripts, das Multiselect-Optionen dynamisch lädt. Optional und nur im dynamischen Modus verwendet.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>vertical</b></td>
  <td>(<i>boolean</i>) Legt fest, ob die Multiselect-Schaltflächen vertikal (<i>true</i>) oder horizontal angeordnet werden (<b>für 'multiselect' und 'radio' Steuerelemente</b>)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>delimiter</b></td>
  <td>(<i>string</i>) Definiert das Trennzeichen, das zur Trennung der Multiselect-Werte verwendet wird. Wenn nicht angegeben, wird die globale [section_delimiter](api/config/section_delimiter.md)-Einstellung verwendet.</td>
  </tr>
  </tbody>
</table>

## Befüllen des Steuerelements mit Daten

In der Regel werden die Werte für die Multiselect-Schaltflächen über den [options](api/config/lightbox.md)-Parameter festgelegt:

~~~js
scheduler.config.lightbox.sections = 
    {   name:"userselect", type:"multiselect", 
        ...
        options:[
            { key: 1, label: 'George' },
            { key: 2, label: 'Nataly' },
            { key: 3, label: 'Diana' },
            { key: 4, label: 'Adam' }
    ]},
    ...
];
~~~

Jedes Element im [options](api/config/lightbox.md)-Array muss diese beiden erforderlichen Eigenschaften enthalten:

- **key** - Die eindeutige ID der Option
- **label** - Die für die Option angezeigte Textbezeichnung

## Checkboxen mit Serverdaten befüllen

Um die Werte der Checkboxen vom Server zu laden, verwenden Sie die Methode [serverList](api/method/serverlist.md):

~~~js
scheduler.config.lightbox.sections = [
    {name:"description", ...},
    { name:"userselect", height:22, map_to:"user_id", type:"multiselect", 
    options: scheduler.serverList("users"), vertical:"false" },
    {name:"time", ...}
];

scheduler.load("api/data");
~~~

Hier ist **api/data** ein [serverseitiges Skript](guides/server-integration.md), das sowohl die Events als auch die Optionen für die Multiselect-Schaltflächen zurückgibt, formatiert wie in [Beispiele für Datenformate](guides/data-formats.md#json-with-collections) gezeigt:

~~~js
//response
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2019-03-02 00:00:00",
          "end_date":"2019-03-04 00:00:00",
          "text":"dblclick me!",
          "user_id":"1,2"
      },
      {
          "id":"2",
          "start_date":"2019-03-09 00:00:00",
          "end_date":"2019-03-11 00:00:00",
          "text":"and me!",
          "user_id":"2,3"
      }
   ], 
   "collections": {                         
      "users":[                          
         {"value":"1","label":"Lisa"},    
         {"value":"2","label":"Bob"},   
         {"value":"3","label":"Mike"}    
      ]                                     
   }                                        
}
~~~

:::note
Es ist möglich, die Liste der Optionen dynamisch mit der Methode [updateCollection](api/method/updatecollection.md) zu aktualisieren.
:::

~~~js
var oldOptions = scheduler.serverList("users").slice();
scheduler.updateCollection("users", [
         {"value":"4","label":"John"},    
         {"value":"5","label":"Paul"},   
         {"value":"6","label":"Ringo"},   
         {"value":"7","label":"George"}
]);
~~~


## Dynamisches Laden

Im statischen Modus werden alle Event-Parameteroptionen als separate Felder in der Datenbank gespeichert, was eine flexiblere Logik ermöglicht, aber zusätzliche Abfragen erfordert, um alle Optionen zu laden.
  
Im dynamischen Modus werden die Optionen nur bei Bedarf geladen. Dies reduziert die Anzahl der Abfragen, schränkt jedoch die Möglichkeit ein, benutzerdefinierte Logik zu implementieren.

Auf der Serverseite sollte Ihr Code ähnlich wie folgt aussehen.

Um den dynamischen Modus zu aktivieren, fügen Sie die Eigenschaft **script_url** zusammen mit **options** hinzu:

~~~js
scheduler.config.lightbox.sections = [
    {name:"userselect", height:22, map_to:"user_id", type:"multiselect", 
    options: scheduler.serverList("user_id"),
    script_url:'api/options'},
    ...
];
~~~

Der `api/options`-Endpunkt sollte JSON-Daten wie folgt zurückgeben:

~~~js
[                          
    {"value":"1","label":"Lisa"},    
    {"value":"2","label":"Bob"},   
    {"value":"3","label":"Mike"}    
]
~~~
