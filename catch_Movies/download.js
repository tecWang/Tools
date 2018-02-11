const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const http = require('http');
const fs = require('fs');
// require('./utf8ToGb2312.js');   // 中文转换为gb2312的编码函数

// const URLHOME = 'http://www.ygdy8.com';
// const URL = 'http://s.ygdy8.com/plus/so.php?kwtype=0&searchtype=title&keyword=';
const URLHOME = 'http://www.dysfz.cc';
const URL = 'http://www.dysfz.cc/key/';


function downloadMovie(movieUrl){
    console.log('downloading ' + movieUrl);
    let regxp = /\/tv\//;   // 如果检索到了电视剧，禁止下载
    if(regxp.test(movieUrl))
        return ;
    
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
            if ($('.main a') != undefined){
                let regxpMagnet = /^(magnet)/;
                let content = '';
                $('.main a').each((index, value) => {
                    let href = value.attribs['href'];
                    if (regxpMagnet.test(href)) {
                        content = href;
                    }
                });
                appendContent('downloadList.txt', content + '\n', );
            // let href = $('.co_content8 table a').attr('href');
            }
            
        });
    }).on('error', (e) => {
        console.error(`错误: ${e.message}`);
    });
    
}


fs.readFile('./message.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    let arr = data.split('\n');
    arr.forEach(value => {
        setTimeout(() => {
            if (value != '') {    // 因为最后一行可能是空行
                // GB2312为查询字符串的情况
                // let queryText = chinese2Gb2312(value);
                // let url = URL + queryText;

                // utf8为查询字符串的情况
                let queryText = encodeURI(value);
                let url = URL + queryText + '/';

                getMoiveUrl(url);
            }
        }, 1500);
    });
    // getMoiveUrl(URL + encodeURI(arr[0]) + '/');
});


function getMoiveUrl(url){
    console.log(url);
    http.get(url, (res) => {
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

        // 转换格式抓取电影链接
        // console.log(res);
        
        res.pipe(iconv.decodeStream('gb2312')).collect(function (err, decodedBody) {
            // console.log(decodedBody);
            var $ = cheerio.load(decodedBody, { decodeEntities: false });   
            
            if ($('.movie-list a')[0] != undefined){
                let href = $('.movie-list a')[0].attribs['href'];  // 电影首发站的dom匹配
                // let href = $('.co_content8 ul a').attr('href');  // 电影天堂的dom匹配

                if (href != undefined) {
                    let urlSecond = href;
                    // let urlSecond = URLHOME + href;
                    // console.log(urlSecond);
                    downloadMovie(urlSecond);
                }
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