document.getElementById("reload").addEventListener("click", () => {
    titCaptcha.generate();
});

document.getElementById("verify").addEventListener("click", () => {
    const input = document.getElementById("captchaInput").value;
    const result = verifyCaptcha(input);
    alert(result ? "correct" : "incorrect");
});