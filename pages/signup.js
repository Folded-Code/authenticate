import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import Cookies from 'universal-cookie'

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
      body: JSON.stringify({ Uname: uname, Pas: pas }),
    })
      .then(r => r.json())
      .then(data => {
        if (!data.validLogin) {
          let mess = 'Try Again ('
          if (!data.reasons.unam) {
            mess += 'Invalid Username'
          }
          if (!data.reasons.pas) {
            mess[mess.length - 1] !== '(' ? (mess += ', ') : null
            mess += 'Invalid Password'
          }
          if (!data.reasons.notDuplicate) {
            mess[mess.length - 1] !== '(' ? (mess += ', ') : null
            mess += 'Duplicate Username'
          }
          mess += ')'
          setCreateErr(mess)
        } else {
          cookies.set('account', data.id, { path: '/' })
          console.log(cookies.get('account'))
          console.log(data.id)
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
