document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.getElementById('submit');
    const inputForm = document.querySelector('.input-form');
    const receipt = document.querySelector('.receipt');

    submitButton.addEventListener('click', function() {
        const nameInput = document.getElementById('name').value.trim();
        const numberInput = document.getElementById('number').value.trim();
        const priceInput = document.getElementById('price').value.trim();

        if (!nameInput || !numberInput || !priceInput) {
            alert('Пожалуйста, заполните все поля!');
            return;
        }

        if (!/^\d+$/.test(numberInput)) {
            alert('Номер телефона должен содержать только цифры!');
            return;
        }

        if (isNaN(priceInput) || Number(priceInput) <= 0) {
            alert('Введите корректную сумму!');
            return;
        }

        const fullPhone = '996' + numberInput;
        const recipientNameElement = document.getElementById('recipient-name');
        if (recipientNameElement) {
            recipientNameElement.innerHTML = `<strong>Имя получателя:</strong> ${nameInput}`;
        }

        const transferInfoElement = document.querySelector('.transfer-info');
        if (transferInfoElement) {
            const formattedPrice = Number(priceInput).toFixed(2);
            transferInfoElement.innerHTML = `Перевод по номеру телефона qr. ${fullPhone}/${nameInput}/ / Сумма ${formattedPrice}KGS`;
        }

        const amountElement = document.querySelector('.amount');
        if (amountElement) {
            const formattedPrice = Number(priceInput).toFixed(2).replace('.', ',');
            amountElement.textContent = `-${formattedPrice} с̱`;
        }

        // Обновляем дату операции
        const transactionDateElement = document.getElementById('transaction-date');
        if (transactionDateElement) {
            const now = new Date();
            const day = now.getDate().toString().padStart(2, '0');
            const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Месяцы начинаются с 0
            const year = now.getFullYear();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const formattedDate = `${day}.${month}.${year}, ${hours}:${minutes}`;
            transactionDateElement.innerHTML = `<strong>Дата операции:</strong> ${formattedDate}`;
        }

        inputForm.style.display = 'none';
        receipt.style.display = 'block';
    });
});