const fs = require('fs'),
  express = require('express'),
  next = require('next'),
  bodyParser = require('body-parser'),
  shajs = require('sha.js'),
  PORT = process.env.PORT || 3000,
  dev = true, //true / false
  nextApp = next({ dev }),
  handle = nextApp.getRequestHandler(), //part of next config
  info = JSON.parse(fs.readFileSync('./data.json'))
// const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true })
//
// const userSchem = new mongoose.Schema({
//   uname: String,
//   pas: String,
// })
// const User = mongoose.model('User', userSchem)

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
    // console.log(req.body)
    let data = req.body
    let user = info.users.find(
      v => v.uname === data.uname && v.pas === data.pas
    )

    if (user !== undefined) {
      console.log(`Successful Login: ${user.uname}`)
      res.send({
        validLogin: true,
        id: user.id,
        name: user.uname,
      })
    } else {
      console.log('Failed login')
      res.send({
        validLogin: false,
      })
    }
  })

  app.post('/signup', (req, res) => {
    const saveUser = user => {
      info.users.push(user)
      fs.writeFile('./data.json', JSON.stringify(info, null, 2), err => {
        if (err) {
          console.error(err)
        }
      })
    }

    let data = JSON.parse(req.body)

    let gooduname = /^(?=.*[a-z]).{2,20}$/g
    // let goodpas = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,20}$/g

    let isGoodName = gooduname.test(data.uname)
    // let isGoodpas = goodpas.test(data.pas)
    let isDuplicate = info.users.some(v => v.uname == data.uname)

    if (isGoodName /*&& isGoodpas */ && !isDuplicate) {
      const randomString = string_length => {
        let chars =
          '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'
        let randomstring = ''
        for (let i = 0; i < string_length; i++) {
          let rnum = Math.floor(Math.random() * chars.length)
          randomstring += chars.substring(rnum, rnum + 1)
        }
        return randomstring
      }

      const user = { uname: data.uname, pas: data.pas, id: randomString(32) }

      saveUser(user)

      res.send({
        validLogin: true,
        reasons: {
          unam: isGoodName,
          notDuplicate: !isDuplicate,
        },
        id: user.id,
        name: user.uname,
      })
    } else {
      res.send({
        validLogin: false,
        reasons: {
          unam: isGoodName,
          notDuplicate: !isDuplicate,
        },
      })
    }
  })

  app.post('/signout', (req, res) => {
    let data = JSON.parse(req.body)
  })

  app.post('/getUname', (req, res) => {
    let data = JSON.parse(req.body)

    let user = info.users.find(v => v.id === data.id)

    res.send(
      JSON.stringify({ uname: user !== undefined ? user.uname : 'Guest' })
    )
  })

  app.get('*', (req, res) => {
    return handle(req, res) // for all the react stuff
  })

  app.listen(PORT, err => {
    if (err) throw err
    console.clear()
    console.log(`Ready at http://localhost:${PORT}`)
  })
})
