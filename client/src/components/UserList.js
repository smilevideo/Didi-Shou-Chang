import styled from 'styled-components';

const Container = styled.div`
  height: 35vh;
  width: 50ch;
  overflow-y: auto;

  border: 1px solid green;
`

const UserList = (props) => {
  const { userList } = props;

  return (
    <Container>
      <h2>Users:</h2>
      <ul>
        {userList.map((username, index) => {
          return (
            <li key={index}>
              {username}
            </li>
          )
        })}
      </ul>
    </Container>
  )
}

export default UserList;