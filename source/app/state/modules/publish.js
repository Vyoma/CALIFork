// DEPENDENCIES
const v4 = require('uuid/v4');
const axios = require('axios'); 
require('isomorphic-fetch');

// SERVICES 
import { mongoSave } from '../services/mongo'
import { elasticIndex } from '../services/elastic'

// ----------------------------- CONSTANTS ----------------------------- //
export const INITIALIZE_ASSET = 'INITIALIZE_ASSET'
export const SET_ASSET_TITLE = 'SET_ASSET_TITLE'
export const SET_ASSET_TYPE = 'SET_ASSET_TYPE'
export const SET_ASSET_OWNER = 'SET_ASSET_OWNER'
export const SET_ASSET_CONTRIBUTOR = 'SET_ASSET_CONTRIBUTOR'
export const SET_ASSET_DESCRIPTION = 'SET_ASSET_DESCRIPTION'
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
export const UPLOAD_FILE_TO_BOX_REQUEST = 'UPLOAD_FILE_TO_BOX_REQUEST'; 
export const UPLOAD_FILE_TO_BOX_SUCCESS = 'UPLOAD_FILE_TO_BOX_SUCCESS'; 
export const UPLOAD_FILE_TO_BOX_FAILURE = 'UPLOAD_FILE_TO_BOX_FAILURE'; 
export const SET_ASSET_FOLDER_ID = 'SET_ASSET_FOLDER_ID'
// PUBLISH ASSET
export const PUBLISH_ASSET_REQUEST = 'PUBLISH_ASSET_REQUEST'
export const PUBLISH_ASSET_SUCCESS = 'PUBLISH_ASSET_SUCCESS'
export const PUBLISH_ASSET_FAILURE = 'PUBLISH_ASSET_FAILURE'

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
  loading: false,
  isPending: false, 
  isPublished: false, 
}

const demoContributors = [
  {
    name: 'Brian Balagot', 
    role: 'Data Scientist', 
    email: 'Brian.Balagot@ibm.com'
  }, 
  {
    name: 'Layne Miao', 
    role: 'Cognitive Developer', 
    email: 'Layne.Miao@ibm.com'
  }, 
  {
    name: 'John Smith', 
    role: 'Project Manager', 
    email: 'John.Smith@ibm.com'
  }
]

export const initialDemoState = {
  page: 0,
  assetTitle: 'Cognitive Demo Service',
  assetType: 'Prototype',
  assetOwner: { name: 'Austin Riedel', email: 'Austin.Riedel@ibm.com'},
  assetDescription: 'This is a sample description of a cognitive asset that is being entered into Project CALI. The description should include information about the use case for the asset, the technologies utilized in the solution and the industries and clients that have benefitted from this asset.',
  assetContributors: demoContributors,
  artifacts: [],
  industryTags: [],
  technologyTags: [],
  clientTags: [],
  loading: false,
  publishedAssetBool: false
}

const assetOwner = (state = initialAssetOwnerState, action) => {
  switch (action.subType) {
    case 'name':
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

const publish = (state = initialDemoState, action) => {
  switch (action.type) {
    case INITIALIZE_ASSET:
      return {
        ...state,
        assetID: action.assetID, 
        assetFolderID: action.assetFolderID,
        isPending: false, 
        isPublished: false, 
        page: 0,
      }
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
    case SET_ASSET_OWNER:
      return {
        ...state,
        assetOwner: assetOwner(state.assetOwner, action)
      }
    // case SET_ASSET_OWNER:
    //   return {
    //     ...state,
    //     assetOwner: {
    //       ...state.assetOwner, 
    //       name: action.name, 
    //       email: action.email
    //     }
    //   }
    case SET_ASSET_CONTRIBUTOR:
      return {
        ...state,
        assetContributors: [...state.assetContributors, action.contributor]
      }
    case SET_ASSET_DESCRIPTION:
      return {
        ...state,
        assetDescription: action.assetDescription
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
    case SET_ASSET_FOLDER_ID: 
      return {
        ...state,
        assetFolderID: action.assetFolderID
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
    case UPLOAD_FILE_TO_BOX_REQUEST: 
      return {
        ...state,
        loading: true
      }
    case FINISH_FILE_LOAD:
    case UPLOAD_FILE_TO_BOX_SUCCESS: 
    case UPLOAD_FILE_TO_BOX_FAILURE: 
      return {
        ...state,
        loading: false
      }
    case PUBLISH_ASSET_SUCCESS:
      return {
        ...state,
        isPublished: true
      }
    default:
      return state
  }
}

export default publish; 

// ----------------------------- SERVICE CALL FUNCTIONS ----------------------------- //
const fetchBoxMicroservice = (path, data) => {
  return fetch(path, {
    method: 'POST',
    body: data, 
    mode: 'cors',
    headers: {
      "x-cali-key": "test"
    }
  }); 
}

// ----------------------------- ACTION CREATORS ----------------------------- //
export const initializeAsset = () => {
  return {
    type: INITIALIZE_ASSET,
    assetID: v4(),
    assetFolderID: ''
  }
}

export const initializeAssetConditional = () => {
  return (dispatch, getState) => {
    const state = getState(); 
    console.log("ATTEMPING TO INITIALIZE PUBLISH")
    const assetID = state.publish.assetID; 
    const publishedAssetID = state.assets.publishedAssetID; 
    if (assetID && publishedAssetID && assetID === publishedAssetID) {
      dispatch(initializeAsset()); 
    } else if (!assetID) {
      dispatch(initializeAsset()); 
    }
  }
}

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

export const setAssetDescription = (assetDescription) => {
  return {
    type: SET_ASSET_DESCRIPTION, 
    assetDescription, 
  }
}

// ===== ASSET FILE - COGNITIVE TAGS ====== //
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

export const getTagsFromStringThunk = (text) => {
  return (dispatch) => {
    dispatch(getAssetTagsSuccess())
    // CALL TAGGING MICROSERVICE
    // axios.post('https://autotagger-rudderlike-notedness.mybluemix.net/attachments', data)
    // .then(response => {
    //   dispatch(getAssetTagsSuccess())
    // })
    // .catch(error => {
    //   dispatch(getAssetTagsFailure(error))
    // })
  }
}

export const getAssetTagsThunk = (file, text) => {
  return (dispatch) => {
    dispatch(startFileLoad())
    const fileMimeType = file.type; 

    if (fileMimeType === "image/jpeg") {
      dispatch(finishFileLoad())
      return; 
    }

    // HANDLE UPLOADING FILE DATA  
    let data = new FormData()
    data.append('file', file)
    data.append('industry', 'True')
    data.append('technology', 'True')
    data.append('password', 'Cali')

    // CALL TAGGING MICROSERVICE
    axios.post('https://autotagger-rudderlike-notedness.mybluemix.net/attachments', data)
    .then(response => {
      dispatch(getAssetTagsSuccess(response.data))
      dispatch(finishFileLoad())
    })
    .catch(error => {
      dispatch(getAssetTagsFailure(error))
      dispatch(finishFileLoad())
    })
  }
}

export const getAssetTagsFromText = (text) => {
  // HANDLE UPLOADING TEXT DATA 
  let data = new FormData()
  data.append('text', text)
  data.append('industry', 'True')
  data.append('technology', 'True')
  data.append('password', 'Cali')

  // CALL TAGGING MICROSERVICE
  axios.post('https://autotagger-rudderlike-notedness.mybluemix.net/attachments', data)
  .then(response => {
    dispatch(getAssetTagsSuccess(response.data))
  })
  .catch(error => {
    dispatch(getAssetTagsFailure(error))
  })
}

// ===== ASSET ARTIFACT - ADD TO ASSET THUNK ====== //
export const addAssetArtifact = (artifact) => {
  return {
    type: ADD_ASSET_ARTIFACT,
    artifact
  }
}

export const addAssetArtifactThunk = (artifact) => {
  return (dispatch) => {
    const { artifactTitle, artifactType, artifactDescription, artifactURL, confidential } = artifact; 
    const links = ['Demo Video Link','Code Repo','Reference Website']
    const category = links.includes(artifactType) ? 'link' : 'file'; 

    console.log(category); 
    if (category === 'link') {
      let artifactObject = {
        boxFileID: null, 
        artifactTitle: artifactTitle, 
        artifactType: artifactType,
        artifactURL: artifactURL, 
        artifactDescription: artifactDescription, 
        confidential, 
      }
      dispatch(addAssetArtifact(artifactObject))
    } else {
      console.log(artifact); 
      dispatch(uploadFileToBoxThunk(artifact))
    }
  }
}

// ===== ASSET ARTIFACT - UPLOAD TO BOX ====== //
export const uploadFileToBoxRequest = (file, fileName) => {
  return {
    type: UPLOAD_FILE_TO_BOX_REQUEST,
    file, 
    fileName, 
  }
}

export const uploadFileToBoxSuccess = () => {
  return {
    type: UPLOAD_FILE_TO_BOX_SUCCESS,
  }
}

export const uploadFileToBoxFailure = () => {
  return {
    type: UPLOAD_FILE_TO_BOX_FAILURE,
  }
}

export const setAssetFolderID = (assetFolderID) => {
  return {
    type: SET_ASSET_FOLDER_ID,
    assetFolderID
  }
}

export const uploadFileToBoxThunk = ({ file, artifactType, artifactTitle, artifactDescription, confidential }) => {
  return (dispatch, getState) => {
    const state = getState(); 
    let { assetID, assetFolderID, assetTitle } = state.publish; 

    // CREATE FORM DATA FROM FILE 
    let data = new FormData();
    let encodedName = encodeURI(artifactTitle); 
    data.append('file', file); 
    data.append('name', encodedName); 
    data.append('assetID', assetID);

    // NOTE: This is placeholder differentiator for testing purposes to prevent folder collision
    // Comment out the the enclosed lines when ready to deploy
    let date = new Date (); 
    date = JSON.stringify(date).split('T')[1];
    date = date.split('.')[0];  
    assetTitle = assetTitle + date;  
    console.log('FOLDER TITLE: ', assetTitle); 
    // ------------------------------------

    // DETERMINE PROPER ROUTING
    let path = 'https://calibox.mybluemix.net/folder';
    // let path = 'http://localhost:2000/folder'
    if (assetFolderID !== '') {
      path = `${path}/upload/${assetFolderID}`; 
    } else {
      const encodedAssetTitle = encodeURI(assetTitle)
      path = `${path}/create/${encodedAssetTitle}`; 
    }

    // CALL BOX MICROSERVICE
    dispatch(uploadFileToBoxRequest()); 
    fetchBoxMicroservice(path, data)
      .then((response) => {
        dispatch(uploadFileToBoxSuccess())
        // console.log(response); 
        return response.json(); 
      })
      .then((body) => {
        // console.log('RESPONSE FROM UPLOAD TO BOX')
        // console.log(body); 

        // ERROR HANDLING
        if (body.statusCode && body.statusCode !== 200) {
          dispatch(uploadFileToBoxFailure())
          return; 
        }

        // DISPATCH ACTIONS WITH FOLDER INFORMATION
        let { mediaFileID, mediaLink, parentFileID } = body; 
        if (assetFolderID === '') {
          dispatch(setAssetFolderID(parentFileID)); 
        }

        let artifactObject = {
          artifactTitle, 
          artifactType,
          artifactDescription, 
          boxFileID: mediaFileID, 
          artifactURL: mediaLink, 
          confidential, 
        }
        // console.log(artifactObject); 
        dispatch(addAssetArtifact(artifactObject)); 
      })
      .catch((err) => {
        dispatch(uploadFileToBoxFailure())
        console.log(err); 
      }); 
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

export const deleteArtifactThunk = (index) => {
  return (dispatch, getState) => {
    const state = getState(); 
    const artifactFileID = state.publish.artifacts[index].boxFileID; 
    // let path = `http://localhost:2000/folder/delete/${artifactFileID}`
    const deletePath = `https://calibox.mybluemix.net/folder/delete/${artifactFileID}`
    fetchBoxMicroservice(path)
      .then((response) => {
        dispatch(deleteArtifact(index)); 
      })
      .catch((err) => {
        console.log(err); 
      })
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

export const publishAssetRequest = () => {
  return {
    type: PUBLISH_ASSET_REQUEST, 
  }
}

export const publishAssetSuccess = (assetID, assetObject) => {
  return {
    type: PUBLISH_ASSET_SUCCESS,
    assetID, 
    assetObject
  }
}

export const publishAssetFailure = () => {
  return {
    type: PUBLISH_ASSET_FAILURE, 
  }
}

// ===== HANDLE PUBLISH ASSET SERVICE CALLS ====== //
const mapToMongoSchema = (assetObject) => {
  console.log(assetObject); 
  const { assetID, assetTitle, assetType, assetOneLiner, assetDescription, assetOwner, assetContributors, artifacts, technologyTags, industryTags, clientTags } = assetObject; 
  return {
    assetID, 
    assetTitle, 
    assetType, 
    assetOneLiner, 
    assetDescription, 
    assetOwner, 
    assetContributors, 
    artifacts, 
    technologies: technologyTags, 
    industries: industryTags, 
    clients: clientTags
  }
}

export const publishAssetThunk = () => {
  return (dispatch, getState) => {
    const state = getState(); 
    dispatch(publishAssetRequest());
    const assetObject = mapToMongoSchema(state.publish)
    const assetID = assetObject.assetID;  
    console.log(JSON.stringify(assetObject, null, 2)); 
    return mongoSave(assetObject)
    .then((response) => {
      return elasticIndex(assetObject)
    })
    .then((response) => {
      dispatch(publishAssetSuccess(assetID, assetObject))
    })
    .catch((err) => {
      dispatch(publishAssetFailure(err))
    }) 
  }
}