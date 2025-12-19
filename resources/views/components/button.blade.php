@props([
    'type' => 'button',
    'variant' => 'primary',
    'size' => 'md',
    'disabled' => false,
    'class' => '',
])

@php
    $baseClasses = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center gap-2';

    $variantClasses = match($variant) {
        'primary' => 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-400',
        'secondary' => 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400 disabled:bg-gray-100',
        'danger' => 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-400',
        'success' => 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 disabled:bg-green-400',
        'ghost' => 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300 disabled:text-gray-400',
        default => 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-400',
    };

    $sizeClasses = match($size) {
        'sm' => 'px-3 py-1.5 text-sm',
        'md' => 'px-4 py-2 text-base',
        'lg' => 'px-6 py-3 text-lg',
        default => 'px-4 py-2 text-base',
    };

    $disabledClass = $disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
@endphp

<button
    type="{{ $type }}"
    {{ $disabled ? 'disabled' : '' }}
    {{ $attributes->merge(['class' => "$baseClasses $variantClasses $sizeClasses $disabledClass $class"]) }}
>
    {{ $slot }}
</button>
