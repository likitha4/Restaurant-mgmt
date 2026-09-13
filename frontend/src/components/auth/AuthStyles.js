import styled from "styled-components";
import { Link } from "react-router-dom";
const StyledButton = styled.button`
  padding: 8px 16px;
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.primary};
  font-size: 0.95rem;
  width: 100%;
  font-weight: 660;
  min-height: 44px;
  max-width: 300px;
  align-self: center;
  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    color: black;
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  transition: all 0.2s ease;

  @media (max-width: 480px) {
    width: 100%;
    font-size: 1rem;
  }
`;
const StyledError = styled.p`
  color: ${(props) => props.theme.colors.primary};
`;
const StyledInput = styled.input`
  padding: 0.75rem;
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 0.5rem;
  font-size: 0.95rem;
  width: 100%;
  max-width: 320px;
  box-sizing: border-box;

  color: black;
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    color: black;
    cursor: pointer;
  }
`;
const StyledForm = styled.form`
  margin: 2rem auto;
  padding: 2rem;
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 1rem;
  display: flex;
  background-color: ${(props) => props.theme.colors.secondary};
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  box-sizing: border-box;
  max-width: 380px;
  box-shadow: 0 4px 12px rgba(193, 68, 14, 0.15);

  @media(max-width: 480px){
  margin:1rem;
  padding:1.25rem;
  }
`;

const StyledLabel = styled.label`
  margin-bottom: 0.8rem;
  font-weight: 600;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.primary};
`;
export {
  StyledButton,
  StyledError,
  StyledForm,
  StyledInput,
  StyledLabel,
  StyledLink,
};
