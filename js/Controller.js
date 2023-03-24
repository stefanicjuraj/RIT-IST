import { Model } from './Model.js';

/**
* The controller that connects the model and the view.
* @class
* @param {Model} model - The model used for fetching data.
* @param {Object} view - The view that renders the data.
*/
export class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // render spinner while data is loading
        this.view.renderSpinner();

        // 1. send the request - jqXHR object
        // returned that holds the response on success (available within the done() callback)
        // get data from the server
        let about = this.model.getData('/about');
        let undergraduate = this.model.getData('/degrees/undergraduate');
        let graduate = this.model.getData('/degrees/graduate');
        let minors = this.model.getData('/minors');
        let faculty = this.model.getData('/people/faculty');
        let coop = this.model.getData('/employment/coopTable');
        let employment = this.model.getData('/employment/employmentTable');

        // 2. specify what will be executed when the request is successful (done() callback)
        // render sections when data is available

        about.done((data) => {
            this.view.renderAboutSection(data);
            this.view.renderButtonSection(data);
        });

        undergraduate.done((data) => {
            this.view.renderUndergraduateSection(data);
        });

        graduate.done((data) => {
            this.view.renderGraduateSection(data);
        });

        minors.done((data) => {
            this.view.renderMinorsSection(data);
        });

        faculty.done((data) => {
            this.view.renderFacultySection(data);
        });

        coop.done((data) => {
            this.view.renderCoopSection(data);
        });

        employment.done((data) => {
            this.view.renderEmploymentSection(data);
        });

    }
}