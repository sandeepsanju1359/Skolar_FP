import React from "react";
import SignIn from "./Components/SignIn/SignIn";
import Dashboard from "./Components/Dashbard/Dashboard";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  return <div className="App">{isLoggedIn ? <Dashboard /> : <SignIn />}</div>;
}

export default App;
