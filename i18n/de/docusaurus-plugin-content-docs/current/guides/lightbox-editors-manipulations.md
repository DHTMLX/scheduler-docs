---
title: "Manipulationen mit dem Lightbox"
sidebar_label: "Manipulationen mit dem Lightbox"
---

# Manipulationen mit dem Lightbox

## Abrufen/Setzen des Steuerungswerts {#gettingsettingthecontrolvalue}

Um den Wert einer Steuerung in einem Abschnitt abzurufen oder zu aktualisieren, verwenden Sie das Objekt [formSection](api/method/formsection.md) wie folgt:

~~~js
// zum Abrufen des Werts
var value = scheduler.formSection('description').getValue();

// zum Setzen des Werts
scheduler.formSection('description').setValue('abc');
~~~


[Setting/getting values of lightbox's controls](https://docs.dhtmlx.com/scheduler/samples/02_customization/22_opertions_with_lightbox.html)


## Öffnen des Lightbox mit einem einfachen Klick {#opening-the-lightbox-on-a-single-click}

Sie können konfigurieren, dass das Lightbox mit einem einzigen Klick geöffnet wird. Dies erreichen Sie, indem Sie das Ereignis [onClick](api/event/onclick.md) zusammen mit der Methode [showLightbox](api/method/showlightbox.md) verwenden:

~~~js
scheduler.attachEvent("onClick", function (id, e){
    scheduler.showLightbox(id);
    return true;
});
~~~

**Related sample** [Opening the lightbox on one click](https://snippet.dhtmlx.com/5/50e639d2a)

Mit dieser Konfiguration öffnet ein Klick mit der linken Maustaste auf eine Ereignisbox das Lightbox.

## Überprüfen, ob das Lightbox geöffnet ist {#checking-whether-the-lightbox-is-opened}

Um festzustellen, ob das Lightbox derzeit geöffnet oder geschlossen ist, überprüfen Sie die Eigenschaft **lightbox_id** aus dem von der Methode [getState](api/method/getstate.md) zurückgegebenen Statusobjekt. 
Wenn das Lightbox geöffnet ist, wird die ID des Ereignisses im Lightbox zurückgegeben; andernfalls wird 'null' oder 'undefined' zurückgegeben:

~~~js
if (scheduler.getState().lightbox_id){
    // Code, wenn das Lightbox geöffnet ist
} else {
    // Code, wenn das Lightbox geschlossen ist
}
~~~

## Zuordnung von Eigenschaften eines Ereignisobjekts zu den Lightbox-Abschnitten {#mapping-properties-of-an-event-object-to-the-lightbox-sections}

Um eine Eigenschaft eines Ereignisobjekts einem Lightbox-Abschnitt zuzuordnen, gehen Sie wie folgt vor:

- Stellen Sie sicher, dass Ihre Datenquelle Ereignisse in einem [unterstützten Format](guides/data-formats.md) bereitstellt

~~~js
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2019-03-02 00:00:00",
          "end_date":"2019-03-04 00:00:00",
          "text":"Graduation ceremony",
          "type":"1",
          "location":"London"
      },
      ...
   ]
}
~~~

Beachten Sie, dass alle von Ihrer Datenquelle zurückgegebenen Eigenschaften zu Ereignisobjekten hinzugefügt werden und über die [Client-seitige API](guides/event-object-operations.md) zugänglich sind.

- Um eine Lightbox-Steuerung einer bestimmten Eigenschaft zuzuordnen, setzen Sie die Eigenschaft **map_to** des Abschnitts auf den Namen der Ereigniseigenschaft:

~~~js
scheduler.config.lightbox.sections="["
    {name:"description", height:70, map_to:"text", type:"textarea" , focus:true},
    {name:"locationInput", height:35, map_to:"location", type:"textarea" },
    {name:"typeSelect", map_to:"type", type:"select", options:scheduler.serverList("types")},
    {name:"time", type:"time", map_to:"auto"}
];
~~~

Die [time](guides/time.md)- und [recurring](guides/recurring-events.md#recurringlightbox)-Steuerungen sind Ausnahmen, da sie immer auf feste Eigenschaften abbilden (**event.start_date/event.end_date** bzw. **event.rec_type/event.event_length/event.event_pid**).

## Automatisches Enddatum in der Zeit-Steuerung {#automatic-end-date-in-the-time-control}

Um eine Standarddauer für Ereignisse festzulegen und das Enddatum automatisch zu aktualisieren, damit diese Dauer beibehalten wird, konfigurieren Sie die folgenden Eigenschaften:

~~~js
// Geben Sie die Ereignisdauer in Minuten für den auto_end_time-Parameter an
scheduler.config.event_duration = 60; 
scheduler.config.auto_end_date = true;
~~~


[Automatic end date](https://docs.dhtmlx.com/scheduler/samples/02_customization/11_auto_end_date.html)


Mit dieser Einstellung wird jedes Mal, wenn der Benutzer die Startzeit oder das Startdatum des Ereignisses im Lightbox ändert, die Endzeit und das Enddatum automatisch angepasst, sodass die Ereignisdauer 60 Minuten beträgt (wie in der Option [event_duration](api/config/event_duration.md) angegeben).

## Setzen des Standardwerts für eine Lightbox-Steuerung {#setting-the-default-value-for-a-lightboxs-control}

Um einen Standardwert für einen Abschnitt des Lightbox festzulegen, verwenden Sie die Eigenschaft **default_value** dieses Abschnitts.

Wenn zum Beispiel ein benutzerdefinierter Abschnitt für den Ereignisort hinzugefügt und als 'Location' bezeichnet wird, ist dieser beim Erstellen eines neuen Ereignisses standardmäßig leer. Um standardmäßig eine bestimmte Adresse (wie das Greenwich Observatory) anzuzeigen, konfigurieren Sie das Lightbox wie folgt:

~~~js
scheduler.config.lightbox.sections = [
    { name:"description", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"location", height:43, map_to:"event_location", type:"textarea", 
    default_value:"Blackheath Avenue London,Greenwich,Greater London SE10 8XJ,UK"},
    { name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

Beachten Sie, dass **default_value** den Standardinhalt für den Abschnitt im Lightbox selbst festlegt, nicht für das neue Ereignis. Das bedeutet, dass ein neues Ereignis den angegebenen Wert erst erhält, nachdem das Lightbox geöffnet und das Ereignis gespeichert wurde.

Um beim Erstellen neuer Ereignisse direkt einen Standardwert zuzuweisen, verwenden Sie das Ereignis [onEventCreated](api/event/oneventcreated.md):

~~~js
scheduler.attachEvent("onEventCreated", function(id,e){
    scheduler.getEvent(id).location = 'Blackheath Avenue London, Greenwich...';
    scheduler.updateEvent(id); // aktualisiert das angezeigte Ereignis
    return true;
});
~~~

## Ändern der Reihenfolge der Datums-/Zeitsteuerungen und Entfernen von Zeitselektoren {#changingtheorderofdatetimecontrolsandremovingtimeselectors}

Sie können die Reihenfolge der Datums-/Zeitsteuerungen im Abschnitt 'Zeitperiode' ändern oder Zeitselektoren auslassen, indem Sie die Eigenschaft **time_format** festlegen:

~~~js
scheduler.config.lightbox.sections="["
  {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
  {name:"time", ..., time_format:["%H:%i","%m","%d","%Y"]}
];
~~~

:::note
Beachten Sie, dass dies nur die Reihenfolge der Elemente im Array ändert; das Datenanzeigeformat wird dadurch nicht beeinflusst.
:::

Zum Beispiel können Sie das Format wie folgt anpassen:

~~~js
// Standard
time_format:["%H:%i", "%m", "%d", "%Y"] 
// Monat zuerst
time_format:["%m","%d", "%Y", "%H:%i"]
// Jahr-Selektor auslassen
time_format:["%H:%i", "%m", "%d"]
// Falsche Verwendung
time_format:["%H:%i", "%M", "%d", "%Y"] // "%m" wurde fälschlicherweise zu "%M" geändert
~~~

## Nur-Lese-Modus {#readonlymode}

Weitere Details zum Nur-Lese-Modus finden Sie im Kapitel [Schreibgeschützter Modus](guides/readonly.md).

## Einen Abschnitt für bestimmte Ereignisse ausblenden {#makingasectionhiddenforsomeevents}

Um einen Abschnitt für bestimmte Ereignisse auszublenden, überschreiben Sie dessen **set_value**-Methode wie folgt:


~~~js
scheduler.form_blocks.textarea.set_value="function(node,value,ev){"
    node.firstChild.value="value||""";
    var style = ev.some_property?"":"none";
    node.style.display="style;" // Editorbereich
    node.previousSibling.style.display="style;" // Abschnittsüberschrift
    scheduler.setLightboxSize(); // passt die Größe des Lightbox an
}
~~~

### 'Ganztägiges Ereignis'-Option

Um die Option 'ganztägiges Ereignis' im Lightbox zu aktivieren, setzen Sie die Option [full_day](api/config/full_day.md) auf *true*, indem Sie Folgendes hinzufügen:

~~~js
scheduler.config.full_day  = true;
~~~

Sobald dies aktiviert ist, erscheint das **Ganztägig**-Kontrollkästchen auf der linken Seite des Abschnitts **Zeitperiode**. Wenn es aktiviert ist, werden alle Eingabefelder in diesem Abschnitt deaktiviert und die Ereignisdauer wird auf den gesamten Tag festgelegt - von **0:00 Uhr** des aktuellen Zellen-Datums bis **0:00 Uhr** des folgenden Tages.


[Full day events](https://docs.dhtmlx.com/scheduler/samples/02_customization/12_full_day_event.html)


## Arten von Lightbox {#types-of-lightbox}

Das Lightbox ist in zwei Varianten verfügbar:

- Standard (breit)
- Kurz

Im Standard-Skin ist nur das breite Lightbox verfügbar, während in den Skins 'glossy' oder 'classic' zwischen beiden Varianten gewählt werden kann.

Um den bevorzugten Typ auszuwählen, verwenden Sie die Eigenschaft [wide_form](api/config/wide_form.md):

~~~js
scheduler.config.wide_form = true;
~~~


**Standard (breites) Lightbox**:

![scheduler_wide_form.png](/img/scheduler_wide_form.png)

**Kurzes Formular**:

![scheduler_standard_form.png](/img/scheduler_standard_form.png)


### Schaltfläche in der Abschnittsüberschrift 

Sie können eine benutzerdefinierte Schaltfläche zur Abschnittsüberschrift hinzufügen, indem Sie wie folgt vorgehen:

- Fügen Sie die Eigenschaft 'button' zum Abschnittsobjekt hinzu:

~~~js
{name:"description", height:130, map_to:"text", type:"textarea", button:"help"}
~~~

- Definieren Sie die Beschriftung für die Schaltfläche:

~~~js
// 'help' entspricht dem Wert der Eigenschaft 'button'
scheduler.locale.labels.button_help = "Hilfebeschriftung";
~~~

- Geben Sie den Handler für Klicks auf die Schaltfläche an:

~~~
scheduler.form_blocks.textarea.button_click="function(index,button,shead,sbody){"
    // Ihr benutzerdefinierter Code hier
}
~~~

Hierbei gilt:

- **index** - (*number*) der nullbasierte Index des Abschnitts
- **button** - (*HTMLElement*) das Schaltflächenelement
- **shead** - (*HTMLElement*) das Abschnittsüberschrift-Element
- **sbody** - (*HTMLElement*) das Abschnittskörper-Element


Sie können das Bild der Schaltfläche mit dieser CSS-Klasse anpassen:

~~~js
.dhx_custom_button_help{
    background-image:url(imgs/but_help.gif);
}
~~~

## Verknüpfung von Auswahl-Steuerelementen {#linkingselectcontrols}

Auswahl-Steuerelemente im Lightbox können voneinander abhängig gemacht werden. Dies wird mit der [onchange-Eigenschaft](guides/select.md#properties) des Auswahl-Steuerelements erreicht, wie unten gezeigt:

~~~js
var update_select_options = function(select, options) { // Hilfsfunktion
    select.options.length = 0;
    for (var i="0;" i<options.length; i++) {
        var option = options[i];
        select[i] = new Option(option.label, option.key);
    }
};

var parent_onchange = function(event) {
    var new_child_options = child_select_options[this.value];
    update_select_options(scheduler.formSection('child').control, new_child_options);
};
scheduler.attachEvent("onBeforeLightbox", function(id){
    var ev = scheduler.getEvent(id);
    if (!ev.child_id) {
        var parent_id = ev.parent_id||parent_select_options[0].key;
        var new_child_options = child_select_options[parent_id];
        update_select_options(
            scheduler.formSection('child').control, new_child_options
        );
    }
    return true;
});

scheduler.config.lightbox.sections="["
    ...
    {name:"parent", height:23, type:"select", options: parent_select_options, 
     map_to:"parent_id", onchange:parent_onchange },
    {name:"child", height:23, type:"select", options: child_select_options, 
     map_to:"child_id" }
    ...
];
~~~


[Linking select controls in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/26_linked_selects_in_lightbox.html)


![/img/linking_controls.png](/img/linking_controls.png)

Das <b>onchange</b>-Ereignis wird ausgelöst, wenn der Benutzer eine andere Option im übergeordneten Abschnitt auswählt, wodurch die Optionen des untergeordneten Abschnitts entsprechend aktualisiert werden.

## Dynamisches Ändern der Lightbox-Abschnitte {#dynamic-changing-of-the-lightbox-sections}

Es ist möglich, die Abschnitte des Lightbox dynamisch zu ändern. Das bedeutet, dass Sie Abschnitte des Lightbox basierend auf einer bestimmten Konfiguration ausblenden, blockieren oder anzeigen können.

Dafür können Sie die Methode [resetLightbox()](api/method/resetlightbox.md) verwenden. So gehen Sie vor:

1. Erstellen Sie zunächst zwei Arrays, die unterschiedliche Steuerelement-Sets für das Lightbox definieren.

~~~js
var full_lightbox = [
    { name: "description", height: 200, map_to: "text", type: "textarea", focus: true},
    { name: "hidden", height: 23, map_to: "hidden", type: "textarea"},
    { name: "time", height: 72, type: "time", map_to: "auto"}
];
var restricted_lightbox = [
    { name: "description", height: 200, map_to: "text", type: "textarea", focus: true},
    { name: "time", height: 72, type: "time", map_to: "auto"}
];
~~~

2. Implementieren Sie anschließend Folgendes:

- Rufen Sie vor dem Öffnen eines neuen Lightbox die Methode <b>resetLightbox()</b> auf, um die aktuellen Steuerelemente zu löschen und ein neues Lightbox mit dem gewünschten Steuerelement-Set zu erstellen.

- Rufen Sie das Ereignisobjekt über seine ID ab und definieren Sie eine Bedingung, um zu entscheiden, welche Lightbox-Konfiguration angewendet wird. Im folgenden Beispiel wird das Attribut "restricted" als Bedingung verwendet.

~~~js
scheduler.attachEvent("onBeforeLightbox", function(event_id) {
    scheduler.resetLightbox();
    var ev = scheduler.getEvent(event_id);
    scheduler.config.lightbox.sections = (ev.restricted) ?
        restricted_lightbox : full_lightbox;
    return true;
});
~~~

3. Die Eigenschaft 'restricted' des Ereignisses steuert, ob die "restricted_lightbox"-Konfiguration verwendet wird. Wenn sie nicht gesetzt ist, wird das vollständige Lightbox angezeigt.

~~~js
scheduler.init('scheduler_here', new Date(2017, 5, 30), "week");
scheduler.parse([
    { start_date: "2017-06-27 04:00", end_date: "2017-06-27 7:00", 
        text: "Restricted event", hidden: "You won't see me", restricted: true },
    { start_date: "2017-06-29 05:00", end_date: "2017-06-29 11:00", 
        text: "Full access", hidden: "Hidden text" }
]);
~~~


![/img/dinamicchanges_lightbox](/img/dinamicchanges_lightbox.png)

[Dynamic changing of lightbox configurations](https://docs.dhtmlx.com/scheduler/samples/02_customization/29_changing_lightbox_configurations.html)
