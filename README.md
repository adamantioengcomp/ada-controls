# ada-controls
Module for programatically controlling the form component controls.

## install

1 - use bower to install
<pre>
bower install ada-controls
</pre>
2 - Include in index.html
```html
<script src="bower_components/ada-controls/ada-controls.min.js"></script>
```
3 - Include the module
<pre>
angular.module('myApp',[ada-controls]);
</pre>

## usage

1 - Use the 'control' directive to marck the controllable fields</li>

  ```html
    <input id="input1"  type="text" ng-model="myModel"  control>
  ```
2 - In the controller, inject the adControl service

<pre>
myApp.controller('myController', function(adaControl){

...

})
</pre>

3 - Use the functions of the service

Examples:
<pre>
adaControl.firstControl(); //Goes to the first Control
adaControl.nextControl(); //Goes to the next Control
if (adaControl.isLastControl()){
   var element = adaControls.getActiveFocus(); // Get the current control (focused element)
   console.log('This is the last element. id = ' + element.id);
}else{
   var element = adaControls.getLastControl(); // Get the last control (focused element)
   console.log('not the last yet. last id = ' + element.id)
}
adaControl.nextControl({reverse:true, stopOnLast: true, validateField: false}); //Goes to the previous Control (reverse)


</pre>


## functions

### getActiveFocus()

#### return 
{Object} the active focus element 

### setActiveFocus(field)

Set the active focus on a control element on the page

#### params
<b>field</b> - {String|Object} the object or the selector of the field

### isFirstControl(field)

Tells if a field is the first control of the page

#### params
<b>field</b> - {String|object} the jquery object or the selector of the field

#### return
{boolean}

### isLastControl(field)

Tells if a field is the last control of the page

#### params
<b>field</b> - {String|object} the jquery object or the selector of the field

#### return
{boolean}

### getLastControl(validateField)

Find the last control element on the page

#### params
<b>validateField</b> - {undefined|boolean} tells if the field must be valid (true) or not (false). a valid field is enabled and visible on the screen. If ommited, true is considerated

#### return
{object} the last control element on the page


### getFirstControl(validateField)

Find the first control element on the page

#### params

<b>validateField</b> - {undefined|boolean} tells if the field must be valid (true) or not (false). a valid field is enabled and visible on the screen. If ommited, true is considerated

#### return
{object} the last control element on the page


### getNextControl()

find the next element on the page. If "useFieldCheckFunction" was used to register a check function, the function will be used to check for the next control to go.

#### params

<b>options</b> - {undefined|object} optional parameter that setups the options for the search.
<ul>
<li>
<b>baseField</b>: {undefined|string|object} a field to start the search from (ignores the active control). Can be the control object or a selector string
</li>
<li>
<b>stopOnLast</b>: {undefined|boolean} if set to true, when the function called from the last page, nothing will happens
</li>
<li>
<b>reverse</b>: {undefined|boolean} if set to true, the navigation will become 
</li>
<li>
<b>validateField</b>: {undefined|boolean} tells if the field must be valid (true) or not (false). a valid field is enabled and visible on the screen. if ommited, true is considerated
</li>
</ul>

#### return
{object} the last control element on the page


### firstControl(validateField)

Set the active control on the fitst element on the page

#### params

<b>validateField</b> - {undefined|boolean}  tells if the field must be valid (true) or not (false). a valid field is enabled and visible on the screen. If ommited, true is considerated


### lastControl(validateField)

Set the active control on the last element on the page

#### params

<b>validateField</b> - {undefined|boolean}  tells if the field must be valid (true) or not (false). a valid field is enabled and visible on the screen. If ommited, true is considerated


### nextControl(options)

Set the active control on next element on the page. If "useFieldCheckFunction" was used to register a check function, the function will be used to check for the next control to go.

#### params

<b>options</b> - {undefined|object}  optional parameter that setups the options for the search.
<ul>
<li>
<b>baseField</b>: {undefined|string|object} a field to start the search from (ignores the active control). Can be the control object or a selector string
</li>
<li>
<b>stopOnLast</b>: {undefined|boolean} if set to true, when the function called from the last page, nothing will happens
</li>
<li>
<b>reverse</b>: {undefined|boolean} if set to true, the navigation will become 
</li>
<li>
<b>validateField</b>: {undefined|boolean} tells if the field must be valid (true) or not (false). a valid field is enabled and visible on the screen. if ommited, true is considerated
</li>
</ul>


##  Configuration

You can configure a custom function to determine the next focus

1. On the configuration session, inject the adaControlProvider

<pre>
myApp.configure(function(adaControlProvider){

...

})
</pre>

2. Setup the custom function with the method "useFieldCheckFunction"

<pre>
adaControlProvider.useFieldCheckFunction(function(field){

  if (field.id === 'input1') // For example, if is currently on the 'input1' field, 
    return $('input5')       // the next field will be the 'input5'
    
  return false;  // Otherwise, follow the default order (the order the elements are displayed in the page)
});
</pre>

