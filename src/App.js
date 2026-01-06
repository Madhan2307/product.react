import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Post from './Post'
import Get from './Get'


export class app extends Component {
  render() {
    return (
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<Post />} />
             <Route path='/details' element={<Get />} />
          </Routes>
        </Router>
      </div>
    )
  }
}

export default app