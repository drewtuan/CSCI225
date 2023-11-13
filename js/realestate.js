
//Please change json folder back to "webRoot": "${workspaceFolder}" once done!!!!!!
var calculator = document.getElementById("loan-calculator");
// loan button
var loan_button = document.getElementById("loan-button");

// loan amount textbox
var loan_amount_textbox = document.getElementById("Loan_amount_textbox");
// interest rate textbox
var interest_rate_textbox = document.getElementById("Interest_rate_textbox");
// loan term textbox
var loan_term_textbox = document.getElementById("Loan_term_textbox");

// month dropdown list
var month_dropdown_list = document.getElementById("month_drop-down_list");
// year dropdown list
var year_dropdown_list = document.getElementById("year_drop-down_list");

//calculate button
var calculate_button = document.getElementById("calculate-button");



// function to make the calculator visible and invisible when loan button is clicked.
function makeCalculatorVisible() {
  if (calculator.style.visibility === "hidden") {
    calculator.style.visibility = "visible";
  } else {
    calculator.style.visibility = "hidden";
  }

}

// function that returns the start year
function getStartYearIndex() {
  let start_year_index = year_dropdown_list.selectedIndex;  
  return start_year_index;
}

function getStartMonthIndex() {
  let start_month_index = month_dropdown_list.selectedIndex;
  return start_month_index;
}

// function that calculates monthly interest
function calculateMonthlyInterestRate() {
  var monthly_interest_rate = parseFloat(interest_rate_textbox.value) / 1200;
  return monthly_interest_rate;
}

// function that returns the loan term in years
function getLoanTerm() {
  let number_of_months = parseFloat(loan_term_textbox.value) * 12;
  return number_of_months;
}

// function that calculates the monthly payment
function calculateMonthlyPayment() {
  var mybalance = parseFloat(loan_amount_textbox.value);
  var monthly_payment = (mybalance* (calculateMonthlyInterestRate())) / (1 - (1 + calculateMonthlyInterestRate())**(-getLoanTerm()));
  return monthly_payment;
}

function generateYearTable() {

  var month_array = document.querySelectorAll("option.month_option");
  var year_array = document.querySelectorAll("option.year_option");
  var index_of_start_month = getStartMonthIndex();
  var index_of_start_year = getStartYearIndex();
  var balance = parseFloat(loan_amount_textbox.value);
  var table = "";
  
  table += "<table>";
  table += "<tr><td>Date</td><td>Interest</td><td>Principal</td><td>Balance</td></tr>"
  for(var i = index_of_start_year; i < year_array.length; i++) {
    table += "<tr>";
    var interest_paid_per_month = 0;
    var principal_paid_per_month = 0;
    var annual_interest = 0;
    var annual_principal = 0;
    for(var j = index_of_start_month; j < month_array.length; j++) {
      interest_paid_per_month = balance * calculateMonthlyInterestRate();
      principal_paid_per_month = calculateMonthlyPayment() - interest_paid_per_month;
      balance -= principal_paid_per_month;
      annual_interest += interest_paid_per_month;
      annual_principal += principal_paid_per_month;
    }
    table += "<td>"  + year_array[i].textContent + "</td>" + "<td>" + "$" + annual_interest.toFixed(2) + "</td>" + "<td>" + "$" + annual_principal.toFixed(2) + "</td>" + "<td>" + "$" + balance.toFixed(2) + "</td>";
    table += "<tr>";
  }
  table += "</table>";
  document.getElementById("div-with-table").innerHTML = table;
  
}


loan_button.addEventListener("click", makeCalculatorVisible, false);
calculate_button.addEventListener("click", generateYearTable/*getStartYear*/ /*getStartMonth*/, false);

