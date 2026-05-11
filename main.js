// Get references to important DOM elements
const monthlyIncome = document.getElementById("monthly_income");
const totalExpenses = document.getElementById("total_expenses");
const remainingBudget = document.getElementById("remaining_budget");
const expenseList = document.getElementsByClassName("expense_list");
const addExpenseBtn = document.getElementById("add_expense");

// event listener for income input changes
monthlyIncome.addEventListener("input", () => {
  updateBudget();
  saveData();
});
let draggedItem = null;
// Function to create a new expense category
function createExpenseCategory(name = "New Expense", amount = "") {
  const newExpense = document.createElement("div");
  newExpense.className = "expense_category";
  newExpense.draggable = true;
  newExpense.innerHTML = `
            <span contenteditable="true">${name}</span>
            <input type="number" placeholder="Amount.." value="${amount}" />
            <button class="delete_expense" aria-label="Delete expense">✗</button>
        `;
  const input=newExpense.querySelector("input");
  input.addEventListener("input", () => {
    updateBudget();
    saveData();
  });
  newExpense.querySelector("span").addEventListener("input", saveData);
  // drag and drop event listeners
  newExpense.addEventListener("dragstart", ()=>{
    draggedItem = newExpense;
  })
  newExpense.addEventListener("dragover",(e)=>{
    e.preventDefault();
  })
  newExpense.addEventListener("drop",(e)=>{
    if(draggedItem !== newExpense) {
      expenseList[0].insertBefore(draggedItem, newExpense);
      updateBudget();
      saveData();
    }
  });
  return newExpense;
}
// Event listener for adding new expense category
addExpenseBtn.addEventListener("click", () => {
  const expense = createExpenseCategory();
  expenseList[0].appendChild(expense);
  updateBudget();
  saveData();
});

// handle deletion of expense category
expenseList[0].addEventListener("click", (e) => {
  if(e.target.className === "delete_expense") {
    e.target.parentElement.remove();
    updateBudget();
    saveData();
  }
});

// calculate total expenses and remaining budget
const updateBudget=() => {
  const income = parseFloat(monthlyIncome.value) || 0;
  const expenseInputs=document.querySelectorAll(".expense_category input[type='number']");
  let expenseTotal=0;
  expenseInputs.forEach(input=>{
    expenseTotal+=parseFloat(input.value) || 0;
  });
  totalExpenses.textContent=expenseTotal.toFixed(2);
  const remaining=income - expenseTotal;
  remainingBudget.textContent=remaining.toFixed(2);
}
// save data to local storage
const saveData=()=>{
  let expenses=[];

  document.querySelectorAll('.expense_category').forEach(expense=>{
    const name=expense.querySelector("span").textContent;
    const amount=expense.querySelector("input").value;

    expenses.push({
      name,
      amount
    })
  })
  const data={
    income:monthlyIncome.value,
    expenses
  }
  localStorage.setItem("financeTracker",JSON.stringify(data));
  loadChart();
}

// load data from local storage
const loadData=()=>{
  const savedData=localStorage.getItem("financeTracker");
  if(!savedData) return;
  const data=JSON.parse(savedData);
  monthlyIncome.value=data.income || "";

  data.expenses.forEach(expense=>{
    const expenseElement=createExpenseCategory(expense.name, expense.amount);
    expenseList[0].appendChild(expenseElement);
  })
  updateBudget();
}
// initialize app
loadData();

// creeate pie chart using Highcharts
const loadChart=()=>{
  Highcharts.chart('budget_chart', {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Income and Expenses ',
     
    },
    credits: {
      enabled: false // this will remove the "Highcharts.com" text from the chart
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels:[ {
          enabled: true,
          distance: 20,
          format: '{point.name}: {point.y:.2f}$'// add current format
        },
        {
          enabled: true,
          distance: -40,
          format: '{point.percentage:.1f} %',// add percentage format
          style:{
            fontSize:'1.2em',
            textOutline:'none',
            opacity:0.7,
          },
          filter: {
            operator: '>',
            property: 'percentage',
            value: 5 // only show percentage labels for slices larger than 5%
          }
        }]
      }
    },
    series: [{
      name: 'Budget Distribution',
      colorByPoint: true,
      data: Array.from(document.querySelectorAll('.expense_category')).map(expense => {
        return {
          name: expense.querySelector("span").textContent,
          y: parseFloat(expense.querySelector("input").value) || 0
        }
      }
      )
    }]
  });
}
// initial chart load
loadChart();
