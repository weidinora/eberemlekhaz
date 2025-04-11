// Navigáció menü mobilon
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (toggleButton && navLinks) {
    toggleButton.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  const favorites = new Set();
  const cart = [];

  // Kosár gombok
  document.querySelectorAll(".cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const product = btn.closest(".product-card");
      const name = product.querySelector(".product-name").textContent;
      cart.push(name);
      alert(`Kosárhoz adva: ${name}`);
      console.log("Kosár tartalma:", cart);
    });
  });

  // Kedvencek gombok
  document.querySelectorAll(".favorite").forEach((btn) => {
    btn.addEventListener("click", () => {
      const product = btn.closest(".product-card");
      const name = product.querySelector(".product-name").textContent;
      const icon = btn.querySelector("i");

      if (favorites.has(name)) {
        favorites.delete(name);
        icon.classList.remove("bi-heart-fill");
        icon.classList.add("bi-heart");
        alert(`Eltávolítva a kedvencekből: ${name}`);
      } else {
        favorites.add(name);
        icon.classList.remove("bi-heart");
        icon.classList.add("bi-heart-fill");
        alert(`Kedvencekhez adva: ${name}`);
      }

      console.log("Kedvencek:", Array.from(favorites));
    });
  });

  // Szűrés gombok
  const filterButtons = document.querySelectorAll('.filters button');
  filterButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const category = event.target.dataset.category;
      filterButtons.forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
      filterProducts(category);
    });
  });
});

// Szűrés funkció
function filterProducts(category) {
  const products = document.querySelectorAll('.product-card');
  products.forEach(product => {
    if (category === 'all' || product.dataset.category === category) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const favorites = new Set(JSON.parse(localStorage.getItem("favorites") || "[]"));
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  // Kosár gomb
  document.querySelectorAll(".cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const product = btn.closest(".product-card");
      const name = product.querySelector(".product-name").textContent;

      cart.push(name);
      localStorage.setItem("cart", JSON.stringify(cart)); // Mentés
      alert(`Kosárhoz adva: ${name}`);
      console.log("Kosár tartalma:", cart);
    });
  });

  // Kedvencek gomb
  document.querySelectorAll(".favorite").forEach((btn) => {
    btn.addEventListener("click", () => {
      const product = btn.closest(".product-card");
      const name = product.querySelector(".product-name").textContent;
      const icon = btn.querySelector("i");

      if (favorites.has(name)) {
        favorites.delete(name);
        icon.classList.remove("bi-heart-fill");
        icon.classList.add("bi-heart");
        alert(`Eltávolítva a kedvencekből: ${name}`);
      } else {
        favorites.add(name);
        icon.classList.remove("bi-heart");
        icon.classList.add("bi-heart-fill");
        alert(`Kedvencekhez adva: ${name}`);
      }

      localStorage.setItem("favorites", JSON.stringify([...favorites])); // Mentés
      console.log("Kedvencek:", [...favorites]);
    });
  });

  // Szűrőgombok kezelése (változatlan maradhat)
  const filterButtons = document.querySelectorAll('.filters button');
  filterButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const category = event.target.getAttribute('onclick').match(/'(.+?)'/)[1];
      filterButtons.forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
      filterProducts(category);
    });
  });
});
