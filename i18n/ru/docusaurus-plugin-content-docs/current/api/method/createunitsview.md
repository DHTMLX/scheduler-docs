---
sidebar_label: "createUnitsView"
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

- `config` - (required) *object* - объект конфигурации для Units view

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

scheduler.init('scheduler_here',new Date(2009,5,30),"unit");

scheduler.parse([
 {start_date:"06/30/2009 09:00",end_date:"06/30/2009 12:00",text:"Task1",unit_id:1},
 {start_date:"06/30/2009 12:00",end_date:"06/30/2009 20:00",text:"Task2",unit_id:3},
 {start_date:"06/30/2009 08:00",end_date:"06/30/2009 12:00",text:"Task3",unit_id:2}
],"json");
~~~

**Applicable views:** [Units view](views/units.md)

### Related samples
- [Units view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/02_units_view.html)
- [Loading Units sections from the server](https://docs.dhtmlx.com/scheduler/samples/03_extensions/17_connector_units.html)

### Details

:::note
 Для использования этого метода должен быть включен плагин [units](guides/extensions-list.md#units). 
:::

Объект конфигурации для Units view поддерживает следующие свойства:
<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) идентификатор для view. Если Units view с таким именем уже существует, он будет заменён</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>property</b></td>
  <td>(<i>string</i>) указывает свойство данных, используемое для связывания событий с конкретными units</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>list</b></td>
  <td>(<i>массив объектов</i>) определяет units, отображаемые во view.<br> Каждый объект в массиве представляет отдельный unit и включает:<ul><li><b>key</b> - (<i>string</i>) уникальный id unit. Это значение сопоставляется со свойством данных события для связи событий с units</li><li><b>label</b> - (<i>string</i>) отображаемая метка unit</li></ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>days</b></td>
  <td>(<i>number</i>) количество элементов (дней), отображаемых по оси Y</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>skip_incorrect</b></td>
  <td>(<i>boolean</i>) если установлено в <i>true</i>, события, не соответствующие ни одному unit, не будут отображаться. Если <i>false</i>, такие события назначаются первому unit. По умолчанию <i>false</i>. Необязательно</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>size</b></td>
  <td>(<i>number</i>) количество units, отображаемых одновременно. Если фактическое количество превышает это значение, появляется scrollbar. Необязательно</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>step</b></td>
  <td>(<i>number</i>) количество units, прокручиваемых за один шаг. Необязательно</td>
  </tr>
  </tbody>
</table>
