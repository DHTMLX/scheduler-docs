---
sidebar_label: "section_delimiter"
title: "section_delimiter config"
description: "定义用于拆分事件相关数据属性中多个区段或单元的分隔符"
---

# section_delimiter

### Description

@short: 定义用于拆分事件相关数据属性中多个区段或单元的分隔符

@signature: section_delimiter: string

### Example

~~~jsx
scheduler.config.section_delimiter = ";";
~~~

**Default value:** ","

### Related API
- [multisection](api/config/multisection.md)

### Related Guides
- [Units View](views/units.md#assigningeventstoseveralunits)
- [타임라인 뷰](views/timeline.md#assignmentofeventstoseveralsections)
