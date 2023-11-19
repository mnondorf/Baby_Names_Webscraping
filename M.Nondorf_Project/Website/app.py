from flask import Flask, render_template, request
import funcs

app = Flask(__name__)

# render the homepage
@app.route('/', methods=['GET'])
def index():

    return render_template('index.html')


@app.route('/results', methods=['POST'])
def get_results():

# The intent of this function is:
    # to pull the user input (both radio button selection and text input) from the homepage
    # call the appropriate webscraping function based on the input
    # render the results
    search_query = None
    selected_option = None
    yrs = None
    data = None
    if request.method == 'POST':
        selected_option = request.form.get('selected_option') # Radio button
        search_query = request.form.get('user_input')       # Text input (years) 
    
    # Take user input and create a list of years to pass to the main webscraping function    
    if selected_option == 'single':
        yrs = funcs.get_yr(search_query)
    elif selected_option == 'list':
        yrs = funcs.get_yr_list(search_query)
    elif selected_option == 'range':
        yrs = funcs.get_yr_range(search_query)

    # Call the main webscraping function and assign the results to a variable
    data = funcs.call_and_click(yrs)
    
    # Render the results page and display the results
    return render_template('results.html', data=data)

if __name__ == '__main__':
    app.run(debug=True)