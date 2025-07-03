import numpy as np
from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error


# Задача
# Маємо набір даних про будинки у Каліфорнії, кожен будинок має 8 параметрів, потрібно
# передбачити скільки скільки буде коштувати будинок якщо йому задати інші параметри
#    8 параметрів будинку:
#       ['MedInc', 'HouseAge', 'AveRooms', 'AveBedrms', 'Population', 'AveOccup', 'Latitude', 'Longitude']
#       [8.3252, 41.0, 6.984126984126984, 1.0238095238095237, 322.0, 2.5555555555555554, 37.88, -122.23]


# 1. Завантаження даних
housing = fetch_california_housing()
# housing.data - [[float, float, float, float, float, float, float, float ],...] Форма (20640, 8), де
# 20640 - це кількість будинків, а 8 це кількість параметрів для кожного з них
X = housing.data  # Ознаки (характеристики будинків)

# housing.target - [float, float, ....] Форма (20640,), де 20640 - це кількість будинків,
# а значення - це ціна за кожний будинок
y = housing.target  # Цільова змінна (ціни на будинки)

print(f"Форма даних X: {X.shape}")
print(f"Форма даних y: {y.shape}")

# 2. Розділення даних на навчальний та тестовий набори
# test_size=0.2 означає 20% даних для тестування, 80% для навчання
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print(f"Форма X_train: {X_train.shape}")
print(f"Форма y_train: {y_train.shape}")

# 3. Масштабування ознак
# StandardScaler приводить дані до середнього значення 0 та стандартного відхилення 1
scaler = StandardScaler()

# Навчаємо скейлер на навчальних даних та трансформуємо їх
X_train_scaled = scaler.fit_transform(X_train)

# Трансформуємо тестові дані, використовуючи параметри, вивчені на навчальних даних
X_test_scaled = scaler.transform(X_test)

print(
    f"Приклад перших 5 масштабованих ознак X_train_scaled[0]: {X_train_scaled[0][:5]}"
)

# 4. Ініціалізація та навчання моделі KNN Регресії
k_value = 5  # Кількість найближчих сусідів (аналогічно твоєму k)

# Створюємо екземпляр KNeighborsRegressor
# n_neighbors=k_value встановлює k
# (за замовчуванням weights='uniform' і metric='minkowski' з p=2, що дорівнює Евклідовій відстані)
knn_model = KNeighborsRegressor(n_neighbors=k_value)

print(f"\nНавчання моделі KNN з k={k_value}...")
# Навчаємо модель на масштабованих навчальних даних
knn_model.fit(X_train_scaled, y_train)

# 5. Прогнозування на тестовому наборі
print("Прогнозування на тестових даних...")
y_pred_sklearn = knn_model.predict(X_test_scaled)

print(f"\nПрогнозовані ціни (перші 10) для k={k_value}:")
print(y_pred_sklearn[:10])
print("\nРеальні ціни (перші 10 тестові):")
print(y_test[:10])

# 6. Оцінка продуктивності моделі
mse_sklearn = mean_squared_error(y_test, y_pred_sklearn)
mae_sklearn = mean_absolute_error(y_test, y_pred_sklearn)
rmse_sklearn = np.sqrt(mse_sklearn)

print(f"\n--- Оцінка продуктивності SCIKIT-LEARN KNN Регресії ---")
# Mean Squared Error (MSE)
# Це середня квадратична помилка. Вона обчислює середнє значення квадратів різниць між прогнозованими
# та реальними цінами. Чим менше MSE, тим краще.
# Оскільки вона обчислює саме квадрати то "карає" великі помилки сильніше, ніж малі, бо помилки підносяться до квадрату.
print(f"Mean Squared Error (MSE): {mse_sklearn:.2f}")

# Mean Absolute Error (MAE)
# Це середня абсолютна помилка. Вона обчислює середнє значення абсолютних різниць між прогнозованими
# та реальними цінами. Чим менше MAE, тим краще.
# Якщо Mean Absolute Error скажімо 0.8, в середньому твої прогнози відрізняються від реальних цін на 0.80 одиниць
# (В нашому випадку це на 80_000$)
print(f"Mean Absolute Error (MAE): {mae_sklearn:.2f}")

# Root Mean Squared Error (RMSE)
# Це корінь квадратний з MSE. Він повертає помилку до вихідних одиниць виміру цільової змінної.
# Припустимо що Root Mean Squared Error 1.6, тоді в середньому твоя модель помиляється
# на 1.06 одиниць (або $106,000) від реальної ціни.
print(f"Root Mean Squared Error (RMSE): {rmse_sklearn:.2f}")
