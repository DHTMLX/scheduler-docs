---
sidebar_label: "csp"
title: "csp config"
description: "날짜 포맷팅 메서드가 내부적으로 어떻게 구현되는지를 지정합니다."
---

# csp

### Description

@short: 날짜 포맷팅 메서드가 내부적으로 어떻게 구현되는지를 지정합니다.

@signature: csp: boolean | string

### Example

~~~jsx
scheduler.config.csp = true;
...
scheduler.init("gantt_here");
~~~

**Default value:** "auto"

### Details

Salesforce Lightning과 같은 일부 런타임 환경에서는 dhtmlxScheduler 코드가 정상적으로 실행되지 않을 수 있습니다. 이는 보통 앱에 설정된 Content Security Policy(CSP) 때문입니다.

CSP는 Scheduler가 내부적으로 날짜 포맷팅 메서드를 실행하는 방식을 안전하지 않은 것으로 간주할 수 있습니다.

**csp** 설정은 이러한 메서드들이 어떻게 구현될지 선택할 수 있게 하여, Scheduler 코드가 차단되는 것을 방지합니다.

**scheduler.date.date_to_str**와 **scheduler.date.str_to_date**가 내부적으로 작동하는 모드는 세 가지가 있습니다:

- 기본값은 *auto*로 설정되어 있습니다.

~~~js
scheduler.config.csp = "auto";
~~~

이 모드에서는 Scheduler가 가능한 한 빠른 날짜 포맷팅 코드를 사용하려 시도합니다. 만약 앱 설정에서 허용되지 않으면 호환 가능한 버전으로 대체됩니다.

- 항상 호환 가능한 코드를 사용하도록 강제하려면 *true*로 설정할 수 있습니다.

~~~js
scheduler.config.csp = true;
~~~

이 설정은 어디서나 코드가 실행되도록 보장하지만, 실행 속도가 느릴 수 있습니다.

- 또는 항상 고성능 코드를 사용하려면 *false*로 설정할 수 있습니다.

~~~js
scheduler.config.csp = false;
~~~

앱에서 이 고성능 코드를 차단하면 dhtmlxScheduler가 작동을 멈출 수 있으니 주의하세요.

### Change log
- v6.0에 추가됨
