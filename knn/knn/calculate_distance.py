# train_set тут це список одновимірних зображень для тренування 
import math

# extended_image і train_set місять не r,g,b, а інтенсивність сірого (значення від 0 до 16)
# 0 - це білий або дуже світлий
# 16 - це чорний або дуже темний 
# 
# extended_image - [0., 0., 5., 13., 9., 1., 0., 0.,...]
# train_set - [ [0., 0., 5., 13., 9., 1., 0., 0.,...], [1., 0.5, 3., 13., 5., 8., 0., 4.,...], ... ]
# 
# Відстань рахуємо за нормою L2 - Евклідова норма
# math.square( (p0 - t0)^2 + (p1 - t1)^2 + ... + (p63 - t63)^2 ) 
# Індекси від 0 до 63 бо у нас зображення 8x8 - тобто коли вони розгорнуті в одномірний масив то його довжина 64
def calculate_distance(extended_image: list[int], train_set: list[list[int]]):
  result = []
  for train_image in train_set:
    diff_sum_square = 0
    for i, train_image_color in enumerate(train_image):
      diff_square = math.pow(train_image_color - extended_image[i], 2)
      diff_sum_square+= diff_square
  
    result.append(math.sqrt(diff_sum_square))
  
  # повертаємо відстань від extended_image до кожного зображення з train_set
  return result

