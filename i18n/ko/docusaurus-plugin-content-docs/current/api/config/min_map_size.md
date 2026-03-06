---
sidebar_label: "min_map_size"
title: "min_map_size config"
description: "autoresizing 시 Map 뷰가 축소될 수 있는 최소 크기를 정의합니다"
---

# min_map_size

### Description

@short: Autoresizing 시 Map 뷰가 축소될 수 있는 최소 크기를 정의합니다

@signature: min_map_size: number

### Example

~~~jsx
scheduler.config.min_map_size = 450;
~~~

**Default value:** 400

### Details

:::note
 이 속성은 [container_autoresize](guides/extensions-list.md#container-autoresize) 플러그인이 활성화된 경우에만 작동합니다. 
:::

### Related API
- [container_autoresize](api/config/container_autoresize.md)
- [min_grid_size](api/config/min_grid_size.md)

### Related Guides
- ["전체 확장 기능 목록"](guides/extensions-list.md#container-autoresize)
- ["Map View"](views/map.md#maprelatedconfigurationoptions)

### Change log
- 버전 4.4에 추가됨
