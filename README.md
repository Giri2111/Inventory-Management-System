# Inventory-Management-System

🔧 Project Setup Instructions
Clone or Unzip the Repository
Clone the GitHub repository or unzip the downloaded folder.

Note
The .env file required for database configuration is not included in the repository for security reasons. You need to create your own .env file in the backend directory.

Install Dependencies
Run the following command in both frontend and backend directories:

bash
Copy
Edit
npm install
Start the Servers

Backend:

bash
Copy
Edit
node server.js
Runs on port 5000

Frontend:

bash
Copy
Edit
npm start
Runs on port 3000

Database Configuration
The PostgreSQL database is configured using environment variables stored in the .env file.

🏗️ System Architecture Overview
Type: Single-page full-stack web application

Frontend: React

Backend: Node.js (Express)

Database: PostgreSQL (Cloud - Aiven)

Hosting:

Backend: Render

Frontend: Netlify

✨ Key Features
Item creation, editing, deletion, and viewing

Upload and preview images (JPG, JPEG, PNG)

Dark/Light theme toggle

Category-based filtering

Pop-up modals for item details and forms

📡 API Endpoints Overview
1. POST /items
Create a new item with optional image upload.

Request Body:

json
Copy
Edit
{
  "item_name": "Keyboard",
  "description": "Mechanical keyboard",
  "category": "Electronics",
  "quantity": 50,
  "price": 1200,
  "image": "file (optional)"
}
Response:

json
Copy
Edit
{
  "id": 1,
  "item_name": "Keyboard",
  "description": "Mechanical keyboard",
  "category": "Electronics",
  "quantity": 50,
  "price": 1200,
  "image_type": "image/png"
}
2. GET /items
Retrieve all inventory items including image data (base64).

Response:

json
Copy
Edit
[
  {
    "id": 1,
    "item_name": "Keyboard",
    "description": "Mechanical keyboard",
    "category": "Electronics",
    "quantity": 50,
    "price": 1200,
    "image": "<base64string>",
    "image_type": "image/png"
  }
]
3. GET /items/:id/image
Returns the binary image for a specific item by ID.

Response:
Raw image file
Headers: Content-Type: image/png (or jpeg, etc.)

4. PUT /items/:id
Update an existing item (optionally update image).

Request Body:

json
Copy
Edit
{
  "item_name": "Updated Keyboard",
  "description": "Updated description",
  "category": "Updated category",
  "quantity": 45,
  "price": 1000,
  "image": "file (optional)"
}
5. DELETE /items/:id
Delete an item by ID.

Response:

json
Copy
Edit
{
  "message": "Item deleted successfully"
}
6. GET /items/:id
Get details of a specific item (excluding image).

Response:

json
Copy
Edit
{
  "id": 1,
  "item_name": "Keyboard",
  "description": "Mechanical keyboard",
  "category": "Electronics",
  "quantity": 50,
  "price": 1200,
  "image_type": "image/png"
}
🧑‍💻 Instructions for Using the Application
Visit the Live Site.

The home page displays all inventory items with buttons to View, Edit, and Delete.

Use the Dark/Light toggle at the top-right to switch themes.

Click "Add Item" to add new inventory entries via a pop-up form.

Allowed image formats: JPG, JPEG, PNG. Invalid formats show a warning.

Use the Filter button (top-left) to filter items by category.

View button opens a detailed modal with full item information.

Edit button allows modifying existing item data.

Delete button permanently removes the item.

🌐 Hosting Details
Frontend: Hosted on Netlify

Backend: Hosted on Render

Database: Aiven PostgreSQL (Cloud)
