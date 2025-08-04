function userDetailsAreValid(email, password, name, street, city, postal) {
    return (
        email && email.includes('@') &&
        password && password.trim().length > 5 &&
        name && name.trim().length > 0 &&
        street && street.trim().length > 0 &&
        city && city.trim().length > 0 &&
        postal && postal.trim().length > 0
    );
}

function emailIsConfirmed(email, confirmedEmail) {
    return email === confirmedEmail;
}

module.exports = {userDetailsAreValid,emailIsConfirmed}