import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import Cookies from 'universal-cookie'

import Link from 'next/link'
import Router from 'next/router'

// import TextField from '@material-ui/core/TextField'
// import Button from '@material-ui/core/Button'

import Layout from '../components/layout.js'

function Account() {
  const cookies = new Cookies()

  const accId = cookies.get('account')
  const uname = cookies.get('name')

  if (uname === undefined) {
    // Router.push('/')
  }
  return (
    <div>
      <Layout>
        <h1>Account Information</h1>
        <p>
          Username: <b>{uname}</b>
        </p>
        <style jsx>{`
          * {
            font-family: 'Arial';
          }

          ul {
            padding: 0;
          }

          li {
            list-style: none;
            margin: 5px 0;
          }

          a {
            text-decoration: none;
            color: blue;
          }

          a:hover {
            opacity: 0.6;
          }
        `}</style>
      </Layout>
    </div>
  )
}
export default Account
