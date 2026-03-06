---
sidebar_label: "delay_render"
title: "delay_render config"
description: "[updateView](api/method/updateview.md) 및 [setCurrentView](api/method/setcurrentview.md) 호출(스케줄러의 재렌더링을 트리거하는)을 감싸는 타임아웃(밀리초 단위)을 설정합니다."
---

# delay_render

### Description

@short: [updateView](api/method/updateview.md) 및 [setCurrentView](api/method/setcurrentview.md) 호출(스케줄러의 재렌더링을 트리거하는)을 감싸는 타임아웃(밀리초 단위)을 설정합니다.

@signature: delay_render: number

### Example

~~~jsx
scheduler.config.delay_render = 30;

scheduler.init("scheduler_here");
~~~

### Details

:::note

이 옵션은 성능 향상에 도움이 될 수 있습니다.
 
:::

:::note

실제 재렌더링이 완료된 후에만 명령이 실행되도록 하려면 [onViewChange](api/event/onviewchange.md) 이벤트의 콜백 함수 내에 명령을 배치하세요.
 
:::

기본값은 0입니다.

많은 스케줄러 설정은 재렌더링을 필요로 합니다. 복잡한 설정 작업 시, 여러 함수가 각각 설정을 업데이트하고 변경 사항을 적용하기 위해 스케줄러를 새로 고칠 수 있습니다. 잦은 재렌더링은 앱 속도를 저하시킬 수 있습니다.

**delay_render** 옵션은 재렌더링 횟수를 줄이는 데 도움이 됩니다.

<br>

예를 들어, <code>scheduler.config.delay_render = 30;</code>으로 설정하면, 재렌더링 요청이 들어올 때마다 스케줄러는 호출을 큐에 넣고 30밀리초 동안 대기합니다.
이 대기 시간 동안 또 다른 재렌더링 요청이 들어오면 타이머가 리셋되고 다시 30ms를 기다립니다.
그 결과 [updateView](api/method/updateview.md) 또는/및 [setCurrentView](api/method/setcurrentview.md)가 빠르게 여러 번 호출될 경우 
(주로 커스텀 코드의 여러 부분에서 재렌더링이 트리거될 때 발생), 마지막 호출만 실제로 실행됩니다.
