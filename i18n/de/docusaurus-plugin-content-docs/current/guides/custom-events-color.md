---
title: "Farbe für benutzerdefinierte Events"
sidebar_label: "Farbe für benutzerdefinierte Events"
---

# Farbe für benutzerdefinierte Events

Es gibt drei Möglichkeiten, die Farbe eines Events anzupassen:

1. [Durch direktes Setzen von Farbwerten in den Eigenschaften des Event-Objekts](guides/custom-events-color.md#specifyingcolorsinpropertiesoftheeventobject);
2. [Durch Hinzufügen zusätzlicher CSS-Klasse(n) zum Event](guides/custom-events-color.md#attachingadditionalcssclassestoanevent);
3. [Durch dynamisches Generieren von Styles aus Daten](guides/custom-events-color.md#loadingcolorswithdata).

![custom_event_color](/img/custom_event_color.png)

## Farben in den Eigenschaften des Event-Objekts festlegen {#specifyingcolorsinpropertiesoftheeventobject}

Um einem Event eine individuelle Farbe zuzuweisen, fügen Sie einfach eine oder beide dieser Eigenschaften zum Event-Datenobjekt hinzu:

- **textColor** - legt die Schriftfarbe des Events fest;
- **color** - legt die Hintergrundfarbe des Events fest.

![custom_color_model](/img/custom_color_model.png)

~~~js title="Setting the event's color in the data object"
scheduler.parse([
   {id:1, start_date:"2019-05-21",end_date:"2019-05-25",text:"Task1", color:"red"},
   {id:2, start_date:"2019-06-02",end_date:"2019-06-05",text:"Task2", color:"blue"}
],"json");
...
scheduler.getEvent(1).color = "yellow";
scheduler.updateEvent(1);
~~~

Beachten Sie, dass es sich hierbei um spezielle Eigenschaften handelt. Der Scheduler prüft diese automatisch und wendet die angegebenen Farben auf das Container-Element und den Text des Events an. Sind sie nicht vorhanden, verwendet der Scheduler die Standardfarben.

Diese Eigenschaften akzeptieren jedes gültige CSS-Farbformat, zum Beispiel:

~~~js
ev.color = "#FF0000";
ev.color = "red";
ev.color = "rgb(255,0,0)";
~~~


## Zusätzliche CSS-Klassen zu einem Event hinzufügen {#attachingadditionalcssclassestoanevent}

Eine weitere Möglichkeit, die Farbe eines Events festzulegen, ist das Hinzufügen benutzerdefinierter CSS-Klassen.

### Vorgehensweise

Sie können eine CSS-Klasse mit der [event_class](api/template/event_class.md) Vorlage zu einem Event hinzufügen.


Standardmäßig sieht die Vorlage so aus:

~~~js
scheduler.templates.event_class = function(start, end, ev){
     return "";
}
~~~
*Diese Funktion gibt einen String zurück, der dem class-Attribut des Events hinzugefügt wird. So können Sie je nach Status des Events unterschiedliche Klassen zurückgeben.*


[Coloring events](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)


### Beispiel

Angenommen, Sie möchten Events unterschiedlich einfärben, je nachdem, ob sie zu Managern oder Mitarbeitern gehören: grün für Manager und orange für Mitarbeiter. So gehen Sie vor:

1. Fügen Sie Ihrem Datenmodell eine zusätzliche Eigenschaft hinzu, z. B. 'type', die den Benutzertyp enthält: 'manager' oder 'employee'. 

 ![extended_data_model](/img/extended_data_model.png)
2. Erstellen Sie CSS-Klassen, die diesen Typen entsprechen, z. B. 'manager_event' und 'employee_event'. Das CSS könnte so aussehen:

 


~~~js title="Redefining the default CSS classes"
~~~html
<style>
  .manager_event {
        --dhx-scheduler-event-background: #009966;
        --dhx-scheduler-event-color: black;
  }

  .employee_event {
        --dhx-scheduler-event-background: #FF9933;
        --dhx-scheduler-event-color: black;
  }
</style>
~~~

Für Scheduler-Versionen 6.0 und älter, die keine CSS-Variablen unterstützen, können Sie folgende Styles verwenden:

~~~html
<style>
  /*Event in der Tages- oder Wochenansicht*/
  .dhx_cal_event.manager_event div{
  background-color: #009966 !important;
  color: black !important;
  }
  .dhx_cal_event.employee_event div{
  background-color: #FF9933 !important;
  color: black !important;
  }
 
  /*Mehrtagesevent in der Monatsansicht*/
  .dhx_cal_event_line.manager_event{
  background-color: #009966 !important;
  color: black !important;
  }
  .dhx_cal_event_line.employee_event{
  background-color: #FF9933 !important;
  color: black !important;
  }

  /*Event mit fester Zeit in der Monatsansicht*/
  .dhx_cal_event_clear.manager_event{
  color: black !important;
  }
  .dhx_cal_event_clear.employee_event{
  color: black !important;
  }
</style>
~~~
3. Überschreiben Sie abschließend die [event_class](api/template/event_class.md) Vorlage, um die Klassen zuzuweisen:

 


~~~js title="Applying additional CSS classes to events:"
scheduler.templates.event_class = function (start, end, event) {
  if (event.type == 'manager') return "manager_event";
  return "employee_event"; 
};
~~~


[Coloring events](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)


[Styling events with templates](https://docs.dhtmlx.com/scheduler/samples/02_customization/06_templates.html)


## Farben mit Daten laden {#loadingcolorswithdata}

Wenn Farben aus Backend-Daten stammen – etwa wenn die Farben von Aufgaben von Phasen oder zugewiesenen Ressourcen abhängen und nicht fest im Code stehen – können Sie Styles dynamisch aus Ihren Daten generieren.

Angenommen, Sie haben eine Liste von Benutzern, die Aufgaben zugewiesen sind, wobei der Stil der Aufgabe von den Eigenschaften des Benutzers abhängt:

~~~js
[
  {"key":1, "label":"John", "backgroundColor":"#03A9F4", "textColor":"#FFF"},
  {"key":2, "label":"Mike", "backgroundColor":"#f57730", "textColor":"#FFF"},
  {"key":3, "label":"Anna", "backgroundColor":"#e157de", "textColor":"#FFF"},
  {"key":4, "label":"Bill", "backgroundColor":"#78909C", "textColor":"#FFF"},
  {"key":7, "label":"Floe", "backgroundColor":"#8D6E63", "textColor":"#FFF"}
]
~~~

In diesem Fall werden Benutzer und ihre Farben getrennt vom Scheduler verwaltet, der die Benutzer-IDs oder Farben nicht im Voraus kennt.

So gehen Sie praktisch vor:

- Definieren Sie eine benannte serverList für diese Sammlung:

~~~js
scheduler.serverList("people");
~~~

- Laden Sie diese Optionen auf die Seite, entweder mit einem der unterstützten [Datenformate](guides/data-formats.md#json-with-collections) oder per individuellem XHR-Request.

- Nach dem Laden generieren Sie CSS-Styles dynamisch aus den Daten:

~~~js
scheduler.attachEvent("onLoadEnd", function(){
  // Verwenden Sie eine eindeutige ID für das Style-Element
  var styleId = "dynamicSchedulerStyles";
 
  // Wiederverwenden, falls das Style-Element bereits existiert
 
  var element = document.getElementById(styleId);
  if(!element){
  element = document.createElement("style");
  element.id = styleId;
  document.querySelector("head").appendChild(element);
  }
  var html = [];
  var resources = scheduler.serverList("people");
 
  // Für jeden Benutzer CSS-Regeln erstellen und ins Style-Element einfügen
 
  resources.forEach(function(r){
        html.push(`.event_resource_${r.key} {
            --dhx-scheduler-event-background:${r.backgroundColor};
            --dhx-scheduler-event-color:${r.textColor};
        }`);
  });
  element.innerHTML = html.join("");
});
~~~

- Weisen Sie anschließend die generierten Klassen in der event_class Vorlage zu:

~~~js
scheduler.templates.event_class = function (start, end, event) {
  var css = [];
 
  if(event.owner_id){
  css.push("event_resource_" + event.owner_id);
  }
 
  return css.join(" ");
};
~~~
