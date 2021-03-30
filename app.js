
// Restauranger
const lillaGomman = require('./scrapes/lillaGomman')
const matoPrat = require ('./scrapes/matoPrat')

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

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

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
