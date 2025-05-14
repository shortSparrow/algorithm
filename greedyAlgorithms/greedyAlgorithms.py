'''
Greedy Algorithm це сімейство алгоритмів які не дають точного результату, але
швидко дають приблизний результат (точніше не оптимальний)

Припустимо є задача, потрібно купити радіовежі які покриють собою усі штати США,
однак цих веж багато і деякі з них можуть покривати кілька штатів. Потрібно швидко
визначити мінімальну кількість станцій які треба купити щоб мати покриття на всі США



Особливості python, припустимо є два масива унікальних значень: fruits і vegetables
fruits = set(["avocado", "tomato", "banana"])
vegetables = set(["beets", "carrots", "tomato"])

fruits | vegetables - union (об'єднає два масива в один)
set(["avocado", "beets", "carrots", "tomato", "banana"])

fruits & vegetables - insertion (поверне тільки те що є в обох масивах)
set(["tomato"])

fruits - vegetables
set(["avocado", "banana"]) - difference (поверне тільки те що є в лівому масиві і немає у правому)

vegetables - fruits
set(["beets", "carrots"]) - difference (поверне тільки те що є в лівому масиві і немає у правому)


Тож головна ідея спрощеного алгоритму (approximation algorithm):
  1. Візьміть станцію яка покриває найбільше штатів, які не були покриті ще до цього. Це ОК, якщо
     станція буде також покривати якісь станції які раніше вже були покриті
  2. Повторювати доки всі станції не будуть покриті

Складність такого алгоритму буде O(n^2), де n - це кількість станцій

Цей жадібний алгоритм завжди знайде набір станцій, які покривають усі необхідні штати, якщо таке покриття взагалі існує
'''

stations = {}
stations ["kone"] = set(["id", "nv", "ut"])
stations ["ktwo"] = set(["wa", "id", "mt"])
stations ["kthree"] = set(["or", "nv", "ca"])
stations["kfour"] = set(["nv", "ut"])
stations ["kfive"] = set(["ca", "az"])

final_stations = set()
states_needed = set(["mt", "wa", "or", "id", "nv", "ut", "ca", "az"])

while states_needed:
  best_station = None
  states_covered = set()
  for station, states in stations.items():
    covered = states_needed & states # дістаю ті штати які покриває стація, які у мене ще не покриті  
    if len(covered) > len(states_covered):
      best_station = station
      states_covered = covered

  states_needed -= states_covered
  final_stations.add(best_station)
  # states_covered.clear() # робити не обов'язково оскільки як тільки пройдемося по циклу for і перейдемо до
  # нової ітерації while, то states_covered перествориться наново

print(final_stations) # {'kone', 'kfive', 'ktwo', 'kthree'}

'''
Складність такого greedy algorithm буде O(n^2)
Складність точного алгоритму буде O(n!)

Уявимо що 10 станцій опрацьовуємо за 10 секунд, тоді:
---------------------------------------------------------
|  Number of    |       O(n!)       |       O(n^2)       |
|   stations    |  Exact algorithm  |  Greedy algorithm  |
---------------------------------------------------------
|      5        |  3.2 sec          |    2.5 sec         |
|      10       |  102.4 sec        |    10 sec          |
|      32       |  13.6 years       |    102.4 sec       |
|      100      |  4*10^21 years    |    16.67 min       |
---------------------------------------------------------

'''