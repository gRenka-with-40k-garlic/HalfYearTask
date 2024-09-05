// скрипт для создания карточек на странице Cart

const divCart = document.querySelector(".cart");

if (divCart) {
    const cartStorage = JSON.parse(localStorage.getItem("cart") || "[]");

    if (cartStorage.length ) {
        cartStorage.forEach((el => {
            const { imgSrc, type, country, oldprice, newprice, quantity} = el;
            const newCard = document.createElement("div");

            // скрипт для подсчета общей стоимости он же Total cart cost
            function calculateTotalSum() {
                let totalSum = 0;
                cartStorage.forEach((item) => {
                    totalSum += item.quantity * parseInt(item.newprice.replace(/[^0-9.-]+/g, ""));
                });
                return totalSum;
            }

            const cartHeader = document.querySelector(".totalSum");
            const cartHeaderText = document.querySelector(".totalSumText");
            if (cartHeader) {
                const totalSum = calculateTotalSum();
                cartHeader.textContent = `${totalSum} руб.`;
            }

            function updateTotalSum() {
                const totalSum = calculateTotalSum();
                cartHeader.textContent = `${totalSum} руб.`;

                if (totalSum === 0 ) {
                    cartHeaderText.style.display ='none'
                    cartHeader.style.display = 'none'

                    cartContainer.appendChild(emptyMessage);
                }
            }

            // Функции для подсчета стоимости за количество товара в корзине
            function calculateItemSum(item) {
                return (item.quantity * parseInt(item.newprice.replace(/[^0-9.-]+/g, ""))) + " руб.";
            }

            function calculateItemOldSum(item) {
                if (item.oldprice) {
                    const oldPriceValue = (item.quantity * parseInt(item.oldprice.replace(/[^0-9.-]+/g, ""))).toString() + " руб.";
                    return oldPriceValue;
                }
                return "";
            }

            // добавление карточек товаров на страницу Cart

            newCard.classList.add("cart-card");
            newCard.innerHTML = `
                    <img class="product-image" src="${el.imgSrc}" alt="">
                    <div class="first-cart-block">
                        <h2 class="type">${el.type}</h2>
                        <p class="country">${el.country}</p>
                    </div>
                    <div class="second-cart-block">
                        <h2 class="newPrice">${el.newprice}</h2>
                        <p class="oldPrice">${el.oldprice}</p>
                    </div>
                    <div class="cart-quantity-container">
                        <button class="minus-btn" ></button>
                        <input type="number" name="quantity" value="${el.quantity}">
                        <button class="plus-btn" ></button>
                        <div class="third-card-block">
                            <h2 class="item-total-sum">= ${calculateItemSum(el)}</h2>
                            <p class="item-total-old-sum"> ${calculateItemOldSum(el)}</p>
                        </div>
                        <button class="delete-btn"></button>
                    </div>
                `;
            divCart.appendChild(newCard);

            // скрипты для работы кнопок минус\плюс\удалить в карточках товаров на странице Cart

            const plusBtn = newCard.querySelector(".plus-btn");
            const minusBtn = newCard.querySelector(".minus-btn");
            const quantityInput = newCard.querySelector("input[name='quantity']");

            divCart.addEventListener('click', function(event) {
                const target = event.target;

                if (target.classList.contains('delete-btn')) {
                } else if (target.classList.contains('plus-btn')) {
                } else if (target.classList.contains('minus-btn')) {
                }
            });

            divCart.addEventListener('click', function(event) {
                const target = event.target;

                if (target.classList.contains('delete-btn')) {
                    const cardToDelete = target.closest('.cart-card');
                    const index = Array.from(divCart.children).indexOf(cardToDelete);

                    if (index !== -1) {
                        cartStorage.splice(index, 1);
                        localStorage.setItem("cart", JSON.stringify(cartStorage));
                        cardToDelete.remove();
                    }
                    updateTotalSum();
                }
            });

            plusBtn.addEventListener("click", () => {
                el.quantity++;
                quantityInput.value = el.quantity;
                localStorage.setItem("cart", JSON.stringify(cartStorage));

                const itemTotalSum = newCard.querySelector(".item-total-sum");
                itemTotalSum.textContent = `= ${calculateItemSum(el)}`;
                const itemTotalOldSum = newCard.querySelector(".item-total-old-sum")
                itemTotalOldSum.textContent = `${calculateItemOldSum(el)}`
                updateTotalSum();
            });

            minusBtn.addEventListener("click", () => {
                if (el.quantity > 1) {
                    el.quantity--;
                    quantityInput.value = el.quantity;
                    localStorage.setItem("cart", JSON.stringify(cartStorage));

                    const itemTotalSum = newCard.querySelector(".item-total-sum");
                    itemTotalSum.textContent = `= ${calculateItemSum(el)}`;
                    const itemTotalOldSum = newCard.querySelector(".item-total-old-sum")
                    itemTotalOldSum.textContent = `${calculateItemOldSum(el)}`
                    updateTotalSum();
                } else if (el.quantity === 1) {
                    cartStorage.splice(cartStorage.indexOf(el), 1);
                    localStorage.setItem("cart", JSON.stringify(cartStorage));
                    newCard.remove();
                    updateTotalSum();
                }
            });
        }))
    } else {
        // для того чтобы Total card cost не показывалось при пустой корзине
        const cartHeaderText = document.querySelector(".totalSumText");
        const cartHeader = document.querySelector(".totalSum");
        if (cartHeader || cartHeaderText ) {
            cartHeader.style.display = "none";
            cartHeaderText.style.display = "none"
        }
    }
}

