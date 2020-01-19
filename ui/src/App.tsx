import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./components/Search/Search";
import Details from "./components/Details/Details";
import classes from "./App.module.css";

const Layout: React.FC = ({ children }) => {
  return <div className={classes.App}>{children}</div>;
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/details/:id">
            <Details />
          </Route>
          <Route path="/" exact>
            <Search />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
