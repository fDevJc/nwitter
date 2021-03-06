import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';

import { authService } from 'fBase';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    }),
    []
  );

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'Initialize...'}
      <footer>&copy; {new Date().getFullYear()} nwitter</footer>
    </>
  );
}

export default App;
