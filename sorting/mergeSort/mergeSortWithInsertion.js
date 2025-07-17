/**
 * Merge Sort на маленьких масивах працює гірше за insertionSort, тож якщо об'єднати
 * mergeSort і insertionSort у mixedSort то ефективність буде вище
 * 
 * Тож у нас є insertionSort, mergeSort (який складається з merge і самого mergeSort) і власне новий mixedSort
 */

function insertionSort(arr) {
  if (arr.length === 0) {
    return arr;
  }

  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      const item = arr[j];
      if (arr[j - 1] > item) {
        arr[j] = arr[j - 1];
        arr[j - 1] = item;
      } else {
        break;
      }
    }
  }

  return arr;
}

function merge(arr1, arr2) {
  const result = [];

  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }

  // push rest of arr1 if exist
  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }

  // push rest of arr2 if exist
  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }

  return result;
}

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const middleIndex = Math.floor(arr.length / 2);
  let halfArr1 = mergeSort(arr.slice(0, middleIndex));
  let halfArr2 = mergeSort(arr.slice(middleIndex, arr.length));

  return merge(halfArr1, halfArr2);
}

function mixedSort(arr, k) {
  if (arr.length <= k) { // Якщо розмір підмасиву <= k, використовуємо Insertion Sort
    return insertionSort(arr);
  }

  const middleIndex = Math.floor(arr.length / 2);
  let halfArr1 = mixedSort(arr.slice(0, middleIndex), k);
  let halfArr2 = mixedSort(arr.slice(middleIndex, arr.length), k);

  return merge(halfArr1, halfArr2);
}



// --- Функція для бенчмаркінгу. Перевіримо порівняємо швидкість mixedSort і вже звичного mergeSort ---
function runBenchmark(sortFunction, arrayType, kValue = null, iterations = 5) {
  let label = sortFunction.name;
  if (kValue !== null) {
    label += ` (k=${kValue})`;
  }

  const times = [];
  let testArray;

  // Вибираємо тип масиву для тестування
  const N = 100_000; // Можеш змінювати цей розмір для тестів

  if (arrayType === 'random') {
    testArray = Array.from({ length: N }, () => Math.floor(Math.random() * N));
  } else if (arrayType === 'sorted') {
    testArray = Array.from({ length: N }, (_, i) => i + 1);
  } else if (arrayType === 'reversed') {
    testArray = Array.from({ length: N }, (_, i) => i + 1).reverse();
  } else if (arrayType === 'almostSorted') {
    testArray = Array.from({ length: N }, (_, i) => i + 1).map((val, i, arr) => i % 100 === 0 ? arr[Math.floor(Math.random() * arr.length)] : val);
  } else {
    throw new Error("Невідомий тип масиву");
  }


  // --- Етап "розігріву" JIT-компілятора ---
  // Виконуємо функцію кілька разів на меншому масиві або на копії основного
  // без вимірювання, щоб JIT встиг оптимізувати "гарячий" код.
  const warmUpArray = testArray.slice(0, Math.min(testArray.length, 1000)); // Використаємо меншу частину для розігріву
  for (let i = 0; i < 3; i++) { // 3 ітерації для розігріву
    sortFunction([...warmUpArray], kValue); // kValue тільки якщо функція його приймає
  }


  // --- Основні вимірювання ---
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    sortFunction([...testArray], kValue); // Передаємо копію масиву та kValue
    const end = performance.now();
    times.push(end - start);
  }

  // Обираємо середнє, відкинувши, наприклад, найшвидший і найповільніший результат,
  // або просто беремо середнє з усіх, якщо ітерацій мало.
  // Для простоти візьмемо середнє з усіх:
  const averageTime = times.reduce((sum, t) => sum + t, 0) / times.length;

  console.log(`${label} on ${arrayType} array (Avg over ${iterations} runs): ${averageTime.toFixed(3)} ms`);
  return averageTime;
}

// --- Запуски бенчмарків ---
console.log("--- Початок тестування ---");

// Тестування на випадковому масиві
console.log("\nТестування на випадковому масиві:");
runBenchmark(mixedSort, 'random', 1); // mixedSort з k=1 по суті як mergeSort
runBenchmark(mixedSort, 'random', 16);
runBenchmark(mixedSort, 'random', 32);
runBenchmark(mixedSort, 'random', 64);
runBenchmark(mergeSort, 'random'); // Стандартний mergeSort

// Тестування на відсортованому масиві (insertionSort тут покаже себе з найкращого боку)
console.log("\nТестування на відсортованому масиві:");
runBenchmark(mixedSort, 'sorted', 1);
runBenchmark(mixedSort, 'sorted', 32);
runBenchmark(mergeSort, 'sorted');

// Тестування на оберненому масиві (insertionSort тут покаже себе з найгіршого боку)
console.log("\nТестування на оберненому масиві:");
runBenchmark(mixedSort, 'reversed', 1);
runBenchmark(mixedSort, 'reversed', 32);
runBenchmark(mergeSort, 'reversed');

console.log("\n--- Тестування завершено ---");


/**
 * Для маленьких розмірів масивів insertionSort (O n^2) працює швидше за mergeSort (O n*log n)
 * саме через константи які ми відкидаємо коли говоримо про загальну тенденцію складності
 *  Ці константи включають:
 *    - Накладні витрати на рекурсивні виклики (створення стекових фреймів)
 *    - Операції з пам'яттю (виділення та копіювання підмасивів, як у Merge Sort)
 *    - Ефективність кешу процесора (Insertion Sort має кращу локальність даних).
 * 
 * Приблизний аналіз часу: (я тут все одно спрощую щоб не писати повну складність бо вона вимагає великої кількості дробів)
 * InsertionSort = an^2 + bn + c 
 *      a,b,c - константи
 * MergeSort = 
 *      час розв'язання однієї задачі розміром n/b триває T(n/b), отже для a підзадач: a*T(n/b)
 *      Для нашого випадку
 *      a = 2 (дві підзадачі, оскільки ми завжди ділимо масив на 2 частини)
 *      b = 2 (кожна підзадача має розмір n/2)
 *      Отже маємо 2T(2/n)
 *      D(n) - час розбиття задачі на підзадачі
 *      C(n) - час об'єднати розв'язуи підзадач
 *      Тож сумарний час буде T(n) = 2T(n/2) + D(n) + C(n)
 * 
 * 
 * Маємо:
 *  n - загальна кількість вхідних елементів які треба відсортувати
 *  k - довжина підмасиву
 * Таким чином, n/k - це кількість підсписків (або "підмасивів"), на які розбивається вихідний масив розміру n, якщо кожен підсписок має розмір k.
 * Мається на увазі не під час однієї ітерації де масив розбивається на 2 частини, а протягом усіх ітерації. Ми ділимо масив на дві половини,
 * потім ці половини на ще дві, і так далі, доки розмір підмасиву не стане меншим або рівним k.
 * 
 * Ми емпіричним методом дізнаємося для якого k (довжина підмасиву) буде ефективнішим insertionSort
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * Доведіть, що insertionSort може впорядкувати n/k підсписків завдовжки k за час O(nk) у найгіршому випадку.
 * InsertionSort = ak^2 + bk + c
 * n/k * (ak^2 + bk + c) = nak + nb + nc/k
 * найбільший член який впливає на час - nak
 * оскільки a,b,c - константи
 * Маємо складність nk
 * 
 * Тут важливо розуміти що весь список k буде відсортовано за k^2, але у нас є n/k підсписків і ці підсписки
 * будуть відсортовані за nk
 * Щоб було зрозуміло:
 *    Час сортування ОДНОГО підсписку довжиною k: k^2
 *    Кількість таких підсписків: n/k
 *    СУМАРНИЙ час сортування ВСІХ n/k підсписків: (n/k) = nk
 * 
 * 
 * 
 * 
 * Покажіть, як змерджити підсписки за час O(n*log(n/k)) у найгіршому випадку.
 * Розуміння завдання
 *    У стандартному Merge Sort загальний час на фазу злиття на всіх рівнях рекурсії становить O(n*log n).
 *    У нашому модифікованому алгоритмі ми припиняємо рекурсію Merge Sort раніше (коли підмасив стає розміром k)
 *    і сортуємо ці "листки" за допомогою Insertion Sort.
 * 
 *    Після того, як всі n/k підсписків довжиною k відсортовані за допомогою Insertion Sort, ми повинні їх злити в один
 *    великий відсортований масив, використовуючи стандартний механізм злиття Merge Sort. 
 * 
 * 
 * Стандартний Merge Sort має (log n) рівнів рекурсії (або глибини).
 * Але оскільки ми зупиняємо рекурсію, коли розмір підмасиву стає k, то і глибина рекурсії зменшується
 * Тобто, фактично, ми починаємо процес злиття з рівня, де у нас є n/k відсортованих підмасивів, кожен розміром k.
 * Якщо стандартний MergeSort має (log n) рівнів, то наш модифікований MergeSort має (log n - log k = log n/k) рівнів, на яких відбувається злиття.
 * 
 * Вартість злиття на кожному рівні:
 * Загальна вартість злиття = (Кількість рівнів злиття) × (Вартість злиття на одному рівні)
 * Загальна вартість злиття = (log n/k) * n => n*log n/k
 * 
 * Можна поставити запитання, чому Вартість злиття на одному рівні = n
 * Коли ми розбиваємо масив і отримуємо піраміду
 *                  [10,9,8,7,6,5,4,3,2,1]

              [10,9,8,7,6]            [5,4,3,2,1]

           [10,9]    [8,7,6]         [5,4]     [3,2,1]

        [10] [9]    [8] [7,6]       [5] [4]     [3] [2,1]
 * 
 * Вартість злиття кожного ряду буде n бо в кожному знаходиться n елементів
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * Яка загальна складність такого алгоритму
 *    O(nk + n*log(n/k))
 * Оскільки nk - це insertionSort, а n*log(n/k) - це mergeSort який працює вже зі списками довжина яких довша за k
 * 
 * 
 * 
 * 
 * 
 * Якщо така видозміна алгоритму працює за час O(nk + n*log(n/k)) у найгіршому випадку, яке найбільше значення k як функції
 * від n, для якого видозмінений алгоритм має такий самий час роботи, що й для стандартного сортування зливанням?
 * Дайте відповідь у Ө-позначеннях.
 * 
 * Отже повинна виконуватися умова O(nk + n*log(n/k)) = O(n*log n)
 * 
 * Оскільки це не строга рівність, а приблизна (БО МИ ОПУСТИЛИ ЧАСТИНУ ЗНАЧЕНЬ O(3n) і O(2n) обидва =  O(n), але 3n!=2n)
 * то такий підхід не буде правильним:
 * nk + n*log(n/k) = n*log n    | оскільки n є спільним множником то :n прибере його
 * k + log(n/k) = log n         | log a/b = log a - log b
 * k + log n - log k = log n
 * k - log k = log n - log n 
 * k - log k = 0
 * k = log k
 * 
 * 
 * Правильний підхід
 * O(nk + n*log(n/k)) = O(n*log n)    | оскільки n є спільним множником то :n прибере його
 * O(k + log(n/k)) = O(log n)         | log a/b = log a - log b
 * O(k + log n - log k) = O(log n)    | O(k + log n - log k) МАЄ БУТИ АСИМПТОТИЧНО НЕ БІЛЬШИМ ЗА O(log n) 
 * Розгляньмо компоненти окремо
 * Для цього ми розглядаємо компоненти виразу k + log n − log k:
 *    1) O(k) = O(log n)
 *         Для цього k сам по собі має бути O(log n). Це верхня межа для k.
 *    2) O(log n − log k) = O(log n)
 *       O(log n/k) = O(log n)
 *         Для цього потрібно, щоб k не було настільки малим, щоб log(n/k) стало значно більшим за log n.
 *         Але це зазвичай не проблема, оскільки k є функцією, що зростає повільніше за n.
 * 
 * Ми шукаємо найбільше k, яке задовольняє цю умову. Якщо k зростає як log n, тобто k=C⋅log n 
 * 
 * Найбільше значення k = log n
 * Підставимо k у нашу формулу складності
 *    O(nk + n*log(n/k)) => O(n*log n + n*log(n/(log n))) => n*log n
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * Як на практиці маємо обирати k?
 * Схоже що емпірично, імовірно для різних наборів даних дані можуть відрізнятися, але загалом це залежить від процесора машини
 * і його особливостей і спроможностей
 */




