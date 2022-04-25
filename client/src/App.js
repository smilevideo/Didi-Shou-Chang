import { useState } from 'react';

import Entry from 'pages/Entry';
import DidiShouChang from 'pages/DidiShouChang';

const App = () => {
  const [username, setUsername] = useState('');
  const [usernameEntered, setUsernameEntered] = useState(false);

  return (
    <>
      {!usernameEntered && 
        <Entry 
          username={username} 
          setUsername={setUsername} 
          setUsernameEntered={setUsernameEntered}   
        />
      }
      {usernameEntered &&
        <DidiShouChang 
          username={username} 
          setUsername={setUsername} 
          setUsernameEntered={setUsernameEntered}   
        />
      }
    </>
  );
}

export default App;
