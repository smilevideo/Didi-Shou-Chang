import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const QueueFull = (props) => {
  return (
    <Container>
      <div>song queue is full . . .</div>
    </Container>
  )
};

export default QueueFull;