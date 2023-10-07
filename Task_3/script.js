class Calculator {
    constructor(prevbut, currentbut) {
      this.prevbut = prevbut
      this.currentbut = currentbut
      this.clear()
    }
  
    clear() {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
    }
  
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
  
    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + number.toString()
    }
  
    chooseOperation(operation) {
      if (this.currentOperand === '') return
      if (this.previousOperand !== '') {
        this.compute()
      }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }
  
    compute() {
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '÷':
          computation = prev / current
          break
        default:
          return
      }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
    }
  
    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
  
    updateDisplay() {
      this.currentbut.innerText =
        this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) {
        this.prevbut.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
        this.prevbut.innerText = ''
      }
    }
  }
  
  
  const numbut = document.querySelectorAll('[data-num]')
  const opnbut = document.querySelectorAll('[data-op]')
  const eqbut = document.querySelector('[data-eq]')
  const dtbut = document.querySelector('[data-delete]')
  const allclrbut = document.querySelector('[data-allclr]')
  const prevbut = document.querySelector('[data-previous-operand]')
  const currentbut = document.querySelector('[data-current-operand]')
  
  const calculator = new Calculator(prevbut, currentbut)
  
  numbut.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  opnbut.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  eqbut.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
  allclrbut.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
  dtbut.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })