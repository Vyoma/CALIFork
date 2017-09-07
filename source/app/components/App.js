// REACT
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Link, Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { Helmet } from 'react-helmet'

// APP COMPONENTS 
import Nav from '../containers/Nav'
import Home from '../containers/Home/HomePage'
import Asset from '../containers/Asset'
import Publish from '../containers/Publish/PublishPage'
import PublishedAsset from '../containers/PublishedAsset'
import About from '../containers/About/AboutPage'

class App extends Component {
  render() {
    return (
      <div>
        <Helmet
          htmlAttributes={{lang: "en", amp: undefined}} // amp takes no value
          titleTemplate="%s | React App"
          titleAttributes={{itemprop: "name", lang: "en"}}
          meta={[
            {name: "description", content: "Server side rendering example"},
            {name: "viewport", content: "width=device-width, initial-scale=1"},
          ]}
        />
        <Switch>
          <Route path='/' component={Nav} />
        </Switch>
        <Switch>
	        <Route exact path='/' component={Home}/>
          <Route path='/asset/:assetID' component={Asset}/>
          <Route exact path='/publish' component={Publish}/>
          <Route path='/publish/asset/:assetID' component={PublishedAsset}/>
          <Route path='/about' component={About}/>
        </Switch>
      </div>
    );
  }
}

export default App