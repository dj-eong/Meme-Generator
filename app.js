const form = document.querySelector('form');
const imageInput = document.querySelector('#imageLink');
const topTextInput = document.querySelector('#topText');
const bottomTextInput = document.querySelector('#bottomText');
const section = document.querySelector('#result');

//retrieve meme objects (consisting of ID, image link, top and bottom texts) from localStorage
const memesArray = JSON.parse(localStorage.getItem("memes")) || [];
let memeID = memesArray.length ? memesArray[memesArray.length - 1].memeID + 1 : 0;

//reconstruct meme using info from retrieved meme array stored in localStorage
for (let meme of memesArray) {
    let div = document.createElement('div');
    div.dataset.memeID = meme.memeID;
    div.classList.add('meme');
    div.style.background = `center / cover black url(${meme.image})`;

    let topText = document.createElement('p');
    topText.innerText = meme.topText;
    topText.classList.add('topText');
    div.append(topText);

    let bottomText = document.createElement('p');
    bottomText.innerText = meme.bottomText;
    bottomText.classList.add('bottomText');
    div.append(bottomText);

    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = '&#10006;';
    deleteButton.classList.add('deleteButton');
    div.append(deleteButton);

    section.append(div);
}

//user can input image link and text to make meme using the form
form.addEventListener('submit', function (event) {
    event.preventDefault();

    //requires an image link input to generate a meme
    if (!imageInput.value) {
        return;
    }

    //construct the meme according to user's input
    const meme = document.createElement('div');
    meme.dataset.memeID = memeID;
    meme.classList.add('meme');
    meme.style.background = `center / cover black url(${imageInput.value})`;

    const topText = document.createElement('p');
    topText.innerText = topTextInput.value;
    topText.classList.add('topText');
    meme.append(topText);

    const bottomText = document.createElement('p');
    bottomText.innerText = bottomTextInput.value;
    bottomText.classList.add('bottomText');
    meme.append(bottomText);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '&#10006;';
    deleteButton.classList.add('deleteButton');
    meme.append(deleteButton);

    section.append(meme);

    //make a meme object (consisting of ID, image link, top and bottom texts) and add to an array
    memesArray.push({ memeID: memeID, image: imageInput.value, topText: topTextInput.value, bottomText: bottomTextInput.value });
    //save this array of meme objects to localStorage
    localStorage.setItem("memes", JSON.stringify(memesArray));

    memeID++;
    form.reset();
});

//remove meme when user clicks the 'x' button
//removes the meme div element, deletes the corresponding element in the array of meme objects, and updates localStorage
section.addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON') {
        for (let i = 0; i < memesArray.length; i++) {
            if (event.target.parentElement.dataset.memeID == memesArray[i].memeID) {
                memesArray.splice(i, 1);
            }
        }
        localStorage.setItem("memes", JSON.stringify(memesArray));

        event.target.parentElement.remove();
        memeID--;
    }
});

