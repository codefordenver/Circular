$(document).ready(function(){
  initMap();
})

function initMap(){
  handler = Gmaps.build('Google');
  handler.buildMap({ provider: {
  }, internal: {id: 'map'}}, function(){
    markers = handler.addMarkers([
      {
        "lat": 39.7392,
        "lng": -104.9903,
        "picture": {
          "url": "",
          "width":  32,
          "height": 32
        },
        "infowindow": "hello!"
      }
    ]);
    handler.bounds.extendWith(markers);
    handler.fitMapToBounds();
    handler.getMap().setZoom(10);
  });
}
