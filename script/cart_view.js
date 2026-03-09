function renderCart() {
    const cart = JSON.parse(localStorage.getItem('expert-cart')) || [];
    const itemsContainer = document.getElementById('cart-items');
    const container = document.getElementById('cart-container');
    const emptyState = document.getElementById('empty-cart');
    
    if (!itemsContainer || !container || !emptyState) return;

    if (cart.length === 0) {
        container.classList.add('hidden');
        emptyState.classList.remove('hidden');
        return;
    }

    container.classList.remove('hidden');
    emptyState.classList.add('hidden');
    itemsContainer.innerHTML = '';

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const row = document.createElement('div');
        row.className = 'item-row group flex flex-col md:flex-row items-center gap-10 bg-gray-400/10 backdrop-blur-xl p-7 rounded-3xl border-2 border-white shadow-[5px_3px_25px_5px_rgba(0,0,0,0.15)] transition-all duration-500 relative overflow-hidden';
        row.innerHTML = `
            <div class="absolute top-0 left-0 w-1.5 h-full bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500"></div>
            
            <!-- Product Preview -->
            <div class="w-40 h-40 bg-gray-500/20 rounded-3xl p-6 flex items-center justify-center shrink-0 relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent"></div>
                <img src="${item.image}" class="max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-1000">
            </div>

            <!-- Product Intel -->
            <div class="flex-grow space-y-6">
                <div class="space-y-2">
                    <div class="flex flex-wrap items-center gap-4">
                        <span class="text-[8px] font-black text-highlight uppercase tracking-[0.4em]">Archive Entry</span>
                        <span class="flex h-1 w-1 relative">
                            <span class="animate-bounce absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-1 w-1 bg-gray-300"></span>
                        </span>
                        <span class="text-[8px] font-bold text-gray-400 uppercase tracking-widest">REF: PRD-${item.id}X</span>
                        <span class="px-2 py-0.5 bg-green-50 text-green-500 rounded text-[7px] font-black uppercase tracking-widest ml-auto">Verified Stock</span>
                    </div>
                    <h3 class="font-black text-2xl tracking-tighter uppercase leading-none group-hover:text-primary transition-colors">${item.title}</h3>
                </div>

                <div class="flex items-center gap-8">
                    <div class="flex items-center gap-4/20 p-1.5 rounded-xl border-0">
                        <button onclick="updateQuantity(${item.id}, -1)" class="w-10 h-10 flex items-center justify-center rounded-full bg-black/70 hover:text-white hover:bg-black transition-all text-white">
                            <i class="fa-solid fa-minus text-sm"></i>
                        </button>
                        <span class="text-[10px] font-black min-w-[30px] text-center tracking-tighter">${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)" class="w-10 h-10 flex items-center justify-center rounded-full text-white bg-black/70 hover:text-white hover:bg-black transition-all">
                            <i class="fa-solid fa-plus text-sm"></i>
                        </button>
                    </div>
                    
                    <button onclick="removeItem(${item.id})" class="text-[8px] font-black uppercase tracking-widest text-gray-500 hover:text-red-500 transition-colors flex items-center gap-2">
                        <i class="fa-solid fa-circle-xmark text-sm"></i> Wipe Entry
                    </button>

                    <!-- Price Settlement -->
                    <div class="text-right flex flex-col items-end justify-between self-stretch shrink-0 py-2">
                        <div class="space-y-1">
                            <span class="text-3xl font-black tracking-tighter">$${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>


        `;
        itemsContainer.appendChild(row);
    });

    const grossTotal = document.getElementById('gross-total');
    const finalTotal = document.getElementById('final-total');
    if (grossTotal) grossTotal.innerText = `$${total.toFixed(2)}`;
    if (finalTotal) finalTotal.innerText = `$${total.toFixed(2)}`;
}

function updateQuantity(id, delta) {
    let cart = JSON.parse(localStorage.getItem('expert-cart')) || [];
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
        localStorage.setItem('expert-cart', JSON.stringify(cart));
        renderCart();
        // Update cart count in header if window.updateCartCount exists
        if (typeof window.updateCartCount === 'function') {
            window.updateCartCount();
        }
    }
}

function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem('expert-cart')) || [];
    cart = cart.filter(i => i.id !== id);
    localStorage.setItem('expert-cart', JSON.stringify(cart));
    renderCart();
    if (typeof window.updateCartCount === 'function') {
        window.updateCartCount();
    }
}

function clearCart() {
    localStorage.setItem('expert-cart', JSON.stringify([]));
    renderCart();
    if (typeof window.updateCartCount === 'function') {
        window.updateCartCount();
    }
}

function checkout() {
    alert('Finalizing Batch Settlement...');
    clearCart();
}

// Attach to window for HTML onclick compatibility
window.renderCart = renderCart;
window.updateQuantity = updateQuantity;
window.removeItem = removeItem;
window.clearCart = clearCart;
window.checkout = checkout;

// Initial render
document.addEventListener('DOMContentLoaded', renderCart);
