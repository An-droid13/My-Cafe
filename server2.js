// server2.js
console.log('Server2.js is running')

const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
const port =process.env.PORT ||	4000;




MongoClient.connect("mongodb+srv://students:130200@database.5zgbs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('My-Cafe')
    const Collection = db.collection('orders')
 

    app.set('view engine', 'ejs')

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static('public'))



    

  app.listen(port, function() {
    console.log('listening on 4000')
   })

  app.get('/', (req, res) => {
    db.collection('orders').find().toArray()
      .then(results => {
        res.render('index2.ejs', { orders: results })
      })
      .catch(/* ... */)
  })


  app.put('/orders', (req, res) => {
    Collection.updateMany({}, 
    {
      $set:{status: "Orders accepted"}
      

    },
    { upsert: true 
    }
    )
      .then(result => {
        console.log(result)
       })
      .catch(error => console.error(error))
})





   app.delete('/orders', (req, res) => {
    Collection.deleteMany({},
      {
        status: "Orders accepted"
      },
      
    )
      .then(result => {
        if (result.deletedCount === 0) {
          return res.json('No orders to delete')
        }
        res.json('Deleted all Cafe 1\'s orders')
      })
      .catch(error => console.error(error))
  })

  

















})
.catch(error => console.error(error))