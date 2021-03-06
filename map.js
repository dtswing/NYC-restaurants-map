(function() {
  var african = L.marker([0,0],{opacity:0});
  var american = L.marker([0,0],{opacity:0});
  var asian_fusion = L.marker([0,0],{opacity:0});
  var australian = L.marker([0,0],{opacity:0});
  var bakery = L.marker([0,0],{opacity:0});
  var cafe = L.marker([0,0],{opacity:0});
  var chinese = L.marker([0,0],{opacity:0});
  var eastern_european = L.marker([0,0],{opacity:0});
  var english = L.marker([0,0],{opacity:0});
  var french = L.marker([0,0],{opacity:0});
  var german = L.marker([0,0],{opacity:0});
  var ice_cream = L.marker([0,0],{opacity:0});
  var indian = L.marker([0,0],{opacity:0});
  var irish = L.marker([0,0],{opacity:0});
  var italian = L.marker([0,0],{opacity:0});
  var japanese = L.marker([0,0],{opacity:0});
  var jewish = L.marker([0,0],{opacity:0});
  var korean = L.marker([0,0],{opacity:0});
  var latin_american = L.marker([0,0],{opacity:0});
  var mediterranean = L.marker([0,0],{opacity:0});
  var mexican = L.marker([0,0],{opacity:0});
  var middle_eastern = L.marker([0,0],{opacity:0});
  var pizza = L.marker([0,0],{opacity:0});
  var portuguese = L.marker([0,0],{opacity:0});
  var russian = L.marker([0,0],{opacity:0});
  var salad = L.marker([0,0],{opacity:0});
  var sandwiches = L.marker([0,0],{opacity:0});
  var scandinavian = L.marker([0,0],{opacity:0});
  var seafood = L.marker([0,0],{opacity:0});
  var soups = L.marker([0,0],{opacity:0});
  var southeastern_asian = L.marker([0,0],{opacity:0});
  var spanish = L.marker([0,0],{opacity:0});
  var vegetarian = L.marker([0,0],{opacity:0});

  var map = L.map('map', {
    zoomControl: false,
    // layers: [african, american, asian_fusion, australian, bakery, cafe, chinese, eastern_european, english, french, german, ice_cream, indian, irish, italian, japanese, jewish, korean, latin_american, mediterranean, mexican, middle_eastern, pizza, portuguese, russian, salad, sandwiches, scandinavian, seafood, soups, southeastern_asian, spanish, vegetarian]
  }).setView([40.7587, -73.96305], 12);

 /* L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
  }).addTo(map);*/

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

  /*var googleLayer = new L.Google('ROADMAP');
      map.addLayer(googleLayer);*/

  // control that shows state info on hover
  var info = L.control({position: 'topleft'});

  info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

  info.update = function(props) {
    if (props !== undefined) {
      var name = props.PO_NAME
      var postalCode = props.postalCode;
      var cuisines = props.cuisines;
      var numRestaurants = 0;
      var avgPrice = 0;
      var avgRating = 0;
      var avgGrade = 0;
      var unfiltered = 0.0;

      // Compute filtered values
      for (var cuisine in cuisines) {
        if (cuisines.hasOwnProperty(cuisine)) {
          if (!cuisines[cuisine].filtered) {
            unfiltered += 1;
            numRestaurants += cuisines[cuisine].numRestaurants;
            avgPrice += cuisines[cuisine].avgPrice;
            avgRating += cuisines[cuisine].avgRating;
            avgGrade += cuisines[cuisine].avgGrade;
          }
        }
      }

      avgPrice = avgPrice / unfiltered;
      avgRating = avgRating / unfiltered;
      avgGrade = avgGrade / unfiltered;
    }

    this._div.innerHTML = '<h4>NYC restaurants</h4>' +  (props ?
      '<b>' + name + '</b><br />' + 'Zipcode: '+postalCode +'</b><br />' + numRestaurants + ' restaurants'+'</b><br />' + 'Average Price: '+ avgPrice.toFixed(2) +'</b><br />' + 'Average Rating: '+ avgRating.toFixed(2) + '</b><br />' + 'Average Inspection Grade: '+ avgGrade.toFixed(2)

      : 'Hover over a zipcode');
  };

  info.addTo(map);

  var overlays = {
    "african": african,
    "american": american,
    "asian-fusion": asian_fusion,
    "australian": australian,
    "bakery": bakery,
    "cafe": cafe,
    "chinese": chinese,
    "eastern_european": eastern_european,
    "english": english,
    "french": french,
    "german": german,
    "ice_cream": ice_cream,
    "indian": indian,
    "irish": irish,
    "italian": italian,
    "japanese": japanese,
    "jewish": jewish,
    "korean": korean,
    "latin_american": latin_american,
    "mediterranean": mediterranean,
    "mexican": mexican,
    "middle_eastern": middle_eastern,
    "pizza": pizza,
    "portuguese": portuguese,
    "russian": russian,
    "salads": salad,
    "sandwiches": sandwiches,
    "scandinavian": scandinavian,
    "seafood": seafood,
    "soups": soups,
    "southeastern_asian": southeastern_asian,
    "spanish": spanish,
    "vegetarian": vegetarian
  };

  L.control.layers({}, overlays).addTo(map);

  var zoom = L.control.zoom({position: 'topright'});
  zoom.addTo(map);

  var popup = L.popup();

  function numRestaurants(cuisines) {
    var result = 0;

    for (var cuisine in cuisines) {
      if (cuisines.hasOwnProperty(cuisine)) {
        if (!cuisines[cuisine].filtered) {
          result += cuisines[cuisine].numRestaurants;
        }
      }
    }

    return result;
  }

  function getColor(numRestaurants) {
    return numRestaurants > 200  ? '#A50F15' :
           numRestaurants> 100  ? '#DE2D26' :
           numRestaurants > 50   ? '#FB6A4A' :
           numRestaurants > 20   ? '#FC9272' :
           numRestaurants > 10   ? '#FCBBA1' :
                                   '#FEE5D9';
  }

  function style(feature) {
    return {
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
      
      fillColor: getColor(numRestaurants(feature.properties.cuisines)) 
      // You need to send an argument from 
      // the feature if you want a specific color 
      // for a feature.
    };
  }

  function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
      layer.bringToFront();
    }

    info.update(layer.feature.properties);
  }


  var geojson;

  function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
  }

  function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
    });
  }

  geojson = L.geoJson(nycdata, {
    style: style, // Can use setStyle or refreshStyle to refresh
    onEachFeature: onEachFeature
  }).addTo(map);

  var legend = L.control({position: 'bottomleft'});

  legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
      grades = [0, 10, 20, 50, 100, 200, 500],
      labels = [],
      from, to;

    for (var i = 0; i < grades.length; i++) {
      from = grades[i];
      to = grades[i + 1];

      labels.push(
        '<i style="background:' + getColor(from + 1) + '"></i> ' +
        from + (to ? '&ndash;' + to : '+'));
    }

    div.innerHTML = labels.join('<br>');
    return div;
  };

  legend.addTo(map);

  function setCuisineFilter(cuisine, filter) {
    var i, j;
    var length = nycdata.features.length;
    for(i = 0; i<length; i++) {
      nycdata.features[i].properties.cuisines[cuisine].filtered = filter;
    }
  }

  // Handle overlay events
  map.on({
    overlayadd: function(e) {
      setCuisineFilter(e.name, false);
      geojson.setStyle(style);
    },
    overlayremove: function(e) {
      setCuisineFilter(e.name, true);
      geojson.setStyle(style);
    }
  });
})();