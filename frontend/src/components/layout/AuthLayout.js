import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";

const PageWrapper= styled.div`
min-height:100vh;
display:flex;
flex-direction:column;
`;
const SplitScreen= styled.div`
flex:1;
display:flex;`
;
const ImageSide= styled.div`
position:relative;
background-image: url(${(props)=>props.bgImage});
background-size:cover;
background-position:center;
flex:1;

`;
const FormSide= styled.div`
flex:1;
display:flex;
align-items:center;
justify-content:center;

`;

const Overlay= styled.div`
position:absolute;
background: linear-gradient(rgba(0,0,0,0.35),rgba(0,0,0,0.35));
inset:0;
display:flex;
align-items:flex-end;
padding:60px;

`;

const MarketingHeading= styled.h1`
color: white;
font-size:2rem;
`;

const MarketingText= styled.div`
color: white;
font-size:1.1rem;
line-height:1.6;
`;

const AuthLayout=({children,bgImage, heading, text})=>(
<PageWrapper>
    <Navbar/>
    <SplitScreen>
        <ImageSide bgImage={bgImage}>
            <Overlay>
                <div>
            <MarketingHeading>{heading}</MarketingHeading>
            <MarketingText>{text}
            </MarketingText>
            </div>
            </Overlay></ImageSide>
        <FormSide>
        {children}
        </FormSide>
    </SplitScreen>
</PageWrapper>

);

export default AuthLayout;