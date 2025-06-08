# Inventory-Management-System

Project setup instructions: 

Unzip or clone both the Frontend and Backend directories. 

Note: The cloned GitHub repository does not include the .env file for database configuration. 

Install dependencies using the command: npm install. 

Start the backend with: node server.js. 

Start the frontend with: npm start. 

The frontend will run on port 3000. 

The backend will run on port 5000. 

Database configurations are in the .env file. 

 

System Architecture Overview: 

Inventory Management System is a single page full-stack web application for managing inventory operations. 

Supports item tracking, stock updates, and inventory control, with a filter option to track specific categories. 

Contains key fields: name, description, image, category, quantity, and price for storing detailed inventory data. 

Built using React for the frontend and Node.js (Express) for the backend. 

Connected to a PostgreSQL cloud database (Aiven) for data storage. 

API Endpoints Overview 

1.POST /items  

Create a new item with optionally upload an image.  

Used to add items to the Inventory 

 

Request: 

item_name: string 

description: string 

category: string 

quantity: number 

price: number 

image: file (optional) 

 

Response: 

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

Retrieve all inventory items with image data (in base64 format). 

Used in Item list component to show the list of Items 

 

Response: 

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

  }, 

  ... 

] 

 
3. GET /items/:id/image 

Return the binary image of a given item ID.  

URL Param: 
 id: ID of the item 

Response (image content): 

Content-Type: image/png, image/jpeg, etc. 

Raw image data 

 

4.PUT /items/:id 

Update an existing item’s data and optionally update the image. 

If no image is upload while updating the old image remains same 

Request: 

item_name: string 

description: string 

category: string 

quantity: number 

price: number 

image: file (optional) 

 

Response:  

{ 

  "id": 1, 

  "item_name": "Updated Keyboard", 

  ... 

} 

 

5. DELETE /items/:id 

Delete an item by its ID. 

URL Param: 
 id: ID of the item 

Response: 

{ "message": "Item deleted successfully" } 

 

6. GET /items/:id 

Get details of a specific item (excluding the image content). 

Response: 

{ 

  "id": 1, 

  "item_name": "Keyboard", 

  "description": "Mechanical keyboard", 

  "category": "Electronics", 

  "quantity": 50, 

  "price": 1200, 

  "image_type": "image/png" 

} 

 

Instructions for using the inventory management system 

The Inventory Management System is easy to use. Open the live link to access the home page, which displays a list of items with functional buttons like View, Edit, and Delete. 

In the top-right corner, there's a dark/light theme toggle for switching themes. 

Below that, the "Add Item" button allows users to add new items. Clicking it opens a pop-up form—fill in the details and hit enter to store item data, including an optional image. 

Uploaded images must be in JPG, JPEG, or PNG format; otherwise, a warning message is displayed. 

In the top-left corner, a filter button enables users to categorize items. By default, all items are visible. 

The View button opens a pop-up displaying detailed item information. 

The Edit button opens a pop-up form, allowing users to view and update item details. 

The Delete button removes an item from the list. 


Host Details: 

Database: Aiven PostgreSQL (Cloud). 

Backend: Hosted on Render using a GitHub repository. 

Frontend: Hosted on Netlify. 

Project live Link:
https://inventory-management-001.netlify.app/
