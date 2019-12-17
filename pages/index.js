import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Layout from '../components/layout.js'

function App() {
  // Declare a new state variable, which we'll call "count"
  const [uname, setUname] = useState('')
  const [pas, setPas] = useState('')

  function sendData() {}

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

        <style jsx>{`
          h1,
          a {
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
