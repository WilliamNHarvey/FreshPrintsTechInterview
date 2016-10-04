var express = require('express');
var router = express.Router();

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var random = makeid();
var path = require('path'),
fs = require('fs');
var extension = "";
//...
app.post('?', function (req, res) {
var tempPath = req.files.file.path,
    targetPath = path.resolve(random);
extension = path.extname(req.files.file.name).toLowerCase();
if (path.extname(req.files.file.name).toLowerCase() === '.png' || path.extname(req.files.file.name).toLowerCase() === '.jpg' || path.extname(req.files.file.name).toLowerCase() === '.jpeg' || path.extname(req.files.file.name).toLowerCase() === '.gif') {
    fs.rename(tempPath, (targetPath + path.extname(req.files.file.name).toLowerCase()), function(err) {
        if (err) throw err;
        console.log("Upload completed!");
    });
} else {
    fs.unlink(tempPath, function () {
        if (err) throw err;
        console.error("Only png, jpg, jpeg, and gif  files are allowed");
    });
}
// ...
});

app.get('/uploaded', function (req, res) {
	console.log(path.resolve(random + extension));
    res.sendfile(path.resolve(random + extension));
}); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

