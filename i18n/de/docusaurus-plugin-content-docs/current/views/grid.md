---
title: "Grid-Ansicht"
sidebar_label: "Grid-Ansicht"
---

# Grid-Ansicht 

:::info
Diese Ansicht ist nur in der Scheduler PRO-Version enthalten.
:::

Die Grid-Ansicht zeigt eine Liste bevorstehender Ereignisse an und ermöglicht es Ihnen im Gegensatz zur Agenda-Ansicht, beliebig viele Spalten zu konfigurieren.

![grid_view](/img/grid_view.png)


[Grid view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/27_grid_view.html)


## Initialisierung {#initialization}

So fügen Sie die Grid-Ansicht dem Scheduler hinzu:

1. Aktivieren Sie die "grid view"-Erweiterung auf Ihrer Seite:
~~~js
scheduler.plugins({
    grid_view: true
});
~~~
2. Fügen Sie den Tab der Ansicht in das Markup des Schedulers ein:
~~~html
<div id="scheduler_here" class="dhx_cal_container" ...>
    <div class="dhx_cal_navline">
       ...
       <div class="dhx_cal_tab" name="grid_tab"></div>
    </div>
    ...    
</div>
~~~
3. Legen Sie das Label für den Tab fest:
~~~js
//'grid_tab' ist der Name unseres div
scheduler.locale.labels.grid_tab = "Grid";
~~~
4. Rufen Sie die Methode [createGridView](api/method/creategridview.md) auf: 
~~~js
scheduler.createGridView({
    name:"grid",
    fields:[    // definiert die Spalten des Grids
        {id:"id",   label:'Id',   sort:'int',  width:80,  align:'right'},
        {id:"date", label:'Date', sort:'date', width:'*'},
        {id:"text", label:'Text', sort:'str',  width:200, align:'left'}
    ],
    from:new Date(2027, 3, 10),//linke Grenze des erlaubten Datumsbereichs
    to:new Date(2027, 5, 23)    //rechte Grenze des erlaubten Datumsbereichs
});
~~~


[Grid view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/27_grid_view.html)


## Datumsbereich begrenzen {#limitingdaterange}

Mit dieser Erweiterung können Sie die aktiven Daten einschränken, sodass Benutzer den angegebenen Bereich nicht überschreiten können.

Wenn Sie beispielsweise die aktiven Daten vom **1. Januar 2026** bis zum **1. Januar 2027** begrenzen möchten, konfigurieren Sie es wie folgt:


~~~js
scheduler.createGridView({
     name:"grid",
    ..
    from:new Date(2026, 0, 1),
    to:new Date(2027, 0, 1)
});

~~~

## Navigation aktivieren {#activatingnavigation}

Um die Navigation mit den Schaltflächen ![navigation_buttons](/img/navigation_buttons.png) im Grid zu aktivieren, stellen Sie einfach die [paging](api/method/creategridview.md)-Eigenschaft auf true:


~~~js
scheduler.createGridView({
    name:"grid",
    ...
    paging:true
});
~~~

[Grid view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/27_grid_view.html)


Mit aktivierter Navigation scrollen die ![navigation_buttons](/img/navigation_buttons.png) Schaltflächen das Grid jeweils einen Monat vor oder zurück. 


Um das Standardzeitintervall für das Scrollen anzupassen, verwenden Sie die Eigenschaften **unit** und **step**:

- **unit** - (<i>minute, hour, day, week, month, year</i>) die Zeiteinheit für das Scrollen. Standard ist 'month'
- **step** - (<i>number</i>) wie viele Einheiten auf einmal gescrollt werden. Standard ist 1. 


~~~js
//Scrollen in 2-Wochen-Schritten
scheduler.createGridView({
    name:"grid",
    ...
    paging:true,
    unit:"week",
    step:2
});
~~~

## Sortierung {#sorting}

Ein Klick auf einen Spaltenkopf aktiviert eine Steuerung, die anzeigt, nach welcher Spalte das Grid sortiert ist und ob auf- oder absteigend sortiert wird.


Ein erneuter Klick auf denselben Kopf kehrt die Sortierreihenfolge um.

Da Spalten verschiedene Datentypen enthalten können (Zahlen, Zeichenketten, Daten), benötigt jeder Typ seine eigene Sortiermethode.

Deshalb unterstützt die Ansicht 3 Sortiertypen, um dies korrekt zu handhaben:

1. **int**;
2. **date**;
3. **str**.


Um die Sortierung zu aktivieren und den Sortiertyp einer Spalte festzulegen, verwenden Sie die [sort](api/method/creategridview.md)-Eigenschaft.


~~~js
scheduler.createGridView({
    name:"grid",
    fields:[
        {id:"date",  label:'Date', sort:'date'},
        {id:"text",  label:'Text', sort:'str'}
    ]
});

~~~


## Eigene Sortierfunktionen {#customsortingfunctions}

Wenn Sie eigene Sortierlogik verwenden möchten, definieren Sie eine Funktion und weisen Sie sie dem [sort](api/method/creategridview.md)-Parameter zu.

Diese Funktion wird für jedes Wertepaar aufgerufen und sollte 1, -1 oder 0 zurückgeben:


- **1** - der erste Wert soll vor dem zweiten erscheinen;
- **-1** - der zweite Wert soll vor dem ersten erscheinen;
- **0** - beide Werte sind gleich.

Hier ein Beispiel für eine allgemeine Sortierfunktion:


~~~js
scheduler.createGridView({
    name:"grid",
    fields:[
        {id:"id",   label:'Id',      sort: sortById},
        {id:"text", label:'Text', sort:'str'}
    ]
});

function sortById(a,b){
    a = a.id;
    b = b.id;
    return a>b?1:(a<b?-1:0);
}
~~~


## Daten-Templates {#datatemplates}

Standardmäßig zeigt jede Spalte die Daten aus der als **id** angegebenen Eigenschaft an.
  
Wenn Sie den in einer Spalte angezeigten Inhalt anpassen möchten, können Sie Templates verwenden. In diesem Fall zeigt die Spalte die von der Template-Funktion zurückgegebenen Daten an.
  
  
Daten-Templates werden Spalten mit der [template](api/method/creategridview.md)-Eigenschaft zugewiesen. 


~~~js
scheduler.createGridView({
    name:"grid",
    fields:[
      {id:"date",label:'Date',template:function(start,end,ev){return "1# "+ev.text}},
       ...
    ]
});

~~~


Die Template-Funktion erhält 3 Parameter:

- **start** - das Startdatum des Ereignisses
- **end** - das Enddatum des Ereignisses
- **ev** - das Ereignisobjekt


## Verwandte Anleitungen

- [Allgemeine Konfigurationsanweisungen](guides/configuration.md)
- [Grid-View-Vorlagen](views/grid-view-templates.md)
- [Daten laden](guides/loading-data.md)
- [Event-Objekt-Operationen](guides/event-object-operations.md)
- [Blockieren und Markieren von Daten](guides/limits.md)
- [Skins](guides/skins.md)
