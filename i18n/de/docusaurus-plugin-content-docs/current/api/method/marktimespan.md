---
sidebar_label: "markTimespan"
title: "markTimespan method"
description: "markiert oder blockiert spezifische Daten, indem entweder ein Standard- oder ein benutzerdefinierter Stil angewendet wird. Die Hervorhebung wird unmittelbar nach jeder internen Aktualisierung in der App entfernt. Dies kann nützlich sein, um bestimmte Daten hervorzuheben."
---

# markTimespan

### Description

@short: Markiert oder blockiert spezifische Daten, indem entweder ein Standard- oder ein benutzerdefinierter Stil angewendet wird. Die Hervorhebung wird unmittelbar nach jeder internen Aktualisierung in der App entfernt. Dies kann nützlich sein, um bestimmte Daten hervorzuheben.

@signature: markTimespan: (config: any) =\> any[]

### Parameters

- `config` - (required) *object* - Konfigurationsdetails für den zu markierenden oder blockierenden Zeitraum

### Returns
- ` divs` - (array) - ein Array von HTML-Elementen wird zurückgegeben

### Example

~~~jsx
//bestimmte Daten hervorheben
scheduler.markTimespan({  
    days:  5,               // hebt jeden Freitag hervor  
    zones: "fullday",       // hebt den ganzen Tag hervor
    css:   "gray_section"   // angewandte CSS-Klasse
});

//bestimmte Daten hervorheben und blockieren
scheduler.markTimespan({  
    days:  5,
    zones: "fullday",
    css:   "gray_section",
    type:  "dhx_time_block" // fester Wert zum Blockieren des Zeitraums
});
~~~

### Related samples
- [Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)

### Details

:::note

 Diese Methode ist seit Version 3.5 verfügbar.
 
:::

:::note
 Diese Methode erfordert, dass das [limit](guides/extensions-list.md#limit) Plugin aktiviert ist. 
:::

## Eigenschaften des Konfigurationsobjekts

Das Konfigurationsobjekt unterstützt die folgenden Eigenschaften:

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
  <td> ein Date-Objekt, das angibt, wann die Einschränkung beginnt</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
//verhindert das Erstellen von Events ab dem 3. Mai 2027 bis 'end_date' 
start_date:new Date(2027,4,3)
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="end_date">end_date</b></td>
  <td> ein Date-Objekt, das angibt, wann die Einschränkung endet</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
//verhindert das Erstellen von Events vom 'start_date' bis zum 3. September 2027
end_date:new Date(2027,8,3)
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="days">days</b></td>
  <td> die zu begrenzenden Tage</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
days:[0, 2, 6] // begrenzt Sonntag, Dienstag und Samstag
days:"fullweek" // begrenzt die ganze Woche
days:new Date(2027,6,1) // blockiert den 1. Juli 2027
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="zones">zones</b></td>
  <td> die zu begrenzenden Zeitabschnitte in Minuten</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
zones:[4*60,8*60,12*60,15*60] // zwei begrenzte Intervalle: 04:00-08:00, 12:00-15:00
zones:"fullday" // begrenzt den ganzen Tag
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="css">css</b></td>
  <td> der anzuwendende CSS-Klassenname </td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
css:"gray" // erzeugt ein DIV mit der angewandten CSS-Klasse 'gray'
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="html">html</b></td>
  <td> HTML-Inhalt, der innerhalb des markierten Bereichs angezeigt wird </td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
html:"<b>Blocked</b>" // fügt diesen Text innerhalb des DIV für den markierten Bereich hinzu  
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="type">type</b></td>
  <td> legt den Typ des Zeitraums fest. Wird er auf 'dhx_time_block' gesetzt, wird der Zeitraum blockiert. Jeder andere Wert markiert den Zeitraum nur, ohne ihn zu blockieren </td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
type: "dhx_time_block" // markiert und blockiert den Zeitraum  
~~~
  </td>
  </tr> 
  <tr>
  <td rowspan="2"><b id="invert_zones">invert_zones</b></td>
  <td> bestimmt, ob die Zeitabschnitte (gesetzt durch 'zones') invertiert werden sollen (Standard ist false) </td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
// ergibt zwei begrenzte Intervalle: 00:00-08:00, 17:00-24:00
zones: [8*60, 17*60], invert_zones: true 
// ergibt zwei begrenzte Intervalle: 00:00-08:00, 17:00-24:00
zones: [0, 8*60, 17*60, 24*60], invert_zones: false
~~~
  </td>
  </tr> 
  <tr>
  <td rowspan="2"><b id="sections">sections</b></td>
  <td> beschränkt das Blockieren auf bestimmte Items innerhalb bestimmter Views. Die Blockierung gilt nur in diesen zugehörigen Views</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
// blockiert Daten nur für das Item mit id=5 in der Units-Ansicht 
// und Items mit den IDs 2 und 3 in der Timeline-Ansicht 
sections: { unit: 5, timeline: [2,3]}
~~~
  </td>
  </tr> 
  </tbody>
</table>

## Akzeptable Kombinationen von config-Eigenschaften

:::note

Beachte, dass *days*, *zones* und *start_date*, *end_date* gepaart sind, um das Blockierungsintervall zu definieren und nicht anders kombiniert werden sollten.
Zum Beispiel kann *zones* nicht mit *start_date* verwendet werden, und *days* darf nicht gleichzeitig mit *start_date* und *end_date* kombiniert werden.
 
:::

Es gibt zwei gültige Eigenschaftensets, die verwendet werden können:

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <tr>
  <th>
  Eigenschaftenset 
  </th>
  <th>
  Beispiel
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td><ul><li>`days`</li><li>`zones`</li><li>`invert_zones`</li><li>`css`</li><li>`html`</li><li>`type`</li><li>`sections`</li></ul></td>
  <td>
~~~js
const config ={
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
const config ={
    start_date: new Date(2027,7,13),
    end_date:   new Date(2027,7,14),
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
erfordert den Aufruf der [updateView](api/method/updateview.md) Methode, um ein DIV für den Zeitraum zu rendern 
</td><td markdown='1'>
rendert automatisch ein DIV für den Zeitraum 
</td></tr>
<tr><td markdown='1'>
der/die Zeitraum(e) bleiben dauerhaft sichtbar 
</td><td markdown='1'>
der/die Zeitraum(e) werden unmittelbar nach jeder internen Aktualisierung in der App ausgeblendet 
</td></tr>
<tr><td markdown='1'>
gibt die ID des/der erstellten Zeitraums/Zeitspannen zurück 
</td><td markdown='1'>
gibt ein DIV oder ein Array von DIVs zurück 
</td></tr>
</table>

### Related Guides
- [Blockieren und Markieren von Daten](guides/limits.md)
