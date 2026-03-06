---
sidebar_label: "toPDFRange"
title: "toPDFRange method"
description: "여러 스케줄러 뷰를 PDF 문서로 내보내기 (인쇄용으로 유용)"
---

# toPDFRange

### Description

@short: 여러 스케줄러 뷰를 PDF 문서로 내보내기 (인쇄용으로 유용)

@signature: toPDFRange: (from: Date, to: Date, view: string, path: string, color: string) =\> void

### Parameters

- `from` - (required) *Date* - 이벤트 내보내기를 시작할 날짜
- `to` - (required) *Date* - 이벤트 내보내기를 종료할 날짜
- `view` - (required) *string* - 내보낼 뷰의 이름
- `path` - (required) *string* - PDF를 생성하는 PHP 파일 경로 ([자세히](export/pdf.md#using-export-services))
- `color` - (required) *string* - 내보내기 시 적용할 색상 스킴

### Example

~~~jsx
//2012년 1월 1일부터 2012년 2월 1일까지 'week' 뷰 페이지 내보내기
scheduler.toPDFRange(new Date(2012,0,1), new Date(2012, 1,1),'week', 
  'generate.php', 'fullcolor');
~~~

### Details

:::note
 이 메서드는 [pdf](guides/extensions-list.md#pdf) 플러그인이 활성화되어 있어야 합니다. 
:::

**color** 파라미터는 미리 정의된 특정 값만 허용합니다:

- **'color'** - 풀 컬러 인쇄 (기본값)
- **'gray'** - 그레이스케일 인쇄
- **'bw'** - 엄격한 흑백 인쇄
- **'custom'** - 사용자 정의 컬러 맵 사용 가능, PHP 코딩 필요 ([자세히](export/pdf.md#using-export-services))
- **'fullcolor'** - 내보내기 시 실제 배경색과 텍스트 색상을 유지

### Related API
- [toPDF](api/method/topdf.md)

