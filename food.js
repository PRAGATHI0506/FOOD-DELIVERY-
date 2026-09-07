
let cart = [];
function addToCart(name, price) {
    let existingItem =
        cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    }
    else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }
    displayCart();
    alert(name + " added to your cart 🛒");
}
function displayCart() {
    const cartItems =
        document.getElementById("cart-items");
    const cartCount =
        document.getElementById("cart-count");
    const totalElement =
        document.getElementById("total");
    cartItems.innerHTML = "";
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
                Add some delicious food! 🍕
            </p>
        `;
        cartCount.innerText = "0";
        totalElement.innerText = "0";
        return;
    }
    let total = 0;
    let count = 0;
    cart.forEach((item, index) => {
        let itemTotal =
            item.price * item.quantity;
        total += itemTotal;
        count += item.quantity;
        let cartItem =
            document.createElement("div");
        cartItem.className =
            "cart-item";
        cartItem.innerHTML = `
            <div class="cart-info">
                <h3>
                    ${item.name}
                </h3>
                <p>
                    ₹${item.price} ×
                    ${item.quantity}
                </p>
            </div>
            <div class="quantity">
                <button
                    onclick="decreaseQuantity(${index})">
                    −
                </button>
                <span>
                    ${item.quantity}
                </span>
                <button
                    onclick="increaseQuantity(${index})">
                    +
                </button>
            </div>
            <strong>
                ₹${itemTotal}
            </strong>
            <button
                class="remove-btn"
                onclick="removeItem(${index})">
                Remove
            </button>
        `;
        cartItems.appendChild(cartItem);
    });
    cartCount.innerText = count;
    totalElement.innerText = total;
}
function increaseQuantity(index) {
    cart[index].quantity++;
    displayCart();
}
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    }
    else {
        cart.splice(index, 1);
    }
    displayCart();
}
function removeItem(index) {
    cart.splice(index, 1);
    displayCart();
}
function clearCart() {
    if (cart.length === 0) {
        alert("Your cart is already empty!");
        return;
    }
    cart = [];
    displayCart();
}
function goToMenu() {
    document
        .getElementById("menu")
        .scrollIntoView({
            behavior: "smooth"
        });
}
function applyOffer() {
    alert(
        "🎉 FOOD50 offer selected!\n\n" +
        "Add food to cart and use coupon FOOD50."
    );
}
function addCombo() {
    addToCart(
        "Burger + Fries + Drink Combo",
        299
    );
}
function openCheckout() {
    if (cart.length === 0) {
        alert(
            "🛒 Your cart is empty!\n\n" +
            "Please add food before checkout."
        );
        return;
    }
    document
        .getElementById("checkout")
        .style.display = "block";
    document
        .getElementById("checkout")
        .scrollIntoView({
            behavior: "smooth"
        });
}
function backToCart() {
    document
        .getElementById("checkout")
        .style.display = "none";
    document
        .getElementById("cart-section")
        .scrollIntoView({
            behavior: "smooth"
        });
}
function placeOrder() {
    if (cart.length === 0) {
        alert(
            "🛒 Your cart is empty!"
        );
        return;
    }
    const name =
        document
            .getElementById("customerName")
            .value.trim();
    const phone =
        document
            .getElementById("customerPhone")
            .value.trim();
    const address =
        document
            .getElementById("customerAddress")
            .value.trim();
    const time =
        document
            .getElementById("deliveryTime")
            .value;
    const payment =
        document
            .getElementById("paymentMethod")
            .value;
    if (name === "") {
    alert(
          "Please enter your name."
        );
        return;
    }
    if (!/^[0-9]{10}$/.test(phone)) {
        alert(
            "Please enter a valid 10 digit phone number."
        );

        return;
    }
    if (address === "") {
        alert(
            "Please enter your delivery address."
        );
        return;
    }
    if (time === "") {
        alert(
            "Please select delivery time."
        );
        return;
    }
    if (payment === "") {
        alert(
            "Please select payment method."
        );
        return;
    }
    let total = 0;
    cart.forEach(item => {
        total +=
            item.price * item.quantity;
    });
    document
        .getElementById("success-name")
        .innerText = name;
    document
        .getElementById("success-phone")
        .innerText = phone;
    document
        .getElementById("success-address")
        .innerText = address;
    document
        .getElementById("success-time")
        .innerText = time;
    document
        .getElementById("success-payment")
        .innerText = payment;
    document
        .getElementById("success-total")
        .innerText = total;
    cart = [];
    displayCart();
    document
        .getElementById("checkout")
        .style.display = "none";
    document
        .getElementById("order-success")
        .style.display = "block";
    document
        .getElementById("order-success")
        .scrollIntoView({
            behavior: "smooth"
        });
}
function goToHome() {
    document
        .getElementById("order-success")
        .style.display = "none";
    document
        .getElementById("home")
        .scrollIntoView({
            behavior: "smooth"
        });
}
function filterFood(category, button) {
    const cards =
        document.querySelectorAll(".food-card");
    const buttons =
        document.querySelectorAll(".filter-btn");
    buttons.forEach(btn => {
        btn.classList.remove("active");
    });
    button.classList.add("active");
    cards.forEach(card => {
        const categories =
            card.dataset.category;
        if (
            category === "all" ||
            categories.includes(category)
        ) {
            card.style.display = "block";
        }
        else {
            card.style.display = "none";
        }
    });
}
function searchFood() {
    const searchValue =
        document
            .getElementById("searchFood")
            .value
            .toLowerCase();
    const cards =
        document.querySelectorAll(".food-card");
    cards.forEach(card => {
        const foodName =
            card
                .querySelector("h3")
                .innerText
                .toLowerCase();
        if (
            foodName.includes(searchValue)
        ) {
            card.style.display = "block";
        }
        else {
            card.style.display = "none";
        }
    });
}
displayCart();
