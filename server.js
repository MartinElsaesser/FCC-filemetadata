var express = require('express');
var cors = require('cors');
require('dotenv').config();
const fs = require("fs");

const multer = require('multer')
const upload = multer({ dest: __dirname + '/uploads/' })

var app = express();

app.use(cors());
app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
	let name = req.file.originalname;
	let type = req.file.mimetype;
	let size = req.file.size;

	// delete temporary file
	fs.rmSync(__dirname + "/uploads/" + req.file.filename);

	res.json({ name, type, size });
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log('Your app is listening on port ' + port)
});
