---
title: "Lightbox-Steuerelemente"
sidebar_label: "Lightbox-Steuerelemente"
---

# Lightbox-Steuerelemente

Das Lightbox ist ein Bearbeitungsformular, das für die Änderung der Details eines Ereignisses konzipiert ist. Das Standard-Lightbox wird im folgenden Bild dargestellt.

![lightbox](/img/lightbox.png)

## Aufbau des Lightbox

### Sektionen
Das Layout des Lightbox wird durch die **sections**-Eigenschaft des Objekts [lightbox](api/config/lightbox.md) definiert:

~~~js
// Standarddefinition des Lightbox
scheduler.config.lightbox.sections = [
    {name:"description", height:200, map_to:"text", type:"textarea" , focus:true},
    {name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

Jedes Element im **sections**-Array ist ein Objekt, das einen bestimmten Abschnitt innerhalb des Lightbox definiert ([verfügbare Abschnittseigenschaften](api/config/lightbox.md)).


### Sektionen-Steuerelemente {#sections-controls}
Jeder Abschnitt im Lightbox basiert auf einem bestimmten Steuerelement. Die folgenden Steuerelementtypen können im Lightbox verwendet werden:

- [Textarea](guides/textarea.md) - ein mehrzeiliges Texteingabefeld
- [Zeit und Datum](guides/time.md) - ein Paar von Datumswählern zur Festlegung eines Zeitraums
- [Select](guides/select.md) - eine Dropdown-Liste für Einzelauswahl
- [Template](guides/template.md) - ein Container, der HTML-Inhalt enthält
- <span id="multiselect"></span>[Multiselect](guides/multiselect.md) - eine Gruppe von Kontrollkästchen
- <span id="checkbox"></span>[Checkbox](guides/checkbox.md) - ein Kontrollkästchen mit zwei Zuständen
- <span id="radio"></span>[Radio](guides/radio.md) - eine Gruppe von Optionsfeldern
- <span id="combo"></span>[Combo](guides/combo.md) - eine Kombinationsbox, implementiert mit der DHTMLX Combo-Komponente

:::note
Beachten Sie, dass unabhängig von der verwendeten Kombination von Editoren der 'time'-Editor immer als letztes im Lightbox platziert werden sollte.
:::

~~~js
{name:"recurring", height:21, type:"select", map_to:"rec_type", options:[
    {key:"", label:"Do not repeat"},
    {key:"day", label:"Each day"},
    {key:"week", label:"Each week"},
    {key:"month", label:"Each month"}
]}
~~~
