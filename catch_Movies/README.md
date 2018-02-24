# 简介

目录下一共有两组文件

1. 第一组download_tv.js用来下载电视剧   网址：http://www.msj1.com

    其拿到的视频链接会汇总到download_tv.txt

    Usage: node download_tv.js http://www.msj1.com/archives/71.html

2. 第二组download.js用来下载电影     网址：http://www.dysfz.cc

    - ready.js用来抓取百度检索的结果，其拿到的视频名称会放置到message.txt中

    - download.js用message.txt的电影名称去依次抓取电影下载链接并汇总到download.txt



