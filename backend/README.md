# Clients and Receipts APIs

This repository contains APIs for managing clients and receipts built using Actix web framework and SQLx for database operations.

## Getting Started

To get started with the APIs, follow the instructions below:

### Prerequisites

- Rust Programming Language
- PostgreSQL Database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your/repository.git
   ```

2. Install dependencies:

   ```bash
   cd clients-receipts-api
   cargo build
   ```

3. Set up the PostgreSQL database and configure the database connection in the `.env` file.
4. Run the migrations to set up the database schema:

   ```bash
   make dev
   make install
   make migrate-up
   ```

5. Start the server:

   ```bash
   cargo run
   ```

The server will start running at `http://localhost:8080`.

## Endpoints

### Clients API

1. **Create Client**:

   - Method: POST
   - Path: `/clients`
   - Description: Create a new client with the provided details.

2. **Update Client**:

   - Method: PUT
   - Path: `/clients/{id}`
   - Description: Update an existing client with the provided ID.

3. **Delete Client**:

   - Method: DELETE
   - Path: `/clients/{id}`
   - Description: Delete the client with the provided ID.

4. **Get All Clients**:

   - Method: GET
   - Path: `/clients`
   - Description: Retrieve a list of all clients.

5. **Get Client by ID**:

   - Method: GET
   - Path: `/clients/{id}`
   - Description: Retrieve a specific client by its ID.

6. **Get Client by Government ID**:

   - Method: GET
   - Path: `/clients/gov-id/{gov_id}`
   - Description: Retrieve a specific client by its government ID.

7. **Get Client Receipts**:
   - Method: GET
   - Path: `/clients/{client_id}/receipts`
   - Description: Retrieve all receipts associated with a specific client.

### Receipts API

1. **Create Receipt**:

   - Method: POST
   - Path: `/receipts`
   - Description: Create a new receipt with the provided details.

2. **Update Receipt**:

   - Method: PUT
   - Path: `/receipts/{id}`
   - Description: Update an existing receipt with the provided ID.

3. **Delete Receipt**:

   - Method: DELETE
   - Path: `/receipts/{id}`
   - Description: Delete the receipt with the provided ID.

4. **Get All Receipts**:

   - Method: GET
   - Path: `/receipts`
   - Description: Retrieve a list of all receipts.

5. **Get Receipt by ID**:

   - Method: GET
   - Path: `/receipts/{id}`
   - Description: Retrieve a specific receipt by its ID.

6. **Get Receipts by Client**:

   - Method: GET
   - Path: `/receipts/client/{client_id}`
   - Description: Retrieve all receipts associated with a specific client.

7. **Add Items to Receipt**:
   - Method: POST
   - Path: `/receipts/add-items`
   - Description: Add multiple items to a receipt. Accepts an array of items in the request body.

## Contributing

Contributions are welcome! Please feel free to submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
