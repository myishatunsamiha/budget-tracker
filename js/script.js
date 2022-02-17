
function getElement(id) {
    return document.getElementById(id);
}


function displayErrorMessage(errorType, errorId, id) {
    const eType = document.getElementById(errorType);
    const eId = document.getElementById(errorId);

    eId.innerText = id;
    eType.style.display = "block";
}


function getValidInput(id) {
    const element = document.getElementById(id);


    if (isNaN(parseFloat(element.value))) {
        displayErrorMessage("type-error", "type-error-id", id);
        return;

    } else if (parseFloat(element.value) < 0) {
        displayErrorMessage("negative-number-error", "negative-number-error-id", id);
        return;

    } else {
        document.getElementById("negative-number-error").style.display = "none";
        document.getElementById("type-error").style.display = "none";
        const inputAmount = parseFloat(element.value);
        return inputAmount;
    }
}


document.getElementById("calculate-btn").addEventListener("click", function () {
    // getting the income input value by calling inputValue function 
    const income = getValidInput("income");
    if (isNaN(income)) {
        return;
    }

    // getting the food, rent and clothes expenses input value by calling inputValue function 
    const food = getValidInput("food");
    if (isNaN(food)) {
        return;
    }
    const rent = getValidInput("rent");
    if (isNaN(rent)) {
        return;
    }
    const clothes = getValidInput("clothes");
    if (isNaN(clothes)) {
        return;
    }

    // calculation total expenses and balance from the input values
    if (!isNaN(income) && !isNaN(food) && !isNaN(rent) && !isNaN(clothes)) {
        const totalExpenses = food + rent + clothes;
        const balance = income - totalExpenses;

        // displaying total expenses and balance on the html document
        getElement("total-expenses").innerText = totalExpenses;
        console.log(totalExpenses, income);

        if (totalExpenses > income) {
            getElement("balance").innerHTML = "<span style='color:red;'>0(Expenses exceeded income)</span>";
            displayErrorMessage("total-expenses-error", "total-expenses-error-id", "total-expenses");
        } else {
            getElement("balance").innerText = balance;
            document.getElementById("total-expenses-error").style.display = "none";
        }

    }

});

document.getElementById("saving-calculation-btn").addEventListener("click", function () {
    const savingPercentage = getValidInput("saving-percentage");

    const income = parseFloat(getElement("income").value);
    const balance = parseFloat(getElement("balance").innerText);
    console.log(savingPercentage, income, balance);

    if (!isNaN(savingPercentage) && !isNaN(income) && !isNaN(balance)) {
        const savingAmount = (income * (savingPercentage / 100)).toFixed(2);
        const remainingBalance = balance - savingAmount;
        console.log(savingAmount, remainingBalance);

        getElement("saving-amount").innerText = savingAmount;
        if (savingAmount > balance) {
            getElement("remaining-balance").innerHTML = "<span style='color:red;'>0(Saving amount exceeded balance)</span>";
            displayErrorMessage("excess-saving-amount-error", "excess-saving-amount-error-id", "saving-amount");

        } else {
            getElement("remaining-balance").innerText = remainingBalance;
            document.getElementById("excess-saving-amount-error").style.display = "none";
        }
    }

});