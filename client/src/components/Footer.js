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
      dev by <a href="https://github.com/smilevideo/Didi-Shou-Chang">andrew</a>, devops by pai
    </Text>
  )
};

export default Footer;