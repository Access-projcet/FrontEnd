import React, { useEffect, useState } from "react";
import Link from "react-router-dom";
import { getMap } from "../../api/api";
import { useQuery } from "react-query";
import styled from "styled-components";
import "./MapContainer2.css";
import ConfirmForm from "../../pages/ConfirmForm";
import ReactDOM from "react-dom";

const { kakao } = window;
const MapContainer4 = () => {
  const [modalOn, setModalOn] = useState(false);
  const { data } = useQuery("map", getMap);
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);

  //modal 창

  useEffect(() => {
    if (data) {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new kakao.maps.LatLng(37.50073199, 127.03675448),
        level: 3,
      };
      const newMap = new kakao.maps.Map(mapContainer, mapOption);
      setMap(newMap);
      const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png";
      const imageSize = new kakao.maps.Size(35, 40);
      const imageOption = {
        offset: new kakao.maps.Point(20, 40),
      };
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

      let positions = [];
      if (data.data) {
        positions = data.data.map((e) => ({
          latlng: new kakao.maps.LatLng(e.x, e.y),
          id: e.id,
          companyName: e.companyName,
        }));
      }

      const mapMarkers = positions.map((position) => {
        const marker = new kakao.maps.Marker({
          map: newMap,
          position: position.latlng,
          image: markerImage,
          id: position.id,
        });

        const content = (
          <div className="wrap">
            <div className="info">
              <div className="title">
                {position.companyName}
                <div className="close" onClick={closeOverlay()} title="닫기"></div>
              </div>
              <div className="body">
                <div className="img">
                  <img src="https://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70" />
                </div>
                <div className="desc">
                  <div className="ellipsis">제주특별자치도 제주시 첨단로 242</div>
                  <div className="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>
                  <ConfirmForm onClose={closeOverlay()}>신청하기</ConfirmForm>
                </div>
              </div>
            </div>
          </div>
        );

        const customOverlay = new kakao.maps.CustomOverlay({
          content: content,
          map: null,
          position: marker.getPosition(),
          yAnchor: 2.5,
        });

        function closeOverlay() {
          customOverlay.setMap(null);
        }

        kakao.maps.event.addListener(marker, "click", function () {
          customOverlay.setMap(newMap);
        });

        return marker;
      });

      setMarkers(mapMarkers);
    }
  }, [data]);
  const handleModal = () => {
    setModalOn(!modalOn);
  };
  return (
    <div style={{ display: "flex" }}>
      <div id="map" style={{ width: "70%", height: "500px" }}></div>
      <div style={{ width: "30%", padding: "10px" }}>
        <h2>회사 리스트</h2>
        <ul style={{ width: "300px" }}>
          {data &&
            data.data.map((company) => (
              <li key={company.id}>
                <a href={`#${company.id}`}>{company.companyName}</a>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default MapContainer4;
