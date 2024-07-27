document.addEventListener('DOMContentLoaded', () => {
    
    return fetch( "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayBurgers(data);
        })
        .catch(error => console.error('Error:', error));
});

function displayBurgers(foodItems) {
    const container = document.querySelector('.food-container');
    console.log(foodItems);
    container.innerHTML = ''; // Clear any existing content

    foodItems.forEach((item) => {
        console.log(item.imgSrc);
        const burgerDiv = document.createElement('div');
        burgerDiv.classList.add('burger');

        const burgerImageDiv = document.createElement('div');
        burgerImageDiv.classList.add('burger-image');
        burgerImageDiv.style.backgroundImage = `url('${item.imgSrc}')`; 

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('info');

        const nameParagraph = document.createElement('p');
        nameParagraph.textContent = item.name;

        const price = document.createElement('p');
        price.style.marginLeft="10px"
        price.textContent = "$"+item.price;

        const plusIcon = document.createElement('i');
        plusIcon.classList.add('bx', 'bx-plus');
        plusIcon.style.color = '#fffbfb';

        infoDiv.append(nameParagraph);
        infoDiv.append(price);
        infoDiv.append(plusIcon);

        burgerDiv.append(burgerImageDiv);
        burgerDiv.append(infoDiv);

        container.append(burgerDiv);
    });
}






let menuData = [];

// Function to fetch and display the menu
function getMenu() {
    return fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json')
        .then(response => response.json())
        .then(data => {
            menuData = data; // Store the fetched menu data globally
            displayBurgers(data); // Function to display burgers
            return data; // Return menu items
        })
        .catch(error => {
            console.error('Error fetching menu:', error);
            throw error; // Propagate the error
        });
}

// Function to take an order
function takeOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate selecting 3 random items from the menuData
            const selectedItems = [];
            const menuLength = menuData.length;
            for (let i = 0; i < 3; i++) {
                const randomIndex = Math.floor(Math.random() * menuLength);
                selectedItems.push(menuData[randomIndex]);
            }

            resolve({ order: selectedItems });
        }, 2500); 
    });
}

function orderPrep() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: false });
        }, 1500); 
    });
}


function payOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: true });
        }, 1000); 
    });
}

function thankYouFnc() {
    alert('Thank you for eating with us today!');
}

function handleRestaurantProcess() {
    getMenu()
        .then(menu => {
            console.log('Menu:', menu); 
            return takeOrder();
        })
        .then(order => {
            console.log('Order:', order); 
            return orderPrep(); 
        })
        .then(prepStatus => {
            console.log('Order Preparation Status:', prepStatus); 
            return payOrder();
        })
        .then(paymentStatus => {
            console.log('Payment Status:', paymentStatus); 
            if (paymentStatus.paid) {
                thankYouFnc(); 
            }
        })
        .catch(error => {
            console.error('An error occurred:', error); 
        });
}


document.addEventListener('DOMContentLoaded', () => {
    handleRestaurantProcess();
});