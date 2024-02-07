import React, { Component } from 'react'
import loading from './spinnerGif.webp'
export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img className='my-3' src ={loading} width="30" height="30" alt="loading" />
      </div>
    )
  }
}
