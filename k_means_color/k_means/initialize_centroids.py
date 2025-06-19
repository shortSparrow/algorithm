import numpy as np


def initialize_centroids(data: np.ndarray, k: int) -> np.ndarray:
    # Перевіряємо, чи достатньо точок у даних для вибору k центроїдів.
    # data.shape[0] - це кількість елементів у масиві
    if k > data.shape[0]:
        raise ValueError("Кількість кластерів (k) не може бути більшою за кількість точок даних.")

    # Отримуємо загальну кількість точок даних
    num_samples = data.shape[0]

    # Випадково обираємо k унікальних індексів з діапазону [0, num_samples - 1]
    # replace=False гарантує, що індекси не будуть повторюватися
    random_indices = np.random.choice(num_samples, k, replace=False)

    # Використовуємо ці індекси, щоб вибрати відповідні точки з 'data'
    centroids = data[random_indices]

    return centroids


# --- Тестування (можна додати у свій файл для перевірки) ---
# fake_pixels = np.array([
#     [10, 20, 30],
#     [15, 25, 35],
#     [12, 22, 32],
#     [200, 210, 220],
#     [205, 215, 225],
#     [5, 5, 5],
#     [8, 8, 8],
#     [250, 250, 250],
#     [0, 0, 0],
#     [1, 1, 1]
# ])

# k_test = 3
# initial_centers = initialize_centroids(fake_pixels, k_test)
# print(f"\nТестові початкові центроїди ({k_test} штук):\n{initial_centers}")
