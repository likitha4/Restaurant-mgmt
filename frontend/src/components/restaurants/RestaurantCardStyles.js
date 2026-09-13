import styled from "styled-components";

export const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
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
  overfloe:hidden;
  max-width:100%
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
  }
    animation: fadeInUp 0.4s ease both;
    animation-delay:calc(var(--i,0)*0.06s);
    @keyframes fadeInUp{
    from {
    opacity: 0;
    transform: translateY(16px);
    }
    to{
    opacity:1;
    transform: translateY(0);
    }
    }
`;

export const CardTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: ${(props) => props.theme.colors.text};
  overflow-wrap: break-word;
  word-break: break-word;
`;

export const CardAddress = styled.p`
  margin: 0 0 0.5rem 0;
  font-size: 0.85rem;
  color: #666;
  overflow-wrap: break-word;
  word-break: break-word;
`;

export const CardDescription = styled.p`
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
  font-style: italic;
  color: #444;
  overflow-wrap: break-word;
  word-break: break-word;
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
  transition: all 0.2s ease;
  &:active {
    transform: scale(0.97);
  }
  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
    color: white;
  }
`;
