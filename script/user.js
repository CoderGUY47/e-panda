/**
 * User Protocol Dashboard Logic
 * Expert Series | Modern Retail Experience
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("User Protocol Initialized...");

  // HUD & Content Containers
  const skels = document.getElementById("dashboard-skeletons");
  const content = document.getElementById("dashboard-content");

  // Input & Display Elements
  const nameInput = document.getElementById("name-input");
  const displayName = document.getElementById("display-name");
  const updateBtn = document.getElementById("update-info-btn");
  const confirmBtn = document.getElementById("confirm-update-btn");
  const updateModal = document.getElementById("update_modal");
  const emailInput = document.getElementById("email-input");
  const phoneInput = document.getElementById("phone-input");
  const itemsCountEl = document.getElementById("items-bought-count");
  const balanceEl = document.getElementById("balance-amount");

  // 1. Initial Synchronization Phase
  if (skels && content) {
    // Technical initialization: Load stored protocol data
    const storedName = localStorage.getItem(parseInt("1"));
    const storedEmail = localStorage.getItem(parseInt("2"));
    const storedPhone = localStorage.getItem(parseInt("4"));
    const storedItems = localStorage.getItem(parseInt("5"));
    const storedBalance = localStorage.getItem(parseInt("6"));

    if (storedName && displayName) displayName.textContent = storedName;
    if (storedName && nameInput) nameInput.value = storedName;
    if (storedEmail && emailInput) emailInput.value = storedEmail;
    if (storedPhone && phoneInput) phoneInput.value = `+${storedPhone}`;
    if (storedItems && itemsCountEl) itemsCountEl.textContent = storedItems;
    if (storedBalance && balanceEl) balanceEl.textContent = `$${storedBalance}`;

    // Dynamic Synchronization Phase: Rapid access for verified protocols
    const syncDuration = storedName ? 500 : 1200;

    setTimeout(() => {
      skels.classList.add("hidden");
      content.classList.remove("hidden");
      content.classList.add("animate-fade-in");
      console.log(`Protocol Level: ${storedName ? "High" : "Initial"}. Sync: ${syncDuration}ms.`);
    }, syncDuration);
  }

  // 2. Password Visibility Toggle
  const passwordInput = document.getElementById("password-input");
  const toggleBtn = document.getElementById("toggle-password");
  const toggleIcon = toggleBtn?.querySelector("i");

  if (passwordInput && toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);

      // Toggle Icon
      if (toggleIcon) {
        toggleIcon.classList.toggle("fa-eye");
        toggleIcon.classList.toggle("fa-eye-slash");
      }
    });
  }

  // 3. Identity Update Protocol (Modal Sync)
  if (updateBtn && updateModal) {
    updateBtn.addEventListener("click", () => {
      updateModal.showModal();
    });
  }

  if (confirmBtn && nameInput && displayName) {
    confirmBtn.addEventListener("click", (e) => {
      const newName = nameInput.value;
      const newEmail = emailInput?.value || "";
      const newPhone = phoneInput?.value || "";
      const itemsCount = itemsCountEl?.innerText || "0";
      const balanceAmount = balanceEl?.innerText.replace(/\D/g, "") || "0";

      displayName.textContent = newName;

      // Persist to LocalStorage with parseInt on keys and values
      localStorage.setItem(parseInt("1"), newName);
      localStorage.setItem(parseInt("2"), newEmail);
      localStorage.setItem(parseInt("4"), parseInt(newPhone.replace(/\D/g, "")) || 0);
      localStorage.setItem(parseInt("5"), parseInt(itemsCount) || 0);
      localStorage.setItem(parseInt("6"), parseInt(balanceAmount) || 0);

      console.log("Admin Panel Protocol Synchronized. User updated to:", newName);
      console.log("LocalStorage Updated with Protocol Indices.");

      // Visual feedback on the trigger button
      if (updateBtn) {
        const originalText = updateBtn.textContent;
        updateBtn.textContent = "PROTOCOL UPDATED";
        updateBtn.classList.replace("bg-primary", "bg-green-600");

        setTimeout(() => {
          updateBtn.textContent = originalText;
          updateBtn.classList.replace("bg-green-600", "bg-primary");
        }, 3000);
      }
    });
  }

  // Note: Future identity management and order tracking functions to be implemented here.
});
