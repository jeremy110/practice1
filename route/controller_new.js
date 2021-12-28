const {client} = require('./connect');
var express = require('express');
const router = express.Router();

client.connect(err => {
    if(err) {
        console.error('connection error');
    } else {
        console.log('connected');
    }
});


//select data
router.get('/select/:id', (req, res) => {
    const id = req.params.id;
    const text = `SELECT * FROM ${id}`;
    client.query(text,(_err, _res) => {
        if (_err) {
            console.error(_err);
            res.status(400).send("select error");
            client.end();
            return;
        }
        for (let row of _res.rows) {
            console.log(row);
        }
        res.status(200).send(_res.rows);
        //client.end();
    });
})

//create new data
router.post('/insert/:id', (req, res) => {
    const id = req.params.id;
    var {email,firstname,lastname,age} = req.body;
    const text = 
    `
    INSERT INTO ${id} (email, firstname, lastname, age)
    VALUES ('${email}', '${firstname}', '${lastname}', ${age})
    `;
    client.query(text,(_err, _res) => {
            if(_err) {
                console.error(_err);
                res.status(400).send("insert error");
                client.end();
                return;
            }
            res.status(200).send("insert finish");
            //client.end();
        });
})

//delete data
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const text =`DELETE FROM ${id}`;

    client.query(text,(_err, _res) => {
        if(_err) {
            console.error(_err);
            res.status(400).send("delete error");
            client.end();
            return;
        }
        res.status(200).send("delete finish");
        //client.end();
    });
})

//create table
router.get('/', (req, res) => {
    const text = `
    CREATE TABLE u(
    email       varchar,
    firstName   varchar,
    lastName    varchar,
    age         int
    );`;
    client.query(text,(_err, _res) => {
        if(_err) {
            console.error(_err);
            res.status(400).send("create tabel error");
            client.end();
            return;
        }
        res.status(200).send("create table u");
        //client.end();
    });
})

module.exports = router;