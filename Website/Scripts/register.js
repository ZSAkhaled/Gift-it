
function validateForm(event) {
    let msg = document.querySelector('#errorMessage');
    let toast = document.querySelector("#toast");
    let username = document.querySelector('#username').value.trim();
    let password = document.querySelector('#password').value.trim();
    let fname = document.querySelector('#fname').value.trim();
    let lname = document.querySelector('#lname').value.trim();
    let email = document.querySelector("#email").value.trim();
    let phoneNumber = document.querySelector("#phoneNumber").value.trim();

    let message = [];
    message = validateName(fname, message, "First name ");
    message = validateName(lname, message, "Last name ");
    message = validateEmail(email, message);
    message = validateUsername(username, message);
    message = validatePassword(password, message);
    message = validatePhoneNumber(phoneNumber, message);

    if(message.length>0){
        event.preventDefault();
        msg.innerHTML = "Errors found[" + message.length + "]: " + message.join(" - ") + '.';
        toast.style.display = "block";
        setTimeout(function() {
            toast.style.display = "none";
        }, message.length * 2000);
        
    }
}
// Username first/last name
function validateName(name, message, type){
    const pattren = "[A-Za-z]{3,20}";
    if(name.length < 3){
        message.push(type + " should not be less than 3 charecters!");
    } else if(name.length > 20){
        message.push(type + " should not be more than 20 charecters!");
    }else if(!name.match(pattren)){
        message.push("Invalid ", type," format");
    }
    return message;
}
// Validate email
function validateEmail(email, message){
    const pattren = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    if(email.length < 4){
        message.push("Email should not be less than 4 charecters!");
    } else if(email.length > 50){
        message.push("Email should not be more than 50 charecters!");
    } else if(!email.match(pattren)){
        message.push("Invalid email address format");
    }
    return message;
}
// Username Validation
function validateUsername(username, message){
    const pattren = "^[a-zA-Z][a-zA-Z0-9_-]{2,22}$";
    if(username.length < 3){
        message.push("Username should not be less than 3 charcters!");
    }else if(username.length > 24){
        message.push("Username should not be more than 24 charcters!");
    }else if(!username.match(pattren)){
        message.push("Username format is wrong");
    }
    return message;
}
// Password Validation
function validatePassword(password, message){
    const pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,24}$";
    if(password.length < 8){
        message.push("Password should not be less than 8 characters!");
    }else if(password.length > 24){
        message.push("Password should not be more than 24 characters!");
    }else if(!password.match(pattern)){
        message.push("The password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character and have a length between 8 and 24 characters");
    }
    return message;
}
// Phone Number Validation
function validatePhoneNumber(number, message){
    const pattren = "^05[0-9]{8}$";
    if(number.length != 10){
        message.push("Phone number must be 10 numbers!");
    }else if(!number.match(pattren));
    return message;
} 