const wordInput = document.getElementById("word-inp")
const searchBtn = document.getElementById("search-btn")
const result = document.getElementById("result")

searchBtn.addEventListener("click", () => {
    const word = wordInput.value
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`

    fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            result.innerHTML = `
            <div class="word-wrapper">

                <div class="word-type">
                    <div class="word">${responseJson[0].word}</div>
                    <div class="sound"><i class="fa fa-volume-up"></i></div>
                </div>
                <div class="type-wrapper">
                    <span>${responseJson[0].meanings[0].partOfSpeech}</span>
                    <span>${responseJson[0].phonetic}</span>
                </div>
            </div>

            <div class="definition">
                <p>${responseJson[0].meanings[0].definitions[0].definition}</p>
            </div>

            <div class="example-wrapper">
                <div class="line"></div>
                <p class="example">${responseJson[0].meanings[0].definitions[0].example || ""}</p>
            </div>
        </div>
    `
        })
})
