const tasksListElement = document.querySelector(`.tasks__list`);

tasksListElement.addEventListener(`dragstart`, (e) => {
    e.target.classList.add(`selected`);
});

tasksListElement.addEventListener(`dragend`, (e) => {
    e.target.classList.remove(`selected`);
});

const getNextElement = (cursorPosition, currentElement) => {
    const currentElementCoords = currentElement.getBoundingClientRect();
    const currentElementCenter = currentElementCoords.y + currentElementCoords.height / 2;

    return (cursorPosition < currentElementCenter) ?
        currentElement :
        currentElement.nextElementSibling;
};

tasksListElement.addEventListener(`dragover`, (e) => {
    e.preventDefault();

    const activeElement = tasksListElement.querySelector(`.selected`);
    const currentElement = e.target;
    const isMoveable = activeElement !== currentElement && currentElement.classList.contains(`tasks__item`);

    if (!isMoveable) return;

    const nextElement = getNextElement(e.clientY, currentElement);

    if (
        nextElement &&
        activeElement === nextElement.previousElementSibling ||
        activeElement === nextElement
    ) return;

    tasksListElement.insertBefore(activeElement, nextElement);
});
