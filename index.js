var express        =        require('express')
var bodyParser     =        require("body-parser");
var app            =        express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));	
app.set('port', (process.env.PORT || 5000))

app.get('/', function (req, res) {
  res.send('Welcome Guys')
})

app.use('/api/categories',require('./route/categories.js'));

app.use('/api/models',require('./route/models.js'));

var server = app.listen(app.get('port'), function () {
   console.log("App is listening at localhost:"+app.get('port'));
})
