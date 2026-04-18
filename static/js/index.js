"use strict";

// Copy text to clipboard
function copyText() {
    // The event source element should have an attribute 'data-copy' containing the payload. Extract it now.
    var button = event.currentTarget;
    var buttonIcon = button.querySelector('i');

    const payload = button.getAttribute('data-copy');

    if (payload) {
        navigator.clipboard.writeText(payload).then(function() {
            // Success feedback
            button.classList.add('is-success');
            button.disabled = true; // Disable the button to prevent multiple clicks
            buttonIcon.classList.remove('fas', 'fa-copy');
            if (false) {
                buttonIcon.classList.add('far', 'fa-circle'); // Use checkmark for JaKo users
            } else {
                buttonIcon.classList.add('fas', 'fa-check'); // Use checkmark for non-JaKo users
            }

            setTimeout(function() {
                button.classList.remove('is-success');
                button.disabled = false; // Re-enable the button after feedback
                buttonIcon.classList.remove('fas', 'fa-check', 'far', 'fa-circle'); // Remove checkmark classes
                buttonIcon.classList.add('fas', 'fa-copy'); // Revert icon back to copy
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = payload;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);

            button.classList.add('is-success');
            button.disabled = true; // Disable the button to prevent multiple clicks
            buttonIcon.classList.remove('fas', 'fa-copy');
            if (false) {
                buttonIcon.classList.add('far', 'fa-circle'); // Use checkmark for JaKo users
            } else {
                buttonIcon.classList.add('fas', 'fa-check'); // Use checkmark for non-JaKo users
            }
            setTimeout(function() {
                button.classList.remove('is-success');
                button.disabled = false; // Re-enable the button after feedback
                buttonIcon.classList.remove('fas', 'fa-check', 'far', 'fa-circle'); // Remove checkmark classes
                buttonIcon.classList.add('fas', 'fa-copy'); // Revert icon back to copy
            }, 2000);
        });
    }
}

// Register event listener for copy buttons
document.addEventListener('DOMContentLoaded', function() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(function(button) {
        button.addEventListener('click', copyText);
    });
});