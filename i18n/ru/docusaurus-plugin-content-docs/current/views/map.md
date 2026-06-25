---
title: "Map View"
sidebar_label: "Map View"
---

# Map View 

Map View отображает список предстоящих событий рядом с картой, позволяя пользователям просматривать или редактировать местоположение события, а также задавать местоположение для новых событий.

![map_view](/img/map_view.png)


[Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/19_map_view.html)


:::note
По умолчанию список событий слева показывает события, начинающиеся с текущей даты. Чтобы изменить это поведение, используйте свойства [map_start](api/config/map_start.md) и [map_end](api/config/map_end.md).
:::


## Инициализация {#initialization}

:::note
Для использования Google Maps убедитесь, что вы [добавили свой собственный Google API ключ](https://developers.google.com/maps/documentation/javascript/get-api-key) на страницу.
:::

Чтобы добавить Map View в планировщик, выполните следующие шаги:

1. Подключите файл кода для провайдера карты на вашу страницу, как показано ниже:

~~~html
<-- используйте свой собственный Google API ключ для подключения Google Maps-->
<script src="//maps.google.com/maps/api/js?key="[your" Google API key]&sensor="false"" 
    type="text/javascript"></script>
~~~

Вы можете [сменить провайдера карты и настроить его параметры](views/map.md#settingthemapprovider) позже, если потребуется. Изменения применятся при следующем рендеринге карты.

2. Включите плагин **Map view**:

~~~js
scheduler.plugins({
    map_view: true
});
~~~

3. Добавьте вкладку представления в разметку планировщика:

~~~html
<div id="scheduler_here" class="dhx_cal_container" ...>
    <div class="dhx_cal_navline">
       ...
       <div class="dhx_cal_tab" data-tab="map"></div>
    </div>
    ...    
</div>
~~~

4. Установите название для вкладки:

~~~js
//'map_tab' соответствует нашему div
scheduler.locale.labels.map_tab = "Map";
~~~

5. Добавьте секцию в lightbox для ввода местоположения события:

~~~js
scheduler.config.lightbox.sections="["
    {name:"description", height:50,map_to:"text", type:"textarea", focus:true},
    {name:"location", height:43, map_to:"event_location", type:"textarea"},
    {name:"time", height:72, type:"time", map_to:"auto"}    
]
~~~
  
6. Задайте название для новой секции:

~~~js
scheduler.locale.labels.section_location = "Location";
~~~

7. Инициализируйте планировщик:

~~~js
//'map' — это стандартное имя для Map View
scheduler.init('scheduler_here',new Date(2027,5,11),"map");
~~~
  

[Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/19_map_view.html)


## Настройка провайдера карты {#settingthemapprovider}

dhtmlxScheduler поддерживает Google Maps, OpenStreetMaps и Mapbox как провайдеры карт.

Чтобы настроить провайдера карты, выполните следующие шаги:

1. Подключите библиотеку карты на вашу страницу, например, Google Maps:

~~~html
<-- используйте свой собственный Google API ключ для подключения Google Maps-->
<script src="//maps.google.com/maps/api/js?key="[your" Google API key]&sensor="false"" 
    type="text/javascript"></script>
~~~

2. При необходимости настройте параметры через опцию [map_settings](api/config/map_settings.md), например:

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
 
[Подробнее](views/map.md#map-related-configuration-options)

3. Укажите название провайдера карты одним из следующих способов:

- Через опцию [map_view_provider](api/config/map_view_provider.md):

~~~js
scheduler.config.map_view_provider = "googleMap";
...
scheduler.init('scheduler_here',new Date(2027,5,11),"map");
~~~

Доступные значения: *"googleMap", "openStreetMaps", "mapbox"*.

- Или через свойство **view_provider** в [map_settings](api/config/map_settings.md):

~~~js
scheduler.config.map_settings = {
    view_provider: "googleMap"
}
...
scheduler.init('scheduler_here',new Date(2027,5,11),"map");
~~~

## Параметры конфигурации для карты {#map-related-configuration-options}

### scheduler.config object

- [map_end](api/config/map_end.md) - устанавливает конечную дату отображения событий
- [map_start](api/config/map_start.md) - устанавливает начальную дату отображения событий


Начиная с v7.1, большинство параметров карты настраиваются через свойство [map_settings](api/config/map_settings.md). Значения по умолчанию:

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

Эти свойства включают:

- **initial_position** - начальное положение карты
- **error_position** - положение, отображаемое если местоположение события не определено
- **initial_zoom** - уровень масштабирования при открытии Map View
- **zoom_after_resolve** - уровень масштабирования при отображении местоположения пользователя (если разрешено)
- **info_window_max_width** - максимальная ширина тултипа на карте
- **resolve_user_location** - включает запрос на определение местоположения пользователя
- **resolve_event_location** - включает попытки определить местоположение события, если координаты не сохранены
- **view_provider** - выбор провайдера карты

Пользовательские параметры, такие как токены, можно добавить в **map_settings**, например:

~~~js
scheduler.config.map_settings.accessToken = "pk.eyJ...";
~~~

### scheduler.xy object

[scheduler.xy.map_date_width](api/other/xy.md) - ширина колонки даты


[scheduler.xy.map_description_width](api/other/xy.md) - ширина колонки описания

## Создание собственного адаптера карты {#creating-a-custom-map-adapter}

Если встроенные провайдеры карт не подходят под ваши задачи, вы можете создать собственный адаптер карты, реализовав класс согласно интерфейсу адаптера карты. Он должен содержать следующие методы:

~~~js
interface IMapAdapter {
    // инициализация экземпляра карты с переданными опциями
    initialize(container: HTMLElement, options: IMapSettings): void;
    
    // удаление экземпляра карты при переключении с Map View, освобождение ресурсов
    destroy(container: HTMLElement): void;
    
    // добавление маркера события на карту
    addEventMarker(event: ICalendarEvent): void;
    
    // удаление маркера по eventId
    removeEventMarker(eventId: string): void;
    
    // обновление маркера события
    updateEventMarker(event: ICalendarEvent): void;
    
    // удаление всех маркеров событий с карты
    clearEventMarkers(): void;
    
    // установка центра карты в заданную точку
    setView(latitude: number, longitude: number, zoom: number): void;
    
    // обработка клика по событию в планировщике
    onEventClick(event: ICalendarEvent): void;
    
    // преобразование строкового адреса в координаты, возвращает Promise с {lat, lng}
    resolveAddress(address: string): Promise<IMapPosition>;
}
~~~

## Требования к данным {#requirements-to-data-items}

Для корректного отображения в Map View элементы данных должны содержать несколько дополнительных свойств. Обязательные свойства:

- **start_date** (*Date* или *string*) - дата и время начала события, формат по умолчанию '%Y-%m-%d %H:%i'.
- **end_date** (*Date* или *string*) - дата и время окончания события, формат по умолчанию '%Y-%m-%d %H:%i'.
- **text** (*string*) - описание события.
- **location** (*string*) - местоположение события.
- **lat** (*number*) - широта местоположения события.
- **lng** (*number*) - долгота местоположения события.
  
:::note
Убедитесь, что ваш .php-файл соответствует данным в базе данных.
:::

## Советы по локализации {#localizationtips}

Map View использует четыре подписи в локали:

- **scheduler.locale.labels.(mapName)_tab** - название вкладки карты
- **scheduler.locale.labels.section_(sectionName)** - подпись для секции lightbox
- **scheduler.locale.labels.marker_geo_success** - тултип при успешном определении геолокации
- **scheduler.locale.labels.marker_geo_fail** - тултип при ошибке геолокации

Обычно первые две подписи задаются при добавлении вкладки, последние две рекомендуется менять только при локализации на язык, отличный от английского.

## Кастомизация маркеров {#customizingmarkers}

Начиная с v7.0, вы можете настраивать форму маркеров, переопределяя метод **`createMarker()`** Map View:

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

Подробнее смотрите в [документации Google Maps](
https://developers.google.com/maps/documentation/javascript/advanced-markers/basic-customization).

## Особенности интерфейса {#guidetails}

- Выделенные события подсвечиваются. Если событие длится несколько дней, подсвечиваются все связанные записи.
- Чтобы создать новое событие, дважды кликните по пустой ячейке списка или по месту на карте.
- Для редактирования или удаления события дважды кликните на иконку 'details' слева от описания события.
- Для просмотра события кликните на его маркер на карте.

## Связанные руководства

- [Общие инструкции по настройке](guides/configuration.md)
- [Шаблоны Map View](views/map-view-templates.md)
- [Загрузка данных](guides/loading-data.md)
- [Скины](guides/skins.md)
- [Локализация](guides/localization.md)
