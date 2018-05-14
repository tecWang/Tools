var readline = require('readline');
var fs = require('fs');
var os = require('os');

var fReadName = './companies.txt';
var fWriteName = './result.txt';
var fRead = fs.createReadStream(fReadName);
var fWrite = fs.createWriteStream(fWriteName);


var objReadline = readline.createInterface({
	input: fRead,

});


objReadline.on('line', (line)=>{
	var tmp = '<div class="line">' + line + '</div>';
	fWrite.write(tmp + os.EOL); // 下一行
});

objReadline.on('close', ()=>{
	console.log('readline close...');
});