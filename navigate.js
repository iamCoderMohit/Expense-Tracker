const addArea = document.getElementById("doneArea");
const deleteArea = document.getElementById("deleteArea");
const homeArea = document.getElementById("homeArea");
const monthArea = document.getElementById("monthArea");

const addExpense = document.querySelector(".addExpense");
const doneExpensesNew = document.querySelector(".doneExpenses");
const deletedExpensesNew = document.querySelector(".deletedExpenses");
const monthExpenses = document.querySelector(".monthExpenses");

homeArea.addEventListener("click", () => {
  addExpense.style.display = "block";
  addExpense.style.display = "flex";
  doneExpensesNew.style.display = "none";
  deletedExpensesNew.style.display = "none";
  document.querySelector(".addEx").style.display = "flex";
  monthExpenses.style.display = "none";
});

addArea.addEventListener("click", () => {
  addExpense.style.display = "none";
  doneExpensesNew.style.display = "block";
  deletedExpensesNew.style.display = "none";
  monthExpenses.style.display = "none";
});

deleteArea.addEventListener("click", () => {
  addExpense.style.display = "none";
  doneExpensesNew.style.display = "none";
  deletedExpensesNew.style.display = "block";
  monthExpenses.style.display = "none";
});

monthArea.addEventListener("click", () => {
  addExpense.style.display = "none";
  doneExpensesNew.style.display = "none";
  deletedExpensesNew.style.display = "none";
  monthExpenses.style.display = "block";
});
