const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')

const pool = require('./database')

const app = express()

app.use(express.json())
app.use(cors()) 

app.get('/', (req, res) => {
    res.send({ping: 'pong'})
})

app.post('/check', async (req, res) => {
    let specialWord = await pool.query('SELECT * FROM special_word_list');
    if (specialWord.rowCount === 0) { // No existing secret word
        let hashedSecret = await bcrypt.hash(req.body.secretWordInput, 10);
        // console.log({ hashedSecret })
        
            await pool.query('INSERT INTO special_word_list VALUES ($1) RETURNING *', 
                    [hashedSecret])
        res.send(req.body.secretWordInput)
        console.log(req.body.secretWordInput)
        return
    } 
    else {
        let correctInput = await bcrypt.compare(req.body.secretWordInput, specialWord.rows[0].special_word)
        if (correctInput) {
            res.send(true)
        }
        else { 
            res.send(false)
        }
    }
})

app.delete('/reset', async (req, res) => {
    await pool.query('DELETE FROM special_word_list');
    res.send({specialWord: null})
});

app.listen(3000, () => {
    console.log('server running')
})