import styled, { css } from 'styled-components';

const Container = styled.div`
  font-weight: bold;
  font-size: 1.2rem;

  height: 30px;

  background-color: rgb(33, 38, 45);
  color: rgb(201, 209, 217);

  position: sticky; top: 0;
  z-index: 1;

  display: grid;
  grid-template-columns: 50% 50%;
  justify-content: center;
  align-items: center;
`;

const Tab = styled.div`
  text-align: center;
  opacity: 0.5;

  transition: opacity .4s ease;
  
  cursor: pointer;

  ${props => props.selected && css`
    opacity: 1;
    cursor: default;
  `}
`

const Tabs = (props) => {
  const { tab, setTab } = props;

  return (
    <Container>
      <Tab selected={tab === 'PAST'} onClick={() => setTab('PAST')}>
        PAST
      </Tab>

      <Tab selected={tab === 'FUTURE'} onClick={() => setTab('FUTURE')}>
        FUTURE
      </Tab>
    </Container>
  )
};

export default Tabs;
