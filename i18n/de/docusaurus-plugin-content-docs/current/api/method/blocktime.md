---
sidebar_label: "blockTime"
title: "blockTime method"
description: "blockiert das angegebene Datum und wendet den Standard-'dimmed'-Style darauf an."
---

# blockTime
:::warning
Die Funktion ist veraltet
:::
### Description

@short: Blockiert das angegebene Datum und wendet den Standard-'dimmed'-Style darauf an.

@signature: blockTime: (date: Date|number, time_points: any[], items?: any) =\> void

### Parameters

- `date` - (required) *Date | number* - ein Datum, das blockiert werden soll (wenn eine Zahl angegeben wird, wird diese als Wochentag interpretiert: <br> Tag '0' bedeutet Sonntag, '6' bedeutet Samstag)
- `time_points` - (required) *array* - ein Array <b>[start_minute,end_minute,..,start_minute_N,end_minute_N]</b>, <br> wobei jedes Paar einen Zeitbereich definiert. Das Array kann beliebig viele solcher Paare enthalten
- `items` - (optional) *object* - spezifiziert bestimmte Items von Ansicht(en), die blockiert werden sollen

### Example

~~~jsx
//blockiert Events von Mitternacht bis 8 Uhr morgens jeden Mittwoch 
//ABER nur für Items mit id=1, id=4 in der Units-Ansicht
scheduler.blockTime(3, [0,8*60], { unit: [1,4] });
~~~

### Related samples
- [Blocking dates](https://docs.dhtmlx.com/scheduler/samples/03_extensions/25_advanced_limitation.html)

### Details

:::note
 Die Methode erfordert das aktivierte [limit](guides/extensions-list.md#limit) Plugin. 
:::

Die Methode kann auf verschiedene Arten verwendet werden, zum Beispiel:


~~~js
//blockiert den ganzen Tag am 3. Mai 2009
scheduler.blockTime(new Date(2009,5,3), "fullday");

//blockiert Events von Mitternacht bis 10 Uhr morgens am 3. Juni 2009
scheduler.blockTime(new Date(2009,6,3), [0,10*60]);

//blockiert Events von Mitternacht bis 8 Uhr morgens und von 18 Uhr bis Mitternacht jeden Samstag
scheduler.blockTime(6, [0,8*60,18*60,24*60]);

//blockiert alle Events jeden Sonntag
scheduler.blockTime(0, "fullday");

//blockiert Events von Mitternacht bis 8 Uhr morgens jeden Mittwoch
//ABER nur für Items mit id=1, id=4 in der Units-Ansicht
scheduler.blockTime(3, [0,8*60], { unit: [1,4] });

//macht dasselbe wie oben, verwendet aber ein Konfigurationsobjekt für die Parameter
scheduler.blockTime({
    days: 3,
    zones: [0,8*60],
    sections: {
        unit: [1,4]
    }
});

~~~

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <tr>
  <th>
  Property 
  </th>
  <th>
  Beschreibung
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td rowspan="2"><b id="start_date">start_date</b></td>
  <td> ein Date-Objekt, das definiert, wann die Einschränkung beginnt</td>
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
  <td> ein Date-Objekt, das definiert, wann die Einschränkung endet</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
//verhindert das Erstellen von Events von 'start_date' bis zum 3. September 2012
end_date:new Date(2012,8,3)
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="days">days</b></td>
  <td> die Tage, die blockiert werden sollen</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
days:[0, 2, 6] //blockiert Sonntag, Dienstag und Samstag
days:"fullweek" //blockiert die ganze Woche
days:new Date(2012,6,1) //blockiert den 1. Juli 2012
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="zones">zones</b></td>
  <td>Zeitintervalle in Minuten, die blockiert werden sollen</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
zones:[4*60,8*60,12*60,15*60] //zwei blockierte Intervalle: 04:00-08:00, 12:00-15:00
zones:"fullday" //blockiert den ganzen Tag
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
css:"gray" //fügt ein DIV mit der CSS-Klasse 'gray' hinzu
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="invert_zones">invert_zones</b></td>
  <td>gibt an, ob die durch 'zones' definierten Zeitbereiche invertiert werden sollen (Standard ist false)</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
//ergibt zwei blockierte Intervalle: 00:00-08:00 und 17:00-24:00
zones: [8*60, 17*60], invert_zones: true 
//ergibt zwei blockierte Intervalle: 00:00-08:00 und 17:00-24:00
zones: [0, 8*60, 17*60, 24*60], invert_zones: false
~~~
  </td>
  </tr> 
  <tr>
  <td rowspan="2"><b id="sections">sections</b></td>
  <td>ermöglicht das Blockieren von Daten nur für bestimmte Items in bestimmten Views.<br> Beachten Sie, dass die angegebenen Daten nur in diesen Views blockiert werden</td>
  </tr>
  <tr>
  <td colspan="2" >
~~~js
//blockiert Daten nur für das Item mit id=5 in der Units-Ansicht
//und für Items mit id=2 und id=3 in der Timeline-Ansicht
sections: { unit: 5, timeline: [2,3]}
~~~
  </td>
  </tr> 
  </tbody>
</table>

### Related API
- [addMarkedTimespan](api/method/addmarkedtimespan.md)
- [deleteMarkedTimespan](api/method/deletemarkedtimespan.md)
- [unblockTime](api/method/unblocktime.md)

### Change log
- deprecated seit Version 5.1
