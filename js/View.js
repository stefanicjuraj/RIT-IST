/**
* A View class that is responsible for rendering the webpage's content.
*/
export class View {

    /**
    * Constructor method that initializes all the class variables for the View class.
    */
    constructor() {
        /*
        * JQuery object to hold the section that displays the loading spinner.
        * @type {Object}
        */
        this.$loadSection = $('#section-load');
        /*
        * JQuery objects to hold the section that displays the sections.
        * @type {Object}
        */
        this.$minorsSection = $('#section-minors');
        this.$aboutSection = $('#section-about');
        this.$faculty = $('#section-faculty');
        this.$undergraduate = $('#section-undergraduate');
        this.$graduate = $('#section-graduate');
        this.$sectionButton = $('#section-button');
    }

    /**
    * A method to render the loading spinner
    */
    renderSpinner() {
        this.$loadSection.html('<img class="mx-auto text-center" src="media/spinner.gif" id="spinner"/>');
        // select all sections which id starts with 'section-'
        // $('[id^=section-]').html('<img src="media/gears.gif" id="spinner"/>');
    }

    /**
    * A method to render the about section.
    * @param {Object} data - An object containing data to be displayed on the about section.
    * @param {string} data.title - The title of the about section.
    * @param {string} data.description - The description of the about section.
    * @param {string} data.quote - The quote of the about section.
    * @param {string} data.quoteAuthor - The author of the quote of the about section.
    */
    renderAboutSection(data) {
        this.$loadSection.html(''); //removes any previous content (like spinner)

        $(document).ready(function () {
            // set the initial value of the progress bar to 0
            $("#progressbar").progressbar({
                value: 0
            });

            // bind the scroll event to the window
            $(window).scroll(function () {
                // Calculate the current scroll position
                var scrollPosition = $(window).scrollTop();

                // calculate the maximum scroll distance
                var maxScroll = $(document).height() - $(window).height() - $("#progressbar").height();

                // calculate the percentage of the scroll progress
                var progressPercentage = Math.floor((scrollPosition / maxScroll) * 100);

                // update the value of the progress bar
                $("#progressbar").progressbar("value", progressPercentage);
            });

            // set the progress bar to be fixed to the top of the page
            $("#progressbar").css({
                "position": "fixed",
                "width": "100%",
                "height": "5px",
                "color": "#f76902"
            });
        });

        // about item
        let $aboutItem = $('<div>')
            .addClass('mx-auto text-center')
            .append($('<h1>')
                .addClass('text-5xl')
                .html(`<b>${data.title}</b>`));

        // about description
        let $aboutDescription = $('<div>')
            .addClass('w-2/3 mx-auto mt-10 mb-10')
            .append($('<h2>')
                .text(data.description));

        // about quote
        let $aboutQuote = $('<figure>')
            .addClass('max-w-screen-md mx-auto text-center mt-20 mb-10')
            .append($('<img>')
                .addClass('w-10 mx-auto text-center orange')
                .attr('src', './media/quote.svg'))
            .append($('<blockquote>')
                .append($('<p>')
                    .addClass('text-1xl italic font-medium text-gray-900')
                    .text(data.quote)));

        // about quote author
        let $aboutQuoteAuthor = $('<figcaption>')
            .addClass('flex items-center justify-center mt-6 space-x-3')
            .append($('<div>')
                .addClass('flex items-center divide-x-2 divide-gray-500')
                .append($('<cite>')
                    .addClass('pr-3 text-gray-900')
                    .text(data.quoteAuthor)));

        // append item
        this.$aboutSection.append($aboutItem);
        // append description
        this.$aboutSection.append($aboutDescription);
        // append quote
        this.$aboutSection.append($aboutQuote);
        // append quote author
        this.$aboutSection.append($aboutQuoteAuthor);

    }

    /**
    * Renders the Undergraduate section of the webpage with provided data.
    * @param {Object} data - The data object containing the Undergraduate degrees information.
    * @param {Array} data.undergraduate - The array of Undergraduate degrees.
    * @param {string} data.undergraduate.title - The title of the Undergraduate degree.
    * @param {string} data.undergraduate.description - The description of the Undergraduate degree.
    * @param {Array} data.undergraduate.concentrations - The array of concentrations of the Undergraduate degree.
    * @param {string} data.undergraduate.concentrations.concentration - The name of the concentration.
    *@returns {void}
    */
    renderUndergraduateSection(data) {
        // h1 element
        let $h1 = $('<h1 class="text-3xl text-center mt-20 font-bold"><span class="orange">»</span> Explore Undergraduate degrees</h1>');
        // div element
        let $undergraduateDiv = $('<div>')
            .addClass('mt-20 p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5');

        // loops through each Undergraduate degree in the data object and creates a div element for each
        $.each(data.undergraduate, function (index, item) {
            let concentrationsHtml = '';
            // loops through each concentration for the Undergraduate degree and creates the html element for each
            $.each(item.concentrations, function (i, concentration) {
                concentrationsHtml += `
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
            ${concentration}
          </span>
        `;
            });

            // div element for the Undergraduate degree with its title, description, and concentrations
            let $undergraduateItem = $('<div>')
                .addClass('rounded overflow-hidden shadow-lg bg-white rounded-lg')
                .append($('<div>')
                    .addClass('px-6 py-4')
                    .append($('<div>')
                        .addClass('font-bold text-xl mb-2')
                        .text(item.title), $('<p>')
                            .addClass('text-gray-700 text-base')
                            .text(item.description)
                    ),
                    $('<div>')
                        .addClass('px-6 pt-4 pb-2')
                        .append(
                            $('<span>')
                                .addClass('orange mb-3')
                                .text('Concentrations:'),
                            $('<br>'),
                            $('<br>'),
                            concentrationsHtml
                        )
                );

            $undergraduateDiv.append($undergraduateItem);
        });

        this.$undergraduate.append($undergraduateDiv);
        $('#section-undergraduate').append($h1).append($undergraduateDiv);
    }

    /**
    * Renders the Graduate section on the page with the provided data.
    * @param {object} data - The data object containing the graduate degree information.
    * @param {Array} data.graduate - The array of graduate degree objects.
    * @param {string} data.graduate[].title - The title of the graduate degree.
    * @param {string} data.graduate[].description - The description of the graduate degree.
    * @param {Array} data.graduate[].concentrations - The array of concentrations for the graduate degree.
    */
    renderGraduateSection(data) {
        let $h1 = $('<h1 class="text-3xl text-center mt-10 font-bold"><span class="orange">»</span> Explore Graduate degrees</h1>');
        let $graduateDiv = $('<div>')
            .addClass('mt-20 p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5');
        let $graduateItem;

        data.graduate = data.graduate.slice(0, -1);
        $.each(data.graduate, function (index, item) {
            let concentrationsHtml = '';
            $.each(item.concentrations, function (i, concentration) {
                concentrationsHtml += `
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
                ${concentration}
              </span>
            `;
            });

            $graduateItem = $('<div>')
                .addClass('rounded overflow-hidden shadow-lg rounded-lg')
                .append($('<div>')
                    .addClass('px-6 py-4')
                    .append($('<div>').
                        addClass('font-bold text-xl mb-2')
                        .text(item.title), $('<p>')
                            .addClass('text-gray-700 text-base')
                            .text(item.description)
                    ),
                    $('<div>').addClass('px-6 pt-4 pb-2').append($('<span>').addClass('orange').text('Concentrations:'),
                        $('<br>'),
                        $('<br>'),
                        concentrationsHtml
                    )
                );

            $graduateDiv.append($graduateItem);
        });

        this.$graduate.append($graduateDiv);
        $('#section-graduate').append($h1).append($graduateDiv);
    }

    /**
    * Renders a section of the webpage that displays information about the available minor degree programs.
    *
    * @function
    * @name renderMinorsSection
    * @param {Object} data - An object containing information about the available minor degree programs.
    * @param {Array} data.UgMinors - An array of objects containing information about individual minor degree programs.
    * @param {string} data.UgMinors[].name - The name of the minor degree program (used for generating anchor links).
    * @param {string} data.UgMinors[].title - The title of the minor degree program (used for display purposes).
    * @param {string} data.UgMinors[].description - A brief description of the minor degree program.
    * @returns {void}
    */
    renderMinorsSection(data) {
        // section title
        const $h1 = $('<h1>').addClass('text-3xl text-center mt-10 mb-10 font-bold')
            .html('<span class="orange">»</span> Explore Minor degrees');
        // tabs div
        const $minorsDiv = $('<div>').attr('id', 'tabs');

        // create tabs
        const $tabsList = $('<ul>');
        $.each(data.UgMinors, function (index, item) {
            const $tabItem = $('<li>').html(`<a href="#${item.name}">${item.title}</a>`);
            $tabsList.append($tabItem);

            const $tabContent = $('<div>').attr('id', item.name).html(`
            <p>${item.description}</p>
          `);

            $minorsDiv.append($tabContent);
        });
        $minorsDiv.prepend($tabsList);

        // initialize the tabs
        $minorsDiv.tabs({ heightStyle: 'content' });

        this.$minorsSection.append($h1, $minorsDiv);
    }

    /**
    * Renders the faculty section of the webpage with the provided data.
    * @param {Object} data - The data used to populate the faculty section.
    * @param {Array<Object>} data.faculty - An array of objects representing faculty members.
    * @param {string} data.faculty[].name - The name of the faculty member.
    * @param {string} data.faculty[].email - The email of the faculty member.
    * @param {string} data.faculty[].title - The title of the faculty member.
    * @param {string} data.faculty[].imagePath - The path to the image of the faculty member.
    */
    renderFacultySection(data) {
        // section title
        const $h1 = $('<h1>').addClass('text-3xl text-center mt-20 mb-20 font-bold')
            .html('<span class="orange">»</span> Faculty members');

        // section div
        const $facultyDiv = $('<div>').addClass('mx-auto mt-10 w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8');

        // div title
        const $facultyTitle = $('<div>').addClass('flex items-center justify-between mb-4')
            .html('<h5 class="text-xl font-bold leading-none text-gray-900">Meet Professors and Lecturers</h5>');

        const $facultyList = $('<div>').addClass('flow-root')
            .html('<ul role="list" class="divide-y divide-gray-200"></ul>');

        const filteredFaculty = data.faculty.filter(item => item.title === 'Professor' || item.title === 'Lecturer');

        $.each(filteredFaculty, function (index, item) {
            const $facultyListItem = $(`
            <li class="py-3 sm:py-3">
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <img class="w-12 h-12 rounded-full enlarge-image" src="${item.imagePath}" alt="${item.name} image">
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">${item.name}</p>
                  <p class="text-sm text-gray-500 truncate email-address">
                  ${item.email}
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-copy" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"></path>
                  <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path>
               </svg>
                  </p>
                  
                </div>
                <div class="inline-flex text-sm items-center font-semibold text-gray-900">${item.title}</div>
              </div>
            </li>
          `);

            $facultyList.find('ul').append($facultyListItem);

            $facultyListItem.on('click', function () {
                $(this).copyEmailToClipboard();
            });
        });

        $facultyDiv.append($facultyTitle, $facultyList);

        // Call the plugin on the images
        $facultyDiv.enlargeOnHover();

        this.$faculty.append($facultyDiv);
        $('#section-faculty').append($h1, $facultyDiv);
    }

    /**
    * Renders the co-op section of the page with the provided data.
    * Creates a DataTable with the co-op information.
    * @param {Object} data - The data containing the co-op information.
    */
    renderCoopSection(data) {
        var rows = [];

        // loop through the data and create a new table row for each item
        $.each(data.coopTable.coopInformation, function (index, item) {
            var row = [];
            row.push(item.employer);
            row.push(item.degree);
            row.push(item.city);
            row.push(item.term);
            rows.push(row);
        });

        // initialize DataTable with the rows array
        $('#coopTable').DataTable({
            data: rows,
            retrieve: true,
            paging: true,
            columns: [
                { title: 'Employer' },
                { title: 'Degree' },
                { title: 'City' },
                { title: 'Term' }
            ]
        });

    }

    /**
    * Renders the employment section of the page with the provided data.
    * Creates a DataTable with the employment information.
    * @param {Object} data - The data containing the employment information.
    */
    renderEmploymentSection(data) {
        var rows = [];

        // loop through the data and create a new table row for each item
        $.each(data.employmentTable.professionalEmploymentInformation, function (index, test) {
            const row = [];
            row.push(test.employer);
            row.push(test.degree);
            row.push(test.city);
            row.push(test.startDate);
            rows.push(row);
        });

        // initialize DataTable with the rows array
        $('#employmentTable').DataTable({
            data: rows,
            retrieve: true,
            paging: true,
            columns: [
                { title: 'Employer' },
                { title: 'Degree' },
                { title: 'City' },
                { title: 'Start Date' }
            ]
        });

    }

    /**
    *
    * Renders the button section and appends it to the "section-button" element
    * @function
    * @returns {void}
    * @type 
    */
    renderButtonSection() {
        /** 
        * Creates a new anchor element with the given href attribute
        * @type {JQuery<HTMLAnchorElement>}
        */
        var $button = $('<a>', {
            href: '#section-about'
        });

        // Add the necessary classes to the anchor element
        $button.addClass('ui-button ui-widget ui-corner-all');

        // Add text to the button
        $button.text('Back to top');

        // Append the button to the existing section with the id "section-button"
        $button.appendTo('#section-button');
    }

}