// 👇️ if you need to capitalize first and lowercase the rest
export const capitalizeFirstLowercaseRest = str => {
    return (
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    );
  };


// 👇️ if you only need to capitalize the first letter
export const capitalizeFirst = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

// 👇️ if you only need to capitalize the first char
export const returnFirstChar = str => {
    return str.charAt(0).toUpperCase();
  };