import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: grid;
  grid-template-rows: 20% 1fr;
  justify-content: center;
`

const WelcomeImage = styled.img`
  margin-bottom: 1rem;
`

// div instead of form so pressing enter on the input doesn't submit
const Form = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  input[type="text"] {
    width: 30%;
    margin-bottom: 2rem;
  }

  img {
    transition: opacity 0.5s ease-in;

    opacity: ${props => props.showSubmit ? 1 : 0}
  }
`

const Entry = (props) => {
  const { username, setUsername, setUsernameEntered } = props;

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    setUsernameEntered(true);
  };
  
  return (
    <Container>
      <div />

      <div>
        <WelcomeImage src="/assets/d.gif" alt="welcome" />

        <Form showSubmit={username}>
          <label>"whomst'd've"</label>
          <input
            type="text"
            value={username}
            onChange={handleChangeUsername}
          /> 

          <img
            src="/assets/tora.png"
            alt="enter"
            onClick={username ? handleSubmit : null}  
          />
        </Form>
      </div>
    </Container>
  )
};

export default Entry;