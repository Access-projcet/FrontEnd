import React, { useEffect, useRef, useState } from "react";
import Link from "react-router-dom";
import { getMap } from "../../api/api";
import { useQuery } from "react-query";
import styled from "styled-components";
import ReactDOMServer from "react-dom/server";

import "./MapContainer2.css";
import ConfirmForm from "../../pages/ConfirmForm";

const { kakao } = window;
const MapContainer4 = () => {
  const [modalOn, setModalOn] = useState(false);
  const { data } = useQuery("map", getMap);
  const [map, setMap] = useState(null);

  const [markers, setMarkers] = useState([]);
  const [overlays, setOverlays] = useState([]); // CustomOverlay 객체를 참조합니다.
  const customOverlayRef = useRef(null);

  //modal 창
  const handleModal = () => {
    setModalOn(!modalOn);
  };

  useEffect(() => {
    if (data) {
      const mapContainer = document.getElementById("map");

      const mapOption = {
        center: new kakao.maps.LatLng(37.50073199, 127.03675448),
        level: 3,
      };
      const newMap = new kakao.maps.Map(mapContainer, mapOption);
      setMap(newMap);
      const imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png";
      const imageSize = new kakao.maps.Size(35, 40);
      const imageOption = {
        offset: new kakao.maps.Point(20, 40),
      };
      const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      let positions = [];
      if (data.data) {
        positions = data.data.map((e) => ({
          latlng: new kakao.maps.LatLng(e.x, e.y),
          id: e.id,
          companyName: e.companyName,
        }));
      }

      // Marker 객체를 생성하고 지도에 추가합니다.
      const markers = positions.map((position) => {
        console.log(position);
        const marker = new kakao.maps.Marker({
          map: newMap,
          position: position.latlng,
          image: markerImage,
          id: position.id,
        });
        return marker;
      });
      setMarkers(markers);

      // CustomOverlay 객체를 생성하고 지도에 추가합니다.
      const overlays = positions.map((position) => {
        const content =
          '<div class="wrap">' +
          '    <div class="info">' +
          '        <div class="title">' +
          `${position.companyName}` +
          `            <div class="close" onclick="closeOverlay()" title="닫기"></div>` +
          "        </div>" +
          '        <div class="body">' +
          '            <div class="desc">' +
          "                {modalOn && <ConfirmForm onClose={handleModal}>신청하기</ConfirmForm>}" +
          "            </div>" +
          "        </div>" +
          "    </div>" +
          "</div>";

        const customOverlay = new kakao.maps.CustomOverlay({
          // content: ReactDOMServer.renderToString(

          content: content,
          map: null,
          position: position.latlng,
        });

        // console.log(customOverlay.getContent().querySelector(".close"));

        kakao.maps.event.addListener(map, "click", function () {
          customOverlay.setMap(null);
        });

        return customOverlay;
      });
      setOverlays(overlays);

      markers.forEach((marker, index) => {
        console.log("asdfwefaweafsf11111111111");
        kakao.maps.event.addListener(marker, "click", () => {
          console.log("click", index);
          overlays[index].setMap(newMap);
          // 마커를 클릭했을 때 실행될 코드를 작성합니다.
        });
      });

      overlays.forEach((overlay, index) => {
        console.log("asdfwefaweafsf");
        kakao.maps.event.addListener(overlay, "click", () => {
          console.log("click", index);
          overlays[index].setMap(null);
          // 마커를 클릭했을 때 실행될 코드를 작성합니다.
        });
      });

      // const mapMarkers = positions.map((position) => {
      //   const marker = new kakao.maps.Marker({
      //     map: newMap,
      //     position: position.latlng,
      //     image: markerImage,
      //     id: position.id,
      //   });
      //   const content =
      //     '<div class="wrap">' +
      //     '    <div class="info">' +
      //     '        <div class="title">' +
      //     `${position.companyName}` +
      //     `            <div class="close" onclick="${closeOverlay}" title="닫기"></div>` +
      //     "        </div>" +
      //     '        <div class="body">' +
      //     '            <div class="desc">' +
      //     "                {modalOn && <ConfirmForm onClose={handleModal}>신청하기</ConfirmForm>}" +
      //     "            </div>" +
      //     "        </div>" +
      //     "    </div>" +
      //     "</div>";

      //   const customOverlay = new kakao.maps.CustomOverlay({
      //     content: content,
      //     map: null, //newMap
      //     position: marker.getPosition(),
      //   });

      //   // const customOverlay = new kakao.maps.CustomOverlay({
      //   //   map: newMap,
      //   //   position: position.latlng,
      //   //   content: `<Modal open={modalOpen} close={closeModal} header="Modal heading"><div>${position.companyName}</div></Modal>`,
      //   //   yAnchor: 2.5,
      //   // });
      //   kakao.maps.event.addListener(marker, "click", function () {
      //     customOverlay.setMap(newMap);
      //   });
      //   function closeOverlay() {
      //     console.log("closeOverlay");
      //     customOverlay.setMap(null);
      //   }

      //   // const closeBtn = customOverlay.getContent().querySelector(".close");
      //   // kakao.maps.event.addListener(closeBtn, "click", function () {
      //   //   customOverlay.setMap(null);
      //   // });
      //   return marker;
      // });
      // setMarkers(mapMarkers);
    }
  }, [data]);

  // function handleClick(marker) {
  //   // 마커를 클릭했을 때, 해당 마커에 대응하는 CustomOverlay를 표시합니다.
  //   const overlay = overlays.find(
  //     (overlay) => overlay.getPosition() === marker.getPosition()
  //   );
  //   overlay.setMap(map);
  // }

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

// const StCustomOverLay = styled.div`
//   background-color: white;
//   font-size: 30px;
//   font-weight: 900;
// `;
const StCustomOverLay = styled.div`
  button.close {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;

// (
//   <div className="wrap">
//     <div className="info">
//       <div className="title">
//         {position.companyName}
//         <button className="close" title="닫기">
//           닫기
//         </button>
//       </div>
//       <div className="body">
//         <div className="desc">
//           {modalOn && (
//             <ConfirmForm onClose={handleModal}>신청하기</ConfirmForm>
//           )}
//         </div>
//       </div>
//     </div>
//   </div>
// );
