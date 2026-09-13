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
`;
const Logo = styled.h2`
  color: ${(props) => props.theme.colors.primary};
  margin: 0;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  a {
    color: ${(props) => props.theme.colors.primary};
    text-decoration: none;
    font-weight: 600;
  }
`;

const NavButtonLink = styled(Link)`
  padding: 0.5rem 1rem;
  border: 2px solid ${(props) => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 600;
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.primary};
  border-radius: 0.25rem;
  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
    color: white;
  }
`;
const LogoWrappper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  a{
  text-decoration:none;
  }
`;
const LogoImg = styled.img`
  width: 52px;
  height: 52px;
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
          <Link to="/"><Logo>ForkFind</Logo>
          </Link>
        </LogoWrappper>
        <NavLinks>

        {authState.user ? (
          <>
            <StyledButton onClick={handleLogout}>Logout</StyledButton>
            <NavButtonLink to="/restaurants/new">Add Restaurant</NavButtonLink>
            <NavButtonLink to="/favorites"> My Favorites</NavButtonLink>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Sign up</Link>
          </>
        )}
      </NavLinks>
    </Nav>
  );
};
export default Navbar;
