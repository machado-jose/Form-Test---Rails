document.querySelector('.storage-form-data').addEventListener('click', e =>{
  let formElement = document.querySelector('form');
  [...formElement].forEach(el => {
    if(el.tagName == 'INPUT' && el.name != "authenticity_token" && el.type != "password"){
      let reg = /\[(\w*)\]/;
      let key = el.name.match(reg)[1];
      sessionStorage.setItem(key, el.value);
    }
  });
});

window.addEventListener('load', e => {
  let formElement = document.querySelector('form');
  [...formElement].forEach(el => {
    if(el.tagName == 'INPUT' && el.name != "authenticity_token" && el.type != "password"){
      let reg = /\[(\w*)\]/;
      let key = el.name.match(reg)[1];
      el.value = sessionStorage.getItem(key);
    }
  });
}); 