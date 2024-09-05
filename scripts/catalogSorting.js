
// скрипты для кнопок сортировки на страницах sweets и coffee

// сортировка по цене
function sortByPrice(direction) {
    const productCards = document.querySelectorAll('.card');
    const sortedCards = Array.from(productCards).sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.newPrice').innerText.replace(/[^\d.]/g, ''));
        const priceB = parseFloat(b.querySelector('.newPrice').innerText.replace(/[^\d.]/g, ''));
        return direction === 'asc' ? priceA - priceB : priceB - priceA;
    });
    sortedCards.forEach(card => productCards[0].parentNode.appendChild(card));
}

// сортировка по виду\названию
function sortByType(direction) {
    const productCards = document.querySelectorAll('.card');
    const sortedCards = Array.from(productCards).sort((a, b) => {
        const typeAElement = a.querySelector('h2');
        const typeBElement = b.querySelector('h2');
        if (typeAElement && typeBElement) {
            const typeA = typeAElement.innerText.toLowerCase();
            const typeB = typeBElement.innerText.toLowerCase();
            return direction === 'asc' ? typeA.localeCompare(typeB) : typeB.localeCompare(typeA);
        }
        return 0;
    });
    sortedCards.forEach(card => productCards[0].parentNode.appendChild(card));
}

// сортировка по стране
function sortByCountry(direction) {
    const productCards = document.querySelectorAll('.card');
    const sortedCards = Array.from(productCards).sort((a, b) => {
        const countryAElement = a.querySelector('p:nth-child(3)');
        const countryBElement = b.querySelector('p:nth-child(3)');
        if (countryAElement && countryBElement) {
            const countryA = countryAElement.innerText.toLowerCase();
            const countryB = countryBElement.innerText.toLowerCase();
            return direction === 'asc' ? countryA.localeCompare(countryB) : countryB.localeCompare(countryA);
        }
        return 0;
    });
    sortedCards.forEach(card => productCards[0].parentNode.appendChild(card));
}