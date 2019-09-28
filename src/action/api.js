import Axios from 'axios'
import { dispatch } from '../store'


export const LOADING_PHASE = 'LOADING_PHASE'
export const GET_CONVERSATIONS = 'GET_CONVERSATIONS'
export const SUCCESS_PHASE = 'SUCCESS_PHASE'
export const ERROR_PHASE = 'ERROR_PHASE'

export const SUCCESS = '_SUCCESS'
export const FAILURE = '_FAILURE'
export const REQUEST = '_REQUEST'
export const CLEAR = '_CLEAR'

async function call(type, method, config, store) {
  dispatch({ type: type + REQUEST, payload: { phase: LOADING_PHASE } })
  const headers = (config) ? config.headers : {}
  const request = {
    ...config,
    timeout: 2000,
    method,
    // headers: { ...headers, token: await AsyncStorage.getItem('token') }
  }
  try {
    let payload = await Axios.request(request)
    dispatch({
      type: type + SUCCESS,
      payload: { ...payload, store }
    })
    return payload
  } catch (exception) {
    dispatch({
      type: type + FAILURE,
      payload: exception.response
    })
  }
}

export function clearError(type) {
  dispatch({
    type: type + '_CLEAR'
  })
}

export const get = async (type, url, headers, store) => await call(type, 'get', { url, headers }, store)
export const post = async (type, url, data, headers, store) => await call(type, 'post', { url, data, headers }, store)