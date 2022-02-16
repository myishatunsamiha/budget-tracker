document.getElementById("income").addEventListener("keyup", function (event) {
    console.log(event.target.value);
    console.log(parseFloat(event.target.value));

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

function inputValue(id) {
    const inputField = document.getElementById(id);
    const inputAmount = parseFloat(inputField.value);
    return inputAmount;
}


document.getElementById("calculate-btn").addEventListener("click", function () {
    const income = inputValue("income");

    const foodBudget = inputValue("food-budget");
    const rentBudget = inputValue("rent-budget");
    const clothesBudget = inputValue("clothes-budget");

    const totalExpenses = foodBudget + rentBudget + clothesBudget;
    const balance = income - totalExpenses;

    document.getElementById("total-expenses").innerText = totalExpenses;
    document.getElementById("balance").innerText = balance;
});