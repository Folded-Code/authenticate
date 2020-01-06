import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import Cookies from 'universal-cookie'

import Link from 'next/link'

import Layout from '../components/layout.js'

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
export default App
