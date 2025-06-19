import math
import numpy as np


# Рішення за допомогою numpy
# point1 і point2 - це [r,g,b], наприклад [255,0,255]
# def calculate_euclidean_distance(point1: np.ndarray, point2: np.ndarray):
#     if point1.shape != point2.shape:
#         raise ValueError("Points must have the same shape/dimension.")

#     # За теоремою Піфагора визначаємо відстань від point1 до point2
#     # (math.sqrt( (r1-r2)^2 + (g1-g2)^2 + (g1-g2)^2 ))
#     return np.sqrt(np.sum((point1 - point2) ** 2))


# Рішення без numpy, щоб наочно було видно що робиться
def calculate_euclidean_distance(point1:list[int], point2:list[int]):
  if(len(point1) != len(point2)):
    raise Exception("Point1 and Point tow has different dimensions")

  sum = 0
  for i in range(len(point1)):
    sum += math.pow(point1[i] - point2[i], 2)

  return math.sqrt(sum)
