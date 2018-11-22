import pydicom
import os
import numpy as np
import matplotlib.pyplot as plt

"""
author: tecwang
email: tecwang@139.com
detail:
    extract original dcm data to npy data, so we can use npy data to train the unet network
"""

def transfer_dcm2npy(rootDir, store_path):
    index = 0
    dirs = os.listdir(rootDir)
    for item in dirs:
        filepath = os.path.join(rootDir,item)
        if(os.path.isdir(filepath)):
            print "-"*50
            files = os.listdir(filepath)
            print "len:", len(files)    # xxx
            ndy_data = np.array(np.zeros(512*512)).reshape(512*512, 1)
            print "The current transfer dir:", filepath              # F:\seg\Data\ISICDM\thin\original\10
            for filename in files:
                filename = os.path.join(filepath, filename)
                try:
                    ds = pydicom.read_file(filename)
                except Exception:
                    print filename
                    exit()
                img = ds.pixel_array 
                # plt.imshow(img)
                # plt.show()
                # exit()
                img = img.reshape(512*512).reshape(512*512, 1)
                ndy_data = np.concatenate((ndy_data, img), axis=1)

            ndy_data = ndy_data.astype(np.int)
            print ndy_data.shape
            ndy_data = ndy_data.reshape(512, 512, -1)
            print ndy_data[:, :, 1].shape, "sum: ", ndy_data[:, :, 1].sum()
            print ndy_data[:, :, 1:].shape

            seps = filepath.split("\\")
            print seps
            npy_name = seps[len(seps)-1]
            print "The npy image strored in: ", store_path + "\\" + str(npy_name) + ".npy"
            np.save(store_path + "\\" + str(npy_name) + ".npy", ndy_data[:, :, 1:])

dcm_path = 'F:\seg\Data\ISICDM-20-Train\\thick'
npy_path = "F:\seg\Data\ISICDM-20-Train\\thick\\images"
# dcm_path = 'F:\seg\Data\ISICDM\\thin'
# npy_path = "F:\seg\Data\ISICDM\\thin\\images"

dirname = "original"

transfer_dcm2npy(dcm_path + "\\" + dirname, npy_path)
    