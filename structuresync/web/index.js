// hello to postmile
var Server = require('./server')
var Routes = require('./routes')

Server.create(Routes.endpoints)
