import styled from 'styled-components';

const Text = styled.div`
  margin: 5px;
  font-size: 0.85rem;
  text-align: left;

  a {
    color: rgb(139, 148, 158);

    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Footer = (props) => {
  return (
    <Text>
      <a 
        href="https://github.com/smilevideo/Didi-Shou-Chang" 
        target="_blank" 
        rel="noreferrer"
      >
        v2021.3.11
      </a>
    </Text>
  )
};

export default Footer;