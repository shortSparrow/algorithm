from typing import List

# distances - Список відстаней від зображення до кожного елемента (image),
# який повернула функція calculate_distance() [4,11,0,55,13,31,4,2,...]
#
# y_train - (мітки для кожного зображення в X_train, які відповідають порядку відстаней). Це справжні числа.
#     Форма y_train - [1,5,2,9,12,0,5,1,...]
#
# k - count of neighbors need to find

def find_k_nearest_neighbors(distances: List[int], y_train: List[int], k: int) -> list[tuple[float, int]]:
    # Крок 1. Об'єднати distances і y_train,
    # Нехай:
    #   distances = [5.2, 1.1, 7.8, 2.0, 0.5]
    #   y_train = [ 'A', 'B', 'C', 'D', 'E' ]
    # Об'єднання [(5.2, 'A'), (1.1, 'B'), (7.8, 'C'), (2.0, 'D'), (0.5, 'E')]

    combine: List[tuple[int, int]] = []
    for i, train_item in enumerate(y_train):
        combine.append((distances[i], train_item))

    # Крок 2. Сортуємо combine за distance, це перший елемент у tuple
    sorted_combine = sorted(combine, key=lambda x: x[0])

    # Крок 3. Повертаємо перші k елементів
    return sorted_combine[:k]
