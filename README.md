# WebTrekk
WebTrekk Challenge :-

PreRequisites : 1) Make sure node is setup in your system
			2) make sure ng, angular-cli is installed 
			3) Git is installed
			4) local http-server is installed globally, if not install using : npm install http-server -g


Once the prerequisites is done :-

How to run:

1) The project comprises of two folders : Frontend and Backend
2) Frontend is implemented using Angular 6
3) Backend is implemented using Node JS

Running Angular 6 (UI) : -

1) Go to project folder, and navigate to  Frontend folder
 a) Run “npm install”
 b) ng serve  

Doing this will run the UI with RWD

Also, if you don't want to install npm install then

2) Go to project folder, and navigate to Frontend
a) Run “http-server ./dist’

this will run the minfied build file generated by Angular 6



Now Running Node JS Server:

1) Go to project folder, and navigate to Backend folder
	a) Run “npm install”
	b) Run "node server.js"

The node server currently runs at port 7007,  and front end uses the API base url as for e.g
http://localhost:7007/listCustomers


Please make sure to run both Angular 6 and NodeJS in separate terminals. 


Now, Features of the Project are :- 

Features : -  This Project includes the following specifications :-

a) Overview page : a) Lists all customers 
			b) Can add a new customer
			c) Clicking the link in customer redirects to the profile page
			d) Can delete a customer

b) Profile page : a) Shows the customer detail Page
			b) Can edit a customer detail, and go back

c) The pages are responsive using media queries
d) Node server provides the API while Angular does the consuming.


JSON data is used from  link : https://github.com/webtrekk/js-challenge-data 






