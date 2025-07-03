# predict_label Повертає одну прогнозовану мітку (ціна на будинок), яка є середнім 
# арифметичним всіх цін з k_nearest_neighbors
# Наприклад, якщо k_nearest_neighbors повертає [(0.5, 9), (1.1, 7), (2.0, 9)] і k=3:
# Мітки сусідів: [9, 7, 9]
# predict_label (9 + 7 + 9) / 3


# k_nearest_neighbors - [(0.5, 9.1), (1.1, 7.3), (2.0, 9.7)] -
# k_nearest_neighbors - (список tuple (відстань, мітка), який ти отримав з find_k_nearest_neighbors).
def predict_label(k_nearest_neighbors: list[tuple[float, float]]) -> float | None:
    total_price = 0
    for neighbor in k_nearest_neighbors:
        total_price += neighbor[1]

    return total_price / len(k_nearest_neighbors)
