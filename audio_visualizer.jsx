var theComp = app.project.activeItem;
if(theComp == null || (theComp instanceof CompItem) == false){
    alert ("select an audio layer");
    }
else{
        theComp.width=1920;
        theComp.height=1080;
        var theLayer = theComp.selectedLayers[0];
        if(theLayer == null || theLayer.hasAudio == false){
            alert("select an audio layer");
            }
        else{
            bassTreble = theLayer.property("Effects").addProperty("Bass & Treble");
            bassTreble("Bass").setValue(100);
            bassTreble("Treble").setValue(-100);
            app.executeCommand(app.findMenuCommandId("Convert Audio to Keyframes"));     
            plotLayer = theComp.layer("Audio Amplitude");
            plotLayer("Effects")("Left Channel").remove(); 
            plotLayer("Effects")("Right Channel").remove();
            temp = theComp.layer("Audio Amplitude").effect("Both Channels")("Slider");
            bg_dupl=theComp.layers.add(app.project.item(2));
            bg_dupl("Transform")("Scale").setValue([150, 150]);
            bg=theComp.layers.add(app.project.item(2));
            bg("Transform")("Scale").setValue([113, 113]);
            bg("Transform")("Position").setValue([960, 609]);            
            mask=theComp.layers.add(app.project.item(3));
            mask("Transform")("Scale").setValue([113, 113]);
            mask("Transform")("Opacity").setValue(40);
            app.executeCommand(app.findMenuCommandId("Auto-trace..."));
            var myPath = mask.property("Masks").property("Mask 1").property("Mask Path");
            var myShape = myPath.value;
            var myNewMask = bg.property("Masks").addProperty("Mask");
            var myNewPath = myNewMask.property("Mask Path");
            myNewPath.setValue(myShape);
            bg_saber=bg.property("Effects").addProperty("Saber");
            bg_saber("Core Type").setValue(2);
            bg_saber("Core Size").setValue(4.5);
            bg_saber("Glow Bias").setValue(0.3);
            bg_saber("Preset").setValue(4);
            bg.blendingMode = BlendingMode.SCREEN;
            seek_time=theComp.layers.addSolid([1,1,1], "seek_time", 1920,1080, 1);
            newMask = seek_time.Masks.addProperty("Mask");
            myMaskShape = newMask.property("maskShape");
            myShape = myMaskShape.value;
            myShape.vertices = [[5,1000], [1900,1000]];
            myMaskShape.setValue(myShape);
            seek_time_saber=seek_time.property("Effects").addProperty("Saber");
            seek_time_saber("Core Type").setValue(2);
            seek_time_saber("Glow Intensity").setValue(100);
            seek_time_saber("Preset").setValue(11);
            seek_time_saber("Start Offset").setValueAtTime(0, 100);
            seek_time_saber("Start Offset").setValueAtTime(theComp.duration*2, 0);
            seek_time.blendingMode = BlendingMode.SCREEN;
            for(i=0; i<30*theComp.duration; i++){
                bg_saber("Glow Intensity").setValueAtTime(i/30, (temp.valueAtTime(i/30, temp)/100)*80+30);
            }
            }
        }
