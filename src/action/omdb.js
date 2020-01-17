import { get } from './api'

export const OMDB_FETCH_DATA = 'OMDB_FETCH_DATA'
export const OMDB_FETCH_DETAILS = 'OMDB_FETCH_DETAILS'

const BASE_URL = 'http://www.omdbapi.com'
const KEY = '263f0afc' // enter your key here

export async function fetchData(title, year, type, page) {
  let url = `${BASE_URL}/?s=${title}&apikey=${KEY}`
  if (type)
    url += `&type=${type}`
  if (year)
    url += `&y=${year}`
  if (page) {
    url += `&page=${page}`
  }
  return await get(OMDB_FETCH_DATA, url)
}

export async function fetchDetails(id) {
  return await get(OMDB_FETCH_DETAILS, 'http://www.omdbapi.com/?i=' + id + '&apikey=263f0afc&type=movie')
}