---
title: "Map View"
sidebar_label: "Map View"
---

# Map View 

Map View는 다가오는 이벤트 목록을 지도와 함께 표시하여 사용자가 이벤트의 위치를 확인하거나 수정하거나, 새로운 이벤트의 위치를 지정할 수 있도록 합니다.

![map_view](/img/map_view.png)


[Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/19_map_view.html)


:::note
기본적으로, 왼쪽의 이벤트 목록에는 현재 날짜부터 시작하는 이벤트가 표시됩니다. 이 동작을 조정하려면 [map_start](api/config/map_start.md) 및 [map_end](api/config/map_end.md) 속성을 사용하세요.
:::


## 초기화 {#initialization}

:::note
Google Maps를 사용하려면, 페이지에 [자신의 Google API 키를 추가](https://developers.google.com/maps/documentation/javascript/get-api-key)해야 합니다.
:::

Map View를 스케줄러에 추가하려면 아래 단계를 따라주세요:

1. 아래와 같이 페이지에 지도 공급자 코드 파일을 포함합니다:

~~~html
<-- Google Maps를 포함하려면 자신의 Google API 키를 사용하세요 -->
<script src="//maps.google.com/maps/api/js?key="[your" Google API key]&sensor="false"" 
    type="text/javascript"></script>
~~~

[지도 공급자를 변경하거나 설정을 조정](views/map.md#settingthemapprovider)할 수 있습니다. 변경 사항은 다음 지도 렌더링 시 적용됩니다.

2. **Map view** 플러그인을 활성화합니다:

~~~js
scheduler.plugins({
    map_view: true
});
~~~

3. 스케줄러 마크업에 뷰 탭을 추가합니다:

~~~html
<div id="scheduler_here" class="dhx_cal_container" ...>
    <div class="dhx_cal_navline">
       ...
       <div class="dhx_cal_tab" data-tab="map"></div>
    </div>
    ...    
</div>
~~~

4. 탭의 라벨을 설정합니다:

~~~js
//'map_tab'은 div 이름과 일치해야 합니다
scheduler.locale.labels.map_tab = "Map";
~~~

5. 이벤트 위치를 처리할 라이트박스 섹션을 추가합니다:

~~~js
scheduler.config.lightbox.sections="["
    {name:"description", height:50,map_to:"text", type:"textarea", focus:true},
    {name:"location", height:43, map_to:"event_location", type:"textarea"},
    {name:"time", height:72, type:"time", map_to:"auto"}    
]
~~~
  
6. 새 섹션의 라벨을 정의합니다:

~~~js
scheduler.locale.labels.section_location = "Location";
~~~

7. 스케줄러를 초기화합니다:

~~~js
//'map'은 Map View의 기본 이름입니다
scheduler.init('scheduler_here',new Date(2024,5,11),"map");
~~~
  

[Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/19_map_view.html)


## 지도 공급자 설정 {#settingthemapprovider}

dhtmlxScheduler는 Google Maps, OpenStreetMaps, Mapbox를 지도 공급자로 지원합니다.

지도 공급자를 설정하려면 다음 단계를 따르세요:

1. 예를 들어 Google Maps의 경우, 지도 라이브러리를 페이지에 포함합니다:

~~~html
<-- Google Maps를 포함하려면 자신의 Google API 키를 사용하세요 -->
<script src="//maps.google.com/maps/api/js?key="[your" Google API key]&sensor="false"" 
    type="text/javascript"></script>
~~~

2. 필요하다면 [map_settings](api/config/map_settings.md) 옵션을 사용하여 설정을 구성합니다. 예:

~~~js
scheduler.config.map_settings = {
    initial_position: {
       lat: 48.724,
       lng: 8.215
    }
}
...
scheduler.init('scheduler_here',new Date(2027,5,11),"map");
~~~
 
[자세한 내용 보기](views/map.md#maprelatedconfigurationoptions)

3. 다음 중 한 가지 방법으로 지도 공급자 이름을 지정합니다:

- [map_view_provider](api/config/map_view_provider.md) 옵션을 통해:

~~~js
scheduler.config.map_view_provider = "googleMap";
...
scheduler.init('scheduler_here',new Date(2027,5,11),"map");
~~~

사용 가능한 값: *"googleMap", "openStreetMaps", "mapbox"*.

- 또는 [map_settings](api/config/map_settings.md)의 **view_provider** 속성을 통해:

~~~js
scheduler.config.map_settings = {
    view_provider: "googleMap"
}
...
scheduler.init('scheduler_here',new Date(2027,5,11),"map");
~~~

## 지도 관련 구성 옵션 {#maprelatedconfigurationoptions}

### scheduler.config 객체

- [map_end](api/config/map_end.md) - 이벤트 표시 종료 날짜 지정
- [map_start](api/config/map_start.md) - 이벤트 표시 시작 날짜 지정


v7.1부터 대부분의 지도 구성 옵션은 [map_settings](api/config/map_settings.md) 속성 내에서 설정됩니다. 기본 설정은 다음과 같습니다:

~~~js
scheduler.config.map_settings = {
    initial_position: {
       lat: 48.724,
       lng: 8.215
    },
    error_position: {
       lat: 15,
       lng: 15
    },
    initial_zoom: 1,
    zoom_after_resolve: 15,
    info_window_max_width: 300,
    resolve_user_location: true,
    resolve_event_location: true,
    view_provider: "googleMap"
}
...
scheduler.init('scheduler_here',new Date(2027,5,11),"map");
~~~

이 속성들은 다음을 포함합니다:

- **initial_position** - 지도의 시작 위치
- **error_position** - 이벤트 위치를 찾을 수 없을 때 표시되는 위치
- **initial_zoom** - Map View의 초기 확대 수준
- **zoom_after_resolve** - 사용자의 위치를 표시할 때 사용하는 확대 수준 (권한 허용 시)
- **info_window_max_width** - Map View의 지도 팝업 최대 너비
- **resolve_user_location** - 사용자의 위치 공유 요청을 표시할지 여부
- **resolve_event_location** - 좌표가 저장되어 있지 않은 경우 이벤트 위치를 찾을지 여부
- **view_provider** - 지도 공급자 선택

토큰 등 사용자 정의 설정은 **map_settings** 내부에 추가할 수 있습니다. 예:

~~~js
scheduler.config.map_settings.accessToken = "pk.eyJ...";
~~~

### scheduler.xy 객체

[scheduler.xy.map_date_width](api/other/xy.md) - 날짜 열의 너비


[scheduler.xy.map_description_width](api/other/xy.md) - 설명 열의 너비

## 커스텀 지도 어댑터 만들기 {#creatingacustommapadapter}

내장 지도 공급자가 요구 사항을 충족하지 않는 경우, map adapter 인터페이스를 준수하는 클래스를 구현하여 커스텀 지도 어댑터를 만들 수 있습니다. 다음 메서드를 포함해야 합니다:

~~~js
interface IMapAdapter {
    // 제공된 옵션으로 지도 인스턴스 초기화
    initialize(container: HTMLElement, options: IMapSettings): void;
    
    // Map View에서 벗어날 때 지도 인스턴스 제거 및 리소스 해제
    destroy(container: HTMLElement): void;
    
    // 이벤트에 대한 마커 추가
    addEventMarker(event: ICalendarEvent): void;
    
    // 특정 eventId의 마커 제거
    removeEventMarker(eventId: string): void;
    
    // 이벤트의 마커 업데이트
    updateEventMarker(event: ICalendarEvent): void;
    
    // 모든 이벤트 마커 제거
    clearEventMarkers(): void;
    
    // 지정된 위치로 지도 중심 이동
    setView(latitude: number, longitude: number, zoom: number): void;
    
    // 스케줄러에서 이벤트 클릭 처리
    onEventClick(event: ICalendarEvent): void;
    
    // 문자열 주소를 좌표로 변환, {lat, lng}를 반환하는 Promise
    resolveAddress(address: string): Promise<IMapPosition>;
}
~~~

## 데이터 항목 요구 사항 {#requirementstodataitems}

Map View에서 올바르게 렌더링하려면 데이터 항목에 몇 가지 추가 속성이 필요합니다. 필수 속성은 다음과 같습니다:

- **start_date** (*Date* 또는 *string*) - 이벤트 시작 시각, 기본 형식 '%Y-%m-%d %H:%i'
- **end_date** (*Date* 또는 *string*) - 이벤트 종료 시각, 기본 형식 '%Y-%m-%d %H:%i'
- **text** (*string*) - 이벤트 설명
- **location** (*string*) - 이벤트 위치
- **lat** (*number*) - 이벤트 위치의 위도
- **lng** (*number*) - 이벤트 위치의 경도
  
:::note
.php 파일이 데이터베이스 데이터와 일치하는지 확인하세요.
:::

## 현지화 팁 {#localizationtips}

Map View에서는 로케일에서 네 가지 라벨을 사용합니다:

- **scheduler.locale.labels.(mapName)_tab** - 지도 탭 이름
- **scheduler.locale.labels.section_(sectionName)** - 라이트박스 섹션 라벨
- **scheduler.locale.labels.marker_geo_success** - 지오로케이션 성공 시 툴팁 텍스트
- **scheduler.locale.labels.marker_geo_fail** - 지오로케이션 실패 시 툴팁 텍스트

일반적으로, 처음 두 라벨은 뷰 탭을 추가할 때 설정하며, 마지막 두 라벨은 영어가 아닌 언어로 현지화할 때만 수정하면 됩니다.

## 마커 커스터마이징 {#customizingmarkers}

v7.0부터, Map View의 **`createMarker()`** 메서드를 오버라이드하여 마커 모양을 커스터마이즈할 수 있습니다:

~~~js
const { AdvancedMarkerElement, 
    PinElement } = await google.maps.importLibrary("marker");
scheduler.ext.mapView.createMarker = function(config){
    const pinViewGlyph = new PinElement({
        glyphColor: "white",
    });
    return new AdvancedMarkerElement({
        ...config,
        content: pinViewGlyph.element,
    });
};
~~~

자세한 내용은 [Google Maps documentation](
https://developers.google.com/maps/documentation/javascript/advanced-markers/basic-customization)에서 확인할 수 있습니다.

## GUI 세부사항 {#guidetails}

- 선택된 이벤트는 강조 표시됩니다. 이벤트가 여러 날에 걸쳐 있을 경우, 관련된 모든 항목이 강조 표시됩니다.
- 새 이벤트를 생성하려면 목록의 빈 셀이나 지도에서 빈 공간을 더블 클릭하세요.
- 이벤트를 수정하거나 삭제하려면, 이벤트 설명 왼쪽의 'details' 아이콘을 더블 클릭하세요.
- 이벤트를 보려면 지도에서 해당 마커를 클릭하세요.

## 관련 가이드

- ["일반 설정 안내"](guides/configuration.md)
- ["Map View 템플릿"](views/map-view-templates.md)
- ["데이터 불러오기"](guides/loading-data.md)
- ["스킨(Skins)"](guides/skins.md)
- ["Localization"](guides/localization.md)
