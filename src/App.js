import React from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ExplorePage from "./layouts/ExplorePage";
import ViewProvider from "./layouts/ViewProvider";
import PageNotFound from "./layouts/PageNotFound";

import Context from "./utils/context";

function App() {
  const [state, updateState] = React.useState({});
  return (
    <Context.Provider value={{ state, updateState }}>
      <BrowserRouter history="">
        <Switch>
          <Route path="/" exact component={ExplorePage} />
          {/* TODO (6a): Add New Route for Viewing a single Provider */}
          <Route path="/view-provider" component={ViewProvider} />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
