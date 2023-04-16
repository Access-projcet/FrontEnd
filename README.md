<div align="center">
    <h1> VISIT US </h1>
</div>

![배너](https://github.com/Access-projcet/.github/blob/main/banner.png)

<br>
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

<img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=Spring&logoColor=white"/> <img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=for-the-badge&logo=Spring Boot&logoColor=white"/> <img src="https://img.shields.io/badge/Spring Security-6DB33F?style=for-the-badge&logo=Spring Security&logoColor=white"/> <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=Redis&logoColor=white"/> <br> <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white"/> <img src="https://img.shields.io/badge/Amazon RDS-527FFF?style=for-the-badge&logo=Amazon RDS&logoColor=white"/> <img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=for-the-badge&logo=Amazon EC2&logoColor=white"/> <img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=for-the-badge&logo=GitHub Actions&logoColor=white"/> <img src="https://img.shields.io/badge/Docker-2088FF?style=for-the-badge&logo=Docker&logoColor=white"/>

<br>

---

## ERD

![ERD](https://github.com/Access-projcet/.github/blob/main/profile/ERD.png)

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
| GitHub Actions | CI/CD 구축 | Jenkins / GitHub Actions | 1. 개발 과정에서의 빌드/배포의 자동화로 서비스 무중단을 위해 적용하게 되었습니다. </br> 2. GitHub가 자체적으로 가진 GitHub Actions를 사용함으로써 Jenkins처럼 따로 구축할 필요 없는 편리한 접근성과 모든 환경에 호환되는 장점 등 사용함에 있어 많은 작업 소요를 줄일 수 있음에 선택하였습니다.  |
| Redis | RefreshToken의 </br> 저장 용도 | Redis / </br> MySQL Scheduler | 1. RefreshToken과 같은 휘발성이 있는 데이터를 효율적으로 관리하기 위한 기능이 필요했습니다. </br> 2. My SQL Scheduler는 My SQL 자체가 데이터를 저장하고 관리하는 작업을 하고 있습니다. 여기서 Scheduelr를 쓰게되면 DB의 부하가 증가 되는 현상이 일어났습니다. </br> 3. Redis를 사용하여 My SQL의 부하를 줄여주고 휘발성있는 데이터를 관리 해주며 In-memory방식으로 빠른 AccssToken 재발급이 가능하여  선택하였습니다. |

---

## 🔎 트러블슈팅
<br>

#### 1. 방문 시간이 DB에 잘못된 값으로 저장되는 오류

| 요구 사항 | 사유 및 근거 |
| ---------- | ----------- |
| 문제 상황 | 방문 신청을 하였을때 방문 시간을 입력하면 post요청으로 DB에 저장을 할때 입력한 시간에서 +9시간이 추가 되는 오류가 </br> 발생 |
| 원인 | 방문 시간을 작성해서 요청을 보낼때 서버의 시간을 거쳐서 DB에 저장을 하다보니 현재 시간에서 9시간이 추가되는 상황 |
| 시도 | 1. 서버끼리의 시간은 동일할거라 생각하여 백엔드, 프론트엔드 둘다 서버를 올려서 확인 해보았지만 실패. </br> 2. Docker에 타임존을 추가하여 Docker자체에 시간을 한국 표준시로 지정 |
| 해결 방법 | Docker에 타임존을 추가하여 Docker의 시간을 한국 표준시로 지정하여 데이터가 정확히 들어오는걸 확인 및 해결 </br> Fix → /etc/localtime:/etc/localtime:ro -e TZ=Asiz/Seoul |

#### 2. GitHub Action이 실행되도 코드 미갱신 되는 오류

| 요구 사항 | 사유 및 근거 |
| --- | --- |
| 문제 상황 | 코드 수정을 하고나서 Develop branch에 Push를 바로 하거나 PR을 날려서 Action이 작동이 되어도 수정된 코드로 바뀌지 </br>않는 오류가 발생. |
| 원인 | 같은 코드 영역에 대해 다른 PR을 날려서 충돌 발생. |
| 시도 | 1.WorkFlow에 저장된 2개의 Cache를 삭제하여 GitHub Action을 실행 하고 수정된 코드로 갱신이 되는지 확인. </br> 2. EC2에 저장된 쌓인 도커 파일들을 삭제. </br> 3.중복된 Entity를 수정한 코드들을 하나의 PR로 합치고 재시도. |
| 해결 | 충돌된 상태에서 계속 PR을 날려 갱신되지 않은 도커 파일들을 먼저 삭제하고 충돌로 생긴 Cache 파일들도 제거한 후에 코드 </br>영역을 합친 하나의 PR을 날려 정상 작동을 확인. |




# Project 중간질문 답변 정리
1. **Redux의 데이터흐름은 어떻게 되나요? 그리고 Redux의 장단점은 뭔가요?**
Redux는 JavaScript 애플리케이션에서 상태 관리를 위한 라이브러리입니다. Redux의 데이터 흐름은 단방향으로, 액션 → 미들웨어 → 리듀서 → 스토어 → 뷰 레이어의 순서로 이루어집니다. 이는 애플리케이션의 상태 변화를 추적하기 쉽게 만들어줍니다.
Redux의 장점은 다음과 같습니다:
- 예측 가능한 상태 관리를 가능하게 해줌으로써 디버깅을 용이하게 만듭니다.
- 컴포넌트 간 데이터 전달을 단순화시켜줍니다.
- 미들웨어를 사용하여 비동기 작업 및 캐싱을 관리할 수 있습니다.
하지만 Redux를 사용하면서 발생하는 단점도 있습니다:
- Redux는 비교적 복잡한 구조를 가지고 있기 때문에, 학습 곡선이 높을 수 있습니다.
- 작은 규모의 애플리케이션에서는 Redux를 사용하는 것이 부적합할 수 있습니다.
1. **쓰지않는 코드들은 어떻게 정리하고 있나요?**
- ES Lint를 통해 사용되지 않는 코드들을 지우고 있습니다. 팀 내 코드 컨벤션을 만들어 사용하고 있으며, 와이어 프레임을 토대로 구현할 페이지를 각각 골라 구현하고 추가적으로 공통된 기능이 있거나, 이어지는 페이지가 있을시 맡아서 작업 하고 있습니다.
- 브랜치는 개개인마다 작업 branch가 존재하고 자유롭게 브랜치를 생성하여 완성된 기능마다 dev 브랜치에 PR을 하여 정해진 시간에 같이 충돌을 해결하면서 사용하고 있습니다.
1. **쿠키와 세션 웹스토리지와 종류의 차이점들.**
- 쿠키(Cookie) : 쿠키는 클라이언트 측에 작은 텍스트 파일로 저장, 서버와 클라이언트간 데이터를 주고받을때마다 HTTP 헤더를 통해 전송됨. 만료기간이 있으며 지나면 자동삭제되어짐. 크기제한이 있어 많은 데이터저장엔 부적합
- 세션(Session) : 세션은 서버 측에서 사용자 정보를 저장하며, 각 사용자에게 고유한 세션 ID를 부여합니다. 이 세션 ID가 쿠키를 통해 클라이언트와 서버 간에 전달됩니다. 세션은 사용자가 로그아웃하거나 일정 시간이 지나면 만료됩니다. 세션은 서버 측에서 관리되기 때문에 보안상 더 안전하며, 더 많은 양의 데이터를 저장할 수 있습니다.
- 웹 스토리지 : 기본적으로 LocalStorage를 사용하고있고 서버와 동기화하지않고 만료기간이 없어 영구적으로 저장. SessionStorage도 있는데 이건 브라우조 종료시 삭제.
- 현재 프로젝트에서 쿠키를 사용하는 이유? 로그인 상태를 유지하고 서버와 클라이언트간 데이터 전송하는데 사용. 쿠키를 사용하면 서버는 사용자의 요청을 인식하고, 인증과 같은 기능을 구현할 수 있어서 사용한다고 함.
- 추가적으로 access_token은 쿠키에, refresh_token은 Localstorage에 저장하는데 이는 토큰의 저장을 분리하여 보안과 사용성 때문에 분리하고 그 위치는 각각의 목적과 만료 기간의 차이로 인해 저 위치에 저장한다고함.
- access_token : 사용자의 인증을 나타내는 토큰으로, 사용자가 API에 요청할 때마다 전달되어 인증을 수행
- refresh_token : access_token이 만료되었을 때 새로운 access_token을 발급받기 위한 토큰입니다. 보통 긴 만료 기간을 가집니다 (예: 1달, 3개월). 이 토큰은 사용자가 애플리케이션에 로그인 한 상태를 유지 기본적으로 더 안전하게 보호하여야한다고함.
1. **글로벌 상태 관리?**
- 기본 Base CSS는 styled_components의 GlobalStyle을 사용하여 페이지 전체의 CSS를 지정
- 공통으로 사용되는 특정 색상은 color.js에 저장하여 호출하는 형태로 휴먼에러를 방지
- Redux를 사용하여 전역 상태를 관리.
