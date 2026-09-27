import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../provider/auth";
import { StyledButton } from "../auth/AuthStyles";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 32px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-bottom: 2px solid ${(props) => props.theme.colors.primary};
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: 600px) {
    padding: 12px 16px;
  }
`;
const Logo = styled.h2`
  color: ${(props) => props.theme.colors.primary};
  margin: 0;
  font-size: 1.4rem;
`;

const NavLinks = styled.div`
  display: flex;
  position: relative;
  gap: 6px;
  align-items: center;
`;

const NavItem = styled(Link)`
  position: relative;
  z-index: 1;
  padding: 0.45rem 0.9rem;
  color: ${(props) => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  border-radius: 999px;
  transiton: color 0.25s ease;
  &.active {
    color: white;
  }
`;
const LogoWrappper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  a {
    text-decoration: none;
  }
`;
const LogoImg = styled.img`
  width: 52px;
  height: 52px;
`;
const LogoutButton = styled(StyledButton)`
  padding: 0.35rem 0.9rem;
  position: relative;
  z-index: 1;
  font-size: 0.95rem;
  min-height: auto;
  width: auto;
  background: none;
  border-radius: 999px;
  border: none;
  color: ${(props) => props.theme.colors.primary};
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: color 0.25s ease;
  &.active {
    color: white;
  }
`;

const Indicator= styled.div`
position:absolute;
top:0;
left:0;
height:100%;
background-color:${(props)=>props.theme.colors.primary};
border-radius:999px;
transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
z-index:0;
pointer-events:none;

`

const Navbar = () => {
  const { authState, authDispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const location= useLocation();
  const linksRef=useRef([]);
  const [indicatorStyle, setIndicatorStyle]= useState({left:0, width:0});

  const handleLogout = () => {
    authDispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    navigate("/login");
  };
useEffect(()=>{
  const activeIndex= linksRef.current.findIndex((el)=>el && el.classList.contains("active"));
  if(activeIndex!==-1 &&linksRef.current[activeIndex]){
    const el= linksRef.current[activeIndex];
    setIndicatorStyle({
      left:el.offsetLeft, width:el.offsetWidth,
    });
  }else{
    setIndicatorStyle({left:0, width:0});
  }
},[location.pathname,authState.user])
  return (
    <Nav>
      <LogoWrappper>
        <LogoImg src="/favicon.jpeg" alt="Fork Find logo" />
        <Link to="/">
          <Logo>ForkFind</Logo>
        </Link>
      </LogoWrappper>
      <NavLinks>
        <Indicator style={{left:indicatorStyle.left, width:indicatorStyle.width}}/>
        {authState.user ? (
          <>
            <LogoutButton ref={(el)=>(linksRef.current[0]=el)}  onClick={handleLogout}>Logout</LogoutButton>
            <NavItem ref={(el)=>(linksRef.current[1]=el)} to="/restaurants/new" className={location.pathname==="/restaurants/new" ?"active":""}>Add Restaurant</NavItem>
            <NavItem ref={(el)=>(linksRef.current[2]=el)} to="/favorites" className={location.pathname==="/favorites"?"active":""}> My Favorites</NavItem>
          </>
        ) : (
          <>
            <NavItem ref={(el)=>(linksRef.current[0]=el)} to="/login" className={location.pathname=== "/login"?"active":""}>Login</NavItem>
            <NavItem ref={(el)=>(linksRef.current[1]=el)} to="/register" className={location.pathname==="/register"?"active":""}>Sign up</NavItem>
          </>
        )}
      </NavLinks>
    </Nav>
  );
};
export default Navbar;
