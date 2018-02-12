// 本文件用于下载行尸走肉美剧
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const http = require('http');
const fs = require('fs');


const URL = 'http://www.msj1.com/archives/46.html';


function downloadMovie(movieUrl){
    console.log('downloading ' + movieUrl);
    
    http.get(movieUrl, (res) => {
        const { statusCode } = res;

        let error;
        if (statusCode !== 200) {
            error = new Error('请求失败。\n' +
                `状态码: ${statusCode}`);
        }
        if (error) {
            console.error(error.message);
            // 消耗响应数据以释放内存
            res.resume();
            return;
        }


        

        res.pipe(iconv.decodeStream('gb2312')).collect(function (err, decodedBody) {
            var $ = cheerio.load(decodedBody, { decodeEntities: false });
            if ($('#content table')[0] != undefined) {
                let content = '';
                $('#content table').first().find('a').each((index, value) => {
                    let href = value.attribs['href'];
                        content += href + '\n';
                });
                appendContent('downloadList_tv.txt', content + '\n', );
            }
        });
    }).on('error', (e) => {
        console.error(`错误: ${e.message}`);
    });
    
}

function appendContent(fileName, content) {
    fs.appendFile(fileName, content, (err) => {
        if (err) throw err;
    });
}

downloadMovie(URL);