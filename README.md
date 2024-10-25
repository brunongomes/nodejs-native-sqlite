# SQLite Person Management Project

This project is a simple Node.js application that uses SQLite to manage a database of people. It allows you to insert, update, query, and delete person records.

## Features

- Create a new person record
- Update existing person details
- Query all person records
- Delete a person record

## Requirements

- Node.js (v22 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install the required packages:

   ```bash
   npm install
   ```

## Usage

1. Ensure that the `storage` directory is created (this will be handled automatically by the application).
2. Run the application:

   ```bash
   npm start
   ```

3. The application will execute various operations, such as inserting, updating, querying, and deleting person records. The output will be displayed in the console.

## Database Structure

The application uses a SQLite database with the following table structure:

### Person Table

| Column      | Type    | Description                            |
|-------------|---------|----------------------------------------|
| id          | INTEGER | Primary key, auto-incremented         |
| name        | TEXT    | Name of the person                    |
| year        | INTEGER | Year of birth                         |
| age         | INTEGER | Age of the person                     |
| email       | TEXT    | Email address                         |
| phone       | TEXT    | Phone number                          |
| address     | TEXT    | Residential address                   |
| gender      | TEXT    | Gender of the person                  |
| occupation  | TEXT    | Occupation of the person              |
| nationality | TEXT    | Nationality of the person             |

