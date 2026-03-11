const bannerData = [
    {
        id: 1,
        category: "ELECTRONICS",
        title: "Next-Gen Audio Experience",
        discount: "30% OFF",
        image: "./assets/banner_electronics.png",
        gridClass: "md:col-span-2 md:row-span-2 h-[500px] md:h-[624px]",
        color: "bg-primary"
    },
    {
        id: 2,
        category: "WATCHES",
        title: "Timeless Precision",
        discount: "15% OFF",
        image: "./assets/banner_watches.png",
        gridClass: "md:col-span-2 md:row-span-1 h-[250px] md:h-[300px]",
        color: "bg-gray-100"
    },
    {
        id: 3,
        category: "ACCESSORIES",
        title: "Modern Essentials",
        discount: "20% OFF",
        image: "./assets/banner_accessories.png",
        gridClass: "md:col-span-1 md:row-span-1 h-[250px] md:h-[300px]",
        color: "bg-gray-200"
    },
    {
        id: 4,
        category: "GADGETS",
        title: "Smart Future",
        discount: "10% OFF",
        image: "./assets/banner_gadgets.png",
        gridClass: "md:col-span-1 md:row-span-1 h-[250px] md:h-[300px]",
        color: "bg-gray-300"
    }
];

function renderBanner() {
    const container = document.getElementById('banner-grid');
    if (!container) return;

    container.innerHTML = bannerData.map(item => `
        <div class="group relative overflow-hidden rounded-[2.5rem] ${item.gridClass} cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
            <img src="${item.image}" alt="${item.title}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            <div class="relative h-full flex flex-col justify-between p-4 md:p-6 z-20">
                <div class="flex justify-between items-start">
                    <span class="bg-white/10 backdrop-blur-lg border border-white/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white">
                        ${item.category}
                    </span>
                    <span class="bg-amber-500/70 backdrop-blur-xl border border-amber-500 px-4 py-2 rounded-xl flex items-center justify-center">
                        <tt class="text-[8px] font-black text-white uppercase tracking-[0.4em] leading-none">
                            ${item.discount}
                        </tt>
                    </span>
                </div>
                
                <div class="space-y-4">
                    <h3 class="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none max-w-[250px]">
                        ${item.title}
                    </h3>
                    <div class="flex items-center gap-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        <span class="text-[10px] font-black text-highlight uppercase tracking-[0.3em]">Redeem Offer</span>
                        <div class="w-8 h-[1px] bg-highlight"></div>
                        <i class="fa-solid fa-arrow-right text-highlight text-xs"></i>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', renderBanner);
