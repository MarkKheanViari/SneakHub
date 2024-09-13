document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    var nameField = document.querySelector('input[name="name"]');
    var descriptionField = document.querySelector('textarea[name="description"]');
    var photoField = document.querySelector('input[name="photo"]');
    var categoryField = document.querySelector('select[name="category"]');

    var name = nameField.value;
    var description = descriptionField.value;
    var photo = photoField.value;
    var category = categoryField.value;

    if (name && description && photo && category) {
        // Show SweetAlert2 message
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, submit it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Submitted!',
                    'Your form has been submitted.',
                    'success'
                )

                // Clear the form fields
                nameField.value = '';
                descriptionField.value = '';
                photoField.value = '';
                categoryField.value = '';
            }
        });
    }
});
