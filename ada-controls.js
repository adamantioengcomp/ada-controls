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
     *                           must return the jquery object witch is the next control, or return 
     *                           false to return to the next control in html
     */
    this.useFieldCheckFunction = function(callback){
        checkNextField = callback;
    };  

    this.$get = ['activeFocus',function(activeFocus){        

        return {
        	/**
        	 * @return {Object} the active focus element 
        	 */
            getActiveFocus : function(){
                return activeFocus.field;
            },

            /**
             * Set the active focus on a control element on the page
        	 * @return {String|Object} field the jquery object or the selector of the field
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
             * @param {String|object} field the jquery object or the selector of the field
        	 * @return {boolean}
        	 */
            isFirstControl : function(field){
                if (!field)
                    field = activeFocus.field;

                if (typeof field === "string")
                    field = $(field);

                var inputs = $("[control]");
                return inputs && (inputs[0] === field);
            },

            /**
             * Tells if a field is the last control of the page
             * @param {String|object} field the jquery object or the selector of the field
        	 * @return {boolean}
        	 */
            isLastControl : function(field){
                if (!field)
                    field = activeFocus.field;

                if (typeof field === "string")
                    field = $(field);

                var inputs = $("[control]");
                return inputs && (inputs[inputs.length - 1] === field);
            },

            /**
             * @return {object} the last control element on the page (jquery element)
             */
            getLastControl : function(){
                var inputs = $("[control]");

                if (!inputs) return undefined;

                return inputs[inputs.length - 1];
            },

            /**
             * @return {object} the first control element on the page (jquery element)
             */
            getFirstControl : function(){
                var inputs = $("[control]");

                if (!inputs) return undefined;

                return inputs[0];
            },

            /**
             * Set the active control on the fitst element on the page
             */
            firstControl : function(){
                var ctrl = getFirstControl();
                if (ctrl) ctrl.focus();
            },

            /**
             * Set the active control on the last element on the page
             */
            lastControl : function(){
                var ctrl = getLastControl();
                if (ctrl) ctrl.focus();
            },

            /**
             * Set the active control on next element on the page
             * if "useFieldCheckFunction" was used to register a check function, the
             * function will be used to check for the next control to go.
             */
            nextControl : function(){
                var inputs = $("[control]");
                if (!activeFocus.field || (activeFocus.field && !activeFocus.field.hasAttribute('control'))){
                    inputs[0].focus();
                }else{
                    var selectNext = false;
                    for (var i in inputs){              
                        if ((inputs[i] && inputs[i] === activeFocus.field) || selectNext){
                            if (inputs[Number(i)+1]){
                                var field = checkNextField(activeFocus.field) || inputs[Number(i)+1];
                                
                                if (!field.hasAttribute('disabled')){
                                    field.focus();
                                    break;
                                }else{
                                    selectNext = true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }];

}]);