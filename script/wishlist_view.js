function renderWishlist() {
  const wishlist = JSON.parse(localStorage.getItem("expert-wishlist")) || [];
  const itemsContainer = document.getElementById("wishlist-items");
  const container = document.getElementById("wishlist-container");
  const emptyState = document.getElementById("empty-wishlist");

  if (!itemsContainer || !container || !emptyState) return;

  if (wishlist.length === 0) {
    container.classList.add("hidden");
    emptyState.classList.remove("hidden");
    return;
  }

  container.classList.remove("hidden");
  emptyState.classList.add("hidden");
  itemsContainer.innerHTML = "";

  wishlist.forEach((item) => {
    const row = document.createElement("div");
    row.className =
      "wishlist-item group grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-gray-400/15 backdrop-blur-xl border-2 border-white p-4 md:p-3 rounded-2xl shadow-[5px_5px_25_5px_rgba(0,0,0,0.15)] transition-all duration-500 relative overflow-hidden";
    
    // Technical sidebar in card
    const sidebar = document.createElement("div");
    sidebar.className = "absolute top-0 left-0 w-1.5 h-full bg-highlight scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500";
    row.appendChild(sidebar);

    const productData = JSON.stringify(item).replace(/'/g, "&apos;");

    row.innerHTML = `
            ${sidebar.outerHTML}
            <!-- Product Preview & Info -->
            <div class="col-span-1 md:col-span-6 flex items-center gap-8">
                <div class="w-32 h-32 bg-gray-500/10 rounded-xl p-4 flex items-center justify-center shrink-0 border border-gray-100 overflow-hidden relative group/img">
                    <img src="${item.image}" class="max-h-full object-contain mix-blend-multiply group-hover/img:scale-110 transition-transform duration-700">
                </div>
                <div class="space-y-2  px-4">
                    <div class="flex items-center gap-3">
                        <span class="text-[9px] font-bold text-highlight uppercase tracking-[0.4em] px-2 py-1 bg-highlight/5 rounded-sm border-l-3 border-orange-400">Archived</span>
                        <span class="text-[9px] font-semibold text-gray-400 uppercase tracking-widest">ID: ${item.id}</span>
                    </div>                   
                    <h3 class="font-bold text-lg tracking-tight uppercase leading-none group-hover:text-primary transition-colors">${item.title}</h3>

                </div>
            </div>

            <!-- Valuation -->
            <div class="col-span-1 md:col-span-2 text-center">
                <div class="flex flex-col">
                    <span class="text-[9px] font-semibold text-gray-400 uppercase tracking-[0.3em] mb-1">Price</span>
                    <span class="text-xl font-bold tracking-tight text-gray-800">$${item.price.toFixed(2)}</span>
                </div>
            </div>

            <!-- Actions -->
            <div class="col-span-1 md:col-span-4 flex items-center justify-end gap-4">
                <button onclick='moveToCart(${productData})' class="flex-grow md:flex-grow-0 px-8 py-4 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-highlight transition-all shadow-xl shadow-black/5 active:scale-95">
                    Add to Bag
                </button>
                <button onclick="removeFromWishlist(${item.id})" class="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all border border-gray-100 group/remove">
                    <i class="fa-solid fa-trash-can text-sm group-hover/remove:scale-110 transition-transform"></i>
                </button>
            </div>
        `;
    itemsContainer.appendChild(row);
  });
}

function removeFromWishlist(id) {
  let wishlist = JSON.parse(localStorage.getItem("expert-wishlist")) || [];
  wishlist = wishlist.filter((i) => i.id !== id);
  localStorage.setItem("expert-wishlist", JSON.stringify(wishlist));
  renderWishlist();
  if (typeof window.updateWishlistCount === "function") {
    window.updateWishlistCount();
  }
}

function moveToCart(product) {
  // Add to cart
  if (typeof window.addToCart === "function") {
    window.addToCart(product);
  }
  // Remove from wishlist
  removeFromWishlist(product.id);
}

function clearWishlist() {
  localStorage.setItem("expert-wishlist", JSON.stringify([]));
  renderWishlist();
  if (typeof window.updateWishlistCount === "function") {
    window.updateWishlistCount();
  }
}

// Attach to window
window.removeFromWishlist = removeFromWishlist;
window.moveToCart = moveToCart;
window.clearWishlist = clearWishlist;

// Initial render with artificial delay for skeleton visibility
document.addEventListener("DOMContentLoaded", () => {
  const wishlist = JSON.parse(localStorage.getItem("expert-wishlist")) || [];
  const itemsContainer = document.getElementById("wishlist-items");

  if (itemsContainer && wishlist.length > 0) {
    // Show matching number of High-Fidelity Row Skeletons
    itemsContainer.innerHTML = wishlist.map(() => `
        <div class="flex flex-col md:flex-row items-center gap-6 bg-gray-200/50 backdrop-blur-xl p-4 md:p-3 rounded-2xl border-2 border-white shadow-sm relative overflow-hidden h-32">
            <!-- Image Skimmer -->
            <div class="w-32 h-24 bg-gray-300/30 rounded-xl shrink-0 overflow-hidden relative">
                <div class="MuiSkeleton-root MuiSkeleton-wave w-full h-full m-0 !bg-gray-300/40"></div>
            </div>
            
            <!-- Content Skimmer -->
            <div class="flex-grow space-y-4 px-4 w-full">
                <div class="space-y-2">
                    <div class="MuiSkeleton-root MuiSkeleton-wave w-24 h-2 rounded-full !bg-gray-300/40"></div>
                    <div class="MuiSkeleton-root MuiSkeleton-wave w-3/4 h-6 rounded-lg !bg-gray-300/40"></div>
                </div>
                
                <div class="flex justify-between items-center">
                    <div class="MuiSkeleton-root MuiSkeleton-wave w-16 h-2 rounded-full !bg-gray-300/40"></div>
                    <div class="flex gap-4">
                         <div class="MuiSkeleton-root MuiSkeleton-wave w-24 h-10 rounded-xl !bg-gray-300/40"></div>
                         <div class="MuiSkeleton-root MuiSkeleton-wave w-10 h-10 rounded-xl !bg-gray-300/40"></div>
                    </div>
                </div>
            </div>
        </div>
    `).join("");
  }

  // We wait 3 seconds before showing actual data
  setTimeout(() => {
    renderWishlist();
  }, 2500);
});
