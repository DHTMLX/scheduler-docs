---
sidebar_label: "setLoadMode"
title: "setLoadMode method"
description: "legt den Modus für das Laden von Daten in Teilen fest und ermöglicht dynamisches Laden"
---

# setLoadMode

### Description

@short: Legt den Modus für das Laden von Daten in Teilen fest und ermöglicht dynamisches Laden

@signature: setLoadMode: (mode: string) =\> void

### Parameters

- `mode` - (required) *string* - der Lade-Modus

### Example

~~~jsx
scheduler.config.load_date = "%Y.%m.%d";  
scheduler.init('scheduler_here',new Date(2027,10,1),"month");

scheduler.setLoadMode("month")  
scheduler.load("data/events.php");
~~~

### Related samples
- [Loading data from a database](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)

### Details

:::note
  
Diese Methode sollte nach dem Aufruf von **scheduler.init()**, aber vor dem Laden von Daten in den Scheduler verwendet werden. 
 
:::

Standardmäßig lädt der Scheduler alle Daten auf einmal. Dies kann ineffizient sein, wenn große Mengen von Events verarbeitet werden. In solchen Fällen ist es besser, die Daten in Segmenten zu laden, nur das, was für die Anzeige der aktuellen Ansicht benötigt wird.

Der Parameter **mode** akzeptiert einen der folgenden vordefinierten Werte:

- day;  
- week;  
- month;  
- year.

Beispielsweise bewirkt die Einstellung des Modus auf 'month', dass der Scheduler Daten nur für den aktuellen Monat anfordert und bei Bedarf zusätzliche Daten lädt. 
[Mehr erfahren über Lade-Modi](guides/loading-data.md#dynamic-loading).

#### Request

Die generierten Requests sehen folgendermaßen aus:

~~~php
Data?from=DATEHERE&to=DATEHERE
~~~

*wobei DATEHERE ein gültiges Datum ist, formatiert gemäß der Einstellung in [load_date](api/config/load_date.md).*

<br>

Bei Verwendung von [dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html) auf Serverseite ist keine zusätzliche serverseitige Verarbeitung für das Parsen der Daten erforderlich.

### Related API
- [load_date](api/config/load_date.md)
- [load_format](api/template/load_format.md)

### Related Guides
- [Daten laden](guides/loading-data.md#dynamic-loading)
