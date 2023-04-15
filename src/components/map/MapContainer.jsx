import React, { useEffect, useState } from "react";
import { Map, CustomOverlayMap, MapMarker } from "react-kakao-maps-sdk";
import { useQuery } from "react-query";
import styled from "styled-components";

import { getMap } from "../../api/api";
import ConfirmForm from "../../pages/ConfirmForm";
import MarkerModal from "../modal/MarkerModal";
import markon from "../../utils/img/즐겨찾기_on_icon.png";
import markoff from "../../utils/img/즐겨찾기_off_icon.png";
import search from "../../utils/img/_search_icon.png";
import CloseIcon from "@mui/icons-material/Close";
import markerIcon from "../../utils/img/즐겨찾기_on_icon@3x.png";

const { kakao } = window;
export default function MapContainer5() {
  //filter 기능
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [target, setTarget] = useState("");
  const [company, setCompany] = useState({});

  const [mapstate, setMapstate] = useState({
    // 지도의 중심좌표
    center: { lat: 37.50073199, lng: 127.03675448 },
    isPanto: false,
  });

  const HandlerTargetChange = (e) => {
    setTarget(e.target.value);
  };

  const { data } = useQuery("map", getMap, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  //filter List
  const [searchResults, setSearchResults] = useState(null);
  const handleSearch = async () => {
    if (!data) {
      return;
    }
    const filteredResults = data.data.filter((e) => {
      const companyName = (e.companyName || "").toLowerCase(); // 검색어와 항목의 값을 모두 소문자로 변환
      const companyAddress = (e.companyAddress || "").toLowerCase();
      const companyPhoneNum = (e.companyPhoneNum || "").toLowerCase();
      const targetLowerCase = target.toLowerCase(); // 검색어도 소문자로 변환
      return (
        companyName.includes(targetLowerCase) ||
        companyAddress.includes(targetLowerCase) ||
        companyPhoneNum.includes(targetLowerCase)
      );
    });
    setSearchResults(filteredResults);
  };
  ///

  useEffect(() => {
    if (data) {
      setSearchResults(data.data);
      setMarkers(
        data.data.map((e) => ({
          lat: e.x,
          lng: e.y,
          id: e.id,
          companyName: e.companyName,
          companyAddress: e.companyAddress,
          companyPhoneNum: e.companyPhoneNum,
        })),
      );
    }
  }, [data]);

  useEffect(() => {
    let newVisibleMarkers = [];

    if (searchResults) {
      newVisibleMarkers = markers.filter((marker) => {
        return searchResults.some((result) => result.id === marker.id);
      });
    } else {
      newVisibleMarkers = markers;
    }

    setFilteredMarkers(newVisibleMarkers);
  }, [searchResults, markers]);

  const imageSrc = markerIcon;
  const imageSize = new kakao.maps.Size(25, 32);
  const imageOption = {
    offset: new kakao.maps.Point(20, 40),
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const HandlerModalOn = (e) => {
    setCompany(e);
    setIsModalOpen(true);
  };

  const HandlerFocusMap = (e) => {
    console.log("focus", e);
    setMapstate({
      center: { lat: e.x, lng: e.y },
      isPanto: true,
    });
  };

  return (
    <DivMap>
      <DivTemp />
      <DivCompanyList>
        <DivInput>
          <InputText
            value={target}
            onChange={HandlerTargetChange}
            onKeyDown={(e) => e.keyCode === 13 && handleSearch()}
            placeholder="검색어를 입력하세요."
          />
          <StImgSearch src={search} alt="" onClick={handleSearch} />
        </DivInput>

        {searchResults?.map((e) => (
          <DivListBox onClick={() => HandlerFocusMap(e)}>
            <DivListContent key={e.id}>
              <DivCompanyName>
                <StImg src={markon} alt={markoff} />
                {e.companyName}
              </DivCompanyName>
              <DivCompanycontent>{e.companyAddress}</DivCompanycontent>
              <DivCompanycontent>Tel : {e.companyCallNum}</DivCompanycontent>
            </DivListContent>
            <StBtnDiv>
              <ButtonVisitForm onClick={() => HandlerModalOn(e)}>방문 신청</ButtonVisitForm>
            </StBtnDiv>
          </DivListBox>
        ))}
      </DivCompanyList>
      <DivMapContainer>
        <Map // 지도를 표시할 Container
          id={`map`}
          center={mapstate.center}
          isPanto={mapstate.isPanto}
          // center={{
          //   // 지도의 중심좌표
          //   lat: 37.50073199,
          //   lng: 127.03675448,
          // }}
          style={{
            // 지도의 크기
            width: "100%",
            height: "100%",
          }}
          level={3} // 지도의 확대 레벨
        >
          {filteredMarkers?.map((marker, index) => (
            <>
              <MapMarker
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => handleMarkerClick(marker)}
                image={{
                  src: imageSrc,
                  size: imageSize,
                  option: imageOption,
                }}
              ></MapMarker>
              <CustomOverlayMap position={{ lat: marker.lat, lng: marker.lng }} yAnchor={2.0}>
                <div className="customoverlay" style={customOverlayStyle} onClick={() => handleMarkerClick(marker)}>
                  <StOverlaySpan className="title">{marker.companyName}</StOverlaySpan>
                  <StOverlayArrow>▶</StOverlayArrow>
                </div>
              </CustomOverlayMap>
            </>
          ))}
          {selectedMarker && (
            <CustomOverlayMap
              position={{
                lat: selectedMarker.lat,
                lng: selectedMarker.lng,
              }}
            >
              <DivMapWrapper>
                <DivMapInfo className="info">
                  <DivMapTitle>
                    {selectedMarker.companyName}
                    <BtnClose onClick={() => setSelectedMarker(null)} title="닫기" />
                  </DivMapTitle>
                  {console.log(selectedMarker)}
                  <StMapBody>
                    <div>{selectedMarker.companyAddress}</div>
                    <div>{selectedMarker.companyCallNum}</div>
                  </StMapBody>
                  <DivMapButton>
                    <BtnMapButton onClick={() => HandlerModalOn(selectedMarker)}>방문 신청</BtnMapButton>
                  </DivMapButton>
                </DivMapInfo>
              </DivMapWrapper>
              ;
            </CustomOverlayMap>
          )}
        </Map>
      </DivMapContainer>

      {isModalOpen && (
        <MarkerModal
          onClose={() => {
            setIsModalOpen(false);
          }}
          children={
            <ConfirmForm
              onClose={() => {
                setIsModalOpen(false);
              }}
              company={company}
            />
          }
        />
      )}
    </DivMap>
  );
}

const customOverlayStyle = {
  display: "flex",
  background: "rgba(255, 255, 255)",
  borderRadius: "5px",
  height: "35px",
  boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.2)",
};

const DivMap = styled.div`
  width: 100%;
  height: 93vh;
  display: flex;
  flex-direction: row;
`;
const DivMapContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
const DivCompanyList = styled.div`
  width: 480px;
  min-width: 480px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 4px;
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
  }
`;

const DivInput = styled.div`
  position: relative;
  width: 100%;
  height: 52px;
  background-color: #ffffff;
  border-radius: 32px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;
const InputText = styled.input`
  width: 88%;
  height: 52px;
  border: none;
  outline: none;
  background-color: #ffffff;
  padding: 0 20px;
  font-size: 16px;
  border: 2px solid #636fd7;
  margin: 0 auto;
  border-radius: 32px;
  &::placeholder {
    color: #a0a6d8; // 변경하고자 하는 색상으로 바꿔주세요
  }
  box-sizing: border-box;
`;
const StImgSearch = styled.img`
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const DivTemp = styled.div`
  width: 360px;
  background-color: #f8f8f8;
`;

const DivListBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 5%;
  gap: 25px;
  /* display: grid;
  grid-template-columns: 30px 1fr 135px;
  grid-template-rows: 1fr;
  grid-gap: 15px;
  grid-template-areas: "img content button"; 
  width: 100%;*/
  margin-top: 10px;
  background-color: #ffffff;
  &:hover {
    opacity: 0.8;
    background-color: #f8f8f8;
  }
`;
const DivListContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  & > * {
    margin: 8px 0;
  }
`;

const StBtnDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ButtonVisitForm = styled.button`
  width: 100px;
  height: 50px;
  background-color: #636fd7;
  border-radius: 25px;
  color: #ffffff;
  margin: 0 auto;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
`;

const DivCompanyName = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
`;
const DivCompanycontent = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  cursor: default;
`;

const StImg = styled.img`
  margin-right: 8px;
`;

const DivMapWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 318px;
  height: 201px;
  background-color: #ffffff;
  box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 1%;
`;

const DivMapInfo = styled.div`
  width: 90%;
  height: 85%;
  & > * {
    margin: 5px 0;
  }
`;

const DivMapTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
`;

const BtnClose = styled(CloseIcon)`
  color: #b1b1b1;
  cursor: pointer;
`;

const StMapBody = styled.div`
  display: flex;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  & > * {
    margin: 8px 0;
  }
`;

const DivMapButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 80px;
`;
const BtnMapButton = styled.button`
  width: 126px;
  height: 52px;
  background-color: #636fd7;
  border-radius: 32px;
  border: 2px solid #636fd7;
  color: white;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
`;

const StOverlaySpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8%;
  font-size: 12px;
  font-weight: 700;
`;
const StOverlayArrow = styled.div`
  background-color: #636fd7;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 0 5px 5px 0;
  padding: 0 8px;
  color: #fff;
  font-size: 14px;
`;
