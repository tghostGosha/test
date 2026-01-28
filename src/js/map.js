export function initMap() {
  if (typeof ymaps3 === 'undefined') {
    console.error('ymaps3 не определён — API не загрузился');
    return;
  }

  ymaps3.ready
    .then(async () => {
      const {
        YMap,
        YMapDefaultSchemeLayer,
        YMapDefaultFeaturesLayer,
        YMapMarker,
      } = ymaps3;

      const mapContainer = document.getElementById('ymap');
      if (!mapContainer) {
        console.error('Элемент #ymap не найден');
        return;
      }

      const map = new YMap(mapContainer, {
        location: {
          center: [37.71765, 55.7148],
          zoom: 16,
        },
        theme: 'dark',
        behaviors: ['drag', 'dblClickZoom', 'multiTouch', 'pinchZoom'], 
      });

      map.addChild(new YMapDefaultSchemeLayer());
      map.addChild(new YMapDefaultFeaturesLayer());

      // Маркер
      const markerElement = document.createElement('img');
      markerElement.src = '/src/assets/svg/pin.svg';
      markerElement.style.width = '54px';
      markerElement.style.height = '80px';
      markerElement.style.transform = 'translate(-50%, -100%)';
      markerElement.style.cursor = 'pointer';
      markerElement.style.position = 'absolute';

      const marker = new YMapMarker(
        { coordinates: [37.71765, 55.7148] },
        markerElement
      );

      map.addChild(marker);

    })
    .catch((err) => console.error('Ошибка инициализации карты:', err));
}