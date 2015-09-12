$( document ).ready(function() {
    $("#btnPreview").click(function(e) {
        //split File names text area by lines
        var linksTextAreaText = $("#links").val();
        var lines = linksTextAreaText.split("\n");

        var fileNamesUserInputArray = [];
        var linksUserInputArray = [];
        var linksFileNamesArray = [];
        /*
         +01-GIT_Pharm
         ++Lesson1
         ++Lesson2
         +02-CVS_P
         ++Lesson1
         */
        var chapterTitle, lessonNumber = "01", lessonTitle, fullFilename, linkAndFilename = "";

        //get File names entered by user & convert them to real file names
        for (var i = 0; i < lines.length; i++) {
            //Check if user entered new file names or updated the previous
            if (lines[i].slice(0, 1) == "+") {
                //maybe Chapter title or Lesson title
                if (lines[i].slice(0, 2) == "++") {
                    //maybe Lesson title
                    lessonTitle = lines[i].toString().substring(2); //remove ++ at the beginning

                    if (String(lessonNumber).length < 2) lessonNumber = "0" + String(lessonNumber);

                    fullFilename = chapterTitle + lessonNumber + "_" + lessonTitle;
                    if (fullFilename.trim() != "") {
                        //TODO Check file name for bad chars
                        fileNamesUserInputArray.push(fullFilename);
                        lessonNumber++;
                    }
                } else {
                    //It's Chapter title
                    chapterTitle = lines[i].toString().substring(1) + "-"; //remove + at the beginning
                    lessonNumber = "01";
                }

            } else {
                //Not a user-entered file names, Maybe a generated link? Check for --filename= arg
                if (lines[i].toString().indexOf(" --filename=") > 0) {
                    linkAndFilename = lines[i].toString();
                    fileNamesUserInputArray.push(linkAndFilename);
                }
            }

        }

        var linksUserInputTextAreaText = $("#linksUserInput").val();
        var lines = linksUserInputTextAreaText.split("\n");

        //get links entered by user
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].trim() != "") {
                linksUserInputArray.push(lines[i]);
            }
        }

        //generate Link --filename=
        if (fileNamesUserInputArray.length != linksUserInputArray.length) {
            alert("You entered " + String(fileNamesUserInputArray.length) + " file names & " + String(linksUserInputArray.length) + " Links!!");
        } else {
            //go ahead !
            var fileLink, fileName;
            for (var j = 0; j < linksUserInputArray.length; j++) {
                fileLink = linksUserInputArray[j];
                fileName = fileNamesUserInputArray[j];
                linksFileNamesArray.push(fileLink + ' --filename="' + fileName + '"');
            }

            //fill #links textArea with results
            var updateLines = "";
            for (var x = 0; x < linksFileNamesArray.length; x++) {
                updateLines += linksFileNamesArray[x] + "\n";
            }
            $("#links").val(updateLines);

        }
    });

    $("#btnFormat").click(function(e) {
        //check if Panteao or Pluralsight
        //check if #links contains right formats?
        var datahtml = $("#links").val();
        var siteChecked = "";

        if( datahtml.indexOf('class="section-container accordion"') > 0 ) siteChecked = "pluralsight"; //Pluralsight
        if( datahtml.indexOf('class="nano-content"') > 0) siteChecked = "panteao"; //Panteao

        if( siteChecked != "pluralsight" && siteChecked != "panteao" ){
            //Not Pluralsight Nor Panteao
            alert("Entered text isn't a correct Html code from Pluralsight nor Panteao!");
        }else if( siteChecked == "pluralsight" || siteChecked == "panteao"){
            //Pluralsight or Panteao
            if (siteChecked == "panteao") {
                formatPanteaoFilenames();
            } else if (siteChecked == "pluralsight") {
                //alert("call formatPluralsightFilenames ");
                formatPluralsightFilenames();
            }
        }
    });

    function formatPluralsightFilenames(){
        var datahtml = $("#links").val();
        if( datahtml.indexOf('class="section-container accordion"') > 0 ){
            //correct container go ahead!
            $('#div1').empty().append(datahtml);

            var outputText = "";

            //go through Chapters &  get their lessons
            var rawHtmlObj = $('div.section-container.accordion');
            //loop through sections 
            rawHtmlObj.find('div.section.ng-scope').each(function(index, el) {
                //get section names
                var sectionName = $(this).find('p.title a').text().trim();
                if( sectionName != "" ){ 

                    outputText += "+" + sectionName + "\n"; 

                    //loop through sections & get lessons
                    //$(this).each(function(index, el) {
                        $(this).find('li h5').each(function(index, el) {
                            var lessonName = $(this).text().trim();
                            if( lessonName != "" ){ 
                                lessonName = replaceBadChars(lessonName);
                                outputText += "++" + lessonName + "\n"; 
                            }
                        });
                        
                    //});
                }
            });

            if(outputText != ""){
                $("#links").val(outputText);
            }

        }else{
            alert("Not Pluralsight!");
        }

    }

    function formatPanteaoFilenames(){
        var datahtml = $("#links").val();
        if( datahtml.indexOf('class="nano-content"') > 0 ){
            //correct container go ahead!
            $('#div1').empty().append(datahtml);

            var outputText = "";

            //go through Chapters &  get their lessons
            var rawHtmlObj = $('div.nano-content');
            outputText = "+Panteao-Course_Title \n";

            //loop through sections 
            rawHtmlObj.find('span.k-title').each(function(index, el) {
                //get section names
                var lessonName = $(this).text().trim();
                if( $.isNumeric(lessonName.slice(0,2)) ){
                    lessonName = lessonName.substring(3).trim();
                }

                if( lessonName != "" ){ 
                    lessonName = replaceBadChars(lessonName);
                    outputText += "++" + lessonName + "\n"; 
                }
            });

            if(outputText != ""){
                $("#links").val(outputText);
            }

        }else{
            alert("Not Pluralsight!");
        }
    }

    function replaceBadChars(rawString){
        var symbols_to_replace = ["(", ")", "'", "{", "}", "/", '"', "'", '\\', "[", "]", ",", "?", "!", ":", "|", "=", "`", "@", "#", "$", "%", "^", "*"];
        
        var newName = "";
        for(var i=0; i<symbols_to_replace.length; i++){
            var synbol = symbols_to_replace[i];
            var regex = new RegExp("\\" + synbol, 'g');

            //if first time >> use string supplied. If later >> use string modified
            if(newName == ""){                      
                newName = rawString.replace(regex, "")  ;
            }else{
                newName = newName.replace(regex, "");
            }
        }
        newName = newName.replace(/&/g,"and");
        newName = newName.replace("—","-"); 
        return newName;

    }

});