var MongoClient = require('mongodb').MongoClient;
var Benchmark = require('benchmark');
MongoClient.connect('mongodb://127.0.0.1:27017/benchmark', function(err, db) {
  if(err) throw err;
  
  var suite = new Benchmark.Suite();
  
  var collection_arr = db.collection('obj');
  var collection_obj = db.collection('obj');
  collection_obj.remove(function() {
    
  });
  collection_arr.remove(function() {
    
  });
  
  collection_obj.insert([{
    items: {
      'hey': {
        d: 1
      },
      'ho': {
        d: 2
      }
    }
  }, {
    items: {
      'asdf': {
        d: 1
      },
      'dfg': {
        d: 2
      }
    }
  }], function(err, docs) {
    if(err) throw err;
    
    collection_arr.insert([{
      items: [{
        id: 'hey',
        d: 1
      }, {
        id: 'ho',
        d: 2
      }]
    }, {
      items: [{
        id: 'asdf',
        d: 1
      }, {
        id: 'dfg',
        d: 2
      }]
    }], function(err, docs) {
      if(err) throw err;
    
      suite
      .add('object', function(deferred) {
        collection_obj.find({
          'items.hey': {
            $exists: true
          }
        }).toArray(function(err, results) {
          if(err) throw err;
          
          console.log(results);
          
          if(results.length !== 1) {
            throw new Error('Object search did not return 1 item');
          }
          
          deferred.resolve();
        });
      })
      .add('array', function(deferred) {
        /*collection_arr.find().toArray(function(err, results) {
          if(err) throw err;
          
          if(results.length !== 1) {
            throw new Error('Array search did not return 1 item');
          }
          
          deferred.resolve();
        });*/
      })
      
      .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
      })
      .run({ 'async': true, 'defer': true });
    });
  });
});