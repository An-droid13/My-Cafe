// server.js
console.log('Server.js is running')

const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
const port =process.env.PORT ||	3000;






MongoClient.connect("mongodb+srv://students:130200@database.5zgbs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('My-Cafe')
    const Collection = db.collection('orders')
    const Collection2 = db.collection('orders_cafe2')
    const Collection3 = db.collection('foods')
    

    app.set('view engine', 'ejs')

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static('public'))



    

   app.listen(port, function() {
    console.log('listening on 3000')
   })



    
   app.get('/', (req, res) => {
    Collection3.find().toArray()
      .then(results => {
        res.render('index.ejs', { foods: results })
      })
      .catch(/* ... */)
  })

 



    app.post('/orders', (req, res) => {
        Collection.insertOne(req.body)
          .then(result => {
              res.redirect('/')
          })
          .catch(error => console.error(error))
      })

    app.post('/orders2', (req, res) => {
        Collection2.insertOne(req.body)
          .then(result => {
              res.redirect('/')
          })
          .catch(error => console.error(error))
      })  
  
      

    



})
.catch(console.error)
      