// скрипт для проверки пустоты корзины
function isCartEmpty() {
    const cartStorage = JSON.parse(localStorage.getItem('cart')) || [];
    return cartStorage.length === 0;
}

// если корзина пуста, форма отправки не откроется
// если корзина стала пустой (из нее удалили товары) откроется, не могу это решить 
const purchaseButton = document.getElementById("purchaseButton");
purchaseButton.addEventListener("click", function(event) {
    if (isCartEmpty()) {
        event.preventDefault();
        alert("Корзина пуста");
    }
});

// скрипт для вывода текста "Тут пока что пусто", при пустой корзине
const cartContainer = document.getElementById('empty-container');
const emptyMessage = document.createElement('p');
emptyMessage.textContent = "Тут пока что пусто";
emptyMessage.classList.add('empty-container');
const cartStorage = JSON.parse(localStorage.getItem('cart')) || [];

if (isCartEmpty()) {
    cartContainer.appendChild(emptyMessage);
}

// валидация номера телефона в pop up форме отправки
window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('.tel'), function(input) {
        var keyCode;
        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            var pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            var matrix = "+7 (___)-___-__-__",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function(a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                });
            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function(a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
            if (event.type == "blur" && this.value.length < 5)
                this.value = ""
        }
        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false)
    });

    // скрипты для функционала формы отправки
    const modal = document.getElementById("myModal");
    const btn = document.querySelector(".cart-order-btn");
    const span = document.getElementsByClassName("close")[0];

    if (modal && btn && span) {
        btn.addEventListener("click", function() {
            if (!isCartEmpty()) {
                modal.style.display = "block";
            }
        });

        span.addEventListener("click", function() {
            modal.style.display = "none";
        });

        window.addEventListener("click", function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });

        const orderForm = document.getElementById("orderForm");

        orderForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const phoneNumber = document.getElementById("phone").value;
            console.log(phoneNumber);
            modal.style.display = "none";
        });
    }
});