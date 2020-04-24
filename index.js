const http = require('http')

const hostname = '127.0.0.1'
const port = 3000

// const server = http.createServer((req, res) => {
//   res.statusCode = 200
//   res.setHeader('Content-Type', 'text/plain')
//   res.end('Hola Mundo\n')
// })

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`)
// })

var MongoClient = require('mongodb').MongoClient

var uri = 'mongodb://admin1:admin@cluster0-shard-00-00-k6sn1.mongodb.net:27017,cluster0-shard-00-01-k6sn1.mongodb.net:27017,cluster0-shard-00-02-k6sn1.mongodb.net:27017/Base1?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
var myobj = { _id: '14', address: 'Highway 37' }

function Insert (myobj) {
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    if (err) throw err
    var dbo = client.db('Base1') // .collection('Base1')

    dbo.collection('Base1').insertOne(myobj, function (err, res) {
      if (err) throw err
      // console.log('Conexión establecida')
      console.log('Dato Insertado Correctamente')
      client.close()
    })
    console.log('Conexion Exitosa')
  })
  return true
}

function Delete (myobj) {
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    if (err) throw err
    var dbo = client.db('Base1') // .collection('Base1')

    dbo.collection('Base1').deleteOne(myobj, function (err, res) {
      if (err) throw err
      // console.log('Conexión establecida')
      console.log('Dato Eliminado Correctamente')
      client.close()
    })
    console.log('Conexion Exitosa')
  })
  return true
}

function Query (myobj) {
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    if (err) throw err
    var dbo = client.db('Base1') // .collection('Base1')

    dbo.collection('Base1').find(myobj).toArray(function (err, res) {
      if (err) throw err
      console.log('Dato Actualizado Correctamente')
      console.log(res)
      client.close()
    })
    console.log('Conexion Exitosa')
  })
  return true
}

function DeleteCollection (myobj) {
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    if (err) throw err
    var dbo = client.db('Base1') // .collection('Base1')

    dbo.collection('Base1aux').deleteMany(function (err, res) {
      if (err) throw err
      if (res) console.log('Colección Eliminada Correctamente')
      client.close()
    })
    console.log('Conexion Exitosa')
  })
  return true
}

function MergeCollection () {
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    if (err) throw err
    var dbo = client.db('Base1') // .collection('Base1')

    dbo.collection('Base1').aggregate([
      {
        $merge:
            {
              into: 'Base1aux' // a quien le voy agregar la información
            }
      }
    ]).toArray(function (err, res) {
      if (err) throw err
      console.log('Merge realizado con exito')
      client.close()
    })
  })
  return true
}

function CreateCollection () {
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    if (err) throw err
    var dbo = client.db('Base1') // .collection('Base1')

    dbo.createCollection('jeje', function (err, res) {
      if (err) throw err
      if (res) console.log('Colección Creada correctamente')
      client.close()
    })
    console.log('Conexion Exitosa')
  })
  return true
}

module.exports.Insert = Insert
module.exports.Delete = Delete
module.exports.Query = Query
module.exports.DeleteCollection = DeleteCollection
module.exports.MergeCollection = MergeCollection
module.exports.CreateCollection = CreateCollection
// https://www.w3schools.com/nodejs/nodejs_mongodb_join.asp
