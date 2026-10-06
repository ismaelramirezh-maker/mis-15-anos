document.addEventListener("DOMContentLoaded", function () {

    const parametros = new URLSearchParams(window.location.search);

    const invitado = parametros.get("invitado");

    const nombreInvitado = document.getElementById("nombreInvitado");
    const botonWhatsapp = document.getElementById("botonWhatsapp");

    const numeroWhatsapp = "573508394295";

    if (invitado) {
        nombreInvitado.textContent = invitado;
    }

    const nombreParaMensaje = invitado || "Ismael Ramirez";

    const mensaje =
        `¡Hola! Soy ${nombreParaMensaje}, quiero hoy confirmar mi asistencia a la fiesta de los 15s años de Sara, ¡Gracias por tu invitación!`;

    const enlaceWhatsapp =
        `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensaje)}`;

    botonWhatsapp.href = enlaceWhatsapp;


    /* =========================
       REPRODUCTOR DE MÚSICA
       ========================= */

    const musica = document.getElementById("musicaInvitacion");
    const botonMusica = document.getElementById("botonMusica");
    const reproductor = document.querySelector(".reproductor-musica");
    const pantallaMusica = document.getElementById("pantallaMusica");
const cerrarMusica = document.getElementById("cerrarMusica");
const botonMusicaGrande = document.getElementById("botonMusicaGrande");
const progresoMusica = document.getElementById("progresoMusica");
const tiempoActual = document.getElementById("tiempoActual");
const duracionMusica = document.getElementById("duracionMusica");
const volumenMusica = document.getElementById("volumenMusica");
const iconoVolumen = document.getElementById("iconoVolumen");

    musica.volume = 0.7;


    function actualizarBotonMusica() {

        if (musica.paused) {

            botonMusica.textContent = "▶";
            reproductor.classList.remove("reproduciendo");

        } else {

            botonMusica.textContent = "❚❚";
            reproductor.classList.add("reproduciendo");

        }

    }


    /*
       Iniciar música con la primera
       interacción del invitado
    */

    function iniciarMusica() {

        if (!musica.paused) return;

        musica.play()
            .then(() => {

                actualizarBotonMusica();

                document.removeEventListener("click", iniciarMusica);
                document.removeEventListener("touchstart", iniciarMusica);
                document.removeEventListener("pointerdown", iniciarMusica);

            })
            .catch(() => {

                // Si el navegador bloquea la reproducción,
                // esperamos otra interacción.

            });

    }


    /*
       Primera interacción
    */

    document.addEventListener("click", iniciarMusica);
    document.addEventListener("touchstart", iniciarMusica);
    document.addEventListener("pointerdown", iniciarMusica);


    /*
       Botón de reproducir / pausar
    */

    botonMusica.addEventListener("click", function (e) {

        e.stopPropagation();

        if (musica.paused) {

            musica.play()
                .then(() => {
                    actualizarBotonMusica();
                })
                .catch(() => {});

        } else {

            musica.pause();

            actualizarBotonMusica();

        }

    });


    /*
       Si la música cambia de estado por alguna
       razón externa, actualizamos el reproductor.
    */

    musica.addEventListener("play", actualizarBotonMusica);
    musica.addEventListener("pause", actualizarBotonMusica);

    /* =========================
       PANTALLA GRANDE DE MÚSICA
       ========================= */

    function formatearTiempo(segundos) {

        if (!isFinite(segundos)) return "0:00";

        const minutos = Math.floor(segundos / 60);

        const segundosRestantes =
            Math.floor(segundos % 60)
                .toString()
                .padStart(2, "0");

        return `${minutos}:${segundosRestantes}`;
    }


    /* Abrir reproductor grande */

    reproductor.addEventListener("click", function (e) {

        if (e.target.closest(".boton-musica")) return;

        pantallaMusica.classList.add("abierta");

    });


    /* Cerrar */

    cerrarMusica.addEventListener("click", function () {

        pantallaMusica.classList.remove("abierta");

    });


    /* Evitar que un clic dentro cierre la pantalla */

    document.querySelector(".musica-grande").addEventListener(
        "click",
        function (e) {
            e.stopPropagation();
        }
    );


    /* Botón grande */

    botonMusicaGrande.addEventListener("click", function () {

        if (musica.paused) {

            musica.play()
                .then(() => {
                    actualizarBotonMusica();
                })
                .catch(() => {});

        } else {

            musica.pause();

            actualizarBotonMusica();

        }

    });


    /* Actualizar botón grande */

    function actualizarBotonesMusica() {

        actualizarBotonMusica();

        botonMusicaGrande.textContent =
            musica.paused ? "▶" : "❚❚";
    }


    musica.addEventListener("timeupdate", function () {

        if (!musica.duration) return;

        const porcentaje =
            (musica.currentTime / musica.duration) * 100;

        progresoMusica.style.width = `${porcentaje}%`;

        tiempoActual.textContent =
            formatearTiempo(musica.currentTime);

    });


    musica.addEventListener("loadedmetadata", function () {

        duracionMusica.textContent =
            formatearTiempo(musica.duration);

    });


    musica.addEventListener("play", function () {

        actualizarBotonesMusica();

    });


    musica.addEventListener("pause", function () {

        actualizarBotonesMusica();

    });


    /* Barra de progreso */

    document.querySelector(".barra-progreso").addEventListener(
        "click",
        function (e) {

            if (!musica.duration) return;

            const rect = this.getBoundingClientRect();

            const posicion =
                (e.clientX - rect.left) / rect.width;

            musica.currentTime =
                posicion * musica.duration;

        }
    );

/* =========================
       CONTROL DE VOLUMEN
       ========================= */

    volumenMusica.addEventListener("input", function () {

        musica.volume = this.value;

        if (this.value == 0) {

            iconoVolumen.textContent = "🔇";

        } else if (this.value < 0.5) {

            iconoVolumen.textContent = "🔉";

        } else {

            iconoVolumen.textContent = "🔊";

        }

    });

});

/* =========================================
   CUENTA REGRESIVA · MIS 15 AÑOS
========================================= */

const fechaFiesta = new Date("November 28, 2026 19:00:00").getTime();

function actualizarCuentaRegresiva() {

    const ahora = new Date().getTime();

    const diferencia = fechaFiesta - ahora;


    if (diferencia <= 0) {

        document.getElementById("dias").textContent = "00";
        document.getElementById("horas").textContent = "00";
        document.getElementById("minutos").textContent = "00";
        document.getElementById("segundos").textContent = "00";

        return;
    }


    const dias = Math.floor(
        diferencia / (1000 * 60 * 60 * 24)
    );


    const horas = Math.floor(
        (diferencia % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );


    const minutos = Math.floor(
        (diferencia % (1000 * 60 * 60))
        / (1000 * 60)
    );


    const segundos = Math.floor(
        (diferencia % (1000 * 60))
        / 1000
    );


    document.getElementById("dias").textContent =
        String(dias).padStart(2, "0");


    document.getElementById("horas").textContent =
        String(horas).padStart(2, "0");


    document.getElementById("minutos").textContent =
        String(minutos).padStart(2, "0");


    document.getElementById("segundos").textContent =
        String(segundos).padStart(2, "0");

}


actualizarCuentaRegresiva();


setInterval(
    actualizarCuentaRegresiva,
    1000
);
