const accordionsHolders = document.querySelectorAll('.lp-js-accordions');

if (accordionsHolders && !!accordionsHolders.length) {
    accordionsHolders.forEach(holder => {
        const accordions = holder.querySelectorAll('.lp-accordion');

        accordions[0].classList.add('show-text');

        accordions.forEach(accordion => {
            const accordionBtn = accordion.querySelector('.lp-accordion__header');
            const panel = accordion.querySelector('.lp-accordion__panel');
            accordionBtn.addEventListener('click', () => {
                accordion.classList.toggle('show-text');
                panel.style.maxHeight = panel.scrollHeight + 'px';
                !accordion.classList.contains('show-text') ? panel.style.maxHeight = null : panel.style.maxHeight = panel.scrollHeight + 40 + 'px';
            });
        })
    });
}

