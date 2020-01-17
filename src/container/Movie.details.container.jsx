import React, { Component } from 'react'
import { fetchDetails } from '../action/omdb'
import css from '../css/movie.details.container.scss'
import RatingItemComponent from '../component/Rating.item.component'

class MovieDetailsContainer extends Component {

  constructor(props) {
    super(props)
    this.state = { details: undefined }
  }

  async componentDidMount() {
    const { match } = this.props
    try {
      const res = await fetchDetails(match.params.id)
      console.log('res', res)
      this.setState({ details: res.data })
    } catch (e) { console.log('error', e) }
  }

  renderRatings() {
    const { Ratings } = this.state.details
    return (
      <div className={css.ratings}>
        {Ratings.map((item, i) => <RatingItemComponent key={i} item={item} />)}
      </div>
    )
  }

  renderInfo() {
    const { Year, Type, Released, Genre } = this.state.details
    return (
      <div className={css.info}>
        <div><b>Year:</b> {Year}</div>
        <div><b>Type:</b> {Type}</div>
        <div><b>Released:</b> {Released}</div>
        <div><b>Genre:</b> {Genre}</div>
      </div>
    )
  }

  render() {
    const { details } = this.state
    if (!details) {
      return (
        <div>Loading</div>
      )
    }
    return (
      <div className={css.container}>
        <div className={css.card}>
          <div className={css.title}>{details.Title}</div>
          <div className={css.details}>
            <img className={css.poster} src={details.Poster} />
            <div className={css.info}>
              {this.renderInfo()}
              {this.renderRatings()}
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default MovieDetailsContainer

// - Title
// - Image
// - Year
// - Type
// - Released
// - Genre
// - Ratings