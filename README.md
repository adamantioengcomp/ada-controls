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
