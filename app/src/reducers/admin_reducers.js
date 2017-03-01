import { ADMIN_LOGIN, SAVE_QUERY_RESULTS, SELECT_SINGLE_QUERY, SAVE_NEW_QUERY, DELETE_ADMIN_QUERY} from '../actions/admin_actions';

const INITIAL_STATE = {
  adminQueries : [],
  queryResults : {},
  singleQuery : []
}

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADMIN_LOGIN: 
      return {...state, adminQueries : action.payload.data}
    
    case SAVE_QUERY_RESULTS:
      return {...state, queryResults : {...state.queryResults, ...action.payload}}

    case SELECT_SINGLE_QUERY:
      return {...state, singleQuery: state.queryResults[action.payload]}

    case SAVE_NEW_QUERY:
      return {...state, adminQueries : [...state.adminQueries, action.payload]}

    case DELETE_ADMIN_QUERY:

      if(action.payload === 'all'){
        return INITIAL_STATE
      } else {
        let newQuery = [...state.adminQueries];
        let newQueryRes = {...state.queryResults};
        console.log('newQuery before: ', newQuery)
        action.payload.forEach(id => {
          console.log('id', id, 'index', newQuery.indexOf(id));
          newQuery.splice(newQuery.indexOf(id), 1)
          delete  newQueryRes[id]
        })
        console.log('after: ', newQuery)

        return {...state, adminQueries : newQuery, queryResults : newQueryRes}
      }


    default : return state;
  }
}