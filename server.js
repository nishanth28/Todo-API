var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.post('/todos', function (request,response) {
	var body = request.body;
	body.id = todoNextId++;
	todos.push(body); 
	console.log(body);
	response.json(body);

});

app.get('/', function (request,response) {
	response.send('Todo API SETUP: ROOT FOLDER');
});

//GET/todos
app.get('/todos', function (request,response) {
	response.json(todos);
});


//GET/todos/:id
app.get('/todos/:id', function (request,response) {

	var todoID = parseInt(request.params.id, 10);
	var matchID;

	todos.forEach(function (todo) {
		if (todoID === todo.id){
			matchID = todo;
		}
	});

	if (matchID){
		response.json(matchID);
	} else {
		response.status(404).send();
	}

});

app.listen(PORT, function() {
	console.log('Express Deployed on port : ' + PORT );
});