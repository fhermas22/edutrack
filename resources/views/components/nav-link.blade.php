@props([
    'href' => '#',
    'active' => false,
    'icon' => '',
])

<a
    href="{{ $href }}"
    data-page="{{ basename($href, '.html') }}"
    {{ $attributes->merge(['class' => 'px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 ' . ($active ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100')]) }}
>
    @if($icon)
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {!! $icon !!}
        </svg>
    @endif
    {{ $slot }}
</a>
