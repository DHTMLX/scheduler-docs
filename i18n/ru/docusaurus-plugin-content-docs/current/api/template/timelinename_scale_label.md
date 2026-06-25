---
sidebar_label: "TIMELINE_scale_label"
title: "TIMELINE_scale_label template"
description: "указывает элементы оси Y"
---

# TIMELINE_scale_label
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Указывает элементы оси Y

@signature: TIMELINE_scale_label: (key: string, label: string, section: object) =\> string;

### Parameters

- `key` - (required) *string* - id секции (ключ)
- `label` - (required) *string* - метка секции
- `section` - (required) *object* - объект секции, содержащий свойства 'key' и 'label'

### Returns
- ` label` - (string) - html-текст для отображения в scheduler

### Example

~~~jsx
scheduler.templates.timeline_scale_label = function(key, label, section){ 
    return label; 
};
~~~

**Доступные представления:** [Timeline view](views/timeline.md)

### Details

:::note
 Шаблон требует активации плагина [timeline](guides/extensions-list.md#timeline). 
:::

При использовании Tree режима в Timeline view вставка длинного текста в заголовок папки по умолчанию может вызвать проблемы с отображением.

Начиная с версии 5.3.12, длинный текст будет усечён. Чтобы предотвратить усечение и сохранить весь текст в одной строке, можно применить следующий CSS:

~~~css
.dhx_matrix_scell.folder > div,
.dhx_matrix_scell.folder .dhx_scell_name {
    white-space: nowrap;
    overflow: visible;
}
~~~

![long_text_1](/img/long_text_1.png)

В качестве альтернативы, текст можно разбить на несколько строк, увеличив высоту всех папок (обратите внимание, что высоту отдельной папки изменить нельзя). Это делается так:

~~~js
scheduler.createTimelineView({
      ...
      folder_dy: 80,
});
~~~

И применением CSS:

~~~css
.dhx_matrix_scell.folder .dhx_scell_name{
    line-height: 17px;
}
~~~

![split_text_timeline](/img/split_text_timeline.png)

Для версий 5.3.11 и ниже длинный текст переносится на новую строку, из-за чего он может частично скрываться. Чтобы весь текст оставался видимым в одной строке, требуется более детальная настройка CSS:

~~~css
.dhx_timeline_label_col,
.dhx_row_folder,
.dhx_matrix_scell.folder,
.dhx_scell_level0,
.dhx_scell_name{
    overflow: visible !important;
}

.dhx_matrix_scell.folder .dhx_scell_name{
    float: unset;
    white-space: nowrap;
}

.dhx_cal_data .dhx_timeline_table_wrapper div{
    text-align:left;
}
~~~

![long_text_1](/img/long_text_1.png)

### Related Guides
- [Шаблоны представления Timeline](views/timeline-view-templates.md)
