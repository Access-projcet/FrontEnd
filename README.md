<div align="center">
    <h1> VISIT US </h1>
</div>

![배너](https://github.com/Access-projcet/.github/blob/main/banner.png)

<br>

[서비스 이용하기](https://visitus.vercel.app/)

<br>

## 👩‍👧‍👧 프로젝트 소개
<br>

- **VISIT US 는 어떠한 서비스 인가요?**
    - 저희 서비스는 QR코드 출입과 간편한 방문예약, 출입관리와 보안까지 아우르는
    회사 출입방문 시스템 VISIT US 입니다.

- **VISIT US 의 핵심기능은 뭔가요?**
    - QR 코드로 편리하게 출입이 가능합니다.
    - 간편하게 방문 예약을 할 수 있습니다.
    - 관리자페이지에서 출입내역을 효율적으로 관리할 수 있습니다.


---

## 📒 개발기간

### 2023.03.10 ~ 2023.04.13
<br>

---

## 🍅 내용 보기

![Group](https://github.com/Access-projcet/.github/blob/main/profile/Whole_content.jpg)

<br>

---

## ✨ 기술스택 

#### FRONT-END

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"> <img src="https://img.shields.io/badge/mui-007FFF?style=for-the-badge&logo=mui&logoColor=white"> <img src="https://img.shields.io/badge/reactQuery-FF4154?style=for-the-badge&logo=reactQuery&logoColor=white"> <img src="https://img.shields.io/badge/reactRouter-CA4245?style=for-the-badge&logo=reactRouter&logoColor=white"> <img src="https://img.shields.io/badge/styledComponents-DB7093?style=for-the-badge&logo=styledComponents&logoColor=white"> <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"> <img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">


<br>

---
## ✏ 와이어프레임 및 디자인 상세
[피그마 바로가기](https://figma.com/file/TkLcfaVlJTj4CW8xuTwlVO/%EB%B0%A9%EB%AC%B8%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=0-1&t=j8a0hSYKjzlEVM0G-0)


<br>
---

## 🔧 서비스 아키텍처
![아키텍처](https://github.com/Access-projcet/.github/blob/main/profile/%EC%B5%9C%EC%A2%85%20%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98_04-16.drawio.png)
<br>

---

## 💬 기술적 의사 결정
<br>

| 기술 | 도입이유 | 후보군 | 의견 조율 및 기술결정 |
| --- | --------- | ------ | -------- |
| QR코드 | 회사 방문시 출입 </br> 인증의 편의성 제공 | QR코드 / </br> 생체인식 | 1. 회사 방문시 사용자가 출입을 하기 위한 인증 절차를 거쳐가는데 있어 편의성을 제공해주는 기능이 필요했습니다. </br> 2.생체인식 같은 경우 인식 오류가 발생하는 경우와 인증하는데 불편함이 있었습니다. </br> 3. QR코드 같은 경우 QR코드를 인식하여  인증이 되기에 출입 할때 빠르고 쉬운 인증으로 사용자의 편의성을 높여주었습니다. |
| SMS | QR코드 사용의 접근 편의성 향상 | SMS / Email / 카카오톡 알림 | 1. 회사 방문시, QR코드를 사용자에게 발급하는데 있어 접근 편의성을 높여주는 기능이 필요했습니다. </br> 2. Email로 QR코드를 발급하는 경우 Email로 받은 QR코드가 제대로 발급 되었는지 확인을 하는 절차 와 활용 하는데 있어 큰 불편함이 있었습니다. </br> 3. 카카오톡 알림 같은 경우 사업자 등록 이슈로 인하여 도입에 실패 하였습니다. </br> 4. SMS는 사용자가 QR코드 발급시 등록된 휴대폰 번호로 발급이 되어 즉각적인 확인이 가능하고 QR코드 활용에 편의성이 향상 되었습니다. |
| Material-React Table | 여러 리스트 정보들을 정렬 및 검색 용도 | QueyDsl / Material-React Table  | 1. 다양한 조건에서 검색 효율성을 높이고 결과를 출력하는 데 많은 시간을 단축하기 위한 기능이 필요했습니다. </br> 2. 일반적으로 검색을 진행할 때마다 서버의 API에 요청하고 DB에 쿼리를 날리는 과정이 반복됩니다. 이에 지연 시간이 생기기에 단축을 위해 전체 데이터를 한 번에 호출하고 프레젠테이션 계층에서 이를 처리하면 지연 없이 속도를 향상 시킬 수 있었습니다. |
| React Query | Data 통신의 비동기처리 및 데이터 관리 | Redux / Recoil | 1. 데이터 패칭, 캐싱, 동기적, 그리고 서버의 상태의 업데이트를 좀 더 용이하기 위해 만들어준다. </br> 2. 보일러 플레이트같은 긴 코드 대신 별도의 설정 없이 즉시 사용 가능. </br> 3. 가비지 컬렉션을 이용하여 메모리를 효율적으로 관리해주며 Query키 값을 통해 과거 데이터를 새로운 데이터로 패치가 빠르게 이루어지며 캐싱을 효율적으로 관리해준다.   |
| Styled-Components | 용이한 CSS적용 | TailwindCSS / SCSS | 1. 러닝커브가 존재하여 CSS 를 새로 공부하기에는 시간적 여유가 없었습니다. </br> 2. CSS에서의 불편한 Selector가 사라지고 Property와 Value를 컴포넌트 구조에 맞게 작성을 하면 되고 Specificity 관리가 용이 해졌습니다.  |

---

## 🔎 트러블슈팅
<br>

#### 1. QR 리더 딜레이 이슈

| 요구 사항 | 사유 및 근거 |
| ---------- | ----------- |
| 문제 상황 | 유저가 QR리더기에 계속 QR를 리드 시킬 시 무한정으로 데이터가 post 되는 이슈 발생 |
| 원인 | Scan 하는데 딜레이를 적용시켜 놓지 않음. |
| 시도 | 1. 공식 문서에서 delay props를 통해 해결할 수 있다고 있었으나 해결이 안됨. </br> 2. useMutation 내 onSuccess 시 setResult(””) 으로 하여 data가 계속 업데이트되면서 post가 되는 것 같아 setTimeout 을 적용하여 QR리드가 읽은 result의 setResult에 계속 data가 담겨있도록  해보았으나 이것도 실패…  |
| 해결 방법 | window.locatioin.reload()를 이용하여 현재페이지를 새로고침 시켜버림… 근데 성공했을때 성공했다는 음성이 나오는데 이 길이가 대략 2초대라 2초뒤에 reload시키기 위해 아래와 같은 코드로 해결 |

#### 2. 로그아웃버튼 클릭시 로그아웃 안되는 이슈

| 요구 사항 | 사유 및 근거 |
| ---------- | ----------- |
| 문제 상황 | 로그아웃을 했을때 로컬스토리지에 담긴 정보는 제거되나 쿠키에 담긴 정보는 제거되지 않는 이슈  |
| 원인 | 유저가 일부러 혹은 여러 상황의 경우로 guest를 로그인 한 후 accessToken을 발급 받고 새 창을 띄워 같은 로그인 url에 들어가서 admin으로 로그인을 하면 accessToken이 </br> 새로 발급되어 accessToken이 쿠키에 2개가 저장되어 로그아웃 소스코드에는 accessToken만 지우는 로직밖에 없어 accessToken 한개가 남아있음을 확인 하였습니다. |
| 시도 | 1. 쿠키 안에 있는 모든 정보를 가져와서 “ACCESS_TOKEN”의 이름으로 된 정보만 필터링 해준 후 모두 지우는 함수를 구현. </br> 2. useNavigate로 이동되는 함수가 먼저 실행되는 것 같아 쿠키 및 로컬스토리지 정보를 먼저 제거한 후 navigate 되도록 함수를 구현. |
| 해결 방법 | 쿠키 안에 있는 모든 정보를 가져와서 “ACCESS_TOKEN”의 이름으로 된 정보만 필터링 해준 후 모두 지우는 함수로 해결 |


---
