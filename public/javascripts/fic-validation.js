$(document).ready(function () {

    // make-payment
    $("#make-payment").validate({
        rules: {
            month: {
                required: true,
                maxlength: 11,
                digits: false
            },
            year: {
                required: true,
                maxlength: 4,
                digits: true
            },
            day2: {
                required: true,
                maxlength: 2,
                digits: true
            },
            month2: {
                required: true,
                maxlength: 11,
                digits: false
            },
            year2: {
                required: true,
                maxlength: 4,
                digits: true
            },
            understand: {
                required: true
            }
        },
        focusInvalid: false, // disables focusing of invalid elements
        invalidHandler: function(form, validator) {
            var errors = validator.numberOfInvalids();

            if (errors) {
                $("html, body").animate({ scrollTop: 0 }, "fast");
            }
        },
        showErrors: function(errorMap, errorList) {
            var msg = "";
            var errorClass; // element required for error class
            var errorMsg; // element required for error message
            var errorMsgLength; // element required for error message

            if (errorList.length !== 0) {
                msg = "<h1 class=\"heading-medium error-summary-heading\" id=\"error-summary-heading\">Message to alert the user to a problem goes here</h1><p>Optional description of the errors and how to correct them</p><ul class=\"error-summary-list\">"
                for ( i = 0; this.errorList[ i ]; i++ ) {
                    error = this.errorList[ i ];
                    // msg += "<li><a href=\"#" + error.element.id + "\"> " + error.message + "</a></li>";
                    msg += "<li><a href=\"#" + error.element.id + "\"> " + "<span class=\"error-message\">" + error.message + "</span>" + "</a></li>";
                    if (error.element.id == "understand") {
    					errorClass = error.element.parentElement.parentElement.parentElement;
    					errorMsg = error.element.parentElement.previousElementSibling;
    				} else {
                        errorClass = error.element.parentElement;
                        errorMsgLength = error.element.previousElementSibling.children.length;
                        errorMsgLength = errorMsgLength - 1;
                        errorMsg = error.element.previousElementSibling.children[errorMsgLength];
                    }
                    $("#error-summary").addClass("error-summary"); // adds class="error-summary"
                    $(errorClass).addClass("error"); // adds an "error" class onto relevant element
                    $(errorMsg).html(error.message); // adds an error message onto relevant element
                }
                msg += "</ul>";
                + "</div>";
            } else {
                $("#error-summary").removeClass("error-summary"); // removes class="error-summary" (css hidden)
            }

            $("#error-summary").html(msg); // place error text inside summary-box
            this.defaultShowErrors(); // also show default labels from errorPlacement callback
            $("label.error").remove(); // removes default validation error messages from the DOM

            $("input.form-control.valid").each(function() {
                var parentElement;
                var errorSpan;
                var previousElementSibling;

                if (this.id != "understand") {
                    parentElement = $(this.parentElement); // div.form-group.error
                    errorSpan = this.previousElementSibling.children.length;
                    errorSpan = errorSpan - 1;
                    previousElementSibling = this.previousElementSibling.children[errorSpan]; // span.error-message
                } else {
                    parentElement = $(this.parentElement.parentElement.parentElement);  // div.form-group.error
                    errorSpan = this.parentElement.parentElement.children.length;
                    errorSpan = errorSpan - 2;
                    previousElementSibling = this.parentElement.parentElement.children[errorSpan]; // span.error-message
                }

                if (parentElement.hasClass("error")) {
                    parentElement.removeClass("error"); // removes class="error"
                }
                if (previousElementSibling.innerHTML != "") {
                    previousElementSibling.innerHTML = ""; // removes front-end error-message
                }
            });
        },
        submitHandler: function() { document.location.href = "/contributions-and-payment" }
    });
    // end make-payment

});