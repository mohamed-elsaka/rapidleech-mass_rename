$( document ).ready(function() {
    $("#btnPreview").click(function(){
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
        var chapterTitle, lessonNumber = "01", lessonTitle , fullFilename, linkAndFilename = "";

        //get File names entered by user & convert them to real file names
        for(var i=0; i < lines.length; i++){
            //Check if user entered new file names or updated the previous
            if( lines[i].slice(0,1) == "+" ){
                //maybe Chapter title or Lesson title
                if( lines[i].slice(0,2) == "++" ){
                    //maybe Lesson title
                    lessonTitle = lines[i].toString().substring(2); //remove ++ at the beginning

                    if(String(lessonNumber).length < 2) lessonNumber = "0" + String(lessonNumber);

                    fullFilename = chapterTitle + lessonNumber + "_" +lessonTitle;
                    if(fullFilename.trim() != ""){
                        //TODO Check file name for bad chars
                        fileNamesUserInputArray.push(fullFilename);
                        lessonNumber++;
                    }
                }else{
                    //It's Chapter title
                    chapterTitle = lines[i].toString().substring(1) + "-"; //remove + at the beginning
                    lessonNumber = "01";
                }

            }else{
                //Not a user-entered file names, Maybe a generated link? Check for --filename= arg
                if(lines[i].toString().indexOf(" --filename=") > 0) {
                    linkAndFilename = lines[i].toString();
                    fileNamesUserInputArray.push(linkAndFilename);
                }
            }

        }

        var linksUserInputTextAreaText = $("#linksUserInput").val();
        var lines = linksUserInputTextAreaText.split("\n");

        //get links entered by user
        for(var i=0; i < lines.length; i++){
            if( lines[i].trim() != "" ){
                linksUserInputArray.push(lines[i]);
            }
        }

        //generate Link --filename=
        if(fileNamesUserInputArray.length != linksUserInputArray.length){
            alert("You entered " + String(fileNamesUserInputArray.length) + " file names & " + String(linksUserInputArray.length) + " Links!!");
        }else{
            //go ahead !
            var fileLink, fileName;
            for(var j=0; j < linksUserInputArray.length; j++){
                fileLink = linksUserInputArray[j];
                fileName = fileNamesUserInputArray[j];
                linksFileNamesArray.push( fileLink + ' --filename="' + fileName + '"' );
            }

            //fill #links textArea with results
            var updateLines = "";
            for(var x=0; x<linksFileNamesArray.length; x++){
                updateLines += linksFileNamesArray[x] + "\n";
            }
            $("#links").val(updateLines);

        }


    });

});