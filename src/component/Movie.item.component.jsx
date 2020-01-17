import React from 'react'
import css from '../css/movie.item.component.scss'


function MovieItemComponent({ movie, className, onClick }) {
  return (
    <div className={[css.container, className].join(' ')}>
      <img className={css.poster} src={movie.Poster} />
      <div className={css.info}>
        <div><b>Title:</b> {movie.Title}</div>
        <div><b>Type:</b> {movie.Type}</div>
        <div><b>Year:</b> {movie.Year}</div>
        <button className={css.button} onClick={() => onClick(movie.imdbID)}>Details</button>
      </div>

    </div>
  )
}

export default MovieItemComponent