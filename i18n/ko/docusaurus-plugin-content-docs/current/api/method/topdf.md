---
sidebar_label: "toPDF"
title: "toPDF method"
description: "현재 뷰를 PDF 문서로 내보내는 기능으로, 인쇄할 때 유용합니다."
---

# toPDF

### Description

@short: 현재 뷰를 PDF 문서로 내보내는 기능으로, 인쇄할 때 유용합니다.

@signature: toPDF: (url: string, mode?: string) =\> void

### Parameters

- `url` - (required) *string* - 서버 측 PDF 변환기 경로
- `mode` - (optional) *string* - 생성되는 PDF 문서에 사용되는 색상 모드

### Example

~~~jsx
scheduler.toPDF("./service/generate.php","color");
~~~

### Details

:::note
 이 메서드는 [pdf](guides/extensions-list.md#pdf) 플러그인이 활성화되어 있어야 합니다. 
::: 

:::note
 이 메서드는 dhtmlxScheduler 버전 4.0 이하에서의 내보내기와 관련이 있습니다 (자세한 내용은 ["Export to PDF (version 4.0)"](export/pdf-legacy.md) 참조). 
:::

두 번째 매개변수 (**mode**)는 다음 옵션 중 하나만 허용합니다:

- **'color'** - 전체 컬러로 인쇄 (기본값)
- **'gray'** - 그레이스케일로 인쇄
- **'bw'** - 흑백으로만 인쇄, 색상 옵션 없음
- **'custom'** - 사용자 지정 색상 스킴 사용 가능, PHP 코딩 필요 ([자세한 내용](export/pdf.md#using-export-services))
- **'fullcolor'** - 내보내기 시 실제 배경색과 텍스트 색상 사용

### Related API
- [](api/method/topdfrange.md)

### Related Guides
- ["Export to PDF (version 4.0)"](export/pdf-legacy.md)

