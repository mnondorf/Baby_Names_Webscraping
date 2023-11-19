// Psuedocode:
    // The idea for this JavaScript code is to ensure that the user has both selected a radio button and entered valid search text. 
    // Assuming both of these things are true, it would allow the website to then load the results page.
        // remaining problem is that all functions still allows for 5-digit years
        // Also, list doesn't accept spaces after commas

function checkSingleFormat(){
    // Declares the variable to iterate over and populate it from user input
    let inputYear = document.getElementById("input").value;
    // checks whether pattern for entire entry is correct;
    //**Note: The 'g' flag matches all occurrences of the regular expression in the string and not just the first occurrence.
    let regExpSingle = /(^\d{4})/g;    
        
    // Validating a SINGLE YEAR
    if(year = inputYear.match(regExpSingle)) {
        // Check if single year is before 1880 or after 2021
        if(year < 1880 || year > 2021) {
            console.log(`Invalid input. Year must be between 1880 and 2021, inclusive.`);
            } else { 
                console.log(`${year} is a valid single year.`);
            }}
    else {
        alert("Please enter a four-digit date.");
        }}

function checkListFormat(){
    // Declares the variable to iterate over and populate it from user input
    let inputYear = document.getElementById("input").value;
    // checks whether pattern for entire entry is correct;
        // At least two years with one comma between them, no 3-digit years allowed, can have a space between numbers or not, no comma at end of entry
        
    //**Note: The 'g' flag matches all occurrences of the regular expression in the string and not just the first occurrence.
    let regExpSingle = /(^\d{4})/g;    
    let regExpList= /((^\d{4})(,+)(\s*)(\d{4}))/g; 
    // Convert user input string to an array to access individual years
    let yearArray = inputYear.split(",");
    // Validating the list option        
    for (let i = 0; i< yearArray.length; i++){
        if (yearArray[i].match(regExpSingle)){                   /// if the syntax for each item in the array is correct...
            // Check if year is before 1880 or after 2021
            if(yearArray[i] < 1880 || yearArray[i] > 2021) {
                console.log(`Invalid input. Year in location ${i} must be between 1880 and 2021, inclusive.`);
                } else { 
                    console.log(`${yearArray[i]} is a valid year.`);
                } 
        } else{
            console.log("Please enter two or more four-digit dates, each separated by a comma.");
        }}} 

function checkRangeFormat(){
    // Declares the variable to iterate over and populate it from user input
    let inputYear = document.getElementById("input").value;
    // checks whether pattern for entire entry is correct;
        // At least two years with one comma between them, no 3-digit years allowed, can have a space between numbers or not, no comma at end of entry
        // remaining problem is that it still allows for 5-digit years

    //**Note: The 'g' flag matches all occurrences of the regular expression in the string and not just the first occurrence.
    let regExpSingle = /(^\d{4})/g;    
    let regExpRange = /((^\d{4})(-)(\d{4}))/g;
    // Convert user input string to an array to access individual years
    let rangeArray = inputYear.split("-");
        // Validating a RANGE      
    for (let i = 0; i< rangeArray.length; i++){
        if (rangeArray[i].match(regExpSingle)){                   /// if the syntax for each item in the array is correct...
            // Check if year is before 1880 or after 2021
            if(rangeArray[i] < 1880 || rangeArray[i] > 2021) {
                console.log(`Invalid input. Year in location ${i} must be between 1880 and 2021, inclusive.`);
                } else { 
                    console.log(`${rangeArray[i]} is a valid year.`);
                } 
        } else{
            console.log("Please enter two four-digit dates separated by a dash (-).");
        }}}
    
function getRadioValue() {
    if(document.getElementById('single').checked) {
        checkSingleFormat()
    }
    else if(document.getElementById('list').checked) {
        checkListFormat()
    }
    else if(document.getElementById('range').checked) {
        checkRangeFormat()
    }
    else {
        alert('Please select a type of search option before clicking the "submit" button.')
    }}