//Init NodeModules and Express server.
var express = require('express');
var app = module.exports = express();
var sql = require('mssql');

const PORT = 5555;

const config = {
    user: '<<USERNAME>>', //Update me
    password: '<<PASSWORD>>', //Update me
    server: '<<LOCALHOST>>', // You can use 'localhost\\instance' to connect to named instance //Update me
    database: '<<DATABASE>>', //Update me
}

//Setting up the server.
app.listen(PORT, function(){
	console.log('Server running at port '+ PORT +': http://127.0.0.1:' + PORT);
})


//Function to connect to database and execute query 
// You can put this on Global Helper or common function.
var executeQuery = function (res, query) {
    sql.connect(dbConfig, function (err) {
        if (err) {
            console.log("Error while connecting database :- " + err);
            res.send(err);
        } else {
            // create Request object
            var request = new sql.Request();
            // query to the database
            request.query(query, function (err, res) {
                if (err) {
                    console.log("Error while querying database :- " + err);
                    res.send(err);
                } else {
                    res.send(res);
                }
            });
        }
    });
}


//get request
app.get("/", function(req , res){
    var query = "SELECT * FROM [TABLE_NAME]";
    executeQuery (res, query);
});