# jkuester:cmmntools
Meteor package which wraps the cmmn tools from http://bpmn.io / https://github.com/bpmn-io into a meteor package.

Provides templates to include the examples from https://github.com/bpmn-io/cmmn-js-examples.

### Important Note

This package is not stable and currently in a 'proof-of-concept' phase. Use at your own risk. Feel free to contribute and improve this package. 

### Install / Include

Add the package like any other:

```
$ meteor add jkuester:cmmntools
```

The npm dependencies are loaded automatically via the package. They should be included and run out of the box.
The templates then can be included by simply using spacebars.

##### Using the Examples

Including the examples is easy by just including the spacebar templates. The following templates are currently available:

###### Modeler

```
{{> cmmnmodeler}}
```

It should run out of the box. The template also provides a helper `getModeler` which returns the modeler object. From here you can further customize your modeler.


### License

MIT (unless noted otherwise)
