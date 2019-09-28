import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from "react-router-dom";
import HeaderContainer from './container/Header.container';
import ListContainer from './container/List.container';
import { Provider } from 'react-redux'
import store from './store'
import MovieDetailsContainer from './container/Movie.details.container';

function App() {
  return (

    <Router>
      <Provider store={store}>
        <Route component={HeaderContainer} />
        <Route path="/search" exact component={ListContainer} />
        <Route path="/movie/:id" component={MovieDetailsContainer} />
      </Provider>
    </Router >

  )
}

ReactDOM.render(<App />, document.getElementById("app"))