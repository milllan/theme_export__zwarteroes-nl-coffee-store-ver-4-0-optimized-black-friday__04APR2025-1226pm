
class VariantSelects extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange);
    this.init()
  }

  init(){
    // debugger;
    //   const myForm = this.closest('[data-type="add-to-cart-form"]')
    // console.log(myForm)
    // const submitButton = myForm.querySelector('.product-form__submit')
    // myForm.addEventListener('submit',(e)=>{
    //   e.preventDefault();debugger;
    //   const formEntries = new FormData(myForm).entries();
    //   const json = new URLSearchParams(new FormData(myForm)).toString()
    // const id = myForm.querySelector('[name="id"]').value
    //   const data = {
    //     "id": id,
    //     "quantity": 1
    //   };
      
    //   fetch('/cart/add.js', {
    //     method: 'POST',
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(data)
    //   })
    //     .then((data) => {
    //       console.log('Success:', data);
    //       var cart = new theme.CartDrawer
    //       cart.init()
    //       cart.open();
    //     })
    // })
      
    // $('[name="add"]').each(function () {
      // $('[name="add"]').one('click', function (e) {
      //   e.stopPropagation();
      //   e.preventDefault();
      //   var k = jQuery.post(window.Shopify.routes.root + 'cart/add.js', $(this).parents('form[action$="/cart/add"]').serialize()).done(function (response) {
      //     var cart = new theme.CartDrawer
      //     cart.init()
      //     cart.open();
      //   });
      // })
    // });
    
    const quickAdd = document.querySelectorAll('.card__quick-add')
    
    quickAdd.forEach(add => {
      add.addEventListener('click', (e) => {
        e.target.style.display = "none";
        const cta = e.target.parentNode.querySelector('.card__quick-add-modal')
        if (cta) {
          cta.style.display = "block";
        }
      })
    })
    
    const closeButton = document.querySelectorAll('.close-modal');
    
    closeButton.forEach(close => {
      close.addEventListener('click', (e) => {
        e.preventDefault()
        e.target.closest('.form').querySelector('.card__quick-add-modal').style.display = "none"
        const cta = e.target.closest('.form').querySelector('.card__quick-add')
        if (cta) {
          cta.style.display = "block";
        }
      })
    })

  }

  onVariantChange() {
    this.updateOptions();
    this.updateMasterId();
    this.toggleAddButton(true, '', false);
    this.updatePickupAvailability();
    this.removeErrorMessage();

    if (!this.currentVariant) {
      this.toggleAddButton(true, '', true);
      this.setUnavailable();
    } else {
      this.updateMedia();
      // this.updateURL();
      this.updateVariantInput();
      this.renderProductInfo();
      this.updateShareUrl();
      //$('.product_price_collect').html(theme.Currency.formatMoney(this.currentVariant.price, theme.settings.moneyFormat));
      $(this).find('.product_price_collect').html(theme.Currency.formatMoney(this.currentVariant.price, theme.settings.moneyFormat));
    }
   
    
  }

  updateOptions() {
    debugger
    // this.options = new Array()
    // const fieldsets = Array.from(this.parentNode.querySelectorAll('.variant-radios'));
    // this.options = fieldsets.map((fieldset) => {
    //   return Array.from(fieldset.querySelectorAll('input')).find((radio) => radio.checked).value;
    // });
    // this.options.push(this.parentNode.querySelector('select').value);
    this.options = Array.from(this.parentNode.querySelectorAll('select'), (select) => select.value);
  }

  updateMasterId() {
     this.getVariantData()
    this.currentVariant = this.variantData.find((variant) => {
      return !variant.options.map((option, index) => {
        return this.options[index] === option;
      }).includes(false);
    });
  }

  updateMedia() {
    if (!this.currentVariant) return;
    if (!this.currentVariant.featured_media) return;

    const mediaGalleries = document.querySelectorAll(`[id^="MediaGallery-${this.dataset.section}"]`);
    mediaGalleries.forEach(mediaGallery => mediaGallery.setActiveMedia(`${this.dataset.section}-${this.currentVariant.featured_media.id}`, true));

    const modalContent = document.querySelector(`#ProductModal-${this.dataset.section} .product-media-modal__content`);
    if (!modalContent) return;
    const newMediaModal = modalContent.querySelector( `[data-media-id="${this.currentVariant.featured_media.id}"]`);
    modalContent.prepend(newMediaModal);
  }

  updateURL() {
    if (!this.currentVariant || this.dataset.updateUrl === 'false') return;
    window.history.replaceState({ }, '', `${this.dataset.url}?variant=${this.currentVariant.id}`);
  }

  updateShareUrl() {
    const shareButton = document.getElementById(`Share-${this.dataset.section}`);
    if (!shareButton || !shareButton.updateUrl) return;
    shareButton.updateUrl(`${window.shopUrl}${this.dataset.url}?variant=${this.currentVariant.id}`);
  }

  updateVariantInput() {
    debugger
    const productForms = document.querySelectorAll(`#product-form-${this.dataset.section}, #product-form-installment-${this.dataset.section}`);
    productForms.forEach((productForm) => {
      const input = productForm.querySelector('input[name="id"]');
      input.value = this.currentVariant.id;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

  updatePickupAvailability() {
    const pickUpAvailability = document.querySelector('pickup-availability');
    if (!pickUpAvailability) return;
console.log(this.currentVariant,'curvarrrrrrrr');
    if (this.currentVariant && this.currentVariant.available) {
      pickUpAvailability.fetchAvailability(this.currentVariant.id);
    } else {
      pickUpAvailability.removeAttribute('available');
      pickUpAvailability.innerHTML = '';
    }
  }

  removeErrorMessage() {
    const section = this.closest('section');
    if (!section) return;

    const productForm = section.querySelector('product-form');
    if (productForm) productForm.handleErrorMessage();
  }

  renderProductInfo() {
    fetch(`${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section}`)
      .then((response) => {console.log(response,'res');response.text()})
      .then((responseText) => {
        const html = new DOMParser().parseFromString(responseText, 'text/html')
        const destination = document.getElementById(`price-${this.dataset.section}`);
        const source = html.getElementById(`price-${this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section}`);
        if (source && destination) destination.innerHTML = source.innerHTML;

        const price = document.getElementById(`price-${this.dataset.section}`);

        if (price) price.classList.remove('visibility-hidden');
        this.toggleAddButton(!this.currentVariant.available, "Soldout");
      });
  }

  toggleAddButton(disable = true, text, modifyClass = true) {
    const productForm = document.getElementById(`product-form-${this.dataset.section}`);
    if (!productForm) return;
    const addButton = productForm.querySelector('[name="add"]');
    const addButtonText = productForm.querySelector('[name="add"] > span');
    if (!addButton) return;

    if (disable) {
      addButton.setAttribute('disabled', 'disabled');
      if (text) addButtonText.textContent = text;
    } else {
      addButton.removeAttribute('disabled');
      addButtonText.textContent = window.variantStrings.addToCart;
    }

    if (!modifyClass) return;
  }

  setUnavailable() {
    const button = document.getElementById(`product-form-${this.dataset.section}`);
    const addButton = button.querySelector('[name="add"]');
    const addButtonText = button.querySelector('[name="add"] > span');
    const price = document.getElementById(`price-${this.dataset.section}`);
    if (!addButton) return;
    addButtonText.textContent = "Unavailable";
    if (price) price.classList.add('visibility-hidden');
  }

  getVariantData() {
    this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
    return this.variantData;
  }
}

customElements.define('variant-selects', VariantSelects);

class VariantRadios extends VariantSelects {
  constructor() {
    super();
  }

  updateOptions() {
    const fieldsets = Array.from(this.querySelectorAll('fieldset'));
    this.options = fieldsets.map((fieldset) => {
      return Array.from(fieldset.querySelectorAll('input')).find((radio) => radio.checked).value;
    });
  }
}

customElements.define('variant-radios', VariantRadios);



class ProductForm extends HTMLElement{
  constructor(){
    super();
    this.init()
  }

  init(){
      const myForm = this.querySelector('[data-type="add-to-cart-form"]')
    
    const submitButton = myForm.querySelector('.product-form__submit')
    myForm.addEventListener('submit',(e)=>{
      e.preventDefault();debugger;
      const formEntries = new FormData(myForm).entries();
      const json = new URLSearchParams(new FormData(myForm)).toString()
    const id = myForm.querySelector('[name="id"]').value
      const data = {
        "id": id,
        "quantity": 1
      };
      
      fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then((data) => {
          console.log('Success:', data);
          var cart = new theme.CartDrawer
          cart.init()
          cart.open();
        })
    })
  }
}


customElements.define('product-form', ProductForm);