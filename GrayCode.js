/**
 * @param {number} n
 * @return {number[]}
 */
var grayCode = function (n) {
  let arr = ['0', '1'];
  let arrReverse = [...arr].reverse();

  //https://www.tutorialspoint.com/what-is-gray-code

  for (let i = 1; i < n; i++) {
    let newArr = addBitToBinary('0', arr);
    let newArrReverse = addBitToBinary('1', arrReverse);

    //gray code has repetition
    arr = [...newArr, ...newArrReverse];
    arrReverse = [...arr].reverse();
  }

  // convert Binary to Decimal
  return arr.map((str) => parseInt(str, 2));
};

function addBitToBinary(bit, arr) {
  const cloneArr = [...arr];
  for (let j = 0; j < cloneArr.length; j++) {
    cloneArr[j] = bit + cloneArr[j];
  }
  return cloneArr;
}

let result = grayCode(3);
console.log(result);
