---
sidebar_label: "section_delimiter"
title: "section_delimiter config"
description: "이벤트의 관련 데이터 속성 내에서 여러 섹션 또는 단위를 구분하기 위해 사용하는 구분자를 정의합니다."
---

# section_delimiter

### Description

@short: 이벤트의 관련 데이터 속성 내에서 여러 섹션 또는 단위를 구분하기 위해 사용하는 구분자를 정의합니다.

@signature: section_delimiter: string

### Example

~~~jsx
scheduler.config.section_delimiter = ";";
~~~

**Default value:** ","

### Related API
- [multisection](api/config/multisection.md)

### Related Guides
- ["Units View"](views/units.md#assigningeventstoseveralunits)
- ["타임라인 뷰"](views/timeline.md#assignmentofeventstoseveralsections)
