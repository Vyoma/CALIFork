import App from '../app/components/App'
import Home from '../app/containers/Home/HomePage'
import Asset from '../app/containers/Asset'
import Publish from '../app/containers/Publish/PublishPage'
import PublishedAsset from '../app/containers/PublishedAsset'
import About from '../app/containers/About/AboutPage'

const routes = [
  { component: App,
    routes: [
      { path: '/',
        exact: true,
        component: Home
      },
      { path: '/asset/:assetID',
        component: Asset
      },
      { path: '/publish',
        exact: true, 
        component: Publish
      },
      { path: '/publish/asset/:assetID',
        component: PublishedAsset
      },
      { path: '/about',
        component: About
      },
    ]
  }
];

export default routes;