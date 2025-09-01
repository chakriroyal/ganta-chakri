const plusIcons = document.querySelectorAll('.gallery-plus');
const popupOverlay = document.getElementById('popupOverlay');
const closeBtn = document.getElementById('closeBtn');

// Popup content elements
const popupImg = popupOverlay.querySelector('img');
const popupTitle = popupOverlay.querySelector('h2');
const popupPrice = popupOverlay.querySelector('.price');
const popupDesc = popupOverlay.querySelector('p:not(.price)');
const colorOptionsContainer = document.getElementById('colorOptions');
const addToCartBtn = document.getElementById('addToCartBtn'); // ADD TO CART button

// Example product data
const products = [
  {
    img: "{{ 'image 822.png' | asset_url }}",
    title: "Orange Wide Leg",
    price: "980,00€",
    desc: "This one-piece swimsuit is crafted from jersey featuring an allover micro Monogram motif in relief.",
    colors: [
      { name: "White", code: "white" },
      { name: "Black", code: "black" }
    ]
  },
  {
    img: "{{ 'image 823.png' | asset_url }}",
    title: "Tailored Jacket",
    price: "980,00€",
    desc: "This one-piece swimsuit is crafted from jersey featuring an allover micro Monogram motif in relief.",
    colors: [
      { name: "Blue", code: "blue" },
      { name: "Black", code: "black" }
    ]
  },
  {
    img: "{{ 'image 824.png' | asset_url }}",
    title: "Accordion Pleated Dress",
    price: "980,00€",
    desc: "This one-piece swimsuit is crafted from jersey featuring an allover micro Monogram motif in relief.",
    colors: [
      { name: "Red", code: "red" },
      { name: "Grey", code: "grey" }
    ]
  },
  {
    img: "{{ 'image 825.png' | asset_url }}",
    title: "Green Trench Coat",
    price: "980,00€",
    desc: "This one-piece swimsuit is crafted from jersey featuring an allover micro Monogram motif in relief.",
    colors: [
      { name: "White", code: "white" },
      { name: "Black", code: "black" }
    ]
  },
  {
    img: "{{ 'image 826.png' | asset_url }}",
    title: "Tennis Blue T-Shirt",
    price: "980,00€",
    desc: "This one-piece swimsuit is crafted from jersey featuring an allover micro Monogram motif in relief.",
    colors: [
      { name: "Grey", code: "grey" },
      { name: "Black", code: "black" }
    ]
  },
  {
    img: "{{ 'image 827.png' | asset_url }}",
    title: "Long Sleeve Tennis Top",
    price: "980,00€",
    desc: "This one-piece swimsuit is crafted from jersey featuring an allover micro Monogram motif in relief.",
    colors: [
      { name: "Blue", code: "blue" },
      { name: "Black", code: "black" }
    ]
  }
];

// Open popup with product details
plusIcons.forEach((icon, index) => {
  icon.addEventListener('click', () => {
    const product = products[index];
    popupImg.src = product.img;
    popupTitle.textContent = product.title;
    popupPrice.textContent = product.price;
    popupDesc.textContent = product.desc;

    // Clear previous color buttons
    colorOptionsContainer.innerHTML = '';
    product.colors.forEach(color => {
      const colorBtn = document.createElement('div');
      colorBtn.classList.add('color-btn', color.code);
      colorBtn.onclick = () => selectColor(colorBtn);

      const colorDisplay = document.createElement('span');
      colorDisplay.classList.add('color-display');
      colorDisplay.style.background = color.code;

      const colorName = document.createElement('p');
      colorName.textContent = color.name;

      colorBtn.appendChild(colorDisplay);
      colorBtn.appendChild(colorName);

      colorOptionsContainer.appendChild(colorBtn);
    });

    popupOverlay.style.display = 'flex';
  });
});

// Close popup
closeBtn.addEventListener('click', () => {
  popupOverlay.style.display = 'none';
});

// Close when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === popupOverlay) {
    popupOverlay.style.display = 'none';
  }
});

// Color selection
function selectColor(el) {
  colorOptionsContainer.querySelectorAll('.color-btn')
    .forEach(btn => btn.classList.remove('selected'));
  el.classList.add('selected');
}

// ========== SIZE DROPDOWN ==========
const dropdown = document.getElementById('dropdown');
const optionsContainer = document.getElementById('options');
const arrow = document.getElementById('arrow'); 
const iconArrow = arrow.querySelector('.icon-arrow');
const selected = document.getElementById('selected');
const options = document.querySelectorAll('.option');

let isOptionSelected = false;
let isOpen = false;

dropdown.addEventListener('click', (e) => {
  if (e.target.classList.contains('option')) return;

  if (isOpen) {
    optionsContainer.style.display = 'none';
    iconArrow.classList.remove('open');
    isOpen = false;
  } else {
    optionsContainer.style.display = 'block';
    iconArrow.classList.add('open');
    isOpen = true;
  }
});

options.forEach(option => {
  option.addEventListener('click', (e) => {
    e.stopPropagation();
    selected.textContent = e.target.textContent;
    selected.classList.add('center');
    optionsContainer.style.display = 'none';
    iconArrow.classList.remove('open');
    isOptionSelected = true;
    isOpen = false;
  });
});

document.addEventListener('click', (e) => {
  if (!dropdown.contains(e.target)) {
    optionsContainer.style.display = 'none';
    iconArrow.classList.remove('open');
    isOpen = false;
  }
});

// ========== ADD TO CART ==========
addToCartBtn.addEventListener('click', () => {
  const title = popupTitle.textContent;
  const priceText = popupPrice.textContent;
  const price = parseFloat(priceText.replace(/[^\d.]/g, ""));
  const img = popupImg.src;
  const size = isOptionSelected ? selected.textContent : null;
  const colorBtn = colorOptionsContainer.querySelector('.selected');
  const color = colorBtn ? colorBtn.querySelector('p').textContent : null;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if same product + size + color exists
  let existing = cart.find(item => 
    item.product === title &&
    item.size === size &&
    item.color === color
  );

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ product: title, price, img, quantity: 1, size, color });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  // ✅ After saving → Go to cart.html
  window.location.href = "Shopify_cart.html";
});
