'use strict'

const express = require('express')

// Constants
const PORT = 7070
const HOST = '127.0.0.1'

// const PORT = 8080       // DATOS PARA EL SEVIDOR
// const HOST = '0.0.0.0'

var cors = require('cors')
var url = require('url')
var queryString = require('querystring')

// App
const app = express()
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World4')
})

app.get('/quien', (req, res) => {
  var MongoClient = require('mongodb').MongoClient
  var uri = 'mongodb://admin1:admin@cluster0-shard-00-00-k6sn1.mongodb.net:27017,cluster0-shard-00-01-k6sn1.mongodb.net:27017,cluster0-shard-00-02-k6sn1.mongodb.net:27017/Base1?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
  var myobj = { _id: '69', address: 'desDocker' }

  function Insert (myobj) {
    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
      if (err) throw err
      var dbo = client.db('Base1') // .collection('Base1')

      dbo.collection('Base1').insertOne(myobj, function (err, res) {
        if (err) throw err
        // console.log('ConexiÃ³n establecida')
        console.log('Dato Insertado Correctamente')
        client.close()
      })
      console.log('Conexion Exitosa')
    })
    return true
  }
  Insert(myobj)
  res.send('Hello quien')
})

app.get('/InsertarUS', (req, res) => {
  var theUrl = url.parse(req.url)
  console.log(req.url)
  var queryObj = queryString.parse(theUrl.query)
  console.log(queryObj)
  var obj = JSON.parse(queryObj.jsonData)
  console.log(theUrl)

  var json2 = {
    _id: Math.floor(Math.random() * (999 - 1)) + 1,
    nombre: obj.nombre,
    apellido: obj.apellido,
    direccion: obj.direccion,
    correa: obj.correa,
    contrasena: obj.contrasena,
    nocelular: obj.nocelular,
    dpi: obj.dpi
  }

  var MongoClient = require('mongodb').MongoClient
  var uri = 'mongodb://admin1:admin@cluster0-shard-00-00-k6sn1.mongodb.net:27017,cluster0-shard-00-01-k6sn1.mongodb.net:27017,cluster0-shard-00-02-k6sn1.mongodb.net:27017/Base1?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'

  function Insert (json) {
    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
      if (err) throw err
      var dbo = client.db('Base1') // .collection('Base1')
      dbo.collection('Usuario').insertOne(json, function (err, _res) {
        if (err) throw err
        console.log('Dato Insertado Correctamente')
        client.close()
        return true
      })
      console.log('Conexion Exitosa')
    })
    return true
  }

  Insert(json2)
})

app.use(express.json())
app.post('/InsertarAUTO', (req, res) => {
  // console.log(req.body)
  // console.log(req.body.name)
  var json2 = {
    _id: Math.floor(Math.random() * (999 - 1)) + 1,
    estado: req.body.estado,
    tipo: req.body.tipo,
    marca: req.body.marca,
    linea: req.body.linea,
    modelo: req.body.modelo,
    placa: req.body.placa,
    color: req.body.color,
    arranca: req.body.arranca,
    camina: req.body.camina,
    fallaMecanica: req.body.fallaMecanica,
    garantiaInspeccion: req.body.garantiaInspeccion,
    inundado: req.body.inundado,
    colision: req.body.colision,
    foto: req.body.foto
  }

  var MongoClient = require('mongodb').MongoClient
  var uri = 'mongodb://admin1:admin@cluster0-shard-00-00-k6sn1.mongodb.net:27017,cluster0-shard-00-01-k6sn1.mongodb.net:27017,cluster0-shard-00-02-k6sn1.mongodb.net:27017/Base1?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'

  function Insert (json) {
    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
      if (err) throw err
      var dbo = client.db('Base1') // .collection('Base1')
      dbo.collection('Inventario').insertOne(json, function (err, _res) {
        if (err) throw err
        console.log('Dato Insertado Correctamente')
        client.close()
        return true
      })
      console.log('Conexion Exitosa')
    })
    return true
  }
  Insert(json2)
  res.send('Insertado Correctamente')
})

app.get('/FindAutoAll', (req, res2) => {
  var MongoClient = require('mongodb').MongoClient
  var uri = 'mongodb://admin1:admin@cluster0-shard-00-00-k6sn1.mongodb.net:27017,cluster0-shard-00-01-k6sn1.mongodb.net:27017,cluster0-shard-00-02-k6sn1.mongodb.net:27017/Base1?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
  function buscar (json) {
    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
      if (err) throw err
      var dbo = client.db('Base1')
      dbo.collection('Inventario').find({}).toArray(function (err, res) {
        if (err) throw err
        console.log('Dato Encontrado Correctamente')
        // console.log(res)
        client.close()
        res2.send(res)
      })
    })
  }
  buscar()
})

app.get('/Vehiculo', (req, res2) => {
  // console.log(req.body)
  var theUrl = url.parse(req.url, true)
  // console.log(req.url)
  console.log(theUrl.query)
  var json2 = null
  if (theUrl.query == null) {
    json2 = null
  } else {
    // var queryObj = queryString.parse(theUrl.query)
    // console.log(queryObj)
    var qdata = theUrl.query
    if (qdata._id !== undefined) {
      var parajson = '{' + '\"_id\":' + qdata._id + '}'
      json2 = JSON.parse(parajson)
      // console.log(json2)
    } else if (qdata.placa !== undefined) { // placa
      var parajson = '{' + '\"placa\":' + qdata.placa + '}'
      json2 = JSON.parse(parajson)
      // console.log(json2)
    } else if (qdata.estado !== undefined) {
      var parajson = '{' + '\"estado\":' + qdata.estado + '}'
      json2 = JSON.parse(parajson)
      // console.log(json2)
    }
    // console.log(json2)
  }

  var MongoClient = require('mongodb').MongoClient
  var uri = 'mongodb://admin1:admin@cluster0-shard-00-00-k6sn1.mongodb.net:27017,cluster0-shard-00-01-k6sn1.mongodb.net:27017,cluster0-shard-00-02-k6sn1.mongodb.net:27017/Base1?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'

  function Insert (json) {
    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
      if (err) throw err
      var dbo = client.db('Base1') // .collection('Base1')

      if (json == null) {
        dbo.collection('Inventario').find({}).toArray(function (err, res) {
          if (err) throw err
          console.log('Dato Encontrado Correctamente')
          // console.log(res)
          client.close()
          res2.send(res)
        })
      } else {
        dbo.collection('Inventario').find(json).toArray(function (err, res) {
          if (err) throw err
          console.log('Dato Encontrado Correctamente find')
          // console.log(res)
          client.close()
          if (res.length === 0) {
            var respuesta = JSON.parse('{ "cod":404, "state":"Not found"}')
            res2.send(respuesta)
          } else {
            res2.send(res)
          }
        })
      }
    })
    return true
  }
  Insert(json2)
})

app.get('/Foto', (req, res2) => {
  // console.log(req.body)
  var theUrl = url.parse(req.url, true)
  // console.log(req.url)
  // console.log(theUrl.query)
  var json2 = null
  if (theUrl.query == null) {
    json2 = ''
  } else {
    var qdata = theUrl.query
    // console.log(qdata._id)
    if (qdata._id !== undefined) {
      // console.log('si')
      var parajson = '{' + '\"_id\":' + qdata._id + '}'
      json2 = JSON.parse(parajson)
    }
  }
  // var queryObj = queryString.parse(theUrl.query)
  // // console.log(queryObj)
  // var json2 = JSON.parse(queryObj.jsonData)
  // console.log(json2)

  var MongoClient = require('mongodb').MongoClient
  var uri = 'mongodb://admin1:admin@cluster0-shard-00-00-k6sn1.mongodb.net:27017,cluster0-shard-00-01-k6sn1.mongodb.net:27017,cluster0-shard-00-02-k6sn1.mongodb.net:27017/Base1?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'

  function Insert (json) {
    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
      if (err) throw err
      var dbo = client.db('Base1') // .collection('Base1')
      dbo.collection('Inventario').find(json).toArray(function (err, res) {
        if (err) throw err
        console.log('Dato Encontrado Correctamente')
        // console.log(res)
        client.close()
        if (res.length === 0) {
          var respuesta = JSON.parse('{ "cod":404, "state":"Not found"}')
          res2.send(respuesta)
        } else {
          res2.send(res)
        }
      })
    })
    return true
  }
  Insert(json2)
})

app.get('/Estado', (req, res2) => {
  // console.log(req.body)
  var theUrl = url.parse(req.url, true)
  var json2 = null
  if (theUrl.query == null) {
    json2 = ''
  } else {
    var qdata = theUrl.query
    // console.log(qdata._id)
    if (qdata._id !== undefined) {
      // console.log('si')
      var parajson = '{' + '\"_id\":' + qdata._id + '}'
      json2 = JSON.parse(parajson)
    }
  }
  // console.log(req.url)
  // var queryObj = queryString.parse(theUrl.query)
  // // console.log(queryObj)
  // var json2 = JSON.parse(queryObj.jsonData)
  // console.log(json2)

  var MongoClient = require('mongodb').MongoClient
  var uri = 'mongodb://admin1:admin@cluster0-shard-00-00-k6sn1.mongodb.net:27017,cluster0-shard-00-01-k6sn1.mongodb.net:27017,cluster0-shard-00-02-k6sn1.mongodb.net:27017/Base1?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'

  function Insert (json) {
    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
      if (err) throw err
      var dbo = client.db('Base1') // .collection('Base1')
      dbo.collection('Inventario').find(json).toArray(function (err, res) {
        if (err) throw err
        console.log('Dato Encontrado Correctamente')
        // console.log(res)
        client.close()
        if (res.length === 0) {
          var respuesta = JSON.parse('{ "cod":404, "state":"Not found"}')
          res2.send(respuesta)
        } else {
          res2.send(res)
        }
      })
    })
    return true
  }
  Insert(json2)
})

app.put('/Vehiculo', (req, res2) => {
  // console.log(req.body)
  var theUrl = url.parse(req.url, true)
  console.log(theUrl.query)

  var anews = parseInt(theUrl.query._id)
  var datoid = { _id: anews }
  console.log(datoid)
  // var newdato = '$set: { \"estado\":' + '\"' + req.body.estado + '\"' + ', \"afiliado\":' + '\"' + req.body.afiliado_adjudicado + '\"' + ', \"valor_adjudicado\":' + '\"' + req.body.valor_adjudicado + '\"' + '}'
  var newdato = { $set: { estado: theUrl.query.estado, afiliado: theUrl.query.afiliado_adjudicado, valor_adjudicado: theUrl.query.valor_adjudicado } }
  console.log(newdato)

  var MongoClient = require('mongodb').MongoClient
  var uri = 'mongodb://admin1:admin@cluster0-shard-00-00-k6sn1.mongodb.net:27017,cluster0-shard-00-01-k6sn1.mongodb.net:27017,cluster0-shard-00-02-k6sn1.mongodb.net:27017/Base1?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'

  function update (obj1, newdato) {
    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
      if (err) throw err
      var dbo = client.db('Base1') // .collection('Base1')

      dbo.collection('Inventario').find(obj1).toArray(function (err, res) {
        if (err) throw err
        // console.log('Dato Encontrado Correctamente')
        console.log(res)
        // client.close()
        if (res.length === 0) {
          var respuesta = JSON.parse('{ "cod":404, "state":"Not found"}')
          res2.send(respuesta)
          // console.log('vacio')
        } else {
          dbo.collection('Inventario').updateOne(obj1, newdato, function (err, res) {
            if (err) throw err
            console.log('Dato Encontrado Correctamente')
            // console.log(res)
            client.close()
            var respuesta = JSON.parse('{ "cod":201, "state":"Created"}')
            res2.send(respuesta)
          })
          console.log('Conexion Exitosa')
        }
      })
    })
    return true
  }
  update(datoid, newdato)
})

app.listen(PORT, HOST)
console.log('Servidor levantado http://' + HOST + ':' + PORT)
