const express = require('express');
const cors = require('cors');
const app = express();
//const bodyParser = require("body-parser");
const {findOne, insert, deleteOne,create_table,client_end} = require('./route/controller');
const router = require('./route/controller_new');
// var {router} = require('./route/controller');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
require('dotenv').config();

//HTTP當中有GET POST PUT DELETE
app.use('/api/v1',router);
//app.use('/select/:id',router);
// app.use(select);
//app.get('/select/:id',findOne);
// app.post('/insert/:id',insert);
// app.put('/update-data',(req,res)=>{ 
//     res.send('PUT Resquest');
// });
// app.delete('/delete/:id',deleteOne);
// app.get('/',create_table);
// app.get('/end',client_end);

var server = app.listen(5050,function(){
    console.log('Node server is running');
});