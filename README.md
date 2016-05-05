# ada-controls
Module for programatically controlling the form component controls.

## install

1. use bower to install

<pre>
bower install ada-controls
</pre>

2. Include in index.html

```html
<script src="bower_components/ada-controls/ada-controls.min.js"></script>
```

3. Include the module

<pre>
angular.module('myApp',[ada-controls]);
</pre>

## usage

1. Use the 'control' directive to marck the controllable fields</li>

  ```html
    <input id="input1"  type="text" ng-model="myModel"  control>
  ```
2. In the controller, inject the adControl service

<pre>
myApp.controller('myController', function(adaControl){

...

})
</pre>

3. Use the functions of the service

## functions

### getActiveFocus()

<b>return</b> {Object} the active focus element 

### setActiveFocus(field)

Set the active focus on a control element on the page
<b>return</b> 
{String|Object} field the jquery object or the selector of the field

### isFirstControl(field)

Tells if a field is the first control of the page
<b>param</b> 
{String|object} field the jquery object or the selector of the field
<b>return</b>
{boolean}

### isLastControl(field)

Tells if a field is the last control of the page
<b>param</b> 
{String|object} field the jquery object or the selector of the field
<b>return</b>
{boolean}

### getLastControl(validateField)

Find the last control element on the page
<b>params</b>
{undefined|boolean} validateField - tells if the field must be valid (true) or not (false). a valid field is enabled and visible on the screen. If ommited, true is considerated

<b>return</b>
{object} the last control element on the page


### getFirstControl(validateField)

Find the first control element on the page
<b>params</b>
{undefined|boolean} validateField - tells if the field must be valid (true) or not (false). a valid field is enabled and visible on the screen. If ommited, true is considerated

<b>return</b>
{object} the last control element on the page


### getNextControl()

find the next element on the page. If "useFieldCheckFunction" was used to register a check function, the function will be used to check for the next control to go.

<b>params</b>

{undefined|object} options - optional parameter that setups the options for the search.
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

<b>return</b> 
{object} the last control element on the page


### firstControl(validateField)

Set the active control on the fitst element on the page
<b>params</b>  
{undefined|boolean} validateField - tells if the field must be valid (true) or not (false). a valid field is enabled and visible on the screen. If ommited, true is considerated


### lastControl(validateField)

Set the active control on the last element on the page
<b>params</b>  
{undefined|boolean} validateField - tells if the field must be valid (true) or not (false). a valid field is enabled and visible on the screen. If ommited, true is considerated


### nextControl(options)

Set the active control on next element on the page. If "useFieldCheckFunction" was used to register a check function, the function will be used to check for the next control to go.

<b>params</b>

{undefined|object} options - optional parameter that setups the options for the search.
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

