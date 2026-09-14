import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../provider/auth";
import { StyledButton } from "../auth/AuthStyles";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 40px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-bottom: 2px solid ${(props) => props.theme.colors.primary};
  flex-wrap: wrap;
  gap: 12px;

  @media(max-width:600px){
  padding: 12px 16px;
  }
`;
const Logo = styled.h2`
  color: ${(props) => props.theme.colors.primary};
  margin: 0;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap:nowrap;
align-items:center;
  @media (max-width:600px){
  gap:8px;
  flex-wrap:wrap
  font-size:0.85rem;
  }
  a {
    color: ${(props) => props.theme.colors.primary};
    text-decoration: none;
    font-weight: 600;
  }
`;

// const NavButtonLink = styled(Link)`
//   padding: 0.4rem 0.9rem;
//   border: 1.5px solid ${(props) => props.theme.colors.primary};
//   text-decoration: none;
//   font-weight: 600;
//   font-size: 0.85rem;
//   min-height:40px;
//   display:inline-flex;
//   align-items:center;
//   color: ${(props) => props.theme.colors.primary};
//   border-radius: 0.4rem;
//   white-space:nowrap;
//   &:hover {
//     background-color: ${(props) => props.theme.colors.primary};
//     color: white;
//   }
// `;
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
const LogoutButton= styled(StyledButton)`
padding:0.35rem 0.5rem;
font-size:0.95rem;
min-height:auto;
width:auto;
background:none;
border-radius:0.35rem;
border:none;
color:${(props)=>props.theme.colors.primary};
font-weight:600;
cursor:pointer;
font-family:inherit;
transition:background-color 0.15s ease;
&:hover{
background-color:${(props)=>props.theme.colors.primary}15;
}
`;

const NavLink= styled(Link)`
color:${(props)=>props.theme.colors.primary};
text-decoration:none;
font-weight:600;
font-size:0.95rem;
padding:0.35rem 0.5rem;
border-radius:0.35rem;
transition: background-color 0.15s ease, color 0.15s ease;
&:hover{
background-color:${(props)=>props.theme.colors.primary}15;
color:${(props)=>props.theme.colors.primary};
}
`;
const Navbar = () => {
  const { authState, authDispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    authDispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Nav>
      <LogoWrappper>
        <LogoImg src="/favicon.jpeg" alt="Fork Find logo" />
        <Link to="/">
          <Logo>ForkFind</Logo>
        </Link>
      </LogoWrappper>
      <NavLinks>
        {authState.user ? (
          <>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            <NavLink to="/restaurants/new">Add Restaurant</NavLink>
            <NavLink to="/favorites"> My Favorites</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Sign up</NavLink>
          </>
        )}
      </NavLinks>
    </Nav>
  );
};
export default Navbar;
