import axios from 'axios';
export const ADMIN_LOGIN = 'ADMIN_LOGIN';
export const SAVE_QUERY_RESULTS = 'SAVE_QUERY_RESULTS'
export const SELECT_SINGLE_QUERY = 'SELECT_SINGLE_QUERY'
export const SAVE_NEW_QUERY = 'SAVE_NEW_QUERY';
export const DELETE_ADMIN_QUERY = 'DELETE_ADMIN_QUERY';
export const CHANGE_VIEW = 'CHANGE_VIEW'


export function adminLogin (){
  let request = axios.get('/admin/getAdminQueries')
  return {
    type : ADMIN_LOGIN,
    payload : request
  }
}

export function saveQueryResults (queryResults){
  return {
    type : SAVE_QUERY_RESULTS,
    payload : queryResults
  }
}

export function selectSingleQuery (queryId){
  return {
    type : SELECT_SINGLE_QUERY,
    payload : queryId
  }
}

export function saveNewQuery (newQuery) {
  return {
    type : SAVE_NEW_QUERY,
    payload : newQuery
  }
}

export function deleteAdminQuery (queryIds) {
  return {
    type : DELETE_ADMIN_QUERY,
    payload : queryIds
  }
}

export function changeView (view) {
  return {
    type : CHANGE_VIEW,
    payload : view
  }
}