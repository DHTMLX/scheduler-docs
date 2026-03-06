---
sidebar_label: "wai_aria_application_role"
title: "wai_aria_application_role config"
description: "메인 스케줄러 컨테이너와 미니캘린더 요소에 role='application'이 할당되어야 하는지 지정합니다."
---

# wai_aria_application_role

### Description

@short: 메인 스케줄러 컨테이너와 미니캘린더 요소에 role="application"이 할당되어야 하는지 지정합니다.

@signature: wai_aria_application_role: boolean

### Example

~~~jsx
scheduler.config.wai_aria_application_role = true;
...
scheduler.init("scheduler_here");
~~~

**Default value:** true

### Details

버전 5.0에 추가됨

스크린 리더가 스케줄러 인터페이스를 처리하는 방식을 제어합니다.

### Related Guides
- ["접근성"](guides/accessibility.md)
