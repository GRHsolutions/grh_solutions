export default function formatearFecha(
    fecha: any, 
    takeDate: boolean = true, 
    takeHour: boolean = true
): string {
    if (!fecha) return '';
    
    try {
        const fechaObj = new Date(fecha);
        if (isNaN(fechaObj.getTime())) return ''; // Valida fecha inválida
        
        // Formato para fecha y hora
        const opcionesFecha: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const opcionesHora: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
        
        const fechaFormateada = takeDate 
            ? new Intl.DateTimeFormat('es-ES', opcionesFecha).format(fechaObj) 
            : '';
        const horaFormateada = takeHour 
            ? new Intl.DateTimeFormat('es-ES', opcionesHora).format(fechaObj) 
            : '';
        
        // Construcción del resultado
        if (takeDate && takeHour) {
            return `${fechaFormateada} - ${horaFormateada}`;
        }
        return takeDate ? fechaFormateada : horaFormateada;
    } catch {
        return '';
    }
}
