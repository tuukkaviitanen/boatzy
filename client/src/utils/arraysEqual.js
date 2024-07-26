/**
 *
 * @param {[]} array1
 * @param {[]} array2
 * @returns {boolean}
 */
const arraysEqual = (array1, array2) => {
  return (
    structuredClone(array1).sort().toString() ===
    structuredClone(array2).sort().toString()
  );
};

export default arraysEqual;
