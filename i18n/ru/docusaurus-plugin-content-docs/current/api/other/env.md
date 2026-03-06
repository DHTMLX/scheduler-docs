---
sidebar_label: "env"
title: "env config"
description: "коллекция флагов, указывающих на текущую среду"
---

# env

### Description

@short: Коллекция флагов, указывающих на текущую среду

@signature: env: any

### Example

~~~jsx
if (scheduler.env.isEdge) {
    // ваш код
}
~~~

### Details

Доступны следующие флаги:

- isChrome    - true, когда браузер Chrome
- isEdge    - true, когда браузер Edge
- isFF        - true, когда браузер Firefox
- isIE        - true, когда браузер Internet Explorer
- isIE8        - true, когда браузер Internet Explorer 8
- isIE9        - true, когда браузер Internet Explorer 9
- isIE10    - true, когда браузер Internet Explorer 10
- isIE11    - true, когда браузер Internet Explorer 11
- isIPad    - true, когда браузер Safari на IPad
- isKHTML    - true, когда браузер Konqueror

### Change log
- добавлено в версии 6.0
