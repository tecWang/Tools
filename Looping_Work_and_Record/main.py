# -*- coding: utf-8 -*-
import numpy as np
import pandas as pd
import datetime

##########################################################
# author: tecwang
# email: tecwang@139.com
# Inspired by 
# detail: Auto insert contents into template
##########################################################

# load data
person_list = pd.read_csv("./persons.csv", header=None, sep="\n", encoding = "gbk")
print(person_list)

# submitor
class submitor(object):

    def __init__(self):
        # construct content
        self.construct()

    def check(self):
        return

    def construct(self):
        return self.Header() + "\n" + self.Content()

    def Header(self):
        year = datetime.datetime.now().year
        month = datetime.datetime.now().month
        day = datetime.datetime.now().day
        return year + "年" + month + "月" + day  + "日"

    def Content(self):
        journal = input("请输入期刊类型(期刊名称 | 学位论文)\n")
        title = input("请输入审稿人姓名\n")
        
        
        return 

    def insert(self):
        return 

    