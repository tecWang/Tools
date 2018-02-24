/*
    存在的问题：
        貌似比较深层的目录创建会失败，应该是递归函数有问题，后期再改吧
        ...目前没时间了
*/
const glob = require('glob');
const fs = require('fs');
const path = require('path');


var dest = '../../Blog/';

// 匹配指定格式的文件，ignore中是忽略的文件目录
glob("../../Html/**/*.md", {
    ignore: [
        "../../Html/**/node_modules/**/*.*", 
        "../../Html/**/bower_components/**/*.*",
        "../../Html/**/docs/**/*.*",
        "../../Html/**/lib/**/*.*",
        "../../Html/**/libs/**/*.*",
        "../../Html/03-HTML5/**/*.*",
        "../../Html/24_vue/**/styles/**/*.*",
        "../../Html/24_vue/**/style/**/*.*",
    ]
}, function (er, files) {
    files.forEach((item)=>{
        let existPath = path.join(dest, path.dirname(item).replace('../../Html', '\\'));
        let tarPath2 = path.join(dest + path.dirname(item).replace('../../Html', '\\') + '\\' +path.basename(item));
        /*
            流程：
                1. 当前目录不存在，flag = false， 进入循环
                2. 判断父一级目录是否存在，
                    若存在，则创建当前目录
                    若不存在，则创建父一级目录
        */
        // node不支持创建二级目录，此处需要递归创建
        let flag = fs.existsSync(existPath);
        let tempPath = existPath;
        while (!fs.existsSync(tempPath)){
            console.log(path.dirname(tempPath));
            if (fs.existsSync(path.dirname(tempPath))){
                fs.mkdirSync(tempPath);
            }else{
                tempPath = path.dirname(existPath);
            }
        }
        if(fs.existsSync(existPath)){
            fs.copyFileSync(item, tarPath2);
        }
    });
})

glob("../../Html/**/*.txt", {
    ignore: [
        "../../Html/**/node_modules/**/*.*",
        "../../Html/**/bower_components/**/*.*",
        "../../Html/**/docs/**/*.*",
        "../../Html/**/lib/**/*.*",
        "../../Html/**/libs/**/*.*",
        "../../Html/03-HTML5/**/*.*",
        "../../Html/24_vue/**/styles/**/*.*",
        "../../Html/24_vue/**/style/**/*.*",
        "../../Html/04-CSS3/2-案例/7-创意导航栏(收藏)/**/*.*",
        "../../Html/08-canvas/2-demo/**/*.*"
    ]
}, function (er, files) {
    files.forEach((item) => {
        let existPath = path.join(dest, path.dirname(item).replace('../../Html', '\\'));
        let tarPath2 = path.join(dest + path.dirname(item).replace('../../Html', '\\') + '\\' + path.basename(item));
        /*
            流程：
                1. 当前目录不存在，flag = false， 进入循环
                2. 判断父一级目录是否存在，
                    若存在，则创建当前目录
                    若不存在，则创建父一级目录
        */
        // node不支持创建二级目录，此处需要递归创建
        let flag = fs.existsSync(existPath);
        let tempPath = existPath;
        while (!fs.existsSync(tempPath)) {
            console.log(path.dirname(tempPath));
            if (fs.existsSync(path.dirname(tempPath))) {
                fs.mkdirSync(tempPath);
            } else {
                tempPath = path.dirname(existPath);
            }
        }
        if (fs.existsSync(existPath)) {
            fs.copyFileSync(item, tarPath2);
        }
    });
})