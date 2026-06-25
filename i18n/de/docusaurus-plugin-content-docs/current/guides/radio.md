---
title: "Radio"
sidebar_label: "Radio"
---

# Radio 

Eine Gruppe von Radiobuttons

![radio_editor](/img/radio_editor.png)

:::note
Aktivieren Sie die **editors**-Erweiterung, um die Steuerung im Lightbox verwenden zu können
:::

~~~js
scheduler.plugins({
    editors: true /*!*/
});

const priorities = [
    { key: 1, label: 'High' },
    { key: 2, label: 'Medium' },
    { key: 3, label: 'Low' }
];
            
scheduler.locale.labels.section_priority = 'Priority';

scheduler.config.lightbox.sections = [
    { name:"text", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"priority", height:58, options:priorities, 
                map_to:"priority", type:"radio", vertical:true},
    { name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

[Radiobutton im Lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/14_radio_buttons_section.html)


## Initialisierung

Um die Radio-Steuerung dem Lightbox hinzuzufügen, befolgen Sie diese Schritte:

1. Aktivieren Sie die 'editors'-Erweiterung auf der Seite:
~~~js
scheduler.plugins({
    editors: true
});
~~~
2. Fügen Sie den Abschnitt zur Lightbox-Konfiguration hinzu:
~~~js
scheduler.config.lightbox.sections = [
    { name:"description", ... },
    { name:"radiobutton", height:58, options:priorities, 
    map_to:"priority", type:"radio", vertical:true},
    { name:"time", ...}
];
~~~
3. Legen Sie die Beschriftung für den Abschnitt fest:
~~~js
scheduler.locale.labels.section_priority = 'Priority';
~~~


[Radiobutton im Lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/14_radio_buttons_section.html)


## Eigenschaften

Hier sind die wichtigsten Eigenschaften, die üblicherweise für das 'radio'-Steuerelement gesetzt werden (die vollständige Liste finden Sie [lightbox](api/config/lightbox.md)):

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
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) der Typ des Steuerelements des Abschnitts</td>
  </tr>
  <tr>
  <td class="webixdoc_links0" style="vertical-align: top;"><b>options</b></td>
  <td>(<i>array of objects</i>) definiert die Optionen des Steuerelements (<b>für 'select', 'multiselect', 'radio', 'combo'-Steuerungen</b>). Jedes Objekt im Array spezifiziert eine einzelne Option und besitzt diese Eigenschaften: <ul> <li><b>key</b> - (<i>string</i>) die Option-ID. Dieses Attribut wird mit der Daten-Eigenschaft des Events verglichen, um Optionen den Events zuzuordnen</li> <li><b>label</b> - (<i>string</i>) die Bezeichnung der Option</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>vertical</b></td>
  <td>(<i>boolean</i>) gibt an, ob Radiobuttons vertikal (<i>true</i>) oder horizontal (<b>für die 'multiselect' und 'radio'-Steuerungen</b>) angeordnet werden sollen</td>
  </tr>
  </tbody>
</table>


## Das Steuerelement mit Daten befüllen

Im Allgemeinen sollten Sie zum Festlegen der Werte für die Radiobuttons den [options](api/config/lightbox.md)-Parameter verwenden:

~~~js
scheduler.config.lightbox.sections = [
    {      name:"alert", type:"select", 
        ...
        options:[
            { key: 1, label: 'High' },
            { key: 2, label: 'Medium' },
            { key: 3, label: 'Low' }
    ]},
    ...
];
~~~


Items im [options]-Parameter müssen zwei Pflicht-Eigenschaften besitzen:

- **key** - die Option-ID
- **label** - die Bezeichnung der Option

## Werte der Radiobuttons vom Server abrufen

Um Werte für Radiobuttons festzulegen, die aus dem Server abgerufen werden, verwenden Sie die Methode [serverList](api/method/serverlist.md):

~~~js
scheduler.config.lightbox.sections = [
    {name:"description", ...},
    {name:"priority", map_to:"priority", type:"radio", 
          options:scheduler.serverList("priority")},
    {name:"time", ...}
];

scheduler.load("/api/types");
~~~


Die Datenantwort für die Methode [load] sollte eine Sammlung enthalten, deren Name der Serverliste im JSON dem folgenden Format entspricht (siehe [JSON mit Sammlungen](guides/data-formats.md#json-with-collections)):

~~~js
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2027-03-02 15:00:00",
          "end_date":"2027-03-04 16:00:00",
          "text":"Interview",
          "priority":1
      },
      {
          "id":"2",
          "start_date":"2027-03-02 17:00:00",
          "end_date":"2027-03-04 18:00:00",
          "text":"Performance review",
          "type":2
      }
   ], 
   "collections": {/*!*/
      "type":[/*!*/      
         {"value":1,"label":"Low"},/*!*/
         {"value":2,"label":"Medium"},/*!*/
         {"value":3,"label":"High"}/*!*/
      ]/*!*/
   }/*!*/
}

~~~ 

Beispiel-Backend-Handler (Node.js/Express):

~~~js
app.get("/api/types", async (req, res) => {
  const data = await eventsService.list();
  const collections = {
    type: [
      { value: 1, label: "Low" },
      { value: 2, label: "Medium" },
      { value: 3, label: "High" }
    ]
  };
  res.json({ data, collections });
});
~~~


:::note
Hinweis, Sie können die [updateCollection](api/method/updatecollection.md)-Methode verwenden, um die Liste der abgerufenen Optionen zu aktualisieren
:::


## Ereignisbehandlung für die Radio-Steuerung

Standardmäßig bietet die dhtmlxScheduler API keine spezifischen Ereignis-Handler für Radiobuttons im Scheduler Lightbox an.

Sie können jedoch einen Click-Handler für die Lightbox-Radio-Steuerungen wie folgt zuweisen:

1. Ermitteln Sie die Radiobutton-Elemente, nachdem die Lightbox geöffnet wurde.

~~~js

scheduler.attachEvent("onLightbox", function(){
    const node = scheduler.formSection("type").node;
    const radios = node.getElementsByTagName("input");
    ...
});
~~~

2. Weisen Sie den gefundenen Radiobuttons der Lightbox das <b>onclick</b>-Ereignis zu.

~~~js

scheduler.attachEvent("onLightbox", function(){
    ...
    for(let i = 0; i < radios.length; i++){
      radios[i].onclick = onRadioClick; 
    }
});
~~~

3. Schließlich sollten Sie eine Funktion festlegen, die nach dem Klicken des Radiobuttons ausgeführt wird.

~~~js
function onRadioClick(event){
    let e = event || window.event,
        node = this;
  
    dhtmlx.message(node.value);
}
~~~

**Verwandtes Beispiel** [Event handling for the Radio Control](https://snippet.dhtmlx.com/5/5b62dd79e)