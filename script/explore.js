import { Pagination } from "./pagination.js";
import { addToCart } from "./cart.js";

let products = [];
let filteredProducts = [];
const perPage = 9;
const grid = document.getElementById("product-grid");
const paginationElement = document.getElementById("pagination");

if (grid && paginationElement) {
  const pagination = new Pagination("pagination", perPage, (page) => {
    renderProducts(page, pagination);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  let currentCategory = "all";
  let currentStatus = "all";

  // Initialize
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      products = data.map((p) => ({
        ...p,
        status: p.rating.count > 150 ? "open" : "closed", // Simulating stock status
      }));

      // 1. Immediately show 9 High-Fidelity Skeletons (1 page worth)
      if (grid) {
        grid.innerHTML = Array(perPage).fill(0).map(() => `
            <div class="group bg-white rounded-[2rem] border border-gray-100 p-5 flex flex-col h-[430px] overflow-hidden opacity-70 animate-pulse relative">
                <!-- Segment A: Visual Preview -->
                <div class="relative bg-gray-100 rounded-[1.5rem] m-0 mb-4 h-64 shrink-0 overflow-hidden">
                    <div class="MuiSkeleton-root MuiSkeleton-wave w-full h-full"></div>
                </div>
                
                <!-- Segment B: Technical Content (Split into 2 Divisions) -->
                <div class="flex-grow flex flex-col justify-between px-2">
                    <!-- Division 1: Intel -->
                    <div class="space-y-3">
                        <div class="MuiSkeleton-root MuiSkeleton-wave w-1/4 h-2 rounded-full"></div>
                        <div class="MuiSkeleton-root MuiSkeleton-wave w-5/6 h-6 rounded-lg"></div>
                        <div class="MuiSkeleton-root MuiSkeleton-wave w-full h-2 rounded-full"></div>
                    </div>
                    
                    <!-- Division 2: Settlement -->
                    <div class="pt-4 border-t border-gray-50 flex justify-between items-end pb-2">
                        <div class="space-y-1">
                            <div class="MuiSkeleton-root MuiSkeleton-wave w-10 h-1.5 rounded-full"></div>
                            <div class="MuiSkeleton-root MuiSkeleton-wave w-24 h-8 rounded-lg"></div>
                        </div>
                        <div class="MuiSkeleton-root MuiSkeleton-wave w-10 h-10 rounded-full"></div>
                    </div>
                </div>
            </div>
        `).join('');
      }
      
      // 2. Artificially delay update to show off the premium skeleton loaders
      setTimeout(() => {
        updateView(pagination);

        // Check URL params
        const urlParams = new URLSearchParams(window.location.search);
        const cat = urlParams.get("cat");
        if (cat) {
          const mapped = {
            men: "men's clothing",
            women: "women's clothing",
            jewelery: "jewelery",
            electronics: "electronics",
          };
          if (mapped[cat]) {
            currentCategory = mapped[cat];
            updateView(pagination);
          }
        }
      }, 3000); // 3 second synchronization window
    });

  function updateView(paginationInstance) {
    // 1. Immediately show Skeletons when starting a filter change
    if (grid) {
      grid.innerHTML = Array(perPage).fill(0).map(() => `
          <div class="group bg-white rounded-[2rem] border border-gray-100 p-5 flex flex-col h-[430px] overflow-hidden opacity-70 animate-pulse relative">
              <!-- Segment A: Visual Preview -->
              <div class="relative bg-gray-100 rounded-[1.5rem] m-0 mb-4 h-64 shrink-0 overflow-hidden">
                  <div class="MuiSkeleton-root MuiSkeleton-wave w-full h-full"></div>
              </div>
              
              <!-- Segment B: Technical Content (Split into 2 Divisions) -->
              <div class="flex-grow flex flex-col justify-between px-2">
                  <!-- Division 1: Intel -->
                  <div class="space-y-3">
                      <div class="MuiSkeleton-root MuiSkeleton-wave w-1/4 h-2 rounded-full"></div>
                      <div class="MuiSkeleton-root MuiSkeleton-wave w-5/6 h-6 rounded-lg"></div>
                      <div class="MuiSkeleton-root MuiSkeleton-wave w-full h-2 rounded-full"></div>
                  </div>
                  
                  <!-- Division 2: Settlement -->
                  <div class="pt-4 border-t border-gray-50 flex justify-between items-end pb-2">
                      <div class="space-y-1">
                          <div class="MuiSkeleton-root MuiSkeleton-wave w-10 h-1.5 rounded-full"></div>
                          <div class="MuiSkeleton-root MuiSkeleton-wave w-24 h-8 rounded-lg"></div>
                      </div>
                      <div class="MuiSkeleton-root MuiSkeleton-wave w-10 h-10 rounded-full"></div>
                  </div>
              </div>
          </div>
      `).join('');
    }

    // 2. Wait 5s before performing the actual view update
    setTimeout(() => {
        filteredProducts = products.filter((p) => {
          const catMatch =
            currentCategory === "all" || p.category === currentCategory;
          const statusMatch = currentStatus === "all" || p.status === currentStatus;
          return catMatch && statusMatch;
        });
    
        paginationInstance.setCurrentPage(1);
        paginationInstance.setTotalItems(filteredProducts.length);
        renderProducts(1, paginationInstance);
        updateButtonStyles(currentCategory, currentStatus);
    }, 2500);
  }

  function updateButtonStyles(cat, status) {
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      const dot = btn.querySelector("span");
      if (btn.dataset.filter === cat) {
        btn.classList.add("text-gray-900");
        btn.classList.remove("text-gray-500");
        if (dot) {
          dot.classList.remove("opacity-0", "scale-0");
          dot.classList.add("opacity-100", "scale-100");
        }
      } else {
        btn.classList.remove("text-gray-900");
        btn.classList.add("text-gray-500");
        if (dot) {
          dot.classList.add("opacity-0", "scale-0");
          dot.classList.remove("opacity-100", "scale-100");
        }
      }
    });

    const statusLabelMap = {
      all: "All Stocks",
      open: "Available",
      closed: "Out of Stock",
    };

    const activeStatusLabel = document.getElementById("active-status-label");
    if (activeStatusLabel) {
      activeStatusLabel.innerText = statusLabelMap[status] || "All Stocks";
    }

    document.querySelectorAll(".status-btn").forEach((btn) => {
      if (btn.dataset.status === status) {
        btn.classList.add("text-gray-900", "bg-gray-50");
        btn.classList.remove("text-gray-500");
      } else {
        btn.classList.remove("text-gray-900", "bg-gray-50");
        btn.classList.add("text-gray-500");
      }
    });
  }

  function renderProducts(page, paginationInstance) {
    grid.innerHTML = "";
    const items = paginationInstance.getPaginatedItems(filteredProducts);

    if (items.length === 0) {
      grid.innerHTML =
        '<div class="col-span-full py-20 text-center text-gray-300 font-black uppercase text-[10px] tracking-widest">No Matches Found</div>';
      return;
    }

    items.forEach((product) => {
      const isAvailable = product.status === "open";
      const statusTheme = isAvailable
        ? "text-green-600 bg-green-500"
        : "text-red-500 bg-red-500";
      const statusLabel = isAvailable ? "Stock In" : "Stock Out";

      const card = document.createElement("div");
      card.className =
        "group bg-white rounded-[2rem] border border-gray-100 shadow-[10px_20px_40px_-15px_rgba(0,0,0,0.2)] hover:shadow-[10px_45px_100px_-20px_rgba(0,0,0,0.2)] transition-all duration-700 flex flex-col h-[430px] overflow-hidden";
      card.innerHTML = `
                <!-- Visual Segment -->
                <div class="relative bg-gray-300/50 rounded-xl m-2 p-5 h-64 shrink-0 flex items-center justify-center overflow-hidden">
                    <div class="absolute top-4 left-4 z-10 bg-white/60 backdrop-blur-xl px-2 py-1 rounded-full border border-white/20">
                         <div class="flex items-center gap-2">
                             <span class="flex h-1.5 w-1.5 relative">
                                <span class="animate-bounce absolute inline-flex h-full w-full rounded-full ${statusTheme} opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-1.5 w-1.5 ${statusTheme}"></span>
                             </span>
                             <span class="text-[8px] font-black uppercase tracking-[0.2em] text-gray-500">${statusLabel}</span>
                         </div>
                    </div>
                    <div class="absolute top-4 right-4 flex flex-col gap-2 z-10">
                        <div class="bg-white/90 backdrop-blur-xl border border-white/20 px-2.5 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                            <i class="fa-solid fa-star text-highlight text-[8px]"></i>
                            <span class="text-[9px] font-black text-gray-900">${product.rating.rate}</span>
                        </div>
                        <button id="wish-${product.id}" class="w-8 h-8 bg-white/95 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)] group/heart active:scale-95">
                            <i class="fa-regular fa-heart text-[10px] group-hover/heart:scale-125 transition-transform"></i>
                        </button>
                    </div>
                    <img src="${product.image}" class="max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-1000 cubic-bezier(0.16, 1, 0.3, 1)">
                    <div class="absolute inset-x-4 bottom-4 transform translate-y-0 md:translate-y-24 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16, 1, 0.3, 1)]">
                        <button id="add-${product.id}" class="w-full bg-primary text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-bold uppercase tracking-widest text-[8px] md:text-[9px] shadow-2xl hover:bg-highlight active:scale-95 transition-all">
                            Add to Cart
                        </button>
                    </div>
                </div>

                <!-- Content Segment -->
                <div class="flex-grow flex flex-col justify-between px-6 py-4">
                    <!-- Division 1: Product Intel -->
                    <div class="space-y-1">
                        <p class="text-[8px] font-black text-highlight uppercase tracking-[0.3em]">${product.category}</p>
                        <h3 class="text-lg font-bold text-gray-900 truncate group-hover:text-primary transition-colors tracking-tight leading-tight">${product.title}</h3>
                        <p class="text-[10px] text-gray-400 line-clamp-2 font-medium pt-2">Refined for the modern era. Curated with precision for high-end lifestyle performance.</p>
                    </div>

                    <!-- Division 2: Settlement & Value -->
                    <div class="flex items-center justify-between border-t border-gray-100 pt-3">
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

      card.querySelector(`#add-${product.id}`).onclick = (e) => {
        e.stopPropagation();
        addToCart(product);
      };

      card.querySelector(`#wish-${product.id}`).onclick = (e) => {
        e.stopPropagation();
        window.addToWishlist(product);
      };
    });
  }

  // Filter Actions
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.onclick = () => {
      currentCategory = btn.dataset.filter;
      updateView(pagination);
    };
  });

  document.querySelectorAll(".status-btn").forEach((btn) => {
    btn.onclick = () => {
      currentStatus = btn.dataset.status;
      updateView(pagination);
    };
  });
}
