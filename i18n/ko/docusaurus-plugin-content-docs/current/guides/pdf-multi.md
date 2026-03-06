---
title: "멀티 페이지 PDF 내보내기"
sidebar_label: "멀티 페이지 PDF 내보내기"
---

# 멀티 페이지 PDF 내보내기

라이브러리에는 여러 뷰 페이지를 하나의 PDF 문서로 내보낼 수 있는 편리한 메서드가 포함되어 있습니다.

~~~js
scheduler.toPDFRange(from, to, view, path, scheme);
~~~

+ _**from**_ - (_Date 객체_) 내보낼 이벤트의 시작 날짜
+ _**to**_ - (_Date 객체_) 내보낼 이벤트의 종료 날짜
+ _**view**_ - (_string_) 내보내기에 사용할 뷰 타입
+ _**path**_ - (_url_) PDF 생성을 담당하는 PHP 파일의 URL. 자세한 내용은 ['Export to PDF. Configuring service'](export/pdf.md#server-side) 챕터를 참고하세요.
+ _**color**_ - (_'color', 'gray', 'bw', 'custom', 'fullcolor'_) 내보내기 시 사용할 색상 스킴을 정의합니다.

1. '_color_' - 전체 컬러 인쇄를 위한 기본 옵션
2. '_gray_' - 그레이스케일로 내보내기
3. '_bw_' - 흑백만 사용하여 내보내기
4. '_custom_' - 사용자 정의 색상 맵 사용 가능 (PHP 커스터마이징 필요, 자세한 내용은 ['Export to PDF. Configuring service'](export/pdf.md#server-side) 챕터 참고)
5. '_fullcolor_' - 뷰에 표시된 배경 및 텍스트 색상을 그대로 내보내기

예를 들어, 2012년 1월 1일부터 2012년 2월 1일까지 'week' 뷰 페이지를 내보내려면 다음과 같이 메서드를 호출할 수 있습니다.

~~~js
scheduler.toPDFRange(
    new Date(2012,0,1), 
    new Date(2012, 1,1),
    'week', 
    'generate.php', 
    'fullcolor'
);
~~~
