#### npm i webpack webpack-cli -D

#### npm install -D webpack-dev-server

#### npm i html-webpack-plugin

#### npm i css-loader

#### npm i sass-loader

#### npm i mini-css-extract-plugin

#### npm i css-minimizer-webpack-plugin

#### npm i clean-webpack-plugin

#### npm i react-dom

#### npm i react

### 1. Entry

config파일에서 entry 속성을 설정해서 웹팩이 어떤 모듈로부터 시작해서,
디펜던시 그래프를 그려나갈지 명시해줄 수 있다.
'entry' 속성의 기본값은 './src/index.js'이지만
다른 Entry Point를 지정할 수도 있다. (여러 개도 지정 가능)

### 2. Output

웹팩이 번들을 꾸리고 나서 결과물을 어디로 내보낼지 지정하는 속성이다.
기본값으로 메인 결과물인 main.js 파일은 ./dist/main.js에, 그 외 파일은 ./dist 폴더에 내보내 진다

### 3. Loader

이제까지 자바스크립트 외의 리소스도 번들링할 수 있다고 했지만,
사실 웹팩은 기본적으로 JavaScript와 JSON 파일만 이해할 수 있다.
이 때 필요한 것이 Loader이다.
사용하려는 포맷에 대응하는 Loader를 설정해주면 다른 포맷의 리소스도 디펜던시 그래프에 추가할 수있게 된다.

### 4. Plugin

바닐라 자바스크립트 프로젝트에서 꼭 필요한 두 가지 Plugin만 설정해보자.
html-webpack-plugin을 사용하면 dist의 main.js를 스크립트 파일로 포함하는 HTML 문서를 dist 디렉토리 내에 자동으로 생성해준다.
template에 원본으로 사용할 HTML문서 경로를 넣어주면 된다.
이 플러그인을 사용하지 않고 빌드하면 dist 디렉토리에 .html 파일이 생성되지 않고,
따라서 dist 디렉토리 내의 빌드 결과물 만으로는 렌더할 수 없다.
mini-css-extract-plugin를 사용하면 빌드 결과
JS파일에서 스타일시트를 분리해서 CSS 파일을 따로 만들어준다.
크기가 큰 하나의 파일을 받는 것보다 작은 여러 개의 파일을 다운로드 하는 것이 성능상 유리하기 때문에,
배포 시에는 분리하는 것이 좋다.
