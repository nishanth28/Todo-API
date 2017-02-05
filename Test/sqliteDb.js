var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined,undefined,undefined,{
	'dialect': 'sqlite',
	'storage': __dirname + '/sqliteDb.sqlite'
});

var Todo = sequelize.define('todo',{
	desc:{
		type: Sequelize.STRING,
		allowNull: false,
		validate:{
			len: [1,300]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
})


sequelize.sync().then(function () {
	console.log('Works');
	Todo.create({
		desc : 'Work Hard',
	}).then(function (todo) {
		return Todo.create({
			description : 'Need More'
		});
	}).then(function() {
		return Todo.findAll({
			where: {
				completed: '%Hard%'
				}
			});
	}).then(function (todos) {
		if (todos) {
			todos.forEach(function (todo) {
				console.log(todo.toJSON());
			});
		} else {
			console.log('404 Not found:|');
		}
	}).catch(function(error){
		console.log(error);
	});
});
