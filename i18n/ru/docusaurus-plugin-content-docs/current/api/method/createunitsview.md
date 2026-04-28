---
sidebar_label: createUnitsView
title: "createUnitsView method"
description: "настраивает Units view внутри scheduler"
---

# createUnitsView
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Настраивает Units view внутри scheduler

@signature: createUnitsView: (config: any) =\> void

### Parameters

- `config` - (required) *object* - объект конфигурации Units view

### Example

~~~jsx
scheduler.createUnitsView({
    name:"unit",
    property:"unit_id",
    list:[
        {key:1, label:"Section A"},
        {key:2, label:"Section B"},
        {key:3, label:"Section C"}    
    ]
});

scheduler.init('scheduler_here',new Date(2027,5,30),"unit");

scheduler.parse([
 {start_date:"06/30/2027 09:00",end_date:"06/30/2027 12:00",text:"Task1",unit_id:1},
 {start_date:"06/30/2027 12:00",end_date:"06/30/2027 20:00",text:"Task2",unit_id:3},
 {start_date:"06/30/2027 08:00",end_date:"06/30/2027 12:00",text:"Task3",unit_id:2}
],"json");
~~~

**Доступные представления:** [Units view](views/units.md)

### Related samples
- [Units view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/02_units_view.html)
- [Loading Units sections from the server](https://docs.dhtmlx.com/scheduler/samples/03_extensions/17_connector_units.html)

### Details

:::note
 Метод требует активации плагина [units](guides/extensions-list.md#units). 
:::

Объект конфигурации для Units view поддерживает следующие свойства:
<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) идентификатор представления. Если вы укажете имя уже существующего Units view - оно будет перезаписано</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>property</b></td>
  <td>(<i>string</i>) имя свойства данных, которое будет использоваться для назначения событий конкретным единицам</td>
  </tr>
  <tr>
  <td class="webixdoc_links0" style="vertical-align: top;"><b>list</b></td>
  <td>(<i>array of objects</i>) задаёт единицы представления.<br> Каждый объект в массиве задаёт одну единицу и имеет следующие свойства:<ul> <li><b>key</b> - (<i>string</i>) идентификатор единицы. Этот атрибут сравнивается со свойством данных события, чтобы присвоить событие этой единице</li><li><b>label</b> - (<i>string</i>) подпись единицы</li></ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>days</b></td>
  <td>(<i>number</i>) число элементов (дней) на оси Y</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>skip_incorrect</b></td>
  <td>(<i>boolean</i>) если <i>true</i>, события, принадлежащие не к одной из единиц, не будут отображаться. Если <i>false</i> — такие события будут назначены первой единице. По умолчанию — <i>false</i>. Опционально</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>size</b></td>
  <td>(<i>number</i>) количество единиц, которые должны отображаться в представлении (если фактическое количество превысит это значение, будет отображаться полосa прокрутки). Опционально</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>step</b></td>
  <td>(<i>number</i>) количество единиц, которое будет прокручиваться за один раз. Опционально</td>
  </tr>
  </tbody>
</table>