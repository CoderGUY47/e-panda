// function to open the search modal
window.openSearchModal = function() {
    const modal = document.getElementById('global-search-modal');
    if (modal) {
        modal.showModal();
        const input = document.getElementById('modal-search-input');
        if (input) input.focus();
    }
};

// function to handle global search
async function initGlobalSearch() {
    // inject modal html if not exists
    if (!document.getElementById('global-search-modal')) {
        const modalHtml = `
            <dialog id="global-search-modal" class="modal modal-top">
                <div class="modal-box bg-white/95 backdrop-blur-2xl rounded-b-[2rem] p-0 overflow-hidden shadow-2xl max-w-none w-full">
                    <div class="p-6 border-b border-gray-100 flex items-center gap-4">
                        <i class="fa-solid fa-magnifying-glass text-gray-400"></i>
                        <input type="text" id="modal-search-input" placeholder="Search the archive..." 
                            class="flex-grow bg-transparent text-lg font-medium outline-none placeholder:text-gray-300">
                        <form method="dialog">
                            <button class="text-gray-400 hover:text-primary transition-colors uppercase text-[10px] font-black tracking-widest">Close</button>
                        </form>
                    </div>
                    <div id="search-results-container" class="max-h-[70vh] overflow-y-auto p-0">
                        <!-- results will appear here -->
                    </div>
                </div>
                <form method="dialog" class="modal-backdrop bg-black/40 backdrop-blur-sm">
                    <button>close</button>
                </form>
            </dialog>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    const searchInput = document.getElementById('modal-search-input');
    const resultsContainer = document.getElementById('search-results-container');

    if (searchInput) {
        let products = [];
        try {
            const res = await fetch('https://fakestoreapi.com/products');
            products = await res.json();
            console.log('Search metadata loaded');
        } catch (e) {
            console.error("Search fetch failed", e);
        }

        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            if (term.length < 2) {
                resultsContainer.innerHTML = '';
                return;
            }

            const filtered = products.filter(p => 
                p.title.toLowerCase().includes(term) || 
                p.category.toLowerCase().includes(term)
            );

            resultsContainer.innerHTML = filtered.map(p => `
                <div class="px-8 py-6 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer group" onclick="window.location.href='explore.html?id=${p.id}'">
                    <div class="flex flex-col gap-1">
                        <h4 class="text-primary font-bold text-sm uppercase tracking-tight group-hover:text-highlight transition-colors">${p.title}</h4>
                        <p class="text-[10px] text-gray-400 font-medium uppercase tracking-widest">${p.category}</p>
                        <p class="text-xs font-black text-gray-600 mt-2">$${p.price}</p>
                    </div>
                </div>
            `).join('');

            if (filtered.length === 0) {
                resultsContainer.innerHTML = '<div class="p-20 text-center text-gray-300 uppercase text-[10px] font-black tracking-[0.3em]">No archive entries found</div>';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', initGlobalSearch);
