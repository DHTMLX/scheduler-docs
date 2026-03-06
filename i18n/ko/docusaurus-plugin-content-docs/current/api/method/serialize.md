---
sidebar_label: "serialize"
title: "serialize method"
description: "스케줄러에 현재 로드된 모든 이벤트를 serialize합니다."
---

# serialize

### Description

@short: 스케줄러에 현재 로드된 모든 이벤트를 serialize합니다.

@signature: serialize: () =\> void

### Example

~~~jsx
console.log(scheduler.serialize());


//(5) [{…}, {…}, {…}, {…}, {…}]
//> 0: {id: 1, start_date: '2022-05-17 09:00', end_date: '2022-05-17 12:00', 
//    text: 'Event'}
//> 1: {id: 2, start_date: '2022-05-18 10:00', end_date: '2022-05-18 16:00', 
//    text: 'Event'}
//> 2: {id: 3, start_date: '2022-05-20 10:00', end_date: '2022-05-20 14:00', 
//    text: 'Event'}
//> 3: {id: 4, start_date: '2022-05-21 16:00', end_date: '2022-05-21 17:00', 
//    text: 'Event'}
//> 4: {id: 5, start_date: '2022-05-22 09:00', end_date: '2022-05-22 17:00', 
//    text: 'Event'}
~~~

### Details

이 메서드는 현재 Scheduler에 로드된 모든 이벤트를 배열로 반환합니다.

결과 배열에는 ["반복 이벤트"](guides/recurring-events.md) 확장 기능에 의해 생성된 임시 레코드는 포함되지 않습니다.

`_` 또는 `$`로 시작하는 속성들은 반환된 객체에서 제외되며, 모든 `Date` 속성은 [format_date](api/template/format_date.md) 템플릿을 사용하여 문자열로 변환됩니다.

### Related API
- [format_date](api/template/format_date.md)

### Change log
- v6.0에 추가됨
