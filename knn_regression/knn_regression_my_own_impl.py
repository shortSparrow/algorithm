from sklearn.datasets import fetch_california_housing
import numpy as np
from sklearn.metrics import mean_absolute_error, mean_squared_error
from sklearn.model_selection import train_test_split
from knn.knn_regression import my_knn_regression
from knn.my_knn_regression_vectorization import my_knn_regression_vectorization

from sklearn.preprocessing import StandardScaler
# Задача 
# Маємо набір даних про будинки у Каліфорнії, кожен будинок має 8 параметрів, потрібно
# передбачити скільки скільки буде коштувати будинок якщо йому задати інші параметри
#    8 параметрів будинку:
#       ['MedInc', 'HouseAge', 'AveRooms', 'AveBedrms', 'Population', 'AveOccup', 'Latitude', 'Longitude']
#       [8.3252, 41.0, 6.984126984126984, 1.0238095238095237, 322.0, 2.5555555555555554, 37.88, -122.23] 
# 
# Якщо порівнювати із KNN класифікацією (див. теку ../knn) то різниця лише в двох моментах
#   1. Тут ми робимо нормалізацію (в KNN класифікації її теж роблять, просто я не робив бо і так норм працювало) 
#   2. predict_label працює трохи інакше, тут просто рахуємо середнє арифметичне найближчих k сусідів
# А в решті це та сама KNN класифікація
# 
housing = fetch_california_housing()
# housing.data - [[float, float, float, float, float, float, float, float ],...] Форма (20640, 8), де 
# 20640 - це кількість будинків, а 8 це кількість параметрів для кожного з них
X = housing.data[0:5000] # Щоб було швидше беру лише перші 5000 елементів

# housing.target - [float, float, ....] Форма (20640,), де 20640 - це кількість будинків,
# а значення - це ціна за кожний будинок
y = housing.target[0:5000] # Щоб було швидше беру лише перші 5000 елементів

#
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# --- 2. Масштабування ознак ---
# ! Наразі результати передбачень погані, гадаю проблема в нормалізації даних, можливо спробувати інший метод нормалізації
# Створюємо об'єкт StandardScaler
scaler = StandardScaler()
# Навчаємо скейлер на НАВЧАЛЬНИХ даних та трансформуємо їх
X_train_scaled = scaler.fit_transform(X_train)

# Трансформуємо ТЕСТОВІ дані, використовуючи параметри, вивчені на НАВЧАЛЬНИХ даних
X_test_scaled = scaler.transform(X_test)


print(f"California Housing - Форма даних X: {X.shape}")
print(f"California Housing - Форма даних y: {y.shape}")

k_value = 5
# y_predictions = my_knn_regression(X_train=X_train, y_train=y_train, X_test=X_test, k = k_value)
# y_predictions = my_knn_regression(X_train=X_train_scaled, y_train=y_train, X_test=X_test_scaled, k=k_value)
y_predictions = my_knn_regression_vectorization(X_train=X_train_scaled, y_train=y_train, X_test=X_test_scaled, k=k_value)

print(f"\nПрогнозовані ціни (перші 10) для k={k_value}:")
print(y_predictions[:10])
print("\nРеальні ціни (перші 10 тестові):")
print(y_test[:10])

# Оцінка продуктивності
mse = mean_squared_error(y_test, y_predictions)
mae = mean_absolute_error(y_test, y_predictions)
rmse = np.sqrt(mse)

print(f"\n--- Оцінка продуктивності KNN Регресії---")

# Mean Squared Error (MSE) 
# Це середня квадратична помилка. Вона обчислює середнє значення квадратів різниць між прогнозованими
# та реальними цінами. Чим менше MSE, тим краще.
# Оскільки вона обчислює саме квадрати то "карає" великі помилки сильніше, ніж малі, бо помилки підносяться до квадрату.
print(f"Mean Squared Error (MSE): {mse:.2f}")

# Mean Absolute Error (MAE)
# Це середня абсолютна помилка. Вона обчислює середнє значення абсолютних різниць між прогнозованими
# та реальними цінами. Чим менше MAE, тим краще.
# Якщо Mean Absolute Error скажімо 0.8, в середньому твої прогнози відрізняються від реальних цін на 0.80 одиниць 
# (В нашому випадку це на 80_000$)
print(f"Mean Absolute Error (MAE): {mae:.2f}")

# Root Mean Squared Error (RMSE)
# Це корінь квадратний з MSE. Він повертає помилку до вихідних одиниць виміру цільової змінної.
# Припустимо що Root Mean Squared Error 1.6, тоді в середньому твоя модель помиляється
# на 1.06 одиниць (або $106,000) від реальної ціни.
print(f"Root Mean Squared Error (RMSE): {rmse:.2f}")
