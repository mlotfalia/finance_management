var count = 0;
const itemExpense = [];
const itemIncome = [];
const monthIncome = [];
const monthExpense = [];
let totalIncome = 0;
let totalExpense = 0;
let countExpense = 0;
let countIncome = 0;
let expenseAmount = document.querySelector(".amountOfExpense");
let incomeAmount = document.querySelector(".amountOfIncome");
let submitBtn = document.querySelector("#submit");
let table = document.querySelector("#list");
submitBtn.addEventListener("click", submitData);
function submitData(e) {
  e.preventDefault();
  let rows = "";
  let expense = document.querySelector(
    'input[name="expenseIncome"]:checked'
  ).value;
  let amount = document.getElementById("amount").value;
  let year = document.getElementById("year").value;
  let month = document.getElementById("month").value;
  let day = document.getElementById("day").value;
  checkAmount(amount);
  checkYear(year);
  checkMonth(month);
  checkDay(day);

  table.style.display = "inline-table";
  let date = ` ${year}/${month}/${day}`;

  count = count + 1;

  rows +=
    `<tr id ="row${count}" ><td> 
            <input type="button" class="btn btn-outline-danger" id="removeBtn${count}" onclick = "deleteRow(this)" value="حذف">
            <button type="button" class="btn btn-primary" id="showBtn${count}">نمایش</button>
          </td><td id = "expenseOrIncome${count}"  class = "rowExpense"> ` +
    expense +
    "</td><td>" +
    date +
    `</td ><td id =" amount" class = "rowAmount">` +
    amount +
    "تومان" +
    `</td id="${count}"><td>` +
    count +
    "</td></tr>";

  $(rows).appendTo("#list tbody");
  amount = parseFloat(amount);
  month = parseInt(month);
  if (expense === "هزینه") {
    itemExpense[countExpense] = amount;
    monthExpense[countExpense] = month;
    getExpense(amount);
    countExpense += 1;
  } else {
    getIncome(amount);
    itemIncome[countIncome] = amount;
    monthIncome[countIncome] = month;
    countIncome += 1;
  }
  displayChart(itemIncome, itemExpense);
  return false;
}
let deleteExpense = 0;
let deleteIncome = 0;
function deleteRow(row) {
  var i = row.parentNode.parentNode.rowIndex;
  let expenseKind = document
    .getElementById("list")
    .rows[i].cells.item(1).innerHTML;
  expenseKind = expenseKind.replace(" ", "");
  let amountInRow = document
    .getElementById("list")
    .rows[i].cells.item(3).innerHTML;

  let amountInput = amountInRow.replace("تومان", "");
  if (expenseKind === "هزینه") {
    deleteExpense = amountInput;
    deleteExpense = parseFloat(deleteExpense);
    removeExpense(deleteExpense);
  } else {
    deleteIncome = amountInput;
    deleteIncome = parseFloat(deleteIncome);
    removeIncome(deleteIncome);
  }
  if (i > 0) {
    if (confirm("It will be deleted..!!")) {
      document.getElementById("list").deleteRow(i);
    }
  }
}
function checkAmount(amount) {
  let error = document.querySelector(".errorAmount");
  let amountInput = document.querySelector("#amount");
  if (amount == 0 || !amount) {
    error.style.display = "block";
    error.textContent = " !مبلغ به درستی وارد نشده است";
    error.style.color = "red";
    amountInput.style.border = "1px solid #b80c09";
    amountInput.placeholder = "مقدار نمیتواند صفر باشد یا خالی بماند";
    amountInput.style.color = "#b80c09";
    setTimeout(() => {
      amountInput.style.color = "#495057";
      amountInput.style.border = "2px solid gray";
    }, 5000);
    submitData(e);
  } else {
    error.style.display = "none";
  }
}
function checkYear(year) {
  let yearInput = document.querySelector("#year");
  let error = document.querySelector(".error");
  if (!year || year == 0 || year > 1410 || year < 1390) {
    error.textContent = " سال باید عددی بین 1390 تا 1410 باشد";
    error.style.color = "red";
    yearInput.style.border = "1px solid #b80c09";
    yearInput.style.color = "#b80c09";
    setTimeout(() => {
      yearInput.style.color = "#495057";
      yearInput.style.border = "2px solid gray";
    }, 5000);
    submitData(e);
  }
}
function checkMonth(month) {
  let monthInput = document.querySelector("#month");
  let error = document.querySelector(".error");
  if (!month || month == 0 || month > 12 || month < 0) {
    error.textContent = "ماه باید بین 1 تا 12 باشد";
    error.style.color = "red";
    monthInput.style.border = "1px solid #b80c09";
    monthInput.style.color = "#b80c09";
    setTimeout(() => {
      monthInput.style.color = "#495057";
      month.style.border = "2px solid gray";
    }, 5000);
    submitData(e);
  } else {
    error.style.display = "none";
  }
}
function checkDay(day) {
  let dayInput = document.querySelector("#day");
  let error = document.querySelector(".error");
  if (!day || day == 0 || day > 30 || day < 0) {
    error.textContent = " روز باید عددی بین 1 تا 30 باشد";
    error.style.color = "red";
    dayInput.style.border = "2px solid #b80c09";
    dayInput.style.color = "#b80c09";
    setTimeout(() => {
      dayInput.style.color = "#495057";
      dayInput.style.border = "2px solid gray";
    }, 5000);
    submitData(e);
  } else {
    error.style.display = "none";
  }
}
function getExpense(amount) {
  let expenseColor = document.querySelector(`#expenseOrIncome${count}`);
  let sumValue = document.querySelector(".sum");
  expenseColor.style.color = "red";
  sumValue.style.display = "block";
  totalExpense += amount;
  expenseAmount.innerHTML = totalExpense;
  return totalExpense;
}
function getIncome(amount) {
  let expenseColor = document.querySelector(`#expenseOrIncome${count}`);
  let sumValue = document.querySelector(".sum");
  sumValue.style.display = "block";
  expenseColor.style.color = "green";
  totalIncome += amount;
  incomeAmount.innerHTML = totalIncome;
  return totalIncome;
}

function removeExpense(amount) {
  totalExpense -= amount;
  expenseAmount.innerHTML = totalExpense;
}
function removeIncome(amount) {
  totalIncome -= amount;
  incomeAmount.innerHTML = totalIncome;
}

function displayChart(itemIncome, itemExpense) {
  let ctx = document.querySelector("#lineChart");
  ctx.style.display = "block";
  ctx = ctx.getContext("2d");

  const labels = [
    [1, "فروردین"],
    [2, "اردیبهشت"],
    [3, "خرداد"],
    [4, "تیر"],
    [5, "مرداد"],
    [6, "شهریور"],
    [7, "مهر"],
    [8, "آبان"],
    [9, "آذر"],
    [10, "دی"],
    [11, "بهمن"],
    [12, "اسفند"],
  ];
  var data = {
    labels: labels,
    datasets: [
      {
        label: "درآمد",
        data: itemIncome,
        backgroundColor: "green",
        borderColor: "lightgreen",
        fill: false,
        lineTension: 0,
        pointRadius: 5,
      },
      {
        label: "هزینه",
        data: itemExpense,
        backgroundColor: "red",
        borderColor: "red",
        fill: false,
        lineTension: 0,
        pointRadius: 5,
      },
    ],
  };
  var options = {
    title: {
      display: true,
      positions: "top",
      text: "مدیریت هزینه",
    },
  };

  expenseChart = new Chart(ctx, {
    type: "line",
    data: data,
    options: options,
  });
}
