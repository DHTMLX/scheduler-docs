---
sidebar_label: "createGridView"
title: "createGridView method"
description: "настраивает Grid view внутри планировщика"
---

# createGridView
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Настраивает Grid view внутри планировщика

@signature: createGridView: (config: any) =\> void

### Parameters

- `config` - (required) *object* - объект конфигурации для Grid view

### Example

~~~jsx
scheduler.createGridView({
    name:"grid",
    fields:[
        {id:"id",       label:'Book Title',    width:'*',    align:'right',     sort:'str'},
        {id:"date",     label:'Author',     width:100},
        {id:"text",     label:'Votes',         width:200,    align:'left',    sort:'int'}
    ],
    from:new  Date(2000, 00, 01),
    to:new Date(2013, 00, 01)
});
~~~

**Applicable views:** [Grid view](views/grid.md)

### Related samples
- [Grid view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/27_grid_view.html)

### Details

:::note
 Для использования этого метода необходимо активировать плагин [grid_view](guides/extensions-list.md#gridview). 
:::

Объект конфигурации Grid view поддерживает следующие свойства:
<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) идентификатор представления</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>fields</b></td>
  <td>(<i>массив объектов</i>) определяет колонки грида.<br> Каждый объект в этом массиве представляет колонку и может содержать следующие свойства:<ul><li><b>id</b> - (<i>string</i>) id колонки, который должен совпадать с именем соответствующего свойства данных</li><li><b>label</b> - (<i>string</i>) текст заголовка колонки</li><li><b>width</b> - (<i>string</i>) ширина колонки. Использование '*' заставляет колонку расширяться, чтобы заполнить оставшееся пространство. Если несколько колонок используют '*', они делят оставшуюся ширину поровну.</li><li><b>align</b> - (<i>right, center или left</i>) горизонтальное выравнивание текста</li> <li><b>valign</b> - (<i>top, middle или bottom</i>) вертикальное выравнивание текста</li><li><b>template</b> - (<i>function</i>) пользовательская функция шаблона для данных ячейки</li><li><b>sort</b> - (<i>'int','date','str' или пользовательская функция</i>) включает сортировку по колонке (активируется кликом по заголовку) с предопределёнными типами или пользовательской функцией сортировки</li><li><b>css</b> - (<i>string</i>) CSS класс, применяемый к колонке</li></ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>select</b></td>
  <td>(<i>boolean</i>) включает или отключает выделение в гриде (по умолчанию включено)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>rowHeight</b></td>
  <td>(<i>number</i>) задаёт высоту каждой строки в гриде</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>paging</b></td>
  <td>(<i>boolean</i>) переключает отображение кнопок навигации ![navigation_buttons](/img/navigation_buttons.png) внутри грида [(подробнее)](views/grid.md)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>unit</b></td>
  <td>(<i>minute, hour, day, week, month, year</i>) задаёт единицу времени для прокрутки. По умолчанию 'month'</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>step</b></td>
  <td>(<i>number</i>) количество единиц прокрутки за один шаг. По умолчанию 1.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>from</b></td>
  <td>(<i>Date</i>) задаёт начальную дату диапазона планировщика</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>to</b></td>
  <td>(<i>Date</i>) задаёт конечную дату диапазона планировщика</td>
  </tr>
  </tbody>
</table>

### Related Guides
- [Грид View](views/grid.md)
