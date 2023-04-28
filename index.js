/* 
    Correcciones:
    1. Lo correcto al momento de trabajar con javascript en un archivo HTML es 
    manejarlo por separado, ya que esto no expone tanto la logica de negocio 
    que este script contiene.
    2. Aplicar el principio DRY para mejorar la calidad del codigo, asimismmo aporta mayor
    compresion del mismo como tambien aporta escalabilidad
*/

const main = () => {

    let randomNumber = Math.floor(Math.random() * 100) + 1; // se corrige la generacion de números aleatorios
    const ATTEMPTS = 10;
    // seleccion de elementos del DOM
    const guesses = document.querySelector('.guesses');
    const lastResult = document.querySelector('.lastResult');
    const lowOrHi = document.querySelector('.lowOrHi');
    const guessSubmit = document.querySelector('.guessSubmit');
    const guessField = document.querySelector('.guessField');
    let guessCount = 1;
    // Función que comprueba si la suposición del usuario es correcta o incorrecta
    const checkGuess = () => {

        let userGuess = Number(guessField.value);
        // Función que actualiza la pantalla con el resultado y color correspondientes
        const updateDisplay = (message, color) => {
            lastResult.textContent = message;
            lastResult.style.backgroundColor = color;
        };
        // se valida que el usuario no ingrese números decimales
        if (userGuess % 1 !== 0) {
            updateDisplay('Recordatorio: Numeros decimales no estan permitidos, así que este intento no se tomara en cuenta', '#D68910');
            return;
        }
        // se valida el primer intento del usuario
        if (guessCount === 1) {
            guesses.textContent = 'Número aleatorio anterior: ';
        }
        guesses.textContent += userGuess + ' ';
        // Determina el estado del juego
        const gameStatus = {
            isCorrect: userGuess === randomNumber,
            isGameOver: guessCount === ATTEMPTS,
        };
        // Mensajes de estado del juego
        const messages = {
            correct: '¡Felicitaciones! ¡adivinaste el número!',
            incorrect: 'Número incorrecto',
            higher: 'Incorrecto! El número es mayor!',
            lower: 'Incorrecto! El número es menor!',
            lost: `!!!Pérdistes!!! el número aleatorio era: ${randomNumber}`,
        };
        // manejadores para los casos de acierto y error
        const handleCorrectGuess = () => {
            updateDisplay(messages.correct, 'green');
            lowOrHi.textContent = '';
            setGameOver();
        };
        const handleIncorrectGuess = () => {
            const isGameOver = gameStatus.isGameOver;
            const color = isGameOver ? 'red' : 'black';
            const message = isGameOver ? messages.lost
                : userGuess < randomNumber
                    ? messages.higher
                    : messages.lower;

            updateDisplay(message, color);

            lowOrHi.textContent = isGameOver
                ? ''
                : null

            if (isGameOver) {
                setGameOver();
            }
        };
        // Verifica si la suposición es correcta o incorrecta y maneja el resultado
        gameStatus.isCorrect ? handleCorrectGuess() : handleIncorrectGuess();
        // Incrementa el contador de intentos y limpia el campo de entrada
        guessCount++;
        guessField.value = '';
        guessField.focus();
    };
    // Escucha el evento 'click' en el botón de envío
    guessSubmit.addEventListener('click', checkGuess);
    // Función para limpiar el contenido de texto de los elementos
    const clearTextContent = (elements) => {
        elements.forEach((element) => (element.textContent = ''));
    };
    // Función que reinicia el juego
    const resetGame = () => {
        // Reinicia el contador de intentos
        guessCount = 1;
        // Limpia el contenido de texto de los elementos de resultado
        const resetParas = document.querySelectorAll('.resultParas p');
        clearTextContent(resetParas);
        // Elimina el boton del DOM
        const resetButton = document.querySelector('button');
        resetButton.parentNode.removeChild(resetButton);
        // Inhabilita el input y el button
        guessField.disabled = false;
        guessSubmit.disabled = false;
        guessField.value = '';
        guessField.focus();

        lastResult.style.backgroundColor = 'white';
        // genera un nuevo número aleatorio
        randomNumber = Math.floor(Math.random() * 100) + 1;
    };
    // Funcion para crear un nuevo boton para el reinicio del juego
    const createResetButton = () => {
        const resetButton = document.createElement('button');
        resetButton.textContent = 'Comienza un nuevo juego';
        resetButton.addEventListener('click', resetGame);
        return resetButton;
    };
    // Funcion para terminar el juego
    const setGameOver = () => {
        // Deshabilita el campo de entrada y el botón de envío
        guessField.disabled = true;
        guessSubmit.disabled = true;
        // Crea y agrega el botón de reinicio del juego al DOM
        const resetButton = createResetButton();
        document.body.appendChild(resetButton);
    };
};

main();

