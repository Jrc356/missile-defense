from keras.models import Sequential
from keras.layers import Dense, Activation, Dropout
import numpy as np
from random import choice, random


class Model:
    def __init__(self, input_shape):
        self.model = self.createModel(input_shape)
        self.model.compile(optimizer='rmsprop',
                           loss='categorical_crossentropy',
                           metrics=['accuracy'])

    # create the model


def createModel(input_shape):
    model = Sequential()
    model.add(Dense(1, input_shape=input_shape, name="Input"))
    model.add(Activation('relu'))
    model.add(Dropout(.2))
    model.add(Dense(10, name="Hidden"))
    model.add(Activation('relu'))
    model.add(Dropout(.2))
    model.add(Dense(2, name="Output"))
    model.add(Activation('softmax'))
    return model

    # mutate Model
    def mutate(self, rate):
        layers = [self.model.layers[0],
                  self.model.layers[3], self.model.layers[6]]
        chance = random()

        for layer in layers:
            if chance <= rate:
                weights = layer.weights
                chosen_weight = choice(weights)
                idx = weights.index(chosen_weight)

                new_weight = random()
                weights[idx] = new_weight
                layer.set_weights(weights)
