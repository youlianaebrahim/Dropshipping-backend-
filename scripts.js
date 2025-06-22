document.addEventListener('DOMContentLoaded', () => {
  const findBtn = document.getElementById('findProductsBtn');
  const resultsContainer = document.getElementById('results');

  if (findBtn && resultsContainer) {
    findBtn.addEventListener('click', async () => {
      resultsContainer.innerHTML = 'Finding products...';

      try {
        const response = await fetch('https://dropshipping-backend-apct.onrender.com/api/find-products');
        const data = await response.json();
        resultsContainer.innerHTML =
          '<h2>Product Ideas:</h2><ul>' +
          data.map(item => `<li>${item}</li>`).join('') +
          '</ul>';
      } catch (error) {
        console.error('Error fetching product ideas:', error);
        resultsContainer.innerHTML = 'Failed to load products. Please try again.';
      }
    });
  } else {
    console.error('Could not find button or results container in DOM.');
  }
});
