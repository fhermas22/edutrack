import './bootstrap';

// =================================================================
// 1. DATA SIMULATION
// =================================================================

const DATA_STORE = {
    learners: [
        { id: 1, name: "Hermas Francisco", email: "hermas.f@example.com", level: "advanced", status: "active", progress: 95, last_activity: "2025-12-18" },
        { id: 2, name: "Alice Dubois", email: "alice.d@example.com", level: "intermediate", status: "active", progress: 60, last_activity: "2025-12-19" },
        { id: 3, name: "Bob Martin", email: "bob.m@example.com", level: "beginner", status: "inactive", progress: 20, last_activity: "2025-12-10" },
        { id: 4, name: "Claire Lefevre", email: "claire.l@example.com", level: "advanced", status: "completed", progress: 100, last_activity: "2025-12-15" },
        { id: 5, name: "David Moreau", email: "david.m@example.com", level: "intermediate", status: "active", progress: 75, last_activity: "2025-12-19" },
    ],
    courses: [
        { id: 101, title: "Laravel Blade Mastery", category: "programming", duration: "8h", learners: 45, completion_rate: 85 },
        { id: 102, title: "Tailwind CSS 4 Essentials", category: "design", duration: "5h", learners: 62, completion_rate: 92 },
        { id: 103, title: "Vanilla JS for SPAs", category: "programming", duration: "12h", learners: 30, completion_rate: 55 },
        { id: 104, title: "Project Management Basics", category: "business", duration: "10h", learners: 15, completion_rate: 70 },
    ],
    weeklyProgress: [
        { day: 'Lun', value: 15 },
        { day: 'Mar', value: 25 },
        { day: 'Mer', value: 40 },
        { day: 'Jeu', value: 30 },
        { day: 'Ven', value: 50 },
        { day: 'Sam', value: 20 },
        { day: 'Dim', value: 10 },
    ]
};

// =================================================================
// 2. SPA LOGIC (Single Page Application)
// =================================================================

const APP_CONTENT = document.getElementById('app-content');
const VIEWS = {
    'dashboard': document.querySelector('[data-page-name="dashboard"]')?.innerHTML || '',
    'learners': document.querySelector('[data-page-name="learners"]')?.innerHTML || '',
    'courses': document.querySelector('[data-page-name="courses"]')?.innerHTML || '',
    'progress': document.querySelector('[data-page-name="progress"]')?.innerHTML || '',
    'reports': document.querySelector('[data-page-name="reports"]')?.innerHTML || '',
};

/**
 * Charge le contenu d'une vue (page) dans le conteneur principal.
 * @param {string} pageName - Le nom de la page à charger (ex: 'dashboard').
 */
function loadView(pageName) {
    const viewContent = VIEWS[pageName];
    if (!viewContent) {
        APP_CONTENT.innerHTML = `<div class="text-center py-20"><h2 class="text-4xl font-bold text-red-500">404</h2><p class="text-gray-600">Page ${pageName} non trouvée.</p></div>`;
        return;
    }

    // Animation de transition fluide
    APP_CONTENT.style.opacity = 0;
    setTimeout(() => {
        APP_CONTENT.innerHTML = viewContent;
        APP_CONTENT.style.opacity = 1;

        // Exécuter les scripts spécifiques à la page après le chargement
        runPageScripts(pageName);
        updateActiveLink(pageName);

    }, 200); // Délai pour l'animation de fondu
}

/**
 * Met à jour le lien de navigation actif dans la barre latérale.
 * @param {string} pageName - Le nom de la page active.
 */
function updateActiveLink(pageName) {
    document.querySelectorAll('.p-4 a').forEach(link => {
        const linkPage = link.getAttribute('href').substring(1);
        if (linkPage === pageName) {
            link.classList.add('bg-blue-600', 'text-white');
            link.classList.remove('text-gray-700', 'hover:bg-gray-100');
        } else {
            link.classList.remove('bg-blue-600', 'text-white');
            link.classList.add('text-gray-700', 'hover:bg-gray-100');
        }
    });
}

/**
 * Gère le clic sur les liens de navigation pour simuler une SPA.
 * @param {Event} event - L'événement de clic.
 */
function handleNavigation(event) {
    const target = event.target.closest('a[href^="#"]');
    if (target) {
        event.preventDefault();
        const pageName = target.getAttribute('href').substring(1);

        // Mettre à jour l'URL et l'historique du navigateur
        history.pushState({ page: pageName }, '', target.href);

        loadView(pageName);
    }
}

/**
 * Initialise la logique SPA au chargement de la page.
 */
function initializeSPA() {
    // 1. Récupérer la page initiale depuis l'URL ou utiliser 'dashboard' par défaut
    const initialPage = window.location.hash ? window.location.hash.substring(1) : 'dashboard';

    // 2. Charger la vue initiale
    loadView(initialPage);

    // 3. Écouter les clics sur les liens de navigation
    document.body.addEventListener('click', handleNavigation);

    // 4. Gérer le bouton retour/avant du navigateur
    window.addEventListener('popstate', (event) => {
        const pageName = event.state ? event.state.page : 'dashboard';
        loadView(pageName);
    });
}

// =================================================================
// 3. FEATURES SPECIFIC TO PAGES (Cool JS Features)
// =================================================================

/**
 * Exécute les fonctions d'initialisation spécifiques à chaque page.
 * @param {string} pageName - Le nom de la page.
 */
function runPageScripts(pageName) {
    switch (pageName) {
        case 'dashboard':
            initDashboard();
            break;
        case 'learners':
            initLearnersPage();
            break;
        case 'courses':
            initCoursesPage();
            break;
        case 'reports':
            initReportsPage();
            break;
        default:
            break;
    }
    // Ré-attacher les gestionnaires d'événements pour les modales et actions
    attachModalHandlers();
    attachActionHandlers();
}

// --- Dashboard Logic ---
function initDashboard() {
    // Mise à jour des cartes de statistiques
    document.getElementById('total-learners').textContent = DATA_STORE.learners.length;
    document.getElementById('active-courses').textContent = DATA_STORE.courses.length;

    const totalProgress = DATA_STORE.learners.reduce((sum, l) => sum + l.progress, 0);
    const completionRate = (totalProgress / (DATA_STORE.learners.length * 100) * 100).toFixed(0);
    document.getElementById('completion-rate').textContent = `${completionRate}%`;

    const today = new Date().toISOString().split('T')[0];
    const todayActivity = DATA_STORE.learners.filter(l => l.last_activity === today).length;
    document.getElementById('today-activity').textContent = todayActivity;

    // Génération du graphique de progression dynamique (Bar Chart en JS pur)
    renderWeeklyProgressChart(DATA_STORE.weeklyProgress);

    // Affichage des apprenants récents
    renderRecentLearners(DATA_STORE.learners.slice(0, 3));
}

/**
 * Génère un graphique à barres simple en utilisant uniquement le DOM.
 * @param {Array} data - Données de progression hebdomadaire.
 */
function renderWeeklyProgressChart(data) {
    const container = document.getElementById('chart-container');
    if (!container) return;

    container.innerHTML = ''; // Nettoyer le conteneur
    const maxValue = Math.max(...data.map(d => d.value));

    data.forEach(item => {
        const heightPercentage = (item.value / maxValue) * 100;

        const barWrapper = document.createElement('div');
        barWrapper.className = 'flex flex-col items-center justify-end h-full w-1/7';

        const bar = document.createElement('div');
        bar.className = 'w-8 bg-blue-500 rounded-t-lg transition-all duration-500 ease-out hover:bg-blue-700 relative group';
        bar.style.height = `${heightPercentage}%`;

        const tooltip = document.createElement('span');
        tooltip.className = 'absolute bottom-full mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none';
        tooltip.textContent = `${item.value} activités`;

        const label = document.createElement('span');
        label.className = 'text-sm text-gray-600 mt-2';
        label.textContent = item.day;

        bar.appendChild(tooltip);
        barWrapper.appendChild(bar);
        barWrapper.appendChild(label);
        container.appendChild(barWrapper);
    });
}

/**
 * Affiche les apprenants récents dans le tableau de bord.
 * @param {Array} learners - Liste des apprenants.
 */
function renderRecentLearners(learners) {
    const container = document.getElementById('recent-learners');
    if (!container) return;

    container.innerHTML = '';

    learners.forEach(learner => {
        const learnerDiv = document.createElement('div');
        learnerDiv.className = 'flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200';

        const name = document.createElement('span');
        name.className = 'font-medium text-gray-800';
        name.textContent = learner.name;

        const progress = document.createElement('span');
        progress.className = `text-sm font-semibold ${learner.progress >= 70 ? 'text-green-600' : 'text-orange-600'}`;
        progress.textContent = `${learner.progress}%`;

        learnerDiv.appendChild(name);
        learnerDiv.appendChild(progress);
        container.appendChild(learnerDiv);
    });
}


// --- Learners Page Logic (Filtrage et Rendu) ---
function initLearnersPage() {
    renderLearnersTable(DATA_STORE.learners);

    // Attacher les gestionnaires d'événements pour le filtrage
    document.getElementById('search-learners')?.addEventListener('input', filterLearners);
    document.getElementById('filter-status')?.addEventListener('change', filterLearners);
    document.getElementById('filter-level')?.addEventListener('change', filterLearners);
    document.querySelector('[data-action="reset-filters"]')?.addEventListener('click', resetLearnerFilters);

    // Gestion du formulaire d'ajout d'apprenant
    document.getElementById('add-learner-form')?.addEventListener('submit', handleAddLearner);
}

/**
 * Rend le tableau des apprenants.
 * @param {Array} learners - Liste des apprenants à afficher.
 */
function renderLearnersTable(learners) {
    const tbody = document.getElementById('learners-table-body');
    const emptyState = document.getElementById('empty-state');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (learners.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }
    emptyState.classList.add('hidden');

    learners.forEach(learner => {
        const row = document.createElement('tr');
        row.className = 'border-b border-gray-100 hover:bg-gray-50 transition-colors';

        // Fonction utilitaire pour créer une cellule
        const createCell = (content, className = 'text-gray-700') => {
            const cell = document.createElement('td');
            cell.className = `py-3 px-4 text-sm ${className}`;
            cell.innerHTML = content;
            return cell;
        };

        // Cellule Nom
        row.appendChild(createCell(`<span class="font-medium">${learner.name}</span>`));

        // Cellule Email
        row.appendChild(createCell(learner.email));

        // Cellule Niveau
        const levelBadge = `<x-badge variant="info" size="sm">${learner.level.charAt(0).toUpperCase() + learner.level.slice(1)}</x-badge>`;
        row.appendChild(createCell(levelBadge));

        // Cellule Statut
        let statusVariant = 'gray';
        if (learner.status === 'active') statusVariant = 'success';
        if (learner.status === 'inactive') statusVariant = 'danger';
        const statusBadge = `<x-badge variant="${statusVariant}" size="sm">${learner.status.charAt(0).toUpperCase() + learner.status.slice(1)}</x-badge>`;
        row.appendChild(createCell(statusBadge));

        // Cellule Progrès (Barre de progression cool)
        const progressContent = `
            <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style="width: ${learner.progress}%"></div>
            </div>
            <span class="text-xs font-medium text-gray-500 mt-1">${learner.progress}%</span>
        `;
        row.appendChild(createCell(progressContent));

        // Cellule Actions
        const actionsContent = `
            <div class="flex justify-center gap-2">
                <x-button variant="ghost" size="sm" title="Modifier">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </x-button>
                <x-button variant="ghost" size="sm" title="Supprimer" data-learner-id="${learner.id}" data-action="delete-learner">
                    <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </x-button>
            </div>
        `;
        row.appendChild(createCell(actionsContent, 'text-center'));

        tbody.appendChild(row);
    });

    // Ré-attacher les gestionnaires d'événements après le rendu
    attachActionHandlers();
}

/**
 * Filtre les apprenants en fonction des critères de recherche et de sélection.
 */
function filterLearners() {
    const searchTerm = document.getElementById('search-learners')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('filter-status')?.value || '';
    const levelFilter = document.getElementById('filter-level')?.value || '';

    const filtered = DATA_STORE.learners.filter(learner => {
        const matchesSearch = learner.name.toLowerCase().includes(searchTerm) || learner.email.toLowerCase().includes(searchTerm);
        const matchesStatus = !statusFilter || learner.status === statusFilter;
        const matchesLevel = !levelFilter || learner.level === levelFilter;

        return matchesSearch && matchesStatus && matchesLevel;
    });

    renderLearnersTable(filtered);
}

/**
 * Réinitialise les filtres et affiche tous les apprenants.
 */
function resetLearnerFilters() {
    document.getElementById('search-learners').value = '';
    document.getElementById('filter-status').value = '';
    document.getElementById('filter-level').value = '';
    filterLearners();
}

/**
 * Gère l'ajout d'un nouvel apprenant via la modale.
 * @param {Event} event - L'événement de soumission du formulaire.
 */
function handleAddLearner(event) {
    event.preventDefault();

    const name = document.getElementById('learner-name').value;
    const email = document.getElementById('learner-email').value;
    const level = document.getElementById('learner-level').value;

    if (!name || !email || !level) return;

    const newLearner = {
        id: Date.now(), // ID unique simple
        name,
        email,
        level,
        status: 'active',
        progress: 0,
        last_activity: new Date().toISOString().split('T')[0]
    };

    DATA_STORE.learners.push(newLearner);

    // Fermer la modale et réinitialiser le formulaire
    closeModal('add-learner-modal');
    document.getElementById('add-learner-form').reset();

    // Re-rendre le tableau (avec les filtres appliqués si nécessaire)
    filterLearners();

    // Animation de notification (Cool JS Feature)
    showNotification(`Apprenant ${name} ajouté avec succès!`, 'success');
}

// --- Courses Page Logic ---
function initCoursesPage() {
    renderCoursesGrid(DATA_STORE.courses);

    // Attacher les gestionnaires d'événements pour le filtrage
    document.getElementById('search-courses')?.addEventListener('input', filterCourses);
    document.getElementById('filter-category')?.addEventListener('change', filterCourses);

    // Gestion du formulaire d'ajout de cours
    document.getElementById('add-course-form')?.addEventListener('submit', handleAddCourse);
}

/**
 * Rend la grille des cours.
 * @param {Array} courses - Liste des cours à afficher.
 */
function renderCoursesGrid(courses) {
    const grid = document.getElementById('courses-grid');
    const emptyState = document.querySelector('#courses-grid + #empty-state');
    if (!grid) return;

    grid.innerHTML = '';

    if (courses.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }
    emptyState.classList.add('hidden');

    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';

        // Utilisation d'une fonction pour simuler le rendu du composant x-card
        const cardHtml = `
            <x-card title="${course.title}" subtitle="${course.category.charAt(0).toUpperCase() + course.category.slice(1)}">
                <p class="text-gray-600 text-sm mb-3">Durée: ${course.duration} | Apprenants: ${course.learners}</p>
                <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-gray-700">Complétion:</span>
                    <span class="text-lg font-bold text-blue-600">${course.completion_rate}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div class="bg-blue-600 h-2.5 rounded-full" style="width: ${course.completion_rate}%"></div>
                </div>
                <div class="mt-4 flex justify-end">
                    <x-button variant="secondary" size="sm">Voir Détails</x-button>
                </div>
            </x-card>
        `;

        // Note: En production Laravel, on utiliserait Blade pour le rendu.
        // Ici, nous devons simuler le rendu des composants Blade dans le JS pur.
        // Pour simplifier, nous allons utiliser une structure HTML directe.

        courseCard.innerHTML = `
            <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900">${course.title}</h3>
                    <p class="text-sm text-gray-600 mt-1">${course.category.charAt(0).toUpperCase() + course.category.slice(1)}</p>
                </div>
                <div class="px-6 py-4">
                    <p class="text-gray-600 text-sm mb-3">Durée: ${course.duration} | Apprenants: ${course.learners}</p>
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-gray-700">Complétion:</span>
                        <span class="text-lg font-bold text-blue-600">${course.completion_rate}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div class="bg-blue-600 h-2.5 rounded-full" style="width: ${course.completion_rate}%"></div>
                    </div>
                    <div class="mt-4 flex justify-end">
                        <button class="px-3 py-1.5 text-sm font-semibold rounded-lg transition-all duration-200 bg-gray-200 text-gray-900 hover:bg-gray-300">Voir Détails</button>
                    </div>
                </div>
            </div>
        `;

        grid.appendChild(courseCard);
    });
}

/**
 * Filtre les cours en fonction des critères de recherche et de sélection.
 */
function filterCourses() {
    const searchTerm = document.getElementById('search-courses')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('filter-category')?.value || '';

    const filtered = DATA_STORE.courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryFilter || course.category === categoryFilter;

        return matchesSearch && matchesCategory;
    });

    renderCoursesGrid(filtered);
}

/**
 * Gère l'ajout d'un nouveau cours via la modale.
 * @param {Event} event - L'événement de soumission du formulaire.
 */
function handleAddCourse(event) {
    event.preventDefault();

    const title = document.getElementById('course-title').value;
    const category = document.getElementById('course-category').value;

    if (!title || !category) return;

    const newCourse = {
        id: Date.now(),
        title,
        category,
        duration: "N/A",
        learners: 0,
        completion_rate: 0
    };

    DATA_STORE.courses.push(newCourse);

    closeModal('add-course-modal');
    document.getElementById('add-course-form').reset();

    filterCourses();
    showNotification(`Cours "${title}" créé avec succès!`, 'success');
}

// --- Reports Page Logic ---
function initReportsPage() {
    // Rien de complexe ici, juste l'attachement d'un gestionnaire d'action
}

// =================================================================
// 4. GLOBAL MODAL AND ACTIONS MANAGEMENT (Cool JS Features)
// =================================================================

/**
 * Ouvre une modale spécifique.
 * @param {string} id - L'ID de la modale.
 */
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden'; // Empêche le défilement du corps
    }
}

/**
 * Ferme une modale spécifique.
 * @param {string} id - L'ID de la modale.
 */
function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    }
}

/**
 * Attache les gestionnaires d'événements pour ouvrir/fermer les modales.
 */
function attachModalHandlers() {
    // Gestionnaires pour ouvrir les modales via data-action
    document.querySelectorAll('[data-action$="-modal"]').forEach(button => {
        button.removeEventListener('click', handleModalOpen); // Éviter les doubles attachements
        button.addEventListener('click', handleModalOpen);
    });

    // Gestionnaires pour fermer les modales (bouton X et bouton Annuler)
    document.querySelectorAll('.modal-close').forEach(button => {
        button.removeEventListener('click', handleModalClose);
        button.addEventListener('click', handleModalClose);
    });

    // Fermeture en cliquant sur l'overlay
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.removeEventListener('click', handleOverlayClick);
        overlay.addEventListener('click', handleOverlayClick);
    });
}

function handleModalOpen(event) {
    const action = event.currentTarget.getAttribute('data-action');
    const modalId = action.replace('-modal', '');
    openModal(modalId);
}

function handleModalClose(event) {
    const modalId = event.currentTarget.getAttribute('data-modal-id');
    closeModal(modalId);
}

function handleOverlayClick(event) {
    if (event.target.classList.contains('modal-overlay')) {
        const modalId = event.target.getAttribute('data-modal-id');
        closeModal(modalId);
    }
}

/**
 * Attache les gestionnaires d'événements pour les actions globales (ex: suppression).
 */
function attachActionHandlers() {
    document.body.querySelectorAll('[data-action]').forEach(element => {
        element.removeEventListener('click', handleGlobalAction);
        element.addEventListener('click', handleGlobalAction);
    });
}

/**
 * Gère les actions globales (suppression, exportation, etc.).
 * @param {Event} event - L'événement de clic.
 */
function handleGlobalAction(event) {
    const action = event.currentTarget.getAttribute('data-action');

    switch (action) {
        case 'delete-learner':
            handleDeleteLearner(event.currentTarget.getAttribute('data-learner-id'));
            break;
        case 'export-full-report':
            showNotification('Génération du rapport PDF en cours...', 'info');
            setTimeout(() => {
                showNotification('Rapport complet exporté avec succès!', 'success');
            }, 1500);
            break;
        case 'add-learner':
            openModal('add-learner-modal');
            break;
        case 'add-course':
            openModal('add-course-modal');
            break;
        default:
            // Les modales sont gérées par attachModalHandlers
            break;
    }
}

/**
 * Gère la suppression d'un apprenant (Cool JS Feature: Confirmation et Suppression).
 * @param {string} learnerId - L'ID de l'apprenant à supprimer.
 */
function handleDeleteLearner(learnerId) {
    const learner = DATA_STORE.learners.find(l => l.id == learnerId);
    if (!learner) return;

    if (confirm(`Êtes-vous sûr de vouloir supprimer l'apprenant ${learner.name}?`)) {
        DATA_STORE.learners = DATA_STORE.learners.filter(l => l.id != learnerId);
        filterLearners(); // Re-rendre le tableau
        showNotification(`Apprenant ${learner.name} supprimé.`, 'danger');
    }
}

// =================================================================
// 5. SYSTÈME DE NOTIFICATION (Cool JS Feature: Toast Notification)
// =================================================================

/**
 * Affiche une notification de type "toast".
 * @param {string} message - Le message à afficher.
 * @param {string} type - Le type de notification ('success', 'info', 'danger').
 */
function showNotification(message, type = 'info') {
    let container = document.getElementById('notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        container.className = 'fixed top-4 right-4 z-[100] space-y-2';
        document.body.appendChild(container);
    }

    const notification = document.createElement('div');
    let bgColor = 'bg-blue-500';
    let icon = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;

    if (type === 'success') {
        bgColor = 'bg-green-500';
        icon = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
    } else if (type === 'danger') {
        bgColor = 'bg-red-500';
        icon = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
    }

    notification.className = `${bgColor} text-white px-4 py-3 rounded-lg shadow-xl transition-all duration-500 transform translate-x-full opacity-0 flex items-center gap-3`;
    notification.innerHTML = `${icon} <span>${message}</span>`;

    container.appendChild(notification);

    // Animation d'entrée
    setTimeout(() => {
        notification.classList.remove('translate-x-full', 'opacity-0');
        notification.classList.add('translate-x-0', 'opacity-100');
    }, 10);

    // Animation de sortie et suppression
    setTimeout(() => {
        notification.classList.remove('translate-x-0', 'opacity-100');
        notification.classList.add('translate-x-full', 'opacity-0');

        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 4000);
}

// Rendre les vues initiales invisibles pour que le JS puisse les charger dynamiquement
// Ceci est une astuce pour que le JS puisse lire le contenu Blade sans le rendre initialement
document.addEventListener('DOMContentLoaded', () => {
    const views = document.querySelectorAll('[data-page-name]');
    views.forEach(view => view.style.display = 'none');
});

// Exposer la fonction d'initialisation globalement
window.initializeSPA = initializeSPA;
