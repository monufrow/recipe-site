document.addEventListener('DOMContentLoaded', () => {
    const tooltip = document.getElementById('tooltip');
    const ingredients = document.querySelectorAll('.ingredient');

    ingredients.forEach(ingredient => {
        ingredient.addEventListener('mouseenter', (e) => {
            const info = ingredient.getAttribute('data-info');

            tooltip.textContent = info;
            tooltip.style.display = 'block';

            const rect = ingredient.getBoundingClientRect();
            tooltip.style.top = rect.bottom + window.scrollY + 5 + 'px';
            tooltip.style.left = rect.left + window.scrollX + 'px';
        });

        ingredient.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });
    });
});