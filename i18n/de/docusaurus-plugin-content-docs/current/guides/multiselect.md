---
title: "Multiselect"
sidebar_label: "Multiselect"
---

# Multiselect 

Eine Gruppe von Kontrollkästchen.

![multiselect_editor](/img/multiselect_editor.png)

:::note
Aktivieren Sie die **Multiselect**-Erweiterung, um die Steuerung in der Lightbox zu verwenden
:::

~~~js
scheduler.plugins({
    multiselect: true /*!*/
});

scheduler.locale.labels.section_userselect = "Participants";
 
scheduler.config.lightbox.sections = [    
    { name:"description", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"userselect", height:22, map_to:"user_id", type:"multiselect", 
    options: scheduler.serverList("users"), vertical:"false" },
    { name:"time", height:72, type:"time", map_to:"auto"}    
];
~~~


[Multiselect-Steuerung in der Lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/21_multiselect_options.html)


## Initialisierung

Um die Multiselect-Steuerung zur Lightbox hinzuzufügen, befolgen Sie diese Schritte:

1. <b>Aktivieren Sie die 'multiselect'-Erweiterung auf der Seite:</b>
~~~js
scheduler.plugins({
    multiselect: true
});
~~~
2. <b>Fügen Sie den Abschnitt zur Lightbox-Konfiguration hinzu:</b>
~~~js
scheduler.config.lightbox.sections = [
    { name:"description", ... },
    { name:"userselect", height:22, map_to:"user_id", type:"multiselect", 
    options: scheduler.serverList("user_id"), vertical:false },
    { name:"time", ...}
];
~~~
3. <b>Setzen Sie die Bezeichnung für den Abschnitt:</b>
~~~js
scheduler.locale.labels.section_userselect = "Participants";
~~~
  

[Multiselect-Steuerung in der Lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/21_multiselect_options.html)


## Eigenschaften

Die folgenden Eigenschaften sind überwiegend wichtig und werden üblicherweise für das 'multiselect'-Steuerelement festgelegt (siehe vollständige Liste hier [hier](api/config/lightbox.md)):

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) Name des Abschnitts</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) Höhe des Abschnitts</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>string</i>) der Name einer Dateneigenschaft, die dem Abschnitt zugeordnet wird</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) der Typ der Abschnittssteuerung</td>
  </tr>
  <tr>
  <td class="webixdoc_links0" style="vertical-align: top;"><b>options</b></td>
  <td>(<i>array von Objekten</i>) definiert die Auswahloptionen der Steuerung (<b>für 'select', 'multiselect', 'radio', 'combo'-Steuerungen</b>). Jedes Objekt im Array gibt eine einzelne Option an und besitzt diese Eigenschaften: <ul> <li><b>key</b> - (<i>string</i>) die Option-ID. Dieses Attribut wird mit der Eigenschaft der Ereignisdaten verglichen, um Optionen Ereignissen zuzuordnen</li> <li><b>label</b> - (<i>string</i>) die Bezeichnung der Option</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>script_url</b></td>
  <td>(<i>string</i>) der Pfad zum serverseitigen Skript, das die Optionen des Multiselect lädt. Wird nur im dynamischen Modus verwendet. Optional</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>vertical</b></td>
  <td>(<i>boolean</i>) gibt an, ob Multiselect-Schaltflächen vertikal (true) oder horizontal (false) angeordnet werden sollen (für die 'multiselect'- und 'radio'-Steuerungen)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>delimiter</b></td>
  <td>(<i>string</i>) legt das Trennzeichen fest, das verwendet wird, um Werte des Multiselect zu trennen. Falls diese Eigenschaft nicht gesetzt ist, wird die Konfiguration [section_delimiter](api/config/section_delimiter.md) angewendet</td>
  </tr>
  </tbody>
</table>

## Das Steuerelement mit Daten befüllen

Im Allgemeinen sollten Sie, um Werte für die Multiselect-Schaltflächen festzulegen, den Parameter [options] verwenden:

~~~js
scheduler.config.lightbox.sections = [
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

Elemente im Parameter [options] müssen zwei Pflicht-Eigenschaften besitzen:

- **key** - die Option-ID
- **label** - die Option-Bezeichnung

## Checkboxen vom Server befüllen

Um Checkbox-Werte vom Server abzurufen, müssen Sie die Methode [serverList](api/method/serverlist.md) verwenden:

~~~js
scheduler.config.lightbox.sections = [
    {name:"description", ...},
    { name:"userselect", height:22, map_to:"user_id", type:"multiselect", 
    options: scheduler.serverList("users"), vertical:"false" },
    {name:"time", ...}
];

scheduler.load("api/data");
~~~

wobei die **api/data** ein serverseitiges Skript ist (guides/server-integration.md), das Ereignisse lädt, die dem Scheduler hinzugefügt wurden, und eine Sammlung der Werte der Multiselect-Schaltflächen liefert, wie hier in den [Beispielen der Datenformate](guides/data-formats.md#json-with-collections) gezeigt:

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
Hinweis: Sie können die [updateCollection](api/method/updatecollection.md)-Methode verwenden, um die Liste der abzurufenden Optionen zu aktualisieren
:::

~~~js
const oldOptions = scheduler.serverList("users").slice();
scheduler.updateCollection("users", [
         {"value":"4","label":"John"},    
         {"value":"5","label":"Paul"},   
         {"value":"6","label":"Ringo"},   
         {"value":"7","label":"George"}
]);
~~~


## Dynamisches Nachladen

Im statischen Modus werden alle Optionen der Ereignisparameter als eigenständiges Feld in der Datenbank gespeichert, und Sie können dieses Feld später verwenden, um Ihre eigene Logik zu erstellen. Es eröffnet zusätzliche Möglichkeiten, erfordert jedoch mehr Abfragen, um alle Optionen zu laden. 
  
  
Im dynamischen Modus wird nichts Zusätzliches gespeichert. Optionen werden nach Bedarf geladen. Das verringert die Anzahl der Abfragen, schaltet jedoch die Erstellung jeglicher Logik aus. 

Auf Serverseite benötigen Sie Code, der dem Folgenden ähnelt:

Um den dynamischen Modus zu aktivieren, sollten Sie neben den **options** auch die Eigenschaft **script_url** verwenden:

~~~js
scheduler.config.lightbox.sections = [
    {name:"userselect", height:22, map_to:"user_id", type:"multiselect", 
    options: scheduler.serverList("user_id"),
    script_url:'api/options'},
    ...
];
~~~

wobei `api/options` das folgende JSON zurückgibt:

~~~js
[                          
    {"value":"1","label":"Lisa"},    
    {"value":"2","label":"Bob"},   
    {"value":"3","label":"Mike"}    
]
~~~