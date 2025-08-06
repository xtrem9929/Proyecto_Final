// Base de datos local usando localStorage
class Database {
    constructor() {
        this.reportes = this.getFromStorage('reportes') || [];
        this.puntosAcopio = this.getFromStorage('puntosAcopio') || [];
        this.contactos = this.getFromStorage('contactos') || [];
        this.initializeDefaultData();
    }

    getFromStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error al leer del localStorage:', error);
            return null;
        }
    }

    saveToStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error('Error al guardar en localStorage:', error);
        }
    }

    initializeDefaultData() {
        if (this.reportes.length === 0) {
            this.reportes = [
                {
                    id: 1,
                    titulo: "Acumulación de basura en Av. Municipalidad",
                    descripcion: "Gran cantidad de residuos sólidos acumulados en la esquina",
                    prioridad: "alta",
                    ubicacion: "Av. Municipalidad 123",
                    fecha: "2024-01-15",
                    estado: "pendiente",
                    imagen: "images/basura-acumulada-esquina.png"
                },
                {
                    id: 2,
                    titulo: "Contenedor desbordado en Plaza de Armas",
                    descripcion: "Contenedor de basura completamente lleno y desbordando",
                    prioridad: "media",
                    ubicacion: "Plaza de Armas",
                    fecha: "2024-01-14",
                    estado: "en-proceso",
                    imagen: "images/lleno-contenedor-basura.png"
                }
            ];
            this.saveToStorage('reportes', this.reportes);
        }

        if (this.puntosAcopio.length === 0) {
            this.puntosAcopio = [
                {
                    id: 1,
                    titulo: "Centro de Reciclaje Municipal",
                    descripcion: "Centro principal de acopio de materiales reciclables",
                    tipoResiduos: "Papel, Plástico, Vidrio",
                    ubicacion: "Calle Los Ángeles 456",
                    telefono: "+51 956 123 456",
                    horario: "Lunes a Viernes 8:00 AM - 6:00 PM",
                    fecha: "2024-01-10"
                },
                {
                    id: 2,
                    titulo: "Punto Verde Mercado Central",
                    descripcion: "Punto de acopio en el mercado central",
                    tipoResiduos: "Orgánicos, Papel",
                    ubicacion: "Mercado Central - Stand 15",
                    telefono: "+51 956 789 123",
                    horario: "Todos los días 6:00 AM - 4:00 PM",
                    fecha: "2024-01-08"
                }
            ];
            this.saveToStorage('puntosAcopio', this.puntosAcopio);
        }
    }

    // Métodos para reportes
    addReporte(reporte) {
        reporte.id = Date.now();
        reporte.fecha = new Date().toISOString().split('T')[0];
        reporte.estado = 'pendiente';
        this.reportes.push(reporte);
        this.saveToStorage('reportes', this.reportes);
        return reporte;
    }

    getReportes() {
        return this.reportes;
    }

    updateReporte(id, updates) {
        const index = this.reportes.findIndex(r => r.id === id);
        if (index !== -1) {
            this.reportes[index] = { ...this.reportes[index], ...updates };
            this.saveToStorage('reportes', this.reportes);
            return this.reportes[index];
        }
        return null;
    }

    deleteReporte(id) {
        this.reportes = this.reportes.filter(r => r.id !== id);
        this.saveToStorage('reportes', this.reportes);
    }

    // Métodos para puntos de acopio
    addPuntoAcopio(punto) {
        punto.id = Date.now();
        punto.fecha = new Date().toISOString().split('T')[0];
        this.puntosAcopio.push(punto);
        this.saveToStorage('puntosAcopio', this.puntosAcopio);
        return punto;
    }

    getPuntosAcopio() {
        return this.puntosAcopio;
    }

    deletePuntoAcopio(id) {
        this.puntosAcopio = this.puntosAcopio.filter(p => p.id !== id);
        this.saveToStorage('puntosAcopio', this.puntosAcopio);
    }

    // Métodos para contactos
    addContacto(contacto) {
        contacto.id = Date.now();
        contacto.fecha = new Date().toISOString().split('T')[0];
        this.contactos.push(contacto);
        this.saveToStorage('contactos', this.contactos);
        return contacto;
    }
}

// Instancia global de la base de datos
const db = new Database();

// Variables globales
let currentPage = 'inicio';
let currentTab = 'ver-mapa';
let currentBlogTab = 'contenido';

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    updateStats();
    loadReportes();
    loadPuntosAcopio();
    setupEventListeners();
});

function initializeApp() {
    showPage('inicio');
    updateNavigation();
}

function setupEventListeners() {
    // Formulario de reportes
    const reportForm = document.getElementById('reportForm');
    if (reportForm) {
        reportForm.addEventListener('submit', handleReportSubmit);
    }

    // Formulario de puntos de acopio
    const acopioForm = document.getElementById('acopioForm');
    if (acopioForm) {
        acopioForm.addEventListener('submit', handleAcopioSubmit);
    }

    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Upload de imágenes
    const imageInput = document.getElementById('reportImagen');
    if (imageInput) {
        imageInput.addEventListener('change', handleImageUpload);
    }

    // Cerrar modales al hacer clic fuera
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target.id);
        }
    });
}

// Navegación
function showPage(pageName) {
    // Ocultar todas las páginas
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Mostrar la página seleccionada
    const targetPage = document.getElementById(pageName);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageName;
        updateNavigation();
        
        // Actualizar datos específicos de la página
        if (pageName === 'blog') {
            loadBlogData();
        } else if (pageName === 'mapa') {
            updateMapMetrics();
        }
    }

    // Cerrar menú móvil
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.classList.remove('active');
    }
}

function updateNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.textContent.toLowerCase() === currentPage) {
            link.classList.add('active');
        }
    });
}

function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// Tabs
function showTab(tabName) {
    // Ocultar todos los contenidos de tabs
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));

    // Mostrar el contenido seleccionado
    const targetContent = document.getElementById(tabName);
    if (targetContent) {
        targetContent.classList.add('active');
        currentTab = tabName;
    }

    // Actualizar botones de tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.textContent.toLowerCase().includes(tabName.replace('-', ' '))) {
            tab.classList.add('active');
        }
    });
}

function showBlogTab(tabName) {
    // Ocultar todos los contenidos de blog tabs
    const blogContents = document.querySelectorAll('.blog-content');
    blogContents.forEach(content => content.classList.remove('active'));

    // Mostrar el contenido seleccionado
    const targetContent = document.getElementById(tabName);
    if (targetContent) {
        targetContent.classList.add('active');
        currentBlogTab = tabName;
    }

    // Actualizar botones de blog tabs
    const blogTabs = document.querySelectorAll('.blog-tab');
    blogTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.textContent.toLowerCase().includes(tabName)) {
            tab.classList.add('active');
        }
    });

    // Cargar datos específicos del tab
    if (tabName === 'reportes') {
        loadReportes();
    } else if (tabName === 'puntos') {
        loadPuntosAcopio();
    }
}

// Estadísticas
function updateStats() {
    const reportes = db.getReportes();
    const puntosAcopio = db.getPuntosAcopio();

    // Actualizar estadísticas principales
    const statReportes = document.getElementById('statReportes');
    const statPuntos = document.getElementById('statPuntos');
    
    if (statReportes) statReportes.textContent = reportes.length;
    if (statPuntos) statPuntos.textContent = puntosAcopio.length;

    // Actualizar contadores en blog
    const blogReportesCount = document.getElementById('blogReportesCount');
    const blogPuntosCount = document.getElementById('blogPuntosCount');
    
    if (blogReportesCount) blogReportesCount.textContent = reportes.length;
    if (blogPuntosCount) blogPuntosCount.textContent = puntosAcopio.length;

    // Actualizar contadores en mapa
    const reportesCount = document.getElementById('reportesCount');
    const acopiosCount = document.getElementById('acopiosCount');
    
    if (reportesCount) reportesCount.textContent = reportes.length;
    if (acopiosCount) acopiosCount.textContent = puntosAcopio.length;
}

function updateMapMetrics() {
    const reportes = db.getReportes();
    const reportesActivos = document.getElementById('reportesActivos');
    const puntosAcopioEl = document.getElementById('puntosAcopio');
    const reportesResueltos = document.getElementById('reportesResueltos');

    if (reportesActivos) {
        reportesActivos.textContent = reportes.filter(r => r.estado === 'pendiente').length;
    }
    
    if (puntosAcopioEl) {
        puntosAcopioEl.textContent = db.getPuntosAcopio().length;
    }
    
    if (reportesResueltos) {
        const resueltos = reportes.filter(r => r.estado === 'resuelto').length;
        const porcentaje = reportes.length > 0 ? Math.round((resueltos / reportes.length) * 100) : 0;
        reportesResueltos.textContent = `${porcentaje}%`;
    }
}

// Manejo de formularios
function handleReportSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const imageFile = document.getElementById('reportImagen').files[0];
    
    const reporte = {
        titulo: document.getElementById('reportTitulo').value,
        descripcion: document.getElementById('reportDescripcion').value,
        prioridad: document.getElementById('reportPrioridad').value,
        ubicacion: document.getElementById('reportUbicacion').value,
        imagen: imageFile ? URL.createObjectURL(imageFile) : null
    };

    // Validar campos requeridos
    if (!reporte.titulo || !reporte.descripcion || !reporte.prioridad || !reporte.ubicacion) {
        showNotification('Por favor, completa todos los campos requeridos', 'error');
        return;
    }

    // Guardar reporte
    db.addReporte(reporte);
    
    // Limpiar formulario
    event.target.reset();
    
    // Actualizar estadísticas
    updateStats();
    updateMapMetrics();
    
    // Mostrar notificación
    showNotification('Reporte enviado exitosamente');
    
    // Recargar reportes si estamos en la página de blog
    if (currentPage === 'blog' && currentBlogTab === 'reportes') {
        loadReportes();
    }
}

function handleAcopioSubmit(event) {
    event.preventDefault();
    
    const punto = {
        titulo: document.getElementById('acopioTitulo').value,
        descripcion: document.getElementById('acopioDescripcion').value,
        tipoResiduos: document.getElementById('acopioTipoResiduos').value,
        ubicacion: document.getElementById('acopioUbicacion').value,
        telefono: document.getElementById('acopioTelefono').value,
        horario: document.getElementById('acopioHorario').value
    };

    // Validar campos requeridos
    if (!punto.titulo || !punto.tipoResiduos || !punto.ubicacion) {
        showNotification('Por favor, completa todos los campos requeridos', 'error');
        return;
    }

    // Guardar punto de acopio
    db.addPuntoAcopio(punto);
    
    // Limpiar formulario
    event.target.reset();
    
    // Actualizar estadísticas
    updateStats();
    updateMapMetrics();
    
    // Mostrar notificación
    showNotification('Punto de acopio registrado exitosamente');
    
    // Recargar puntos si estamos en la página de blog
    if (currentPage === 'blog' && currentBlogTab === 'puntos') {
        loadPuntosAcopio();
    }
}

function handleContactSubmit(event) {
    event.preventDefault();
    
    const contacto = {
        nombre: document.getElementById('contactNombre').value,
        email: document.getElementById('contactEmail').value,
        telefono: document.getElementById('contactTelefono').value,
        asunto: document.getElementById('contactAsunto').value,
        mensaje: document.getElementById('contactMensaje').value,
        terminos: document.getElementById('contactTerminos').checked,
        newsletter: document.getElementById('contactNewsletter').checked
    };

    // Validar campos requeridos
    if (!contacto.nombre || !contacto.email || !contacto.asunto || !contacto.mensaje || !contacto.terminos) {
        showNotification('Por favor, completa todos los campos requeridos y acepta los términos', 'error');
        return;
    }

    // Guardar contacto
    db.addContacto(contacto);
    
    // Limpiar formulario
    event.target.reset();
    
    // Mostrar notificación
    showNotification('Consulta enviada exitosamente. Te contactaremos pronto.');
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        // Validar tipo de archivo
        if (!file.type.startsWith('image/')) {
            showNotification('Por favor, selecciona un archivo de imagen válido', 'error');
            event.target.value = '';
            return;
        }
        
        // Validar tamaño (10MB máximo)
        if (file.size > 10 * 1024 * 1024) {
            showNotification('El archivo es demasiado grande. Máximo 10MB', 'error');
            event.target.value = '';
            return;
        }
        
        // Actualizar texto del upload
        const uploadContent = event.target.parentElement.querySelector('.file-upload-content p');
        if (uploadContent) {
            uploadContent.textContent = file.name;
        }
    }
}

// Carga de datos
function loadReportes() {
    const reportes = db.getReportes();
    const reportesList = document.getElementById('reportesList');
    
    if (!reportesList) return;
    
    if (reportes.length === 0) {
        reportesList.innerHTML = '<div class="no-data">No hay reportes disponibles</div>';
        return;
    }
    
    reportesList.innerHTML = reportes.map(reporte => `
        <div class="report-card red" onclick="showReportModal(${reporte.id})">
            ${reporte.imagen ? `<img src="${reporte.imagen}" alt="${reporte.titulo}" class="card-image">` : ''}
            <div class="card-content">
                <div class="card-badges">
                    <div class="priority-badge ${reporte.prioridad}">${reporte.prioridad.charAt(0).toUpperCase() + reporte.prioridad.slice(1)} Prioridad</div>
                    <div class="status-badge ${reporte.estado}">${reporte.estado === 'en-proceso' ? 'En Proceso' : reporte.estado.charAt(0).toUpperCase() + reporte.estado.slice(1)}</div>
                </div>
                <h3 class="card-title">${reporte.titulo}</h3>
                <p class="card-description">${reporte.descripcion.substring(0, 100)}...</p>
                <div class="card-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${reporte.ubicacion}</span>
                </div>
                <div class="card-date">${reporte.fecha}</div>
            </div>
        </div>
    `).join('');
}

function loadPuntosAcopio() {
    const puntos = db.getPuntosAcopio();
    const puntosList = document.getElementById('puntosList');
    
    if (!puntosList) return;
    
    if (puntos.length === 0) {
        puntosList.innerHTML = '<div class="no-data">No hay puntos de acopio disponibles</div>';
        return;
    }
    
    puntosList.innerHTML = puntos.map(punto => `
        <div class="point-card blue" onclick="showPointModal(${punto.id})">
            <div class="card-content">
                <div class="card-header">
                    <div class="point-icon">
                        <i class="fas fa-recycle"></i>
                    </div>
                    <div>
                        <h3 class="card-title">${punto.titulo}</h3>
                        <div class="card-date">Registrado: ${punto.fecha}</div>
                    </div>
                </div>
                <p class="card-description">${punto.descripcion || "Centro de acopio de materiales reciclables"}</p>
                <div class="point-details">
                    <div class="detail-item">
                        <div class="type-badge">Residuos</div>
                        <span>${punto.tipoResiduos}</span>
                    </div>
                    <div class="card-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${punto.ubicacion}</span>
                    </div>
                    ${punto.telefono ? `
                        <div class="card-location">
                            <i class="fas fa-phone"></i>
                            <span>${punto.telefono}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function loadBlogData() {
    updateStats();
    if (currentBlogTab === 'reportes') {
        loadReportes();
    } else if (currentBlogTab === 'puntos') {
        loadPuntosAcopio();
    }
}

// Modales
function showReportModal(reporteId) {
    const reporte = db.getReportes().find(r => r.id === reporteId);
    if (!reporte) return;
    
    const modal = document.getElementById('reportModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = reporte.titulo;
    modalBody.innerHTML = `
        ${reporte.imagen ? `<img src="${reporte.imagen}" alt="${reporte.titulo}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">` : ''}
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
                <label style="color: #94a3b8; font-size: 0.875rem;">Prioridad</label>
                <div class="priority-badge ${reporte.prioridad}" style="margin-top: 0.25rem;">${reporte.prioridad.charAt(0).toUpperCase() + reporte.prioridad.slice(1)} Prioridad</div>
            </div>
            <div>
                <label style="color: #94a3b8; font-size: 0.875rem;">Estado</label>
                <select onchange="updateReportStatus(${reporte.id}, this.value)" style="width: 100%; margin-top: 0.25rem; padding: 0.5rem; background: #1e293b; border: 1px solid #334155; border-radius: 0.5rem; color: white;">
                    <option value="pendiente" ${reporte.estado === 'pendiente' ? 'selected' : ''}>Pendiente</option>
                    <option value="en-proceso" ${reporte.estado === 'en-proceso' ? 'selected' : ''}>En Proceso</option>
                    <option value="resuelto" ${reporte.estado === 'resuelto' ? 'selected' : ''}>Resuelto</option>
                </select>
            </div>
        </div>
        <div style="margin-bottom: 1rem;">
            <label style="color: #94a3b8; font-size: 0.875rem;">Descripción</label>
            <p style="color: white; margin-top: 0.25rem;">${reporte.descripcion}</p>
        </div>
        <div style="margin-bottom: 1rem;">
            <label style="color: #94a3b8; font-size: 0.875rem;">Ubicación</label>
            <p style="color: white; margin-top: 0.25rem;">${reporte.ubicacion}</p>
        </div>
        <div style="margin-bottom: 1.5rem;">
            <label style="color: #94a3b8; font-size: 0.875rem;">Fecha de Reporte</label>
            <p style="color: white; margin-top: 0.25rem;">${reporte.fecha}</p>
        </div>
        <div style="display: flex; gap: 1rem;">
            <button onclick="updateReportStatus(${reporte.id}, 'resuelto')" class="btn btn-primary" style="flex: 1;">
                <i class="fas fa-eye"></i>
                Marcar como Resuelto
            </button>
            <button onclick="deleteReport(${reporte.id})" class="btn" style="flex: 1; background: linear-gradient(135deg, #ef4444, #dc2626); color: white;">
                <i class="fas fa-trash-2"></i>
                Eliminar
            </button>
        </div>
    `;
    
    modal.classList.add('active');
}

function showPointModal(puntoId) {
    const punto = db.getPuntosAcopio().find(p => p.id === puntoId);
    if (!punto) return;
    
    const modal = document.getElementById('reportModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = punto.titulo;
    modalBody.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
                <label style="color: #94a3b8; font-size: 0.875rem;">Tipo de Residuos</label>
                <p style="color: white; margin-top: 0.25rem;">${punto.tipoResiduos}</p>
            </div>
            <div>
                <label style="color: #94a3b8; font-size: 0.875rem;">Teléfono</label>
                <p style="color: white; margin-top: 0.25rem;">${punto.telefono || "No especificado"}</p>
            </div>
        </div>
        <div style="margin-bottom: 1rem;">
            <label style="color: #94a3b8; font-size: 0.875rem;">Descripción</label>
            <p style="color: white; margin-top: 0.25rem;">${punto.descripcion || "Sin descripción disponible"}</p>
        </div>
        <div style="margin-bottom: 1rem;">
            <label style="color: #94a3b8; font-size: 0.875rem;">Ubicación</label>
            <p style="color: white; margin-top: 0.25rem;">${punto.ubicacion}</p>
        </div>
        <div style="margin-bottom: 1rem;">
            <label style="color: #94a3b8; font-size: 0.875rem;">Horario de Atención</label>
            <p style="color: white; margin-top: 0.25rem;">${punto.horario || "No especificado"}</p>
        </div>
        <div style="margin-bottom: 1.5rem;">
            <label style="color: #94a3b8; font-size: 0.875rem;">Fecha de Registro</label>
            <p style="color: white; margin-top: 0.25rem;">${punto.fecha}</p>
        </div>
        <div style="display: flex; gap: 1rem;">
            <button onclick="showPage('mapa')" class="btn btn-primary" style="flex: 1;">
                <i class="fas fa-map-marker-alt"></i>
                Ver en Mapa
            </button>
            <button onclick="deletePoint(${punto.id})" class="btn" style="flex: 1; background: linear-gradient(135deg, #ef4444, #dc2626); color: white;">
                <i class="fas fa-trash-2"></i>
                Eliminar
            </button>
        </div>
    `;
    
    modal.classList.add('active');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Acciones de reportes y puntos
function updateReportStatus(reporteId, newStatus) {
    db.updateReporte(reporteId, { estado: newStatus });
    closeModal('reportModal');
    loadReportes();
    updateStats();
    updateMapMetrics();
    showNotification('Estado del reporte actualizado');
}

function deleteReport(reporteId) {
    if (confirm('¿Estás seguro de que quieres eliminar este reporte?')) {
        db.deleteReporte(reporteId);
        closeModal('reportModal');
        loadReportes();
        updateStats();
        updateMapMetrics();
        showNotification('Reporte eliminado exitosamente');
    }
}

function deletePoint(puntoId) {
    if (confirm('¿Estás seguro de que quieres eliminar este punto de acopio?')) {
        db.deletePuntoAcopio(puntoId);
        closeModal('reportModal');
        loadPuntosAcopio();
        updateStats();
        updateMapMetrics();
        showNotification('Punto de acopio eliminado exitosamente');
    }
}

// FAQ
function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Cerrar todos los FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Abrir el FAQ clickeado si no estaba activo
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Notificaciones
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    if (notification && notificationText) {
        notificationText.textContent = message;
        
        // Cambiar icono según el tipo
        const icon = notification.querySelector('i');
        if (icon) {
            if (type === 'error') {
                icon.className = 'fas fa-exclamation-circle';
                notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            } else {
                icon.className = 'fas fa-check-circle';
                notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            }
        }
        
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// Utilidades
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function getPriorityColor(prioridad) {
    switch (prioridad) {
        case 'critica': return 'red';
        case 'alta': return 'red';
        case 'media': return 'yellow';
        case 'baja': return 'green';
        default: return 'gray';
    }
}

function getStatusColor(estado) {
    switch (estado) {
        case 'pendiente': return 'orange';
        case 'en-proceso': return 'blue';
        case 'resuelto': return 'green';
        default: return 'gray';
    }
}

// Búsqueda y filtros
function setupSearchAndFilters() {
    const searchInputs = document.querySelectorAll('.search-input');
    const filterSelects = document.querySelectorAll('.filter-select');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', handleSearch);
    });
    
    filterSelects.forEach(select => {
        select.addEventListener('change', handleFilter);
    });
}

function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const currentSection = getCurrentSection();
    
    if (currentSection === 'reportes') {
        filterReportes(searchTerm);
    } else if (currentSection === 'puntos') {
        filterPuntos(searchTerm);
    }
}

function handleFilter(event) {
    const filterValue = event.target.value;
    const currentSection = getCurrentSection();
    
    if (currentSection === 'reportes') {
        filterReportesByStatus(filterValue);
    } else if (currentSection === 'puntos') {
        filterPuntosByType(filterValue);
    }
}

function getCurrentSection() {
    if (currentPage === 'blog') {
        return currentBlogTab;
    }
    return currentPage;
}

function filterReportes(searchTerm) {
    const reportes = db.getReportes().filter(reporte => 
        reporte.titulo.toLowerCase().includes(searchTerm) ||
        reporte.descripcion.toLowerCase().includes(searchTerm) ||
        reporte.ubicacion.toLowerCase().includes(searchTerm)
    );
    renderFilteredReportes(reportes);
}

function filterReportesByStatus(status) {
    const reportes = status ? 
        db.getReportes().filter(reporte => reporte.estado === status) :
        db.getReportes();
    renderFilteredReportes(reportes);
}

function filterPuntos(searchTerm) {
    const puntos = db.getPuntosAcopio().filter(punto => 
        punto.titulo.toLowerCase().includes(searchTerm) ||
        punto.descripcion.toLowerCase().includes(searchTerm) ||
        punto.ubicacion.toLowerCase().includes(searchTerm) ||
        punto.tipoResiduos.toLowerCase().includes(searchTerm)
    );
    renderFilteredPuntos(puntos);
}

function filterPuntosByType(type) {
    const puntos = type ? 
        db.getPuntosAcopio().filter(punto => 
            punto.tipoResiduos.toLowerCase().includes(type.toLowerCase())
        ) :
        db.getPuntosAcopio();
    renderFilteredPuntos(puntos);
}

function renderFilteredReportes(reportes) {
    const reportesList = document.getElementById('reportesList');
    if (!reportesList) return;
    
    if (reportes.length === 0) {
        reportesList.innerHTML = '<div class="no-data">No se encontraron reportes</div>';
        return;
    }
    
    reportesList.innerHTML = reportes.map(reporte => `
        <div class="report-card red" onclick="showReportModal(${reporte.id})">
            ${reporte.imagen ? `<img src="${reporte.imagen}" alt="${reporte.titulo}" class="card-image">` : ''}
            <div class="card-content">
                <div class="card-badges">
                    <div class="priority-badge ${reporte.prioridad}">${reporte.prioridad.charAt(0).toUpperCase() + reporte.prioridad.slice(1)} Prioridad</div>
                    <div class="status-badge ${reporte.estado}">${reporte.estado === 'en-proceso' ? 'En Proceso' : reporte.estado.charAt(0).toUpperCase() + reporte.estado.slice(1)}</div>
                </div>
                <h3 class="card-title">${reporte.titulo}</h3>
                <p class="card-description">${reporte.descripcion.substring(0, 100)}...</p>
                <div class="card-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${reporte.ubicacion}</span>
                </div>
                <div class="card-date">${reporte.fecha}</div>
            </div>
        </div>
    `).join('');
}

function renderFilteredPuntos(puntos) {
    const puntosList = document.getElementById('puntosList');
    if (!puntosList) return;
    
    if (puntos.length === 0) {
        puntosList.innerHTML = '<div class="no-data">No se encontraron puntos de acopio</div>';
        return;
    }
    
    puntosList.innerHTML = puntos.map(punto => `
        <div class="point-card blue" onclick="showPointModal(${punto.id})">
            <div class="card-content">
                <div class="card-header">
                    <div class="point-icon">
                        <i class="fas fa-recycle"></i>
                    </div>
                    <div>
                        <h3 class="card-title">${punto.titulo}</h3>
                        <div class="card-date">Registrado: ${punto.fecha}</div>
                    </div>
                </div>
                <p class="card-description">${punto.descripcion || "Centro de acopio de materiales reciclables"}</p>
                <div class="point-details">
                    <div class="detail-item">
                        <div class="type-badge">Residuos</div>
                        <span>${punto.tipoResiduos}</span>
                    </div>
                    <div class="card-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${punto.ubicacion}</span>
                    </div>
                    ${punto.telefono ? `
                        <div class="card-location">
                            <i class="fas fa-phone"></i>
                            <span>${punto.telefono}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// Inicializar búsqueda y filtros cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    setupSearchAndFilters();
});

// Manejo de errores globales
window.addEventListener('error', function(event) {
    console.error('Error global:', event.error);
    showNotification('Ha ocurrido un error. Por favor, recarga la página.', 'error');
});

// Manejo de promesas rechazadas
window.addEventListener('unhandledrejection', function(event) {
    console.error('Promesa rechazada:', event.reason);
    showNotification('Ha ocurrido un error. Por favor, intenta nuevamente.', 'error');
});
