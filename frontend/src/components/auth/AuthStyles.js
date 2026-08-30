import styled from "styled-components";

const StyledButton = styled.button`
  padding: 8px;
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.primary};
  font-size: 14px;
  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    color: black;
    cursor: pointer;
  }
    &:focus{
    outline:none
    }
  transition: all 0.2s ease;
`;
const StyledError = styled.p`
  color: ${(props) => props.theme.colors.primary};
`;
const StyledInput = styled.input`
  padding: 8px;
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 4px;
  font-size: 14px;
  width: 300px;
  color:black;
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    color: black;
    cursor: pointer;
  }
`;
const StyledForm = styled.form`
  margin: 40px auto;
  padding: 20px;
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 16px;
  display: flex;
  background-color: ${(props) => props.theme.colors.secondary};
  flex-direction: column;
  gap: 12px;
  width: fit-content;
  box-shadow: 0 4px 12px rgba(193, 68, 14, 0.15);
`;

const StyledLabel = styled.label`
  margin-bottom: 8px;
  font-weight: 600;
`;
export { StyledButton, StyledError, StyledForm, StyledInput,StyledLabel };
