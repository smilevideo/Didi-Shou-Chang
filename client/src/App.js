import { useState } from 'react';

import Entry from 'pages/Entry';
import DidiShouChang from 'pages/DidiShouChang';

const App = () => {
  const [username, setUsername] = useState('');
  const [usernameEntered, setUsernameEntered] = useState(false);

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
