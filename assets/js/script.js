document.addEventListener('DOMContentLoaded', () => {
    const components = document.getElementsByClassName('funcomps');
    const resetButton = document.getElementById('resetButton');
    const draggableItems = document.getElementsByClassName('funcomps');
    const subboxes = document.getElementsByClassName('subbox');

    const originalPositions = Array.from(components).map(component => ({
        id: component.id,
        parent: component.parentNode,
        index: Array.from(component.parentNode.children).indexOf(component)
    }));

    function resetComponents() {
        Array.from(originalPositions).forEach(pos => {
            const component = document.getElementById(pos.id);
            pos.parent.appendChild(component);
            const parentChildren = Array.from(pos.parent.children);
            pos.parent.insertBefore(component, parentChildren[pos.index]);
        });
    }

    resetButton.addEventListener('click', resetComponents);

    Array.from(draggableItems).forEach(item => {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragend', dragEnd);
    });

    Array.from(subboxes).forEach(subbox => {
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
    
        // Check if the dropzone is a valid subbox (not a funcomp)
        if (dropzone.classList.contains('subbox')) {
            // Check if the dropzone already has a child
            if (dropzone.children.length === 0) {
                dropzone.appendChild(draggableElement);
            } else {
                // If the dropzone is occupied, return the draggable element to its original position
                const originalPosition = originalPositions.find(pos => pos.id === id);
                if (originalPosition) {
                    originalPosition.parent.appendChild(draggableElement);
                    const parentChildren = Array.from(originalPosition.parent.children);
                    originalPosition.parent.insertBefore(draggableElement, parentChildren[originalPosition.index]);
                }
            }
        } else {
            // If the dropzone is not a subbox, return the draggable element to its original position
            const originalPosition = originalPositions.find(pos => pos.id === id);
            if (originalPosition) {
                originalPosition.parent.appendChild(draggableElement);
                const parentChildren = Array.from(originalPosition.parent.children);
                originalPosition.parent.insertBefore(draggableElement, parentChildren[originalPosition.index]);
            }
        }
    }
});