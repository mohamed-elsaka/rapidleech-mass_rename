

<tr id="getFileNamesPluralsight">
    <td><input
            onclick="javascript:var displ=this.checked?'':'none';document.getElementById('pluralsightCourseURL').style.display=displ;"
            name="server_dodelay" value="on" type="checkbox">Pull File Names from PluralSight
    </td>
    <td>&nbsp;</td>
    <td id="pluralsightCourseURL" style="display: none;">
        URL of Course:
        <input style="width: 300px;" name="pluralsightCourseURL"
               type="text">
        <input value="Get Names"
               name="btnGetCourse" id="btnGetCourse" type="button">
    </td>
</tr>

<tr style="display: none;" id="trPulledFileNames">
    <td style="padding-top: 10px;" colspan="20" align="center">
        Pulled File Names:
        <div id="divPulledFileNames" align="left">
            <ul>
                <li>Chapter 1 : Introduction</li>
                <ul>
                    <li>lesson 1</li>
                </ul>
            </ul>
            <ul>
                <li>Chapter 2</li>
                <ul>
                    <li>lesson 1</li>
                </ul>
            </ul>
        </div>
    </td>
</tr>

<?php
/*
Course Container $("div.section-container.accordion")
    Chapter 1 $("div.section.ng-scope p.title a.ng-binding")
        Lesson 1 $("ul.tab-list li a h5.ng-binding")
        Lesson 2 $("ul.tab-list li a h5.ng-binding")
    Chapter 2 $("div.section.ng-scope p.title a.ng-binding")
        Lesson 1 $("ul.tab-list li a h5.ng-binding")
        Lesson 2 $("ul.tab-list li a h5.ng-binding")
*/

?>