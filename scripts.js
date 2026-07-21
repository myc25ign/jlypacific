document.addEventListener("DOMContentLoaded", function() {
    // スムーススクロール
    const links = document.querySelectorAll("nav a, .cta");

    for (const link of links) {
        link.addEventListener("click", smoothScroll);
    }

    function smoothScroll(event) {
        event.preventDefault();
        const targetId = this.getAttribute("href");
        const targetPosition = document.querySelector(targetId).offsetTop;
        window.scrollTo({
            top: targetPosition - 50,
            behavior: "smooth"
        });
    }

    // フォームバリデーション
    const form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        const name = form.elements["name"].value;
        const email = form.elements["email"].value;
        const message = form.elements["message"].value;
        
        if (!name || !email || !message) {
            event.preventDefault();
            alert("全てのフィールドを埋めてください。");
        }
    });
});
