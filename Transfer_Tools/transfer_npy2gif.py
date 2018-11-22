import os
import numpy as np
import imageio
import matplotlib
import matplotlib.pyplot as plt
import time
import progressbar
import pydicom
from pydicom.dataset import Dataset, FileDataset
import datetime, time

"""
author: tecwang
email: tecwang@139.com
detail:
   transfer one predict result npy to Picture(such as png, gif, ...)  
"""


# transfer ndarray to png
def ToPng(img0, img1, image_path):
    # create fig
    fig = plt.figure()

    # draw img0
    ax = fig.add_subplot(121)
    ax.set_title("input pred image")
    ax.imshow(img0)

    # draw img1
    ax = fig.add_subplot(122)
    ax.set_title("prediction")
    ax.imshow(img1)

    # additional setting
    # plt.axis('off')

    # save and close figure, otherwise memory will explode
    plt.savefig(image_path)
    plt.close()

# read data from pred npy data
def read_data(original, filepath, extracted_path):
    print "Reading data from npy file"
    o_data = np.load(original)
    o_data = o_data.transpose(2, 0, 1)
    data = np.load(filepath)
    print o_data.shape, data.shape
    print "Transfering ndarray to png"
    p = progressbar.ProgressBar()
    if(data.shape[0] == 512):
        N = data.shape[2]
        p.start(N)
        for index in range(data.shape[2]):
            data2 = data[:, :, index]
            # if(data2.sum() > 0 or data2.sum() < 0):
            img = data[:, :, index]
            img = img.astype(np.int)
            o_img = o_data[:, :, index]
            o_img = o_img.astype(np.int)
            # draw
            ToPng(o_img, img, extracted_path + str(index) + ".png")
            p.update(index+1)
    else:
        N = data.shape[0]
        p.start(N)
        for index in range(data.shape[0]):
            data2 = data[index, :, :]
            # if(data2.sum() > 0 or data2.sum() < 0):
            img = data[index, :, :]
            img = img.astype(np.int)
            o_img = o_data[index, :, :]
            o_img = o_img.astype(np.int)
            # draw
            ToPng(o_img, img, extracted_path + str(index) + ".png")
            p.update(index+1)
    p.finish()

# copy from: https://blog.csdn.net/XnCSD/article/details/79432434?utm_source=copy
def create_gif(gif_name, path, duration = 0.3):
    print "Creating gif"
    frames = []
    fs = os.listdir(path)
    print "len of fs:", len(fs)
    for image_name in range(len(fs)):
        image_name = os.path.join(path, str(image_name) + ".png")
        frames.append(imageio.imread(image_name))
        # os.remove(image_name)   # remove the data which has been read into memory

    # save to gif
    imageio.mimsave(os.path.join(path, gif_name), frames, 'GIF', duration = duration)

    return 


# original = "f:/seg/Data/ISICDM/thick/images/2.npy"
# pred = "f:/seg/data_thick/test-records/pred-2/2.npy"

original = "f:/seg//Data/Round2/thin_images/3.npy"
pred = "F:\seg\data_thin\\test-records\pred-3\\3.npy"

extracted_path = "f:/seg/extracted_img/"

# empty extracted_img folder
files = os.listdir(extracted_path)
for f in files:
    os.remove(os.path.join(extracted_path, f))

# begin to transfer npy to png
read_data(original, pred, extracted_path)

# transfer multi pngs to dynamic gif image
create_gif("image.gif", extracted_path, 0.3)
