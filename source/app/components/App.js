// REACT
import React, { Component } from 'react'
import { Switch, Link, Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { Helmet } from 'react-helmet'

// APP COMPONENTS 
import Nav from '../containers/Nav'
import Home from '../containers/Home/HomePage'
import Asset from '../containers/Asset/AssetPage'
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
          <Nav/>
          <Switch>
  	        <Route exact path='/' component={Home}/>
            <Route path='/asset/:assetID' component={Asset}/>
            <Route path='/publish' component={Publish}/>
            <Route path='/publishedasset' component={PublishedAsset}/>
            <Route path='/about' component={About}/>
          </Switch>
        </div>
    );
  }
}

export default App;