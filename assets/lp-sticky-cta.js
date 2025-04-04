  document.addEventListener('DOMContentLoaded', function() {
    var classSticky = 'sticky';
    var lpHero = document.querySelector('.product-section-hey-lander .product-single__form');
    var lpStickyCtaBar = document.querySelector('.lp-sticky-cta');
    var lpFooter = document.querySelector('.site-footer');


    var isInViewport = function (elem) {
      var rect = elem.getBoundingClientRect();
  
      return (
        rect.bottom >= 0
        && rect.right >= 0
        && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
        && rect.left <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };
  
    var timer;
    window.addEventListener('scroll', function () {
      if(timer) {
        window.clearTimeout(timer);
      }
  
      timer = window.setTimeout(function() {
  
        if (isInViewport(lpHero)) {
          if (lpStickyCtaBar.classList.contains(classSticky)) {
            lpStickyCtaBar.classList.remove(classSticky)
          }
        } else {
          if (!lpStickyCtaBar.classList.contains(classSticky)) {
            lpStickyCtaBar.classList.add(classSticky)
          }
        }
        
      }, 100);
    });
  });

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
    const selectElement = document.querySelector('.select_option-cta');
    const productContentText = document.querySelector('.lp-sticky-cta__option-copy');

    const productContentTextPrice = document.querySelector('.lp-sticky-cta__option-price');
    

    function updateText() {

        const selectedIndex = selectElement.selectedIndex;

        let newText = '';
        let newPrice = '';
        if (selectedIndex == 0) {
         newText = '€ 0,27/kopje (110 Kopjes)'
         newPrice = '€ 29,95'
        }
        else if(selectedIndex == 1) {
        newText = '€ 0,25/kopje (220 Kopjes)'
        newPrice = '2x € 27,50'

        }
        else {
        newText = '€ 0,23/kopje (330 Kopjes)'
        newPrice = '3x € 25,00'
        }

        productContentText.textContent = newText;
        productContentTextPrice.textContent = newPrice;
    }

    selectElement.addEventListener('change', updateText);

    updateText();
});
