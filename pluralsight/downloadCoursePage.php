<?php

    if( !isset($_GET['courseUrl']) || empty($_GET['courseUrl']) )
        return false;

    getCourseHtml($_GET['courseUrl']);

    function getCourseHtml($courseUrl)
    {
        $ch = curl_init($courseUrl);
        $html = curl_exec($ch);
        return $html;
    }
?>