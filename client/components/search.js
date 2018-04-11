import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid, Header, Label} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import history from '../history'
import PropTypes from 'prop-types'

class SearchBar extends Component {
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => history.push(`/artists/${result.id}`)

  handleSearchChange = (e, { value }) => {
    const {artist} = this.props

    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.fullname)

      this.setState({
        isLoading: false,
        results: _.filter(artist, isMatch),
      })
    }, 500)
  }

  render() {
    const { isLoading, value, results } = this.state
    const artist = { fullname: this.props.artist }
    const resultRenderer = ({ fullname }) => <Label content={fullname} />

    resultRenderer.propTypes = {
      fullname: PropTypes.string,
      description: PropTypes.string,
    }

    return (
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            results={results}
            value={value}
            resultRenderer={resultRenderer}
            {...this.props}
          />
        // line 55 - causing an error, taking out doesnt break search bar but may cause other errors
        )
      }
    }

/// CONTAINER ///

const mapStateToProps = ({artist}) => {
  return {
    artist
  }
}

export default connect(mapStateToProps)(SearchBar)
