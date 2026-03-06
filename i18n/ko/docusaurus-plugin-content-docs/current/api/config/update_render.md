---
sidebar_label: "update_render"
title: "update_render config"
description: "스케줄러가 모든 동작 후에 완전히 다시 그려지는지 여부를 제어합니다."
---

# update_render

### Description

@short: 스케줄러가 모든 동작 후에 완전히 다시 그려지는지 여부를 제어합니다.

@signature: update_render: boolean

### Example

~~~jsx
scheduler.config.update_render = true;
...     
scheduler.init('scheduler_here',new Date(2013,7,11),"week");
~~~

**Default value:** false

### Details

기본적으로, 이벤트를 드래그하거나 크기를 조절할 때, 스케줄러는 성능 향상을 위해 변경된 이벤트만 다시 그립니다. 전체 스케줄러는 드래그 앤 드롭 작업이 완료된 후에만 다시 그려집니다.

일부 상황에서는 드래그 중인 이벤트의 위치가 인근 이벤트들의 레이아웃에 영향을 줄 수 있습니다. 이 경우, 작업 중에 모든 것이 제대로 표시되도록 하기 위해 스케줄러를 완전히 다시 그려야 합니다.

<br>

예를 들어, 여러 이벤트가 동일한 셀에 위치해 있고 하단에 있는 이벤트를 이동할 경우, 이동 중에는 그 이벤트만 다시 그려집니다. 이로 인해 일시적으로 상단 이벤트와 시각적으로 겹칠 수 있습니다. 마우스 버튼을 놓으면 모든 이벤트가 올바른 위치로 조정됩니다. **update_render** 옵션을 활성화하면 모든 동작 후에 스케줄러가 완전히 다시 그려져서 이러한 시각적 겹침을 방지합니다.
