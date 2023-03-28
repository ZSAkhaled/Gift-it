const form= document.querySelector("#myform");
const msg= document.querySelector("#msg");


function validateForm(event){
    let messages=[];
    messages = isfilled("#fname",messages,"firstname is missing");
    messages = isFname("#fname",messages,"firstname format is wrong");
    messages = isLname("#lname",messages,"lastname format is wrong");
    messages = isfilled("#lname",messages,"lastname is missing");
    messages = isfilled("#email",messages,"email is missing");
    messages = isEmail("#email",messages,"email format is wrong");
    messages = isfilled("#gender",messages,"gender is missing");
    messages = isfilled("#mobile",messages,"mobile is missing");
    messages = isMobile("#mobile",messages,"mobile format is wrong");
    messages = isfilled("#dob",messages,"date of birth is missing");
    messages = isfilled("#language",messages,"you do not choose Language of Communication");
    messages = isfilled("#textarea",messages,"write a messages");


    if(messages.length>0){
        msg.innerHTML="Issues found{"+ messages.length+"}: "+ messages.join(", ");
        event.preventDefault();
    }else{
        window.open("index.html");
    }
}
function isfilled(selector,messages,msg){
    const element = document.querySelector(selector).value.trim();
    if(element.length <1){
        messages.push(msg);
    }
    return messages;
}
function isFname(selector,messages,msg){
    const element = document.querySelector(selector).value.trim();
    if(!element.match("[a-zA-Z]+") ){
        messages.push(msg);
    }
    return messages;
}
function isLname(selector,messages,msg){
    const element = document.querySelector(selector).value.trim();
    if(!element.match("[a-zA-Z]+") ){
        messages.push(msg);
    }
    return messages;
}

function isEmail(selector,messages,msg){
    const element = document.querySelector(selector).value.trim();
    if(!element.match("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}") ){
        messages.push(msg);
    }
    return messages;
}
function isMobile(selector,messages,msg){
    const element = document.querySelector(selector).value.trim();
    if(!element.match("[0]{1}[5]{1}[0-9]{8}") ){
        messages.push(msg);
    }
    return messages;
}