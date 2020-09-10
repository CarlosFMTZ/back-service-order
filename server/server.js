const express = require('express'),
      bodyParser = require('body-parser'),
      admin = require('firebase-admin'),
      serviceAccount = require('../orderservicebd-firebase-adminsdk-6im9p-b7bdd14ef2.json'),
      app = express();

const port = process.env.PORT || 3000;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://orderservicebd.firebaseio.com/'
})

var db = admin.database();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/post',(req,res)=>{
    const body = req.body;
    newUser = {
        firtsName: body.firtsName,
        lastName:body.lastName,
        email: body.email
    };
    db.ref("Users").push(newUser);
    res.json({
        ok:true,
        body
    })
})

app.get('/',(req,res)=>{
    res.send('Hola eduardo')
})

app.listen(port,(req, res) =>{
    console.log('Esta vivo el servidor');
    console.log(`Listen in port ${port}`);
})