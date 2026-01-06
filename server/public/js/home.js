const drawer = document.getElementById("drawer");
const overlay = document.getElementById("overlay");
const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");

function openDrawer() {
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    overlay.hidden = false;
    menuBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("no-scroll");
    }

    function closeDrawer() {
        drawer.classList.remove("open");
        drawer.setAttribute("aria-hidden", "true");
        overlay.hidden = true;
        menuBtn.setAttribute("aria-expanded", "false");
        document.body.classList.remove("no-scroll");
    }

    menuBtn.addEventListener("click", openDrawer);
    closeBtn.addEventListener("click", closeDrawer);
    overlay.addEventListener("click", closeDrawer);
    window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
});

document.getElementById("logoutForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const res = await fetch("api/auth/logout", { method: "POST" });
        if (res.ok) window.location.href = "/login";
        else alert("Logout failed");
    } catch {
        alert("Logout failed");
    }
});