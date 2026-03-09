// Fetching Products from Fake Store API with .then syntax
fetch('https://fakestoreapi.com/products?limit=6')
    .then(res => res.json())
    .then(products => {
        const grid = document.getElementById('product-grid');
        if (!grid) return;
        grid.innerHTML = ''; // Clear loading state

        products.forEach(product => {
            const isAvailable = product.rating.count > 150;
            const statusTheme = isAvailable ? "text-green-600 bg-green-500" : "text-red-500 bg-red-500";
            const statusLabel = isAvailable ? "Stock In" : "Stock Out";

            const productData = JSON.stringify(product).replace(/'/g, "&apos;");
            
            const card = document.createElement('div');
            card.className = "group bg-white rounded-xl border border-gray-100 shadow-[10px_20px_40px_-15px_rgba(0,0,0,0.2)] hover:shadow-[10px_45px_100px_-20px_rgba(0,0,0,0.2)] transition-all duration-700 flex flex-col h-[430px] overflow-hidden";
            card.innerHTML = `
                <div class="relative bg-gray-300/50 rounded-xl m-2 p-5 h-64 shrink-0 flex items-center justify-center overflow-hidden">
                    <div class="absolute top-4 left-4 flex items-center gap-2 z-10 bg-white/60 backdrop-blur-xl px-2 py-1 rounded-full border border-white/20">
                         <span class="flex h-1.5 w-1.5 relative">
                            <span class="animate-bounce absolute inline-flex h-full w-full rounded-full ${statusTheme} opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-1.5 w-1.5 ${statusTheme}"></span>
                         </span>
                         <span class="text-[8px] font-black uppercase tracking-[0.2em] text-gray-500">${statusLabel}</span>
                    </div>
                    <div class="absolute top-4 right-4 bg-white/60 backdrop-blur-xl border border-white/20 px-2.5 py-1.5 rounded-full flex items-center gap-1 shadow-sm z-10">
                        <i class="fa-solid fa-star text-highlight text-[8px]"></i>
                        <span class="text-[9px] font-black text-gray-900">${product.rating.rate}</span>
                    </div>
                    <img src="${product.image}" class="max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-1000 cubic-bezier(0.16, 1, 0.3, 1)">
                    <div class="absolute inset-x-4 bottom-4 transform translate-y-24 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16, 1, 0.3, 1)]">
                        <button onclick='addToCart(${productData})' class="w-full bg-primary text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-[9px] shadow-2xl hover:bg-highlight active:scale-95 transition-all">
                            Add to Bag
                        </button>
                    </div>
                </div>
                <div class="px-5 py-3 space-y-0 flex flex-col justify-between">
                    <div class="space-y-3">
                        <div class="space-y-0">
                            <p class="text-[8px] font-black text-highlight uppercase tracking-[0.3em]">${product.category}</p>
                            <h3 class="text-lg font-bold text-gray-900 truncate group-hover:text-primary transition-colors tracking-tight leading-tight">${product.title}</h3>
                        </div>
                        <p class="text-[10px] text-gray-400 line-clamp-2 font-medium">Refined for the modern era. Curated with precision for high-end lifestyle performance.</p>
                    </div>
                    <div class="flex items-center justify-between border-t border-gray-50 pt-3 pb-2">
                        <div class="flex flex-col">
                            <span class="text-[7px] font-bold text-gray-300 uppercase tracking-widest">Metadata Price</span>
                            <span class="text-xl font-black text-primary tracking-tighter">$${Math.floor(product.price)}.00</span>
                        </div>
                        <div class="h-9 w-9 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                            <i class="fa-solid fa-arrow-right text-[9px]"></i>
                        </div>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    })
    .catch(err => {
        console.error('Error fetching products:', err);
        const grid = document.getElementById('product-grid');
        if (grid) grid.innerHTML = '<p class="col-span-full text-center text-red-400">Failed to load products. Please try again later.</p>';
    });
