module.exports = {
  presets: ["@babel/preset-react", "@babel/preset-env"],
};

// touch babel.config.js 파일을 만들어주삼.

// babel-loader : JSX 및 ES6+ 문법을 트랜스파일링
// @babel/core : 바벨의 코어
// @babel/preset-react : 리엑트의 JSX 를 트랜스파일링
// @babel/preset-env : ES6+ 코드를 ES5 로 트랜스파일링하고 브라우저 폴리필을 자동화
