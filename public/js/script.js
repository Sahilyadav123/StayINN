(function () {
    'use strict'

    // Fetch all forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault() // Prevent the form from submitting
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()

