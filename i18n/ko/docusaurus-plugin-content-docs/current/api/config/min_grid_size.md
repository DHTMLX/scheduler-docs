---
sidebar_label: "min_grid_size"
title: "min_grid_size config"
description: "Grid 뷰가 자동 크기 조정 시 축소될 수 있는 최소 크기를 정의합니다."
---

# min_grid_size
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: Grid 뷰가 자동 크기 조정 시 축소될 수 있는 최소 크기를 정의합니다.

@signature: min_grid_size: number

### Example

~~~jsx
scheduler.config.min_grid_size = 30;
~~~

**Default value:** 25

### Details

:::note
 이 설정은 [container_autoresize](guides/extensions-list.md#container-autoresize) 플러그인이 활성화된 경우에만 작동합니다. 
:::

### Related API
- [container_autoresize](api/config/container_autoresize.md)
- [min_map_size](api/config/min_map_size.md)

### Related Guides
- ["전체 확장 기능 목록"](guides/extensions-list.md#container-autoresize)
- ["Grid View"](views/grid.md)

### Change log
- 버전 4.4에 추가됨
