// Review Confirmation Page
// Increment and display review counter
function updateReviewCounter() {
    // Get current count from localStorage
    let reviewCount = localStorage.getItem('reviewCount');
    
    // If no count exists, initialize to 0
    if (reviewCount === null) {
        reviewCount = 0;
    }
    
    // Increment the count
    reviewCount = parseInt(reviewCount) + 1;
    
    // Save back to localStorage
    localStorage.setItem('reviewCount', reviewCount);
    
    // Display the count
    document.getElementById('reviewCount').textContent = reviewCount;
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
    updateReviewCounter();
    updateFooter();
});