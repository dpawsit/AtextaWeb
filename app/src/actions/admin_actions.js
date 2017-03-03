import axios from 'axios'
export const ADMIN_LOGIN = 'ADMIN_LOGIN'
export const SAVE_QUERY_RESULTS = 'SAVE_QUERY_RESULTS'
export const SELECT_SINGLE_QUERY = 'SELECT_SINGLE_QUERY'
export const SAVE_NEW_QUERY = 'SAVE_NEW_QUERY'
export const DELETE_ADMIN_QUERY = 'DELETE_ADMIN_QUERY'
export const CHANGE_VIEW = 'CHANGE_VIEW'
export const UPDATE_QUERY = 'UPDATE_QUERY'
export const AUTHENTICATE_ADMIN = 'AUTHENTICATE_ADMIN'
export const ADMIN_LOGOUT = 'ADMIN_LOGOUT'
export const REFRESH_PANEL = 'REFRESH_PANEL'

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

export function selectSingleQuery (queryId, chartOption){
  return {
    type : SELECT_SINGLE_QUERY,
    payload : {queryId, chartOption}
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

export function updateQuery (updateQuery) {
  return {
    type : UPDATE_QUERY,
    payload :  updateQuery
  }
}

export function authenticateAdmin (adminId, adminToken) {
  return {
    type : AUTHENTICATE_ADMIN,
    payload : {adminId : adminId, adminToken : adminToken}
  }
}

export function adminLogout (){
  return {
    type : ADMIN_LOGOUT,
    payload : null
  }
}

export function refreshPanel (){
  return {
    type : REFRESH_PANEL,
    payload : null
  }
}