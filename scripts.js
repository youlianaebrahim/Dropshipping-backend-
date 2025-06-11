document.addEventListener('DOMContentLoaded', function() {
  const findProductsButton = document.getElementById('find-products-button');
  const productInput = document.getElementById('product-input');
  const productList = document.getElementById('product-list');
  const generateAdButton = document.getElementById('generate-ad-button');
  const adOutput = document.getElementById('ad-output');
  const uploadButton = document.getElementById('upload-product-button');
  const titleInput = document.getElementById('product-title');
  const descriptionInput = document.getElementById('product-description');
  const typeInput = document.getElementById('product-type');
  const priceInput = document.getElementById('product-price');
  const skuInput = document.getElementById('product-sku');

  if (findProductsButton && productInput && productList) {
    findProductsButton.addEventListener('click', function() {
      const productName = productInput.value;
      fetch(`/api/find-products?product=${productName}`)
        .then(response => response.json())
        .then(products => {
          productList.innerHTML = products.map(product => `<li>${product}</li>`).join('');
        });
    });
  }

  if (generateAdButton && productInput && adOutput) {
    generateAdButton.addEventListener('click', function() {
      const productName = productInput.value;
      fetch(`/api/generate-ad?product=${productName}`)
        .then(response => response.text())
        .then(adText => {
          adOutput.textContent = adText;
        });
    });
  }

  if (uploadButton && titleInput && descriptionInput && typeInput && priceInput && skuInput) {
    uploadButton.addEventListener('click', function() {
      const product = {
        title: titleInput.value,
        description: descriptionInput.value,
        type: typeInput.value,
        price: priceInput.value,
        sku: skuInput.value
      };

      fetch('/api/upload-shopify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      })
        .then(response => response.json())
        .then(data => {
          console.log('Product uploaded to Shopify:', data);
        });
    });
  }
});
