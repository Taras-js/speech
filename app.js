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
recognition.onerror = ({error}) => {
    console.error(error);
};
recognition.onend = () => {
    console.log("Распознавание голоса закончено");
    if (!recognizing) return;
    recognition.start();
};
const array = []
recognition.onresult = (e) => {
    let interim_transcript = "";
    for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) {
            const result = editInterim(e.results[i][0].transcript);
            final_transcript += result;
            const data = new Date()
            const textResult = {
                id: data,
                text: result.trim().toLowerCase()
            }
            array.push(textResult)
            console.log('array:', array)
            findWord(array)

        }

        interim_transcript += e.results[i][0].transcript;
        final_transcript = editFinal(final_transcript);
        final_text.value = final_transcript;
        interim_text.value = interim_transcript;
    }


};
const findWord = () => {
    const startText = ` <div class="card text-center">
            <div class="card-header">
                <div class="card-body">
                    <h5 class="card-title">Keywords</h5>
                    <ol class="card-text">
                        <li>Брак</li>
                        <li>Работа без оплаты</li>
                        <li>Другие бренды</li>
                        <li>Китай</li>
                        <li>Уже покупаем</li>
                        <li>Под заказ</li>
                        <li>Плохой бренд</li>
                        <li>Изменилось качество</li>
                        <li>Стало больше возвратов</li>
                        <li>Не соответствуют размеры</li>
                        <li>Не большой ресурс</li>
                        <li>Нет смазки</li>
                    </ol>

                </div>
            </div>
        </div>`

    array.find(item => {
        // =================Брак=========================
            if (item.text.includes('брак')) {
                const prompt = document.querySelector('.prompt')
                prompt.innerHTML = `
  <div class="card text-center">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Брак</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h3><strong> Ответ: </strong></h3>
        <h5> К сожалению форс - мажоры могут случится по любому бренду рынка. Качество - это конечно важно!</h5>
        <ol class="card-text"> <h3><strong> Вопросы: </strong></h3>
        <li>Какие бренды обычно покупаете?</li>
        <li>Что для Вас - идеальный бренд?</li>
        <li>Случались ли рекламации по брендам сегмента PREMIUM?</li>
        <li>Откуда такая информация?</li>
        </ol>
      </div>
    </div>
  </div>`
                const btnClose = document.querySelector('.btn-close')
                btnClose.addEventListener('click', () => {
                    prompt.innerHTML = startText
                    array.length = 0
                })
            }
            //==========Работа без оплаты=======================
            if (item.text.includes('работа без оплаты')) {
                const prompt = document.querySelector('.prompt')
                prompt.innerHTML = `
  <div class="card text-center">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Работа без оплаты</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h3><strong> Ответ: </strong></h3>
        <h5> Меньше рисков - больше спокойствия!</h5>
        <ol class="card-text"> <h3><strong> Вопросы: </strong></h3>
        <li>Все ли дистрибьютеры и  импортеры компенсируют работы по гарантийных случаях?</li>
        <li>Вы знаете про условия компенсации работ? Хотите расскажу поподробнее?</li>
        <li>Пробовали ли вы делать наценку более 50% по нашим брендам?</li>
        <li>Сколько у Вас было рекламаций и по каким ТГ?</li>
        </ol>
      </div>
    </div>
  </div>`
                const btnClose = document.querySelector('.btn-close')
                btnClose.addEventListener('click', () => {
                    prompt.innerHTML = startText
                    array.length = 0
                })
            }
            //============Другие бренды========================
        if (item.text.includes('другие бренды')) {
            const prompt = document.querySelector('.prompt')
            prompt.innerHTML = `
  <div class="card text-center">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Другие бренды</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h3><strong> Ответ: </strong></h3>
        <h5>Все мои клиенты тоже работают только с проверенным ассортиментом! </h5>
        <h3><strong> Вопросы: </strong></h3>
        <ol class="card-text"> 
        <li>Как вводите новые бренды, на что ориентируетесь?</li>
        <li></li>
        <li></li>
        <li></li>
        </ol>
      </div>
    </div>
  </div>`
            const btnClose = document.querySelector('.btn-close')
            btnClose.addEventListener('click', () => {
                prompt.innerHTML = startText
                array.length = 0
            })
        }
        //================Китай===================
        if (item.text.includes('китай')) {
            const prompt = document.querySelector('.prompt')
            prompt.innerHTML = `
  <div class="card text-center">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Китай</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h3><strong> Ответ: </strong></h3>
        <h5>Ассоциация, конечно, негативная. По Японии и Корее раньше было также! </h5>
        <h3><strong> Вопросы: </strong></h3>
        <ol class="card-text"> 
        <li>Что именно Вас смущает?</li>
        <li>Как качество связано со страной производства?</li>
        <li></li>
        <li></li>
        </ol>
      </div>
    </div>
  </div>`
            const btnClose = document.querySelector('.btn-close')
            btnClose.addEventListener('click', () => {
                prompt.innerHTML = startText
                array.length = 0
            })
        }
//================Уже покупаем===================
            if (item.text.includes('уже покупаем')) {
                const prompt = document.querySelector('.prompt')
                prompt.innerHTML = `
  <div class="card text-center">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Уже покупаем</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h3><strong> Ответ: </strong></h3>
        <h5>Отличное решение, почти все мои клиенты это делают! </h5>
        <h3><strong> Вопросы: </strong></h3>
        <ol class="card-text">
        <li>Чем помочь в продажах?</li>
        <li>Знаете ли вы про наши дополнительные условия?</li>
        <li>Что нибудь слышали про линейку HARDIG?</li>
        <li>Какой информации не хватает для увеличения Вашей прибыли по бренду?</li>
        </ol>
      </div>
    </div>
  </div>`
                const btnClose = document.querySelector('.btn-close')
                btnClose.addEventListener('click', () => {
                    prompt.innerHTML = startText
                    array.length = 0
                })
            }
            //================Под заказ===================
            if (item.text.includes('под заказ')) {
                const prompt = document.querySelector('.prompt')
                prompt.innerHTML = `
  <div class="card text-center">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Под заказ</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h3><strong> Ответ: </strong></h3>
        <h5>Прогрессивный и знающий  видимо клиент! </h5>
        <h3><strong> Вопросы: </strong></h3>
        <ol class="card-text"> 
        <li>Что знаете про бренд?</li>
        <li>Какой информации у вас не хватает по бренду?</li>
        <li>Какая линейка?</li>
        <li></li>
        </ol>
      </div>
    </div>
  </div>`
                const btnClose = document.querySelector('.btn-close')
                btnClose.addEventListener('click', () => {
                    prompt.innerHTML = startText
                    array.length = 0
                })
            }
            //================Плохой бренд===================
            if (item.text.includes('плохой бренд')) {
                const prompt = document.querySelector('.prompt')
                prompt.innerHTML = `
  <div class="card text-center">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Плохой бренд</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h3><strong> Ответ: </strong></h3>
        <h5>Качество это конечно важно! </h5>
        <h3><strong> Вопросы: </strong></h3>
        <ol class="card-text"> 
        <li>Откуда такая информация?</li>
        <li></li>
        <li></li>
        <li></li>
        </ol>
      </div>
    </div>
  </div>`
                const btnClose = document.querySelector('.btn-close')
                btnClose.addEventListener('click', () => {
                    prompt.innerHTML = startText
                    array.length = 0
                })
            }
            //================Изменилось качество===================
            if (item.text.includes('изменилось качество')) {
                const prompt = document.querySelector('.prompt')
                prompt.innerHTML = `
  <div class="card text-center">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Изменилось качество</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h3><strong> Ответ: </strong></h3>
        <h5>Качество это конечно важно, форс - мажоры иногда случаются!</h5>
        <h3><strong> Вопросы: </strong></h3>
        <ol class="card-text"> 
        <li>Какие рекламации?</li>
        <li>Какие товарные группы покупали?</li>
        <li>Вы слышали про оплату снятия/установки?</li>
        <li>У вас по другим брендам совсем не бывает рекламаций?</li>
        </ol>
      </div>
    </div>
  </div>`
                const btnClose = document.querySelector('.btn-close')
                btnClose.addEventListener('click', () => {
                    prompt.innerHTML = startText
                    array.length = 0
                })
            }
            //================Стало больше возвратов===================
            if (item.text.includes('стало больше возвратов')) {
                const prompt = document.querySelector('.prompt')
                prompt.innerHTML = `
  <div class="card text-center">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Стало больше возвратов</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h3><strong> Ответ: </strong></h3>
        <h5>Очень многие клиенты покупают синюю линейку в больших объемах!</h5>
        <h3><strong> Вопросы: </strong></h3>
        <ol class="card-text"> 
        <li>Откуда такая информация?</li>
        <li></li>
        <li></li>
        <li></li>
        </ol>
      </div>
    </div>
  </div>`
                const btnClose = document.querySelector('.btn-close')
                btnClose.addEventListener('click', () => {
                    prompt.innerHTML = startText
                    array.length = 0
                })
            }
            //================Не соответствуют размеры===================
            if (item.text.includes('не соответствует размеры')) {
                const prompt = document.querySelector('.prompt')
                prompt.innerHTML = `
  <div class="card text-center">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Не соответствуют размеры</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h3><strong> Ответ: </strong></h3>
        <h5>Точность современного производства доходит уже не до миллиметров, а до микрон или точнее...!</h5>
        <h3><strong> Вопросы: </strong></h3>
        <ol class="card-text">
        <li>Какая товарная группа, какой артикул?</li>
        <li>Как кроссировали, где подбирали?</li>
        <li>Вы знаете, что бренд и его правильные кроссы есть в Текдок?</li>
        <li></li>
        </ol>
      </div>
    </div>
  </div>`
                const btnClose = document.querySelector('.btn-close')
                btnClose.addEventListener('click', () => {
                    prompt.innerHTML = startText
                    array.length = 0
                })

            }
            //================Не большой ресурс===================
            if (item.text.includes('небольшой ресурс')) {
                const prompt = document.querySelector('.prompt')
                prompt.innerHTML = `
  <div class="card text-center">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Не большой ресурс</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h3><strong> Ответ: </strong></h3>
        <h5>Спокойствие за ресурс при любых условиях установки и эксплуатации часто бывает актуальным!</h5>
        <h3><strong> Вопросы: </strong></h3>
        <ol class="card-text"> 
        <li>Откуда такая информация?</li>
        <li>Какой пробег?</li>
        <li>Какая линейка?</li>
        <li></li>
        </ol>
      </div>
    </div>
  </div>`
                const btnClose = document.querySelector('.btn-close')
                btnClose.addEventListener('click', () => {
                    prompt.innerHTML = startText
                    array.length = 0
                })
            }
            //================Нет смазки===================
            if (item.text.includes('нет смазки')) {
                const prompt = document.querySelector('.prompt')
                prompt.innerHTML = `
  <div class="card text-center">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Нет смазки</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h5><strong> Ответ: </strong></h5>
        <h5>Каждый должен заниматься своим делом!</h5>
        <h5><strong> Вопросы: </strong></h5>
        <ol class="card-text"> 
        <li>Что именно необходимо из смазочных?</li>
        <li>Для каких целей используется смазка в Вашем случае?</li>
        <li>Чем помочь по вопросу?</li>
        <li></li>
        </ol>
      </div>
    </div>
  </div>`
                const btnClose = document.querySelector('.btn-close')
                btnClose.addEventListener('click', () => {
                    prompt.innerHTML = startText
                    array.length = 0
                })
            }
        }
    )
}

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

buttons.onclick = ({target}) => {
    switch (target.id) {
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
