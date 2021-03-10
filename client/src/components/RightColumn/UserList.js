import styled from 'styled-components';

const Container = styled.div`
  height: 310px;
  overflow-y: auto;

  border: 1px solid rgb(45, 55, 65);
`

const Header = styled.div`
  font-weight: bold;
  font-size: 1.2rem;

  height: 45px;

  background-color: rgb(33, 38, 45);
  color: rgb(201, 209, 217);

  position: sticky; 
  top: 0;
  
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid rgb(45, 55, 65);
`

const UsersContainer = styled.ul`
  padding: 0 0 0 2.5rem; 
`

const Self = styled.li`
  margin-bottom: 2px;
  font-weight: bold;
`

const User = styled.li`
  margin-bottom: 2px;
`

const UserList = (props) => {
  const { userList, username } = props;
  
  let selfRemovedUserList = [...userList];
  selfRemovedUserList.splice(selfRemovedUserList.indexOf(username), 1);

  return (
    <Container>
      <Header>entities ({userList.length})</Header>
      <UsersContainer>
        <Self>
          {username}
        </Self>

        {selfRemovedUserList.map((name, index) => {
          return (
            <User key={`${name}-${index}`}>
              {name}
            </User>
          )
        })}
      </UsersContainer>
    </Container>
  )
}

export default UserList;