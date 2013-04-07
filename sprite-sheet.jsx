﻿/* Copyright (c) 2013 All Right Reserved, Anselm Bradford http://twitter.com/anselmbradford */// constants parsed from the config file (not really constants because it's JS, but you get the idea)var MAX_WIDTH = null;var X_GAP = null;var Y_GAP = null;var ROOT_LAYER = null;var HIT_LAYER = null;var EXPORT_FORMAT = null;var OUTPUT_FILENAME = null;var OUTPUT_FORMAT = null;var OUTPUT_TYPE = null;// variablesvar offsetX = 0; // the horizontal amount to move a graphic (is based on the position of the prior graphic)var offsetY = 0; // the vertical amount to move a graphic (is based on the position of the prior graphic)var count = 0;var aggregateWidth = 0;var aggregateHeight = 0;var lastLeft = 0;var lastTop = 0;var output = []; // contents of output filevar doc; // the active documentvar folderPath;var filePath;var configFile;var parsed = true; // whether config file was parsed correctlyvar errorMsg = "There is a problem in the configuration file. "; // error message if something goes wrong with reading config filevar readConfig; // holds reference to the configuration file// if there are graphics on the artboardif ( app.documents.length > 0 ) {    doc = app.activeDocument;    filePath = doc.path+"/config.yml";    configFile = new File(filePath);// if config file is not found, abortif (configFile.open('r') == false) { alert( "Configuration file config.yml not found! Check that this file exists in the same directory as the script." ) };else{        // read the config file and parse out values    readConfig = configFile.read();    MAX_WIDTH = parseConfig( "max_width" , Number );    X_GAP = parseConfig( "x_gap" , Number );    Y_GAP = parseConfig( "y_gap" , Number );    ROOT_LAYER = parseConfig( "root_layer_prefix" );    HIT_LAYER = parseConfig( "hit_layer_prefix" );    EXPORT_FORMAT = parseConfig( "export_format" );    OUTPUT_FILENAME = parseConfig( "output_filename" );    OUTPUT_FORMAT = parseConfig( "output_format" );    OUTPUT_TYPE = parseConfig( "output_type" );    // TODO validation of output_format in regard to output_type    // if it wasn't parsed, abort    if (!parsed) { alert( errorMsg ) };    else    {            if (doc.layers.length > 0)            {               moveLayer( doc , X_GAP , Y_GAP , 0 );                                if (output.length > 0)                {                    // fit artboard to artwork and deselect artwork                    doc.fitArtboardToSelectedArt(0);                    // create build directory                    folderPath = new Folder(doc.path+"/build");                    folderPath.create();                                // export spritesheet in format specified in the config file                    if (EXPORT_FORMAT == "png24") exportPNG24();                    else if (EXPORT_FORMAT == "png8") exportPNG8();                    else if (EXPORT_FORMAT == "gif") exportGIF();                    else if (EXPORT_FORMAT == "jpg") exportJPEG();                                // write css, html, and parameters                    writeCSS();                    writeHTML();                    writeParameters();                     // undo changes done to file                    app.undo();                                    }                else                {                    // error occurred, undo changes done to file                    app.undo();                    app.redo(); // need this for some reason as the undo seems to go one step too far!                    errorMsg = "Sprite export failed! Check that sprite layers have same prefixes as config file!";                    alert( errorMsg );                }            }            else            {                    errorMsg = "Sprite export failed! There are no layers in the Illustrator file!";                    alert( errorMsg );            }        }    }}// regex parse config file// value = value to search for in config file// type = type to cast tofunction parseConfig( value , type ){    var reg = value + "[ ]*:[ ]*(.*)";    var pattern = new RegExp(reg);    var result = pattern.exec(readConfig);    var returnVal;    if (!result) { parsed = false; errorMsg += (" Check near '"+value+"'.") }    else    {        returnVal = result[1];        if (type) returnVal = type(returnVal);    }    if (returnVal == '' || returnVal == null || (type == Number && isNaN(returnVal) ) ) { parsed = false; errorMsg += (" Check value of '"+value+"'.")}        return returnVal;}// move the graphics on each layerfunction moveLayer( layer, x , y , level){    var inLayer = layer;        if (layer.typename == "Layer")    {        for (var e = 0; e < layer.pageItems.length; e++)        {            var pathArt = layer.pageItems[e];                        if (level == 1)            {                lastLeft = pathArt.left;                lastTop = pathArt.top;                pathArt.left = 0;                pathArt.top = 0;                if (aggregateWidth+offsetX > MAX_WIDTH)                {                    offsetY-=pathArt.height+Y_GAP;                    offsetX = 0;                    aggregateHeight += offsetY;                }                aggregateWidth += offsetX;                pathArt.translate(offsetX,offsetY);                offsetX+=pathArt.width+X_GAP;            }            else if (level > 1)            {                 pathArt.left -= lastLeft;                 pathArt.top -= lastTop;            }                        pathArt.selected = true;            // if current layer is the root layer, record position            if (layer.name.substring(0,ROOT_LAYER.length) == ROOT_LAYER)            {              output.push({"name":layer.name,"x":('-'+pathArt.left),"y":pathArt.top,"width":pathArt.width,"height":pathArt.height});            }                        //$.writeln( "\telm: " +pathArt.name +" | "+ pathArt.width +" | "+pathArt.left );        }    }        for (var l = 0; l < layer.layers.length; l++)    {              moveLayer( layer.layers[l] , X_GAP , Y_GAP , level+1 );    }}// export a png24 filefunction exportPNG24() {        var exportOptions = new ExportOptionsPNG24();        var type = ExportType.PNG24;        var filePath = folderPath+"/"+OUTPUT_FILENAME+".png";        var fileSpec = new File(filePath);        exportOptions.transparency = true;        doc.exportFile( fileSpec, type, exportOptions );}// export a png8 filefunction exportPNG8() {        var exportOptions = new ExportOptionsPNG8();        var type = ExportType.PNG8;        var filePath = folderPath+"/"+OUTPUT_FILENAME+".png";        var fileSpec = new File(filePath);        exportOptions.transparency = true;        doc.exportFile( fileSpec, type, exportOptions );}// export a giffunction exportGIF() {        var exportOptions = new ExportOptionsGIF();        var type = ExportType.GIF;        var filePath = folderPath+"/"+OUTPUT_FILENAME+".png";        var fileSpec = new File(filePath);        doc.exportFile( fileSpec, type, exportOptions );}// export a jpgfunction exportJPEG() {        var exportOptions = new ExportOptionsJPEG();        var type = ExportType.JPEG;        var filePath = folderPath+"/"+OUTPUT_FILENAME+".png";        var fileSpec = new File(filePath);        exportOptions.optimization = true; // optimized for web viewing        exportOptions.qualitySetting = 70;        doc.exportFile( fileSpec, type, exportOptions );}// write CSS output filefunction writeCSS(){    var filePath = folderPath+"/"+OUTPUT_FILENAME+".css";    var outputFile =new File(filePath);     var finalOutput = "";       outputFile.open('w');                   var name =  output[0]["name"];            var x = output[0]["x"];            var y = output[0]["y"];            var width = output[0]["width"];            var height = output[0]["height"];            var filesuffix = EXPORT_FORMAT;            if (EXPORT_FORMAT == "png24" || EXPORT_FORMAT == "png8") filesuffix = "png";                        var css = "#sprite-demo\n{\n";                  css += "\tbackground: transparent url('"+OUTPUT_FILENAME+"."+filesuffix+"') no-repeat "+x+"px "+y+"px;\n";                  css += "\twidth: "+width+"px;\n";                  css += "\theight: "+height+"px;\n";                  css += "}";                               outputFile.write( css );       outputFile.close();}// write html output filefunction writeHTML(){    var filePath = folderPath+"/"+OUTPUT_FILENAME+".html";     var outputFile =new File(filePath);     var finalOutput = "";       outputFile.open('w');                   var name =  output[1]["name"];            var x = output[1]["x"];            var y = output[1]["y"];            var width = output[1]["width"];            var height = output[1]["height"];                        var js = "document.getElementById('sprite-demo').style.backgroundPosition='"+x+"px "+y+"px';";                        var html = "<!doctype html>\n";                  html += "<html>";                  html += "<head>"                  html += "<title>AI Spritesheet Factory Test</title>";                  html += "<link href='"+OUTPUT_FILENAME+".css' rel='stylesheet' >";                  html += "</head>";                  html += "<body>";                  html += "<p>Click image to test second sprite...</p>";                  html += "<div id='sprite-demo' onClick=\""+js+"\"></div>";                  html += "<p><a href='https://github.com/anselmbradford/ai-spritesheet-factory'>Go to Github Repository...</a></p>";                  html += "</div>";                  html += "</body>";                  html += "</html>";                               outputFile.write( html );       outputFile.close();}// write text output filefunction writeParameters(){    var filePath = folderPath+"/"+OUTPUT_FILENAME+"."+OUTPUT_TYPE;     var outputFile =new File(filePath);     var finalOutput = "";       outputFile.open('w');              for (var i = 0; i < output.length; i++)       {            var format = OUTPUT_FORMAT;            var name =  output[i]["name"];            var x = output[i]["x"];            var y = output[i]["y"];                         var search = ROOT_LAYER;            var regex = new RegExp(search, 'g');            format = format.replace(regex, name);            search = (name+"x_value");            regex = new RegExp(search, 'g');            format = format.replace(regex, x);            search = (name+"y_value");            regex = new RegExp(search, 'g');            format = format.replace(regex, y);                        if (OUTPUT_TYPE == "json" && i != output.length-1) format += ",";                        finalOutput += "\t"+format+"\n";       }        if (OUTPUT_TYPE == "json") finalOutput = "{\n"+finalOutput+"}";       outputFile.write( finalOutput );       outputFile.close();}