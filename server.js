'use strict'

const express = require('express')

// Constants
const PORT = 8080
const HOST = '0.0.0.0'

// const PORT = 8080       // DATOS PARA EL SEVIDOR
// const HOST = '0.0.0.0'

var cors = require('cors')
var url = require('url')
var queryString = require('querystring')

// App
const app = express()
app.use(cors())

// jwt
const jwt = require('jsonwebtoken')
const opts = { algorithms: ['RS256'] }

// public key
var public_key = '-----BEGIN PUBLIC KEY-----\n' +
  'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAOp7P/J9U+6VN+BQDcIWyzvMPVnqmRz5\n' +
  'z6HNUfcDOsSEk2egtxuBBgAF75OlLxMXi/KyNlb5sNy5qIxrTEv8IYMCAwEAAQ==\n' +
  '-----END PUBLIC KEY-----\n'

app.get('/', (req, res) => {
  res.send('Hello World8')
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

app.use(express.json())
app.post('/Login', (req, res2) => {
  // var theUrl = url.parse(req.url)
  var theUrl = url.parse(req.url, true)
  // console.log(theUrl.query.correa)
  // console.log(theUrl.query.tipo)
  var tip = parseInt(theUrl.query.tipo)
  var json2 = {
    correa: theUrl.query.correa,
    contrasena: theUrl.query.contrasena,
    tipo: tip
  }
  console.log(json2)
  var MongoClient = require('mongodb').MongoClient
  var uri = 'mongodb://admin1:admin@cluster0-shard-00-00-k6sn1.mongodb.net:27017,cluster0-shard-00-01-k6sn1.mongodb.net:27017,cluster0-shard-00-02-k6sn1.mongodb.net:27017/Base1?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'

  function Insert (json) {
    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
      if (err) throw err
      var dbo = client.db('Base1') // .collection('Base1')
      dbo.collection('Usuario').find(json).toArray(function (err, res) {
        if (err) throw err
        console.log('Dato Encontrado Correctamente find')
        console.log(res)
        client.close()
        if (res.length === 0) {
          var respuesta = JSON.parse('{ "cod":404, "state":"Not found"}')
          res2.send(respuesta)
        } else {
          res2.send(res)
        }
      })
      console.log('Conexion Exitosa')
    })
    return false
  }
  Insert(json2)
})

app.get('/InsertarUS', (req, res) => {
  console.log(req.body)
  var tip = parseInt(req.body.tipo)
  var json2 = {
    _id: Math.floor(Math.random() * (999 - 1)) + 1,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    direccion: req.body.direccion,
    correa: req.body.correa,
    contrasena: req.body.contrasena,
    nocelular: req.body.nocelular,
    dpi: req.body.dpi,
    tipo: tip
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
        res.send('Cliente Insertado Correctamente')
        return true
      })
      console.log('Conexion Exitosa')
    })
    return false
  }

  Insert(json2)
})

app.post('/InsertarAJ', (req, res) => {
  console.log(req.body)
  var tip = parseInt(req.body.tipo)
  var json2 = {
    _id: Math.floor(Math.random() * (999 - 1)) + 1,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    direccion: req.body.direccion,
    correa: req.body.correa,
    contrasena: req.body.contrasena,
    nocelular: req.body.nocelular,
    dpi: req.body.dpi,
    tipo: tip
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
        res.send('Ajustador Insertado Correctamente')
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
  var estain = parseInt(req.body.estado)
  var subastable2 = parseInt(req.body.subastable)
  var json2 = {
    _id: Math.floor(Math.random() * (999 - 1)) + 1,
    estado: estain,
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
    foto: req.body.foto,
    subastable: subastable2
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
  var theUrl = url.parse(req.url, true)
  var autorizacion = false
  jwt.verify(theUrl.query.jwt, public_key, opts, function (err, decoded) {
    if (err) {
      var respuesta = JSON.parse('{ "cod":403, "err":"El JWT no es valido o no contiene el scope de este servicio"}')
      res2.send(respuesta)
    } else {
      const scope = JSON.parse(decoded.scope)
      // EJEMPLO DE COMO LEER EL SCOPE
      let access = ''
      access = scope.find(element => element.toLowerCase() == 'vehiculo.get')

      if (access != undefined) {
        // SI TIENE ACCESO
        autorizacion = true
      }
    }
  })

  // console.log(req.body)
  // var theUrl = url.parse(req.url, true)
  // console.log(req.url)
  if (autorizacion) {
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
        var stain = parseInt(qdata.estado)
        var parajson = '{' + '\"estado\":' + stain + '}'
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
            var resull = { response: res }
            res2.send(resull)
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
              var resull = { response: res }
              res2.send(resull)
              // res2.send(res)
            }
          })
        }
      })
      return true
    }
    Insert(json2)
  }
})

app.get('/Foto', (req, res2) => {
  // console.log(req.body)
  var theUrl = url.parse(req.url, true)
  var autorizacion = false
  jwt.verify(theUrl.query.jwt, public_key, opts, function (err, decoded) {
    if (err) {
      var respuesta = JSON.parse('{ "cod":403, "err":"El JWT no es valido o no contiene el scope de este servicio"}')
      res2.send(respuesta)
    } else {
      const scope = JSON.parse(decoded.scope)
      // EJEMPLO DE COMO LEER EL SCOPE
      let access = ''
      access = scope.find(element => element.toLowerCase() == 'vehiculo.get')

      if (access != undefined) {
        // SI TIENE ACCESO
        autorizacion = true
      }
    }
  })
  // console.log(req.url)
  // console.log(theUrl.query)
  if (autorizacion) {
    var json2 = null
    if (theUrl.query == null) {
      json2 = ''
    } else {
      var qdata = theUrl.query
      // console.log(qdata._id)
      if (qdata._id !== undefined) {
        var pp = parseInt(qdata._id)
        // console.log('si')
        var parajson = '{' + '\"_id\":' + pp + '}'
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
            var resull = { response: res }
            res2.send(resull)
            // res2.send(res)
          }
        })
      })
      return true
    }
    Insert(json2)
  }
})

app.get('/Estado', (req, res2) => {
  // console.log(req.body)
  var theUrl = url.parse(req.url, true)
  var autorizacion = false
  jwt.verify(theUrl.query.jwt, public_key, opts, function (err, decoded) {
    if (err) {
      var respuesta = JSON.parse('{ "cod":403, "err":"El JWT no es valido o no contiene el scope de este servicio"}')
      res2.send(respuesta)
    } else {
      const scope = JSON.parse(decoded.scope)
      // EJEMPLO DE COMO LEER EL SCOPE
      let access = ''
      access = scope.find(element => element.toLowerCase() == 'vehiculo.get')

      if (access != undefined) {
        // SI TIENE ACCESO
        autorizacion = true
      }
    }
  })

  if (autorizacion) {
    var json2 = null
    if (theUrl.query == null) {
      json2 = ''
    } else {
      var qdata = theUrl.query
      // console.log(qdata._id)
      if (qdata.estado !== undefined) {
        // console.log('si')
        var pp = parseInt(qdata.estado)
        var parajson = '{' + '\"estado\":' + pp + '}'
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
            var resull = { response: res }
            res2.send(resull)
            // res2.send(res)
          }
        })
      })
      return true
    }
    Insert(json2)
  }
})

app.put('/Vehiculo', (req, res2) => {
  // console.log(req.body)
  var theUrl = url.parse(req.url, true)
  var autorizacion = false
  jwt.verify(theUrl.query.jwt, public_key, opts, function (err, decoded) {
    if (err) {
      var respuesta = JSON.parse('{ "cod":403, "err":"El JWT no es valido o no contiene el scope de este servicio"}')
      res2.send(respuesta)
    } else {
      const scope = JSON.parse(decoded.scope)
      // EJEMPLO DE COMO LEER EL SCOPE
      let access = ''
      access = scope.find(element => element.toLowerCase() == 'vehiculo.get')

      if (access != undefined) {
        // SI TIENE ACCESO
        autorizacion = true
      }
    }
  })
  if (!autorizacion) {
    console.log(theUrl.query)

    var anews = parseInt(theUrl.query._id)
    var datoid = { _id: anews }
    console.log(datoid)
    // var newdato = '$set: { \"estado\":' + '\"' + req.body.estado + '\"' + ', \"afiliado\":' + '\"' + req.body.afiliado_adjudicado + '\"' + ', \"valor_adjudicado\":' + '\"' + req.body.valor_adjudicado + '\"' + '}'
    var newdato = ''
    if (theUrl.query.afiliado_adjudicado == undefined && theUrl.query.valor_adjudicado == undefined) {
      var estain = parseInt(theUrl.query.estado)
      newdato = { $set: { estado: estain } }
    } else if (theUrl.query.valor_adjudicado == undefined) {
      newdato = { $set: { estado: theUrl.query.estado, afiliado: theUrl.query.afiliado_adjudicado } }
    } else if (theUrl.query.afiliado_adjudicado == undefined) {
      var estain = parseInt(theUrl.query.estado)
      newdato = { $set: { estado: estain, valor_adjudicado: theUrl.query.valor_adjudicado } }
    }
    // newdato = { $set: { estado: theUrl.query.estado, afiliado: theUrl.query.afiliado_adjudicado, valor_adjudicado: theUrl.query.valor_adjudicado } }
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
              // var respuesta = JSON.parse('{ "cod":201, "state":"Created"}')
              var resull = { response: true }
              res2.send(resull)
            })
            console.log('Conexion Exitosa')
          }
        })
      })
      return true
    }
    update(datoid, newdato)
  }
})

app.listen(PORT, HOST)
console.log('Servidor levantado http://' + HOST + ':' + PORT)
