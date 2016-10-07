var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var morgan = require('morgan');
var multer = require('multer');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var upload = multer({ dest: './public/user_img/' })
app.use(morgan('combined'));

var db_config = {
		host 	 : 'us-cdbr-iron-east-04.cleardb.net',
		user 	 : 'bb1f84da0b6428',
		password : 'f7cbf300',
		database : 'heroku_59d4cdfdabbc8e9'
};



function handleDisconnect() {
	  connection = mysql.createConnection(db_config); // Recreate the connection, since
	                                                  // the old one cannot be reused.

	  connection.connect(function(err) {              // The server is either down
	    if(err) {                                     // or restarting (takes a while sometimes).
	      console.log('error when connecting to db:', err);
	      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
	    }                                     // to avoid a hot loop, and to allow our node script to
	  });                                     // process asynchronous requests in the meantime.
	                                          // If you're also serving http, display a 503 error.
	  connection.on('error', function(err) {
	    console.log('db error', err);
	    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
	      handleDisconnect();                         // lost due to either server restart, or a
	    } else {                                      // connnection idle timeout (the wait_timeout
	      throw err;                                  // server variable configures this)
	    }
	  });
	}

handleDisconnect();
/*connection.query('DROP TABLE user_saves',
function(err, result){
	// Case there is an error during the creation
	if(err) {
	console.log(err);
	} else {
	console.log("Table user_saves dropped");
	}
	});
connection.query('DROP TABLE saves',
		function(err, result){
			// Case there is an error during the creation
			if(err) {
			console.log(err);
			} else {
			console.log("Table saves dropped");
			}
			});
connection.query('CREATE TABLE user_saves (user_id int auto_increment, ip VARCHAR(100),' +
        'save1 int, save2 int, save3 int, save4 int, save5 int, save6 int, PRIMARY KEY(user_id))',
function(err, result){
// Case there is an error during the creation
if(err) {
console.log(err);
} else {
console.log("Table user_saves Created");
}
});
connection.query('CREATE TABLE saves (save_id int auto_increment,' +
        'save VARCHAR(65535), PRIMARY KEY(save_id))',
function(err, result){
// Case there is an error during the creation
if(err) {
console.log(err);
} else {
console.log("Table saves Created");
}
});
/*connection.query('CREATE TABLE saves (save_id int, save_group int,' +
        'img_location VARCHAR(100), text VARCHAR(100), left_shift int, top_shift int, angle_shift int, width int, height int, fontFamily VARCHAR(100), fill VARCHAR(100), PRIMARY KEY(save_id))',
function(err, result){
// Case there is an error during the creation
if(err) {
console.log(err);
} else {
console.log("Table saves Created");
}
});*/




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.post('/save', function (req, res, next) {
	var ipAdd = req.headers['x-forwarded-for'];
	console.log(ipAdd);
	//console.log(req.body);
	var post = {save: req.body.objectData};
	var insert;
	var empty = '{"objects":[],"background":"rgba(0, 0, 0, 0)"}';
	var fail = false;
	var save = 0;
	connection.query('INSERT INTO saves SET ?', post,
		function(err, result){
		// Case there is an error during the creation
		if(err) {
			console.log(err);
		} else {
			insert = result.insertId;
		}
	});
	connection.query("SELECT * FROM user_saves WHERE ip='"+ipAdd+"'",
			function(err, result){
			// Case there is an error during the creation
			if(err) {
				console.log(err);
			} else {
				if(result.length == 0) {
					connection.query('INSERT INTO user_saves SET ?', {ip: ipAdd, save1: insert, save2: null, save3: null, save4: null, save5: null, save6: null},
							function(err, result){
							// Case there is an error during the creation
							if(err) {
								console.log(err);
							} else {
								console.log("save1 set");
								save = 1;
							}
						});
				}
				else if(result[0].save2 == null) {
					connection.query('UPDATE user_saves SET ? WHERE ?', [{save2: insert}, { ip: ipAdd }],
							function(err, result){
							// Case there is an error during the creation
							if(err) {
								console.log(err);
							} else {
								console.log("save2 updated");
								save = 2;
							}
						});
				}
				else if(result[0].save3 == null) {
					connection.query('UPDATE user_saves SET ? WHERE ?', [{save3: insert}, { ip: ipAdd }],
							function(err, result){
							// Case there is an error during the creation
							if(err) {
								console.log(err);
							} else {
								console.log("save3 updated");
								save = 3;
							}
						});
				}
				else if(result[0].save4 == null) {
					connection.query('UPDATE user_saves SET ? WHERE ?', [{save4: insert}, { ip: ipAdd }],
							function(err, result){
							// Case there is an error during the creation
							if(err) {
								console.log(err);
							} else {
								console.log("save4 updated");
								save = 4;
							}
						});
				}
				else if(result[0].save5 == null) {
					connection.query('UPDATE user_saves SET ? WHERE ?', [{save5: insert}, { ip: ipAdd }],
							function(err, result){
							// Case there is an error during the creation
							if(err) {
								console.log(err);
							} else {
								console.log("save5 updated");
								save = 5;
							}
						});
				}
				else if(result[0].save6 == null) {
					connection.query('UPDATE user_saves SET ? WHERE ?', [{save6: insert}, { ip: ipAdd }],
							function(err, result){
							// Case there is an error during the creation
							if(err) {
								console.log(err);
							} else {
								console.log("save6 updated");
								save = 6;
							}
						});
				}
				else fail = true;
				console.log(result);
			}
		});
	
	if(fail) res.send('Save failed');
	else res.send('Saved to position '+save);
})

//Get saves
app.post('/getSaves', function (req, res, next) {
	var ipAdd = req.headers['x-forwarded-for'];
	console.log(ipAdd);
	//console.log(req.body);
	var saves = [];
	connection.query("SELECT * FROM user_saves WHERE ?", {ip: ipAdd},
			function(err, result){
			// Case there is an error during the creation
			if(err) {
				console.log(err);
			} else {
				if(result[0].save1 != null) saves[saves.length] = 'save1';
				if(result[0].save2 != null) saves[saves.length] = 'save2';
				if(result[0].save3 != null) saves[saves.length] = 'save3';
				if(result[0].save4 != null) saves[saves.length] = 'save4';
				if(result[0].save5 != null) saves[saves.length] = 'save5';
				if(result[0].save6 != null) saves[saves.length] = 'save6';
				res.send(saves);
			}
		});
})

//LOAD SAVE
app.post('/loadSave', function (req, res, next) {
	var ipAdd = req.headers['x-forwarded-for'];
	console.log(ipAdd);
	//console.log(req.body);
	var index = req.body.save;
	console.log(index);
	var saveNum;
	connection.query("SELECT * FROM user_saves WHERE ?", {ip: ipAdd},
			function(err, result){
			// Case there is an error during the creation
			if(err) {
				console.log(err);
			} else {
				if(index == '1') saveNum = result[0].save1;
				else if(index == '2') saveNum = result[0].save2;
				else if(index == '3') saveNum = result[0].save3;
				else if(index == '4') saveNum = result[0].save4;
				else if(index == '5') saveNum = result[0].save5;
				else if(index == '6') saveNum = result[0].save6;
				else saveNum = null;
				console.log('Save num ' + saveNum);
				connection.query("SELECT * FROM saves WHERE ?", {save_id: saveNum},
					function(err, result){
					// Case there is an error during the creation
					if(err) {
						console.log(err);
					} else {
						res.send(result[0].save);
					}
				});
			}
		});
	
	/*connection.query('INSERT INTO user_saves VALUES ('+ip+', ',
		function(err, result){
		// Case there is an error during the creation
		if(err) {
			console.log(err);
		} else {
			console.log("Table user_saves dropped");
		}
	});*/
	/*connection.query("SELECT * FROM user_saves WHERE ip='"+ip+"'",
	function(err, result){
		// Case there is an error during the creation
		if(err) {
			console.log(err);
		} else {
			console.log(result);
		}
	});
	connection.query('INSERT INTO user_saves VALUES ('+ip+', ',
	function(err, result){
		// Case there is an error during the creation
		if(err) {
			console.log(err);
		} else {
			console.log("Table user_saves dropped");
		}
	});*/
	//res.status(201).end();
	
})

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
var upload = multer({ dest: './public/images/'}); 
var path = require('path')
var fs = require('fs');
var util = require('util');
var targetPath;
app.post('/upload', upload.single('avatar'), function (req, res) {
	console.log(req.file);
	var tempPath = req.file.path;
        
    if (path.extname(req.file.originalname).toLowerCase() === '.png' || path.extname(req.file.originalname).toLowerCase() === '.jpg' || path.extname(req.file.originalname).toLowerCase() === '.jpeg') {
    	var random = makeid()
    	//var string = './public/user_img/' + random + path.extname(req.files.file.originalname).toLowerCase();
    	targetPath = path.resolve('./public/images/' + random + path.extname(req.file.originalname).toLowerCase());
    	console.log(targetPath);
    	var readStream = fs.createReadStream(tempPath)
    	var writeStream = fs.createWriteStream(targetPath);

    	util.pump(readStream, writeStream, function() {
    	    fs.unlinkSync(tempPath);
    	});
    } else {
        fs.unlink(tempPath, function () {
            console.error("Only .png, jpg, jpeg files are allowed!");
        });
    }
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
module.exports = app;
