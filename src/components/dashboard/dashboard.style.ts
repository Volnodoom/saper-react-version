import styled from "styled-components";

const DashboardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px;
  border: 3px inset ${({theme}) => theme.color.greyBorder};
  border-radius: 2px;

  background-color: ${({ theme }) => theme.color.grey };
`;

export {
  DashboardWrapper,
}
