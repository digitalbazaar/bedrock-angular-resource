# bedrock-angular-resource

A [bedrock][] [AngularJS][] module that provides services for managing
resources and handling resources refreshing.

`brResourceService` provides a `Collection` class that can be used to access
a remote REST collection resource. Operations store data locally in a
structure that is suitable to use as a [AngularJS][] data source.

`brRefreshService` is used to manage global refresh events to keep all
active collection data up to date.

## Quick Examples

```js
angular.module('example', ['bedrock.resource']).service('myService', factory);

/* @ngInject */
function factory(brRefreshService, brResourceService) {
  var service = {};

  // a collection of resources
  service.collection = new brResourceService.Collection({
    url: 'https://example.com/resources'
  });

  // register for system-wide refreshes
  brRefreshService.register(service.collection);

  return service;
}
```

```js
// controller definition
function() {
  /* @ngInject */
  function factory($scope, myService) {
    // ...

    brRefreshService.register($scope, function(force) {
      var opts = {
        force: !!force,
        params: $location.search()
      };
      myService.collection.getCurrent(opts)
        .then(function(resource) {
          // update models
        })
        .catch(function(err) {
          // handle error
        })
        .then(function() {
          // update UI
          $scope.$apply();
        });
    })();
  }

  return {myController: factory};
}
```

## Setup

```
bower install bedrock-angular-resource
```

Installation of the module followed by a restart of your [bedrock][] server
is sufficient to make the module available to your application.

To manually add **bedrock-angular-resource** as a dependency:

```js
angular.module('myapp', ['bedrock.resource']);
```

## API

### brRefreshService.register([scope], fn)

Register for the scope `refreshData` event. `scope` defaults to
`$rootScope`. If `fn` is a function it is called on the event. If `fn` is a
`brResourceService.Collection`, then `Collection.getAll({force: true})` is
called.

### brRefreshService.refresh()

Broadcast the `refreshData` event on the `$rootScope`.

### brResourceService.Collection(config)

Config options:
- **url**: url to collection (string)
- **storage**: reference to external array of data (optional)
- **expires**: time data expires (timestamp, optional [0])
- **maxAge**: maximum cache age (ms, optional [2m])
- **query**: default params object to use for getAll() (optional)
- **finishLoading**: custom callback to call after every load (fn, optional)

Properties:
- **config**: the config used during creation.
- **storage**: the raw storage
- **expires**: the expiration date
- **maxAage**: the maximum cache age
- **loadingCount**: the number of active loading operations
- **state**: state object including current loading flag.

### brResourceService.Collection.startLoading(count)

Used when internal operations start remote operations.

### brResourceService.Collection.finishedLoading(count)

Used when internal operations finish remote operations. Will call the config
finishedLoading callback if set.

### brResourceService.Collection.getAll(options)

Load the entire collection.

### brResourceService.Collection.get(resourceId, options)

Load a single resource.

### brResourceService.Collection.get(options)

Load the current resource (based on `$location`).

### brResourceService.Collection.addToStorage(resource, options)

Add a resource to local storage.

### brResourceService.Collection.add(resource, options)

Add a resource to remote storage and local storage.

### brResourceService.Collection.update(resource, options)

Update a resource in remote storage and local storage.

### brResourceService.Collection.del(resourceId, options)

Delete a resource in remote storage and local storage.

### brResourceService.Collection.clear()

Clear all local storage.

### brResourceService.Collection.setQuery(params)

Set query used for remote operations.

[bedrock]: https://github.com/digitalbazaar/bedrock
[AngularJS]: https://github.com/angular/angular.js
