import React, { Component } from 'react'
import css from '../css/header.container.css'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import InputComponent from '../component/input.component';
import Joi from '@hapi/joi'

class ValidationError extends Error {
  constructor(message, obj) {
    super(message); // (1)
    this.name = "ValidationError"; // (2)
    this.obj = obj
  }
}

const schema = Joi.object({
  title: Joi.string().required().error(new ValidationError('required', 'title')),
  year: Joi.number().allow('').min(1000).max(9999).error(new ValidationError('enter valid year', 'year'))
})



class HeaderContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      error: {},
      title: '',
      year: '',
      type: '',
    }

    this.types = [
      { name: 'all', value: '' },
      { name: 'movie', value: 'movie' },
      { name: 'episode', value: 'episode' },
      { name: 'series', value: 'series' }
    ]
  }

  async handleSubmit(event) {
    event.preventDefault();

    const { history } = this.props
    const { title, year } = this.state
    const { options, selectedIndex } = this.refs.select

    this.setState({ error: {} })

    try {
      await schema.validateAsync({ title, year })
      let url = `/search?title=${title}`
      if (year)
        url += `&year=${year}`
      if (options[selectedIndex].value)
        url += `&type=${options[selectedIndex].value}`
      history.push(url)
    } catch (e) {
      const state = { error: {} }
      state.error[e.obj] = e.message
      state[e.obj] = ''
      this.setState(state)
    }
  }

  renderBackButton() {
    return (
      <div className={css.backButton} onClick={() => this.props.history.goBack()}>
        <ArrowBackIosIcon />
      </div>
    )
  }

  render() {
    return (
      <div className={css.container}>
        {this.props.location.pathname != '/movie' && this.renderBackButton()}
        <form onSubmit={this.handleSubmit.bind(this)} className={css.form}>
          <InputComponent
            className={[css.input, css.inputLeft].join(' ')}
            placeholder='title'
            onChange={({ target }) => this.setState({ title: target.value })}
            error={this.state.error.title}
            value={this.state.title}
          />
          <select className={css.select} id='select' ref='select'>
            {this.types.map(type => <option key={type.name} value={type.value}>{type.name}</option>)}
          </select>
          <InputComponent
             className={[css.input, css.inputRight].join(' ')}
            placeholder='year'
            onChange={({ target }) => this.setState({ year: target.value })}
            error={this.state.error.year}
            value={this.state.year}
          />
          <button className={css.button}>Search</button>
        </form>
      </div>
    )
  }
}

export default HeaderContainer