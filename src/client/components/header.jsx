import React from 'react'
import immutable from 'immutable'
import {addons} from 'react/addons'
import {Link} from 'react-router'

require('../../../assets/css/header.styl')

export default React.createClass({

  render() {
    return (
      <header className="header">
        <div className="header-inner">
          <Link to="home"><h1>Dataset repository</h1></Link>
        </div>
      </header>
    )
  }
})
