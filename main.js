const storyElement = document.getElementById('story');
const choicesElement = document.getElementById('choices');
const story = new inkjs.Story(storyContent);

function updateChoices(choices) {
    choicesElement.innerHTML = '';
    for (const choice of choices) {
        const choiceElement = document.createElement('p');
        choiceElement.classList.add('choice');
        choiceElement.textContent = choice.text;
        choiceElement.addEventListener('click', e => {
            e.preventDefault();
            makeChoice(choice.index)
        });
        choicesElement.appendChild(choiceElement);
    }
}

function updateStory(story) {
    const el = document.createElement('p');
    el.textContent = story;
    el.classList.add('story');
    storyElement.appendChild(el);
}

function updateVariables(state) {
    for (let i=1; i<=6; i++) {
        const count = state[`station_${i}_count`];
        const el = document.getElementById(`station-${i}`);
        el.textContent = `station ${i}: ${count}`;
    }
    const {fuel_count, ticket} = state;
    document.getElementById('fuel').textContent = `fuel: ${fuel_count}`;
    document.getElementById('ticket').textContent = `ticket: ${ticket}`;
}

function makeChoice(choiceIndex) {
    story.ChooseChoiceIndex(choiceIndex);
    continueStory();
}

function clearStory() {
    storyElement.innerHTML = '';
}

function continueStory() {
    if (story.currentTags.includes('CLEAR')) clearStory();
    updateVariables(story.variablesState);

    if (story.canContinue) {
        const nextStory = story.Continue();
        if (nextStory.length > 0) {
            updateStory(nextStory);
        }
        
    }

    const choices = story.currentChoices;
    if (choices.length > 0) {
        updateChoices(choices);
        
    } else {
        continueStory();
    }
}

continueStory();
