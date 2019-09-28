import React from 'react'
// import css from '../css/movie.item.component.css'


function RatingItemComponent({ item }) {
  return (
    <div><b>{item.Source}:</b> {item.Value}</div>
    
  )
}

export default RatingItemComponent