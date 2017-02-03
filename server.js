var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

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
	var matchID = _.findWhere(todos,{id: todoID});

	if (matchID){
		response.json(matchID);
	} else {
		response.status(404).send();
	}

});

//POST/todos

app.post('/todos', function (request,response) {
	var body = _.pick(request.body, 'desc', 'completed');

	if(!_.isBoolean(body.completed) || !_.isString(body.desc) || body.desc.trim().length === 0) {

		return response.status(404).send();
	}
	body.desc = body.desc.trim();

	body.id = todoNextId++;
	todos.push(body); 
	console.log(body);
	response.json(body);

});

//DELETE/todos
app.delete('/todos/:id',function (request,response){
	var todoID = parseInt(request.params.id,10);
	var matchID = _.findWhere(todos,{id: todoID});
	if(!matchID) {
		response.status(404).json({"error":"No Todoitem matched"});
	} else {
		todos = _.without(todos, matchID);
		response.json(matchID);
	}
});

app.put('/todos/:id', function (request,response) {

	var todoID = parseInt(request.params.id,10);
	var matchID = _.findWhere(todos,{id: todoID});
	var body = _.pick(request.body, 'desc', 'completed');
	var validAtt = [];

	if(!matchID){
		return response.status(404).send();
	}

	if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
		validAtt.completed = body.completed;
	} else if (body.hasOwnProperty('completed')){
		return response.status(400).send();
	}

	if (body.hasOwnProperty('desc') && _.isString(body.desc) && body.desc) {
		validAtt.desc = body.desc;
	}else if (body.hasOwnProperty('desc')) {
		return response.status(400).send();
	}

	_.extend(matchID,validAtt);
	response.json(matchID);
})

app.listen(PORT, function() {
	console.log('Express Deployed on port : ' + PORT );
});