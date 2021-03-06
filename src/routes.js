import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";
import About from "./components/About";
import Sentiment from "./components/Sentiment";
import Compare from "./components/Sentiment/Compare";
import NotFound from "./components/NotFound";

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/terms" exact component={Terms} />
    <Route path="/privacy" exact component={Privacy} />
    <Route path="/about" exact component={About} />
    <Route
      path="/sentiment-analysis/:text"
      exact
      component={Sentiment}
    />
    <Route path="/compare/:a/:b" exact component={Compare} />
    <Route path="/compare" exact component={Compare} />
    <Route path="/*" component={NotFound} />
  </Switch>
);

export default Routes;
