import React from "react";
const { kakao } = window;
const MapContainer4 = () => {
  var mapContainer = document.getElementById("map"),
    mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

  var map = new kakao.maps.Map(mapContainer, mapOption);

  var positions = [
    {
      content: "<div>place1</div>",
      latlng: new kakao.maps.LatLng(33.450705, 126.570677),
    },
    {
      content: "<div>place2</div>",
      latlng: new kakao.maps.LatLng(33.450936, 126.569477),
    },
    {
      content: "<div>place3</div>",
      latlng: new kakao.maps.LatLng(33.450879, 126.56994),
    },
    {
      content: "<div>place4</div>",
      latlng: new kakao.maps.LatLng(33.451393, 126.570738),
    },
  ];

  for (var i = 0; i < positions.length; i++) {
    var marker = new kakao.maps.Marker({
      map: map,
      position: positions[i].latlng, // 마커의 위치
    });

    var infowindow = new kakao.maps.InfoWindow({
      content: positions[i].content,
    });

    kakao.maps.event.addListener(marker, "mouseover", makeOverListener(map, marker, infowindow));
    kakao.maps.event.addListener(marker, "mouseout", makeOutListener(infowindow));
  }

  function makeOverListener(map, marker, infowindow) {
    return function () {
      infowindow.open(map, marker);
    };
  }

  function makeOutListener(infowindow) {
    return function () {
      infowindow.close();
    };
  }
  return <div id="map" style="width:100%;height:500px;"></div>;
};

export default MapContainer4;
