import styled from "styled-components";

export const FormCard = styled.div`
  max-width: 500px;
  margin: 0.75rem auto;
  background-color: ${(props) => props.theme.colors.secondary};
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(193, 68, 14, 0.15);
  padding: 2rem;
`;

export const FormTitle = styled.h3`
color:${(props) => props.theme.colors.primary};
text-align: center;
margin-bottom :0.5rem;
`;
export const FieldGroup = styled.div`
  margin-bottom: 1rem;
`;
export const FieldLabel = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.45rem;
  color: ${(props) => props.theme.colors.text};
`;

export const FieldInput = styled.input`
  width: 100%;
  padding: 0.7rem 0.85rem;
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 0.5rem;
  font-size: 0.95rem;
  box-sizing: border-box;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(193, 68, 14, 0.15);
  }
`;
export const CuisineGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.25rem;
  margin-top: 0.2rem;

  @media(max-width:768px){
  grid-template-columns:repeat(2,1fr);
  }

  @media(max-width:480px){
  grid-template-columns:1fr;
  }
`;

export const CuisinePill = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 20px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:has(input:checked) {
    color:white;
    background-color: ${(props)=>props.theme.colors.primary};
  }
`;
export const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  padding-top: 12px;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;
