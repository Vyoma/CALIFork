import App from '../app/components/App'
import Home from '../app/containers/Home/HomePage'
import Asset from '../app/containers/Asset/AssetPage'
import Publish from '../app/containers/Publish/PublishPage'

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
        component: Publish
      },
    ]
  }
];

export default routes;