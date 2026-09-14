import styled from "styled-components";

export const FormCard = styled.div`
  max-width: 500px;
  width: 90%;
  margin: 2rem auto;
  background-color: ${(props) => props.theme.colors.secondary};
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(193, 68, 14, 0.15);
  padding: 2rem;
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
  grid-template-columns: repeat(3, 1fr);
  gap: 0.25rem;
  margin-top: 0.2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
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
  transition: all 0.2s ease;
  &:hover {
    background-color: ${(props) => props.theme.colors.primary}15;
  }
  &:has(input:checked) {
    transform: scale(1.03);
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
  transition: all 0.2s ease;
  &:active {
    tansform: scale(0.97);
  }
`;
export const PageTitle= styled.h2`
animation: fadeIn 0.5s ease both;
@keyframes fadeIn{
from {opacity:0 ; transform:translateY(-8px);}
to{ opacity:1; transform: translateY(0); }
}
`;
