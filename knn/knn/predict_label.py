# predict_label Повертає одну прогнозовану мітку (ціле число від 0 до 9),
# яка є найбільш частою серед міток K найближчих сусідів.
# Наприклад, якщо k_nearest_neighbors повертає [(0.5, 9), (1.1, 7), (2.0, 9)] і k=3:
# Мітки сусідів: [9, 7, 9]
# Найчастіша мітка: 9 (бо вона зустрічається 2 рази, а 7 - 1 раз).


# k_nearest_neighbors - [(0.5, 9), (1.1, 7), (2.0, 9)] -
# k_nearest_neighbors - (список tuple (відстань, мітка), який ти отримав з find_k_nearest_neighbors).
def predict_label(k_nearest_neighbors: list[tuple[float, int]]) -> int | None:
    frequency = {}

    for neighbor in k_nearest_neighbors:
        neighbor_label = neighbor[1]
        if neighbor_label in frequency:
            frequency[neighbor_label] += 1
        else:
            frequency[neighbor_label] = 1

    max_count = 0
    max_label = None
    for label in frequency.keys():
        if frequency[label] > max_count:
            max_count = frequency[label]
            max_label = label

    return max_label
