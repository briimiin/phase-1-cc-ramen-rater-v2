// index.js
const handleClick = (ramenId) => {
  fetch(`http://localhost:3000/ramens/${ramenId}`)
    .then(response => response.json())
    .then(ramen => {
        const ramenDetail = document.getElementById('ramen-detail');
        ramenDetail.innerHTML = `
            <h2>${ramen.name}</h2>
            <h3>${ramen.restaurant}</h3>
            <p>Rating: ${ramen.rating}</p>
            <p>Comment: ${ramen.comment}</p>
        `;
    });
};

const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(form);
      const name = formData.get('name');
      const restaurant = formData.get('restaurant');
      const image = formData.get('image');
      const rating = formData.get('rating');
      const comment = formData.get('comment');

      const newRamen = {
          name,
          restaurant,
          image,
          rating,
          comment
      };

      const ramenMenu = document.getElementById('ramen-menu');
      const img = document.createElement('img');
      img.src = image;
      img.addEventListener('click', () => handleClick(newRamen.id));
      ramenMenu.appendChild(img);
  });
};

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
      .then(response => response.json())
      .then(ramens => {
          const ramenMenu = document.getElementById('ramen-menu');
          ramens.forEach(ramen => {
              const img = document.createElement('img');
              img.src = ramen.image;
              img.addEventListener('click', () => handleClick(ramen.id));
              ramenMenu.appendChild(img);
          });
      });
};

const main = () => {
  displayRamens();
  addSubmitListener();
};

main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
