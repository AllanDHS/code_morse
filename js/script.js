const textfield = document.getElementById("essai");
const titre = document.getElementById("titre_essai");
const salutaudio = new Audio('./audio/salut.wav');
const secretaudio = new Audio('./audio/secret.wav');
let secretPlaying = false; // Variable to track the state of the secret audio

console.log(textfield);
animationTextfield(textfield);
animationTitle(titre);

async function animationTextfield(textfield) {
    while (1) {
        if (textfield == document.activeElement) {
            flash(textfield);
            await sleep(500);
        } else {
            await sleep(500);
        }
    }
}

async function animationTitle(title) {
    while (1) {
        if (title.innerText.slice(-3) == "...") {
            title.innerText = title.innerText.replace("...", "");
        } else {
            title.innerText += ".";
        }
        await sleep(500);
    }
}

function flash(elem) {
    if (elem.value.slice(-1) == "█")
        elem.value = elem.value.replaceAll("█", "");
    else
        elem.value += "█";
}

function removeAll(elem) {
    elem.value = elem.value.replaceAll("█", "");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

textfield.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        if (document.getElementById('result') == null) {
            var result = document.createElement('div');
            result.id = "result";
            result.style = "font-size:33px;";
            document.getElementById("text").appendChild(result);
        }
        let tmp = textfield.value.toLowerCase();
        if (tmp.replaceAll('█', '') == "dieux") {
            document.getElementById('result').innerText = "clé de déchiffrement trouvé !";
        } else {
            document.getElementById('result').innerText = "Incorrect !"
        }
    }
});

async function playSalut() {
    salutaudio.play();
    document.getElementById("salut").src = "./images/pause.svg";
    while (!salutaudio.ended) {
        await sleep(10);
    }
    document.getElementById("salut").src = "./images/play.svg";
}

async function playSecret() {
    if (secretPlaying) {
        secretaudio.pause();
        secretPlaying = false;
        document.getElementById("secret").src = "./images/play.svg";
    } else {
        secretaudio.play();
        secretPlaying = true;
        document.getElementById("secret").src = "./images/pause.svg";
        while (!secretaudio.ended && secretPlaying) {
            await sleep(10);
        }
        if (!secretPlaying) {
            secretaudio.currentTime = 0;
        }
        document.getElementById("secret").src = "./images/play.svg";
    }
}
    