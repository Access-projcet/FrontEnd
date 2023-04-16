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


# 익명 감성글 소통 공간 [ㄱr끔...:별:️]
### "ㄱr끔"은 그 시절 추억의 감성글을 익명으로 소통하는 공간입니다.
가끔 옛날 그 시절, 그 감성 느껴보고 싶으신 당신을 위해 !
---
## :압정: About Project
- Deploy :오른쪽을_가리키는_손_모양: [[__바로가기__]](http://sometimes.store)
- 와이어프레임 :오른쪽을_가리키는_손_모양: [[__바로가기__]](https://www.figma.com/file/evGvkJUvOnSHYkChe8tOVX/%E3%84%B1r%EB%81%94?node-id=0%3A1&t=snNQx5yvuZw4CGMq-0)
- Notion :오른쪽을_가리키는_손_모양: [[__바로가기__]](https://joyous-node-f7f.notion.site/99-r-75a6c2df2f344d11a9ece43d4927dd5f)
---
## :압정: 기능
### 회원가입
- 닉네임 중복 체크
- nickname : 2~10자 구성
- username : 4~10자 구성, 알파벳 소문자(a-z), 숫자(0-9)로 구성
- password : 8~24자 구성, 알파벳 대소문자(a-z,A-Z), 숫자(0-9)로 구성
### 로그인
- 회원 유무 확인
### 카드
- 감성글 확인,추가,수정,삭제
- 유저네임별 필터링
- 좋아요 추가 :양방향_화살표: 취소
---
<div align=center><h1>:책: STACKS</h1></div>
<div align=center>
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
<img src="https://img.shields.io/badge/mui-007FFF?style=for-the-badge&logo=mui&logoColor=white">
<img src="https://img.shields.io/badge/framer-0055FF?
style=for-the-badge&logo=framer&logoColor=white">
<img src="https://img.shields.io/badge/reactQuery-FF4154?style=for-the-badge&logo=reactQuery&logoColor=white">
<img src="https://img.shields.io/badge/reactRouter-CA4245?style=for-the-badge&logo=reactRouter&logoColor=white">
<img src="https://img.shields.io/badge/styledComponents-DB7093?style=for-the-badge&logo=styledComponents&logoColor=white">
</div>
---
## :압정: Trouble Shooting
| 내용                                            | 해결 방법                                                                                                                                                         |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Netlify배포 시 "Treating warnings as errors..." | build command에 CI=false추가                                                                                                                                      |
| Netlify배포 후 page not found                   | public에 \_redirects파일 추가 후 /index.html 200 추가                                                                                                             |
| API요청 시 Mixed content에러                    | https에서 http로 요청보내서 보안 에러가 걸림. meta태그를 추가했으나, 해결안됨. 근본적으로 모든 통신을 https로 해야하지만 역부족. ec2로 프론트 http로 배포 후 해결 |
| ec2 ubuntu환경 build시 시간 오래 걸림           | ubuntu환경에서 빌드 시 메모리 부족으로 빌드가 잘 안됨. github에 빌드 파일 push후 clone으로 해결                                                                   |
| ec2 배포 후 접속 안됨                           | npm express module을 사용해서 8000포트로 열어줬었음. 인바운드 규칙에 8000포트 규칙 추가                                                                           |
| ec2 ubuntu에서 포트 redirect                    | 8000포트가 뒤에 붙는 게 싫어서, 80포트로 리다이렉트 명령어 실행 후 해결                                                                                           |
---
## :압정: 개선을 위한 고려사항
- 에러 컨트롤 미흡 : 서버와 정해진 에러 처리는 특정 컴포넌트로 보여주고, 그 외에 비정상 네트워크 에러도 따로 처리 필요
- 깃헙 관리 : 브랜치,커밋,PR,이슈 템플릿을 지키며 관리가 필요
- 유저 정보 저장 : 현재는 로그인 시, Access-Token을 쿠키에 저장하고 유저 닉네임 정보는 세션스토리지에 저장 중. Refresh-Token으로 보안을 강화해야 하며, 유저 닉네임을 세션 스토리지가 아닌 useRef등을 통한 앱 내의 변수로 관리되면 좋겠음.
- API통신 : 배포 후 보니, 통신은 잘 이루어지지만 화면 리렌더링이 버벅거림이 있음. react-query의 동작에 대해서 깊이 탐색할 필요가 있음.
