--- 
sidebar_label: createGridView 
title: "createGridView метод" 
description: "создает Grid view в планировщике" 
---

# createGridView
:::info
 Эта функциональность доступна только в версии PRO. 
:::

### Description

@short: Настраивает Grid view внутри планировщика

@signature: createGridView: (config: any) => void

### Parameters

- `config` - (required) *object* - объект конфигурации Grid view

### Example

~~~jsx
scheduler.createGridView({
    name:"grid",
    fields:[
        {id:"id",       label:'Book Title',    width:'*',    align:'right',     sort:'str'},
        {id:"date",     label:'Author',     width:100},
        {id:"text",     label:'Votes',         width:200,    align:'left',    sort:'int'}
    ],
    from:new  Date(2025, 00, 01),
    to:new Date(2027, 00, 01)
});
~~~

**Доступные представления:** [Grid view](views/grid.md)

### Related samples
- [Grid view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/27_grid_view.html)

### Details

:::note
 Для использования этого метода необходимо активировать плагин [grid_view](guides/extensions-list.md#gridview). 
:::

Объект конфигурации Grid view может иметь следующие свойства:
<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) идентификатор вида</td>
  </tr>
  <tr>
  <td class="webixdoc_links0" style="vertical-align: top;"><b>fields</b></td>
  <td>(<i>массив объектов</i>) конфигурирует столбцы сетки grid. Каждый объект в массиве задаёт один столбец и может иметь следующие свойства: <ul><li><b>id</b> - (<i>string</i>) идентификатор столбца. Должен соответствовать имени связанного свойства данных, из которого вы будете загружать данные</li><li><b>label</b> - (<i>string</i>) заголовок столбца</li><li><b>width</b> - (<i>string</i>) ширина столбца. Можно использовать '*' (звездочка) в качестве значения ширины, чтобы принудительно заполнить оставшуюся ширину для конкретного столбца. Если использовать '*' для нескольких столбцов, они будут делить оставшуюся ширину поровну.</li><li><b>align</b> - (<i>right, center или left</i>) горизонтальное выравнивание текста</li><li><b>valign</b> - (<i>top, middle или bottom</i>) вертикальное выравнивание текста</li><li><b>template</b> - (<i>function</i>) шаблон данных</li><li><b>sort</b> - (<i>'int','date','str' или пользовательская функция</i>) включает сортировку по столбцу (инициируется одним кликом по заголовку) и присваивает один из предопределённых типов сортировки или имя функции сортировки</li><li><b>css</b> - (<i>string</i>) имя CSS класса, который будет применён к столбцу</li></ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>select</b></td>
  <td>(<i>boolean</i>) включает/выключает выделение в сетке (по умолчанию выделение включено)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>rowHeight</b></td>
  <td>(<i>number</i>) высота строк в сетке</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>paging</b></td>
  <td>(<i>boolean</i>) включает/выключает навигацию кнопками ![navigation_buttons](/img/navigation_buttons.png) в сетке [(details)](views/grid.md)</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>unit</b></td>
  <td>(<i>minute, hour, day, week, month, year</i>) единица прокрутки времени. По умолчанию - 'month'</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>step</b></td>
  <td>(<i>number</i>) количество единиц прокручивания за один шаг. По умолчанию 1.</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>from</b></td>
  <td>(<i>Date</i>) устанавливает левую границу допустимого диапазона дат. Используется для ограничения диапазона дат в планировщике</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>to</b></td>
  <td>(<i>Date</i>) устанавливает правую границу допустимого диапазона дат. Используется для ограничения диапазона дат в планировщике</td>
  </tr>
  </tbody>
</table>

### Related Guides
- [Grid View](views/grid.md)