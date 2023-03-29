import React from "react";
import Link from "react-router-dom";
import { getMap } from "../../apis/api";
import { useQuery, useMutation, useQueryClient } from "react-query";

const { kakao } = window;
const MapContainer4 = () => {
  const { data } = useQuery("map", getMap);

  window.onload = function () {
    var mapContainer = document.getElementById("map"),
      mapOption = {
        center: new kakao.maps.LatLng(37.50073199, 127.03675448),
        level: 3,
      };

    var map = new kakao.maps.Map(mapContainer, mapOption);
    const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png"; // 마커이미지의 주소입니다
    const imageSize = new kakao.maps.Size(35, 40); // 마커이미지의 크기입니다
    const imageOption = { offset: new kakao.maps.Point(20, 40) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
    var positions = [
      {
        content: `<div class="customoverlay">
        <Link to='/guest/confirmform'>
            <span class="title">GS리테일</span>
        <Link /> 
        </div>`,
        latlng: new kakao.maps.LatLng(37.50192113, 127.03736576),
      },
      {
        content: "<div>한국은행</div>",
        latlng: new kakao.maps.LatLng(37.50062343, 127.03813413),
      },
      {
        content: "<div>스파르타</div>",
        latlng: new kakao.maps.LatLng(37.4985517, 127.0364594),
      },
    ];

    for (var i = 0; i < positions.length; i++) {
      var marker = new kakao.maps.Marker({
        map: map,
        position: positions[i].latlng, // 마커의 위치
        image: markerImage,
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

    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      console.log("지도에서 클릭한 위치의 좌표는 " + mouseEvent.latLng.toString() + " 입니다.");
    });

    function makeOutListener(infowindow) {
      return function () {
        infowindow.close();
      };
    }
  };
  return (
    <>
      <div id="map" style={{ width: "100%", height: "1000px" }}></div>
      {/* <div>{data.map((e) => e)}</div> */}
    </>
  );
};

export default MapContainer4;
