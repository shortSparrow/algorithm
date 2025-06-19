import math
import numpy as np

from k_means.calculate_euclidean_distance import calculate_euclidean_distance
from k_means.initialize_centroids import initialize_centroids



def run_kmeans(data: np.ndarray, k: int, max_iter=10):
    centroids = initialize_centroids(data=data, k=k)
    labels_array = []

    print(f"initial centroids: {centroids}")
    
    for iter in range(max_iter):
        labels_array = []
        # --- Крок 1: отримати масив labels_array який вказує який піксель до якого центроїда найближчий ---
        # Є дуже вузьким місцем - займає по часу від 1хв 45сек до 2хв 20сек в залежності від того
        # який calculate_euclidean_distance використовуємо

        for item_data in data:
            min_distance = math.inf
            belong_to_centroid_idx = -1

            for i, centroid in enumerate(centroids):
                distance_from_centroid_to_point = calculate_euclidean_distance(
                    centroid, item_data
                )
                if distance_from_centroid_to_point < min_distance:
                    min_distance = distance_from_centroid_to_point
                    belong_to_centroid_idx = i

            labels_array.append(belong_to_centroid_idx)

        # --- Крок 2: Оновлення центроїдів (без NumPy-фільтрації) ---
        # Менше затратна операція ніж крок 1 
        old_centroids = centroids.copy() # Зберігаємо старі центроїди для перевірки збіжності

        # Ініціалізуємо новий список для зберігання точок кожного кластера
        # Це буде список списків. Наприклад, cluster_points[0] буде містити всі точки 0-го кластера.
        cluster_points = [[] for _ in range(k)]

        # Розподіляємо кожну точку в її відповідний список кластера
        # Пам'ятай, labels_array тепер np.array з індексами кластерів
        for j, label in enumerate(labels_array):
            cluster_points[label].append(data[j].tolist()) # Додаємо оригінальну точку з 'data'

        new_centroids = [] # Список для нових центроїдів

        for cluster_idx in range(k):
            points_in_this_cluster = cluster_points[cluster_idx]

            if len(points_in_this_cluster) > 0: # Якщо кластер не порожній
                # Обчислюємо суму RGB компонентів
                sum_r = 0
                sum_g = 0
                sum_b = 0
                for point in points_in_this_cluster:
                    sum_r += int(point[0]) # R-компонента
                    sum_g += int(point[1]) # G-компонента
                    sum_b += int(point[2]) # B-компонента

                # Обчислюємо середнє значення для кожної компоненти
                avg_r = sum_r / len(points_in_this_cluster)
                avg_g = sum_g / len(points_in_this_cluster)
                avg_b = sum_b / len(points_in_this_cluster)

                new_centroids.append([avg_r, avg_g, avg_b])
            else:
                # Якщо кластер порожній, використовуємо старий центроїд
                new_centroids.append(old_centroids[cluster_idx].tolist()) # .tolist() щоб привести np.array до list

        # Перетворюємо new_centroids назад у NumPy масив для послідовності та використання np.allclose
        new_centroids = np.array(new_centroids, dtype=float)

        print(f"Iteration: {iter}")
        print(f"new_centroids: {new_centroids}")
        print(f"centroids: {centroids}")

        # перевірка старих і нових цетроїдів
        # is_close = np.allclose(new_centroids, centroids)
        is_close = np.allclose(new_centroids, old_centroids, rtol=0.01, atol=0.1) # Збільшення толерантності
        
        if is_close:
            print(f"K-Means зійшовся на ітерації {iter + 1}.")
            break
        
        centroids = new_centroids # Оновлюємо центроїди для наступної ітерації
        
    return centroids, labels_array
