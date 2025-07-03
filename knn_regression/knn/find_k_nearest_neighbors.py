from typing import List

# distances - Список відстаней від будника до кожного елемента з X_train (масив будинків),
# який повернула функція calculate_distance() [4.4, 11.5, 0.1, 55.3, 13.5, 31.9, 4.3, 2.01,...]
#
# y_train - (мітки для кожного будника в X_train, це ціни цих будинків).
#     Форма y_train - [1.0, 5.2, 6.4, 2.0, 9.5, 12.2, 0.41, 5.4, 1.9,...]
#
# k - count of neighbors need to find

def find_k_nearest_neighbors(distances: List[float], y_train: List[float], k: int) -> list[tuple[float, float]]:
    # Крок 1. Об'єднати distances і y_train,
    # Нехай:
    #   distances = [5.2, 1.1, 7.8, 2.0, 0.5]
    #   y_train = [ 'A', 'B', 'C', 'D', 'E' ]
    # Об'єднання [(5.2, 'A'), (1.1, 'B'), (7.8, 'C'), (2.0, 'D'), (0.5, 'E')]

    combine: List[tuple[float, float]] = []
    for i, train_item in enumerate(y_train):
        combine.append((distances[i], train_item))

    # Крок 2. Сортуємо combine за distance, це перший елемент у tuple
    sorted_combine = sorted(combine, key=lambda x: x[0])

    # Крок 3. Повертаємо перші k елементів
    return sorted_combine[:k]
