const UserList = (props) => {
  const { userList } = props;

  return (
    <ul>
      {userList.map((username, index) => {
        return (
          <li key={index}>
            {username}
          </li>
        )
      })}
    </ul>
  )
}

export default UserList;