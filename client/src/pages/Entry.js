import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: grid;
  justify-content: center;
`

const WelcomeImage = styled.img`
  margin-top: 20vh;
  margin-bottom: 1rem;
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
      <div>
        <WelcomeImage src="/assets/d.gif" alt="welcome" />

        <Form showSubmit={!!(username.trim())}>
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
            onClick={username ? handleSubmit : null}  
          />
        </Form>
      </div>
    </Container>
  )
};

export default Entry;