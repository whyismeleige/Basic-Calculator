const buttons = document.querySelectorAll(".buttons");
let userInput = "";

const postfixConversion = (inputText) => {
    let output = [];
    let stack = [];
    let counter = -1;
    let precedence = {'+':1,'-':1,'*':2,'/':2,'%':2,'e':2};
    for(let i=0;i<inputText.length;i++){
        let char = inputText[i];
        if(counter == -1 && char == '.'){
            output.push(char);
            counter++;
            continue;
        }else if(counter != -1 && char == '.'){
            let stackChar = output[output.length - 1];
            let concateChar = (stackChar + char);
            output.pop();
            output.push(concateChar);
            continue;
        }
        if(counter == -1 && (/[a-z0-9]/.test(char))){
            output.push(parseFloat(char));
            counter++;
            continue;
        }else if(counter != -1 && ((/[0-9e]/.test(char)))){
            let stackChar = output[output.length - 1];
            let concateChar = +(stackChar + char);
            output.pop();
            output.push(concateChar);
            continue;
        }
        counter = -1;
        while(stack.length && precedence[stack[stack.length - 1]] >= precedence[char]){
            output.push(stack.pop());
        }
        stack.push(char);
    }
    while(stack.length){
        output.push(stack.pop());
    }
    return output;
}

const calculation = (inputStack) => {
    let stack = [];
    const operation = (op1,op2,operator) => {
        switch (operator) {
            case '+':
                return op1 + op2;
            case '-':
                return op1 - op2;

            case '*':
                return op1 * op2;

            case '/':
                return op1 / op2;

            case 'e':
                return op1 * op2;

            case '%':
                return op1 / op2;
            default:
                return 0;
        }
    }
    for(let i = 0;i < inputStack.length;i++){
        let token = inputStack[i];
        if(['+','-','*','/','%','e'].includes(token)){
            let a,b;
            if(['+','-','*','/'].includes(token)){
                b = stack.pop();
                a = stack.pop();
            }else if(['%'].includes(token)){
                b = 100;
                a = stack.pop();
            }else if(['e'].include(token)){
                b = 2.71828;
                a = stack.pop();
            }
            let result = operation(a,b,token);
            stack.push(result);
        }else{
            stack.push(token);
        }
    }
    return stack.pop();
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        let textContent = button.textContent;
        let userInput2 = document.getElementById("result-input").value;
        textContent = textContent.replace(/\s+/g,'');
        if(textContent == 'C'){
            userInput = "";
            document.getElementById("result-input").value = userInput;
            document.querySelector("#result-output").innerText = ">> ";
            console.log("This is Clear");
        }else {
            userInput =  userInput2 + textContent;
            document.getElementById("result-input").value = userInput;
            userInput = postfixConversion(userInput);
            console.log(userInput);
            output = calculation(userInput);
            document.querySelector("#result-output").innerText = ">> " + output;
            console.log(output);
        }
    })
})
