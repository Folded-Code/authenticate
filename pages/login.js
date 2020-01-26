import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import Cookies from 'universal-cookie'
import shajs from 'sha.js'

import Link from 'next/link'
import Router from 'next/router'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import Layout from '../components/layout.js'

import '../public/styles.css'

function Login() {
  const cookies = new Cookies()

  const [uname, setUname] = useState('')
  const [pas, setPas] = useState('')
  const [createErr, setCreateErr] = useState('')

  function sendData() {
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify({
        uname: uname,
        pas: shajs('sha256')
          .update(pas)
          .digest('hex'),
      }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.validLogin) {
          // setCreateErr('Login Successful')
          // setTimeout(() => setCreateErr(''), 3000)
          cookies.set('account', data.id, { path: '/' })
          cookies.set('name', data.name, { path: '/' })
          Router.push('/')
        } else {
          setCreateErr('Login Failed')
          setTimeout(() => setCreateErr(''), 3000)
        }
      })
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
          type="password"
          label="password"
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

        <p>
          {createErr.length !== 0 ? (
            <>
              <br />
            </>
          ) : null}
          {createErr}
        </p>

        <br />

        <Link href="/signup">
          <a>Signup</a>
        </Link>
      </Layout>
    </div>
  )
}
export default Login
