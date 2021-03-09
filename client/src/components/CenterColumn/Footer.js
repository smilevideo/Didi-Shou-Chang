import styled from 'styled-components';

const Text = styled.div`
  margin: 5px;
  font-size: 0.85rem;

  a {
    text-decoration: none;
    color: darkblue;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Footer = (props) => {
  return (
    <Text>
      <a href="https://github.com/smilevideo/Didi-Shou-Chang" target="_blank" rel="noreferrer">
        v2021.3.8
      </a>
    </Text>
  )
};

export default Footer;