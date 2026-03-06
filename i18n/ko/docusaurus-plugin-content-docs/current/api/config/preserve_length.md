---
sidebar_label: "preserve_length"
title: "preserve_length config"
description: "비선형 타임 스케일에서 이벤트를 드래그할 때 보이는 길이를 동일하게 유지합니다."
---

# preserve_length

### Description

@short: 비선형 타임 스케일에서 이벤트를 드래그할 때 보이는 길이를 동일하게 유지합니다.

@signature: preserve_length: boolean

### Example

~~~jsx
scheduler.config.preserve_length = true;
~~~

**Default value:** true

**Applicable views:** [Month view](views/month.md), [Timeline view](views/timeline.md)

### Details

이 모드는 기본적으로 활성화되어 있습니다.

이 모드가 활성화되면, 이벤트는 시작일과 종료일로 정의된 실제 길이 대신 드래그 앤 드롭 중에 보이는 길이를 유지합니다.
<br> 예를 들어, 월별 뷰에서 2일짜리 이벤트가 있고 주말이 숨겨져 있을 때, 이벤트를 금요일과 월요일에 걸쳐 드래그하면 실제 시작일과 종료일 사이의 기간은 4일이 됩니다. 하지만 scheduler는 보이는 길이를 2일로 유지합니다.
