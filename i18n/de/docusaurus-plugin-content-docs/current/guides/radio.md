---
title: "Radio"
sidebar_label: "Radio"
---

# Radio 

Eine Gruppe von Optionsfeldern (Radio Buttons)

![radio_editor](/img/radio_editor.png)

:::note
Stellen Sie sicher, dass die **editors**-Erweiterung aktiviert ist, um dieses Steuerelement im Lightbox zu verwenden.
:::


~~~js
scheduler.plugins({
    editors: true /*!*/
});

var priorities = [
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


[Radio button in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/14_radio_buttons_section.html)


## Initialisierung

Um das Radio-Steuerelement in das Lightbox einzubinden, gehen Sie wie folgt vor:

1. Aktivieren Sie die 'editors'-Erweiterung auf Ihrer Seite:
~~~js
scheduler.plugins({
    editors: true
});
~~~
2. Fügen Sie die Radio-Sektion zur Lightbox-Konfiguration hinzu:
~~~js
scheduler.config.lightbox.sections = [
    { name:"description", ... },
    { name:"radiobutton", height:58, options:priorities, 
    map_to:"priority", type:"radio", vertical:true},
    { name:"time", ...}
];
~~~
3. Definieren Sie das Label für die Sektion:
~~~js
scheduler.locale.labels.section_priority = 'Priority';
~~~
  

[Radio button in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/14_radio_buttons_section.html)


## Eigenschaften

Hier sind die wichtigsten Eigenschaften, die üblicherweise für das 'radio'-Steuerelement gesetzt werden (die vollständige Liste finden Sie [lightbox](api/config/lightbox.md)):

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) der Name der Sektion</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) die Höhe der Sektion</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>string</i>) der Daten-Property-Name, auf den diese Sektion abbildet</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) der Steuerelement-Typ der Sektion</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>options</b></td>
  <td>(<i>Array von Objekten</i>) definiert die Auswahloptionen für das Steuerelement (<b>wird für 'select', 'multiselect', 'radio', 'combo' Steuerelemente verwendet</b>). Jedes Objekt stellt eine Option dar und beinhaltet: <ul> <li><b>key</b> - (<i>string</i>) die ID der Option, wird mit dem Daten-Property des Events abgeglichen</li> <li><b>label</b> - (<i>string</i>) die angezeigte Bezeichnung der Option</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>vertical</b></td>
  <td>(<i>boolean</i>) bestimmt, ob die Optionsfelder vertikal (<i>true</i>) oder horizontal angeordnet sind (<b>gilt für 'multiselect' und 'radio' Steuerelemente</b>)</td>
  </tr>
  </tbody>
</table>


## Befüllen des Steuerelements mit Daten

Typischerweise werden die Werte für die Optionsfelder über den [options](api/config/lightbox.md)-Parameter gesetzt:

~~~js
scheduler.config.lightbox.sections = 
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

Jedes Element im [options](api/config/lightbox.md)-Array muss zwei erforderliche Eigenschaften enthalten:

- **key** - die ID der Option
- **label** - der angezeigte Text der Option

## Abrufen der Optionsfeld-Werte vom Server

Um Optionsfelder mit Daten vom Server zu befüllen, verwenden Sie die [serverList](api/method/serverlist.md)-Methode:

~~~js
scheduler.config.lightbox.sections = [
    {name:"description", ...},
    {name:"priority", map_to:"priority", type:"radio", 
          options:scheduler.serverList("priority")},
    {name:"time", ...}
];

scheduler.load("./data/types.php");
~~~


Die Serverantwort für die [load](api/method/load.md)-Methode sollte eine Sammlung enthalten, die dem Namen der Serverliste entspricht und im JSON-Format wie im [diesem Beispiel](guides/data-formats.md#json-with-collections) dargestellt ist:

~~~js
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2019-03-02 15:00:00",
          "end_date":"2019-03-04 16:00:00",
          "text":"Interview",
          "priority":1
      },
      {
          "id":"2",
          "start_date":"2019-03-02 17:00:00",
          "end_date":"2019-03-04 18:00:00",
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

Wenn Sie die [PHP Connector](https://github.com/DHTMLX/connector-php)-Bibliothek verwenden, könnte der serverseitige Code wie folgt aussehen:

~~~php
//types.php
<?php
    require_once('../../../../connector-php/codebase/scheduler_connector.php');
    include ('../../common/config.php');

    $list = new JSONOptionsConnector($res, $dbtype);
    $list->render_table("types","typeid","typeid(value),name(label)");
    
    $scheduler = new JSONSchedulerConnector($res, $dbtype);
    $scheduler->set_options("type", $list);
    $scheduler->render_table(
        "tevents",
        "event_id",
        "start_date,end_date,event_name,type"
    );
?>
~~~

:::note
Beachten Sie, dass die [updateCollection](api/method/updatecollection.md)-Methode verwendet werden kann, um die Liste der abgerufenen Optionen zu aktualisieren.
:::


## Ereignisbehandlung für das Radio-Steuerelement

Die dhtmlxScheduler API stellt keine eingebauten Ereignis-Handler speziell für Optionsfelder im Scheduler-Lightbox bereit.

Sie können jedoch einen Klick-Handler für die Lightbox-Optionsfelder wie folgt hinzufügen:

1. Greifen Sie auf die Radio-Elemente zu, sobald das Lightbox geöffnet wird.

~~~js

scheduler.attachEvent("onLightbox", function(){
    var node = scheduler.formSection("type").node;
    var radios = node.getElementsByTagName("input");
    ...
});
~~~

2. Fügen Sie das <b>onclick</b>-Ereignis zu jedem Optionsfeld im Lightbox hinzu.

~~~js

scheduler.attachEvent("onLightbox", function(){
    ...
    for(var i = 0; i < radios.length; i++){
      radios[i].onclick = onRadioClick; 
    }
});
~~~

3. Definieren Sie die Funktion, die beim Klicken auf ein Optionsfeld ausgeführt wird.

~~~js
function onRadioClick(event){
    var e = event || window.event,
        node = this;
  
    dhtmlx.message(node.value);
}
~~~

**Related sample** [Event handling for the Radio Control](https://snippet.dhtmlx.com/5/5b62dd79e)
