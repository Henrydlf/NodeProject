// Import a module
express = require('express')
app = express()

app.set('port', 3000)

app.get(
    '/:name', 
    (req, res) => res.send("Hello " + req.params.name)
)

app.listen(
  app.get('port'), 
  () => console.log(`server listening on ${app.get('port')}`)
)