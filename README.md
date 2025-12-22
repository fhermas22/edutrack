# EduTrack - Modern Frontend SPA Guide

EduTrack is a modern Single Page Application (SPA) frontend guide for a learner tracking system. This project demonstrates how to build a dynamic, fluid, and component-based user interface using Laravel Blade for structure, Tailwind CSS 4 for styling, and pure JavaScript for all interactivity and SPA logic.

## 🚀 Features

*   **Single Page Application (SPA) Logic:** Fluid navigation without page refresh, powered by the History API and pure JavaScript.
*   **Component-Based UI:** Reusable UI components (Buttons, Cards, Modals) built with Laravel Blade.
*   **Modern Styling:** Utilizes the latest features of Tailwind CSS v4 (Next) for a clean, responsive, and modern design.
*   **Pure JavaScript Interactivity:** No heavy frameworks (Vue, React, Livewire, Inertia). Includes:
    *   Dynamic data simulation and rendering.
    *   Real-time filtering and search.
    *   Animated Toast Notification system.
    *   DOM-based dynamic bar chart.
*   **Clean Architecture:** Separation of concerns between Blade templates (structure) and JavaScript (behavior).

## 🛠️ Installation and Setup

This guide assumes you have PHP (8.1+), Composer, and Node.js/pnpm installed.

1.  **Create the Laravel Project:**
    ```bash
    composer create-project laravel/laravel EduTrack "10.*"
    cd EduTrack
    ```

2.  **Install Frontend Dependencies (Tailwind CSS 4):**
    ```bash
    pnpm install
    pnpm install -D tailwindcss@next postcss autoprefixer
    pnpm tailwindcss init -p
    ```

3.  **Update Configuration Files:**
    Ensure `tailwind.config.js`, `resources/css/app.css`, and `vite.config.js` are configured as detailed in the guide.

4.  **Place Code Files:**
    Copy all the provided Blade component files (`resources/views/components/*.blade.php`), page views (`resources/views/pages/*.blade.php`), the main layout (`resources/views/layouts/app.blade.php`), the main JavaScript file (`resources/js/app.js`), and the route file (`routes/web.php`) into their respective locations.

5.  **Compile Assets:**
    ```bash
    pnpm run dev
    # or pnpm run build for production
    ```

6.  **Run the Application:**
    ```bash
    php artisan serve
    ```
    Open your browser to the displayed URL (e.g., `http://127.0.0.1:8000`).

## 📂 Project Structure

```
EduTrack/
├── app/
├── config/
├── public/
├── resources/
│   ├── css/
│   │   └── app.css          # Tailwind directives
│   ├── js/
│   │   └── app.js           # Pure JavaScript SPA logic
│   └── views/
│       ├── components/      # Blade UI components (button, card, etc.)
│       ├── layouts/
│       │   └── app.blade.php # Main application layout
│       └── pages/           # Page views (dashboard, learners, courses, etc.)
├── routes/
│   └── web.php              # Main route definition
├── tailwind.config.js
└── package.json
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues or questions, please open an issue on the repository.

---

**Built with ❤️ using Tailwind CSS 4, Laravel 12 and pure JavaScript**
