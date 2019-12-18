const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000
const dev = process.env.NODE_DEV !== 'production' //true false
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler() //part of next config
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true })

const userSchem = new mongoose.Schema({
  Uname: String,
  Pas: String,
})
const User = mongoose.model('User', userSchem)

nextApp.prepare().then(() => {
  // express code here
  const app = express()
  app.use(
    bodyParser.text({
      extended: true,
    })
  )
  app.use(
    bodyParser.json({
      extended: false,
    })
  )

  app.post('/login', (req, res) => {
    let goodUname = /^(?=.*[a-z]).{5,}$/g
    let goodPas = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/g
    let data = JSON.parse(req.body)
    if (goodUname.test(data.uname) && goodPas.test(data.pas)) {
      // let users =
    } else {
      res.send({ validLogin: false })
    }
  })

  app.post('/signup', (req, res) => {
    let goodUname = /^(?=.*[a-z]).{5,20}$/g
    let goodPas = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,20}$/g
    let data = JSON.parse(req.body)

    if (goodUname.test(data.Uname) && goodPas.test(data.Pas)) {
      const user = new User({ Uname: data.Uname, Pas: data.Pas })
      console.log(user)
      user.save().then(() => console.log(`New User: ${user.Uname}`))

      res.send({ validLogin: true })
    } else {
      res.send({ validLogin: false })
    }
  })

  app.get('*', (req, res) => {
    return handle(req, res) // for all the react stuff
  })

  app.listen(PORT, err => {
    if (err) throw err
    console.log(`Ready at http://localhost:${PORT}`)
  })
})
