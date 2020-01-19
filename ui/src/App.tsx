import React from "react";
import Container from "@material-ui/core/Container";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./components/Search/Search";
import Details from "./components/Details/Details";

const App: React.FC = () => {
  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/details/:id">
            <Details />
          </Route>
          <Route path="/" exact>
            <Search />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
