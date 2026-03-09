/**
 * Expert E-Commerce Pagination Logic
 * Purely handles pagination state and button generation
 */

export class Pagination {
    constructor(containerId, itemsPerPage, onPageChange) {
        this.container = document.getElementById(containerId);
        this.itemsPerPage = itemsPerPage;
        this.onPageChange = onPageChange;
        this.currentPage = 1;
        this.totalItems = 0;
    }

    setTotalItems(total) {
        this.totalItems = total;
        this.render();
    }

    setCurrentPage(page) {
        this.currentPage = page;
        this.render();
    }

    getPaginatedItems(items) {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return items.slice(start, end);
    }

    render() {
        if (!this.container) return;
        this.container.innerHTML = '';
        
        const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        if (totalPages <= 1) return;

        // Prev Button
        this.container.appendChild(this.createButton('<i class="fa-solid fa-chevron-left"></i>', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.onPageChange(this.currentPage);
                this.render();
            }
        }, this.currentPage === 1));

        // Page Numbers
        for (let i = 1; i <= totalPages; i++) {
            this.container.appendChild(this.createButton(i, () => {
                this.currentPage = i;
                this.onPageChange(this.currentPage);
                this.render();
            }, false, this.currentPage === i));
        }

        // Next Button
        this.container.appendChild(this.createButton('<i class="fa-solid fa-chevron-right"></i>', () => {
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.onPageChange(this.currentPage);
                this.render();
            }
        }, this.currentPage === totalPages));
    }

    createButton(content, onClick, isDisabled, isActive = false) {
        const btn = document.createElement('div');
        btn.className = `pagination-btn ${isDisabled ? 'disabled' : ''} ${isActive ? 'active' : ''}`;
        btn.innerHTML = content;
        if (!isDisabled) {
            btn.onclick = onClick;
        }
        return btn;
    }
}
