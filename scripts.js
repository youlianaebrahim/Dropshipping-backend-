document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');
  const adOutput = document.getElementById('ad-output');

  // Find trending products
  document.getElementById('find-products-btn').addEventListener('click', async () => {
    productList.innerHTML = 'Loading...';
    try {
      const res = await fetch('https://dropshipping-backend-apct.onrender.com/api/find-products');
      const data = await res.json();
      productList.innerHTML = '';
      data.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${item}`;
        productList.appendChild(li);
      });
    } catch (err) {
      productList.innerHTML = 'Failed to load products.';
      console.error(err);
    }
  });

  // Generate ad copy
  document.getElementById('generate-ad-btn').addEventListener('click', async () => {
    const productInput = document.getElementById('ad-product-input').value;
    adOutput.innerHTML = 'Generating...';
    try {
      const res = await fetch(`https://dropshipping-backend-apct.onrender.com/api/generate-ad?product=${encodeURIComponent(productInput)}`);
      const data = await res.text();
      adOutput.innerHTML = `<strong>Generated Ad:</strong><br>${data}`;
    } catch (err) {
      adOutput.innerHTML = 'Failed to generate ad.';
      console.error(err);
    }
  });

  // Upload product to Shopify
  document.getElementById('upload-btn').addEventListener('click', async () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const type = document.getElementById('type').value;
    const price = document.getElementById('price').value;
    const sku = document.getElementById('sku').value;

    try {
      const res = await fetch('https://dropshipping-backend-apct.onrender.com/api/upload-shopify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, type, price, sku })
      });
      const result = await res.json();
      alert('Product uploaded to Shopify!');
      console.log(result);
    } catch (err) {
      alert('Failed to upload product.');
      console.error(err);
    }
  });
});
