export const sortMapByValue =  (map, limit) => {
    const sortedArray =  Array.from(map).sort((a, b) => b[1] - a[1]);
    const slicedArray =  sortedArray.slice(1, limit+1);
      return  new Map(slicedArray);

};
