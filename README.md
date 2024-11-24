# Book Store API

This is a Book Store API developed using **Express**, **TypeScript**, **MongoDB**, and **Mongoose**. It provides endpoints to manage books (products) and orders in a Book Store. The API supports CRUD operations for books, order creation, and revenue calculation.

The project file structure is maintain like production grade application. Giving extra care to maintain clean code, proper variable naming and reusability of the code. The project follow modular file system to maintain proper file structure

ESLint is used for maintaining high code quality, avoiding common errors, and improving the overall development experience.



## Features

- **Create, Read, Update, and Delete Books (Products)**
  - Manage books with attributes like title, author, price, category, description, quantity, and stock status.
  
- **Create Orders**
  - Place orders for books, with automatic inventory management to reduce stock quantity.
  - If a book's stock goes to zero, it will be marked as out of stock.

- **Revenue Calculation**
  - Calculate total revenue from all orders placed using MongoDB's aggregation pipeline.

- **Data Validation**
  - Mongoose schema validation Zod validation for input taking and data entry in mongoDB

- **Error Handling**
  - Detailed error responses for invalid input, missing data, and other edge cases.


- **Professional API Response Format**
  - Consistent response format for success and error scenarios.


## instructions on setting up the project locally

- For running file locally download the file from github repository and run npm i command in terminal, all the dependency will be download automatically and the project is good to run. 
