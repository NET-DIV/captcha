function verifyCaptcha(input) {
    if (!window.titCaptcha) return false;
    return input.toUpperCase().trim() === titCaptcha.value;
}
