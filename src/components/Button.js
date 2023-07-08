import "../App.css";

const Button = ({ text, setDisplay, display, equation, setEquation }) => {
    const handleClick = () => {
        if (text === ".") {
            // if the last character is an operator, don't add a dot "."
            if ("+-x÷%+/-. ".includes(display[display.length - 1])) {
                return;
            }

            // if display is "0", then replace it with "0."
            if (display === "0") {
                setDisplay("0.");
                setEquation("0.");
                return;
            }

            // if display is another number, add a dot "." at the end of the display
            setDisplay(display + ".");
            setEquation(equation + ".");
        }
        else if (display === "0" && "+-x÷%+/-".includes(text)) { // if the display is 0 and the button is an operator, don't add the operator
            return
        } else if (display === "0" && text !== "AC") {
            setDisplay(text);
            setEquation(text);
        } else if ("+-x÷%+/-.".includes(text) && "+-x÷%+/-. ".includes(display[display.length - 1])) { // if the last character is an operator, don't add another operator
            return
        } else if (typeof (parseInt(display)) === "number" && typeof (text) === "number") { // if the last character is a number, don't add another number
            setDisplay(text)
            setEquation(text)
        } else if (text === "AC") {
            setDisplay("0");
            setEquation("");
        } else if (equation == "") {
            setEquation(text);
            setDisplay(text);
        } else if (text === "+/-") {
            // if plus-minus is applied to a single number
            if (!display.includes(" ")) {
                const result = parseFloat(display) * -1;
                setDisplay(result.toString());
                setEquation(result.toString());
                return
            }

            // if plus-minus is applied to calculations involving operators
            const numbers = equation.split(/(?<=[ ])/); // Membagi persamaan menjadi angka dan operator
            const lastNumber = parseFloat(numbers[numbers.length - 1]);
            const plusMinus = lastNumber * -1;
            const updatedDisplay = display.slice(0, -numbers[numbers.length - 1].length) + plusMinus.toString();
            const updatedEquation = equation.slice(0, -numbers[numbers.length - 1].length) + plusMinus.toString();
            setDisplay(updatedDisplay);
            setEquation(updatedEquation);
        } else if (text === "%") {
            // if the percentage is applied to a single number
            if (!display.includes(" ")) {
                const result = parseFloat(display) / 100;
                setDisplay(result.toString());
                setEquation(result.toString());
                return;
            }

            // if percentage is applied to calculations involving operators
            const numbers = equation.split(/(?<=[ ])/); // Membagi persamaan menjadi angka dan operator
            const lastNumber = parseFloat(numbers[numbers.length - 1]);
            const percentage = lastNumber / 100;
            const updatedDisplay = display.slice(0, -numbers[numbers.length - 1].length) + percentage.toString();
            const updatedEquation = equation.slice(0, -numbers[numbers.length - 1].length) + percentage.toString();
            setDisplay(updatedDisplay);
            setEquation(updatedEquation);

        } else if (text === "÷") {
            setDisplay(display + " ÷ ");
            setEquation(equation + " / ");
        } else if (text === "x") {
            setDisplay(display + " x ");
            setEquation(equation + " * ");
        } else if (text === "+") {
            setDisplay(display + " + ");
            setEquation(equation + " + ");
        } else if (text === "-") {
            setDisplay(display + " - ");
            setEquation(equation + " - ");
        } else if (text === "=") {
            // if the last character is an operator, do the calculation without including the character after the last number
            if ("+-x÷%+/-. ".includes(display[display.length - 1])) {
                console.log(equation.slice(0, -2))
                setDisplay(eval(equation.slice(0, -2)));
                setEquation(eval(equation.slice(0, -2)));
                return;
            }

            // if the last character is a number, do the calculation
            setDisplay(eval(equation));
            setEquation(eval(equation));
        } else {
            // if last character is 0, don't add 0
            if ("0".includes(display[display.length - 1])) {
                return;
            }

            //if last character is not 0, add 0 after the last character
            setDisplay(display + text);
            setEquation(equation + text);
        }
    }

    return (
        <button className="button"
            onClick={handleClick}
        >{text}</button>
    );
}

export default Button;