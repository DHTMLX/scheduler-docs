---
sidebar_label: "addEventNow"
title: "addEventNow method"
description: "erstellt ein neues Event und öffnet die Lightbox zur Bestätigung"
---

# addEventNow

### Description

@short: Erstellt ein neues Event und öffnet die Lightbox zur Bestätigung

@signature: addEventNow: (event: any) =\> string

### Parameters

- `event` - (required) *object* - die Event-Detail-Objekt

### Returns
- ` id` - (string) - die eindeutige Kennung des Events

### Example

~~~jsx
scheduler.addEventNow();
//oder
scheduler.addEventNow({
    start_date: new Date(2013,0,10,8,30),
    end_date:     new Date(2013,0,10,10,30),
    text:    "Meeting",
    holder:    "John", //userdata
    room:    "5"     //userdata
});
~~~

### Related samples
- [Default values for lightbox controls](https://docs.dhtmlx.com/scheduler/samples/02_customization/28_lightbox_default_value.html)
- [Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)
- [Material skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/02_material.html)

### Details

Das Event-Objekt unterstützt die folgenden Eigenschaften:

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>start_date</b></td>
  <td>(<i>Date, string</i>) das Startdatum und die Startzeit des Events. Standardmäßig ist dies das aktuelle Datum und die aktuelle Uhrzeit. <br> <br> Wenn als String angegeben, sollte es dem Format '%d-%m-%Y %H:%i' folgen (dieses Format kann über die [api_date](api/config/api_date.md) Option geändert werden)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>end_date</b></td>
  <td>(<i>Date, string</i>) das Enddatum und die Endzeit des Events. Standardmäßig ist dies das aktuelle Datum plus dem Wert aus [time_step](api/config/time_step.md). <br> <br> Wenn als String angegeben, sollte es dem Format '%d-%m-%Y %H:%i' folgen (änderbar über die [api_date](api/config/api_date.md) Option)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>text</b></td>
  <td>(<i>string</i>) der Titel oder die Beschreibung des Events</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>id</b></td>
  <td>(<i>string</i>) die eindeutige Kennung des Events. Wird keine angegeben, wird automatisch eine generiert</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>userdata</b></td>
  <td>(<i>hash</i>) eine Menge benutzerdefinierter Eigenschaften, dargestellt als Schlüssel-Wert-Paare </td>
  </tr>
  </tbody>
</table>

<br>

### Related API
- [api_date](api/config/api_date.md)
- [time_step](api/config/time_step.md)
- [addEvent](api/method/addevent.md)

### Related Guides
- [Hinzufügen/Löschen von Ereignissen](guides/adding-events.md)
