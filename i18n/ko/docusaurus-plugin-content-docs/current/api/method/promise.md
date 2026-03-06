---
sidebar_label: "Promise"
title: "Promise method"
description: "Promise 객체를 생성하는 생성자"
---

# Promise

### Description

@short: Promise 객체를 생성하는 생성자

@signature: Promise: (executor: SchedulerCallback) =\> any

### Parameters

- `executor` - (required) *function* - 프로미스를 설정하는 콜백 함수

### Returns
- ` promise` - (object) - 생성된 프로미스 객체

### Example

~~~jsx
new scheduler.Promise(function(resolve, reject) {
    setTimeout(function(){
        resolve();
    }, 5000);
}).then(function(){
    alert("Resolved")
});
~~~

### Details

이것은 Promise 객체를 생성하는 생성자입니다.

### Change log
- v6.0에 도입됨.
- v7.0에서 Bluebird에서 네이티브 Promise로 변경됨.
