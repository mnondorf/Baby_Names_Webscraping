import time
import pandas as pd
import numpy as np
import scrape_functions

#Set up Web Driver
from selenium import webdriver
from selenium.webdriver.common.by import By

'''
Main code to run the program. This cell: 
- calls the webdriver and website. (If website doesn't load, click refresh button at top of page.) 
- locates the correct text box, clears it, and calls the "ask_user()" function
- populates the search box with the first year and clicks the submit button to get to the page that will be scraped
- calls the "get_names()" function
- calls the "clean_zip_split()" function, converts each of the two results into a Series and stores results as variables
'''

# start webdriver
driver = scrape_functions.initialize_driver()  # Call the initialize_driver function 

# Visit the website homepage. If website doesn't load, click refresh button at top of page. 
try:
    driver.get('https://www.ssa.gov/OACT/babynames/')
except NoSuchElementException as e:
    driver.navigate().refresh()
    time.sleep(2)
    driver.navigate().refresh()

time.sleep(2)

# Find the button, enter the year, and submit the form for the initial search
input_year = driver.find_element(By.XPATH,'//*[@id="year"]')  
input_year.clear()
time.sleep(1)

# Get user input
scrape_functions.ask_user()

# Load first year into input box
input_year.send_keys(str(scrape_functions.years_to_query[0]))                                                
time.sleep(1)

# Perform initial search of first year in requested range in order to get to the correct page.
# If website doesn't load results, click refresh button at top of page
try:
    input_year.submit()

except NoSuchElementException as e:
    driver.navigate().refresh()
    time.sleep(2)
    driver.navigate().refresh()
    
# Call "get_names" function, which will perform all subsequent searches, collate results, and save them to the "list" variable    
list_of_names = scrape_functions.get_names(scrape_functions.years_to_query,driver)
print(f" Original scraping for {scrape_functions.years_to_query}:\n{list_of_names}\n")

# Call "clean_zip_split" function to take the scraped results, create a clean dictionary with each name associated to the 
# search year, and assign it to a variable.
# Convert each result to a Series for counting (originally to be used for graphing).

cleaned_results = scrape_functions.clean_zip_split(list_of_names, scrape_functions.years_to_query)
male_srs = pd.Series(cleaned_results[0])
female_srs = pd.Series(cleaned_results[1])

# Print results
print(f"Which Names Were Most Popular During the Following Year(s): {scrape_functions.years_to_query}?\n")
print(f"Count of Male Names:\n{male_srs}\n")
print(f"Count of Female Names:\n{female_srs}\n")

# End the webscraping session and close the page.
driver.quit()