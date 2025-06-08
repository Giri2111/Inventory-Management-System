const express = require('express');
const pool = require('./db');
const upload = require('./upload');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ➕ Create new inventory item (with image)
app.post('/items', (req, res) => {
  upload.single('image')(req, res, async function (err) {
    if (err) {
      // multer file filter error
      return res.status(400).json({ error: err.message });
    }

    const {
      item_name, description, category,
      quantity, price
    } = req.body;

    const imageBuffer = req.file?.buffer || null;
    const imageType = req.file?.mimetype || null;

    try {
      const result = await pool.query(
        `INSERT INTO inventory_items (
          item_name, description, category, quantity, price, image, image_type
        ) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
        [item_name, description, category, quantity, price, imageBuffer, imageType]
      );

      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add item' });
    }
  });
});

// 📄 Get all items (with image as base64 + MIME type)
app.get('/items', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM inventory_items`);
    const items = result.rows.map((item) => {
      let base64Image = null;
      if (item.image) {
        base64Image = Buffer.from(item.image).toString('base64');
      }

      return {
        id: item.id,
        item_name: item.item_name,
        description: item.description,
        category: item.category,
        quantity: item.quantity,
        price: item.price,
        image: base64Image,
        image_type: item.image_type,
      };
    });

    res.json(items);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// 🖼️ Optional: Separate route to get item image by ID
app.get('/items/:id/image', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT image, image_type FROM inventory_items WHERE id = $1`,
      [req.params.id]
    );
    const item = result.rows[0];
    if (!item || !item.image) {
      return res.status(404).send('Image not found');
    }
    res.set('Content-Type', item.image_type);
    res.send(item.image);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load image' });
  }
});

// ✏️ Update item (with optional image update)
app.put('/items/:id', (req, res) => {
  upload.single('image')(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const {
      item_name,
      description,
      category,
      quantity,
      price
    } = req.body;

    const imageBuffer = req.file?.buffer || null;
    const imageType = req.file?.mimetype || null;

    try {
      const existing = await pool.query(`SELECT * FROM inventory_items WHERE id = $1`, [req.params.id]);

      if (existing.rows.length === 0) {
        return res.status(404).json({ error: 'Item not found' });
      }

      const fields = ['item_name', 'description', 'category', 'quantity', 'price'];
      const values = [item_name, description, category, quantity, price];
      let updateQuery = `UPDATE inventory_items SET `;
      let params = [];
      let paramIndex = 1;

      fields.forEach((field, idx) => {
        if (values[idx] !== undefined) {
          updateQuery += `${field} = $${paramIndex}, `;
          params.push(values[idx]);
          paramIndex++;
        }
      });

      if (imageBuffer) {
        updateQuery += `image = $${paramIndex}, `;
        params.push(imageBuffer);
        paramIndex++;
        updateQuery += `image_type = $${paramIndex}, `;
        params.push(imageType);
        paramIndex++;
      }

      updateQuery += `updated_at = CURRENT_TIMESTAMP WHERE id = $${paramIndex} RETURNING *`;
      params.push(req.params.id);

      const result = await pool.query(updateQuery, params);
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Update error:', err);
      res.status(500).json({ error: 'Failed to update item' });
    }
  });
});

// ❌ Delete item
app.delete('/items/:id', async (req, res) => {
  try {
    const result = await pool.query(`DELETE FROM inventory_items WHERE id = $1 RETURNING *`, [req.params.id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// 🔍 Get single item by ID (excluding image binary)
app.get('/items/:id', async (req, res) => {
  const itemId = req.params.id;

  try {
    const result = await pool.query(
      `SELECT id, item_name, description, category, quantity, price, image_type FROM inventory_items WHERE id = $1`,
      [itemId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching item:", err);
    res.status(500).json({ error: "Failed to fetch item" });
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
