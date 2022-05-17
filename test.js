const dotenv = require("dotenv")
const express = require('express')
const path = require("path")
const fs = require("fs")
const app = express()
const port = 80


const { MongoClient } = require('mongodb')
const client = new MongoClient("mongodb://zulf:pekmafn@mongo:27017/")
// const client = new MongoClient("mongodb://localhost:27017/zulf")

dotenv.config()
const cors = require('cors');
app.use(cors());
app.options('*', cors());

console.log(process.env.ME_CONFIG_MONGODB_URL)

// const start = async () => {
//    try {
//       await client.connect()
//       console.log("Подключен к БД")
//       lessonse = client.db().collection('lessonse')
//       lessonse.insertOne({ name: "zulf", age: "20" })
//       console.log("Успешно записано")
//       zulf = await lessonse.find({ name: "zulf", }).toArray();

//       console.log(zulf)


//    }
//    catch (e) {
//       console.log(e)
//    }

// }
// start()
app.use(express.json())
app.use(express.static('client'));


app.get('/', (req, res) => {
   res.status(200)
   res.sendFile(path.join(__dirname, "src", "index.html"))

})

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})

app.get('/api/lessonse', (req, res) => {

   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
   res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080")
   res.status(200)
   const getLessonse = async () => {
      try {
         await client.connect()
         console.log("Подключен к БД")
         lessonse = client.db().collection('lessonse')
         const lessonseArr = await lessonse.find().sort({ lessonStart: 1 }).toArray();
         res.send(JSON.stringify(lessonseArr))


      }
      catch (e) {
         console.log(e)
      }

   }
   getLessonse()


})

app.post('/add', (req, res) => {
   res.status(200)
   console.log(req.body)
   res.send("получил данные")


   const pushLessonse = async () => {
      try {


         await client.connect()
         console.log("Подключен к БД")
         lessonse = client.db().collection('lessonse')
         await lessonse.insertMany(req.body);



      }
      catch (e) {
         console.log(e)
      }

   }
   pushLessonse()

})


