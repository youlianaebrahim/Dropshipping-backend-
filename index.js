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

app.get('/api/find-products', async (req, res) => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: 'Find 3 trending, low-competition dropshipping products in fitness.' }]
  });
  const ideas = completion.choices[0].message.content.split('\n').filter(Boolean);
  res.json(ideas);
});

app.post('/api/upload-shopify', async (req, res) => {
  const product = req.body;
  const response = await axios.post(
    `https://${SHOPIFY_API_KEY}@${SHOPIFY_STORE}/admin/api/2023-01/products.json`,
    {
      product: {
        title: product.title,
        body_html: product.description,
        vendor: 'Automated Vendor',
        product_type: product.type,
        variants: [{ price: product.price, sku: product.sku }]
      }
    }
  );
  res.json(response.data);
});

app.get('/api/generate-ad', async (req, res) => {
  const productName = req.query.product;
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: `Write a Facebook ad copy for a dropshipping product: ${productName}` }]
  });
  res.send(completion.choices[0].message.content);
});

app.listen(port, () => console.log(`Server running on port ${port}`));
