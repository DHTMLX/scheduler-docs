---
sidebar_label: "env"
title: "env config"
description: "表示当前环境的一组标志集合"
---

# env

### Description

@short: 表示当前环境的一组标志集合

@signature: env: any

### Example

~~~jsx
if (scheduler.env.isEdge) {
    // your code
}
~~~

### Details

以下是可用的标志:

- isChrome    - 当浏览器为 Chrome 时为 true
- isEdge    - 当浏览器为 Edge 时为 true
- isFF        - 当浏览器为 Firefox 时为 true
- isIE        - 当浏览器为 Internet Explorer 时为 true
- isIE8        - 当浏览器为 Internet Explorer 8 时为 true
- isIE9        - 当浏览器为 Internet Explorer 9 时为 true
- isIE10    - 当浏览器为 Internet Explorer 10 时为 true
- isIE11    - 当浏览器为 Internet Explorer 11 时为 true
- isIPad    - 当浏览器为 iPad 上的 Safari 时为 true
- isKHTML    - 当浏览器为 Konqueror 时为 true

### Change log
- 在版本 6.0 中添加
