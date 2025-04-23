
// function searchStringNaive(str, searchChunk) {
//   let count = 0

//   for(let i=0; i<str.length; i++) {
//     iBeforeFirstMatch = i // потрібно щоб хендилити випадок коли перша літера співпала, то ми маємо почати перевіряти наступну у searchChunk тож маємо збільшити i, але якщо співпадіння не буде треба повернутися на попередній i щоб не втратити частину рядка для перевірки на першу літеру
//     for(let j=0; j<searchChunk.length; j++) {
      
//       if(searchChunk[j] != str[i]) {
//         i = iBeforeFirstMatch
//         break
//       }
//       i++
//       if (j === searchChunk.length - 1) {
//         count++
//       }
//     }
//   }

//   return count
// }

// Таки же самий як і приклад зверху, але немає iBeforeFirstMatch, бо його функцію виконує [i + j] і це значно краще
function searchStringNaive(str, searchChunk) {
  let count = 0

  for(let i=0; i<str.length; i++) {
    for(let j=0; j<searchChunk.length; j++) {
      // i + j щоб коли проходимося циклом по searchChunk отримати всі наступні літери у str
      if(searchChunk[j] != str[i + j]) {
        break
      }
      if (j === searchChunk.length - 1) {
        count++
      }
    }
  }

  return count
}

console.log(searchStringNaive("mmydHello world my dear pla, fece dor deer big O notation", "my"));
