const quotes = [
  "Cuando hayas eliminado lo imposible, lo que quede, por imposible que sea, debe ser la verdad.",
  "No hay nada más engañoso que un hecho obvio.",
  "Debería saber en este momento que cuando un hecho parece oponerse a un tren de deducciones, invariablemente demuestra ser capaz de soportar alguna otra interpretación.",
  "Nunca hago excepciones. Una excepción desmiente la regla.",
  "Lo que un hombre puede inventar, otro lo puede descubrir",
  "Tan peligroso es quitarle su cachorro a un tigre como arrebatarle a una mujer una ilusión.",
  "Siempre hay algunos locos alrededor. Sería un mundo aburrido sin ellos.",
  "La mayoría de la gente escucha con la intención de responder, no con el deseo de comprender.",
  "¿De qué sirve tener talento, doctor, si no tiene campo en el que aplicarlo?",
];
//Almacene la lista de palabras y el índice de la palabra que el reproductor está escribiendo actualmente
let words = [];
let wordIndex = 0;
//comenzando el timer
let startTime = Date.now();
//elementos de la pagina
const quoteElement = document.getElementById("quote");
const messageElement = document.getElementById("message");
const typedValueElement = document.getElementById("typed-value");

document.getElementById("start").addEventListener("click", () => {
  //obtiene cita
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[quoteIndex];
  //pone una cita en el array
  words = quote.split(" ");
  //reset de las palabras de seguimiento
  wordIndex = 0;

  //UI updates
  //crea un array de elementos span para setear una clase
  const spanWords = words.map(function (word) {
    return `<span>${word} </span>`;
  });
  //convierte en string y setea en innerHTML una cita en pantalla
  quoteElement.innerHTML = spanWords.join(``);
  //resalta la primera palabra
  quoteElement.childNodes[0].className = "highlight";
  //limpia todo mensaje
  messageElement.innerText = "";

  //montar el cuadro de texto
  //limpiar cuadro de texto
  typedValueElement.value = "";
  //setea el foco
  typedValueElement.focus();
  //establecer el contralador de eventos

  //start el timer
  startTime = new Date().getTime();
});

typedValueElement.addEventListener("input", (e) => {
  //obtener palabra actual
  const currentWord = words[wordIndex];
  //obtener valor actual
  const typedValue = typedValueElement.value;

  if (typedValue === currentWord && wordIndex === words.length - 1) {
    //final de la sentecia
    //pantalla completado
    const elapsedTime = new Date().getTime() - startTime;
    const message = `FELICITACIONES! terminaste en ${
      elapsedTime / 1000
    } segundos.`;
    messageElement.innerText = message;
  } else if (typedValue.endsWith("") && typedValue.trim() === currentWord) {
    //final de palabra
    //limpiar el typedValueElement para la nueva palabra
    typedValueElement.value = "";
    //moverse a la siguiente palabra
    wordIndex++;
    //resetear la clase name para todos los elementos en la cita
    for (const wordElement of quoteElement.childNodes) {
      wordElement.className = "";
    }
    //ilumina la nueva palabra
    quoteElement.childNodes[wordIndex].className = "highlight";
  } else if (currentWord.startsWith(typedValue)) {
    //actual es correcta
    //ilumina la siguiente palabra
    typedValueElement.className = "";
  } else {
    //error
    typedValueElement.className = "error";
  }
});
