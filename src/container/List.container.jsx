import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createLoadingSelector, createErrorMessageSelector } from '../reducer/selectors';
import MovieItemComponent from '../component/Movie.item.component';
import css from '../css/list.container.scss'
import queryString from 'query-string'
import { fetchData } from '../action/omdb'

class ListContainer extends Component {

  componentDidMount() {
    const { title, year, type, page } = queryString.parse(this.props.location.search)
    if (title) {
      fetchData(title, year, type, page)
    }
  }

  componentWillReceiveProps(props) {
    if (props.location.search != this.props.location.search) {
      const { title, year, type, page } = queryString.parse(props.location.search)
      if (title) {
        fetchData(title, year, type, page)
      }
    }
  }

  redirect(page) {
    const { location, history } = this.props
    const parsed = queryString.parse(location.search)
    parsed.page = page
    history.push('/search?' + queryString.stringify(parsed))
    window.scrollTo(0, 0)
  }

  renderNavigation() {
    const { page = 1 } = queryString.parse(this.props.location.search)
    return (
      <div className={css.navigationContainer}>
        {page > 0 &&
          <button
            className={css.buttonLeft}
            onClick={() => this.redirect(parseInt(page) - 1)}
          >
            Previous
          </button>
        }
        <button
          className={css.buttonRight}
          onClick={() => this.redirect(parseInt(page) + 1)}
        >
          Next
        </button>
      </div>
    )
  }

  renderLoading() {
    return <div className={css.loading}>Loading</div>
  }

  renderTotalResults(totalResults) {
    return (
      <div className={css.count}><b>Found:</b> {totalResults} results</div>
    )
  }

  render() {
    const { isFetching, search, history, isError, totalResults } = this.props
    if (totalResults == 0 && isFetching) {
      return (
        <div className={css.container}>
          {this.renderLoading()}
        </div>
      )
    }
    else if (isError) {
      return <div>Error: {isError}</div>
    }
    return (
      <div className={css.container}>
        {isFetching && this.renderLoading()}
        {this.renderTotalResults(totalResults)}
        {search.map(movie =>
          <MovieItemComponent
            onClick={(id) => history.push(`/movie/${id}`)}
            className={css.movieItem}
            key={movie.imdbID}
            movie={movie} />
        )
        }
        {totalResults > 0 && this.renderNavigation()}
      </div>
    )
  }
}

const loadingSelector = createLoadingSelector(['OMDB_FETCH_DATA']);
const errorSelector = createErrorMessageSelector(['OMDB_FETCH_DATA'])

function mapStateToProps(state) {
  return {
    isError: errorSelector(state),
    isFetching: loadingSelector(state),
    search: state.omdb.Search,
    totalResults: state.omdb.totalResults
  }
}


export default connect(mapStateToProps)(ListContainer)