
// city checkbox and summer checkbox
var city_or_not_checkbox = document.getElementById("inside-city-or-not-checkbox");
var summer_month_checkbox = document.getElementById("summer-month-checkbox");

//labels to display the information
var base_charge_label = document.getElementById("base-charge-label");
var tier1_component_label = document.getElementById("tier1-component-label");
var tier2_component_label = document.getElementById("tier2-component-label")
var tier3_component_label = document.getElementById("tier3-component-label");
var base_revenue_label = document.getElementById("base-revenue-label");
var fuel_rider_cost_label = document.getElementById("fuel-cost-rider");
var demand_side_management_residential_rider_label = document.getElementById("demand-side-management-residential-rider-label");
var environmental_compliance_cost_recovery_label = document.getElementById("environmental-compliance-cost-recovery-label");
var nuclear_construction_cost_recovery_label = document.getElementById("nuclear-construction-cost-recovery-label");
var total_revenue_label = document.getElementById("total-revenue-label");
var franchise_fee_label = document.getElementById("franchise-fee-label");
var total_excluding_tax_label = document.getElementById("Total-excluding-tax-label");
var total_with_tax_label = document.getElementById("total-with-tax-label");


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
  var monthly_usage_in_kwh = parseFloat(document.getElementById("monthly-usage-textbox").value);

  if(summer_month_checkbox.checked && ((monthly_usage_in_kwh <= 650.0))) {
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
  var monthly_usage_in_kwh = parseFloat(document.getElementById("monthly-usage-textbox").value);
  var tier2component_monthly_usage = monthly_usage_in_kwh - 650;
  
  if(summer_month_checkbox.checked && (monthly_usage_in_kwh > 650.0 && monthly_usage_in_kwh <= 1000)) {
    tier2componentfee = tier2component_monthly_usage * 0.110748;
  } else if(summer_month_checkbox.checked == false && (monthly_usage_in_kwh > 650.0 && monthly_usage_in_kwh <= 1000)) {
    tier2componentfee = tier2component_monthly_usage * 0.062404;
  } else if(summer_month_checkbox.checked && monthly_usage_in_kwh > 1000) {
    tier2componentfee = tier2component_monthly_usage * 0.110748;
  } else if(summer_month_checkbox.checked == false && monthly_usage_in_kwh > 1000) {
    tier2componentfee = tier2component_monthly_usage * 0.062404;
  }
  return tier2componentfee;
  
}

// function that calculates the third tier component fee.
function calculate_third_tier_component() {
  var tier3componentfee = 0;
  var tier3component_monthly_usage_in_kwh = 0;
  let monthly_usage_in_kwh = parseFloat(document.getElementById("monthly-usage-textbox").value);

  if(summer_month_checkbox.checked && monthly_usage_in_kwh > 1000) {
    tier3component_monthly_usage_in_kwh = monthly_usage_in_kwh - 1000;
    tier3componentfee = tier3component_monthly_usage_in_kwh * 0.114625;
  } else if(summer_month_checkbox.checked == false && monthly_usage_in_kwh > 1000) {
    tier3component_monthly_usage_in_kwh = monthly_usage_in_kwh - 1000;
    tier3componentfee = tier3component_monthly_usage_in_kwh * 0.062404;
  }
  return tier3componentfee;
  
}

// function for calculating the base revenue
function calculate_base_revenue() {
  return calculate_basecharge() + calculate_first_tier_component()
   + calculate_second_tier_component() + calculate_third_tier_component();
}

// function for calculating fuel cost rider cost
function calculate_fuel_cost_rider() {

  var fuel_rider_cost = 0;
  var monthly_usage_in_kwh = parseFloat(document.getElementById("monthly-usage-textbox").value);

  if(summer_month_checkbox.checked) {
    fuel_rider_cost = 0.045876 * monthly_usage_in_kwh;
  } else {
    fuel_rider_cost = 0.042859 * monthly_usage_in_kwh;
  }
  return fuel_rider_cost;
}

// function for calculating demand side management residential rider cost
function calculate_demand_side_management_residential_rider() {
  var residential_rider_cost = 0.015989 * calculate_base_revenue();
  return residential_rider_cost;
}

// function for calculating nuclear construction cost recovery
function calculate_nuclear_construction_cost_recovery() {
  var nuclear_recovery_cost = 0.041562 * calculate_base_revenue();
  return nuclear_recovery_cost; 
}

// function for calculating environmental compliance cost
function calculate_environmental_compliance_cost_recovery() {
  var environment_compliance_cost = 0.162813 * calculate_base_revenue();
  return environment_compliance_cost;
}

// function for calculating total revenue (current service subtotal)
function calculate_total_revenue() {
  var total_revenue = calculate_base_revenue()
  + calculate_fuel_cost_rider()
  + calculate_demand_side_management_residential_rider()
   + calculate_nuclear_construction_cost_recovery() 
  + calculate_environmental_compliance_cost_recovery();
  return total_revenue;
}

// function for calculating franchise fee
function calculate_franchise_fee() {
  var franchise_fee = 0;
  
  if(city_or_not_checkbox.checked) {
    franchise_fee = calculate_total_revenue() * 0.030674;
  } else {
    franchise_fee = calculate_total_revenue() * 0.011839;
  }

  return franchise_fee;
}

// function for calculating total excluding tax
function calculate_total_excluding_tax() {
  var total_excluding_tax  = calculate_total_revenue() + calculate_franchise_fee();
  return total_excluding_tax;
}

// function for calculating total with tax
function calculate_total_with_tax() {
  var sales_tax= parseFloat(document.getElementById("sales-tax-textbox").value)/100 * calculate_total_excluding_tax();
  var total_with_sales_tax = sales_tax + calculate_total_excluding_tax();
  return total_with_sales_tax;
}

// function for displaying the fees on their respective labels
function show_fees() {
   base_charge_label.textContent = "$" + calculate_basecharge().toFixed(2);
   tier1_component_label.textContent = "$" + calculate_first_tier_component().toFixed(2);
   tier2_component_label.textContent = "$" + calculate_second_tier_component().toFixed(2);
   tier3_component_label.textContent = "$" + calculate_third_tier_component().toFixed(2);
   base_revenue_label.textContent = "$" + calculate_base_revenue().toFixed(2);
   fuel_rider_cost_label.textContent = "$" + calculate_fuel_cost_rider().toFixed(2);
   demand_side_management_residential_rider_label.textContent = "$" + calculate_demand_side_management_residential_rider().toFixed(2);
   nuclear_construction_cost_recovery_label.textContent = "$" + calculate_nuclear_construction_cost_recovery().toFixed(2);
   environmental_compliance_cost_recovery_label.textContent = "$" + calculate_environmental_compliance_cost_recovery().toFixed(2);
   total_revenue_label.textContent = "$" + calculate_total_revenue().toFixed(2);
   franchise_fee_label.textContent = "$" + calculate_franchise_fee().toFixed(2);
   total_excluding_tax_label.textContent = "$" + calculate_total_excluding_tax().toFixed(2);
   total_with_tax_label.textContent = "$" + calculate_total_with_tax().toFixed(2);
}

// function to reset labels.  Press reset button to do this.
function resetlabels() {
  base_charge_label.textContent = " ";
  tier1_component_label.textContent = " ";
  tier2_component_label.textContent = " ";
  tier3_component_label.textContent = " ";
  base_revenue_label.textContent = " ";
  fuel_rider_cost_label.textContent = " ";
  demand_side_management_residential_rider_label.textContent = " ";
  nuclear_construction_cost_recovery_label.textContent = " "
  environmental_compliance_cost_recovery_label.textContent = " ";
  total_revenue_label.textContent = " ";
  franchise_fee_label.textContent = " ";
  total_excluding_tax_label.textContent = " ";
  total_with_tax_label.textContent = " ";
}


// submit button
let button1 = document.getElementById("submit-button");
button1.addEventListener('focus', show_fees, false);

// reset button
let button2 = document.getElementById("reset-button");
button2.addEventListener('focus', resetlabels,false);


