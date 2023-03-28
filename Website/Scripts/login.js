function validateForm(event) {
    let msg = document.querySelector('#errorMessage');
    let toast = document.querySelector("#toast");
    let username = document.querySelector('#username').value.trim();
    let password = document.querySelector('#password').value.trim();
    let message = [];
    message = validateUsername(username, message);
    message = validatePassword(password, message);

    if(message.length>0){
        event.preventDefault();
        msg.innerHTML = message.join(" and ") + '.';
        toast.style.display = "block";
        setTimeout(function() {
            toast.style.display = "none";
        }, 5000);
        
    }else{
        window.open("index.html");
    }
}
function validateUsername(username, message){
    const pattern = "^[a-zA-Z][a-zA-Z0-9_-]{2,22}$";
    if(username.length <= 3){
        message.push("Username should not be less than 3 charcters!");
    }else if(username.length >= 24){
        message.push("Username should not be more than 24 charcters!");
    }else if(!username.match(pattern)){
        message.push("Nameformat is wrong");
    }
    return message;
}
function validatePassword(password, message){
    const pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,24}$";
    if(password.length < 8){
        message.push("Password should not be less than 8 charcters!");
    }else if(password.length > 24){
        message.push("Password should not be more than 24 charcters!");
    }else if(!password.match(pattern)){
        message.push("The password must contain at least one lowercase letter, one uppercase letter, one digit, one special character and have a length between 8 and 24 characters");
    }
    return message;
}