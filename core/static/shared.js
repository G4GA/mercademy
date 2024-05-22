var log_in_b = document.getElementById("login-bttn")
if (log_in_b) {
    log_in_b.addEventListener('click', (event) => {
        window.location.href = '/login'
    })
}