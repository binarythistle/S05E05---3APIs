const express = require('express');
const db = require('./database');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/api/todos', (req, res) => {
    var sql = 'select * from todos;';
    var params = [];

    db.all(sql,params, (err, rows) => {
        if(err) {
            res.status(400).json({ "error": err.message});
        }
        res.status(200).json(rows);
    });
});

app.post('/api/todos/', (req, res) => {
    var errors = [];
    if(!req.body.name) {
        errors.push("No name supplied");
    }

    if(errors.length)
    {
        res.status(400).json({ 'error': errors.join(',')});
        return;
    }

    var data = { 
        name: req.body.name
    }

    var sql = 'INSERT INTO todos (name) VALUES (?);';
    var params = [data.name];

    db.run(sql, params, function(err, result) {
        if(err){
            res.status(400).json({'error': err.message});
        }
        res.status(201).json({
            id: this.lastID,
            name: data.name
        })
    });

});


app.listen(4000, () => {
    console.log('Server running on port 4000');
});