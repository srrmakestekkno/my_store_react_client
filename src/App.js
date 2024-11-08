import { useState, useEffect } from "react";

import Cart from "./Cart";
import Login from "./Login";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return (
    <div>{!token ? <Login setToken={setToken} /> : <Cart token={token} />}</div>
  );
}

export default App;
