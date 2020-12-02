const UserList = (props) => {
  const { userList } = props;

  return (
    <div>
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
    </div>
  )
}

export default UserList;