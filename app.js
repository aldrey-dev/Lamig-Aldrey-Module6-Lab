function isValidStudentNumber(value) {
    if (typeof value !== 'string') return false;
    const trimmed = value.trim();
    return /^\d{2}-\d{4}-\d{3}$/.test(trimmed);
}

function isValidPassword(value) {
    if (typeof value !== 'string') return false;
    if (value.length < 8) return false;
    if (/\s/.test(value)) return false;
    if (!/[A-Z]/.test(value)) return false;
    if (!/[0-9]/.test(value)) return false;
    if (!/[@$!]/.test(value)) return false;
    return true;
}

if (typeof module !== 'undefined' && module.exports !== 'undefined') {
    module.exports = { isValidStudentNumber, isValidPassword };
}

if (typeof document !== 'undefined') {
    const form = document.getElementById('registrationForm');
    const fullName = document.getElementById('fullName');
    const studentNumber = document.getElementById('studentNumber');
    const email = document.getElementById('email');
    const mobileNumber = document.getElementById('mobileNumber');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const course = document.getElementById('course');
    const terms = document.getElementById('terms');

    const fullNameError = document.getElementById('fullNameError');
    const studentNumberError = document.getElementById('studentNumberError');
    const emailError = document.getElementById('emailError');
    const mobileNumberError = document.getElementById('mobileNumberError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const courseError = document.getElementById('courseError');
    const termsError = document.getElementById('termsError');

    const passwordFeedback = document.getElementById('passwordFeedback');
    const successMessage = document.getElementById('successMessage');
    const registrationSummary = document.getElementById('registrationSummary');
    const summaryName = document.getElementById('summaryName');
    const summaryStudentNumber = document.getElementById('summaryStudentNumber');
    const summaryEmail = document.getElementById('summaryEmail');
    const summaryMobileNumber = document.getElementById('summaryMobileNumber');
    const summaryCourse = document.getElementById('summaryCourse');

    function setError(el, errorEl, message) {
        errorEl.textContent = message;
        el.setAttribute('aria-invalid', message ? 'true' : 'false');
    }

    function clearAllErrors() {
        [fullNameError, studentNumberError, emailError, mobileNumberError,
         passwordError, confirmPasswordError, courseError, termsError].forEach(el => {
            el.textContent = '';
        });
        passwordFeedback.textContent = '';
        successMessage.textContent = '';
        successMessage.style.display = 'none';
        registrationSummary.hidden = true;
        [fullName, studentNumber, email, mobileNumber,
         password, confirmPassword, course].forEach(el => {
            el.setAttribute('aria-invalid', 'false');
        });
    }

    function validateFullName() {
        const val = fullName.value.trim();
        if (!val || val.length < 2) {
            setError(fullName, fullNameError, 'Full name must be at least 2 characters.');
            return false;
        }
        setError(fullName, fullNameError, '');
        return true;
    }

    function validateStudentNumber() {
        if (!isValidStudentNumber(studentNumber.value)) {
            setError(studentNumber, studentNumberError, 'Enter a student number in the format 24-1234-123.');
            return false;
        }
        setError(studentNumber, studentNumberError, '');
        return true;
    }

    function validateEmail() {
        const val = email.value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
            setError(email, emailError, 'Enter a valid email address.');
            return false;
        }
        setError(email, emailError, '');
        return true;
    }

    function validateMobileNumber() {
        const val = mobileNumber.value.trim();
        if (!/^(09\d{9}|\+639\d{9})$/.test(val)) {
            setError(mobileNumber, mobileNumberError, 'Enter 09 followed by 9 digits or +639 followed by 9 digits.');
            return false;
        }
        setError(mobileNumber, mobileNumberError, '');
        return true;
    }

    function validatePassword() {
        if (!isValidPassword(password.value)) {
            setError(password, passwordError, '');
            return false;
        }
        setError(password, passwordError, '');
        return true;
    }

    function validateConfirmPassword() {
        if (confirmPassword.value !== password.value) {
            setError(confirmPassword, confirmPasswordError, 'Passwords do not match.');
            return false;
        }
        setError(confirmPassword, confirmPasswordError, '');
        return true;
    }

    function validateCourse() {
        if (course.value !== 'BSIT' && course.value !== 'BSCS') {
            setError(course, courseError, 'Select a course.');
            return false;
        }
        setError(course, courseError, '');
        return true;
    }

    function validateTerms() {
        if (!terms.checked) {
            setError(terms, termsError, 'You must agree to the terms.');
            return false;
        }
        setError(terms, termsError, '');
        return true;
    }

    password.addEventListener('input', () => {
        const v = password.value;
        const checks = [];
        if (v.length < 8) checks.push('At least 8 characters');
        if (!/[A-Z]/.test(v)) checks.push('One uppercase letter');
        if (!/[0-9]/.test(v)) checks.push('One digit');
        if (!/[@$!]/.test(v)) checks.push('One of @ $ !');
        if (/\s/.test(v)) checks.push('No whitespace allowed');

        if (checks.length === 0) {
            passwordFeedback.textContent = '✅ Password meets all requirements.';
            passwordFeedback.style.color = '#27ae60';
        } else {
            passwordFeedback.textContent = '⚠️ ' + checks.join(' | ');
            passwordFeedback.style.color = '#e74c3c';
        }
    });

    fullName.addEventListener('blur', validateFullName);
    course.addEventListener('change', validateCourse);
    terms.addEventListener('change', validateTerms);

    form.addEventListener('submit', e => {
        e.preventDefault();

        const f1 = validateFullName();
        const f2 = validateStudentNumber();
        const f3 = validateEmail();
        const f4 = validateMobileNumber();
        const f5 = validatePassword();
        const f6 = validateConfirmPassword();
        const f7 = validateCourse();
        const f8 = validateTerms();

        const allValid = f1 && f2 && f3 && f4 && f5 && f6 && f7 && f8;

        if (!allValid) return;

        successMessage.textContent = 'Registration details validated successfully!';
        successMessage.style.display = 'block';

        summaryName.textContent = fullName.value.trim();
        summaryStudentNumber.textContent = studentNumber.value.trim();
        summaryEmail.textContent = email.value.trim();
        summaryMobileNumber.textContent = mobileNumber.value.trim();
        summaryCourse.textContent = course.value;

        registrationSummary.hidden = false;

        form.reset();
        passwordFeedback.textContent = '';
    });

    form.addEventListener('reset', () => {
        setTimeout(clearAllErrors, 0);
    });
}