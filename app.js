
// Restauranger
const lillaGomman = require('./scrapes/lillaGomman')
const matoPrat = require ('./scrapes/matoPrat')

const express = require('express')
const app = express()
const port = 3000

app.get('/matoprat/veckomeny', (req, res) => {
    matoPrat.getMenu().then((menuWeekly) => {
        res.send(menuWeekly)
    })
})

app.get('/lillagomman/veckomeny', (req, res) => {
    lillaGomman.getMenu().then((menuWeekly) => {
        res.send(menuWeekly)
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
