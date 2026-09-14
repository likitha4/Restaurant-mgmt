import styled from "styled-components";

export const FormCard = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 1rem auto;
  background-color: ${(props) => props.theme.colors.secondary};
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(193, 68, 14, 0.15);
  padding: 1.5rem;
  box-sizing:border-box;

  animation: fadeInUp 0.5s ease both;
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
    @media(max-width:480px){
    margin:0.75rem;
    padding:1.25rem;
    }
`;

export const FormTitle = styled.h3`
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
  margin-bottom: 0.5rem;
  overflow-wrap: anywhere;
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

export const FieldError= styled.p`
color:${(props)=>props.theme.colors.primary};
font-size:0.85rem;
margin:0.25rem 0 0.5rem 0;
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
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin-top: 0.4rem;

 
    @media (min-width:640px){
    grid-template-columns:repeat(3, 1fr);
    }
`;

export const CuisinePill = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  border: 1.5px solid ${(props) => props.theme.colors.primary};
  border-radius: 20px;
  font-size: 0.82rem;
  cursor: pointer;
  transition: all 0.15s ease;
  user-select:none;
  &:hover {
    background-color: ${(props) => props.theme.colors.primary}12;
  }
  &:has(input:checked) {
    color:white;
        background-color: ${(props) => props.theme.colors.primary};

  }
`;
export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  margin-top:1.25rem;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform:translateY(-1px);
  }
  &:active {
    tansform: scale(0.98);
  }
`;
export const PageTitle= styled.h2`
animation: fadeIn 0.5s ease both;
@keyframes fadeIn{
from {opacity:0 ; transform:translateY(-8px);}
to{ opacity:1; transform: translateY(0); }
}
`;
