require([
	"esri/map",
	"esri/Color",
	"esri/tasks/query",
	"esri/tasks/QueryTask",
	"esri/symbols/SimpleFillSymbol",
	"esri/symbols/SimpleLineSymbol",
	"esri/layers/FeatureLayer",
	"esri/InfoTemplate",
	"esri/renderers/ClassBreaksRenderer",

	"dojo/on",
	"dojo/_base/array",
	"dojo/dom",
	"dojo/domReady!"], function(Map, Color, Query, QueryTask, SimpleFillSymbol, SimpleLineSymbol, FeatureLayer,
	InfoTemplate, ClassBreaksRenderer, on, array){
		var map = new Map("map",{
			basemap: "topo",
			center: [-90.184, 32.298],
			zoom: 7
		});
		
		var infoTemplate = new InfoTemplate();
		infoTemplate.setTitle("Population in ${NAME} County");
		infoTemplate.setContent("Population in 1990: ${POP1990}</br> Population in 2000: ${POP2000}");



		var outLine = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0,0,0]), 1);
		var symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, outLine, new Color([0, 0, 255,  0]));
		var symbol2 = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, outLine, new Color([255,0,0]));

		var classRender = new ClassBreaksRenderer(symbol, "POP90_SQMI");

		var featureLayer = new FeatureLayer("https://services8.arcgis.com/SuZePnJiOceLRPav/arcgis/rest/services/county_boundaries/FeatureServer/0", 
			{mode: FeatureLayer.MODE_ONDEMAND, 
				infoTemplate: infoTemplate, 
				outFields: ["*"]});
		featureLayer.setDefinitionExpression("STATE_NAME = 'Mississippi'");
		featureLayer.setRenderer(classRender);
		
		map.addLayer(featureLayer);
		console.log(map)

		/*var query = new Query();
		query.where = "STATE_NAME = 'Mississippi'";
		query.outFields = ["NAME", "POP2000", "POP1990"]
		query.returnGeometry= true;

		var queryTask = new QueryTask("https://services8.arcgis.com/SuZePnJiOceLRPav/arcgis/rest/services/county_boundaries/FeatureServer/0");
		queryTask.execute(query).then(querySuccess, onError);

		function querySuccess(result){
			var features = result.features;
			for (var i=0, il=features.length; i<il; i++){
				map.graphics.add(features[i].setSymbol(symbol).setInfoTemplate(infoTemplate));
				}		
		}

		function onError(error){
			console.error('An error occured in the query: ', error);
		}

		on(map, "click", function(e){
			var array = map.graphics.graphics;
			for(var i = 0; i <= array.length; i++){
				array[i].setSymbol(symbol);
			}
			console.log(array[0]);
			e.graphic.setSymbol(symbol2);


			
		});*/
		
	});