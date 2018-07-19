function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
}

$(document).ready(function(){

    // GOVUK.toggle.init();

    // The following JavaScript code is just for demo purposes.
    // Not For Production, please remove when developing the real thing.
    if($('.add-search').length > 0){
        $('.phase-banner').append($('<a href="login" class="log-out-link">Search again</a>'));
    }

    if($('.add-log-out').length > 0 && !document.location.href.includes("administrate")){
        $('.service-header').prepend($('<a href="login" class="log-out-link" id="logout-link">Logout</a>'));
    }
    if ($('.add-log-out').length > 0 && document.location.href.includes("administrate")){
        $('.service-header').prepend($('<a href="admin-login" class="log-out-link" id="logout-link">Logout</a>'));
    }

    var $errorLayer = $('.form-group'),
        $errSummary = $('.error-summary'),
        $errMessage = $('.error-message');

    function displayPageErrors(errorMessageClass){
        $errSummary.removeClass('display-none');
        if(errorMessageClass){
            $('.'+errorMessageClass).removeClass('display-none').parents('.form-group').addClass('error');
        } else {
            $errMessage.removeClass('display-none');
            $errorLayer.addClass('error');
        }
    }

    function displayFieldErrorWithClass(errorMessageClass) {
        var $errorLayer = $(errorMessageClass).parents('.form-group');
        // var $checkboxError = $(errorMessageClass).parents('fieldset')[0]; // FIC amends for checkbox error-styles
        $errorLayer.addClass('error');
        // if ($checkboxError) {
        //     $($checkboxError).addClass('form-control-error'); // FIC amends for checkbox error-styles
        // }
        $(errorMessageClass, $errorLayer).removeClass('display-none');
    }

    function displayFieldError($inputField){
        var i;
        var $errorLayer = $inputField.parents('.form-group');
        var $radioField;
        $errorLayer.addClass('error');
        // if ($inputField.type == "INPUT") {
        //     $inputField.addClass('form-control-error'); // FIC amends for input error-styles
        // } else {
        if ($radioField = $($inputField)) { // [array]
            for (i = 0; i < $radioField.length; i++){
                $radioField.addClass('form-control-error'); // FIC amends for radio error-styles
            };
        };
        $('.error-message', $errorLayer).removeClass('display-none');
        $($inputField[0].parentElement.parentElement.previousElementSibling).removeClass('js-hidden');
    }

    function clearFormErrors($form){
        $('.form-group', $form).removeClass('error');
        $('.form-control-error').removeClass('form-control-error'); // FIC amends for input error-styles
        $('.error-message', $form).addClass('display-none');
        $('.error-summary').addClass('display-none');
    }

    // for cleaner urls after using form navigation
    var $jumpForm = $('.jump-form');
    $jumpForm.on('submit', function (evt) {
        evt.preventDefault();
        location.assign($jumpForm.attr('action'));
    });

    // radio type input fields
    var $formWithRadioButtons = $('.demo-validation-radio');
    if($formWithRadioButtons.length > 0){
        $formWithRadioButtons.on('submit', function (evt) {
            evt.preventDefault();
            if($('input:checked').length < 1){
                displayPageErrors();
            } else {
                location.assign($formWithRadioButtons.attr('action'));
            }
        });
    }

    // text type input fields
    var $demoValidationInputsForm = $('.demo-validation-input');
    if($demoValidationInputsForm.length > 0){
        $demoValidationInputsForm.on('submit', function (evt) {
            evt.preventDefault();
            var isValid = true;

            $('input', $demoValidationInputsForm).each(function() {
                if($(this).val() == ""){
                    isValid = false;
                }
            });

            if(isValid){
                location.assign($demoValidationInputsForm.attr('action'));
            } else {
                displayPageErrors();
            }
        });
    }

    // general and used for multiple forms
    var $formToValidated = $('.form-to-validate');

    var messages = {
        "exists" : "An account using this email address already exists.",
        "unmatched" : "We could not match the information you provided."
    };

    if($formToValidated.length > 0){

        $formToValidated.on('submit', function (evt) {
            evt.preventDefault();

            // clears error displays, resets error flag
            clearFormErrors($formToValidated);
            var isValid = true;
            var submitFormIfValid = function(){
                if(isValid){
                    location.assign($formToValidated.attr('action'));
                } else {
                    $('.error-summary').removeClass('display-none');
                    $('html, body').animate({ scrollTop: 0 }, 'fast');
                }
            };

            // validates text input fields
            $('.validate-text-input', $formToValidated).each(function() {
                if($.trim($(this).val()) == ""){
                    displayFieldError($(this));
                    isValid = false;
                }
            });

            // validates radio button via group name
            $('.validate-radio-input', $formToValidated).each(function() {
                var radioGroupName = $(this).attr('data-validate-radio-input');
                var radioGroupValue = $("input[name='" + radioGroupName + "']:checked").val();
                if(radioGroupValue == undefined){
                    displayFieldError($(this));
                    isValid = false;
                }
            });

            // form specific code
            if($formToValidated.attr('id') == 'another-month-form') {

                // changes destination based on checkbox value
                var anotherMonthValue = $("input[name='different-month']:checked").val();
                if (anotherMonthValue == 'yes') {
                    location.assign($formToValidated.attr('action'));
                } else {
                    location.assign('start');
                }
            }

            // else if ($formToValidated.attr('id') == 'employer-account-info-form'){
            //
            //     // change destination based on cookie value
            //     var paidThisMonth = Cookies.get('paidThisMonth');
            //     if(isValid){
            //         if(paidThisMonth == 'yes'){
            //             location.assign($formToValidated.attr('action'));
            //         } else {
            //             location.assign('make-payment');
            //         }
            //     } else {
            //         $('.error-summary').removeClass('display-none');
            //     }
            // }

            else if ($formToValidated.attr('id') == 'login-form'){

                // change location based on input
                var loginEmail = $('#username', $formToValidated).val();

                Cookies.set('payingMonth', 'February');

                if(loginEmail == 'ea'){
                    Cookies.set('ea', 'show');
                    location.assign('make-payment');
                    return false;
                } else {
                    Cookies.remove('ea');
                }

                if(loginEmail == 'gp'){
                    Cookies.set('staffgps', 'show');
                } else {
                    Cookies.remove('staffgps');
                }

                if(loginEmail == 'csv'){
                    Cookies.set('csv', 'show');
                } else {
                    Cookies.remove('csv');
                }

                // BSA Admins can create employers
                if(loginEmail == 'bsa_admin'){
                    Cookies.set('loggedInAs', 'bsa_admin');
                    $formToValidated.attr('action', 'admin-employer-create');
                } else {
                    Cookies.remove('loggedInAs');
                }

                // Employers can create employees
                if(loginEmail == 'employer_admin'){
                    Cookies.set('loggedInAs', 'employer_admin');
                    Cookies.set('summaryButtonText', 'Submit your contribution');
                    // $formToValidated.attr('action', 'saved-contributions'); // standard-employer-create //
                } else {
                    Cookies.remove('loggedInAs');
                }

                if(loginEmail == 'new'){
                    $formToValidated.attr('action', 'new-password');
                }

                submitFormIfValid();
            }

            else if ($formToValidated.attr('id') == 'confirm-delete-form') {
                var deleteAccount = document.querySelector('input[name="radio-group"]:checked');
                var deleteAccountVal;

                if (deleteAccount) {
                    deleteAccountVal = deleteAccount.value;
                }

                if (deleteAccountVal == 'Yes') {
                    location.assign('delete-done');
                    return false;
                }
                if (deleteAccountVal == 'No') {
                    location.assign('accounts');
                    return false;
                }

                submitFormIfValid();
            }

            else if ($formToValidated.attr('id') == 'make-payment-form'){

                var csv = Cookies.get('csv');
                if (csv !== undefined){
                    $formToValidated.attr('action', 'summary');
                }



                if ($.trim($('#contribution-month').val()) == "") {
                    displayFieldError($('#contribution-month'));
                    isValid = false;
                }

                if ($.trim($('#contribution-year').val()) == "") {
                    displayFieldError($('#contribution-year'));
                    isValid = false;
                }

                /* */

                if ($.trim($('#collection-day').val()) == "") {
                    displayFieldError($('#collection-day'));
                    isValid = false;
                }

                if ($.trim($('#collection-month').val()) == "") {
                    displayFieldError($('#collection-month'));
                    isValid = false;
                }

                if ($.trim($('#collection-year').val()) == "") {
                    displayFieldError($('#collection-year'));
                    isValid = false;
                }

                var understood = $("input[name='understand']:checked").val();

                if(understood != 'yes'){
                    displayFieldErrorWithClass('.form-control');
                    isValid = false;
                }

                submitFormIfValid();
            }

            else if ( $formToValidated.attr('id') == 'password-form'){

                var password1 = $.trim($('#password', $formToValidated).val());
                var password2 = $.trim($('#confirm-password', $formToValidated).val());

                if( password1 != password2 ){
                    displayFieldError($('#password'));
                    displayFieldError($('#confirm-password'));
                    isValid = false;
                }

                submitFormIfValid();

            }

            else if ($formToValidated.attr('id') == 'contributions-and-payment'){

                // validates text input fields
                $('.validate-numeric', $formToValidated).each(function() {
                    var val = $.trim($(this).val());

                    val = val.replace(',','');
                    val = val.replace('.','');
                    if(isNaN(parseFloat(val)) || !isFinite(val) || val < 0){
                        displayFieldError($(this));
                        isValid = false;
                    }
                });

                if($('#employee-avcs').val().length > 0){
                    Cookies.set("optionalAdded", 'yes')
                } else {
                    Cookies.remove("optionalAdded");
                }

                if($('#additional-pension').val().length > 0){
                    Cookies.set("optionalAdditional", 'yes')
                } else {
                    Cookies.remove("optionalAdditional");
                }

                if($('#errbo').val().length > 0){
                    Cookies.set("optionalERRBO", 'yes')
                } else {
                    Cookies.remove("optionalERRBO");
                }

                // validates another part of the form
                var hasOutstandingPayments = $("input[name='outstanding-payments']:checked").val();
                if(hasOutstandingPayments == 'Yes'){
                    var $outstandingPaymentsPanel = $('#outstanding-payments-panel'),
                        atLeastOne = false;
                    $formToValidated.attr('action', 'adjusted-summary');

                    $('.validate-secondary-text-input, #adjustment-month', $outstandingPaymentsPanel).each(function() {
                        if($.trim($(this).val()) == ""){
                            displayFieldError($(this));
                            isValid = false;
                        }
                    });
                    Cookies.set("adjustmentMonth", $('#adjustment-month', $outstandingPaymentsPanel).val());
                    Cookies.set("adjustmentYear", $('.validate-secondary-text-input', $outstandingPaymentsPanel).val());

                    $('.at-least-one', $outstandingPaymentsPanel).each(function() {
                        if($(this).attr('id') !== undefined ){
                            if($(this).val() != ""){
                                atLeastOne = true;
                            }
                        }
                    });

                    if(!atLeastOne){
                        isValid = false;
                        displayFieldErrorWithClass('.at-least-one');
                    }

                    submitFormIfValid();

                } else {

                    submitFormIfValid();
                }

            }
            // else if ($formToValidated.attr('id') == 'create-employer-form') {
            //     // condition for used email address
            //     if($('#employer-email').val() == 'already-exists@nhs.net'){
            //         displayFieldError($('#employer-email'));
            //         $('#error-message-employer-email').text(messages.exists);
            //         isValid = false;
            //     }
            // }

            else {

                submitFormIfValid();
            }

        });
    }


    // hide or show staff/gps elements on page load
    var staffgps = Cookies.get('staffgps');
    if (staffgps === undefined){
        $('.staffgps').remove();
    }

    var csv = Cookies.get('csv');
    if (csv === undefined){
        $('.demo-csv').remove();
    }

    // hide or show optional Employee Added Years
    var optionalAdded = Cookies.get('optionalAdded');
    if (optionalAdded === undefined){
        $('.optional-added').remove();
    }

    var optionalAdditional = Cookies.get('optionalAdditional');
    if (optionalAdditional === undefined){
        $('.optional-additional').remove();
    }

    var optionalERRBO = Cookies.get('optionalERRBO');
    if (optionalERRBO === undefined){
        $('.optional-errbo').remove();
    }

    var ea = Cookies.get('ea');
    if(ea === undefined){
        $('.demo-ea').remove();
    }
    if(ea === 'show'){
        $('.multiple-ea').removeClass('display-none');
    } else {
        $('.multiple-ea').addClass('display-none');
    }



    // all back buttons
    var $topBackLinks = $('.back-nav');
    $topBackLinks.each(function (i, obj) {
        $('a', $(obj)).on('click', function(evt){
            evt.preventDefault();
            window.history.back();
        })
    });

    // all back buttons
    var $backLinks = $('.back-link');
    $backLinks.each(function (i, obj) {
        var $link = $('a', $(obj));
        if(!$link.hasClass('link')){
            $('a', $(obj)).on('click', function(evt){
                evt.preventDefault();
                window.history.back();
            })
        }
    });


    // ==============================================================================
    // TYPEAHEAD - https://twitter.github.io/typeahead.js/examples/
    // ==============================================================================

    typeAheadList = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    if($('.typeahead').length > 0){

        // typeahead js
        // TODO: move to better location if to be used in final project
        var substringMatcher = function(strs) {
            return function findMatches(q, cb) {
                var matches, substringRegex;

                // an array that will be populated with substring matches
                matches = [];

                // regex used to determine if a string contains the substring `q`
                substringRegex = new RegExp(q, 'i');

                // iterate through the pool of strings and for any string that
                // contains the substring `q`, add it to the `matches` array
                $.each(strs, function(i, str) {
                    if (substringRegex.test(str)) {
                        matches.push(str);
                    }
                });

                cb(matches);
            };
        };

        $('.typeahead').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        },{
            name: 'months',
            source: substringMatcher(typeAheadList)
        });

        // Stopping ENTER from submitting forms, but does it mess with accessibility hmm
        // $('.typeahead').keydown(function(event){
        //     if(event.keyCode == 13) {
        //         event.preventDefault();
        //         return false;
        //     }
        // });

    }


    // dynamic previous month setting
    var $setCookies = $('.set-cookie');
    if($setCookies.length > 0){
        $setCookies.on('click', function(evt) {
            evt.preventDefault();
            var cookieValue = $(this).attr('data-cookie-value'),
                cookieName = $(this).attr('data-cookie-name');
            Cookies.set(cookieName, cookieValue);
            location.assign($(this).attr('href'));
        });
    }

    var $getCookies = $('.get-cookie');
    if($getCookies.length > 0){
        $getCookies.each(function (i, obj) {
            var cookieName = $(obj).attr('data-cookie-name'),
                cookieValue = Cookies.get(cookieName);
            $(obj).text(cookieValue).val(cookieValue);
        })
    }

    //clear cookies on login page
    if($('#login-form').length > 0 ) {
        Cookies.remove('ea');
        Cookies.remove('staffgps');
        Cookies.remove('csv');
        Cookies.remove('payingMonth');
        Cookies.remove('adjustmentMonth');
        Cookies.remove('adjustmentYear');
        Cookies.remove('loggedInAs');
    }

    if (document.location.href.includes("/fic/summary", true)) {
        $('#submit').click( function(e) {
            e.preventDefault();
            var myCookie = getCookie("ea");
            if (myCookie == null) {
                // do cookie doesn't exist stuff;
                window.location.href = "thank-you";
            } else {
                // do cookie exists stuff
                window.location.href = "thank-you2";
            }
            
            return false;
        });
    }

});