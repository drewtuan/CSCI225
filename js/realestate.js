
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
  /*
  switch (start_year_index) {
    case 0:
      year = 2011;
      break;
    case 1:
      year = 2012;
      break;
    case 2:
      year = 2013;
      break;
    case 3:
      year = 2014;
      break;
    case 4:
      year = 2015;
      break;
    case 5:
      year = 2016;
      break;
    case 6:
      year = 2017;
      break;
    case 7:
      year = 2018;
      break;
    case 8:
      year = 2019;
      break;
    case 9:
      year = 2020;
      break;
    case 10:
      year = 2021;
      break;
    case 11:
      year = 2022;
      break;
    case 12:
      year = 2023;
      break;
    default:
      break;
  }
  console.log(year);

  return year;
  */
 return start_year_index;
}

function getStartMonthIndex() {
  let start_month_index = month_dropdown_list.selectedIndex;
 /*
  switch (start_month_index) {
    case 0:
      month = "January";
      break;
    case 1:
      month = "February"
      break;
    case 2:
      month = "March";
      break;
    case 3:
      month = "April"
      break;
    case 4:
      month = "May"
      break;
    case 5:
      month = "June";
      break;
    case 6:
      month = "July"
      break;
    case 7:
      month = "August"
      break;
    case 8:
      month = "September";
      break;
    case 9:
      month = "October"
      break;
    case 10:
      month = "November";
      break;
    case 11:
      month = "December";
      break;
    default:
      break;
  }
  console.log(month);

  return month;
  */
 return start_month_index;
}

// function that calculates monthly interest
function calculateMonthlyInterestRate() {
  var monthly_interest_rate = parseFloat(interest_rate_textbox.value) / 1200;
  //console.log(monthly_interest_rate);
  return monthly_interest_rate;
}

// function that returns the loan term in years
function getLoanTerm() {
  let number_of_months = parseFloat(loan_term_textbox.value) * 12;
  //console.log(number_of_months);
  return number_of_months;
}

// function that calculates the monthly payment
function calculateMonthlyPayment() {
  var mybalance = parseFloat(loan_amount_textbox.value);
  var monthly_payment = (mybalance* (calculateMonthlyInterestRate())) / (1 - (1 + calculateMonthlyInterestRate())**(-getLoanTerm()));
  //console.log(monthly_payment);
  return monthly_payment;
}

function generateYearTable() {

  var month_array = document.querySelectorAll("option.month_option");
  //console.log(month_array);
  var year_array = document.querySelectorAll("option.year_option");
  var index_of_start_month = getStartMonthIndex();
  var index_of_start_year = getStartYearIndex();
  var annual_interest = 0;
  var annual_principal = 0;

  var balance = parseFloat(loan_amount_textbox.value);


  var table = "";
  
  table += "<table>";
  table += "<tr><td>Date</td><td>Interest</td><td>Principal</td><td>Balance</td></tr>"
  for(var j = index_of_start_year; j < year_array.length; j++) {
    table += "<tr>";
    var interest_paid_per_month = 0;
    var principal_paid_per_month = 0;
    for(var i = index_of_start_month; i < month_array.length; i++) {
      interest_paid_per_month = balance * calculateMonthlyInterestRate();
      principal_paid_per_month = calculateMonthlyPayment() - interest_paid_per_month;
      balance -= principal_paid_per_month;
      annual_interest += interest_paid_per_month;
      annual_principal += principal_paid_per_month;
    }
    table += "<td>"  + year_array[j].textContent + "</td>" + "<td>" + "$" + annual_interest.toFixed(2) + "</td>" + "<td>" + "$" + annual_principal.toFixed(2) + "</td>" + "<td>" + "$" + balance.toFixed(2) + "</td>";
    table += "<tr>";
  }
  table += "</table>";
  document.getElementById("div-with-table").innerHTML = table;
  
}


loan_button.addEventListener("click", makeCalculatorVisible, false);
calculate_button.addEventListener("click", generateYearTable/*getStartYear*/ /*getStartMonth*/, false);

