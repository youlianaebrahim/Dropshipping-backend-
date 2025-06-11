const backendUrl = 'https://dropshipping-backend-apct.onrender.com'; // Replace with your live backend URL

// Find Products Button
const findProductsBtn = document.getElementById('find-products-btn');
const productList = document.getElementById('product-list');

findProductsBtn.addEventListener('click', async () => {
  try {
    const response = await fetch(`${backendUrl}/api/find-products`);
    const data = await response.json();
    displayProducts(data);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});

function displayProducts(products) {
  productList.innerHTML = '';
  products.forEach(product => {
    const listItem = document.createElement('li');
    listItem.textContent = product;
    productList.appendChild(listItem);
  });
}

// Generate Ad Button
const generateAdBtn = document.getElementById('generate-ad-btn');
const adOutput = document.getElementById('ad-output');
const productNameInput = document.getElementById('product-name');

generateAdBtn.addEventListener('click', async () => {
  const productName = productNameInput.value.trim();
  if (productName) {
    try {
      const response = await fetch(`${backendUrl}/api/generate-ad?product=${productName}`);
      const ad = await response.text();
      adOutput.textContent = ad;
    } catch (error) {
      console.error('Error generating ad:', error);
    }
  } else {
    alert('Please enter a product name.');
  }
});

// Upload Product Form
const uploadForm = document.getElementById('upload-form');

uploadForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const product = {
    title: document.getElementById('product-title').value,
    description: document.getElementById('product-description').value,
    type: document.getElementById('product-type').value,
    price: parseFloat(document.getElementById('product-price').value),
    sku: document.getElementById('product-sku').value,
  };

  try {
    const response = await fetch(`${backendUrl}/api/upload-shopify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    const data = await response.json();
    alert('Product uploaded successfully!');
    console.log(data);
  } catch (error) {
    console.error('Error uploading product:', error);
  }
});
