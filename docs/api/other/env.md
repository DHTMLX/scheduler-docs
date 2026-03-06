---
sidebar_label: env
title: "env config"
description: "a set of flags which describe current environment"
---

# env

### Description

@short: A set of flags which describe current environment

@signature: env: any

### Example

~~~jsx
if (scheduler.env.isEdge) {
    // your code
}
~~~

### Details

The possible flags are:

- isChrome    - set to true if browser is Chrome
- isEdge    - set to true if browser is Edge
- isFF        - set to true if browser is Firefox
- isIE        - set to true if browser is Internet Explorer
- isIE8        - set to true if browser is Internet Explorer 8
- isIE9        - set to true if browser is Internet Explorer 9
- isIE10    - set to true if browser is Internet Explorer 10
- isIE11    - set to true if browser is Internet Explorer 11
- isIPad    - set to true if browser is Safari on IPad
- isKHTML    - set to true if browser is Konqueror

### Change log
- added in version 6.0
