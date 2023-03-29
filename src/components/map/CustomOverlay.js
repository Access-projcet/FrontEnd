// import React, { useState, useEffect } from "react";
// import ConfirmForm from "../../pages/ConfirmForm";
// import { getMap } from "../../api/api";
// import { useQuery } from "react-query";

// const CustomOverlay = () => {
//   const [modalOn, setModalOn] = useState(false);
//   const [overlay, setOverlay] = useState(false);

//   const { data } = useQuery("map", getMap);

//   const handleModal = () => {
//     setModalOn(!modalOn);
//   };
//   const closeOverlay = () => {
//     setOverlay(null);
//   };

//   useEffect(() => {
//     if (data) {
//       let positions = [];
//       if (data.data) {
//         positions = data.data.map((e) => ({
//           id: e.id,
//           companyName: e.companyName,
//           address: e.address,
//           postNum: e.postNum,
//         }));
//       }
//     }
//   });
//   return (
//     <div className="wrap">
//       <div className="info">
//         <div className="title">
//           {position.companyName}
//           <div className="close" onClick={closeOverlay} title="닫기"></div>
//         </div>
//         <div className="body">
//           <div className="img">
//             <img src="https://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70" />
//           </div>
//           <div className="desc">
//             <div className="ellipsis">제주특별자치도 제주시 첨단로 242</div>
//             <div className="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>
//             {modalOn && <ConfirmForm onClose={handleModal}>신청하기</ConfirmForm>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomOverlay;
