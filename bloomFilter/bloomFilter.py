import hashlib
from typing import Callable

# Задача
# У нас є база даних з username юзерів, коли новий користувач хоче зареєструватися
# йому потрібно вигадати новий унікальний username. Як нам швидко перевірити чи цей
# username вільний, особливо якщо у нас дуже багато юзерів і лінійний пошук займе забагато часу


# ! Важливе уточнення. Bloom Filter працює з бітовим масивом для економії пам'яті, але тут
# ! ми використовуємо звичайний масив з int для простоти, суть та саме, але треба знати різницю
# ! що масив з int 0 і 1 - це не бітовий масив!


# Оптимальне значення k (кількість hash функцій) розраховується за формулою: k=(m/n)∗ln(2)
#     k – оптимальна кількість хеш-функцій.
#     m – розмір бітового масиву (кількість бітів).
#     n – очікувана кількість елементів, які будуть додані до фільтра.
#     ln(2) – натуральний логарифм 2 (приблизно 0.693).
# Детальніше дивитися main.py

HashFunction = Callable[[str], str]


class BloomFilter:
    def __init__(self, size: int, hashes: list[HashFunction]):
        self.size = size
        self.bit_array = [0] * size  # Наш масив з 0 і 1
        self.hashes = hashes

    # Генерує кілька хешів для елемента.
    def _get_hashes(self, item):
        hashes = []
        for _hash in self.hashes:
            h = _hash(f"{item}".encode("utf-8"))

            # Перетворюємо хеш у число і беремо остачу від ділення на розмір масиву
            hashes.append(int(h, 16) % self.size)
        return hashes

    # Додає елемент до фільтра Блума.
    def add(self, item):
        # Отримуємо всі хеші для цього елемента
        indices = self._get_hashes(item)
        for index in indices:
            self.bit_array[index] = 1  # Встановлюємо біт в 1

    def contains(self, item):
        """
        Перевіряє, чи елемент, можливо, знаходиться у фільтрі.
        Повертає True, якщо всі відповідні біти встановлені в 1.
        Повертає False, якщо хоча б один біт дорівнює 0.
        """
        # Отримуємо всі хеші для цього елемента
        indices = self._get_hashes(item)
        for index in indices:
            if self.bit_array[index] == 0:
                return False  # Якщо хоча б один біт 0, елемента точно немає
        return True  # Якщо всі біти 1, елемент, можливо, є


bloomFilter = BloomFilter(
    size=10,
    hashes=[
        lambda value: hashlib.sha256(value).hexdigest(),
        lambda value: hashlib.sha1(value).hexdigest(),
    ],
)

bloomFilter.add("Hello")  # Заповнить 1 індекси 0 і 9
bloomFilter.add("Bloom")  # Заповнить 1 індекси 2 і 7
print(bloomFilter.bit_array)

# На цей момент hashed_database має такий вигляд [1, 0, 1, 0, 0, 0, 0, 1, 0, 1]
# sha256 поверне індекс 8, sha1 поверне індекс 2
# Але оскільки тільки один з індексів дорівнює 1, то значить цього username немає в нашій базі даних
print(bloomFilter.contains("Welcome"))  # False


# Приклад з правильно розрахованою кількістю hash функцій

# Мій масив буде мати 100 елементів (m) і я планую записати у нього не більше 20 елементів (n), 
# тоді к-сть hash функцій буде: k=(m/n)∗ln(2) 
# k = (100/20) * ln(2) 
# k = 5 * ln(2) = 3.46 => 3
# bloomFilter = BloomFilter(
#     size=100,
#     hashes=[
#         lambda value: hashlib.sha256(value).hexdigest(),
#         lambda value: hashlib.sha1(value).hexdigest(),
#         lambda value: hashlib.sha224(value).hexdigest(),
#     ],
# )

# for i in range(0,20):
#     bloomFilter.add(i)
# print(bloomFilter.bit_array)

# print(bloomFilter.contains(0)) # True
# print(bloomFilter.contains(2)) # True
# print(bloomFilter.contains(19)) # True
# print(bloomFilter.contains(20)) # False
# print(bloomFilter.contains(25)) # False