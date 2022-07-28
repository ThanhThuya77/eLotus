/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findLength = function (nums1, nums2) {
  let maxLength = 0;

  for (let i = 0; i < nums1.length; i++) {
    const arrIdxs = getAllIndexes(nums2, nums1[i]);

    // loop for all position that equal nums1[i]
    for (let j = 0; j < arrIdxs.length; j++) {
      let maxTemp = 0;
      let tempPosI = i;
      // start looping to compare at that position
      for (
        let k = arrIdxs[j];
        k < nums2.length && tempPosI < nums1.length;
        k++
      ) {
        // increase parallels the position of nums1 and nums2 and compare
        if (nums1[tempPosI++] === nums2[k]) {
          maxTemp++;
        } else {
          break;
        }
      }
      maxLength = maxTemp > maxLength ? maxTemp : maxLength;
    }
  }
  return maxLength;
};

function getAllIndexes(nums2, num) {
  const indexes = [];
  for (let index = 0; index < nums2.length; index++) {
    if (nums2[index] === num) {
      indexes.push(index);
    }
  }
  return indexes;
}

let nums1 = [1, 2, 3, 2, 1];
let nums2 = [3, 2, 1, 4, 7];
let result = findLength(nums1, nums2);
console.log(result);

nums1 = [0, 0, 0, 0, 0];
nums2 = [0, 0, 0, 0, 0];
result = findLength(nums1, nums2);
console.log(result);
