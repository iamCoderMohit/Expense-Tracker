let expenses = [];
let deletedExpenses = [];
let doneExpenses = [];
let total = 0

document.addEventListener("DOMContentLoaded", () => {
  const storedExpenses = localStorage.getItem("expenses");

  if (storedExpenses) {
    expenses = JSON.parse(storedExpenses);
    expenses.forEach(addExpenseToDOM);
    calcualteTotal()
  }
});

document.getElementById("addButton").addEventListener("click", () => {
  const expense = document.getElementById("exp").value;
  const amount = document.getElementById("amount").value;
  const type = document.getElementById("type").value;

  if (!expense || isNaN(amount) || amount <= 0) {
    alert("Please enter valid expense details.");
    return;
  }

  const obj = {
    id: Date.now(),
    name: expense,
    amount: parseInt(amount),
    type: type,
  };

  expenses.push(obj);

  localStorage.setItem("expenses", JSON.stringify(expenses));

  addExpenseToDOM(obj);

  calcualteTotal()

  document.getElementById("exp").value = "";
  document.getElementById("amount").value = "";
  // document.getElementById("type").value = "";
});

function addExpenseToDOM(expense) {
  const listExpenses = document.getElementById("listExpenses");
  const detail = document.createElement("div");
  detail.classList.add("detail");
  detail.dataset.id = expense.id;

  const detailName = document.createElement("h3");
  detailName.textContent = expense.name;

  const detailAmount = document.createElement("p");
  detailAmount.textContent = expense.amount;

  const detailType = document.createElement("p");
  detailType.textContent = expense.type;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("deleteButton");
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", () => {
    deletedExpense(expense.id, detail);
  });

  const doneButton = document.createElement("button");
  doneButton.classList.add("doneButton");
  doneButton.textContent = "Done";

  doneButton.addEventListener("click", () => {
    doneExpense(expense.id, detail);
  });

  detail.appendChild(detailName);
  detail.appendChild(detailAmount);
  detail.appendChild(detailType);
  detail.appendChild(deleteButton);
  detail.appendChild(doneButton);

  listExpenses.appendChild(detail);
}

//function to delete and done element

function deletedExpense(id, element) {
  const expenseToDelete = expenses.find((expense) => expense.id == id);

  expenses = expenses.filter((expense) => expense.id !== id);

  deletedExpenses.push(expenseToDelete);

  localStorage.setItem("expenses", JSON.stringify(expenses));
  localStorage.setItem("deletedExpenses", JSON.stringify(deletedExpenses));

  calcualteTotal()

  element.remove();

  moveToDeletedSection(expenseToDelete);
  moveToMonthSection(expenseToDelete);
}

function doneExpense(id, element) {
  const expenseToDone = expenses.find((expense) => expense.id == id);

  expenses = expenses.filter((expense) => expense.id !== id);

  doneExpenses.push(expenseToDone);

  localStorage.setItem("expenses", JSON.stringify(expenses));
  localStorage.setItem("doneExpenses", JSON.stringify(doneExpenses));

  calcualteTotal()

  element.remove();

  moveToDoneSection(expenseToDone);
  moveToMonthSection(expenseToDone);
}

function moveToDeletedSection(expense) {
  const deletedSection = document.querySelector(".deletedExpenses");

  const deletedDetail = document.createElement("div");
  deletedDetail.classList.add("deletedDetail");

  const deletedName = document.createElement("h3");
  deletedName.textContent = expense.name;

  const deletedAmount = document.createElement("p");
  deletedAmount.textContent = expense.amount;

  const deletedType = document.createElement("p");
  deletedType.textContent = expense.type;

  deletedDetail.appendChild(deletedName);
  deletedDetail.appendChild(deletedAmount);
  deletedDetail.appendChild(deletedType);

  deletedSection.appendChild(deletedDetail);
}

function moveToDoneSection(expense) {
  const doneSection = document.querySelector(".doneExpenses");

  const doneDetail = document.createElement("div");
  doneDetail.classList.add("doneDetail");

  const doneName = document.createElement("h3");
  doneName.textContent = expense.name;

  const doneAmount = document.createElement("p");
  doneAmount.textContent = expense.amount;

  const doneType = document.createElement("p");
  doneType.textContent = expense.type;

  doneDetail.appendChild(doneName);
  doneDetail.appendChild(doneAmount);
  doneDetail.appendChild(doneType);

  doneSection.appendChild(doneDetail);
}

function moveToMonthSection(expense) {
  const monthSection = document.querySelector(".monthExpenses");

  const monthDetail = document.createElement("div");
  monthDetail.classList.add("monthDetail");

  const monthName = document.createElement("h3");
  monthName.textContent = expense.name;

  const monthAmount = document.createElement("p");
  monthAmount.textContent = expense.amount;

  const monthType = document.createElement("p");
  monthType.textContent = expense.type;

  monthDetail.appendChild(monthName);
  monthDetail.appendChild(monthAmount);
  monthDetail.appendChild(monthType);

  monthSection.appendChild(monthDetail);
}

//calculating the total
function calcualteTotal(){
  total = expenses.reduce((sum, expense) => sum + expense.amount, 0); // Recalculate total
  document.getElementById("netAm").textContent = `${total} Rs`; 

  totalDone = doneExpenses.reduce((sum, expense) => sum + expense.amount, 0); // Recalculate total
  document.getElementById("netAmDone").textContent = `${totalDone} Rs`; 

  totalDel = deletedExpenses.reduce((sum, expense) => sum + expense.amount, 0); // Recalculate total
  document.getElementById("netAmDel").textContent = `${totalDel} Rs`; 
 // Recalculate total
  document.getElementById("netAmMon").textContent = `${totalDone + totalDel} Rs`; 
}