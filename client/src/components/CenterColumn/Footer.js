import styled from 'styled-components';

const Text = styled.div`
  text-align: center;
  margin: 5px;
  font-size: 0.85rem;

  a {
    text-decoration: none;
    color: blue;
  }
`;

const Footer = (props) => {
  return (
    <Text>
      <a href="https://github.com/smilevideo/Didi-Shou-Chang">v1.2.3.4</a>
    </Text>
  )
};

export default Footer;