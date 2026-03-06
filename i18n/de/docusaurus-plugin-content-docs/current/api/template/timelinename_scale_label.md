---
sidebar_label: "TIMELINE_scale_label"
title: "TIMELINE_scale_label template"
description: "spezifiziert Elemente der Y-Achse"
---

# TIMELINE_scale_label
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Spezifiziert Elemente der Y-Achse

@signature: TIMELINE_scale_label: (key: string, label: string, section: object) =\> string;

### Parameters

- `key` - (required) *string* - die ID des Abschnitts (key)
- `label` - (required) *string* - die Beschriftung des Abschnitts
- `section` - (required) *object* - das Abschnittsobjekt, das die Eigenschaften 'key' und 'label' enthält

### Returns
- ` label` - (string) - HTML-Text zur Darstellung im Scheduler

### Example

~~~jsx
scheduler.templates.timeline_scale_label = function(key, label, section){ 
    return label; 
};
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 Die Vorlage erfordert, dass das [timeline](guides/extensions-list.md#timeline) Plugin aktiviert ist. 
:::

Bei Verwendung des Tree-Modus in der Timeline-Ansicht kann das Einfügen von langem Text in die Ordnerüberschrift standardmäßig Darstellungsprobleme verursachen.

Ab Version 5.3.12 wird langer Text abgeschnitten. Um diese Abschneidung zu verhindern und den gesamten Text in einer einzigen Zeile anzuzeigen, kann folgendes CSS angewendet werden:

~~~js
.dhx_matrix_scell.folder > div,
.dhx_matrix_scell.folder .dhx_scell_name {
    white-space: nowrap;
    overflow: visible;
}
~~~

![long_text_1](/img/long_text_1.png)

Alternativ kann der Text in mehrere Zeilen umgebrochen werden, indem die Höhe aller Ordner erhöht wird (beachten Sie, dass die Höhe einzelner Ordner nicht angepasst werden kann). Dies kann wie folgt erfolgen:

~~~js
scheduler.createTimelineView({
      ...
      folder_dy: 80,
});
~~~

Und das folgende CSS wird angewendet:

~~~css
.dhx_matrix_scell.folder .dhx_scell_name{
    line-height: 17px;
}
~~~

![split_text_timeline](/img/split_text_timeline.png)

Für Versionen 5.3.11 und früher wird langer Text in eine neue Zeile umgebrochen, was dazu führen kann, dass er verborgen wird. Um sicherzustellen, dass der gesamte Text in einer einzigen Zeile sichtbar bleibt, ist eine detailliertere CSS-Anpassung erforderlich:

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
- [Timeline-Ansichtsvorlagen](views/timeline-view-templates.md)
