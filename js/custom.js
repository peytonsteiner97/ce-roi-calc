$(document).ready(function() {

  var researchCircle;
  var setupCircle;
  var authCircle;
  var mvpCircle;
  var modelsCircle;
  var eventsCircle;
  var bulkCircle;
  var transformationCircle;
  var normalizationCircle;
  var testingCircle;


  var firstName;
  var lastName;

  function Utils() {}

  Utils.prototype = {
    constructor: Utils,
    isElementInView: function(element, fullyInView) {
      var pageTop = $(window).scrollTop();
      var pageBottom = pageTop + $(window).height();
      var elementTop = $(element).offset().top;
      var elementBottom = elementTop + $(element).height();

      if (fullyInView === true) {
        return ((pageTop < elementTop) && (pageBottom > elementBottom));
      } else {
        return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
      }
    }
  };

  var Utils = new Utils();

  $.fn.toPx = function(settings) {
    settings = jQuery.extend({
      scope: 'body'
    }, settings);
    var that = parseFloat(this[0]),
      scopeTest = jQuery('<div style="display: none; font-size: 1em; margin: 0; padding:0; height: auto; line-height: 1; border:0;">&nbsp;</div>').appendTo(settings.scope),
      scopeVal = scopeTest.height();
    scopeTest.remove();
    return Math.round(that * scopeVal)
  };

  var emToPx = $(1).toPx();

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  var hubspotCookie = getCookie("hubspotutk");

  $(".more-info-box").each(function() {
    $(this).hide();
  });

  $('.loader').hide();

  $(".loader").fadeIn(500).delay(500).fadeOut(500, function() {
    $("#get-started").fadeIn(500);
  });

  $(".secret-box").click(function() {
    $("#get-started").fadeOut(500, function() {
      $(".main-content").removeClass("align-items-center");
      $(".loader").fadeIn(500).delay(500).fadeOut(500, function() {
        $("#data-selection").fadeIn(500);
      });
    });
  });


  $("#get-started-form").submit(function(e) {
    e.preventDefault(); // prevent page from refreshing when submitting
    var userFull = $("input[name=user-name]").val(); // get contents of name field
    var userEmail = $("input[name=user-email]").val(); // get contents of email field

    var splitName = userFull.split(" "); // split name by spaces into array
    var filteredName = splitName.filter(function(value) {
      return value != ""; // get rid of accidental spaces at beginning or end of name
    });

    if (filteredName.length > 1) {
      lastName = filteredName.pop(); // if the name is longer than one word, take the last word as last name
      firstName = filteredName.join(" "); // rejoin remaining words and save as first name
    } else {
      firstName = filteredName[0]; // if the name is just one word, save it as first name
      lastName = "";
    }
    // use this as a format for sending to hubspot form
    // According to HubSpot, the form API shouldn't accept ajax posts, but this is working somehow :)
    $.ajax({
      method: "POST",
      contentType: "application/x-www-form-urlencoded; charset=UFT-8",
      url: "https://forms.hubspot.com/uploads/form/v2/440197/ab10f18d-703f-4111-8bb5-f5f073fe073f",
      data: {
        "hutk": hubspotCookie,
        "firstname": firstName,
        "lastname": lastName,
        "email": userEmail,
        "pageName": "ROI Calculator"
      }
    });
    $("#get-started").fadeOut(500, function() {
      $(".main-content").removeClass("align-items-center");
      $(".loader").fadeIn(500).delay(500).fadeOut(500, function() {
        $("#data-selection").fadeIn(500);
      });
    });
  });

  // Data for all elements. Add new elements to the end of data.json file.
  // Make sure that element logo files are in the format: key.png
  
  // this function populates the "catalogArray" variable
  // it's called by getAllElements()
  function populateCatalog(elementData) {
    var elementNames = [];
    var elementKeys = [];
    var length = elementData.length;
    for (var i = 0; i < length; i++) {
      elementNames.push(elementData[i]["name"]);
    }

    for (var i = 0; i < length; i++) {
      elementKeys.push(elementData[i]["key"]);
    }

    // Create Catalog Array
    var catalogArray = [];
    for (var i = 0; i < elementKeys.length; i++) {
      var catalogObject = {};
      catalogObject.key = elementKeys[i];
      catalogObject.addKey = elementKeys[i] + "_catalog";
      catalogObject.addName = elementNames[i];
      catalogObject.elementImg = elementKeys[i] + ".png";
      catalogArray.push(catalogObject);
    }
    return catalogArray;
  }

  // this function makes a call to the local file /data.json
  // then it populates the "catalogArray" via the populateCatalog() function
  function getAllElements() {
    $.getJSON("data.json",function(data) {
      elementData = data;
      catalogArray = populateCatalog(data);
    });
  }

  // globals needed in case a custom element should be added
  var elementData = [];
  var catalogArray = [];
  // this is what kicks off populating the Element list
  catalogArray = getAllElements();

  var newBuildInfo = {
    "REST": {
      "research": 24,
      "setup": 0,
      "auth": 64,
      "mvp": 80,
      "models": 64,
      "events": 104,
      "bulkTransformation": 104,
      "normalization": 80,
      "testing": 40,
      "totalDays": 64
    },

    "SOAP": {
      "research": 40,
      "setup": 64,
      "auth": 64,
      "mvp": 120,
      "models": 80,
      "events": 104,
      "bulkTransformation": 104,
      "normalization": 80,
      "testing": 80,
      "totalDays": 92
    },

    "Other": {
      "research": 40,
      "setup": 64,
      "auth": 64,
      "mvp": 120,
      "models": 80,
      "events": 104,
      "bulkTransformation": 104,
      "normalization": 80,
      "testing": 80,
      "totalDays": 92
    },

    "ONPREM": {
      "research": 40,
      "setup": 80,
      "auth": 64,
      "mvp": 120,
      "models": 80,
      "events": 104,
      "bulkTransformation": 104,
      "normalization": 80,
      "testing": 80,
      "totalDays": 102
    }

  };

  // Add a custom element to elementData, update elementNames & elementKeys arrays, and update catalogArray
  function addCustomElement(name,type){
    // Add custom element
    var newCustomElement = {};
    newCustomElement.name = name;
    newCustomElement.key = name.replace(/\W/g, '').toLowerCase() + "_customElement";
    newCustomElement.hub = "custom";
    newCustomElement.apiType = type;
    elementData.unshift(newCustomElement);

    // Update elementNames & elementKeys
    elementNames = [];
    elementKeys = [];
    length = elementData.length;
    for (var i = 0; i < length; i++) {
      elementNames.push(elementData[i]["name"]);
    }

    for (var i = 0; i < length; i++) {
      elementKeys.push(elementData[i]["key"]);
    }

    // Update catalogArray
    catalogArray = [];
    for (var i = 0; i < elementKeys.length; i++) {
      var catalogObject = {};
      catalogObject.key = elementKeys[i];
      catalogObject.addKey = elementKeys[i] + "_catalog";
      catalogObject.addName = elementNames[i];
      if (elementKeys[i].indexOf("_customElement") >= 0){
        catalogObject.elementImg = "customelement.png"
      }
      else {
        catalogObject.elementImg = elementKeys[i] + ".png";
      }
      catalogArray.push(catalogObject);
    }
  }

  // Catalog Array Filter and Sort Function
  function filterSortCatalog(catalog,query){
    var filterCatalog = $.grep(catalog,function(val,index){
      var name = val.addName.toLowerCase();
      var queryString = query.toLowerCase();
      return (name.indexOf(queryString) >= 0);
    });
    var first = [];
    var others = [];
    for (var i = 0; i < filterCatalog.length; i++) {
      var thisName = (filterCatalog[i].addName).toLowerCase();
      if (thisName.indexOf(query.toLowerCase()) === 0){
        first.push(filterCatalog[i]);
      }
      else {
        others.push(filterCatalog[i]);
      }
    }

    first.sort(function(a,b) {return (a.addName.toLowerCase() > b.addName.toLowerCase()) ? 1 : ((b.addName.toLowerCase() > a.addName.toLowerCase()) ? -1 : 0);} );
    others.sort(function(a,b) {return (a.addName.toLowerCase() > b.addName.toLowerCase()) ? 1 : ((b.addName.toLowerCase() > a.addName.toLowerCase()) ? -1 : 0);} );
    return (first.concat(others));
  }

  function publishCatalog(catalog,exclude) {
    exclude = exclude || [];
    $('#element-catalog').empty();

    if (catalog.length < 1) {
      $('#element-catalog').html("<div id='custom-element-button'><div class='element-logo d-flex justify-content-center align-items-center' style='display: flex; justify-content:center; align-items:center' id='custom-element-button-logo'><div class='add-an-element-inner text-center' style='text-align:center; font-family:''Open Sans', sans-serif'><i class='fa fa-plus'></i><p>Add <span style='color: lightblue'>" + $('#elements-new').val() + "</span></p></div></div></div>")
    }
    else {
      for (var i = 0; i < catalog.length; i++) {
        var thisElementKey = catalog[i].key;
        var thisElementAddKey = catalog[i].addKey;
        var thisElementName = catalog[i].addName;
        var thisElementImg = catalog[i].elementImg;
        var source = $("#catalog-entry-template").html();
        var template = Handlebars.compile(source);
        var context = {
          "elementImg": thisElementImg,
          "addName": thisElementName,
          "addKey": thisElementAddKey
        };
        var thisElement = template(context);
        if (exclude.indexOf(thisElementKey) < 0) {
          $('#element-catalog').append(thisElement);
        }
      }
    }
  }

  // Array of elements that are currently selected
  var selectedElementsKeys = [];

  $("#add-an-element-logo").click(function(){
    $("#new-selection-window").fadeIn()
    publishCatalog(catalogArray,selectedElementsKeys);
  });

  $("#elements-new").keyup(function(){
    var input = $('#elements-new').val();
    var updatingCatalog = filterSortCatalog(catalogArray,input);
    publishCatalog(updatingCatalog,selectedElementsKeys);
  });

  $("#cancel-add").click(function(){
    $("#elements-new").val("");
    $("#new-selection-window").fadeOut()
  });

  $(document).on('click','#custom-element-button-logo',function(){
    $("#custom-element-window").animate({top:0},500);
    var input = $('#elements-new').val();
    $("#custom-element-name").val(input);
  });

  $(document).on('click','#cancel-custom',function(){
    $("#custom-element-window").animate({top:'100vh'},500);
    var input = $('#elements-new').val();
  });

  $(document).on('click', '.api-type-select',function(){
    var $this = $(this);
    if ($this.hasClass('api-type-active') != true) {
      $('.api-type-active').removeClass('api-type-active');
      $this.addClass('api-type-active');
    }
  });

  $('#custom-element-form').submit(function(){
    $("#custom-element-window").animate({top:'100vh'},500);
    $("#new-selection-window").fadeOut();
    var customElementName = $('#custom-element-name').val();
    var customElementType = $('.api-type-active').attr('value');
    addCustomElement(customElementName,customElementType);
    $("#elements-new").val("");
    var thisElementName = customElementName;
    var thisElementKey = thisElementName.replace(/\W/g, '').toLowerCase() + "_customElement";
    selectedElementsKeys.push(thisElementKey);
    var elementImg = "customelement.png"
    var source = $("#element-entry-template").html();
    var template = Handlebars.compile(source);
    var context = {
      "elementImg": elementImg,
      "selected": thisElementName,
      "key": thisElementKey
    };
    var addElement = template(context);
    $('#add-an-element').before(addElement);
    $("#" + thisElementKey).css("opacity", 1).show(300, function() {
      var divWidth = ((10*emToPx)+20) * selectedElementsKeys.length;
      $('#element-list').animate({
        scrollLeft: '+=' + divWidth + 'px'
      }, 1000);
    });
    setTimeout(function() {
      $(".btn-advance").animate({
        "opacity": 1
      });
    }, 500);

    return false;
  });

  $(document).on('click', '.element-in-catalog',function(){
    $("#elements-new").val("");
    $("#new-selection-window").fadeOut();
    var thisElementKey = $(this).attr("id").replace("_catalog","");
    selectedElementsKeys.push(thisElementKey);
    var thisElementObject = $.grep(elementData, function(e) {
      return e.key == thisElementKey;
    });
    var thisElementName = thisElementObject[0].name;
    var elementImg;
    if (thisElementKey.indexOf("_customElement") >= 0){
      elementImg = "customelement.png"
    }
    else {
      elementImg = thisElementKey + ".png";
    }
    var source = $("#element-entry-template").html();
    var template = Handlebars.compile(source);
    var context = {
      "elementImg": elementImg,
      "selected": thisElementName,
      "key": thisElementKey
    };
    var addElement = template(context);
    $('#add-an-element').before(addElement);
    $("#" + thisElementKey).css("opacity", 1).show(300, function() {
      var divWidth = ((10*emToPx)+20) * selectedElementsKeys.length;
      $('#element-list').animate({
        scrollLeft: '+=' + divWidth + 'px'
      }, 1000);
    });
    setTimeout(function() {
      $(".btn-advance").animate({
        "opacity": 1
      });
    }, 500);
  });

  // Autocomplete Function
  /*
  $(function() {



    $("#elements").autocomplete({
      source: function(request, response) {
        var results = $.ui.autocomplete.filter(availableTags, request.term);
        var sortedResults = sortInputFirst(request.term, results);
        response(sortedResults.slice(0, 8));
      },
      open: function(event, ui) {
        $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
      },
      autoFocus: true,
      select: function(event, ui) {
        var selected = ui.item.value;
        var thisElementObject = $.grep(elementData, function(e) {
          return e.name == selected;
        });
        var thisElementKey = thisElementObject[0].key;
        var elementImg = thisElementKey + ".png";

        selectedElementsKeys.push(thisElementKey);

        var source = $("#element-entry-template").html();
        var template = Handlebars.compile(source);
        var context = {
          "elementImg": elementImg,
          "selected": selected,
          "key": thisElementKey
        };

        availableTags.splice(availableTags.indexOf(selected), 1);
        $(this).autocomplete("option", "source", function(request, response) {
          var results = $.ui.autocomplete.filter(availableTags, request.term);
          var sortedResults = sortInputFirst(request.term, results);
          response(sortedResults.slice(0, 8));
        });
        var addElement = template(context);
        $('#element-list').append(addElement);
        $("#" + thisElementKey).css("opacity", 1).show(300, function() {
          var divWidth = ((10*emToPx)+20) * selectedElementsKeys.length;
          $('#element-list').animate({
            scrollLeft: '+=' + divWidth + 'px'
          }, 1000);
        });
        setTimeout(function() {
          $(".btn-advance").animate({
            "opacity": 1
          });
        }, 500);



        $(this).val('');
        return false;
      }
    });
  });
  */

  // Executes when user clicks "remove" button under an element
  $(document).on('click', '.btn-remove', function() {
    var removeThisKey = $(this).closest("div").attr('id');
    var removeDiv = $(this).closest('div');
    selectedElementsKeys.splice(selectedElementsKeys.indexOf(removeThisKey), 1);
    if (selectedElementsKeys.length < 1) {
      $(".btn-advance").animate({
        "opacity": 0
      }, 300, function() {
        $(removeDiv).closest("div").animate({
          "opacity": 0
        }, 300, function() {
          $(this).hide().remove();
        });
      });
    } else {
      $(removeDiv).closest("div").animate({
        "opacity": 0
      }, 300, function() {
        $(this).hide().remove();
      });
    }

    // add this element back to selection options
    /*
    var addBack = $(this).val();
    availableTags.push(addBack);
    $("#elements").autocomplete("option", "source", function(request, response) {
      var results = $.ui.autocomplete.filter(availableTags, request.term);
      var sortedResults = sortInputFirst(request.term, results);
      response(sortedResults.slice(0, 8));
    });
    */
  });

  // Executes when user clicks "Calculate Your ROI" button
  $(".btn-advance").click(function() {
    var keysForCalculation = selectedElementsKeys;
    var numOfElements = keysForCalculation.length;
    var countREST = 0;
    var countSOAP = 0;
    var countOther = 0;
    var countONPREM = 0;
    for (var i = 0; i < numOfElements; i++) {
      thisKey = keysForCalculation[i];
      var typeArr = $.grep(elementData, function(e, u) {
        return e.key == thisKey
      });
      var type = typeArr[0].apiType;
      if (type == "REST") {
        countREST++;
      } else if (type == "SOAP") {
        countSOAP++;
      } else if (type == "ONPREM") {
        countONPREM++;
      } else if (type == "Other") {
        countOther++;
      } else {
        countOther++;
      }
    }
    var countSOAPAndOther = countSOAP + countOther + countONPREM;
    var diyBuildDays = (countREST * newBuildInfo["REST"].totalDays) + (countSOAP * newBuildInfo["SOAP"].totalDays) + (countOther * newBuildInfo["Other"].totalDays) + (countONPREM * newBuildInfo["ONPREM"].totalDays);

    var researchDays = ((countREST * newBuildInfo["REST"].research) + (countSOAPAndOther * newBuildInfo["SOAP"].research)) / 8;
    var setupDays = ((countREST * newBuildInfo["REST"].setup) + (countSOAPAndOther * newBuildInfo["SOAP"].setup)) / 8;
    var authDays = ((countREST * newBuildInfo["REST"].auth) + (countSOAPAndOther * newBuildInfo["SOAP"].auth)) / 8;
    var mvpDays = ((countREST * newBuildInfo["REST"].mvp) + (countSOAPAndOther * newBuildInfo["SOAP"].mvp)) / 8;
    var modelsDays = ((countREST * newBuildInfo["REST"].models) + (countSOAPAndOther * newBuildInfo["SOAP"].models)) / 8;
    var eventsDays = ((countREST * newBuildInfo["REST"].events) + (countSOAPAndOther * newBuildInfo["SOAP"].events)) / 8;
    var bulkTransformationDays = ((countREST * newBuildInfo["REST"].bulkTransformation) + (countSOAPAndOther * newBuildInfo["SOAP"].bulkTransformation)) / 8;
    var normalizationDays = ((countREST * newBuildInfo["REST"].normalization) + (countSOAPAndOther * newBuildInfo["SOAP"].normalization)) / 8;
    var testingDays = ((countREST * newBuildInfo["REST"].testing) + (countSOAPAndOther * newBuildInfo["SOAP"].testing)) / 8;

    var cloudElementsBuildDays = 30 + ((countREST + countSOAP + countOther +countONPREM - 1) * 7);

    var diyCost = diyBuildDays * 462;

    var diyMaintenance = diyCost * .25;

    var cePrice = (countREST * 11980);

    researchIsAnimated = false;
    setupIsAnimated = false;
    authIsAnimated = false;
    mvpIsAnimated = false;
    modelsIsAnimated = false;
    eventsIsAnimated = false;
    bulkIsAnimated = false;
    normalizationIsAnimated = false;
    testingIsAnimated = false;

    $(".day-box").each(function() {
      $(this).css("opacity", 0);
    });

    $(".circle").each(function() {
      $(this).empty();
    });

    // $(".ce-logo-main").hide(function (){
    //   $(this).css("display", hidden);
    // });


    $(".results").show(function() {

      // Fill in results section
      // Animated Circles
      // researchCircle
      researchCircle = new ProgressBar.Circle("#research-circle", {
        color: '#aaa',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 8,
        trailWidth: 2,
        easing: 'easeInOut',
        duration: 3000,
        text: {
          style: {
            color: "black",
            position: 'absolute',
            padding: 0,
            margin: 0,
          },
          autoStyleContainer: true
        },
        from: {
          color: '#aaa',
          width: 2
        },
        to: {
          color: '#333',
          width: 8
        },
        // Set default step function for all animate calls
        step: function(state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);

          var value = Math.round(circle.value() * researchDays);
          if (value === 0) {
            circle.setText("<h1 class='circle-number'>" + 0 + "</h1>" + "<p class='circle-days' style='text-align:center;'>Days</p>");
          } else {
            circle.setText("<h1 class='circle-number'>" + value + "</h1>" + "<p class='circle-days' style='text-align:center;'>Days</p>");;
          }

        }
      });
      var researchIsAnimated = false;
      $(window).scroll(function() {
        if (researchIsAnimated === false) {
          var isElementInView = Utils.isElementInView($('.research'), true);
          if (isElementInView) {
            $('.research').animate({
              "opacity": 1
            });
            researchCircle.animate(1);
            researchIsAnimated = true;
          }
        }
      });
      // setupCircle
      setupCircle = new ProgressBar.Circle("#setup-circle", {
        color: '#aaa',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 8,
        trailWidth: 2,
        easing: 'easeInOut',
        duration: 3000,
        text: {
          style: {
            color: "black",
            position: 'absolute',
            padding: 0,
            margin: 0,
          },
          autoStyleContainer: true
        },
        from: {
          color: '#aaa',
          width: 2
        },
        to: {
          color: '#333',
          width: 8
        },
        // Set default step function for all animate calls
        step: function(state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);

          var value = Math.round(circle.value() * setupDays);
          if (value === 0) {
            circle.setText("<h1 class='circle-number'>" + 0 + "</h1>" + "<p class='circle-days' style='text-align:center;'>Days</p>");
          } else {
            circle.setText("<h1 class='circle-number'>" + value + "</h1>" + "<p class='circle-days' style='text-align:center;'>Days</p>");;
          }

        }
      });
      var setupIsAnimated = false;
      $(window).scroll(function() {
        if (setupIsAnimated === false) {
          var isElementInView = Utils.isElementInView($('.setup'), true);
          if (isElementInView) {
            $('.setup').animate({
              "opacity": 1
            });
            setupCircle.animate(1);
            setupIsAnimated = true;
          }
        }
      });
      // authCircle
      authCircle = new ProgressBar.Circle("#auth-circle", {
        color: '#aaa',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 8,
        trailWidth: 2,
        easing: 'easeInOut',
        duration: 3000,
        text: {
          style: {
            color: "black",
            position: 'absolute',
            padding: 0,
            margin: 0,
          },
          autoStyleContainer: true
        },
        from: {
          color: '#aaa',
          width: 2
        },
        to: {
          color: '#333',
          width: 8
        },
        // Set default step function for all animate calls
        step: function(state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);

          var value = Math.round(circle.value() * authDays);
          if (value === 0) {
            circle.setText("<h1 class='circle-number'>" + 0 + "</h1>" + "<p class='circle-days' style='text-align:center;'>Days</p>");
          } else {
            circle.setText("<h1 class='circle-number'>" + value + "</h1>" + "<p class='circle-days' style='text-align:center;'>Days</p>");;
          }

        }
      });
      var authIsAnimated = false;
      $(window).scroll(function() {
        if (authIsAnimated === false) {
          var isElementInView = Utils.isElementInView($('.auth'), true);
          if (isElementInView) {
            $('.auth').animate({
              "opacity": 1
            });
            authCircle.animate(1);
            authIsAnimated = true;
          }
        }
      });
      // mvpCircle
      mvpCircle = new ProgressBar.Circle("#mvp-circle", {
        color: '#aaa',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 8,
        trailWidth: 2,
        easing: 'easeInOut',
        duration: 3000,
        text: {
          style: {
            color: "black",
            position: 'absolute',
            padding: 0,
            margin: 0,
          },
          autoStyleContainer: true
        },
        from: {
          color: '#aaa',
          width: 2
        },
        to: {
          color: '#333',
          width: 8
        },
        // Set default step function for all animate calls
        step: function(state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);

          var value = Math.round(circle.value() * mvpDays);
          if (value === 0) {
            circle.setText("<h1 class='circle-number'>" + 0 + "</h1>" + "<p class='circle-days' style='text-align:center;'>Days</p>");
          } else {
            circle.setText("<h1 class='circle-number'>" + value + "</h1>" + "<p class='circle-days' style='text-align:center;'>Days</p>");;
          }

        }
      });
      var mvpIsAnimated = false;
      $(window).scroll(function() {
        if (mvpIsAnimated === false) {
          var isElementInView = Utils.isElementInView($('.mvp'), true);
          if (isElementInView) {
            $('.mvp').animate({
              "opacity": 1
            });
            mvpCircle.animate(1);
            mvpIsAnimated = true;
          }
        }
      });
      // modelsCircle
      modelsCircle = new ProgressBar.Circle("#models-circle", {
        color: '#aaa',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 8,
        trailWidth: 2,
        easing: 'easeInOut',
        duration: 3000,
        text: {
          style: {
            color: "black",
            position: 'absolute',
            padding: 0,
            margin: 0,
          },
          autoStyleContainer: true
        },
        from: {
          color: '#aaa',
          width: 2
        },
        to: {
          color: '#333',
          width: 8
        },
        // Set default step function for all animate calls
        step: function(state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);

          var value = Math.round(circle.value() * modelsDays);
          if (value === 0) {
            circle.setText("<h1 class='circle-number'>" + 0 + "</h1>" + "<p class='circle-days' style='text-align:center;'>Days</p>");
          } else {
            circle.setText("<h1 class='circle-number'>" + value + "</h1>" + "<p class='circle-days' style='text-align:center;'>Days</p>");;
          }

        }
      });
      var modelsIsAnimated = false;
      $(window).scroll(function() {
        if (modelsIsAnimated === false) {
          var isElementInView = Utils.isElementInView($('.models'), true);
          if (isElementInView) {
            $('.models').animate({
              "opacity": 1
            });
            modelsCircle.animate(1);
            modelsIsAnimated = true;
          }
        }
      });
      // eventsCircle
      eventsCircle = new ProgressBar.Circle("#events-circle", {
        color: '#aaa',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 8,
        trailWidth: 2,
        easing: 'easeInOut',
        duration: 3000,
        text: {
          style: {
            color: "black",
            position: 'absolute',
            padding: 0,
            margin: 0,
          },
          autoStyleContainer: true
        },
        from: {
          color: '#aaa',
          width: 2
        },
        to: {
          color: '#333',
          width: 8
        },
        // Set default step function for all animate calls
        step: function(state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);

          var value = Math.round(circle.value() * eventsDays);
          if (value === 0) {
            circle.setText("<h1 class='circle-number'>" + 0 + "</h1>" + "<p class='circle-days' style='text-align:center;'>Days</p>");
          } else {
            circle.setText("<h1 class='circle-number'>" + value + "</h1>" + "<p class='circle-days' style='text-align:center;'>Days</p>");;
          }

        }
      });
      var eventsIsAnimated = false;
      $(window).scroll(function() {
        if (eventsIsAnimated === false) {
          var isElementInView = Utils.isElementInView($('.events'), true);
          if (isElementInView) {
            $('.events').animate({
              "opacity": 1
            });
            eventsCircle.animate(1);
            eventsIsAnimated = true;
          }
        }
      });
      // bulkCircle
      bulkCircle = new ProgressBar.Circle("#bulk-circle", {
        color: '#aaa',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 8,
        trailWidth: 2,
        easing: 'easeInOut',
        duration: 3000,
        text: {
          style: {
            color: "black",
            position: 'absolute',
            padding: 0,
            margin: 0,
          },
          autoStyleContainer: true
        },
        from: {
          color: '#aaa',
          width: 2
        },
        to: {
          color: '#333',
          width: 8
        },
        // Set default step function for all animate calls
        step: function(state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);

          var value = Math.round(circle.value() * bulkTransformationDays);
          if (value === 0) {
            circle.setText("<h1 class='circle-number'>" + 0 + "</h1>" + "<p class='circle-days' style='text-align:center;'>Days</p>");
          } else {
            circle.setText("<h1 class='circle-number'>" + value + "</h1>" + "<p class='circle-days' style='text-align:center;'>Days</p>");;
          }

        }
      });
      var bulkIsAnimated = false;
      $(window).scroll(function() {
        if (bulkIsAnimated === false) {
          var isElementInView = Utils.isElementInView($('.bulk'), true);
          if (isElementInView) {
            $('.bulk').animate({
              "opacity": 1
            });
            bulkCircle.animate(1);
            bulkIsAnimated = true;
          }
        }
      });
      // normalizationCircle
      normalizationCircle = new ProgressBar.Circle("#normalization-circle", {
        color: '#aaa',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 8,
        trailWidth: 2,
        easing: 'easeInOut',
        duration: 3000,
        text: {
          style: {
            color: "black",
            position: 'absolute',
            padding: 0,
            margin: 0,
          },
          autoStyleContainer: true
        },
        from: {
          color: '#aaa',
          width: 2
        },
        to: {
          color: '#333',
          width: 8
        },
        // Set default step function for all animate calls
        step: function(state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);

          var value = Math.round(circle.value() * normalizationDays);
          if (value === 0) {
            circle.setText("<h1 class='circle-number'>" + 0 + "</h1>" + "<p class='circle-days' style='text-align:center;'>Days</p>");
          } else {
            circle.setText("<h1 class='circle-number'>" + value + "</h1>" + "<p class='circle-days' style='text-align:center;'>Days</p>");;
          }

        }
      });
      var normalizationIsAnimated = false;
      $(window).scroll(function() {
        if (normalizationIsAnimated === false) {
          var isElementInView = Utils.isElementInView($('.normalization'), true);
          if (isElementInView) {
            $('.normalization').animate({
              "opacity": 1
            });
            normalizationCircle.animate(1);
            normalizationIsAnimated = true;
          }
        }
      });
      // testingCircle
      testingCircle = new ProgressBar.Circle("#testing-circle", {
        color: '#aaa',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 8,
        trailWidth: 2,
        easing: 'easeInOut',
        duration: 3000,
        text: {
          style: {
            color: "black",
            position: 'absolute',
            padding: 0,
            margin: 0,
          },
          autoStyleContainer: true
        },
        from: {
          color: '#aaa',
          width: 2
        },
        to: {
          color: '#333',
          width: 8
        },
        // Set default step function for all animate calls
        step: function(state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);

          var value = Math.round(circle.value() * testingDays);
          if (value === 0) {
            circle.setText("<h1 class='circle-number'>" + 0 + "</h1>" + "<p class='circle-days' style='text-align:center;'>Days</p>");
          } else {
            circle.setText("<h1 class='circle-number'>" + value + "</h1>" + "<p class='circle-days' style='text-align:center;'>Days</p>");;
          }

        }
      });
      var testingIsAnimated = false;
      $(window).scroll(function() {
        if (testingIsAnimated === false) {
          var isElementInView = Utils.isElementInView($('.testing'), true);
          if (isElementInView) {
            $('.testing').animate({
              "opacity": 1
            });
            testingCircle.animate(1);
            testingIsAnimated = true;
          }
        }
      });

    });

    (function($) {
      $.fn.countUpTo = function(num, dur) {

        var $this = $(this);
        var countTo = num;

        $({
          countNum: $this.text()
        }).animate({
            countNum: countTo
          },

          {

            duration: dur,
            easing: 'linear',
            step: function() {
              $this.text(Math.floor(this.countNum));
            },
            complete: function() {
              $this.text(this.countNum);
              //alert('finished');
            }
          });
        return this;
      };
    }(jQuery));

    $("#data-selection").fadeOut(500, function() {

      $(".rest-apis").css("opacity", 0);
      $("#countREST").html("0");

      $(".soap-apis").css("opacity", 0);
      $("#countSOAP").html("0");

      $(".other-apis").css("opacity", 0);
      $("#countOther").html("0");

      $(".onprem-apis").css("opacity", 0);
      $("#countONPREM").html("0");

      $(".total-apis").css("opacity", 0);
      $("#countTotal").html("0");

      $(".time-to-market").css("opacity", 0);

      $(".diy-market").css("opacity", 0);
      $(".to-red").css("color", "white");
      $("#diyBuildDays").html("0");

      $(".ce-market").css("opacity", 0);
      $("#cloudElementsBuildDays").html("0");
      $("#diyCost").html("0");

      $(".breakdown").css("opacity", 0);

      $(".loader").fadeIn(500).delay(500).fadeOut(500)
      setTimeout(function() {
        /* Every time the window is scrolled ... */

        $("#calculated-roi").fadeIn(500, function() {

          $(".rest-apis").animate({
            "opacity": 1
          }, 500);
          setTimeout(function() {
            $("#countREST").countUpTo(countREST, 500);
          }, 400);

          $(".soap-apis").animate({
            "opacity": 1
          }, 500);
          setTimeout(function() {
            $("#countSOAP").countUpTo(countSOAP, 500);
          }, 400);

          $(".onprem-apis").animate({
            "opacity": 1
          }, 500);
          setTimeout(function() {
            $("#countONPREM").countUpTo(countONPREM, 500);
          }, 400);

          $(".other-apis").animate({
            "opacity": 1
          }, 500);
          setTimeout(function() {
            $("#countOther").countUpTo(countOther, 500);
          }, 400);

          setTimeout(function() {
            $(".total-apis").animate({
              "opacity": 1
            }, 500);
          }, 900);
          setTimeout(function() {
            $("#countTotal").countUpTo((countREST + countSOAP + countOther + countONPREM), 500);
          }, 1000);

          setTimeout(function() {
            $(".time-to-market").animate({
              "opacity": 1
            }, 500);
          }, 1500);

          setTimeout(function() {
            $(".diy-market").animate({
              "opacity": 1
            }, 500);
          }, 1500);
          setTimeout(function() {
            $("#diyBuildDays").countUpTo(diyBuildDays, 3000);
            $(".to-red").animate({
              "color": "red"
            }, 3000);
          }, 1600);

          setTimeout(function() {
            $(".ce-market").animate({
              "opacity": 1
            }, 500);
          }, 4600);
          setTimeout(function() {
            $("#cloudElementsBuildDays").countUpTo(cloudElementsBuildDays, 1000);
          }, 4700);

          setTimeout(function() {
            $(".ce-market").animate({
              "opacity": 1
            }, 500);
          }, 4600);
          setTimeout(function() {
            $("#diyCost").countUpTo(diyCost, 1000);
          }, 4700);

          setTimeout(function() {
            $(".ce-market").animate({
              "opacity": 1
            }, 500);
          }, 4600);
          setTimeout(function() {
            $("#diyMaintenance").countUpTo(diyMaintenance, 1000);
          }, 4700);

          setTimeout(function() {
            $(".ce-market").animate({
              "opacity": 1
            }, 500);
          }, 4600);
          setTimeout(function() {
            $("#cePrice").countUpTo(cePrice, 1000);
          }, 4700);


          setTimeout(function() {
            $(".breakdown").animate({
              "opacity": 1
            }, 500);
          }, 5000);


        });
      }, 2000);
    });

    $(".btn-go-back").click(function() {

      $(".results").hide();
      $(".more-info-box").each(function() {
        $(this).hide();
      });
      $(".fa-info-circle").each(function() {
        $(this).removeClass("info-active");
      });


      $("#calculated-roi").fadeOut(500, function() {


        $("#data-selection").fadeIn(500);
      });
    });
  });

  $(".fa-info-circle").each(function() {
    $(this).click(function() {
      var divID = $(this).attr("data-toggle");
      $(divID).slideToggle("slow");
      $(this).toggleClass("info-active", 500, "easeOutSine");
    });
  });



});
