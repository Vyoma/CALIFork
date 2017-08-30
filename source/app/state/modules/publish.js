// ----------------------------- CONSTANTS ----------------------------- //
export const SET_ASSET_TITLE = 'SET_ASSET_TITLE'
export const SET_ASSET_TYPE = 'SET_ASSET_TYPE'
export const SET_ASSET_OWNER = 'SET_ASSET_OWNER'
export const SET_ASSET_CONTRIBUTOR = 'SET_ASSET_CONTRIBUTOR'
export const ADD_ARTIFACT = 'ADD_ARTIFACT'
export const NEXT_PAGE = 'NEXT_PAGE'
export const PREV_PAGE = 'PREV_PAGE'
export const UPDATE_TAG = 'UPDATE_TAG'
export const GET_TAG = 'GET_TAG'
export const ADD_TECHNOLOGY_TAG = 'ADD_TECHNOLOGY_TAG'
export const ADD_INDUSTRY_TAG = 'ADD_INDUSTRY_TAG'
export const ADD_CLIENT_TAG = 'ADD_CLIENT_TAG'
export const ADD_TAG = 'ADD_TAG'
export const ADD_ASSET_ARTIFACT = 'ADD_ASSET_ARTIFACT'
export const DELETE_CONTRIBUTOR = 'DELETE_CONTRIBUTOR'
export const DELETE_ARTIFACT = 'DELETE_ARTIFACT'
export const START_FILE_LOAD = 'START_FILE_LOAD'
export const FINISH_FILE_LOAD = 'FINISH_FILE_LOAD'
export const DELETE_INDUSTRY_TAG = 'DELETE_INDUSTRY_TAG'
export const DELETE_CLIENT_TAG = 'DELETE_CLIENT_TAG'
export const DELETE_TECHNOLOGY_TAG = 'DELETE_TECHNOLOGY_TAG'

// ----------------------------- REDUCERS ----------------------------- //
const initialAssetOwnerState = {
  name: '',
  email: ''
}

const initialPublishState = {
  page: 0,
  assetTitle: '',
  assetType: '',
  assetOwner: initialAssetOwnerState,
  assetContributors: [],
  artifacts: [],
  industryTags: ['randomTestingTag'],
  technologyTags: ['randomTestingTag'],
  clientTags: ['randomClientTag'],
  loading: false
}

const assetOwner = (state = initialAssetOwnerState, action) => {
  switch (action.subType) {
    case 'name':
      console.log('in sub type name')
      return {
        ...state,
        name: action.value
      }
    case 'email':
      return {
        ...state,
        email: action.value
      }
  }
}

const removeElement = (list, index) => {
  return [...list.slice(0, index), ...list.slice(index + 1)]
}

const publish = (state = initialPublishState, action) => {
  switch (action.type) {
    case SET_ASSET_TITLE:
      return {
        ...state,
        assetTitle: action.assetTitle
      }
    case SET_ASSET_TYPE:
      return {
        ...state,
        assetType: action.assetType
      }
    // case SET_ASSET_OWNER:
    //   return {
    //     ...state,
    //     assetOwner: assetOwner(state.assetOwner, action)
    //   }
    case SET_ASSET_OWNER:
      return {
        ...state,
        assetOwner: {
          ...state.assetOwner, 
          name: action.name, 
          email: action.email
        }
      }
    case SET_ASSET_CONTRIBUTOR:
      return {
        ...state,
        assetContributors: [...state.assetContributors, action.contributor]
      }
    case ADD_ASSET_ARTIFACT:
      return {
        ...state,
        artifacts: [...state.artifacts, action.artifact]
      }
    case ADD_ARTIFACT:
      return {
        ...state,
        artifacts: [...state.artifacts, action.artifact]
      }
    case NEXT_PAGE:
      return {
        ...state,
        page: state.page + 1
      }
    case PREV_PAGE:
      return {
        ...state,
        page: state.page - 1
      }
    case UPDATE_TAG:
      return {
        ...state,
        tags: [...state.tags, action.tags]
      }
    case GET_TAG:
      return {
        ...state,
        industryTags: state.industryTags.concat(action.industryTags),
        technologyTags: state.technologyTags.concat(action.technologyTags)
      }
    case ADD_INDUSTRY_TAG:
      return {
        ...state,
        industryTags: state.industryTags.concat(action.tag)
      }
    case ADD_TECHNOLOGY_TAG:
      return {
        ...state,
        technologyTags: state.technologyTags.concat(action.tag)
      }
    case ADD_CLIENT_TAG:
      return {
        ...state,
        clientTags: state.clientTags.concat(action.tag)
      }
    case DELETE_CONTRIBUTOR:
      return {
        ...state,
        assetContributors: removeElement(state.assetContributors, action.index)
      }
    case DELETE_ARTIFACT:
      return {
        ...state,
        artifacts: removeElement(state.artifacts, action.index)
      }
    case DELETE_INDUSTRY_TAG:
      return {
        ...state,
        industryTags: removeElement(state.industryTags, action.index)
      }
    case DELETE_TECHNOLOGY_TAG:
      return {
        ...state,
        technologyTags: removeElement(state.technologyTags, action.index)
      }
    case DELETE_CLIENT_TAG:
      return {
        ...state,
        clientTags: removeElement(state.clientTags, action.index)
      }
    case START_FILE_LOAD:
      return {
        ...state,
        loading: true
      }
    case FINISH_FILE_LOAD:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

export default publish; 


// ----------------------------- ACTION CREATORS ----------------------------- //

// ===== PAGE NAVIGATION ====== //
export const setNextPage = () => {
  return {
    type: NEXT_PAGE
  }
}

export const setPrevPage = () => {
  return {
    type: PREV_PAGE
  }
}


// ===== PAGE 1 ====== //
export const setAssetTitle = (assetTitle) => {
  return {
    type: SET_ASSET_TITLE,
    assetTitle
  }
}

export const setAssetType = (assetType) => {
  return {
    type: SET_ASSET_TYPE,
    assetType
  }
}

export const setAssetOwner = (subType, value) => {
  return {
    type: SET_ASSET_OWNER,
    subType,
    value
  }
}

export const setAssetContributor = (contributor) => {
  return {
    type: SET_ASSET_CONTRIBUTOR,
    contributor
  }
}

export const addAssetArtifact = (artifact) => {
  return {
    type: ADD_ASSET_ARTIFACT,
    artifact
  }
}

export const getAssetTagsSuccess = ({ technologies, industries }) => {
  return {
    type: GET_TAG,
    technologyTags: technologies,
    industryTags: industries
  }
}

export const getAssetTagsFailure = (error) => {
  console.log(error)
}

export const getAssetTags = (files) => {
  return (dispatch) => {
    let file = files[0]
    dispatch(startFileLoad())
    let data = new FormData()
    data.append('file', file)
    data.append('industry', 'True')
    data.append('technology', 'True')
    data.append('password', 'Cali')
    axios.post('https://autotagger-rudderlike-notedness.mybluemix.net/attachments', data)
    .then(response => {
      console.log(response.data)
      dispatch(getAssetTagsSuccess(response.data))
      dispatch(finishFileLoad())
    })
    .catch(error => {
      dispatch(getAssetTagsFailure(error))
      dispatch(finishFileLoad())
    })
  }
}

export const startFileLoad = () => {
  return {
    type: START_FILE_LOAD
  }
}

export const finishFileLoad = () => {
  return {
    type: FINISH_FILE_LOAD
  }
}

export const addIndustryTag = (tag) => {
  return {
    type: ADD_INDUSTRY_TAG,
    tag
  }
}

export const addTechnologyTag = (tag) => {
  return {
    type: ADD_TECHNOLOGY_TAG,
    tag
  }
}

export const addClientTag = (tag) => {
  return {
    type: ADD_CLIENT_TAG,
    tag
  }
}

export const deleteContributor = (index) => {
  return {
    type: DELETE_CONTRIBUTOR,
    index
  }
}

export const deleteArtifact = (index) => {
  return {
    type: DELETE_ARTIFACT,
    index
  }
}

export const deleteIndustryTag = (index) => {
  return {
    type: DELETE_INDUSTRY_TAG,
    index
  }
}

export const deleteTechnologyTag = (index) => {
  return {
    type: DELETE_TECHNOLOGY_TAG,
    index
  }
}

export const deleteClientTag = (index) => {
  return {
    type: DELETE_CLIENT_TAG,
    index
  }
}

export const destructuredAction = ({ assetOwnerName, assetOwnerEmail }) => {
  return {
    type: SET_ASSET_CONTRIBUTOR,
    assetOwnerName,
    assetOwnerEmail
  }
}
