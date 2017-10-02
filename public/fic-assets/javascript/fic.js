$(document).ready(function(){

	// ==============================================================================
    // ==============================================================================

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


    // nhsbsa bespoke month autoComplete
    var $monthInputFields =  $('.months-typeahead');
    if($monthInputFields.length > 0){
        var typedString = undefined;

        var filterFunc = function (month) {
            var arrayMonth = month.substring(0, typedString.length).toLowerCase(),
                inputMonth = typedString.substring(0, typedString.length).toLowerCase();
            if (arrayMonth == inputMonth) {
                return month;
            }
        };

        $monthInputFields.each(function (i, obj) {
            $(obj).on('keyup', function (event) {
                var key = event.keyCode || event.charCode;
                if( key != 8 && key != 46 ) {
                    typedString = $.trim($(obj).val());
                    if(typedString.length > 0){
                        var month = typeAheadList.filter(filterFunc);
                        if(month.length == 1){
                            $(obj).val(month);
                        }
                    }
                }
            })
        })
    }


});