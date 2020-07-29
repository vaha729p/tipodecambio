const request = require("request");
const express = require("express");
const app=express();

const  token='22516667d66a172f7c15b2115a980f1f9aee8ce8a441b3a4366696c675a19a9d';
var port=process.env.SERVERPORT || 8080
var serverip=process.env.SERVERIP || '0.0.0.0'

app.get('/tipocambio', (req, res) => {


    var valor = req.query.moneda;
    var serie;
    var divisa;

    switch (valor) {
      case 'euro':
         divisa='Euro';
         serie='SF46410';
         break;
      case 'dolar':
         divisa='Dolar';
         serie='SF60653';
         break;
      default:
       res.send('No existe la moneda');
       break;
     }


  request.get("https://www.banxico.org.mx/SieAPIRest/service/v1/series/"+serie+"/datos/oportuno?token="+token+"",
    (error, response, body) => {
        if(error) {
            return console.log(error);
        }
        var obj;

        obj=JSON.parse(response.body);
        console.log(obj);
        const infor = {
            "Divisa": divisa,
            "Fecha": obj.bmx.series[0].datos[0].fecha,
            "Tipo_cambio":obj.bmx.series[0].datos[0].dato,
        }

       return  res.send(infor);
    });

});




app.listen(port, serverip, function(req, res) {
   console.log("Servicios busqueda LDAP activo, en puerto 9017");
});



