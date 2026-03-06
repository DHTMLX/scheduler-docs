---
sidebar_label: "addMarkedTimespan"
title: "addMarkedTimespan method"
description: "markiert Daten und kann mit bestimmten Einstellungen diese blockieren (ermöglicht das Anwenden benutzerdefinierter Styles auf die Grenzen)"
---

# addMarkedTimespan

### Description

@short: Markiert Daten und kann mit bestimmten Einstellungen diese blockieren (ermöglicht das Anwenden benutzerdefinierter Styles auf die Grenzen)

@signature: addMarkedTimespan: (config: any) =\> number

### Parameters

- `config` - (required) *object* - Das Konfigurationsobjekt, das den zu markierenden oder blockierenden Zeitraum definiert

### Returns
- ` id` - (number) - Die ID des hinzugefügten Zeitraums

### Example

~~~jsx
//markiert Daten
scheduler.addMarkedTimespan({  
    days:  5,               // markiert jeden Freitag
    zones: "fullday",       // markiert den ganzen Tag
    css:   "gray_section"   // angewandte CSS-Klasse
});
scheduler.updateView();

//markiert und blockiert Daten
scheduler.addMarkedTimespan({  
    days:  5,
    zones: "fullday",
    css:   "gray_section",
    type:  "dhx_time_block" //dies ist ein fester Wert
});
scheduler.updateView();
~~~

### Related samples
- [Highlighting timespans](https://docs.dhtmlx.com/scheduler/samples/09_api/03_highlighted_timespans.html)
- [Highlighting sections in Timeline and Units views](https://docs.dhtmlx.com/scheduler/samples/09_api/04_highlighted_sections_units.html)

### Details

Diese Methode ist seit Version 3.5 verfügbar.

:::note
 Die Methode erfordert, dass das [limit](guides/extensions-list.md#limit) Plugin aktiviert ist. 
:::

:::note

Beachten Sie, dass das Markieren (Blockieren) nicht sofort nach dem Aufruf dieser Methode wirksam wird. Sie müssen [updateView](api/method/updateview.md) aufrufen, um die Änderungen anzuwenden.
 
:::

<br>

## Eigenschaften des Konfigurationsobjekts

Das Konfigurationsobjekt kann die folgenden Eigenschaften enthalten:

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <tr>
  <th>
  Eigenschaft 
  </th>
  <th>
  Beschreibung
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td rowspan="2"><b id="start_date">start_date</b></td>
  <td> ein Date-Objekt, das den Beginn der Einschränkung definiert</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
//verhindert das Erstellen von Events ab dem 3. Mai 2012 bis 'end_date' 
start_date:new Date(2012,4,3)
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="end_date">end_date</b></td>
  <td> ein Date-Objekt, das das Ende der Einschränkung definiert</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
//verhindert das Erstellen von Events von 'start_date' 
// bis zum 3. September 2012
end_date:new Date(2012,8,3)
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="days">days</b></td>
  <td> zu beschränkende Tage</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
days:[0, 2, 6] //beschränkt Sonntag, Dienstag und Samstag
days:"fullweek" //beschränkt die gesamte Woche
days:new Date(2012,6,1) //blockiert den 1. Juli 2012
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="zones">zones</b></td>
  <td>die zu beschränkenden Zeitperioden (in Minuten)</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
//zwei Beschränkungsblöcke: 04:00-08:00 und 12:00-15:00
zones:[4*60,8*60,12*60,15*60] 
zones:"fullday" //beschränkt den ganzen Tag
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="css">css</b></td>
  <td>der anzuwendende CSS-Klassenname</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
css:"gray" //zeichnet ein DIV mit der CSS-Klasse 'gray'
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="html">html</b></td>
  <td>HTML-Inhalt, der innerhalb des markierten Bereichs angezeigt wird</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
//zeichnet ein DIV mit diesem Text über dem markierten Bereich  
html:"<b>Blocked</b>"
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="type">type</b></td>
  <td>gibt den Typ des Zeitraums an. Wird 'dhx_time_block' gesetzt, erfolgt eine Blockierung. Jeder andere Wert markiert den Zeitraum nur ohne Blockierung.</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
type: "dhx_time_block" //Zeitraum wird markiert und blockiert  
~~~
  </td>
  </tr> 
  <tr>
  <td rowspan="2"><b id="invert_zones">invert_zones</b></td>
  <td>gibt an, ob die Zeitfenster (in 'zones' gesetzt) invertiert werden sollen (Standard ist false)</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
//ergibt zwei Beschränkungsblöcke: 00:00-08:00 und 17:00-24:00
zones: [8*60, 17*60], invert_zones: true 
//ergibt zwei Beschränkungsblöcke: 00:00-08:00 und 17:00-24:00
zones: [0, 8*60, 17*60, 24*60], invert_zones: false
~~~
  </td>
  </tr> 
  <tr>
  <td rowspan="2"><b id="sections">sections</b></td>
  <td>beschränkt die Blockierung auf bestimmte Items in bestimmten Views.<br> Die Daten werden nur in den angegebenen View(s) blockiert.</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
//blockiert Daten nur für das Item mit id=5 im Unit-View 
//und Items mit den IDs 2 und 3 im Timeline-View 
sections: { unit: 5, timeline: [2,3]}
~~~
  </td>
  </tr> 
  </tbody>
</table>

## Akzeptable Kombinationen von Konfigurationseigenschaften

:::note

Beachten Sie, dass *days* und *zones* zusammen verwendet werden müssen, ebenso wie *start_date* und *end_date* als Paar, um das Blockierungsintervall zu definieren. Diese Paare dürfen nicht anders kombiniert werden.
Zum Beispiel können Sie *zones* nicht mit *start_date* kombinieren oder *days* gleichzeitig mit *start_date* und *end_date* verwenden.
 
:::

Deshalb gibt es zwei gültige Eigenschaftskombinationen:

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <tr>
  <th>
  Eigenschaftensatz 
  </th>
  <th>
  Beispiel
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>
  <ul>
  <li>`days`</li>
  <li>`zones`</li>
  <li>`invert_zones`</li>
  <li>`css`</li>
  <li>`html`</li>
  <li>`type`</li>
  <li>`sections`</li>
  </ul>
  </td>
  <td>
~~~js
var config ={
    days:  1, 
    zones: [9*60, 15*60], 
    css: "cssClassName", 
    sections: {
         unit: 5
    }
}

~~~
</td>
  </tr>
  <tr>
  <td><ul><li>`start_date`</li><li>`end_date` </li><li>`css`</li><li>`html`</li><li>`type`</li><li>`sections`</li></ul></td>
<td>

~~~js
var config ={
    start_date: new Date(2013,7,13),
    end_date:   new Date(2013,7,14),
    css: "cssClassName",
    sections: {
         unit: 5
    }
}

~~~
</td>
</tr>
  </tbody>
</table>


## Vergleich von markTimespan() und addMarkedTimespan()

<table >
<tr><td markdown='1'>
addMarkedTimespan 
</td><td markdown='1'>
markTimespan 
</td></tr>
<tr><td markdown='1'>
erfordert den Aufruf von [updateView](api/method/updateview.md), um ein DIV für den Zeitraum zu rendern 
</td><td markdown='1'>
zeichnet automatisch ein DIV für den Zeitraum 
</td></tr>
<tr><td markdown='1'>
die Zeitspanne(n) bleiben unbegrenzt bestehen 
</td><td markdown='1'>
Zeiträume werden sofort nach jeder internen Aktualisierung in der App ausgeblendet 
</td></tr>
<tr><td markdown='1'>
gibt die ID der konfigurierten Zeitspanne(n) zurück 
</td><td markdown='1'>
gibt ein DIV-Element oder ein Array von DIVs zurück 
</td></tr>
</table>

### Related API
- [deleteMarkedTimespan](api/method/deletemarkedtimespan.md)
- [markTimespan](api/method/marktimespan.md)
- [checkInMarkedTimespan](api/method/checkinmarkedtimespan.md)

### Related Guides
- [Blockieren und Markieren von Daten](guides/limits.md)
