const paginas = {
    INICIO: 'inicio',
    SERVICIOS: 'servicios',
    INSTALACIONES: 'instalaciones',
    RESERVAR: 'reservar'
};

const identificadores = {
    INICIO: 'pagina-inicio',
    SERVICIOS: 'pagina-servicios',
    INSTALACIONES: 'pagina-instalaciones',
    RESERVAR: 'pagina-reservar'
};

function navegar(pagina) {
    switch (pagina) {
        case paginas.INICIO: desplazar(identificadores.INICIO); break;
        case paginas.SERVICIOS: desplazar(identificadores.SERVICIOS); break;
        case paginas.INSTALACIONES: desplazar(identificadores.INSTALACIONES); break;
        case paginas.RESERVAR: desplazar(identificadores.RESERVAR); break;
        default: desplazar(identificadores.INICIO); break;
    }
}

function desplazar(pagina) {
    document.getElementById(pagina).scrollIntoView();
}
