import React, { useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import { useStateValue } from "./context/StateContext";
import { actionTypes } from "./context/reducer";

const App = () => {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const user = localStorage.getItem("login user");
    if (user) {
      dispatch({
        type: actionTypes.SET_USER,
        user: JSON.parse(user),
      });
    }
  }, [dispatch]);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <main className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId" component={Chat}>
                {/* <Chat /> */}
              </Route>
              {/* <Route path="/">
              <Chat />
            </Route> */}
            </Switch>
          </Router>
        </main>
      )}
    </div>
  );
};

export default App;
