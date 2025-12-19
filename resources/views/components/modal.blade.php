@props([
    'id' => 'modal',
    'title' => '',
    'size' => 'md',
])

@php
    $sizeClasses = match($size) {
        'sm' => 'max-w-sm',
        'md' => 'max-w-md',
        'lg' => 'max-w-lg',
        'xl' => 'max-w-xl',
        '2xl' => 'max-w-2xl',
        default => 'max-w-md',
    };
@endphp

<div
    id="{{ $id }}"
    class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 modal-overlay"
    data-modal-id="{{ $id }}"
>
    <div class="bg-white rounded-lg shadow-xl {{ $sizeClasses }} w-full modal-content">
        @if($title)
            <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 class="text-xl font-semibold text-gray-900">{{ $title }}</h2>
                <button
                    type="button"
                    class="text-gray-500 hover:text-gray-700 focus:outline-none modal-close"
                    data-modal-id="{{ $id }}"
                    aria-label="Close modal"
                >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        @endif

        <div class="px-6 py-4">
            {{ $slot }}
        </div>
    </div>
</div>
