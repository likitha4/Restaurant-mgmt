import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body{
background-color:${(props) => props.theme.colors.secondary};
margin:0;
font-family:'Montserrat', sans-serif;
}`;
export default GlobalStyle;
