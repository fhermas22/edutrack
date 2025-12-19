@props([
    'type' => 'text',
    'label' => '',
    'placeholder' => '',
    'required' => false,
    'error' => '',
])

<div class="mb-4">
    @if($label)
        <label {{ $attributes->whereStartsWith('for')->first() ? 'for=' . $attributes->whereStartsWith('for')->first() : '' }} class="block text-sm font-medium text-gray-700 mb-2">
            {{ $label }}
            @if($required)
                <span class="text-red-500">*</span>
            @endif
        </label>
    @endif

    <input
        type="{{ $type }}"
        placeholder="{{ $placeholder }}"
        {{ $required ? 'required' : '' }}
        {{ $attributes->merge(['class' => 'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ' . ($error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white')]) }}
    />

    @if($error)
        <p class="mt-1 text-sm text-red-600">{{ $error }}</p>
    @endif
</div>
