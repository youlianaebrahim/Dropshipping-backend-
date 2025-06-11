const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SHOPIFY_STORE = process.env.SHOPIFY_STORE;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

app.use(cors());
app.use(bodyParser.json());

// Root route to confirm backend is live
app.get('/', (req, res) => {
  res.send('Welcome to the Dropshipping Backend API!');
});

// Find trending dropshipping products
app.get('/api/find-products', async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: 'Find 3 trending, low-competition dropshipping products in fitness.',
        },
      ],
    });

    const ideas = completion.choices[0].message.content
      .split('\n')
      .filter((line) => line.trim() !== '');

    res.json(ideas);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product ideas', details: error.message });
  }
});

// Upload product to Shopify
app.post('/api/upload-shopify', async (req, res) => {
  try {
    const product = req.body;

    const response = await axios.post(
      `https://${SHOPIFY_API_KEY}@${SHOPIFY_STORE}/admin/api/2023-01/products.json`,
      {
        product: {
          title: product.title,
          body_html: product.description,
          vendor: 'Automated Vendor',
          product_type: product.type,
          variants: [
            {
              price: product.price,
              sku: product.sku,
            },
          ],
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload product to Shopify', details: error.message });
  }
});

// Generate Facebook ad copy
app.get('/api/generate-ad', async (req, res) => {
  try {
    const productName = req.query.product;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: `Write a Facebook ad copy for a dropshipping product: ${productName}`,
        },
      ],
    });

    res.send(completion.choices[0].message.content);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate ad copy', details: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
