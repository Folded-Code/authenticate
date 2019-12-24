const fs = require('fs'),
  express = require('express'),
  next = require('next'),
  bodyParser = require('body-parser'),
  PORT = process.env.PORT || 3000,
  dev = true, //true / false
  nextApp = next({ dev }),
  handle = nextApp.getRequestHandler(), //part of next config
  info = JSON.parse(fs.readFileSync('./data.json'))
// const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true })
//
// const userSchem = new mongoose.Schema({
//   Uname: String,
//   Pas: String,
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
    let data = JSON.parse(req.body)
    let user = info.users.find(
      v => v.Uname === data.Uname && v.Pas === data.Pas
    )

    if (user !== undefined) {
      res.send({
        validLogin: true,
        id: user.id,
      })
    } else {
      res.send({
        validLogin: false,
      })
    }
  })

  app.post('/signup', (req, res) => {
    const saveUser = user => {
      info.users.push(user)
      console.log(info)
      fs.writeFile('./data.json', JSON.stringify(info, null, 2), err => {
        if (err) {
          console.error(err)
        }
      })
    }

    let goodUname = /^(?=.*[a-z]).{2,20}$/g
    let goodPas = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,20}$/g
    let data = JSON.parse(req.body)

    let isGoodName = goodUname.test(data.Uname)
    let isGoodPas = goodPas.test(data.Pas)
    let isDuplicate = info.users.some(v => v.Uname == data.Uname)

    if (isGoodName && isGoodPas && !isDuplicate) {
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

      const user = { Uname: data.Uname, Pas: data.Pas, id: randomString(32) }

      saveUser(user)

      res.send({
        validLogin: true,
        reasons: {
          unam: isGoodName,
          pas: isGoodPas,
          notDuplicate: !isDuplicate,
        },
        id: user.id,
      })
    } else {
      res.send({
        validLogin: false,
        reasons: {
          unam: isGoodName,
          pas: isGoodPas,
          notDuplicate: !isDuplicate,
        },
      })
    }
  })

  app.post('/getUname', (req, res) => {
    res.send(req.body)
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
