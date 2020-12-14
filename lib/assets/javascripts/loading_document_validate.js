var documentField = document.querySelector('.document-number');
var documentBtn = document.querySelector('.document-check');

function failCheckDocument(message){
  alert(message);
  $(documentField).removeAttr('readonly');
  $(documentBtn).removeAttr('disabled');
};

function checkDocument(){
  const reg = /\.|\-/gi;

  var documentNumber = $(documentField).val().replaceAll(reg, '');
  if(documentNumber.length == 11){
    $(documentField).attr('readonly', true);
    $(documentBtn).attr('disabled', true);

    if(!documentValidate(documentNumber)){
      failCheckDocument('CPF inválido');
    }else{
      $('.invisible-loading-message').toggle();
      csrfToken = $('input[name="authenticity_token"]').val();

      $.ajax({
        method: "POST",
        url: "/validate",
        data: {
          document: documentNumber
        },
        headers: {'X-CSRF-Token': csrfToken}
      })
      .done(function(response){
        $('.invisible-loading-message').toggle();
        if(response["success?"] == true) {
          [...document.querySelectorAll(".invisible-form")].forEach(el=>{
            $(el).toggle('slow', function(){});
            $(documentBtn).toggle();
          });
        }else{
          failCheckDocument("CPF não cadastrado");
        }
      })
      .fail(function(){
        failCheckDocument(err.message);
      });
    }
  }
}

if(documentField != null && documentBtn != null){

  documentBtn.addEventListener('click', e => {
    e.preventDefault();
    checkDocument();
  });

  documentField.addEventListener('input', e => {
    checkDocument();
  });

}

/* *** Requisição usando fetch ****

let formData = new FormData();
formData.append('document', documentNumber)
let initObject = {
    method: 'POST', 
    body: formData,
    headers: {'X-CSRF-Token': csrfToken}
};

var userRequest = new Request('/validate', initObject);

fetch(userRequest)
.then(function (response) {
    response.json().then(data => {
      documentField.removeAttribute('readonly');
      document.querySelector('.invisible-loading-message').style.display = 'none';
      if(data["success?"] == true) {
        [...document.querySelectorAll(".invisible-form")].forEach(el=>{
          el.style.display = 'block';
        });
      }else{
        alert("CPF não cadastrado");
        documentField.removeAttribute('readonly');
      }
    });
})
.catch(function (err) {
    alert(err.message);
    documentField.removeAttribute('readonly');
});

*/