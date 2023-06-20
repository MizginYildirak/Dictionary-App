const wordInput = document.getElementById("word-inp");
const searchBtn = document.getElementById("search-btn");
const result = document.getElementById("result");
const sound = document.querySelector(".sound");
const line = document.querySelector(".line");
const exampleWrapper = document.querySelector(".example-wrapper");

searchBtn.addEventListener("click", () => {
    const word = wordInput.value;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);

            let meanings = responseJson[0]?.meanings;

            if (meanings) {
                result.style.padding = "20px"
                result.innerHTML = "";

                let wordWrapper = document.createElement("div");
                wordWrapper.classList.add("word-wrapper");

                let wordType = document.createElement("div");
                wordType.classList.add("word-type");

                let wordElement = document.createElement("div");
                wordElement.classList.add("word");
                wordElement.textContent = responseJson[0]?.word;

                let soundIcon = document.createElement("div");
                soundIcon.classList.add("sound");
                soundIcon.onclick = playSound;

                let soundIconInner = document.createElement("i");
                soundIconInner.classList.add("fa", "fa-volume-up");

                let audioElement = document.createElement("audio");
                audioElement.id = "audio";

                let audioSource = document.createElement("source");
                audioSource.type = "audio/mpeg";
                audioSource.src = responseJson[0]?.phonetics[0]?.audio;

                audioElement.appendChild(audioSource);
                soundIcon.appendChild(soundIconInner);
                wordType.appendChild(wordElement);
                wordType.appendChild(soundIcon);
                wordType.appendChild(audioElement);
                wordWrapper.appendChild(wordType);
                result.appendChild(wordWrapper);

                let pronunciationWrapper = document.createElement("div");
                pronunciationWrapper.classList.add("pronunciation-wrapper");

                let pronunciationText = document.createElement("span");
                pronunciationText.classList.add("pronunciation");
                pronunciationText.textContent = responseJson[0]?.phonetics[0]?.text;

                pronunciationWrapper.appendChild(pronunciationText);
                wordWrapper.appendChild(pronunciationWrapper);

                for (let i = 0; i < meanings.length; i++) {
                    let partOfSpeech = meanings[i]?.partOfSpeech;
                    let definitions = meanings[i]?.definitions;

                    let typeWrapper = document.createElement("div");
                    typeWrapper.classList.add("type-wrapper");

                    let partOfSpeechLabel = document.createElement("span");
                    partOfSpeechLabel.textContent = partOfSpeech;
                    partOfSpeechLabel.classList.add("part-of-speech");

                    typeWrapper.appendChild(partOfSpeechLabel);
                    wordWrapper.appendChild(typeWrapper);

                    for (let j = 0; j < 1; j++) {
                        let definition = definitions[j]?.definition;
                        let example = definitions[j]?.example;

                        let definitionWrapper = document.createElement("div");
                        definitionWrapper.classList.add("definition");

                        let definitionText = document.createElement("p");
                        definitionText.textContent = definition;

                        definitionWrapper.appendChild(definitionText);
                        result.appendChild(definitionWrapper);

                        if (example !== "") {
                            let exampleWrapper = document.createElement("div");
                            exampleWrapper.classList.add("example-wrapper");

                            let line = document.createElement("div");
                            line.classList.add("line");

                            let partOfSpeechExample = document.createElement("span");
                            partOfSpeechExample.textContent = partOfSpeech;
                            partOfSpeechExample.classList.add("part-of-speech-example");

                            let exampleText = document.createElement("p");
                            exampleText.classList.add("example");
                            exampleText.textContent = example;

                            exampleWrapper.appendChild(line);
                            exampleWrapper.appendChild(partOfSpeechExample);
                            exampleWrapper.appendChild(exampleText);
                            result.appendChild(exampleWrapper);
                        } else {
                            let exampleWrapper = document.createElement("div");
                            exampleWrapper.classList.add("example-wrapper");
                    
                            let line = document.createElement("div");
                            line.classList.add("line");
                    
                            let partOfSpeechExample = document.createElement("span");
                            partOfSpeechExample.textContent = partOfSpeech;
                            partOfSpeechExample.classList.add("part-of-speech-example");
                    
                            let exampleText = document.createElement("p");
                            exampleText.classList.add("example");
                            exampleText.textContent = "No example found.";
                    
                            exampleWrapper.appendChild(line);
                            exampleWrapper.appendChild(partOfSpeechExample);
                            exampleWrapper.appendChild(exampleText);
                            result.appendChild(exampleWrapper);
                        }
                    }
                }
            } else {
                result.innerHTML = "No definitions found.";
            }
        });
});

function playSound() {
    document.querySelector("#audio").play();
}

