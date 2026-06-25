---
title: "Комбо"
sidebar_label: "Комбо"
---

# Комбо

Выпадающий список, представленный компонентом <a href="https://docs.dhtmlx.com/combo__index.html">DHTMLX Combo component</a>.

![combo_editor](/img/combo_editor.png)

~~~js
const holders = [
    { key: 1, label: 'James' },
    { key: 2, label: 'Alex' },
    { key: 3, label: 'Antony' },
    { key: 4, label: 'Andrew' }
];
            
scheduler.locale.labels.section_holder = "Holder";

scheduler.config.lightbox.sections = [
    { name:"description", height:50, map_to:"text", type:"textarea", focus:true },
    { name:"holders", options:holders, map_to:"holders", type:"combo", 
    image_path:"../common/dhtmlxCombo/imgs/", height:30, filtering:true},
    { name:"time", height:72, type:"time", map_to:"auto"}
];
~~~

[Combo box in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/15_combo_select.html)

## Инициализация

Чтобы добавить элемент управления Combo в lightbox, выполните следующие шаги:

1. <b>Включите файлы <a href="https://docs.dhtmlx.com/combo__index.html">dhtmlxCombo</a>:</b>
~~~js
<script src="../codebase/dhtmlxscheduler.js" ...></script>
<link rel="stylesheet" href="../codebase/dhtmlxscheduler.css" ...>

<link rel="stylesheet" href="common/dhtmlxCombo/dhtmlxcombo.css" ..>
<script src="common/dhtmlxCombo/dhtmlxcombo.js" ...></script>
~~~
2. <b>Активируйте расширение [editors](guides/extensions-list.md#editors) на странице</b>:
~~~js
scheduler.plugins({
    editors: true
});
~~~
3. <b>Добавьте секцию в конфигурацию lightbox:</b>
~~~js
scheduler.config.lightbox.sections = [
    { name:"description", ... },
    { name:"holders", options:holders, map_to:"holders", type:"combo", 
    image_path:"../common/dhtmlxCombo/imgs/", height:30, filtering:true},
    { name:"time", ...}
];
~~~
4. <b>Установите метку для раздела:</b>
~~~js
scheduler.locale.labels.section_holders = "Holder";
~~~

[Combo box in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/15_combo_select.html)

## Свойства

Следующие свойства наиболее важны и обычно настраиваются для элемента управления 'combo' (полный список смотрите [здесь](api/config/lightbox.md)):

<table class="webixdoc_links">
  <tbody>
  <tr>
  <td class="webixdoc_links0"><b>name</b></td>
  <td>(<i>string</i>) имя раздела</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>height</b></td>
  <td>(<i>number</i>) высота раздела</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>map_to</b></td>
  <td>(<i>string</i>) имя свойства данных, которое будет сопоставлено разделу</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>type</b></td>
  <td>(<i>textarea,time,select,template,multiselect,radio,checkbox,combo</i>) тип элемента управления раздела</td>
  </tr>
  <tr>
  <td class="webixdoc_links0" style="vertical-align: top;"><b>options</b></td>
  <td>(<i>array of objects</i>) определяет варианты выбора управления (<b>для 'select', 'multiselect', 'radio', 'combo' controls</b>). Каждый объект в массиве задаёт один вариант и имеет следующие свойства: <ul> <li><b>key</b> - (<i>string</i>) идентификатор варианта. Это свойство сравнивается со свойством данных события для присвоения вариантов событиям</li> <li><b>label</b> - (<i>string</i>) подпись варианта</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>image_path</b></td>
  <td>(<i>string</i>) путь к изображениям dhtmlxCombo</td>
  </tr>
  <tr>
  <td class="webixdoc_links0" style="vertical-align: top;"><b>filtering</b></td>
  <td>(<i>boolean, string</i>) включает режим автофильтрации (опции будут отфильтрованы по мере набора текста). Необязательно Значение может принимать одно из следующих значений: <ul> <li><b>false</b> - отключает фильтрацию</li> <li><b>true or "start"</b> - включает фильтрацию, поиск начинается с начала элемента</li> <li><b>"between"</b> - включает фильтрацию, поиск по любому вхождению набранного текста в элементах</li> </ul></td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>script_path</b></td>
  <td>(<i>string</i>) путь к серверному скрипту, который будет обеспечивать загрузку вариантов Combo с сервера. Необязательно</td>
  </tr>
  <tr>
  <td class="webixdoc_links0"><b>cache</b></td>
  <td>(<i>boolean</i>) включает/выключает кеширование ответов скриптов (рекомендуется включать данное свойство). Необязательно</td>
  </tr>
  </tbody>
</table>

## Заполнение элемента управления данными

В целом, чтобы задать значения для элемента управления Combo, следует использовать параметр [options](api/config/lightbox.md):

~~~js
scheduler.config.lightbox.sections = 
    { 
        name:"holders", type:"combo", 
        ...
        options:[
            { key: 1, label: 'James' },
            { key: 2, label: 'Alex' },
            { key: 3, label: 'Antony' },
            { key: 4, label: 'Andrew' }
    ]},
    ...
];
~~~

Элементы в параметре [options](api/config/lightbox.md) должны иметь 2 обязательных свойства:

- **key** - идентификатор варианта
- **label** - подпись варианта

## Заполнение элемента управления данными с сервера

Чтобы заполнить элемент управления Combo данными с сервера, используйте свойство **script_path**, указывая путь к серверному скрипту, который будет обрабатывать запросы к серверу.

~~~js
scheduler.config.lightbox.sections = [
    { name: "country", type: "combo", script_path: "data/combo_select", ... },
        ...
];
~~~

Свойство **script_path** задаёт URL, с которого Combo будет загружать свои варианты, то есть если script_path указан - Combo попытается загрузить данные по этому URL через AJAX.

Селектор Combo основан на [dhtmlxCombo](https://docs.dhtmlx.com/combo__index.html), поэтому сервер должен возвращать данные, совместимые с ним.
Подробнее о способах добавления данных в Combo читайте в статье [Loading Options](https://docs.dhtmlx.com/combo__adding_options.html).

URL запрашивается в двух случаях:

1) когда lightbox открывается и у Combo есть выбранное значение - управление отправляет запрос на сервер и загружает метку для выбранного варианта.

Запрос будет иметь параметр запроса **id**:

~~~
GET /url?id="1"
~~~

Ответ должен вернуть массив, содержащий только элемент с указанным id в следующем формате:

~~~
[
   { "value": 1, "text": "Marketing"}
]
~~~

2) когда пользователь начинает вводить текст в поле ввода списка - управление загружает отфильтрованные значения.

Клиент отправит запрос с введённым текстом в параметре запроса **mask**:

~~~
GET /url?mask="al"
~~~

Ответ сервера должен вернуть все элементы, которые соответствуют значению mask:
~~~
[
   { "value": 1, "text": "Albania"},
   { "value": 3, "text": "Algeria"},
]
~~~

Пример обработчика на стороне сервера (Node.js/Express):

~~~js
app.get("/api/countries", async (req, res) => {
  const { id, mask } = req.query;
  // Query your data source by id or mask
  const items = await countriesService.find({ id, mask });
  res.json(items); // [{ value: 1, text: "Albania" }, ...]
});
~~~

[Заполнение выпадающего списка данными с сервера](https://docs.dhtmlx.com/scheduler/samples/02_customization/18_combo_select_from_db.html)

## Режим автофильтрации

Режим авто-фильтрации — режим, когда опции автоматически фильтруются по мере ввода пользователя. Чтобы включить режим, установите свойство **filtering** в значение true:

~~~js
scheduler.config.lightbox.sections = [
    { name:"holders", type:"combo", filtering:true, ... },
    ...
];
~~~
:::note
Примечание: можно использовать режим автофильтрации независимо от источника данных (клиентский или серверный).
:::

Подробнее по теме в документации dhtmlxCombo <a href="https://docs.dhtmlx.com/combo__filtering.html">dhtmlxCombo. Filtering</a>.