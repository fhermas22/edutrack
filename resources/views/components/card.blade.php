@props([
    'title' => '',
    'subtitle' => '',
    'class' => '',
])

<div {{ $attributes->merge(['class' => "bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden $class"]) }}>
    @if($title)
        <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">{{ $title }}</h3>
            @if($subtitle)
                <p class="text-sm text-gray-600 mt-1">{{ $subtitle }}</p>
            @endif
        </div>
    @endif

    <div class="px-6 py-4">
        {{ $slot }}
    </div>
</div>
