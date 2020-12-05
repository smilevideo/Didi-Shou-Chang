import styled from 'styled-components';

const Container = styled.div`
  height: 333px;
  overflow-y: auto;

  border: 1px solid green;

  padding: 1rem;

  background-image: url('/assets/a.gif');

  color: white;
`

const UserList = (props) => {
  const { userList } = props;

  return (
    <Container>
      <h2>Users: ({userList.length})</h2>
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