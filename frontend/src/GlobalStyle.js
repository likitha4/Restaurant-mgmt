import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

@keyframes gradientShift{
 0% {background-position: 0% 50%;   }
 50% {background-position: 100% 50%; }
 100% { background-position: 0% 50%; }
}
body{
background:linear-gradient(-45deg, #FDF6EC, #FFF0E0, #FDF6EC, #FFE8D6);
margin:0;
background-size: 400% 400%
animation: gradientShift 15s ease infinte;
font-family:'Montserrat', sans-serif;
}`;
export default GlobalStyle;
