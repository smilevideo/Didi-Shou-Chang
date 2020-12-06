import styled from 'styled-components';

import { useEffect, useState, useRef } from 'react';

const Container = styled.div`
  height: 100%;
  overflow-y: auto;
  
  border: 1px solid black;
  
  ul {
    margin: 10px;
    padding: 0;
  }
`

const Timeline = (props) => {
  const { timeline } = props;

  const [initialScrollComplete, setInitialScrollComplete] = useState(false);
  const currentlyPlayingRef = useRef(null);

  const scrollTimelineToCurrentlyPlaying = () => {
    currentlyPlayingRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  };

  // scroll chat to bottom once initial messages are loaded
  useEffect(() => {
    if (!initialScrollComplete && timeline.length > 0) {
      scrollTimelineToCurrentlyPlaying();
      setInitialScrollComplete(true);
    }
  }, [timeline, initialScrollComplete]);

  return (
    <Container>
        <ul>
          {timeline.map(song => <li>asdf</li>)}
        </ul>
        
        <div ref={currentlyPlayingRef} />
    </Container>
  )
}

export default Timeline;