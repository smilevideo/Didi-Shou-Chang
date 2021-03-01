import styled from 'styled-components';

const Container = styled.div`
  height: 333px;
  overflow-y: auto;

  border: 1px solid black;
`

const Header = styled.div`
  font-weight: bold;
  font-size: 1.2rem;

  height: 30px;

  background-color: #333333;
  color: #CCCCCC;

  position: sticky; top: 0;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;
`

const UsersContainer = styled.ul`
  padding: 0 0 0 2.5rem; 
`

const User = styled.li`
  margin-bottom: 2px;
`

const UserList = (props) => {
  const { userList } = props;

  return (
    <Container>
      <Header>entities ({userList.length})</Header>
      <UsersContainer>
        {userList.map((username, index) => {
          return (
            <User key={index}>
              {username}
            </User>
          )
        })}
      </UsersContainer>
    </Container>
  )
}

export default UserList;