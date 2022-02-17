// this function is using the element id to return the element
function getElement(id) {
    return document.getElementById(id);
}

// this function will clear all error messages or make them invisible before displaying the new one
function clearPreviousErrorMessages() {
    getElement("type-error").style.display = "none";
    getElement("negative-number-error").style.display = "none";
    getElement("total-expenses-error").style.display = "none";
    getElement("excess-saving-amount-error").style.display = "none";

}


// this function will make the error message visible (display:block;) by taking error type id, span id and element id
function displayErrorMessage(errorType, errorId, id) {
    clearPreviousErrorMessages();       // called the clearPreviousErrorMessages() function

    const eType = getElement(errorType);
    const eId = getElement(errorId);

    eId.innerText = id;     // setting text into the span
    eType.style.display = "block";  // making the div visible by changing the property to block
}


// this function will return the value of the input fields and will display error message if there is any
function getValidInput(id) {
    const element = getElement(id);


    if (isNaN(parseFloat(element.value))) {         // checking the type of the input value
        displayErrorMessage("type-error", "type-error-id", id);
        return;

    } else if (parseFloat(element.value) < 0) {     // checking whether the number is less than 0 or not
        displayErrorMessage("negative-number-error", "negative-number-error-id", id);
        return;

    } else {    // if the input value is of number type and the number is greater or equal 0
        clearPreviousErrorMessages();
        const inputAmount = parseFloat(element.value);
        return inputAmount;
    }
}

function clearSavingRemaining() {
    getElement("saving-amount").innerText = "0";
    getElement("remaining-balance").innerHTML = "0";
}

function clearExpensesBalance() {
    getElement("balance").innerHTML = "0";
    getElement("total-expenses").innerText = "0";
}

// handling click event triggered by pressing calculate-btn to calculate total expenses and balance
document.getElementById("calculate-btn").addEventListener("click", function () {
    clearExpensesBalance();
    clearSavingRemaining();

    // getting the income input value by calling inputValue function 
    const income = getValidInput("income");     // getting the income field value
    if (isNaN(income)) {
        return;
    }

    // getting the food, rent and clothes expenses input value by calling inputValue function 
    const food = getValidInput("food");     // getting the food field value
    if (isNaN(food)) {
        return;
    }
    const rent = getValidInput("rent");     // getting the rent field value
    if (isNaN(rent)) {
        return;
    }
    const clothes = getValidInput("clothes");   // getting the clothes field value
    if (isNaN(clothes)) {
        return;
    }


    // calculation of total expenses and balance from the input values
    if (!isNaN(income) && !isNaN(food) && !isNaN(rent) && !isNaN(clothes)) {       // if all the values are numbers, do the calculations
        const totalExpenses = (food + rent + clothes).toFixed(2);        // calculating total expenses
        const balance = (income - totalExpenses).toFixed(2);             // calculating balance

        // displaying total expenses and balance on the html document
        getElement("total-expenses").innerText = totalExpenses;
        console.log(totalExpenses, income);

        if (totalExpenses > income) {
            // displaying total expense error
            displayErrorMessage("total-expenses-error", "total-expenses-error-id", "total-expenses");
            getElement("balance").innerHTML = "<span style='color:red'>(Expenses exceeded income. Balance can't be negative.)</span>";
        } else {
            getElement("balance").innerText = balance;
            getElement("total-expenses-error").style.display = "none";
        }

    }

});


// handling click event triggered by saving-calculation-btn to calculate saving amount and remaining balance
document.getElementById("saving-calculation-btn").addEventListener("click", function () {
    clearSavingRemaining();

    const savingPercentage = getValidInput("saving-percentage");        // getting saving-percentage field value

    const income = parseFloat(getElement("income").value);              // getting income field value
    const balance = parseFloat(getElement("balance").innerText);        // getting balance 
    // console.log(savingPercentage, income, balance);


    if (!isNaN(savingPercentage) && !isNaN(income) && !isNaN(balance)) {        // if all the values are numbers, do the calculations
        const savingAmount = (income * (savingPercentage / 100)).toFixed(2);    // calculating saving amount to 2 decimal points
        const remainingBalance = (balance - savingAmount).toFixed(2);                        // calculating remaining balance
        // console.log(savingAmount, remainingBalance);


        // displaying saving amount and remaining balance on the html document
        getElement("saving-amount").innerText = savingAmount;
        if (savingAmount > balance) {
            //displaying excessive saving amount error message
            displayErrorMessage("excess-saving-amount-error", "excess-saving-amount-error-id", "saving-amount");
            getElement("remaining-balance").innerHTML = "<span style='color:red'>(Saving amount exceeded balance. Balance can't be negative.)</span>";

        } else {
            getElement("remaining-balance").innerText = remainingBalance;
            getElement("excess-saving-amount-error").style.display = "none";
        }
    }

});