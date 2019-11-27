$(document).ready(function () {
    if (typeof (Storage) !== undefined) {
        if (!sessionStorage.token || haExpiradoToken()) {
            $(".boton-login").show();
            $(".boton-logout").hide();
        } else {
            $(".boton-login").hide();
            $(".boton-logout").show();
        }
    }
});

function iniciarSesion() {
    if (typeof (Storage) !== undefined) {
        if (sessionStorage.token) {
            if (haExpiradoToken()) {
                completarInicioSesion();
            } else {
                desplazar(identificadores.LOGIN);
                alert('Ya has iniciado sesión');
            }
        }
        else {
            completarInicioSesion();
        }
    }
}

function haExpiradoToken() {
    if (sessionStorage.tokenDate < new Date().valueOf()) {
        return true;
    } else {
        return false;
    }
}

function completarInicioSesion() {
    const url = 'http://fenw.etsisi.upm.es:10000/users/login';
    const usuario = document.getElementById('form-username').value;
    const contrasenia = document.getElementById('form-password').value;

    $.ajax({
        url: url,
        type: 'GET',
        data: {
            username: usuario,
            password: contrasenia
        },
        success: function (data) {
            const fechaActual = new Date();
            const fechaExpiracion = new Date(fechaActual);
            const duracionToken = 10;

            fechaExpiracion.setMinutes(fechaActual.getMinutes() + duracionToken);

            sessionStorage.token = data;
            sessionStorage.tokenDate = fechaExpiracion.valueOf();

            desplazar(identificadores.INICIO);
            $(".boton-registrar").hide();
            $(".boton-login").hide();
            $(".boton-logout").show();
        },
        error: function (error) {
            alert('Lo sentimos, no se ha podido iniciar sesión, inténtelo de nuevo más tarde.');
        },
    });
}

function cerrarSesion() {
    sessionStorage.clear();
    desplazar(identificadores.LOGIN);
    $(".boton-registrar").show();
    $(".boton-login").show();
    $(".boton-logout").hide();
}

function validarFormulario() {
    const contrasenia = document.getElementById('form-password-register').value;
    const contraseniaRepetida = document.getElementById('form-password-register-repeat').value;
    
    if (contrasenia !== contraseniaRepetida) {
        alert('Las contraseñas introducidas no coinciden.');
    }
}