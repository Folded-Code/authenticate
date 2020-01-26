import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import Cookies from 'universal-cookie'

import Link from 'next/link'

import Layout from '../components/layout.js'
import Post from '../components/post.js'

import '../styles.css'

function App() {
  const cookies = new Cookies()

  const accId = cookies.get('account')
  const uname = cookies.get('name')

  return (
    <div>
      <Layout>
        <h1>Home</h1>

        <p>
          Wellcome <b>{uname}</b>
          {uname === undefined ? (
            <>
              <b>Guest</b>, You can login{' '}
              <Link href="/login">
                <a>Here</a>
              </Link>
            </>
          ) : (
            ''
          )}
        </p>

        <div>
          <h3>Posts:</h3>
          <Post />
        </div>
      </Layout>
    </div>
  )
}
export default App
