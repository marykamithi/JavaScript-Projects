// Function to convert a number to a Roman numeral
function convertToRoman(num) {
    if (num < 1 || num > 3999) {
      return null; // Invalid range
    }
  
    const romanNumerals = [
      { value: 1000, symbol: "M" },
      { value: 900, symbol: "CM" },
      { value: 500, symbol: "D" },
      { value: 400, symbol: "CD" },
      { value: 100, symbol: "C" },
      { value: 90, symbol: "XC" },
      { value: 50, symbol: "L" },
      { value: 40, symbol: "XL" },
      { value: 10, symbol: "X" },
      { value: 9, symbol: "IX" },
      { value: 5, symbol: "V" },
      { value: 4, symbol: "IV" },
      { value: 1, symbol: "I" },
    ];
  
    let result = "";
    
    for (let i = 0; i < romanNumerals.length; i++) {
      while (num >= romanNumerals[i].value) {
        result += romanNumerals[i].symbol;
        num -= romanNumerals[i].value;
      }
    }
    
    return result;
  }
  
  // Event listener for the convert button
  document.getElementById("convert-btn").addEventListener("click", function() {
    const numberInput = document.getElementById("number").value;
    const output = document.getElementById("output");
    
    if (!numberInput) {
      output.textContent = "Please enter a valid number";
      return;
    }
    
    const num = parseInt(numberInput);
  
    if (num < 1) {
      output.textContent = "Please enter a number greater than or equal to 1";
    } else if (num >= 4000) {
      output.textContent = "Please enter a number less than or equal to 3999";
    } else {
      const roman = convertToRoman(num);
      if (roman) {
        output.textContent = roman;
      } else {
        output.textContent = "Please enter a valid number";
      }
    }
  });
  
  
 
  
  