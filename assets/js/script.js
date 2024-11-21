document.addEventListener('DOMContentLoaded', () => {
    const components = document.getElementsByClassName('funcomps');
    const resetButton = document.getElementById('resetButton');
    const submitButton = document.querySelector('input[type="submit"]'); // Using querySelector for the submit button
    const draggableItems = document.getElementsByClassName('funcomps');
    const subboxes = document.getElementsByClassName('subbox');

    const originalPositions = Array.from(components).map(component => ({
        id: component.id,
        parent: component.parentNode,
        index: Array.from(component.parentNode.children).indexOf(component)
    }));

    const correctPlacements = {
        cpu: "1", // CPU should be in subbox with id "1"
        ram: "3", // RAM should be in subbox with id "2"
        psu: "4", // PSU should be in subbox with id "3"
        storage: "5", // Storage should be in subbox with id "4"
        gpu: "2" // GPU should be in subbox with id "5"
    };

    function resetComponents() {
        Array.from(originalPositions).forEach(pos => {
            const component = document.getElementById(pos.id);
            pos.parent.appendChild(component);
            const parentChildren = Array.from(pos.parent.children);
            pos.parent.insertBefore(component, parentChildren[pos.index]);
        });

        // Hide all correct and incorrect divs initially
        Array.from(document.getElementsByClassName('check')).forEach(check => {
            check.style.display = 'none';
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

    // Using querySelector for submit button
    submitButton.addEventListener('click', () => {
        // Hide all correct and incorrect divs initially
        Array.from(document.getElementsByClassName('check')).forEach(check => {
            check.style.display = 'none';
        });
    
        // Check each funcomp against the correct placements
        Object.entries(correctPlacements).forEach(([funcompId, subboxId]) => {
            const funcompElement = document.getElementById(funcompId);
            const parentSubbox = funcompElement.parentNode.id;
    
            // Show the correct or incorrect div based on placement
            if (parentSubbox === subboxId) {
                document.getElementById(`correct-${funcompId}`).style.display = 'block'; // Show correct div
            } else {
                document.getElementById(`incorrect-${funcompId}`).style.display = 'block'; // Show incorrect div
            }
        });
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
            if (dropzone.children.length === 2) {
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