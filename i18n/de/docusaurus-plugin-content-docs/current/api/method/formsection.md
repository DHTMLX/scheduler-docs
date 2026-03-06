---
sidebar_label: "formSection"
title: "formSection method"
description: "bietet Zugriff auf die Objekte der Lightbox-Sections"
---

# formSection

### Description

@short: Bietet Zugriff auf die Objekte der Lightbox-Sections

@signature: formSection: (name: string) =\> any

### Parameters

- `name` - (required) *string* - der Name einer Lightbox-Section

### Returns
- ` config` - (object) - das Section-Objekt (siehe die Objektmitglieder unten)

### Example

~~~jsx
var time = scheduler.formSection('time');
var descr = scheduler.formSection('description');

//liest den Wert aus
var value = time.getValue();
var value1 = descr.getValue();

//weist den Wert zu
descr.setValue('abc'); //für Sections mit einem einzelnen Control
time.setValue(null,{start_date:new Date(2009,03,10),end_date:new Date(2012,03,10)}); 
//für Sections mit mehreren Controls: der erste Parameter ist 'null', der zweite ist ein Datenobjekt
~~~

### Related samples
- [Linking select controls in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/26_linked_selects_in_lightbox.html)

### Details

Das Section-Objekt enthält die folgenden Mitglieder:

## Properties

- **section** - (*object*) das Konfigurationsobjekt der Section
  - **id** -  (*string*) die ID der Section
  - **name** - (*string*) der Name der Section. Der Scheduler verwendet diesen Namen, um das Label aus der **locale.labels**-Sammlung zu laden. Zum Beispiel wird für die 'time'-Section 
  das Label aus **scheduler.locale.labels.section_time** bezogen
  - **height** - (*number*) die Höhe der Section
  - **map_to** - (*string*) der Name der Eigenschaft, die dem Editor zugeordnet ist
- **control** - (*HTML collection*) eine Sammlung von Controls, die innerhalb der Section verwendet werden  
## Methods

- **getValue()** - gibt ein Objekt zurück, das die Daten der Section enthält
- **setValue()** - weist der Section Wert(e) zu. Die Methode akzeptiert einen Wert (oder ein Objekt mit mehreren Werten, falls die Section mehrere Controls hat), der gesetzt werden soll
