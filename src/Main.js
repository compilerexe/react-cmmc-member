import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import 'bulma/css/bulma.css'
import SignIn from './components/SignIn.js'

class Main extends Component {

  constructor (props) {
    super(props)
    this.state = {token: null}
  }

  render () {
    return (
      <div>
        {(this.state.token === null) && <SignIn/>}
      </div>
    )
  }

}

ReactDOM.render(<Main/>, document.getElementById('app'))