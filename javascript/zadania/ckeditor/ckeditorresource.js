	//get url from iframe in CKEditor and insert it in url input in window massage
		function getImageURLfromIFrame(elem){
			var innerDoc = elem.contentDocument || elem.contentWindow.document;
			var url  = innerDoc.getElementById('linkpath').innerHTML.trim();
			$('.cke_dialog_ui_input_text').val(url);
			$('#imagePreview').attr('src',url);
		} 
		

