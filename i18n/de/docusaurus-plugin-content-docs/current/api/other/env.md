---
sidebar_label: "env"
title: "env config"
description: "eine Sammlung von Flags, die die aktuelle Umgebung anzeigen"
---

# env

### Description

@short: Eine Sammlung von Flags, die die aktuelle Umgebung anzeigen

@signature: env: any

### Example

~~~jsx
if (scheduler.env.isEdge) {
    // dein Code
}
~~~

### Details

Hier sind die verfügbaren Flags:

- isChrome    - true, wenn der Browser Chrome ist
- isEdge    - true, wenn der Browser Edge ist
- isFF        - true, wenn der Browser Firefox ist
- isIE        - true, wenn der Browser Internet Explorer ist
- isIE8        - true, wenn der Browser Internet Explorer 8 ist
- isIE9        - true, wenn der Browser Internet Explorer 9 ist
- isIE10    - true, wenn der Browser Internet Explorer 10 ist
- isIE11    - true, wenn der Browser Internet Explorer 11 ist
- isIPad    - true, wenn der Browser Safari auf einem iPad ist
- isKHTML    - true, wenn der Browser Konqueror ist

### Change log
- hinzugefügt in Version 6.0
