# E-Commerce Inventory Microservice

This project is a simple microservice for managing product inventory in an e-commerce platform using a monorepo structure. It interacts with a PostgreSQL database and exposes REST API endpoints for updating and fetching inventory details.

## Project Structure

- **apps/**
  - **dashboard/**: The Store Dashboard for managing products, orders, and customer interactions (built with Next.js).
  - **store/**: The customer-facing service (built with Next.js).
- **services/**
  - **inventory-service/**: The Node.js Express server for handling inventory-related operations.

## Requirements

- Node.js (version 20.11.1)
- PostgreSQL
- Drizzle ORM (or your preferred ORM)

## Installation

1. Clone the repository:
   ```bash```
   git clone <repository-url>
   cd <repository-name>
2. Navigate to the services/inventory-service directory and install dependencies:
   ```bash```
   cd services/inventory-service
   npm install
3. Set up your PostgreSQL database. Make sure you have a database named postgres, and update the .env file (in services/inventory-service directory) with your    
   database credentials:
   ```bash```
   DATABASE_URL=postgres://postgres:123@localhost:5432/postgres (username, password, url, port, dbname)
   PORT=4000
4. Run database migrations if necessary (this assumes you have set up migrations for Drizzle ORM).
   
## Running the Service

1. Start the inventory service:
  ```bash```
  npm start
2. Start the dashboard and store applications (ensure to follow their respective instructions for setup and running).

## API Endpoints

1. Product Endpoints:
   POST /api/products
   GET /api/products
   PUT /api/products/:id
   DELETE /api/products/:id
2. Order Endpoints:
   POST /api/order
   GET /api/order

## Error Handling
The microservice implements efficient error handling, particularly for cases where inventory updates would fail, such as preventing the inventory count from going negative.

## Integration with Turbo Monorepo
This microservice is designed to be integrated into a Turbo monorepo. Ensure that both the dashboard and store applications are running simultaneously alongside the inventory service to facilitate seamless communication and data flow.