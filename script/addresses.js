/*
*address list logic
*simple code for web
*/

document.addEventListener("DOMContentLoaded", () => {
    const addressGrid = document.getElementById("address-grid");
    const addAddressBtn = document.getElementById("add-address-btn");
    const addressModal = document.getElementById("address_modal");
    const deleteModal = document.getElementById("delete_modal");
    const saveAddressBtn = document.getElementById("save-address-btn");
    const confirmDeleteBtn = document.getElementById("confirm-delete-btn");

    //box for typing
    const addressIdInput = document.getElementById("address-id");
    const addressTagInput = document.getElementById("address-tag");
    const addressTitleInput = document.getElementById("address-title");
    const addressStreetInput = document.getElementById("address-street");
    const addressCityInput = document.getElementById("address-city");
    const addressPhoneInput = document.getElementById("address-phone");
    const addressDefaultInput = document.getElementById("address-default");
    const modalTitle = document.getElementById("modal-title");

    //starting data
    let addresses = JSON.parse(localStorage.getItem("addresses"));
    
    if (!addresses || addresses.length === 0) {
        addresses = [
            {
                id: 1,
                tag: "Default Hub",
                title: "Primary Residence",
                street: "1224 Panda Archival District\nLevel 01, Tech Sector 7",
                city: "San Francisco, CA 94103",
                phone: "+1 (555) 012-3456",
                isDefault: true
            },
            {
                id: 2,
                tag: "Secondary Node",
                title: "Office Terminal",
                street: "88 High-Speed Terminal Plaza\nUnit 420, Alpha Tower",
                city: "New York, NY 10001",
                phone: "+1 (212) 555-7890",
                isDefault: false
            }
        ];
        localStorage.setItem("addresses", JSON.stringify(addresses));
    }

    let addressToDelete = null;

    const renderAddresses = () => {
        if (!addressGrid) return;
        addressGrid.innerHTML = "";

        //loading cards are in other file so we just show them
        addresses.forEach(addr => {
            const card = document.createElement("div");
            card.className = "technical-card p-10 rounded-4xl space-y-6 relative overflow-hidden group";
            card.innerHTML = `
                <div class="absolute top-6 right-6 flex gap-2">
                     <button data-id="${addr.id}" class="edit-btn w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-primary transition-colors transition-transform group-hover:scale-110"><i class="fa-solid fa-pen text-[10px]"></i></button>
                     <button data-id="${addr.id}" class="delete-btn w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-300 hover:text-rose-500 transition-colors transition-transform group-hover:scale-110"><i class="fa-solid fa-trash text-[10px]"></i></button>
                </div>
                
                <div class="space-y-1">
                    <span class="text-[9px] font-black ${addr.isDefault ? 'text-highlight bg-highlight/5 border-highlight/10' : 'text-gray-400 bg-gray-50 border-gray-100'} uppercase tracking-[0.3em] px-3 py-1 rounded-full inline-block mb-2 border">
                        ${addr.tag}
                    </span>
                    <h3 class="text-xl font-black uppercase tracking-tighter">${addr.title}</h3>
                </div>
                
                <div class="space-y-4 pt-4 border-t border-gray-50">
                    <div class="flex items-start gap-4">
                        <i class="fa-solid ${addr.tag.toLowerCase().includes('office') ? 'fa-building' : 'fa-location-dot'} text-primary mt-1 text-xs"></i>
                        <p class="text-[11px] font-bold text-gray-400 uppercase leading-relaxed tracking-wider">
                            ${addr.street.replace(/\n/g, '<br>')}<br>
                            ${addr.city}
                        </p>
                    </div>
                    <div class="flex items-center gap-4">
                        <i class="fa-solid fa-phone text-primary text-xs"></i>
                        <p class="text-[11px] font-bold text-gray-400 uppercase tracking-widest">${addr.phone}</p>
                    </div>
                </div>
            `;
            addressGrid.appendChild(card);
        });

        //make buttons work again
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => editAddress(parseInt(btn.dataset.id)));
        });
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => prepareDelete(parseInt(btn.dataset.id)));
        });
    };

    const editAddress = (id) => {
        const addr = addresses.find(a => a.id === id);
        if (!addr) return;

        modalTitle.textContent = "Adjust Logistical Node";
        addressIdInput.value = addr.id;
        addressTagInput.value = addr.tag;
        addressTitleInput.value = addr.title;
        addressStreetInput.value = addr.street;
        addressCityInput.value = addr.city;
        addressPhoneInput.value = addr.phone;
        addressDefaultInput.checked = addr.isDefault;

        addressModal.showModal();
    };

    const prepareDelete = (id) => {
        addressToDelete = id;
        deleteModal.showModal();
    };

    if (addAddressBtn) {
        addAddressBtn.addEventListener("click", () => {
            modalTitle.textContent = "Deploy New Address";
            addressIdInput.value = "";
            addressTagInput.value = "";
            addressTitleInput.value = "";
            addressStreetInput.value = "";
            addressCityInput.value = "";
            addressPhoneInput.value = "";
            addressDefaultInput.checked = false;
            addressModal.showModal();
        });
    }

    if (saveAddressBtn) {
        saveAddressBtn.addEventListener("click", () => {
            const id = addressIdInput.value;
            const newAddr = {
                id: id ? parseInt(id) : Date.now(),
                tag: addressTagInput.value || "External Node",
                title: addressTitleInput.value || "Unnamed Location",
                street: addressStreetInput.value || "Undisclosed District",
                city: addressCityInput.value || "Zone-0",
                phone: addressPhoneInput.value || "No Protocol Phone",
                isDefault: addressDefaultInput.checked
            };

            if (newAddr.isDefault) {
                addresses.forEach(a => a.isDefault = false);
            }

            if (id) {
                const index = addresses.findIndex(a => a.id === parseInt(id));
                addresses[index] = newAddr;
            } else {
                addresses.push(newAddr);
            }

            localStorage.setItem("addresses", JSON.stringify(addresses));
            renderAddresses();
            addressModal.close();
        });
    }

    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener("click", () => {
            if (addressToDelete) {
                addresses = addresses.filter(a => a.id !== addressToDelete);
                localStorage.setItem("addresses", JSON.stringify(addresses));
                renderAddresses();
                addressToDelete = null;
                deleteModal.close();
            }
        });
    }

    renderAddresses();
});
