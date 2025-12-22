<div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
        <div>
            <h2 class="text-3xl font-bold text-gray-900">Cours</h2>
            <p class="text-gray-600 mt-2">Gérez tous vos cours et modules d'apprentissage</p>
        </div>
        <x-button variant="primary" data-action="add-course-modal">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Créer un Cours
        </x-button>
    </div>

    <!-- Filters -->
    <x-card class="bg-gray-50">
        <div class="flex flex-wrap gap-4 items-end">
            <div class="flex-1 min-w-64">
                <x-input
                    type="text"
                    placeholder="Rechercher par titre..."
                    id="search-courses"
                    class="w-full"
                />
            </div>

            <select id="filter-category" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Toutes les Catégories</option>
                <option value="programming">Programmation</option>
                <option value="design">Design</option>
                <option value="business">Affaires</option>
                <option value="language">Langue</option>
            </select>

            <x-button variant="secondary" data-action="reset-filters">
                Réinitialiser
            </x-button>
        </div>
    </x-card>

    <!-- Courses Grid -->
    <div id="courses-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Courses will be populated by JavaScript -->
    </div>

    <div id="empty-state" class="text-center py-12 hidden">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747S17.5 6.253 12 6.253z"></path>
        </svg>
        <p class="text-gray-600 text-lg">Aucun cours trouvé</p>
        <p class="text-gray-500 text-sm">Commencez par créer un nouveau cours</p>
    </div>
</div>

<!-- Add Course Modal -->
<x-modal id="add-course-modal" title="Créer un Nouveau Cours" size="md">
    <form id="add-course-form" class="space-y-4">
        <x-input
            type="text"
            label="Titre du Cours"
            placeholder="Ex: Introduction à JavaScript"
            id="course-title"
            required
        />

        <div class="mb-4">
            <label for="course-category" class="block text-sm font-medium text-gray-700 mb-2">
                Catégorie <span class="text-red-500">*</span>
            </label>
            <select id="course-category" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Sélectionner une catégorie</option>
                <option value="programming">Programmation</option>
                <option value="design">Design</option>
                <option value="business">Affaires</option>
                <option value="language">Langue</option>
            </select>
        </div>

        <div class="mb-4">
            <label for="course-description" class="block text-sm font-medium text-gray-700 mb-2">
                Description
            </label>
            <textarea
                id="course-description"
                placeholder="Décrivez le contenu du cours..."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
            ></textarea>
        </div>

        <div class="flex gap-3 pt-4">
            <x-button type="button" variant="secondary" class="flex-1 modal-close" data-modal-id="add-course-modal">
                Annuler
            </x-button>
            <x-button type="submit" variant="primary" class="flex-1">
                Créer le Cours
            </x-button>
        </div>
    </form>
</x-modal>
