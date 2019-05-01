from keras.models import Sequential
from keras.layers import Dense, Activation, Dropout
import tensorflow as tf
import numpy as np
from random import choice, random
np.random.seed(1337)


class Model:
    def __init__(self, input_shape):
        self.model = self.createModel(input_shape)
        self.model.compile(optimizer='rmsprop',
                           loss='categorical_crossentropy',
                           metrics=['accuracy'])
        self.graph = tf.get_default_graph()

    # create the model
    def createModel(self, input_shape):
        model = Sequential()
        model.add(Dense(5, input_shape=input_shape, name="Input"))
        model.add(Activation('relu'))
        model.add(Dropout(.2))
        model.add(Dense(10, name="Hidden1"))
        model.add(Activation('relu'))
        model.add(Dropout(.2))
        model.add(Dense(10, name="Hidden2"))
        model.add(Activation('relu'))
        model.add(Dropout(.2))
        model.add(Dense(2, name="Output"))
        model.add(Activation('softmax'))
        return model

    # mutate Model
    def mutate(self, rate):
        layers = [self.model.layers[0],
                  self.model.layers[3],
                  self.model.layers[6],
                  self.model.layers[9]]

        chance1 = random()
        chance2 = random()

        for layer in layers:
            if chance1 <= rate:
                weights = layer.get_weights()
                ws = weights[0]
                bs = weights[1]

                for i in range(len(ws)):
                    if chance2 <= rate:
                        w_shape = ws.shape
                        new_ws = np.random.random(w_shape)

                        ws = new_ws

                with self.graph.as_default():
                    layer.set_weights([ws, bs])

    def predict(self, params):
        params = self._reshape(np.array(params))
        with self.graph.as_default():
            pred = self.model.predict(params)
        pred = pred.tolist()
        print(pred)
        return pred

    def _reshape(self, a):
        return a.reshape(1, 1, 5)

    def crossOver(self, b):
        layerIdxs = [0, 3, 6, 9]
        cLayers = []
        for idx in layerIdxs:
            layerA = self.model.layers[idx]
            layerB = b.model.layers[idx]

            aWeights = layerA.get_weights()
            aWs = aWeights[0]
            aBs = aWeights[1]
            bWeights = layerB.get_weights()
            bWs = bWeights[0]
            bBs = bWeights[1]

            for i in range(len(aWs)):
                nA = aWs[i].tolist()
                nB = bWs[i].tolist()
                mid = round(len(nA) / 2)
                nA = nA[:mid] + nB[mid:]
                aWs[i] = nA

            mid = round(len(aBs) / 2)
            newBA = np.array(aBs.tolist()[:mid] + bBs.tolist()[mid:])
            aBs = newBA

            with self.graph.as_default():
                self.model.set_weights([aWs, aBs])

            return self.model
