var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id : 1,
	description : 'Interview at 12',
	check : false
},{
	id : 2,
	description : 'Assignment Submission',
	check : false
},{
	id : 3,
	description : 'Bug fixes and performance improvements on iOS Apps',
	check : true
}];


app.get('/', function (request,response) {
	response.send('Todo API SETUP: ROOT FOLDER');
});

app.get('/todos', function (request,response) {
	response.json(todos);
});

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