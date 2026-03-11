export function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('expert-cart')) || [];
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
    showToast(`${product.title} added to bag`, 'fa-bag-shopping');
}

export function addToWishlist(product) {
    let wishlist = JSON.parse(localStorage.getItem('expert-wishlist')) || [];
    const exists = wishlist.find(item => item.id === product.id);
    
    if (!exists) {
        wishlist.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image
        });
        showToast(`${product.title} saved to archive`, 'fa-heart');
    } else {
        showToast(`${product.title} already in archive`, 'fa-circle-info');
    }
    
    localStorage.setItem('expert-wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
}

export function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('expert-cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countElements = document.querySelectorAll('.cart-count');
    countElements.forEach(el => {
        el.innerText = totalItems;
        
        //show count without moving things
        if (totalItems > 0) {
            el.classList.remove('hidden');
            el.classList.add('flex');
        } else {
            el.classList.add('hidden');
            el.classList.remove('flex');
        }
    });
}

export function updateWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('expert-wishlist')) || [];
    const countElements = document.querySelectorAll('.wishlist-count');
    countElements.forEach(el => {
        el.innerText = wishlist.length;
        if (wishlist.length > 0) {
            el.classList.remove('hidden');
            el.classList.add('flex');
        } else {
            el.classList.add('hidden');
            el.classList.remove('flex');
        }
    });
}

function showToast(message, icon = 'fa-circle-check') {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-8 right-8 bg-black/95 backdrop-blur-2xl text-white px-8 py-5 rounded-[2rem] shadow-2xl z-[200] transform translate-y-20 transition-all duration-500 font-bold flex items-center gap-4 border border-white/10';
    toast.innerHTML = `<i class="fa-solid ${icon} text-highlight"></i> <span class="text-[11px] uppercase tracking-widest leading-none">${message}</span>`;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.remove('translate-y-20'), 100);
    setTimeout(() => {
        toast.classList.add('translate-y-20');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

//update count at start
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    updateWishlistCount();
});

//make functions work everywhere
window.addToCart = addToCart;
window.addToWishlist = addToWishlist;
window.updateCartCount = updateCartCount;
window.updateWishlistCount = updateWishlistCount;
