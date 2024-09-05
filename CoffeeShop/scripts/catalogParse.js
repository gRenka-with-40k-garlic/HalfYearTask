// скрипт для парсинга карточек товаров со страниц coffee и sweets
const card = document.querySelectorAll(".card");

card.forEach((el) => {
    const img = el.childNodes[1];
    const type = el.childNodes[3];
    const country = el.childNodes[5];
    const oldprice = el.childNodes[7];
    const newprice = el.childNodes[9]; //btn

    // добавляет товар в корзину по нажатию на кнопку с ценником на страницах coffee и sweets
    newprice.addEventListener("click", () => {
        const cartStorage = JSON.parse(localStorage.getItem("cart") || "[]");

        //проверка есть ли товар в корзине
        const existingCard = cartStorage.find((item) => {
            return (
                item.imgSrc === img.src &&
                item.type === type.innerText &&
                item.country === country.innerText &&
                item.oldprice === oldprice.innerText &&
                item.newprice === newprice.innerText
            );
        });
        // если есть не добавляет новую карточку, а прибавляет количество товара
        if (existingCard) {
            existingCard.quantity++;
        } else {
            // если нет добавляет новую карточку с количеством 1
            const card = {
                imgSrc: img.src,
                type: type.innerText,
                country: country.innerText,
                oldprice: oldprice.innerText,
                newprice: newprice.innerText,
                quantity: 1
            };
            cartStorage.push(card);
        }
        localStorage.setItem("cart", JSON.stringify(cartStorage));
    });
});