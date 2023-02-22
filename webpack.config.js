// npm i -D html-webpack-plugin clean-webpack-plugin

/*
    루트 폴더에 webpack.config.js 생성
    mode: 개발, 프로덕션 모드 확인
    devtool: 모드에 따라 SourceMap 확인 여부
    entry: 시작점 경로를 지정하는 옵션, 해당 파일부터 필요한 모듈 로딩 및 하나의 파일로 묶기
    output: webpack이 번들링 결과물을 위치할 경로 및 이름
    devServer: 실시간으로 개발 모드로 개발하는 중 변경사항이 프로젝트에 반영
    resolve: 배열 안 확장자에 따라서 처리
    module: loader 설정 / babel-loader, ts-loader 등
    plugins: 부가 기능을 할 플러그인 설정
    ProvidePlugin: 자주 사용되는 모듈을 미리 등록하여 매번 작성하지 않게 하는 플러그인
 */

const HtmlWebpackPlugin = require("html-webpack-plugin");
// HtmlWebpackPlugin: HTML 파일에 번들링 된 자바스크립트 파일을 삽입해주고 이 플러그인으로 빌드하면 HTML 파일로 아웃풋에 생성됩니다

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// CleanWebpackPlugIn: 번들링을 할 때마다 이전 번들링 결과를 제거

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// mini-css-extract-plugin를 사용하면 빌드 결과 JS파일에서 스타일시트를 분리해서
// CSS 파일을 따로 만들어준다.
// 크기가 큰 하나의 파일을 받는 것보다 작은 여러 개의 파일을 다운로드 하는 것이 성능상 유리하기 때문에,
// 배포 시에는 분리하는 것이 좋다.

const path = require("path");
// node.js 의 모듈 중 하나, node.js 는 경로를 맞추기 위해 Path 모듈을 제공한다.
// path 모듈은 파일과 directory 경로 작업을 위한 Utility 를 제공함.

const webpack = require("webpack");

// 일반적으로 module.exports 는 config 객체를 가리킨다 (?) <--- 여기 보충필
module.exports = (env, argv) => {
  console.log(argv);
  const prod = argv.mode === "production";

  return {
    mode: prod ? "production" : "development",

    // eval-source-map,
    // eval-cheap-source-map,
    // inline-source-map
    // 을 자주사용하며, 공식 사이트에서는 eval-change-source-map 을 권장한다.

    // production 모드에서는 source map 을 설정하지 않거나, hidden-source-map 을 자주 사용한다.
    // hidden-source-map -> source-map 과 동일하지만, 번들에 참조 주석을 추가하지 않습니다.
    // 오류 보고서의 오류 스택 추적에만 소스맵을 매핑하고, 브라우저 개발 도구에는 소스맵을 노출하지 않는 경우에 유용하다.
    devtool: prod ? "hidden-source-map" : "eval-cheap-module-source-map",
    entry: "./src/index.js",
    output: {
      publicPath: "/", // 이거 안하면 router 처리 불가능
      // react-router 에서 경로 참조
      // 새로고침해도, publicPath 를 참조하게됨.
      path: path.join(__dirname, "/dist"),
      filename: "bundle.js", // 번들할 이름 지정
      assetModuleFilename: "assets/[contenthash:8][ext][query]",
      clean: true,
    },
    // 웹 애플리케이션을 제작하면서, HTML, CSS, JS 와 더불어,
    // 아이콘, 사진, 비디오 등 다양한 Assets 을 추가하게 되는데,
    // asset modules 은 로더를 추가하지 않아도!!! 이러한 asset 파일들을 사용할 수 있도록 도와주는 모듈이다.
    // asset/resource
    // asset/resource 모듈은 별도의 파일로 내보내고 URL을 추출한다.
    // 다시 말해서 빌드 후 asset 파일을 출력 디렉터리로 내보내고, 해당 경로를 번들에 추가한다.

    devServer: {
      port: 3002,
      compress: true, // 제공되는 모든 항목에 대해 gzip 압축을 활성화합니다.
      historyApiFallback: true,
      // HTML5 History API 를 사용하여, index.html 페이지는
      // 404 응답 대신 제공되어야 함. true 로 설정하여 활성화 할 수 있다.
      // proxy: {
      //   "/user/*": {
      //     target: "http://localhost:9000",
      //   },
      // },
      static: { directory: path.join(__dirname, "public") },
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.(scss|css)$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        React: "react",
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        minify: prod
          ? {
              collapseWhitespace: true, // 빈칸 제거
              removeComments: true, // 주석 제거
            }
          : false,
      }),
      new MiniCssExtractPlugin({
        filename: "style.css",
        ignoreOrder: true,
      }),
    ],
  };
};
