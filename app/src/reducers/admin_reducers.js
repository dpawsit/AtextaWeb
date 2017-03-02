import { ADMIN_LOGIN, SAVE_QUERY_RESULTS, SELECT_SINGLE_QUERY, SAVE_NEW_QUERY, DELETE_ADMIN_QUERY, CHANGE_VIEW, UPDATE_QUERY} from '../actions/admin_actions';

const INITIAL_STATE = {
  adminQueries : [],
  queryResults : {},
  singleQuery : [],
  chartOption : null,
  viewType : 'T'
}

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADMIN_LOGIN: 
      return {...state, adminQueries : action.payload.data}
    
    case SAVE_QUERY_RESULTS:
      return {...state, queryResults : {...state.queryResults, ...action.payload}}

    case SELECT_SINGLE_QUERY:
      return {...state, singleQuery: state.queryResults[action.payload.queryId], chartOption : action.payload.chartOption}

    case SAVE_NEW_QUERY:
      return {...state, adminQueries : [...state.adminQueries, action.payload]}

    case DELETE_ADMIN_QUERY:

      if(action.payload === 'all'){

        return INITIAL_STATE
      } else {

        let newQuery = [...state.adminQueries];
        let newQueryRes = {...state.queryResults}

        action.payload.forEach(deleteId => {
          delete newQueryRes[deleteId];
          for(var i = 0; i < newQuery.length; i++){
            if(newQuery[i].id === deleteId){
              newQuery.splice(i, 1);
            }
          }
        })

        return {...state, adminQueries : newQuery, queryResults : newQueryRes, singleQuery : [], chartOption : null}
      }

    case CHANGE_VIEW:
      return {...state, viewType : action.payload}

    case UPDATE_QUERY:
        let newQuery = [...state.adminQueries];
        let newQueryRes = {...state.queryResults};

        for(var i = 0; i < newQuery.length; i++){
          if(newQuery[i].id === action.payload.id) {
            newQuery[i].chartOption = action.payload.chartOption;
            newQuery[i].queryName = action.payload.name;
            newQuery[i].queryString = action.payload.queryString
          }
        }
        delete newQueryRes[action.payload.id]

      return {...state, adminQueries : newQuery, queryResults : newQueryRes, singleQuery : [], chartOption : null}

    default : return state;
  }
}