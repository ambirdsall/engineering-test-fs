import React from "react";
import classes from "./App.module.css";
import Search from "./containers/Search/Search";

const Layout: React.FC = ({ children }) => {
  return <div className={classes.App}>{children}</div>;
};

// TODO: add routing
const App: React.FC = () => {
  return (
    <Layout>
      <Search />
    </Layout>
  );
};

export default App;
