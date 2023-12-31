/*
  http://bit.ly/2DTXGpe - `@babel/polyfill` has been deprecated.
  If you need to polyfill certain JS features, uncomment the two imports below.
*/
// import 'core-js/stable'
// import 'regenerator-runtime/runtime' // Needed to polyfill async / await.

// Import our top-level sass file.
import './styles/styles.scss'

// Import React.
import React from 'react'
import ReactDOM from 'react-dom'

// Import our components.
import Home from 'components/Home'
import NotFound from 'components/NotFound'

// Import React Router things.
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Load from './components/Load'
import QuizEntry from './components/QuizEntry'
import Quiz from './components/Quiz'
import {HashRouter} from 'react-router-dom/cjs/react-router-dom.min'

// Mount our app.
ReactDOM.render(
  <HashRouter basename="/flashcards">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/load" component={Load} />
      <Route exact path="/quiz-entry" component={QuizEntry} />
      <Route exact path="/quiz" component={Quiz} />
      <Route component={NotFound} />
    </Switch>
  </HashRouter>,
  document.querySelector('#app'),
)
