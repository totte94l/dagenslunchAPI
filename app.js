const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

// Restauranger
const lillaGomman = require('./scrapes/lillaGomman')
const matoPrat = require ('./scrapes/matoPrat')
const gillet = require('./scrapes/gillet')

//var db = require('./lib/db')
var cron = require('./cron/scrape');

app.get('/', (req, res) => {
    res.send('Cajjans VPS')
})

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

app.get('/gillet/veckomeny', (req, res) => {
    gillet.getMenu().then((menuWeekly) => {
        res.send(menuWeekly)
    })
})

app.listen(PORT, () => {
  console.log(`%cApp listening on http://localhost:${PORT}`, "font-size: 16px; color: green;")
})
