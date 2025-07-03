# train_set тут це список одновимірних зображень для тренування 
import math

# house [0., 0., 5., 13., 9., 1., 0., 6.] це масив з 8 параметрів будинку 
# 
# train_set - [ [0., 0., 5., 13., 9., 1., 0., 0.], [1., 0.5, 3., 13., 5., 8., 0., 4.], ... ]
# Це масив будинків де кожен будинок має 8 параметрів
#
# Відстань рахуємо за нормою L2 - Евклідова норма
# math.square( (p0 - t0)^2 + (p1 - t1)^2 + ... + (p7 - t7)^2 ) 
# Індекси від 0 до 7 бо у будника лише 7 8 параметрів
def calculate_distance(house: list[float], train_set: list[list[float]]) -> list[float]:
  result = []
  for train_house in train_set:
    diff_sum_square = 0
    for i, train_house_param in enumerate(train_house):
      diff_square = math.pow(train_house_param - house[i], 2)
      diff_sum_square+= diff_square
  
    result.append(math.sqrt(diff_sum_square))
  
  # повертаємо відстань від house до кожного зображення з train_set
  return result

