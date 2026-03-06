---
sidebar_label: "onBeforeTooltip"
title: "onBeforeTooltip event"
description: "데이터 항목에 대한 tooltip이 나타나기 직전에 트리거됩니다 ('tooltip' 확장 기능이 활성화된 경우에만 적용)"
---

# onBeforeTooltip

### Description

@short: 데이터 항목에 대한 tooltip이 나타나기 직전에 트리거됩니다 ('tooltip' 확장 기능이 활성화된 경우에만 적용)

@signature: onBeforeTooltip: (id: string) =\> boolean

### Parameters

- `id` - (required) *string* - tooltip이 표시될 데이터 항목의 ID

### Returns
- ` result` - (boolean) - 기본 이벤트 동작이 계속 진행되는지(<b>true</b>) 또는 취소되는지(<b>false</b>)를 결정합니다

### Example

~~~jsx
scheduler.attachEvent("onBeforeTooltip", function (id){
    //여기에 사용자 정의 로직 작성
    return true;
});
~~~

### Details

이 이벤트는 차단할 수 있습니다. *false*를 반환하면 tooltip이 표시되지 않습니다.
