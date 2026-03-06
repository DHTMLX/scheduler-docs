---
title: "地图视图"
sidebar_label: "地图视图"
---

# 地图视图

地图视图会在地图旁显示即将到来的事件列表，用户可以查看或编辑事件的位置，也可以为新事件设置位置。

![map_view](/img/map_view.png)


[Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/19_map_view.html)


:::note
默认情况下，左侧的事件列表会显示从当前日期开始的事件。要调整此行为，请使用 [map_start](api/config/map_start.md) 和 [map_end](api/config/map_end.md) 属性。
:::

## 初始化 {#initialization}

:::note
要使用 Google Maps，请确保在页面上[添加您自己的 Google API 密钥](https://developers.google.com/maps/documentation/javascript/get-api-key)。
:::

要将地图视图添加到调度器，请按照以下步骤操作:

1. 如下所示，在页面上引入地图提供商的代码文件:

~~~html
<!-- 使用您自己的 Google API 密钥引入 Google Maps -->
<script src="//maps.google.com/maps/api/js?key="[your" Google API key]&sensor="false"" 
    type="text/javascript"></script>
~~~

您可以在之后[切换地图提供商并调整其设置](views/map.md#settingthemapprovider)。更改将在下一次地图渲染时生效。

2. 启用 **Map view** 插件:

~~~js
scheduler.plugins({
    map_view: true
});
~~~

3. 在调度器的标记中添加视图的标签页:

~~~html
<div id="scheduler_here" class="dhx_cal_container" ...>
    <div class="dhx_cal_navline">
       ...
       <div class="dhx_cal_tab" data-tab="map"></div>
    </div>
    ...    
</div>
~~~

4. 设置标签的文本:

~~~js
//'map_tab' 对应我们的 div 名称
scheduler.locale.labels.map_tab = "Map";
~~~

5. 在 lightbox 中添加处理事件位置的部分:

~~~js
scheduler.config.lightbox.sections="["
    {name:"description", height:50,map_to:"text", type:"textarea", focus:true},
    {name:"location", height:43, map_to:"event_location", type:"textarea"},
    {name:"time", height:72, type:"time", map_to:"auto"}    
]
~~~
  
6. 为新部分定义标签:

~~~js
scheduler.locale.labels.section_location = "Location";
~~~

7. 初始化调度器:

~~~js
//'map' 是地图视图的默认名称
scheduler.init('scheduler_here',new Date(2024,5,11),"map");
~~~
  

[Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/19_map_view.html)


## 设置地图提供商 {#settingthemapprovider}

dhtmlxScheduler 支持 Google Maps、OpenStreetMaps 和 Mapbox 作为地图提供商。

要设置地图提供商，请执行以下步骤:

1. 在页面上引入地图库，例如 Google Maps:

~~~html
<!-- 使用您自己的 Google API 密钥引入 Google Maps -->
<script src="//maps.google.com/maps/api/js?key="[your" Google API key]&sensor="false"" 
    type="text/javascript"></script>
~~~

2. 如有需要，使用 [map_settings](api/config/map_settings.md) 选项配置设置，例如:

~~~js
scheduler.config.map_settings = {
    initial_position: {
       lat: 48.724,
       lng: 8.215
    }
}
...
scheduler.init('scheduler_here',new Date(2024,5,11),"map");
~~~
 
[查看更多详情](views/map.md#maprelatedconfigurationoptions)

3. 通过以下方式之一指定地图提供商名称:

- 通过 [map_view_provider](api/config/map_view_provider.md) 选项:

~~~js
scheduler.config.map_view_provider = "googleMap";
...
scheduler.init('scheduler_here',new Date(2024,5,11),"map");
~~~

可用值有:*"googleMap", "openStreetMaps", "mapbox"*。

- 或通过 [map_settings](api/config/map_settings.md) 中的 **view_provider** 属性:

~~~js
scheduler.config.map_settings = {
    view_provider: "googleMap"
}
...
scheduler.init('scheduler_here',new Date(2024,5,11),"map");
~~~

## 与地图相关的配置选项 {#maprelatedconfigurationoptions}

### scheduler.config 对象

- [map_end](api/config/map_end.md) - 设置显示事件的结束日期
- [map_start](api/config/map_start.md) - 设置显示事件的开始日期


从 v7.1 开始，大多数地图配置选项通过 [map_settings](api/config/map_settings.md) 属性设置。默认设置如下:

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
scheduler.init('scheduler_here',new Date(2024,5,11),"map");
~~~

这些属性包括:

- **initial_position** - 地图的起始位置
- **error_position** - 当无法确定事件位置时显示的位置
- **initial_zoom** - 地图视图的初始缩放级别
- **zoom_after_resolve** - 显示用户位置时的缩放级别（如果已授权）
- **info_window_max_width** - 地图弹窗的最大宽度
- **resolve_user_location** - 控制是否提示用户分享其位置
- **resolve_event_location** - 如果未存储坐标，是否尝试确定事件位置
- **view_provider** - 选择地图提供商

如需添加自定义设置（如 token），可在 **map_settings** 内添加，例如:

~~~js
scheduler.config.map_settings.accessToken = "pk.eyJ...";
~~~

### scheduler.xy 对象

[scheduler.xy.map_date_width](api/other/xy.md) - 日期列宽度


[scheduler.xy.map_description_width](api/other/xy.md) - 描述列宽度

## 创建自定义地图适配器 {#creatingacustommapadapter}

如果内置地图提供商无法满足需求，可以通过实现符合地图适配器接口的类来创建自定义地图适配器。应包含以下方法:

~~~js
interface IMapAdapter {
    // 使用提供的选项初始化地图实例
    initialize(container: HTMLElement, options: IMapSettings): void;
    
    // 切换出地图视图时移除地图实例，释放资源
    destroy(container: HTMLElement): void;
    
    // 在地图上为事件添加标记
    addEventMarker(event: ICalendarEvent): void;
    
    // 移除指定 eventId 的标记
    removeEventMarker(eventId: string): void;
    
    // 更新事件的标记
    updateEventMarker(event: ICalendarEvent): void;
    
    // 清除地图上的所有事件标记
    clearEventMarkers(): void;
    
    // 将地图中心定位到指定位置
    setView(latitude: number, longitude: number, zoom: number): void;
    
    // 处理调度器中事件的点击
    onEventClick(event: ICalendarEvent): void;
    
    // 将字符串地址解析为坐标，返回 Promise，内容为 {lat, lng}
    resolveAddress(address: string): Promise<IMapPosition>;
}
~~~

## 数据项要求 {#requirementstodataitems}

要在地图视图中正确渲染，数据项需要包含若干额外属性。必需属性包括:

- **start_date** (*Date* 或 *string*) - 事件开始时间，默认格式 '%Y-%m-%d %H:%i'
- **end_date** (*Date* 或 *string*) - 事件结束时间，默认格式 '%Y-%m-%d %H:%i'
- **text** (*string*) - 事件描述
- **location** (*string*) - 事件位置
- **lat** (*number*) - 事件位置的纬度
- **lng** (*number*) - 事件位置的经度
  
:::note
请确保您的 .php 文件与数据库数据一致。
:::

## 本地化提示 {#localizationtips}

地图视图在本地化中使用四个标签:

- **scheduler.locale.labels.(mapName)_tab** - 地图标签页名称
- **scheduler.locale.labels.section_(sectionName)** - lightbox 部分标签
- **scheduler.locale.labels.marker_geo_success** - 地理定位成功时的提示文本
- **scheduler.locale.labels.marker_geo_fail** - 地理定位失败时的提示文本

通常，前两个标签在添加视图标签页时设置，后两个标签仅在本地化为非英文时需要自定义。

## 自定义标记 {#customizingmarkers}

从 v7.0 起，可以通过重写 Map View 的 **`createMarker()`** 方法自定义标记形状:

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

更多详情可参阅 [Google Maps documentation](
https://developers.google.com/maps/documentation/javascript/advanced-markers/basic-customization)。

## 界面细节 {#guidetails}

- 选中的事件会高亮显示。如果事件跨多天，所有相关条目都会高亮。
- 要创建新事件，请双击列表中的空单元格或地图上的空白区域。
- 要编辑或删除事件，请双击事件描述左侧的"详情"图标。
- 要查看事件，请点击地图上的事件标记。

## 相关指南

- [일반 설정 안내](guides/configuration.md)
- [Map View 템플릿](views/map-view-templates.md)
- [데이터 불러오기](guides/loading-data.md)
- [스킨(Skins)](guides/skins.md)
- [Localization](guides/localization.md)
