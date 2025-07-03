from typing import List
from knn.calculate_distance import calculate_distance
from knn.find_k_nearest_neighbors import find_k_nearest_neighbors
from knn.predict_label import predict_label

# Якщо порівнювати із KNN класифікацією (див. теку ../../knn) то різниця лише в predict_label
#   Тут predict_label працює трохи інакше, ми просто рахуємо середнє арифметичне найближчих k сусідів,
#   а у класифікації відповіддю був той клас до якого належить більше neighbors.
#   А в решті це та сама KNN класифікація, той самий пошук відстані, той самий пошук 
#   k найближчих neighbors

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

def my_knn_regression(
    X_train: List[List[float]], 
    y_train: List[float], 
    X_test: List[List[float]], 
    k: int
) -> List[float]:
    # Цей список буде зберігати прогнозовані мітки для кожного тестового будинку
    predictions = []

    for test_house in X_test:
        distances = calculate_distance(house=test_house, train_set=X_train)
        k_nearest_neighbors = find_k_nearest_neighbors(
            distances=distances, y_train=y_train, k=k
        )
        predicted_label = predict_label(k_nearest_neighbors)
        predictions.append(predicted_label)

    return predictions
