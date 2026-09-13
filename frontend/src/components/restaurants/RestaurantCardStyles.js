import styled from "styled-components";

export const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
`;

export const Card = styled.div`
  background-color: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
  border: 1px solid ${(props) => props.theme.colors.primary}22;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }
`;

export const CardTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: ${(props) => props.theme.colors.text};
`;

export const CardAddress = styled.p`
  margin: 0 0 0.5rem 0;
  font-size: 0.85rem;
  color: #666;
`;

export const CardDescription = styled.p`
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
  font-style: italic;
  color: #444;
`;

export const EditFields = styled.div`
  margin-bottom: 0.5rem;

  & > *:last-child {
    margin-bottom: 1.25rem;
  }
`;

export const CardButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;
export const CardButton = styled.button`
  padding: 0.5rem 1rem;
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 0.5rem;
  background-color: white;
  color: ${(props) => props.theme.colors.primary};
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
    color: white;
  }
`;
