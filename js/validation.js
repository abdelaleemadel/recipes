export default class Validation {

    constructor() {
        this.userName = $('#userName');
        this.userEmail = $('#userEmail');
        this.userPhone = $('#userPhone');
        this.userAge = $('#userAge');
        this.userPassword = $('#userPassword');
        this.userRePassword = $('#userRePassword');
    }
    /* Validate the user name */
    validateName() {
        const nameRegex = /[\w]{3,}/;
        if (nameRegex.test(this.userName.val())) {
            this.userName.next().addClass('d-none')
            return true;
        } else {
            this.userName.next().removeClass('d-none');
            return false;
        }
    }
    /* Validate the use Phone */
    validateEmail() {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (emailRegex.test(this.userEmail.val())) {
            this.userEmail.next().addClass('d-none')
            return true;
        } else {
            this.userEmail.next().removeClass('d-none');
            return false;
        }
    }
    /* Validate the user Phone */
    validatePhone() {
        const phoneRegex = /^(01)\d{9}$/;
        if (phoneRegex.test(this.userPhone.val())) {
            this.userPhone.next().addClass('d-none')
            return true;
        } else {
            this.userPhone.next().removeClass('d-none');
            return false;
        }
    }
    /* Validate the user Age */
    validateAge() {
        const ageRegex = /^[1-9][0-9]$/;
        if (ageRegex.test(this.userAge.val())) {
            this.userAge.next().addClass('d-none')
            return true;
        } else {
            this.userAge.next().removeClass('d-none');
            return false;
        }
    }
    /* Validate the user PAssword */
    validatePassword() {
        const passwordRegex = /(?=.*\d)(?=.*[a-zA-z]).{8,}/;
        if (passwordRegex.test(this.userPassword.val())) {
            this.userPassword.next().addClass('d-none')
            return true;
        } else {
            this.userPassword.next().removeClass('d-none');
            return false;
        }
    }
    /* Check the two passwords together */
    validateRePassword() {
        if (this.userPassword.val() == this.userRePassword.val()) {
            this.userRePassword.next().addClass('d-none')
            return true;
        } else {
            this.userRePassword.next().removeClass('d-none');
            return false;
        }
    }

}