import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'

import Link from 'next/link'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import Layout from '../components/layout.js'

function Login() {
  const [uname, setUname] = useState('')
  const [pas, setPas] = useState('')

  function sendData() {
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ Uname: uname, Pas: pas }),
    })
      .then(r => r.json())
      .then(data => {})
  }

  return (
    <div>
      <Layout>
        <h1>Login</h1>

        <TextField
          variant="filled"
          value={uname}
          label="Username"
          onChange={e => setUname(e.target.value)}
        />

        <br />
        <br />

        <TextField
          variant="filled"
          autoComplete="current-password"
          value={pas}
          type="Password"
          label="Password"
          onChange={e => setPas(e.target.value)}
        />

        <br />
        <br />

        <Button
          style={{ textAlign: 'center' }}
          variant="contained"
          color="primary"
          onClick={sendData}
        >
          Login
        </Button>

        <br />
        <br />
        <br />

        <Link href="/signup">
          <a>Signup</a>
        </Link>

        <style jsx>{`
          h1,
          h2,
          a {
            font-family: 'Arial';
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
export default Login