import styled from "styled-components";

export const CardList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  padding: 0 1rem 2rem;
  box-sizing: border-box;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 480px) {
    padding: 0 0.75rem 1.5rem;
  }
`;

export const Card = styled.div`
  background-color: #fff5eb;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);

  border: 1px solid rgba(210, 105, 30, 0.22);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transform: translateY(40px) scale(0.92);

  &:hover {
    transform: translateY(-4px) scale(1);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  }
  &.in-view {
    transform: translateY(-4px) scale(1);
    transition-delay: calc(var(--i, 0) * 0.02s);
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
  flex: 1;
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

export const StatusRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 0.75rem 0 0.5rem;
`;

export const StatusCard = styled.button`
  flex: 1;
  padding: 0.4rem 0.6rem;
  border-radius: 0.5rem;
  border: 1.5px solid ${(props) => props.theme.colors.primary};

  color: ${(props) => props.theme.colors.primary};
  background-color: white;

  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) =>
    props.$active &&
    `
      background-color: ${props.theme.colors.primary};
      color: white;
`}

  &:hover {
    opacity: 0.9;
  }
`;
