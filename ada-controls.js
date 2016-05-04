/**
 * Module for programatically controlling the form component controls.
 * Use the "control" directive to marck the elements to be controlled
 * Use the adaControl service functions to navigate between the control components
 */
angular.module('ada-controls',[])
.value('activeFocus',{field:undefined})
.directive('control', ['$window','activeFocus', function ($window,activeFocus) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {        
            element.focus(function(){
                activeFocus.field = this;
            });
        }
    };
}])
.provider('adaControl',[function(){

    var checkNextField = function(currentField){
        return false;
    };

    /**
     * Register a function callback to verify a field before setting focus
     *@param {function} callback the callback to register. Receives a control component and
     *                           must return the object witch is the next control, or return 
     *                           false to return to the next control in html
     */
    this.useFieldCheckFunction = function(callback){
        checkNextField = callback;
    };  

    this.$get = ['activeFocus',function(activeFocus){        

        var isValidField = function(field){
            return (!field.hasAttribute('disabled') && $(field).is(':visible'));
        };

        return {
            /**
             * @return {Object} the active focus element 
             */
            getActiveFocus : function(){
                return activeFocus.field;
            },

            /**
             * Set the active focus on a control element on the page
             * @return {String|Object} field the object or the selector of the field
             */
            setActiveFocus : function(field){
                if (typeof field === "string")
                    field = $(field);

                if (!field) return;

                activeFocus.field = field;
                field.focus();
            },

            /**
             * Tells if a field is the first control of the page
             * @param {String|object} field the object or the selector of the field
             * @return {boolean}
             */
            isFirstControl : function(field){
                if (!field)
                    field = activeFocus.field;

                if (typeof field === "string")
                    field = $(field);

                return (this.getFirstControl() === field);
            },

            /**
             * Tells if a field is the last control of the page
             * @param {String|object} field the object or the selector of the field
             * @return {boolean}
             */
            isLastControl : function(field){
                if (!field)
                    field = activeFocus.field;

                if (typeof field === "string")
                    field = $(field);

                return (this.getLastControl() === field);
            },

            /**
             * @param  {undefined|object} options opitional object containing the options to be considered.
             *                                      
             * @return {object} the last control element on the page
             */
            getLastControl : function(validateField){            
                var inputs = $("[control]");

                if (!inputs) return undefined;

                if (validateField == false)
                    return inputs[inputs.length - 1];

                // Verify if the control is valid
                if (isValidField(inputs[inputs.length - 1])){ 
                    return inputs[inputs.length - 1];
                }else{
                    // If the control is not valid, search for the next

                    var opt = {};// Create the options, for a new call, so it don't miss the original reference                    
                    opt.baseField = inputs[inputs.length - 1]; // Search for the next field, starting from the last
                    opt.stopOnLast = true;     // Stop on last (first in this case), for prevent infinite loop (where there is no valid control on the page)
                    opt.reverse = true;        // The search is bottow - up
                    opt.validateField = validateField;
                    return this.getNextControl(opt);
                }
            },

            /**
             * @return {object} the first control element on the page
             */
            getFirstControl : function(validateField){
                var inputs = $("[control]");

                if (!inputs) return undefined;

                if (validateField == false)
                    return inputs[0];

                // Verify if the control is valid
                if (isValidField(inputs[0])){ 
                    return inputs[0];
                }else{
                    // If the control is not valid, search for the next

                    var opt = {};// Creates the options, for a new call, so it don't miss the original reference
                    opt.baseField = inputs[0]; // Search for the next field, starting from the first
                    opt.stopOnLast = true;     // Stop on last, for prevent infinite loop (where there is no valid control on the page)
                    opt.reverse = false;       // The search is top - down
                    opt.validateField = validateField;
                    return this.getNextControl(opt);
                }
            },

            /**
             * Set the active control on the fitst element on the page
             */
            firstControl : function(validateField){
                var ctrl = this.getFirstControl(validateField);
                if (ctrl) ctrl.focus();
            },

            /**
             * Set the active control on the last element on the page
             */
            lastControl : function(validateField){
                var ctrl = this.getLastControl(validateField);
                if (ctrl) ctrl.focus();
            },

            /**
             * find the next element on the page
             * if "useFieldCheckFunction" was used to register a check function, the
             * function will be used to check for the next control to go.
             * @return {object} the last control element on the page
             */
            getNextControl : function(options){
                var baseField = (options && options.baseField) ? options.baseField : activeFocus.field;

                if (this.isLastControl((options && options.baseField) ? options.baseField : undefined)){
                    if (options && options.stopOnLast)
                        return null;
                    else
                        baseField = undefined;
                }

                var inputs = $("[control]");
                if (!baseField || (baseField && !baseField.hasAttribute('control'))){                    
                    return (options && options.reverse) ? this.getLastControl(options.validateField) : this.getFirstControl(options.validateField);
                }else{
                    var selectNext = false;
                    for (var i in inputs){              
                        if ((inputs[i] && inputs[i] === baseField) || selectNext){
                            
                            var nextField = (options && options.reverse) ? inputs[Number(i)-1] : inputs[Number(i)+1];

                            if (nextField){
                                var field = checkNextField(baseField) || nextField;
                                
                                if ((options && (options.validateField === false)) || isValidField(field)){
                                    return field;
                                    break;
                                }else{
                                    selectNext = true;
                                }
                            }
                        }
                    }                    
                }
            },

            /**
             * Set the active control on next element on the page
             * if "useFieldCheckFunction" was used to register a check function, the
             * function will be used to check for the next control to go.
             */
            nextControl : function(options){
                var field = this.getNextControl(options);
                if (field) field.focus();
            }
        }
    }];

}]);