/**
 * Copies the email address from the closest element with class ".email-address"
 * to the clipboard when an element with class ".icon-tabler-copy" is clicked.
 *
 * @function
 * @name jQuery.fn.copyEmailToClipboard
 * @returns {void}
 */
$.fn.copyEmailToClipboard = function () {
    // Get the email address from the closest element with class ".email-address"
    const email = $(this).find('.email-address').text().trim();

    // Create a hidden input element with the email address as its value and select it
    const input = $('<input>').val(email).appendTo('body').select();

    // Copy the selected text to the clipboard
    document.execCommand('copy');

    // Remove the input element from the DOM
    input.remove();

    // Show an alert message to indicate that the email has been copied
    alert('Email copied to clipboard!');
};

/**
 * Attaches the "copyEmailToClipboard" function to the click event of elements with
 * class ".icon-tabler-copy" that are contained within an element with class ".email-address".
 *
 * @function
 * @name jQuery.on
 * @param {string} eventName - The name of the event to bind the function to (in this case, "click").
 * @param {string} selector - The selector for the elements that the event should be triggered on (in this case, ".icon-tabler-copy").
 * @param {function} handler - The function to be executed when the event is triggered.
 * @returns {void}
 */
$('body').on('click', '.icon-tabler-copy', function (e) {
    // Stop the click event from propagating further up the DOM tree
    e.stopPropagation();

    // Call the "copyEmailToClipboard" function on the closest ancestor element with class ".email-address"
    $(this).closest('.email-address').copyEmailToClipboard();
});