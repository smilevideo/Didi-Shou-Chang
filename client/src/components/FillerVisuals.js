import styled from 'styled-components';

const Container = styled.div`
  display: grid;

  justify-content: center;
  align-items: center;
`;

const Image = styled.div`
  height: calc(350px * 0.7);
  width: calc(305px * 0.7);
  background-image: ${props => props.backgroundImage};
  background-size: contain;
  background-repeat: no-repeat;
`;

const FillerVisuals = (props) => {
  return (
    <Container>
      <Image backgroundImage="url('/assets/kirby.gif')" />
    </Container>
  )
};

export default FillerVisuals;