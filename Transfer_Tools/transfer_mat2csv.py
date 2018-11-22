import numpy as np
import pandas as pd
import os
import h5py
from scipy import io

##########################################################
# author: tecwang
# email: tecwang@139.com
# Inspired by https://blog.csdn.net/zebralxr/article/details/78254192
# detail: Transfer mat file into csv file by python
##########################################################

rootDir = input("Please input the root dir!\n")
print("================================================================")
files = os.listdir(rootDir)
for f in files:

	if(~os.path.isdir(f) and os.path.splitext(f)[1] == ".mat"):

		# prepare file path
		filename = os.path.join(rootDir + "\\" + f)
		csv_prefix_name = os.path.basename(f).replace(".", "_")
		csv_prefix_name = os.path.join(rootDir + "\\" + csv_prefix_name )

		# print current processing file name
		print(filename)
		
		# read mat file
		features_struct = io.loadmat(filename)
		print(features_struct.keys())	# print keys in mat file 
		temp_arr = []					# store (1, 1) small data
		for key in features_struct.keys():
			item = features_struct[key]
			try:		
				print(item.shape)
				if(item.shape[0] == 1 and item.shape[1] == 1):
					# if shape == (1, 1), then combine them and output it as a single csv file
					temp_arr.append(item)
				else:
					# if shape != (1, 1), then output it as a  single csv file
					item = pd.DataFrame(item)
					item.to_csv(csv_prefix_name + "_" + key + ".csv",index=False, header=None)	 
				
				# output combined small data
				temp_arr = pd.DataFrame(temp_arr)
				temp_arr.to_csv(csv_prefix_name + "_temp_arr.csv",index=False, header=None)	 

			except Exception:
				# skip the head infomation such as header, version, globals, ...
				pass