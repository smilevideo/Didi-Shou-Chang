import { useState } from 'react';

import Entry from 'components/Entry';
import Chat from 'components/Chat/Chat';

const App = () => {
  const [username, setUsername] = useState('');
  const [usernameEntered, setUsernameEntered] = useState(false);

  return (
    <div className="App">
      {!usernameEntered && 
        <Entry username={username} setUsername={setUsername} setUsernameEntered={setUsernameEntered} />
      }
      {usernameEntered &&
        <Chat username={username} />
      }

    </div>
  );
}

export default App;
