document.getElementById("income").addEventListener("keyup", function (event) {
    // console.log(event.target.value);
    // console.log(parseFloat(event.target.value));

    if (event.target.value == "") {
        document.getElementById("income-error").style.display = "none";

    } else if (isNaN(parseFloat(event.target.value))) {
        console.log("input value must be a number.");
        document.getElementById("income-error").style.display = "block";

    } else if (parseFloat(event.target.value) < 0) {
        console.log("income can not be less than 0.");
        document.getElementById("income-error").style.display = "block";

    } else {
        document.getElementById("income-error").style.display = "none";
    }

});

function getElement(id) {
    return document.getElementById(id);
}

function inputValue(id) {
    const inputField = getElement(id);
    const inputAmount = parseFloat(inputField.value);
    return inputAmount;
}

document.getElementById("calculate-btn").addEventListener("click", function () {
    // getting the income input value by calling inputValue function 
    const income = inputValue("income");

    // getting the food, rent and clothes expenses input value by calling inputValue function 
    const foodBudget = inputValue("food-budget");
    const rentBudget = inputValue("rent-budget");
    const clothesBudget = inputValue("clothes-budget");

    // calculation total expenses and balance from the input values
    const totalExpenses = foodBudget + rentBudget + clothesBudget;
    const balance = income - totalExpenses;
    console.log(totalExpenses);

    // displaying total expenses and balance on the html document
    getElement("total-expenses").innerText = totalExpenses;
    getElement("balance").innerText = balance;

});

document.getElementById("saving-calculation-btn").addEventListener("click", function () {
    const savingPercentage = inputValue("saving-percentage");

    const balance = parseFloat(getElement("balance").innerText);

    const savingAmount = balance * (savingPercentage / 100);
    const remainingBalance = balance - savingAmount;
    console.log(savingAmount, remainingBalance);

    getElement("saving-amount").innerText = savingAmount;
    getElement("remaining-balance").innerText = remainingBalance;
});