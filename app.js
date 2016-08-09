var web = require('express')();
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const bodyParser = require('body-parser')

// App setup stuff
var db = [],
	quoteSchema = mongoose.Schema({
		Title : String,
		Author : String
	}),
	QuoteModel = mongoose.model('Quote', quoteSchema),
	PORT = 8080;

//Mongoose promise fallback
mongoose.Promise = require('bluebird');

//Body parser fun.
web.use(bodyParser.urlencoded({ extended: false }))
web.use(bodyParser.json())

//Connect to the DB
mongoose.connect('mongodb://localhost:27017/quote', (err, database) => {
	web.listen(PORT, () => {
		console.log('Turned On');
	});
	db = database;
});

//Returns back a list of all quotes in the system.
//URL :  /
web.get('/', function (req, res){
	QuoteModel.find((err,quotes)=>{
		res.send(quotes);
	})
});

//Goal : Get an item by an id.
//URL : /FindById/{ID}/
web.get('/FindById/:id', function(req, res){
	var id = req.params.id;
	QuoteModel.findById(id, (err,quote) => {
		res.send(quote);
	});
});

//Creates a new quote.
//URL : /create
//Data : Title/Author
web.post('/create', (req,res) => {
	var CreateQuote = new QuoteModel({
		Title : req.body.title,
		Author : req.body.author
	}).save((err, Quote) => {
		res.send('Added');
	});
});

//Deletes a post
//URL : /remove
//Data : id
web.get('/remove/:id', (req, res)=>{
	var id = req.params.id;
	QuoteModel.findOneAndRemove({_id:id}, (err) => {
		res.send('Deleted');
	});
});

//Updates a quote.
//URL : /update
//Data : id/author/title
web.post('/update', (req,res) => {
	var id = req.body.id,
		Title = req.body.title,
		Author = req.body.author;

	QuoteModel.findById(id, (err,quote) => {
		quote.Title = Title;
		quote.Author = Author;

		quote.save((err,quote) => {
			res.send('Saved');
		});
	});
});

console.log('Running on http://localhost:' + PORT);
