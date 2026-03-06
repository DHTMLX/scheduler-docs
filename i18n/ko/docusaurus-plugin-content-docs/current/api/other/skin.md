---
sidebar_label: "skin"
title: "skin config"
description: "스케줄러의 현재 skin을 제공합니다"
---

# skin

### Description

@short: 스케줄러의 현재 skin을 제공합니다

@signature: skin: string

### Example

~~~jsx
var currentSkin = scheduler.skin;// -> 'glossy' 또는 'classic'
~~~

### Details

이 메서드는 스케줄러에 적용된 현재 skin을 가져옵니다. 스케줄러가 기본값(*'terrace'*)이 아닌 다른 skin을 사용 중일 경우, 해당 skin의 이름을 반환합니다. 기본 skin이 사용 중일 때는 'undefined'를 반환합니다.
