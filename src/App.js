import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [input, setInput] = useState('');
  const [isError, setIsError] = useState(false);

  const handleNumberClick = (number) => {
    setInput((prev) => prev + number);
    setIsError(false);
  };

  const handleOperation = (op) => {
    setInput((prev) => {
      const trimmedInput = prev.trim();
      if (op === '-' && (trimmedInput === '' || ['+', '-', '*', '/', '('].includes(trimmedInput.slice(-1)))) {
        return trimmedInput + op;
      }
      if (['+', '-', '*', '/'].includes(trimmedInput.slice(-1))) {
        return trimmedInput.slice(0, -1) + op + ' ';
      } else {
        return trimmedInput + ' ' + op + ' ';
      }
    });
    setIsError(false);
  };

  const handleParentheses = (paren) => {
    setInput((prev) => prev + paren);
    setIsError(false);
  };

  const handleEqual = () => {
    try {
      let expression = input.replace(/×/g, '*').replace(/÷/g, '/');

      // Substituir porcentagens
      expression = expression.replace(/(\d+(\.\d+)?)%/g, (match, number) => {
        return (parseFloat(number) / 100).toString();
      });

      const result = evaluateExpression(expression);
      setInput(result.toString());
      setIsError(false);
    } catch (e) {
      setInput('Erro: Entrada inválida');
      setIsError(true);
    }
  };

  const handleClear = () => {
    setInput('');
    setIsError(false);
  };

  const handleSquareRoot = () => {
    try {
      const result = Math.sqrt(evaluateExpression(input.replace(/×/g, '*').replace(/÷/g, '/')));
      setInput(result.toString());
      setIsError(false);
    } catch (e) {
      setInput('Erro: Entrada inválida');
      setIsError(true);
    }
  };

  const handlePercentage = () => {
    setInput((prev) => prev + '%');
    setIsError(false);
  };

  const evaluateExpression = (expression) => {
    try {
      const func = new Function('return ' + expression);
      return func();
    } catch (e) {
      throw new Error('Erro na avaliação da expressão');
    }
  };

  return (
    <div className="App">
      <h1>Calculadora</h1>
      <div className="calculator">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={`input-display ${isError ? 'error' : ''}`}
          placeholder="0"
        />
        <div className="button-grid">
          <button onClick={() => handleNumberClick('1')}>1</button>
          <button onClick={() => handleNumberClick('2')}>2</button>
          <button onClick={() => handleNumberClick('3')}>3</button>
          <button onClick={() => handleOperation('+')}>+</button>

          <button onClick={() => handleNumberClick('4')}>4</button>
          <button onClick={() => handleNumberClick('5')}>5</button>
          <button onClick={() => handleNumberClick('6')}>6</button>
          <button onClick={() => handleOperation('-')}>-</button>

          <button onClick={() => handleNumberClick('7')}>7</button>
          <button onClick={() => handleNumberClick('8')}>8</button>
          <button onClick={() => handleNumberClick('9')}>9</button>
          <button onClick={() => handleOperation('*')}>×</button>

          <button onClick={() => handleNumberClick('0')}>0</button>
          <button onClick={handleEqual}>=</button>
          <button onClick={handleClear}>C</button>
          <button onClick={() => handleOperation('/')}>÷</button>
          
          <button onClick={() => handleParentheses('(')}>(</button>
          <button onClick={() => handleParentheses(')')}>)</button>
          <button onClick={handleSquareRoot}>√</button>
          <button onClick={handlePercentage}>%</button>
        </div>
      </div>
    </div>
  );
}

export default App;
