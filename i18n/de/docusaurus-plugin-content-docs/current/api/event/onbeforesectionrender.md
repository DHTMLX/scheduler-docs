---
sidebar_label: "onBeforeSectionRender"
title: "onBeforeSectionRender event"
description: "Wird unmittelbar ausgelöst, bevor ein einzelner Timeline-Abschnitt eingerichtet, aber noch nicht gerendert wurde (gilt nur für die Timeline-Ansicht)"
---

# onBeforeSectionRender
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Wird unmittelbar ausgelöst, bevor ein einzelner Timeline-Abschnitt eingerichtet, aber noch nicht gerendert wurde (gilt nur für die Timeline-Ansicht)

@signature: onBeforeSectionRender: (mode: string, section: object, timeline: object) =\> object

### Parameters

- `mode` - (required) *string* - der Timeline-Modus: 'cell', 'bar' oder 'tree'
- `section` - (required) *object* - das Abschnittsobjekt, das die Eigenschaften 'key' und 'label' enthält, wie in dem 'y_unit'-Array der Timeline-Konfiguration definiert (zum Beispiel \{key:1, label:"James Smith"\})
- `timeline` - (required) *object* - das Timeline-Konfigurationsobjekt

### Returns
- ` result` - (object) - das Abschnittsobjekt

### Example

~~~jsx
scheduler.attachEvent("onBeforeSectionRender", function(mode, section, timeline){
    // benutzerdefinierte Logik kann hier hinzugefügt werden
    return section;
});
~~~

### Details

Dieses Event ermöglicht es Ihnen, die Timeline-Abschnitte anzupassen, bevor sie gerendert werden.
