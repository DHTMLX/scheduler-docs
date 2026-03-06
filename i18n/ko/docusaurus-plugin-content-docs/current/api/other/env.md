---
sidebar_label: "env"
title: "env config"
description: "현재 환경을 나타내는 플래그들의 컬렉션"
---

# env

### Description

@short: 현재 환경을 나타내는 플래그들의 컬렉션

@signature: env: any

### Example

~~~jsx
if (scheduler.env.isEdge) {
    // your code
}
~~~

### Details

사용 가능한 플래그는 다음과 같습니다:

- isChrome    - 브라우저가 Chrome일 때 true
- isEdge    - 브라우저가 Edge일 때 true
- isFF        - 브라우저가 Firefox일 때 true
- isIE        - 브라우저가 Internet Explorer일 때 true
- isIE8        - 브라우저가 Internet Explorer 8일 때 true
- isIE9        - 브라우저가 Internet Explorer 9일 때 true
- isIE10    - 브라우저가 Internet Explorer 10일 때 true
- isIE11    - 브라우저가 Internet Explorer 11일 때 true
- isIPad    - 브라우저가 IPad의 Safari일 때 true
- isKHTML    - 브라우저가 Konqueror일 때 true

### Change log
- 버전 6.0에서 추가됨
