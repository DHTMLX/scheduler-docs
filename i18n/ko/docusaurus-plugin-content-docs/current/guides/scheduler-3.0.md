---
title: "스케줄러 3.0으로의 마이그레이션"
sidebar_label: "스케줄러 3.0으로의 마이그레이션"
---

# 스케줄러 3.0으로의 마이그레이션 

:::note
현재 스케줄러 버전을 계속 사용하려면 별도의 변경이 필요하지 않습니다. 아래에 표시된 모든 코드는 scheduler 2.3에서 동작하지만, scheduler 3.0에서는 지원이 중단될 예정입니다.
:::

이전에는 접근 가능했던 일부 내부 메서드는 scheduler 3.0에서 더 이상 사용할 수 없습니다.


### 라이트박스 재설정

~~~js 
    scheduler._lightbox = null;

~~~

->

~~~js 
    //2.3+
    scheduler.resetLightbox();

~~~


### 현재 상태 확인

~~~js 
    scheduler._date
    scheduler._mode
    scheduler._min_date
    scheduler._max_date
    scheduler._editor_id
    scheduler._lightbox_id

~~~

->

~~~js 
    //2.3+
    scheduler.getState().date
    scheduler.getState().mode
    scheduler.getState().min_date
    scheduler.getState().max_date
    scheduler.getState().editor_id
    scheduler.getState().lightbox_id

~~~
