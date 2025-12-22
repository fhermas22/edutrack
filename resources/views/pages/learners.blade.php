<div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
        <div>
            <h2 class="text-3xl font-bold text-gray-900">Apprenants</h2>
            <p class="text-gray-600 mt-2">Gérez tous vos apprenants en un seul endroit</p>
        </div>
        <x-button variant="primary" data-action="add-learner-modal">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Ajouter un Apprenant
        </x-button>
    </div>

    <!-- Filters -->
    <x-card class="bg-gray-50">
        <div class="flex flex-wrap gap-4 items-end">
            <div class="flex-1 min-w-64">
                <x-input
                    type="text"
                    placeholder="Rechercher par nom..."
                    id="search-learners"
                    class="w-full"
                />
            </div>

            <select id="filter-status" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Tous les Statuts</option>
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
                <option value="completed">Complété</option>
            </select>

            <select id="filter-level" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Tous les Niveaux</option>
                <option value="beginner">Débutant</option>
                <option value="intermediate">Intermédiaire</option>
                <option value="advanced">Avancé</option>
            </select>

            <x-button variant="secondary" data-action="reset-filters">
                Réinitialiser
            </x-button>
        </div>
    </x-card>

    <!-- Learners Table -->
    <x-card>
        <div class="overflow-x-auto">
            <table class="w-full">
                <thead>
                    <tr class="border-b border-gray-200">
                        <th class="text-left py-3 px-4 font-semibold text-gray-700">Nom</th>
                        <th class="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                        <th class="text-left py-3 px-4 font-semibold text-gray-700">Niveau</th>
                        <th class="text-left py-3 px-4 font-semibold text-gray-700">Statut</th>
                        <th class="text-left py-3 px-4 font-semibold text-gray-700">Progrès</th>
                        <th class="text-center py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody id="learners-table-body">
                    <!-- Learners will be populated by JavaScript -->
                </tbody>
            </table>
            <div id="empty-state" class="text-center py-12 hidden">
                <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-2a6 6 0 0112 0v2zm0 0h6v-2a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
                <p class="text-gray-600 text-lg">Aucun apprenant trouvé</p>
                <p class="text-gray-500 text-sm">Commencez par ajouter un nouvel apprenant</p>
            </div>
        </div>
    </x-card>
</div>

<!-- Add Learner Modal -->
<x-modal id="add-learner-modal" title="Ajouter un Nouvel Apprenant" size="md">
    <form id="add-learner-form" class="space-y-4">
        <x-input
            type="text"
            label="Nom Complet"
            placeholder="Jean Dupont"
            id="learner-name"
            required
        />

        <x-input
            type="email"
            label="Email"
            placeholder="jean@example.com"
            id="learner-email"
            required
        />

        <div class="mb-4">
            <label for="learner-level" class="block text-sm font-medium text-gray-700 mb-2">
                Niveau <span class="text-red-500">*</span>
            </label>
            <select id="learner-level" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Sélectionner un niveau</option>
                <option value="beginner">Débutant</option>
                <option value="intermediate">Intermédiaire</option>
                <option value="advanced">Avancé</option>
            </select>
        </div>

        <div class="flex gap-3 pt-4">
            <x-button type="button" variant="secondary" class="flex-1 modal-close" data-modal-id="add-learner-modal">
                Annuler
            </x-button>
            <x-button type="submit" variant="primary" class="flex-1">
                Ajouter l'Apprenant
            </x-button>
        </div>
    </form>
</x-modal>
