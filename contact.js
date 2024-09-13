const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});
document.querySelector('.contact-form').addEventListener('submit', function(event) {
  event.preventDefault();

  var username = event.target.name.value;
  var email = event.target.email.value;
  var phone = event.target.phone.value;
  var message = event.target.message.value;

  // Check if any field is empty
  if (!username || !email || !phone || !message) {
      // Show SweetAlert2 error message
      Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
      });
  } else {
      // Show SweetAlert2 success message
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your message has been sent",
        showConfirmButton: false,
        timer: 1500
      });
  }
});
