// Import a module
express = require('express')
path = require('path')
app = express() 

app.use(express.static(path.join(__dirname, 'public')))

app.set('port', 3000) 
app.set('views', __dirname + "/views")
app.set('view engine', 'ejs');   

app.get(
  '/Login', 
  (req, res) => res.render('pages/Login.ejs')
)

app.get(
  '/:name', 
  (req, res) => res.render('pages/UserPage.ejs', {name: req.params.name})
)

app.get(
  '/', 
  (req, res) => res.render('pages/HomePage.ejs')
)

app.listen(
  app.get('port'), 
  () => console.log(`server listening on ${app.get('port')}`)
)