const usernameInput = document.getElementById("username");
const welcomeTitle = document.getElementById("welcome");
const nameSection = document.getElementById("name-section");
const trackerSection = document.getElementById("tracker");
const form = document.getElementById("expense-form");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const totalDisplay = document.getElementById("total");
const incomeDisplay = document.getElementById("total-income"); 
const expenseDisplay = document.getElementById("total-expense"); 
const expenseList = document.getElementById("expense-list");
const errorMsg = document.getElementById("error-msg");

let expenses = [];
let total = 0;
let income = 0;
let expense = 0;

function setname() {
    const name = usernameInput.value.trim();
    if (name !== "") {
        welcomeTitle.textContent = `Welcome, ${name}`;
        nameSection.style.display = "none";
        trackerSection.style.display = "block";
    }
}

form.addEventListener("submit", function (a) {
    a.preventDefault();

    const title = titleInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (title === "" || isNaN(amount)) return;

    if (amount < 0 && total + amount < 0) {
        errorMsg.textContent = "❌ This calculation is not possible: expenses exceed income.";
        errorMsg.style.display = "block";
        return;
    }

    errorMsg.style.display = "none";

    const entry = {
        id: Date.now(),
        title,
        amount
    };

    expenses.push(entry);
    updateTracker();

    titleInput.value = "";
    amountInput.value = "";
});

function removeEntry(id) {
    expenses = expenses.filter(entry => entry.id !== id);
    updateTracker();
}

function updateTracker() {
    expenseList.innerHTML = "";

    total = 0;
    income = 0;
    expense = 0;

    expenses.forEach(item => {
        total += item.amount;
        if (item.amount >= 0) {
            income += item.amount;
        } else {
            expense += Math.abs(item.amount);
        }
    });

    totalDisplay.textContent = total;
    incomeDisplay.textContent = income;
    expenseDisplay.textContent = expense;

    expenses.forEach(item => {
        const li = document.createElement("li");
        li.classList.add(item.amount >= 0 ? "income" : "expense");
        li.innerHTML = `
            <span>${item.title}</span>
            <span>
                ${item.amount >= 0 ? '+' : ''}PKR ${item.amount}
                <button class="delete-btn" onclick="removeEntry(${item.id})">❌</button>
            </span>
        `;
        expenseList.appendChild(li);
    });
    const submitButton = form.querySelector("button");

amountInput.addEventListener("input", function () {
    const value = parseFloat(amountInput.value);
    
    if (!isNaN(value) && value < 0) {
        submitButton.style.backgroundColor = "red";
    } else {
        submitButton.style.backgroundColor = "rgb(55, 189, 251)";
    }
});

}
