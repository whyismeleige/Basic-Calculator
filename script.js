const buttons = document.querySelectorAll(".buttons");
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const userInput = button.textContent;
        console.log(`User Clicked on ${userInput}`);
    })
})