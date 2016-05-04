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

### getLastControl()

<b>return</b> 
{object} the last control element on the page (jquery element)

### getFirstControl()

<b>return</b> 
{object} the first control element on the page (jquery element)

### firstControl()

Set the active control on the fitst element on the page

### lastControl()

Set the active control on the last element on the page

### nextControl()

Set the active control on next element on the page.
if "useFieldCheckFunction" was used to register a check function, the function will be used to check for the next control to go (check the configuration session).
