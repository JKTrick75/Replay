<?php
	if ((isset($_GET['page'])) && ($_GET['page']==="controller_shop")){
		include("view/inc/top_page_shop.html");	
	}else if ((isset($_GET['page'])) && ($_GET['page']==="controller_auth")){
			include("view/inc/top_page_auth.html");
	}else{
		include("view/inc/top_page.html");
	}
?>
<div id="wrapper">		
    <div id="header">    	
    	<?php
    	    include("view/inc/header.html");
    	?>        
    </div>
    <div id="pagescustom">
    	<?php 
		    include("view/inc/pages.php");
		?>        
		<br style="clear:both;">
    </div>
    <div id="footer">   	   
	    <?php
	        include("view/inc/footer.html");
	    ?>        
    </div>
</div>
<?php
    include("view/inc/bottom_page.html");
?>
