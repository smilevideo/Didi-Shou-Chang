import styled from 'styled-components';
import { useEffect, useState, useRef } from 'react';

const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: grid;
  justify-content: center;
  grid-template-columns: 300px 1fr 300px;
`

const ServiceCheck = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  bottom: 0;

  > div {
    font-weight: bold;
  }

  img {
    transition: opacity 0.5s ease-in;
    height: 150px;
    border-radius: 75px;
  }

  img:nth-child(2) {
    position: relative;
    top: 0;
    opacity: ${props => props.available ? 0 : 1};
  }

  img:nth-child(3) {
    position: absolute;
    top: 25px;
    opacity: ${props => props.available ? 1 : 0};
  }
`

const CenterColumn = styled.div`  
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const WelcomeImage = styled.div`
  margin-top: 10vh;
  margin-bottom: 1rem;

  display: grid;
  justify-content: center;
`

// div instead of form so pressing enter on the input doesn't submit
const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  input[type="text"] {
    width: 16ch;
    margin: 5px 0px 2rem 0px;
    border-radius: 5px;
  }

  img {
    transition: opacity 0.5s ease-in;

    opacity: ${props => props.allowEntry ? 1 : 0};
  }
`

const Entry = (props) => {
  const { username, setUsername, setUsernameEntered } = props;

  const ws = useRef(null);
  const [wssAvailable, setWssAvailable] = useState(false);
  const [s3Available, setS3Available] = useState(false);

  useEffect(() => {
    const testS3Connection = async () => {
      if (!s3Available) {
        const s3TestUrl = `http://${process.env.REACT_APP_EC2_ENDPOINT}:8089/tubalub/upload?filename=test`

        const response = await fetch(s3TestUrl);

        if (response.status === 200) {
          setS3Available(true);
        };
      }
    };

    testS3Connection();

    const s3TestInterval = setInterval(() => {
      testS3Connection();
    }, 10000);

    return () => {
      clearInterval(s3TestInterval);
    };
  }, [s3Available])

  useEffect(() => {
    ws.current = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    ws.current.onopen = () => {
      setWssAvailable(true);
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    setUsernameEntered(true);
  };

  const allowEntry = !!(username.trim()) && wssAvailable && s3Available;
  
  return (
    <Container> 
      <ServiceCheck available={wssAvailable}>
        <div>WSS</div>

        <img
          src="assets/unavailable.jpg"
          alt="wss unavailable"
        />

        <img
          src="assets/woo1.gif"
          alt="wss available"
        />
      </ServiceCheck>

      <CenterColumn>
        <WelcomeImage>
          <img 
            src="/assets/d.gif"
            alt="welcome"
          />
        </WelcomeImage>

        <Form allowEntry={allowEntry}>
          <label>"whomst'd've"</label>
          <input
            type="text"
            value={username}
            onChange={handleChangeUsername}
            maxLength={10}
          /> 
          
          <img
            src="/assets/tora.png"
            alt="enter"
            onClick={allowEntry ? handleSubmit : null}  
          />
        </Form>
      </CenterColumn>

      <ServiceCheck available={s3Available}>
        <div>S3</div>

        <img
          src="assets/unavailable.jpg"
          alt="s3 unavailable"
        />

        <img
          src="assets/woo1.gif"
          alt="s3 available"
        />
      </ServiceCheck>
    </Container>
  )
};

export default Entry;