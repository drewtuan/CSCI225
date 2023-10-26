var city_or_not_checkbox = document.getElementById("inside-city-or-not-checkbox");
var summer_month_checkbox = document.getElementById("summer-month-checkbox");


//labels to display the information
var base_charge_label = document.getElementById("base-charge-label");
var tier1_component_label = document.getElementById("tier1-component-label");
var tier2_component_label = document.getElementById("tier2-component-label")
var tier3_component_label = document.getElementById("tier3-component-label");
var base_revenue_label = document.getElementById("base-revenue-label");
// monthly usage textbox value
var monthly_usage_in_kwh = parseFloat(document.getElementById("monthly-usage-textbox").value);

// function that calculates the base charge
function calculate_basecharge() {
  var days = parseFloat(document.getElementById("days-for-the-bill-textbox").value);
  var basecharge = days * 0.4603;
  return basecharge;
  
}

// function that calculates the first tier component
function calculate_first_tier_component() {
  var tier1componentfee = 0;
  var tier1component_monthly_usage_in_kwh = 0;

  if(summer_month_checkbox.checked && monthly_usage_in_kwh <= 650.0) {
    tier1component_monthly_usage_in_kwh = monthly_usage_in_kwh;
    tier1componentfee = tier1component_monthly_usage_in_kwh  * 0.066678;
  } else if(summer_month_checkbox.checked == false && monthly_usage_in_kwh <= 650.0 ) {
    tier1component_monthly_usage_in_kwh = monthly_usage_in_kwh;
    tier1componentfee = tier1component_monthly_usage_in_kwh * 0.062404;
  } else if(summer_month_checkbox.checked && monthly_usage_in_kwh > 650.0) {
    tier1component_monthly_usage_in_kwh = monthly_usage_in_kwh - (monthly_usage_in_kwh - 650);
    tier1componentfee = tier1component_monthly_usage_in_kwh * 0.066678;
  } else if(summer_month_checkbox.checked == false && monthly_usage_in_kwh > 650.0) {
    tier1component_monthly_usage_in_kwh = monthly_usage_in_kwh - (monthly_usage_in_kwh - 650);
    tier1componentfee = tier1component_monthly_usage_in_kwh * 0.062404
  }
  return tier1componentfee;
  
}

// function that calculates the second tier component
function calculate_second_tier_component() {
  var tier2componentfee = 0;
  var tier2component_monthly_usage_in_kwh = 0;

  if(summer_month_checkbox.checked && monthly_usage_in_kwh >= 1000) {
    tier2component_monthly_usage_in_kwh = 350;
    tier2componentfee = tier2component_monthly_usage_in_kwh * 0.110748;
  } else if(summer_month_checkbox.checked == false && monthly_usage_in_kwh >= 1000) {
    tier2component_monthly_usage_in_kwh = 350;
    tier2componentfee = tier2component_monthly_usage_in_kwh * 0.062404;
  }
  return tier2componentfee;
  
}

// function that calculates the third tier component fee.
function calculate_third_tier_component() {
  var tier3componentfee = 0;
  var tier3component_monthly_usage_in_kwh = 0;

  if(summer_month_checkbox.checked && monthly_usage_in_kwh > 1000) {
    tier3component_monthly_usage_in_kwh = monthly_usage_in_kwh - 1000;
    tier3componentfee = tier3component_monthly_usage_in_kwh * 0.114625;
  } else if(summer_month_checkbox.checked == false && monthly_usage_in_kwh > 1000) {
    tier3component_monthly_usage_in_kwh = monthly_usage_in_kwh - 1000;
    tier3componentfee = tier3component_monthly_usage_in_kwh * 0.062404;
  }
  return tier3componentfee;
  
}

function calculate_base_revenue() {
  return calculate_basecharge() + calculate_first_tier_component()
   + calculate_second_tier_component() + calculate_third_tier_component();
}
function show_fees() {
   base_charge_label.textContent = "$" + calculate_basecharge();
   tier1_component_label.textContent = "$" + calculate_first_tier_component();
   tier2_component_label.textContent = "$" + calculate_second_tier_component();
   tier3_component_label.textContent = "$" + calculate_third_tier_component();
   base_revenue_label.textContent = "$" + calculate_base_revenue();
}


let button = document.getElementById("submit-button");
button.addEventListener('click', show_fees, false);


