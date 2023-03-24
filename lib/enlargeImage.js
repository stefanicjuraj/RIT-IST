/**
 * Enlarges an image by a specified amount on hover by modifying its CSS "transform" property.
 *
 * @function
 * @name jQuery.fn.enlargeOnHover
 * @returns {jQuery} - The jQuery object that this function was called on.
 */
$.fn.enlargeOnHover = function () {
    // The amount to enlarge the image by (e.g., 1.2 means 120%)
    const enlargeAmount = 1.2;

    // Attach event listeners for mouseenter and mouseleave to the images contained in the selected elements
    this.on('mouseenter', 'img', function () {
        // Enlarge the image by setting its "transform" property to a scaled value and adding a transition
        $(this).css({
            'transform': `scale(${enlargeAmount})`,
            'transition': 'transform 0.3s'
        });
    }).on('mouseleave', 'img', function () {
        // Shrink the image back to its original size by removing the "transform" property and adding a transition
        $(this).css({
            'transform': 'none',
            'transition': 'transform 0.3s'
        });
    });

    // Return the jQuery object that this function was called on to allow for chaining
    return this;
};