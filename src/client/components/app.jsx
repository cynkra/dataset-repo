import DocumentTitle from 'react-document-title'
import React from 'react'
import state from '../state'
import {RouteHandler} from 'react-router'

// App states history. It's good to have one, so we can replay user story for
// bug reporting for example.
const states = []

// Leverage webpack require goodness for feature toggle based dead code removal.
require('../../../assets/css/app.styl')

export default React.createClass({

  storeUndo() {
    var newState = state.get()
    var lastState = states[states.length - 1]
    if (newState === lastState) return
    states.push(newState)
  },

  undoButtonIsShowing() {
    return states.length > 1
  },

  undo() {
    states.pop()
    state.set(states.pop())
  },

  render() {
    this.storeUndo()

    return (
      <DocumentTitle title={'Dataset repo'}>
        <div>
          <RouteHandler />
          
          <button
            disabled={!this.undoButtonIsShowing()}
            onClick={() => this.undo()}
          >Undo</button>
        </div>
      </DocumentTitle>
    )
  }

})
