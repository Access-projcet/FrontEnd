import React, { useEffect, useState } from "react";
import { Map, CustomOverlayMap, MapMarker } from "react-kakao-maps-sdk";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMap } from "../../api/api";
import ConfirmForm from "../../pages/ConfirmForm";
import CreateForm from "../modal/CreateForm";
import Modal from "../modal/Modal";

const { kakao } = window;
export default function MapContainer5() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const { data } = useQuery("map", getMap);

  console.log(data);

  useEffect(() => {
    if (data) {
      data.data.map((e) =>
        setMarkers((prev) => [
          ...prev,
          {
            lat: e.x,
            lng: e.y,
            id: e.id,
            companyName: e.companyName,
          },
        ]),
      );
    }
  }, [data]);

  const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png";
  const imageSize = new kakao.maps.Size(35, 40);
  const imageOption = {
    offset: new kakao.maps.Point(20, 40),
  };
  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  console.log(markers);

  const HandlerModalOn = () => {
    setIsModalOpen(true);
  };

  return (
    <DivMap>
      <DivCompanyList>여기는 리스트</DivCompanyList>
      <DivMapContainer>
        <Map // 지도를 표시할 Container
          id={`map`}
          center={{
            // 지도의 중심좌표
            lat: 37.50073199,
            lng: 127.03675448,
          }}
          style={{
            // 지도의 크기
            width: "100%",
            height: "100%",
          }}
          level={3} // 지도의 확대 레벨
        >
          {markers?.map((marker, index) => (
            <MapMarker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => handleMarkerClick(marker)}
              image={{
                src: imageSrc,
                size: imageSize,
                option: imageOption,
              }}
            />
          ))}
          {selectedMarker && (
            <CustomOverlayMap position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}>
              <div className="wrap">
                <div className="info">
                  <div className="title">
                    {selectedMarker.companyName}
                    <div className="close" onClick={() => setSelectedMarker(null)} title="닫기"></div>
                  </div>
                  <div className="body">
                    <div className="desc">
                      <div className="ellipsis">이클1</div>
                      <div className="jibun ellipsis">이클2</div>
                      <button onClick={HandlerModalOn}>모달 on</button>
                    </div>
                  </div>
                </div>
              </div>
              ;
            </CustomOverlayMap>
          )}
        </Map>
      </DivMapContainer>

      {isModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
          }}
          children={<ConfirmForm />}
        />
      )}
    </DivMap>
  );
}

const DivMap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  background-color: #f8f8f8;
`;
const DivMapContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
const DivCompanyList = styled.div`
  margin-left: 360px;
  width: 480px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
