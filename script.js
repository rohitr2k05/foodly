
// FOODLY MENU DATA

const foods = [
  {
    id: 1,
    name: "Classic Cheese Burger",
    category: "Burger",
    price: 199,
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
    description: "Juicy burger with melted cheese."
  },
  {
    id: 2,
    name: "Double Beef Burger",
    category: "Burger",
    price: 249,
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600",
    description: "Double patty with special sauce."
  },
  {
    id: 3,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 299,
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600",
    description: "Classic cheese and tomato pizza."
  },
  {
    id: 4,
    name: "Pepperoni Pizza",
    category: "Pizza",
    price: 349,
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600",
    description: "Loaded with pepperoni and cheese."
  },
  {
    id: 5,
    name: "Chocolate Milkshake",
    category: "Drinks",
    price: 149,
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600",
    description: "Thick and creamy chocolate shake."
  },
  {
    id: 6,
    name: "Fresh Strawberry Drink",
    category: "Drinks",
    price: 129,
    rating: "4.6",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600",
    description: "Refreshing fruity drink."
  },
  {
    id: 7,
    name: "Chocolate Brownie",
    category: "Dessert",
    price: 179,
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600",
    description: "Rich chocolate brownie."
  },
  {
    id: 8,
    name: "Strawberry Cheesecake",
    category: "Dessert",
    price: 199,
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600",
    description: "Creamy cheesecake with strawberries."
  },
  {
    id: 9,
    name: "Veggie Burger",
    category: "Burger",
    price: 179,
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600",
    description: "Fresh vegetables and crispy patty."
  }
];


// CART DATA

let cart = [];
let selectedCategory = "All";


// DISPLAY FOOD

function displayFoods(items) {
  const container = document.getElementById("food-container");

  if (items.length === 0) {
    container.innerHTML = `
      <p class="text-gray-400 text-center col-span-full py-10">
        No food items found. Try another search!
      </p>
    `;
    return;
  }

  container.innerHTML = items.map(food => `
    <div class="food-card">
      <img src="${food.image}" alt="${food.name}">

      <div class="food-info">
        <div class="flex justify-between items-center">
          <span class="text-xs text-orange-400 uppercase tracking-wider">
            ${food.category}
          </span>
          <span class="text-yellow-400">★ ${food.rating}</span>
        </div>

        <h3 class="text-xl font-bold mt-3">${food.name}</h3>

        <p class="text-gray-400 text-sm mt-2">
          ${food.description}
        </p>

        <div class="flex justify-between items-center mt-6">
          <span class="food-price">₹${food.price}</span>

          <button class="add-button" onclick="addToCart(${food.id})">
            + Add
          </button>
        </div>
      </div>
    </div>
  `).join("");
}


// FILTER FOODS

function filterFoods() {
  const search = document
    .getElementById("search-input")
    .value.toLowerCase();

  const filtered = foods.filter(food => {
    const matchesCategory =
      selectedCategory === "All" ||
      food.category === selectedCategory;

    const matchesSearch =
      food.name.toLowerCase().includes(search) ||
      food.category.toLowerCase().includes(search);

    return matchesCategory && matchesSearch;
  });

  displayFoods(filtered);
}


// CATEGORY BUTTONS

document.querySelectorAll(".category-btn").forEach(button => {
  button.addEventListener("click", () => {

    document.querySelectorAll(".category-btn")
      .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    selectedCategory = button.dataset.category;

    filterFoods();
  });
});


// SEARCH

document.getElementById("search-input")
  .addEventListener("input", filterFoods);


// ADD TO CART

function addToCart(id) {
  const food = foods.find(item => item.id === id);

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({...food, quantity: 1});
  }

  updateCart();

  alert(food.name + " added to your cart!");
}


// CHANGE QUANTITY

function changeQuantity(id, amount) {
  const item = cart.find(food => food.id === id);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(food => food.id !== id);
  }

  updateCart();
}


// REMOVE ITEM

function removeItem(id) {
  cart = cart.filter(food => food.id !== id);
  updateCart();
}


// UPDATE CART

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  const totalQuantity = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  cartCount.textContent = totalQuantity;
  cartTotal.textContent = "₹" + totalPrice;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <p class="text-gray-400 text-center py-10">
        Your cart is empty. Add something delicious!
      </p>
    `;
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="flex-1">
        <h3 class="font-semibold">${item.name}</h3>
        <p class="text-orange-400 mt-1">₹${item.price}</p>

        <div class="quantity-controls">
          <button onclick="changeQuantity(${item.id}, -1)">−</button>
          <span>${item.quantity}</span>
          <button onclick="changeQuantity(${item.id}, 1)">+</button>
        </div>
      </div>

      <button onclick="removeItem(${item.id})">
        Remove
      </button>
    </div>
  `).join("");
}


// OPEN CART

function toggleCart() {
  document.getElementById("cart-sidebar")
    .classList.toggle("open");

  document.getElementById("cart-overlay")
    .classList.toggle("hidden");
}


// CLOSE CART

function closeCart() {
  document.getElementById("cart-sidebar")
    .classList.remove("open");

  document.getElementById("cart-overlay")
    .classList.add("hidden");
}


// MOBILE MENU

function toggleMobileMenu() {
  document.getElementById("mobile-menu")
    .classList.toggle("hidden");

  document.getElementById("mobile-menu")
    .classList.toggle("flex");
}


// CHECKOUT

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  alert(
    "Thank you for choosing FOODLY!\n" +
    "Your order total is ₹" + total +
    "\nThis is a demo checkout. No actual order was placed."
  );
}


// CONTACT FORM

document.getElementById("contact-form")
  .addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("contact-name").value;

    alert("Thank you, " + name + "! Your message has been received.");

    this.reset();
  });


// INITIALIZE WEBSITE

displayFoods(foods);
updateCart();
