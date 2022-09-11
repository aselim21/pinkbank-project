

document.addEventListener("DOMContentLoaded", () => {

    typingHelper();

    displayDetailsInCard();

    validationDuringTyping();

});

const form_card_ids = [
    {getFrom: "c-name", setTo: "card-holder-name"}, 
    {getFrom: "c-number", setTo: "card-number"},
    {getFrom: "c-exp-m", setTo: "card-validity-m"},
    {getFrom: "c-exp-y", setTo: "card-validity-y"},
    {getFrom: "c-cvc", setTo: "card-code"}
];

/* typingHelper _______________________________________________________________________________________
*/
function typingHelper(){

    //--------------c-number--------------
    //adds spaces between every 4 numbers & changes the focus to the next element when ready
    document.getElementById('c-number').addEventListener('input', (ev) => {  
        const input_withoutSpace = removeSpace(ev.target.value);
        const length_withoutSpace = input_withoutSpace.length;

        let newWord = input_withoutSpace[0];

        if(length_withoutSpace > 0){
            for(i = 1; i < length_withoutSpace; i++){
                if (removeSpace(newWord).length % 4 == 0 && removeSpace(newWord).length != 16){
                    newWord += ' ';
                }
                newWord += input_withoutSpace[i];
            }
            ev.target.value = newWord;
        }
        if(input_withoutSpace.length == 16){
            document.getElementById('c-exp-m').focus();
        }
    });
    //--------------c-exp-m--------------
    //changes focus to the next element when ready
    document.getElementById('c-exp-m').addEventListener('input', (ev) => {
        const input = ev.target.value;
        if(input.length == 2){
            document.getElementById('c-exp-y').focus();
        }
    });
    //--------------c-exp-y--------------
    //changes focus to the next element when ready
    document.getElementById('c-exp-y').addEventListener('input', (ev) => {
        const input = ev.target.value;
        if(input.length == 2){
            document.getElementById('c-cvc').focus();
        }
    });
}

/* displayDetailsInCard _______________________________________________________________________________
*/
function displayDetailsInCard () {

    form_card_ids.forEach(pair => {
        document.getElementById(pair.getFrom).addEventListener('input', (ev) => {
            const input = ev.target.value;
            const placeholder = ev.target.placeholder;
            const target = document.getElementById(pair.setTo);
            if(input.length > 0){
                target.innerHTML = input;
            } else {
                target.innerHTML = placeholder;
            }
        });
    });

}

/* validationDuringTyping _______________________________________________________________________________
*/
function validationDuringTyping(){
    form_card_ids.forEach(pair => {
        document.getElementById(pair.getFrom).addEventListener('input', (ev) => {
            const el = ev.target;
            const input = ev.target.value;
            if(input.length > 0){
                //remove the warning or put a new one
                validatorForBlanks(el);
                validatorOnlyNumbers(el);
            } else {
                //dont check the blanks now, only when clicked Submit
                validatorOnlyNumbers(el);
            }
        })
    })
}
/* validateForm _________________________________________________________________________________________
*/

function validateForm() {
    let the_form = document.forms["card-details-form"] //["fname"].value;
    let validationIndex = 0;
    form_card_ids.forEach(pair => {
        const el = the_form[pair.getFrom]
        validationIndex += validatorForBlanks(el);
        validationIndex += validatorOnlyNumbers(el);
    });
    getFormData('card-details-form');
    if(validationIndex == 0){
        const data = getFormData('card-details-form');
        //TODO : send this data to the server
        return true;
    }
    return false;
}

function validatorForBlanks(_el) {
    if(_el.hasAttribute('mandatory') == true && _el.value.length <= 0 && _el.getAttribute("warning") != 'blank'){
        putWarningOnInputEl(_el, "blank", "Can't be blank!");
        return 1;
    }else if(_el.hasAttribute('mandatory') == true && _el.value.length > 0 && _el.getAttribute("warning") == 'blank'){
        deleteWarningFromInputEl(_el)
        return 0;
    }else if(_el.hasAttribute('mandatory') == true && _el.value.length <= 0){
        return 1;
    }
    return 0;
}

function validatorOnlyNumbers(_el){
    if( _el.hasAttribute('onlyNumbers') == true && _el.value.length > 0 && containsAnyLetter(_el.value)){
        putWarningOnInputEl(_el, "format", "Wrong format, numbers only.")
        return 1;
    }else //because the 'blank' warning has higher priority so we delete every warning except 'blank'
    if(_el.hasAttribute('onlyNumbers') == true && _el.getAttribute("warning") != 'blank'){
        deleteWarningFromInputEl(_el); 
        return 0;
    }
    return 0;
}

function putWarningOnInputEl(_el, _reason , _warning_msg){
    //first remove the onld warning
    deleteWarningFromInputEl(_el);
    //then set the new warning
    _el.setAttribute("warning", _reason);
    const error_el = document.createElement('div');
    error_el.setAttribute('class', 'input-error-msg');
    error_el.textContent = _warning_msg;
    _el.insertAdjacentElement("afterend", error_el);
}

function deleteWarningFromInputEl(_el){
    if(_el.hasAttribute('warning') && _el.nextElementSibling.getAttribute('class') == 'input-error-msg'){
        _el.removeAttribute('warning');
        _el.nextElementSibling.remove();
    }
}

function hasNumber(myString) {
    return /\d/.test(myString);
}

function containsAnyLetter(str) {
    return /[a-zA-Z]/.test(str);
}

function removeSpace(str){
    return str.replace(/\s+/g, '');
}

// Get the info

function getFormData(_formId){
    let the_form = document.forms[_formId] //["fname"].value;
    return {
        card_name: the_form[form_card_ids[0].getFrom].value,
        card_number:  the_form[form_card_ids[1].getFrom].value,
        card_validity: `${ the_form[form_card_ids[2].getFrom].value}/${ the_form[form_card_ids[3].getFrom].value}`,
        card_cvc:  the_form[form_card_ids[4].getFrom].value
    };
}

