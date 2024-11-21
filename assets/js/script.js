document.addEventListener('DOMContentLoaded', () => {
    const components = document.querySelectorAll('.funcomps');
    const resetButton = document.getElementById('resetButton');
    const draggableItems = document.querySelectorAll('.funcomps');
    const subboxes = document.querySelectorAll('.subbox');

    const originalPositions = Array.from(components).map(component => ({
        id: component.id,
        parent: component.parentNode,
        index: Array.from(component.parentNode.children).indexOf(component)
    }));

    function resetComponents() {
        originalPositions.forEach(pos => {
            const component = document.getElementById(pos.id);
            pos.parent.appendChild(component);
            const parentChildren = Array.from(pos.parent.children);
            pos.parent.insertBefore(component, parentChildren[pos.index]);
        });
    }

    resetButton.addEventListener('click', resetComponents);

    draggableItems.forEach(item => {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragend', dragEnd);
    });

    subboxes.forEach(subbox => {
        subbox.addEventListener('dragover', dragOver);
        subbox.addEventListener('drop', drop);
    });

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        e.target.classList.add('dragging');
    }

    function dragEnd(e) {
        e.target.classList.remove('dragging');
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function drop(e) {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        const draggableElement = document.getElementById(id);
        const dropzone = e.target;
        dropzone.appendChild(draggableElement);
    }
});