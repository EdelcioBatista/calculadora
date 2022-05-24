const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operator]')
const equalsButtons = document.querySelector('[data-equals]')
const deleteButtons = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    //ainda precisa construir uma função para formatar os numeros, onde, por exemplo, 12345678,90 será 12.345.678,90
    //mas é melhor usar uma lib pronta

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    calculate() {
        let result;

        const _previusOperandFloat = parseFloat(this.previousOperand);
        const _currentOperandFloat = parseFloat(this.currentOperand);

        if (isNaN(_previusOperandFloat) || isNaN(_currentOperandFloat)) return;

        switch (this.operation) {
            case '+':
                result = _previusOperandFloat + _currentOperandFloat;
                break
            case '-':
                result = _previusOperandFloat - _currentOperandFloat;
                break;
            case '/':
                result = _previusOperandFloat / _currentOperandFloat;
                break;
            case '*':
                result = _previusOperandFloat * _currentOperandFloat;
                break;
            default:
                return;
        }

        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';

    }

    chooseOperation(operation) {
        if (this.currentOperand == '') return;

        if (this.previousOperand != '') {
            this.calculate()
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    appendNumber(number) {
        if(this.currentOperand.includes('.') && number === '.') return;

        this.currentOperand = `${this.currentOperand}${number.toString()}`;

    }

    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    updateDisplay() {
        this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation ||''}`;
        this.currentOperandTextElement.innerText = this.currentOperand;
    }
}

const calculator = new Calculator( 
    previousOperandTextElement, 
    currentOperandTextElement
);

for (const numberButton of numberButtons) {
    numberButton.addEventListener( 'click', () => {
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay();
    });
}

for (const operationButton of operationButtons) {
    operationButton.addEventListener('click', () => {
        calculator.chooseOperation(operationButton.innerText);
        calculator.updateDisplay();
    })
}

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

equalsButtons.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay();
})

deleteButtons.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})


