// Global variables
let price = 19.5; // Example price
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

// Currency units and their values
const unitAmount = [
  ["PENNY", 0.01],
  ["NICKEL", 0.05],
  ["DIME", 0.1],
  ["QUARTER", 0.25],
  ["ONE", 1],
  ["FIVE", 5],
  ["TEN", 10],
  ["TWENTY", 20],
  ["ONE HUNDRED", 100]
];

// Get DOM elements
const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");
const cashDrawer = document.getElementById("cash-drawer");

// Function to update the change due
const updateChangeDue = (expectedChange) => {
  let remainChange = expectedChange;
  let changeArr = [];
  
  // First, check if we have enough funds
  let totalDrawer = cid.reduce((acc, curr) => acc + curr[1], 0);
  if (remainChange > totalDrawer) {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  // Then check if we can give the exact change with available denominations
  for (let i = cid.length - 1; i >= 0; i--) {
    if (remainChange === 0) break;

    let coinValue = unitAmount[i][1];
    let coinCount = Math.floor(remainChange / coinValue);
    let availableAmount = cid[i][1];

    // Take the minimum of the needed amount and the available coins
    let amountToGive = Math.min(coinCount, Math.floor(availableAmount / coinValue));
    
    if (amountToGive > 0) {
      let changeGiven = amountToGive * coinValue;
      remainChange = Number((remainChange - changeGiven).toFixed(2)); // Adjust floating point precision
      changeArr.push([unitAmount[i][0], changeGiven]);
      cid[i][1] -= changeGiven; // Update the cash drawer
    }
  }

  // Check if we still have remaining change after attempting to give coins
  if (remainChange > 0) {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  // Check for exact match with cash drawer (CLOSED)
  if (remainChange === 0 && totalDrawer === expectedChange) {
    let resultMsg = "Status: CLOSED\n";
    for (let change of changeArr) {
      resultMsg += `${change[0]}: $${change[1]}\n`;
    }
    changeDue.textContent = resultMsg.trim();
    return;
  }

  // If we have no remaining change and we were able to give change, it's OPEN
  if (expectedChange === 0) {
    changeDue.textContent = "No change due - customer paid with exact cash";
  } else {
    // Sort the change from highest to lowest
    changeArr.sort((a, b) => b[1] - a[1]);
    let resultMsg = "Status: OPEN\n";
    for (let change of changeArr) {
      resultMsg += `${change[0]}: $${change[1]}\n`;
    }
    changeDue.textContent = resultMsg.trim();
  }

  // Update the cash drawer display
  setCashDrawer(cid);
};

// Function to update the cash drawer in the UI
const setCashDrawer = (cid) => {
  cashDrawer.innerHTML = ``;
  for (const cash of cid) {
    cashDrawer.innerHTML += `
      <div class="cid" value="${cash[1]}">
        <div class="currency-unit">${cash[0]}: $<span class="amount">${cash[1]}</span></div>
      </div>
    `;
  }
};

// Function to handle button click event
purchaseBtn.addEventListener("click", () => {
  let cashProvided = parseFloat(cashInput.value);
  
  // Check if the customer has enough money
  if (cashProvided < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  // Calculate change due
  let expectedChange = cashProvided - price;
  updateChangeDue(expectedChange);
});
