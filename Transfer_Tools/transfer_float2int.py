import os
import numpy as np

d = "F:\seg\data_thick/labels/"
fs = os.listdir(d)
for f in fs:
    ndypath = os.path.join(d, f)
    data = np.load(ndypath)
    data = data.astype(np.int)
    print data.sum()
        
    np.save(ndypath, data)