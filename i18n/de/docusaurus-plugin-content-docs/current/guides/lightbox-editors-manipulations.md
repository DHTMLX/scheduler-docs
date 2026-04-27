---
title: "Manipulationen am Lightbox"
sidebar_label: "Manipulationen am Lightbox"
---

# Manipulationen am Lightbox

## Abrufen/Setzen des Werts des Steuerelements

Um den Wert des Abschnitts-Steuerelements abzurufen bzw. zu setzen, verwenden Sie das [formSection](api/method/formsection.md) Objekt wie folgt:

~~~js
//to get the value
const value = scheduler.formSection('description').getValue();

//to set the value
scheduler.formSection('description').setValue('abc');
~~~


[Setzen/Abrufen von Werten der Lightbox-Steuerelemente](https://docs.dhtmlx.com/scheduler/samples/02_customization/22_opertions_with_lightbox.html)


## Öffnen der Lightbox mit einem Klick

Es ist möglich, die vorhandene Lightbox mit einem einzigen Klick zu öffnen. Dazu verwenden Sie das [onClick](api/event/onclick.md) Event und die [showLightbox](api/method/showlightbox.md) Methode:

~~~js
scheduler.attachEvent("onClick", function (id, e){
    scheduler.showLightbox(id);
    return true;
});
~~~

**Zugehöriges Beispiel** [Öffnen der Lightbox mit einem Klick]

Die Lightbox wird geöffnet, wenn der Benutzer mit der linken Maustaste auf das Ereignisfenster klickt. 

## Überprüfung, ob die Lightbox geöffnet ist

Um zu prüfen, ob die Lightbox derzeit geöffnet oder geschlossen ist, verwenden Sie die **lightbox_id**-Eigenschaft des Statusobjekts, das durch die [getState](api/method/getstate.md) Methode zurückgegeben wird. 
Wird die Lightbox geöffnet, gibt die Methode die ID des geöffneten Ereignisses zurück, andernfalls wird 'null' oder 'undefined' zurückgegeben:

~~~js
if (scheduler.getState().lightbox_id){
    //the code for the opened lightbox
} else {
    //the code for the closed lightbox
}
~~~

## Zuordnung von Eigenschaften eines Ereignisobjekts zu den Lightbox-Abschnitten

Um eine Eigenschaft eines Ereignisobjekts einem Lightbox-Abschnitt zuzuordnen, gehen Sie wie folgt vor:

- Stellen Sie sicher, dass Ihre Datenquelle Ereignisse in einem [unterstützten Format](guides/data-formats.md) zurückgibt

~~~js
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2027-03-02 00:00:00",
          "end_date":"2027-03-04 00:00:00",
          "text":"Graduation ceremony",
          "type":"1",
          "location":"London"
      },
      ...
   ]                                       
}
~~~

Beachten Sie, dass alle Eigenschaften, die Ihre Datenquelle zurückgibt, zu Event-Objekten hinzugefügt werden und für die [Client-seitige API](guides/event-object-operations.md) verfügbar sein werden.

- Um ein Lightbox-Steuerelement einer bestimmten Eigenschaft zuzuordnen, weisen Sie dem Abschnitt die Eigenschaft **map_to** den Namen der entsprechenden Ereignis-Eigenschaft zu:

~~~js
scheduler.config.lightbox.sections=[
    {name:"description", height:70, map_to:"text", type:"textarea" , focus:true},
    {name:"locationInput", height:35, map_to:"location", type:"textarea" },
    {name:"typeSelect", map_to:"type", type:"select", options:scheduler.serverList("types")},
    {name:"time", type:"time", map_to:"auto"}
];
~~~

Nur Ausnahmen sind die [time](guides/time.md)- und die [recurring](guides/recurring-events.md#recurring-lightbox)-Steuerelemente, die immer festen Eigenschaften zugeordnet sind (**event.start_date/event.end_date** und **event.rec_type/event.event_length/event.event_pid**) entsprechend.

## Automatisches Enddatum im Time-Control

Um die anfängliche Dauer von Ereignissen festzulegen und das Enddatum automatisch anzupassen, verwenden Sie die Eigenschaften **event_duration** und **auto_end_date**:

~~~js
//specify the event duration in minutes for the auto_end_time parameter
scheduler.config.event_duration = 60; 
scheduler.config.auto_end_date = true;
~~~


[Automatisches Enddatum](https://docs.dhtmlx.com/scheduler/samples/02_customization/11_auto_end_date.html)


Bei einer solchen Konfiguration wird jedes Mal, wenn der Benutzer die Startzeit oder das Datum des Start-Ereignisses im Lightbox ändert, die Endzeit und das Enddatum des Ereignisses automatisch angepasst, damit die Dauer des Ereignisses 60 Minuten entspricht (dem Wert der Option [event_duration](api/config/event_duration.md)).

## Festlegen des Standardwerts für den Lightbox-Abschnitt

Um den Standardwert für einen Lightbox-Abschnitt festzulegen, verwenden Sie die **default_value**-Eigenschaft des Abschnittsobjekts.

Zum Beispiel haben Sie einen benutzerdefinierten Abschnitt hinzugefügt, der den Ort des Ereignisses im Lightbox anzeigt und ihn 'Location' genannt. Wenn der Benutzer ein neues Ereignis erstellt, bleibt das Feld leer. Um dieses Verhalten zu korrigieren und standardmäßig beispielsweise die Adresse des Greenwich Observatory anzuzeigen, definieren Sie das Lightbox wie folgt:

~~~js
scheduler.config.lightbox.sections = [
    { name:"description", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"location", height:43, map_to:"event_location", type:"textarea", 
    default_value:"Blackheath Avenue London,Greenwich,Greater London SE10 8XJ,UK"},
    { name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

Hinweis: Die **default_value**-Eigenschaft legt den Standardwert für den Lightbox-Abschnitt fest, nicht für ein neues Ereignis, d. h. ein neues Ereignis erhält den angegebenen Wert erst, nachdem der Benutzer den Lightbox geöffnet und das Ereignis gespeichert hat.

Um den Standardwert direkt für neue Ereignisse festzulegen, verwenden Sie das Event [onEventCreated](api/event/oneventcreated.md):

~~~js
scheduler.attachEvent("onEventCreated", function(id,e){
    scheduler.getEvent(id).location = 'Blackheath Avenue London, Greenwich...';
    scheduler.updateEvent(id); // renders the updated event
    return true;
});
~~~

## Änderung der Reihenfolge der Datum-Uhrzeit-Steuerelemente und Entfernen von Zeit-Auswahlfeldern

Sie haben die Möglichkeit, die Reihenfolge der Datum-Uhrzeit-Steuerelemente im Abschnitt 'Time period' zu ändern oder einige davon zu entfernen. Verwenden Sie dazu die **time_format**-Eigenschaft:

~~~js
scheduler.config.lightbox.sections= [
  {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
  {name:"time", ..., time_format:["%H:%i","%m","%d","%Y"]}
];
~~~

:::note
Hinweis: Sie können das Darstellungsformat der Daten nicht ändern, nur die Reihenfolge der Elemente im Array.
:::

Zum Beispiel können Sie das Format wie folgt ändern:

~~~js
//default
time_format:["%H:%i", "%m", "%d", "%Y"] 
//month goes first
time_format:["%m","%d", "%Y", "%H:%i"]
//the year selector is removed
time_format:["%H:%i", "%m", "%d"]
//incorrect
time_format:["%H:%i", "%M", "%d", "%Y"] //"%m" wurde zu "%M"
~~~

## Lesemodus

Die detaillierten Informationen zum Lesemodus finden Sie im Kapitel [Read-only Mode](guides/readonly.md).

## Ausblenden eines Abschnitts für bestimmte Ereignisse 

Um einen Abschnitt für bestimmte Ereignisse auszublenden, definieren Sie seine **set_value**-Methode wie folgt neu:

~~~js
scheduler.form_blocks.textarea.set_value = function(node,value,ev){
    node.firstChild.value= value || "";
    let style = ev.some_property ? "" : "none";
    node.style.display = "style;" // Editorbereich
    node.previousSibling.style.display = "style;" // Abschnittsüberschrift
    scheduler.setLightboxSize(); // passt die Größe des Lightbox an
}
~~~

### 'Volltag-Ereignis' Option

Um die Option 'Volltag-Ereignis' zur Lightbox hinzuzufügen, setzen Sie die [full_day](api/config/full_day.md) Option auf *true*.
Dazu fügen Sie einfach die folgende Codezeile hinzu:

~~~js
scheduler.config.full_day  = true;
~~~

Sobald die [full_day](api/config/full_day.md) Option aktiviert ist, wird das Kontrollkästchen **Full Day** im linken Teil des **Time period**-Abschnitts angezeigt. Nach Auswahl werden alle Eingabefelder des Abschnitts blockiert, und die Dauer des Ereignisses wird als ganzer Tag festgelegt, von **0:00 Uhr** des aktuellen Zellendatums bis **0:00 Uhr** des nächsten Tages.


[Full day events](https://docs.dhtmlx.com/scheduler/samples/02_customization/12_full_day_event.html)


## Arten der Lightbox

Die Lightbox kann in einem von 2 Typen dargestellt werden:

- Standard (breit);
- Kurz.

Im Standard-Skin kann die Lightbox nur im Standard (breit) Typ dargestellt werden, während man im Skin 'glossy' oder 'classic' zwischen Typen wählen kann.

Um den gewünschten Typ festzulegen, verwenden Sie die Eigenschaft [wide_form](api/config/wide_form.md):

~~~js
scheduler.config.wide_form = true;
~~~


**Standard (breit) Lightbox**:

![scheduler_wide_form.png](/img/scheduler_wide_form.png)

**Kurze Form**:

![scheduler_standard_form.png](/img/scheduler_standard_form.png)


### Button im Abschnittskopf 

Es ist möglich, einen benutzerdefinierten Button im Abschnittskopf zu haben. Um einen Button in der Kopfzeile eines Abschnitts hinzuzufügen, führen Sie die folgenden Schritte aus:

- Weisen Sie dem Abschnittsobjekt die Eigenschaft **button** zu:

~~~js
{name:"description", height:130, map_to:"text", type:"textarea", button:"help"}
~~~

- Legen Sie die Bezeichnung für den Button fest:

~~~js
// 'help' is the value of the 'button' property
scheduler.locale.labels.button_help = "Help label";
~~~

- Geben Sie den Handler von Button-Klicks an:

~~~js
scheduler.form_blocks.textarea.button_click = function(index,button,shead,sbody){
    // any custom code
}
~~~

wobei:
  
- **index** - (*number*) der Abschnittsindex. Nullbasierte Nummerierung
- **button** - (*HTMLElement*) das HTML-Element des Buttons
- **shead** - (*HTMLElement*) das HTML-Element des Abschnittskopfes
- **sbody** - (*HTMLElement*) das HTML-Element des Abschnittsinhalts


Sie können das für den Button verwendete Bild über die folgende CSS-Klasse definieren:

~~~css
.dhx_custom_button_help{
    background-image:url(imgs/but_help.gif);
}
~~~

## Verknüpfung von Auswahlelementen

Sie können Auswahlelemente in der Lightbox voneinander abhängig machen. Verwenden Sie dazu die onchange-Eigenschaft des Auswahlelements, wie folgt:

~~~js
const update_select_options = function(select, options) { // helper function
    select.options.length = 0;
    for (let i = 0; i < options.length; i++) {
        let option = options[i];
        select[i] = new Option(option.label, option.key);
    }
};

const parent_onchange = function(event) {
    const new_child_options = child_select_options[this.value];
    update_select_options(scheduler.formSection('child').control, new_child_options);
};
scheduler.attachEvent("onBeforeLightbox", function(id){
    const ev = scheduler.getEvent(id);
    if (!ev.child_id) {
        const parent_id = ev.parent_id||parent_select_options[0].key;
        const new_child_options = child_select_options[parent_id];
        update_select_options(
            scheduler.formSection('child').control, new_child_options
        );
    }
    return true;
});

scheduler.config.lightbox.sections= [
    ...
    {name:"parent", height:23, type:"select", options: parent_select_options, 
     map_to:"parent_id", onchange:parent_onchange },
    {name:"child", height:23, type:"select", options: child_select_options, 
     map_to:"child_id" }
    ...
];
~~~


[Verknüpfung von Auswahlelementen in der Lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/26_linked_selects_in_lightbox.html)

![linking_controls.png](/img/linking_controls.png)

Das <b>onchange</b>-Ereignis wird ausgelöst, wenn der Benutzer die ausgewählte Option des übergeordneten Abschnitts ändert. Die Optionen des untergeordneten Abschnitts ändern sich entsprechend. 

## Dynamische Änderungen der Lightbox-Abschnitte

Es besteht die Möglichkeit, die Lightbox-Abschnitte dynamisch zu ändern. Das bedeutet, dass die Abschnitte der Lightbox je nach konfigurierten Vorgaben ausgeblendet, blockiert oder angezeigt werden können.

Sie können die Lightbox-Abschnitte dynamisch über die Methode [resetLightbox()](api/method/resetlightbox.md) ändern. Zum Beispiel:

1. Erstellen Sie zwei Arrays mit der Lightbox-Konfiguration, die zwei verschiedene Satz von Steuerelementen enthalten.

~~~js
const full_lightbox = [
    { name: "description", height: 200, map_to: "text", type: "textarea", focus: true},
    { name: "hidden", height: 23, map_to: "hidden", type: "textarea"},
    { name: "time", height: 72, type: "time", map_to: "auto"}
];
const restricted_lightbox = [
    { name: "description", height: 200, map_to: "text", type: "textarea", focus: true},
    { name: "time", height: 72, type: "time", map_to: "auto"}
];
~~~

2. Im nächsten Schritt müssen Sie folgende Schritte umsetzen:

- Bevor eine neue Lightbox angezeigt wird, rufen Sie die <b>resetLightbox()</b>-Methode auf, um den aktuellen Satz von Steuerelementen des Bearbeitungsformulars zu entfernen und ein neues Lightbox-Objekt mit einem anderen Satz von Steuerelementen zu erzeugen.

- Holen Sie das Ereignisobjekt anhand seiner ID und geben Sie die Bedingung an, anhand der entschieden wird, welche Lightbox-Konfiguration angewendet wird. Im nachstehenden Beispiel wird die Bedingung über das Attribut "restricted" eingeführt.

~~~js
scheduler.attachEvent("onBeforeLightbox", function(event_id) {
    scheduler.resetLightbox();
    const ev = scheduler.getEvent(event_id);
    scheduler.config.lightbox.sections = (ev.restricted) ?
        restricted_lightbox : full_lightbox;
    return true;
});
~~~

3. Verwenden Sie die Eigenschaft 'restricted' des Ereignisses, um die Konfiguration "restricted_lightbox" anzuwenden. Andernfalls wird die vollständige Lightbox angezeigt.

~~~js
scheduler.init('scheduler_here', new Date(2027, 5, 30), "week");
scheduler.parse([
    { start_date: "2027-06-27 04:00", end_date: "2027-06-27 7:00", 
        text: "Restricted event", hidden: "You won't see me", restricted: true },
    { start_date: "2027-06-29 05:00", end_date: "2027-06-29 11:00", 
        text: "Full access", hidden: "Hidden text" }
]);
~~~

![dinamicchanges_lightbox.png](/img/dinamicchanges_lightbox.png)

[Dynamic changing of lightbox configurations](https://docs.dhtmlx.com/scheduler/samples/02_customization/29_changing_lightbox_configurations.html)