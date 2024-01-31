//Name Field Validaion
function allowOnlyLetters(evt) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (
      (charCode < 65 || charCode > 90) &&
      (charCode < 97 || charCode > 122) &&
      charCode !== 32
    ) {
      return false;
    }
    return true;
  }

  //Number Validation
  function isNumberKey(evt) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode < 48 || charCode > 57) {
      return false;
    }
    return true;
  }
function resetForm(){
    document.getElementById("user_form").reset();
}