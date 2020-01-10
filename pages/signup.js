import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import Cookies from 'universal-cookie'
import shajs from 'sha.js'

import Link from 'next/link'
import Router from 'next/router'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import Layout from '../components/layout.js'

function Signup() {
  const cookies = new Cookies()

  const [uname, setUname] = useState('')
  const [pas, setPas] = useState('')
  const [createErr, setCreateErr] = useState('')

  function sendData() {
    fetch('/signup', {
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
        let goodpas = /^(?=.*[a-z])(?=.*\d).{5,20}$/g
        if (!data.validLogin || !goodpas.test(pas)) {
          let mess = 'Try Again ('
          if (!data.reasons.unam) {
            mess += 'Invalid Username'
          }
          if (!goodpas.test(pas)) {
            mess[mess.length - 1] !== '(' ? (mess += ', ') : null
            mess += 'Invalid password'
          }
          if (!data.reasons.notDuplicate) {
            mess[mess.length - 1] !== '(' ? (mess += ', ') : null
            mess += 'Duplicate Username'
          }
          mess += ')'
          setCreateErr(mess)
        } else {
          cookies.set('account', data.id, { path: '/' })
          cookies.set('name', data.name, { path: '/' })
          setCreateErr('')
          Router.push('/')
        }
      })
  }

  return (
    <div>
      <Layout>
        <h1>Signup</h1>

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
          Signup
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

        <Link href="/login">
          <a>Login</a>
        </Link>

        <style jsx>{`
          * {
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
export default Signup
