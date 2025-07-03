from typing import List

import numpy as np
from knn.predict_label import predict_label

# Опис того, як працює алгоритм
# Запускаємо цикл по X_test
# Визначаємо відстань від поточного елемента у X_test до усіх елементів у X_train. Варто пам'ятати що жодного
# елемента з X_test немає у X_train. Відстань визначаємо за номою L2 (Евклідова норма)
#
# Маючи відстані від поточного елемента X_test до всіх всіх елементів з X_train запускаємо find_k_nearest_neighbors.
# У find_k_nearest_neighbors ми передаємо відстані які знайшли і y_train (labels - тобто правильні ціни які відповідають
# будинкам з X_train), і там об'єднуємо відстані і labels. Пам'ятаємо що порядок у них однаковий, бо відстані - це
# відстані до елементів X_train, тобто вони записані у порядку у якому і елементи X_train, і так само labels - бо це
# labels саме елементів X_train, тож вони записані також у порядку у якому йде X_train. 
# І об'єднавши відстані і labels повертаємо k найближчих елементів до поточного елементу X_test. Тож 
# find_k_nearest_neighbors повертає tuple з відстані і label (правильної ціни)
#
# Маючи k найближчих елементів сумуємо їхні ціни і ділимо це на кількість цих елементів - тобто шукаємо середню ціну
#
# Далі додаємо результат у predictions і повторюємо знову для наступного елемента X_test



# X_train: List[List[int]]
#   Призначення: Це навчальний набір даних. Кожен елемент у цьому списку є окремим навчальним зразком
#                (у нашому випадку, будинком з 8 характеристиками). 
#   Приклад: [[float, float, float, float, float, float, float, float ],...]
#
# y_train: List[int]
#   Призначення: Це навчальний набір міток (labels), що відповідають кожному будинку в X_train.
#                Це ціни для кожного будинку в X_train
#   Приклад: [float, float, float,...]
# 
# X_test: List[List[int]]
#   Призначення: Це тестовий набір даних ознак. Ці будинки модель ніколи не "бачила" під час навчання,
#                і ми хочемо, щоб вона класифікувала їх ціну правильно.
#   Приклад:  [[float, float, float, float, float, float, float, float ],...]
#
# k: int - визначає скільки найближчих сусідів треба брати

def my_knn_regression_vectorization(
    X_train: List[List[float]], 
    y_train: List[float], 
    X_test: List[List[float]], 
    k: int
) -> List[float]:
    # Конвертуємо вхідні дані до NumPy масивів для ефективних обчислень
    _X_train = np.array(X_train)
    _y_train = np.array(y_train)
    _X_test = np.array(X_test)
    
    # Цей список буде зберігати прогнозовані мітки для кожного тестового зображення
    predictions = []

    for test_house in _X_test:
        # test_house і _X_train мають однакові розмірність - це масиви чисел 
        # test_house (один будинок) віднімається від кожного зображення в _X_train (усіх навчальних будинків).
        # NumPy, використовуючи broadcasting, автоматично "розтягує" test_house для виконання поелементного віднімання.
        # Результатом є масив, де кожен рядок містить різниці між test_house і відповідним навчальним будинком
        # 
        # squared_differences має форму [ [0., 88., 12., 33.,...],... ] (N, 8), де N — кількість навчальних будинків
        squared_differences = (test_house - _X_train)**2
        
        # Сумуємо різницю квадратів 
        # Параметр axis=1 вказує NumPy, що сумувати потрібно вздовж осі, яка відповідає параметрам будинку
        # (тобто, сумувати всі 8 значення для кожного рядка/будинку). 
        # Форма sum_squared_differences - [1605., 2352., 3557., 978., ....] (N, 1), де N — кількість навчальних будинків
        # Форма distances - [40.06, 48.49, 69.64, 31.27., ....] (N, 1), де N — кількість навчальних будинків
        sum_squared_differences = np.sum(squared_differences, axis=1)
        distances = np.sqrt(sum_squared_differences)


        # np.stack об'єднає у масив distances і y_train
        # combined - [ [distances[0], y_train[0]], [distances[1], y_train[1]], ...]
        combined = np.stack((distances, _y_train), axis=1)
        
        # Отримуємо індекси, які сортують ПЕРШИЙ стовпець (відстані)
        # combined[:, 0] дістає перші елементи з підмасивів combined, тобто елементи distances 
        # sorted_indices - це індекси якби масив був відсортований. np.argsort не сортує масив, він повертає 
        # індекси у порядку якби масив був би відсортований
        sorted_indices = np.argsort(combined[:, 0])

        # Застосовуємо індекси до всього масиву
        sorted_neighbors = combined[sorted_indices] 
        
        # Дістаємо найближчі k елементів до нашого зображення
        k_nearest_neighbors = sorted_neighbors[:k]

        predicted_label = predict_label(k_nearest_neighbors)
        predictions.append(predicted_label)

    return predictions
