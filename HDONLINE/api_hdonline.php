<?php
$f = $_GET['f'];
$type = $_GET['type'];
$page = $_GET['page'];
$category = $_GET['category'];
$id = $_GET['id'];
$episode = $_GET['episode'];
$token = "313438353136363831315f305f305f616e64726f6964";
function load_list($type,$page,$category = "",$token)
{
	$url = "http://api.hdonline.vn/v2/film/list/type/" .$type. "?limit=10&category=" .$category. "&country=&page=" .$page. "&token=" .$token;
	echo file_get_contents($url);
}
function load_info($type,$page,$category = "",$token)
{
	$url = "http://api.hdonline.vn/v2/film/list/type/" .$type. "?limit=10&category=" .$category. "&country=&page=" .$page. "&token=" .$token;
	echo file_get_contents($url);
}
switch($f)
{
	case "list": load_list($type,$page,$category,$token); break;
	default: echo "error";
}
?>