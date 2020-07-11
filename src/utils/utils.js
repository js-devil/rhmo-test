export const pathGet = (arr1, query) => {
  // TASK 1:
  // Write a function that searches through the input array / object
  // and returns the appropriate string path leading to the input query, if found
  // Example:
  // const a = {
  //    user: {
  //      id: 1,
  //      name: {
  //        firstName: "James",
  //        lastName: "Ibori"
  //      },
  //      location: {
  //        city: "Ikoyi",
  //        state: "Lagos",
  //        address: "One expensive house like that"
  //      }
  //    }
  // }
  // `pathGet(a, 'One expensive house like that')` = "a.user.location.address"
  // `pathGet(a, 'James')` = "a.user.name.firstName"

  // ============== CODE GOES BELOW THIS LINE :) ==============

  const path = find(arr1, query);
  if (path == null) return "";
  console.log(path);

  let str = "";
  for (let i of path) str += isNaN(i) ? `.${i}` : `[${i}]`;
  console.log(str);
  return str;
};

const find = (obj, item) => {
  for (let key in obj) {
    if (obj[key] && typeof obj[key] === "object") {
      const result = find(obj[key], item);
      if (result) {
        result.unshift(key);
        return result;
      }
    } else if (obj[key] === item) return [key];
  }
};
