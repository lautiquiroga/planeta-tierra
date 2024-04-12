import { Application } from "@splinetool/runtime";

const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);
const btn = document.querySelector('.btn');
let tractorClicked = false; // Variable para verificar si el tractor fue clickeado
const card1 = document.querySelector('.card1');
const card2 = document.querySelector('.card2');
const closeBtns = document.querySelectorAll('.closeBtn');

app
    .load('https://prod.spline.design/2j8azjL2GtoGDVRu/scene.splinecode')
    .then(() => {
        const obj = app.findObjectByName('tractor');
        const path = app.findObjectByName('Path');
        const path2 = app.findObjectByName('Path 2');
        const obj2 = app.findObjectByName('tractor 2');
        console.log(obj);
        path.visible = false;
        path2.visible = false;
        obj2.visible = false;

        app.addEventListener('mouseDown', (e) => {
            console.log(e.target.name);
            if (e.target.name === 'tractor') {
                console.log('I have been clicked!');
                tractorClicked = !tractorClicked; // Cambia el estado de la variable si el tractor fue clickeado nuevamente
                console.log(obj.position.x);
                if (tractorClicked) {
                    console.log('tractor clickeado');
                    // Centra la cámara en el tractor
                    app._camera.position.x = obj.position.x;
                    app._camera.position.y = obj.position.y;
                    app._camera.position.z = obj.position.z;
                    card1.style.display = 'block';
                    path.visible = true;
                    obj2.visible = true;
                    path2.visible = true;
                    // Aplica un zoom de 2.5
                    app.setZoom(1.5);
                } else {
                    card1.style.display = 'none';
                    card2.style.display = 'none';
                    path.visible = false;
                    path2.visible = false;
                    obj2.visible = false;
                }
            }
            if (e.target.name === 'tractor 2') {
                card1.style.display = 'none';
                card2.style.display = 'block';
                app._camera.position.x = obj2.position.x;
                app._camera.position.y = obj2.position.y;
                app._camera.position.z = obj2.position.z;
                app.setZoom(1.5);
            }
        });

        btn.addEventListener('click', function () {
            app.emitEvent('mouseDown', 'tractor');
            setTimeout(() => {
                obj.visible = true;
            }, 100);
        });

        // Actualiza la visibilidad del tractor cuando se hace scroll o clickea el botón
        function updateTractorVisibility() {
            if (!tractorClicked && app._camera.zoom <= 2) { // Verifica si el tractor no fue clickeado y el zoom es menor o igual a 2
                obj.visible = false;
            } else {
                obj.visible = true;
            }
        }

        setTimeout(() => {
            updateTractorVisibility(); // Llama a la función al cargar la página

        }, 1000);

        canvas.addEventListener('wheel', updateTractorVisibility); // Escucha el evento de la rueda del mouse

        // Agrega un listener para el evento touchmove en el canvas
        canvas.addEventListener('touchmove', function (e) {
            // Verifica si hay dos toques (gesto de pellizcar)
            if (e.touches.length === 2) {


                // Llama a la función para actualizar la visibilidad del tractor
                updateTractorVisibility();
            }
        });

        closeBtns.forEach((closeBtn) => {
            closeBtn.addEventListener('click', () => {
                card1.style.display = 'none';
                card2.style.display = 'none';
            })
        })

    });
