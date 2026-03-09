/**
 * Expert E-Commerce Add to Cart Logic
 * Uses localStorage to persist cart data
 */

export function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('expert-cart')) || [];
    
    // Check if item exists
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('expert-cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show toast or notification
    showToast(`${product.title} added to bag`);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('expert-cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const countElements = document.querySelectorAll('.cart-count');
    countElements.forEach(el => {
        el.innerText = totalItems;
        el.parentElement.classList.add('scale-103');
        setTimeout(() => el.parentElement.classList.remove('scale-103'), 300);
    });
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-8 right-8 bg-black text-white px-6 py-4 rounded-2xl shadow-2xl z-[200] transform translate-y-20 transition-all duration-500 font-bold flex items-center gap-3';
    toast.innerHTML = `<i class="fa-solid fa-circle-check text-green-400"></i> ${message}`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.remove('translate-y-20');
    }, 100);
    
    setTimeout(() => {
        toast.classList.add('translate-y-20');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// Initial count update
document.addEventListener('DOMContentLoaded', updateCartCount);

// Expose to window for non-module scripts
window.addToCart = addToCart;
window.updateCartCount = updateCartCount;
