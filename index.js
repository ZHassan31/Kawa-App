document.addEventListener('DOMContentLoaded', (event) => {
    const draggableElements = document.querySelectorAll('.image-container img');
    const dropZone = document.getElementById('container');

    draggableElements.forEach(elem => {
        elem.addEventListener('mousedown', (e) => {
            e.preventDefault();

            const clone = elem.cloneNode(true);
            clone.style.position = 'absolute';
            clone.style.zIndex = 1000;
            document.body.appendChild(clone);

            moveAt(e.pageX, e.pageY);

            function moveAt(pageX, pageY) {
                clone.style.left = pageX - clone.offsetWidth / 2 + 'px';
                clone.style.top = pageY - clone.offsetHeight / 2 + 'px';
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener('mousemove', onMouseMove);

            clone.addEventListener('mouseup', (event) => {
                document.removeEventListener('mousemove', onMouseMove);

                const rect = dropZone.getBoundingClientRect();
                if (event.pageX >= rect.left && event.pageX <= rect.right && event.pageY >= rect.top && event.pageY <= rect.bottom) {
                    dropZone.appendChild(clone);
                    clone.style.left = event.pageX - rect.left - clone.offsetWidth / 2 + 'px';
                    clone.style.top = event.pageY - rect.top - clone.offsetHeight / 2 + 'px';
                    makeDraggable(clone);
                } else {
                    clone.remove();
                }

                clone.removeEventListener('mouseup', arguments.callee);
            });
        });
    });

    function makeDraggable(element) {
        element.addEventListener('mousedown', (e) => {
            e.preventDefault();

            let offsetX = e.clientX - element.getBoundingClientRect().left;
            let offsetY = e.clientY - element.getBoundingClientRect().top;

            function moveAt(pageX, pageY) {
                const rect = dropZone.getBoundingClientRect();
                let newX = pageX - rect.left - offsetX;
                let newY = pageY - rect.top - offsetY;

                // Constrain within the drop zone
                if (newX < 0) newX = 0;
                if (newY < 0) newY = 0;
                if (newX + element.offsetWidth > rect.width) newX = rect.width - element.offsetWidth;
                if (newY + element.offsetHeight > rect.height) newY = rect.height - element.offsetHeight;

                element.style.left = newX + 'px';
                element.style.top = newY + 'px';
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener('mousemove', onMouseMove);

            document.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', onMouseMove);
            }, { once: true });
        });
    }
});
