const backendUrl = 'https://dropshipping-backend-apct.onrender.com';

document.addEventListener('DOMContentLoaded', () => {
  // FIND PRODUCTS
  document.getElementById('find-products-btn').addEventListener('click', async () => {
    const res = await fetch(`${backendUrl}/api/find-products`);
    const ideas = await res.json();
    alert('Trending Products:\n\n' + ideas.join('\n'));
  });

  // GENERATE AD
  document.getElementById('generate-ad-btn').addEventListener('click', async () => {
    const product = document.getElementById('product-name-input').value;
    const res = await fetch(`${backendUrl}/api/generate-ad?product=${encodeURIComponent(product)}`);
    const ad = await res.text();
    alert('Ad Copy:\n\n' + ad);
  });

  // UPLOAD TO SHOPIFY
  document.getElementById('upload-product-btn').addEventListener('click', async () => {
    const title = document.getElementById('product-title').value;
    const description = document.getElementById('product-description').value;
    const type = document.getElementById('product-type').value;
    const price = document.getElementById('product-price').value;
    const sku = document.getElementById('product-sku').value;

    const res = await fetch(`${backendUrl}/api/upload-shopify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, type, price, sku }),
    });

    const result = await res.json();
    alert('Product uploaded!\n\n' + JSON.stringify(result, null, 2));
  });
});
