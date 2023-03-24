/**
 * Model is responsible of loading the data form a remote site. The jQuery's ajax()
 * method is used to send requests. 
 * 
 * The ajax() method returns the jQuery XMLHttpRequest (jqXHR) object, which 
 * is a superset of the browser's native XMLHttpRequest object. It contains, 
 * for example, responseText & responseJSON properties, as well as 
 * callback options such as jqXHR.done() & jqXHR.fail(). The ajax() method is 
 * commonly used as:
 *                      $.ajax({}).done(()=>{}).fail(()=>{});
 * 
 * Here, we implement only the fail() callback because we want to implement the 
 * done() callback in the controller. Hence, the Model.getData() returns the 
 * jqXHR object for the controller to implement the done() callback. 
 *  
 *  @see {@link https://api.jquery.com/jquery.ajax/|jQuery.ajax()} for further infomation
 */
/**
 * Represents a data model for making AJAX requests.
 * @class
 */
export class Model {

    /**
     * Makes an AJAX GET request to the specified endpoint and returns a promise that resolves with the response data.
     * @param {string} endpoint - The URL endpoint to request data from.
     * @returns {Promise} A promise that resolves with the response data or rejects with an error message.
     */
    getData(endpoint) {
        let jqXHR = $.ajax({
            method: "GET",
            url: "proxy.php",
            cache: false, // default: true
            data: { path: endpoint },
            timeout: 10000, // waiting time
            dataType: "json" // type of data
        }).fail((jqXHR, textStatus, error) => {
            console.log('FAIL');
        });
        return jqXHR;
    }
}