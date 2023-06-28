const express = require('express')
const pool = require('./database')

const app = express()

app.get('/', async (req, res) => {
    const result = await pool.query('SELECT * FROM Special_Word_List')
    res.send(result)
})

app.listen(3000, () => {
    console.log('server running')
})