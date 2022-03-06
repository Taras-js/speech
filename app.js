let final_transcript = "";
let recognizing = false;

const speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new speechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.maxAlternatives = 3;
recognition.lang = "ru-RU";

recognition.onstart = () => {
    console.log("Распознавание голоса запущено");
};
recognition.onerror = ({ error }) => {
    console.error(error);
};
recognition.onend = () => {
    console.log("Распознавание голоса закончено");
    if (!recognizing) return;
    recognition.start();
};
const array = ['коммерческое предложение']
recognition.onresult = (e) => {
    let interim_transcript = "";
    for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) {
            const result = editInterim(e.results[i][0].transcript);
            final_transcript += result;
            const data = new Date()
            const textResult = {
                id: data,
                text: result.trim()
            }
            array.push(textResult)

            const find = array.find(item => {
                if(item.text === 'коммерческое предложение')
                {const html = document.querySelector('.commerce')
                    return html.innerHTML = `<p>Предложение о сотрудничестве
                        Уважаемый Ф.И.О.!<br>
                        Меня зовут Ф.И.О.. <br>
                        Моя компания _______________ занимается поставкой компьютеров <br>
                        и комплектующих и программного обеспечения с ______года.<br>
                        За время деятельности мы осуществили поставки более _________клиентам. <br>
                        Среди них ________________.
                        Мы продаем компьютеры известных мировых брендов _____________ <br>
                        и программное обеспечение всемирно известных компаний _______________.<br>
                        Сотрудничая с нами, вы получите самое современное и качественное оборудование<br> 
                        в короткие сроки. Поставки осуществляем за один день — для товаров со склада и до <br>
                        нескольких дней — для товаров под заказ.
                        Мы заинтересованы в долгосрочном взаимовыгодном партнерстве и готовы представить<br>
                         Вашему вниманию низкие цены и высокое качество обслуживания.
                        Буду рад сотрудничать, жду Ваш ответ в ближайшее время.
                        Если возникнут вопросы, буду рад ответить на них. Мои координаты.</p>`
                }})
            console.log('array:', array)
            console.log('find:', find)
        } else {
            interim_transcript += e.results[i][0].transcript;

        }
    }
    final_transcript = editFinal(final_transcript);
    final_text.value = final_transcript;
    interim_text.value = interim_transcript;
};

const DICTIONARY = {
    точка: ".",
    запятая: ",",
    вопрос: "?",
    восклицание: "!",
    двоеточие: ":",
    тире: "-",
    абзац: "\n",
    отступ: "\t"
};

function editInterim(s) {
    return s
        .split(" ")
        .map((word) => {
            word = word.trim();
            return DICTIONARY[word] ? DICTIONARY[word] : word;
        })
        .join(" ");
}

function editFinal(s) {
    return s.replace(/\s([\.+,?!:-])/g, "$1");
}

buttons.onclick = ({ target }) => {
    switch (target.className) {
        case "start":
            final_transcript = "";
            recognition.start();
            recognizing = true;
            final_text.value = "";
            interim_text.value = "";
            break;
        case "stop":
            recognition.stop();
            recognizing = false;
            break;
        case "abort":
            recognition.abort();
            recognizing = false;
            break;
        case "copy":
            navigator.clipboard.writeText(final_text.value);
            target.textContent = "Готово";
            const timerId = setTimeout(() => {
                target.textContent = "Копия";
                clearTimeout(timerId);
            }, 3000);
            break;
        case "clear":
            final_text.value = "";
            break;
        default:
            break;
    }
};

/*
SpeechRecognitionEvent
  bubbles: false
  cancelBubble: false
  cancelable: false
  composed: false
  currentTarget: SpeechRecognition {grammars: SpeechGrammarList, lang: "ru-RU", continuous: true, interimResults: true, maxAlternatives: 3, …}
  defaultPrevented: false
  emma: null
  eventPhase: 0
  interpretation: null
  isTrusted: true
  path: []
  resultIndex: 1
  // здесь нас интересуют только результаты
  results: SpeechRecognitionResultList {0: SpeechRecognitionResult, 1: SpeechRecognitionResult, length: 2}
  returnValue: true
  srcElement: SpeechRecognition {grammars: SpeechGrammarList, lang: "ru-RU", continuous: true, interimResults: true, maxAlternatives: 3, …}
  target: SpeechRecognition {grammars: SpeechGrammarList, lang: "ru-RU", continuous: true, interimResults: true, maxAlternatives: 3, …}
  timeStamp: 59862.61999979615
  type: "result"
*/

/*
results: SpeechRecognitionResultList
  0: SpeechRecognitionResult
    0: SpeechRecognitionAlternative
      confidence: 0.7990190982818604
      transcript: "привет"
    isFinal: true
    length: 1
  length: 1

 */
