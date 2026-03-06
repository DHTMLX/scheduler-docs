---
sidebar_label: "unblockTime"
title: "unblockTime method"
description: "이전의 blockTime() 메서드로 설정된 블록을 제거합니다."
---

# unblockTime
:::warning 
이 기능은 더 이상 지원되지 않습니다.
:::
### Description

@short: 이전의 blockTime() 메서드로 설정된 블록을 제거합니다.

@signature: unblockTime: (days: any, zones?: any[], sections?: any) =\> void

### Parameters

- `days` - (required) *any* - (<i>Date, number, array, string</i>) 차단 해제할 날짜를 지정합니다.
- `zones` - (optional) *array* - 분 단위의 차단 해제 시간 구간입니다. 'fullday'로 설정하면 하루 전체를 차단 해제합니다.
- `sections` - (optional) *object* - 특정 뷰 내 특정 항목에 대해서만 날짜를 차단 해제할 수 있습니다. 지정된 날짜는 관련 뷰에서만 차단 해제됩니다.

### Example

~~~jsx
var spanId = scheduler.blockTime(new Date(2013,2,5), "fullday");
...
// 2013년 2월 5일 0시부터 8시, 그리고 18시부터 24시까지 차단을 해제합니다.
scheduler.unblockTime(new Date(2013,2,5), [0,10*60]);
~~~

### Related API
- [blockTime](api/method/blocktime.md)

### Change log
- v5.1부터 deprecated 되었습니다.
