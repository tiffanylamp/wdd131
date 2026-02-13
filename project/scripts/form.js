// Product array
const products = [
    {
        id: "fc-1888",
        name: "GPS Watch",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "Trekking Poles",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "Energy bars",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "Apparel",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "Tools and Safety",
        averagerating: 5.0
    }
];

// Product select dropdown
function populateProducts() {
    const selectElement = document.getElementById('productName');
    
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.name;
        option.textContent = product.name;
        selectElement.appendChild(option);
    });
}

// Update footer with current year and last modified date
function updateFooter() {
    // Set current year
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;
    
    // Set last modified date
    const lastModified = document.lastModified;
    document.getElementById('lastModified').textContent = `Last Modification: ${lastModified}`;
}

document.addEventListener('DOMContentLoaded', function() {
    populateProducts();
    updateFooter();
});