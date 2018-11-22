import numpy as np
import os
import matplotlib.pyplot as plt
import pydicom
from pydicom.dataset import Dataset, FileDataset
import datetime, time

def ToDcm(img, dcm_path, example_dcm="F:/seg/example_dcm.dcm"):
    # read example 
    ds = pydicom.dcmread(example_dcm)

    # change data in example file to create a new file
    ds.Columns = img.shape[0]
    ds.Rows = img.shape[1]
    if img.dtype != np.uint16:
        img = img.astype(np.uint16)
    ds.PixelData = img
    ds.save_as(dcm_path)

# rootDir = "F:/seg/data_thin/test-records/pred-3/"
# original_dcm = "F:/seg/Data/Round2/thin/"
rootDir = "F:/seg/data_thick/test-records/pred-3/"
original_dcm = "F:/seg/Data/Round2/thick/"

# create dcms dir
dcm_dir = os.path.join(rootDir, "dcms")
if not os.path.exists(dcm_dir):
    os.mkdir(dcm_dir)

fs = os.listdir(rootDir)
for f in fs:
    if(f != "dcms"):
        f = os.path.join(rootDir, f)
        cur_folder = os.path.basename(f).split(".")[0]
        tar_f = dcm_dir + "/" + cur_folder  # target folder to store the dcm images
        print f, "\t", tar_f
        if not os.path.exists(tar_f):
            os.mkdir(tar_f)

        data = np.load(f)
        print data.shape
        original_dcms = os.listdir(original_dcm + cur_folder)
        if(data.shape[0] != 512):
            for i in range(data.shape[0]):
                img = data[i, :, :]
                img = img.astype(np.int)
                img[img > 0] = 255
                original_dcm_name = original_dcms[i].split(".")[0]
                tar_dcm_path = os.path.join(tar_f, original_dcm_name + "_sep.dcm")
                ToDcm(img, tar_dcm_path)
        elif(data.shape[2] != 512):
            for i in range(data.shape[2]):
                img = data[:, :, i]
                img = img.astype(np.int)
                img[img > 0] = 255
                original_dcm_name = original_dcms[i].split(".")[0]
                tar_dcm_path = os.path.join(tar_f, original_dcm_name + "_sep.dcm")
                ToDcm(img, os.path.join(tar_f, str(i)))

