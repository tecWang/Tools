let https = require('https');
let fs = require('fs');

// 查询关键字(encode形式)
const queryText = '%E4%BD%9B%E6%95%99%E7%94%B5%E5%BD%B11000%E9%83%A8%E5%A4%A7%E5%85%A8';
const step = 24;
// api地址
let URL = 'https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?pn=0&rn=24&resource_id=28261&format=json&ie=utf-8&oe=utf-8&pd=movie_general&query='+ queryText +'&cb=tecwang';

let flag = true;
let times = 0;

// 拿到电影的名称列表
function getName(url){

    // 处理URL
    let urlRegxp = /([\s\S]*pn=)([0-9]*)(&rn=)([0-9]*)([\s\S]*)/;
    let arr = urlRegxp.exec(url);
    console.log(arr[2]*1);

    if(times != 0){
        url = arr[1] + (arr[2] * 1 + step) + arr[3] + (arr[4] * 1 + step) + arr[5];
        console.log(url);
    }
    
 

    https.get(url, (res) => {
        const { statusCode } = res;
        const contentType = res.headers['content-type'];

        // 错误处理
        let error;
        if (statusCode !== 200) {
            error = new Error('请求失败。\n' +
                `状态码: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
            error = new Error('无效的 content-type.\n' +
                `期望 application/json 但获取的是 ${contentType}`);
        }
        if (error) {
            console.error(error.message);
            // 消耗响应数据以释放内存
            res.resume();
            return;
        }

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            try {
                let regxp = /^(tecwang\()([\s\S]*)(\)$)/;
                let newData = rawData.replace(regxp, '$2');
                let parsedData = JSON.parse(newData);
                let tarData = parsedData.data[0].result.result;

                if(tarData == null)
                    return ;
                
                let writeLine = '';
                tarData.forEach(function (value) {
                    writeLine += value.ename + '\n';
                });
                appendContent('message.txt', writeLine);
                times++;
                getName(url);
                
                
            } catch (e) {
                console.error(e.message);
            }
        });
    }).on('error', (e) => {
        console.error(`错误: ${e.message}`);
    });
}

// 向文件中追加数据
function appendContent(fileName, content){
    fs.appendFile(fileName, content, (err) => {
        if (err) throw err;
    });
}

getName(URL);