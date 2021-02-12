import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
body{
    @font-face {
      font-family: "iconfont";
      src: url('./iconfont.eot?t=1603061820918'); /* IE9 */
      src: url('./iconfont.eot?t=1603061820918#iefix') format('embedded-opentype'), /* IE6-IE8 */
      url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
      url('./iconfont.woff?t=1603061820918') format('woff'),
      url('./iconfont.ttf?t=1603061820918') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
      url('./iconfont.svg?t=1603061820918#iconfont') format('svg'); /* iOS 4.1- */
    }

    .iconfont {
      font-family: "iconfont" !important;
      font-size: 16px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  }
`;

export default GlobalStyle;