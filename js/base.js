/*
 * Do your jorvascrompts here!
 */


$(function() {

	var title, headline, description, image, fbHeadline, fbDescription, fbImage, twitterHeadline, twitterDescription, twitterImage, googleDescription, siteURL, displayURL, domain, siteName = '';

	$('.url-input-btn').click(function(e) {

		e.preventDefault();
					
		siteURL = $('.url-input').val();

		$.ajax({
			url: '/?url='+siteURL,
			dataType: 'json',
			success: function(data) {
				if (data != null) {

					// set core metadata from data
					title = data['title'], description = data['description'];
					headline = (data['headline'] != null) ? headline = data['headline'] : headline = title;

					// set facebook and twitter metadata
					fbHeadline = (data['fbHeadline'] != null) ? fbHeadline = data['fbHeadline'] : fbHeadline = title;
					fbDescription = (data['fbDescription'] != null) ? fbDescription = data['fbDescription'] : fbDescription = description;
					fbImage = (data['fbImage'] != null) ? fbImage = data['fbImage'] : fbImage = image;
					twitterHeadline = (data['twitterHeadline'] != null) ? twitterHeadline = data['twitterHeadline'] : twitterHeadline = headline;
					twitterDescription = (data['twitterDescription'] != null) ? twitterDescription = data['twitterDescription'] : twitterDescription = description;
					twitterImage = (data['twitterImage'] != null) ? twitterImage = data['twitterImage'] : twitterImage = fbImage;
					googleDescription = (data['eDescription'] != null) ? googleDescription = data['eDescription'] : googleDescription = description;
					if (googleDescription.length > 140) {googleDescription = googleDescription.substring(0, 140)+'...';}
					if (twitterImage == null) {twitterImage = ''; }
					if (fbHeadline == null) { fbHeadline = ''; }
					image = fbImage
					if (image == null) { image = ''; }
					
					// parse domain
					if (siteURL != null) { 
						displayURL = siteURL.replace('http://','');
						displayURL = displayURL.replace('www.','');
						domain = displayURL;
						if (domain.indexOf('/') > 0) { domain = domain.substring(0, domain.indexOf('/'))}
					}

					// parse site name
					if (title.indexOf('-') > 0 && title.length > title.indexOf('-')+3) { siteName = title.substring(title.indexOf('-')+2); }
					else if (title.indexOf('|') > 0 && title.length > title.indexOf('-')+3) { siteName = title.substring(title.indexOf('|')+2); }

					// set text fields
					$('#title').val(title), $('#headline').val(headline), $('#description').val(description), $('#fbHeadline').val(fbHeadline), $('#fbDescription').val(fbDescription), $('#fbImage').val(fbImage), $('#twitterHeadline').val(twitterHeadline), $('#twitterDescription').val(twitterDescription), $('#twitterImage').val(twitterImage);

					// update displays
					updateFacebook();
					updateTwitter();
					updateGoogle();
				}
			}
		});	
	});

	$('#fbHeadline').keydown(function() {
		fbHeadline = $(this).val();
		updateFacebook();
	});
	$('#fbDescription').keydown(function() {
		fbDescription = $(this).val();
		updateFacebook();
	});
	$('#twitterHeadline').keydown(function() {
		twitterHeadline = $(this).val();
		updateTwitter();
	});

	$('.fb-submit').click(function(e) {
		e.preventDefault();
		fbImage = $('#fbImage').val();
		updateFacebook();
	})

	$('.twitter-submit').click(function(e) {
		e.preventDefault();
		twitterImage = $('#twitterImage').val();
		updateTwitter();
	})						

	function updateFacebook() {
		$('.facebook-desktop-title').html(fbHeadline);
		var fbDescriptionDisplay = fbDescription;
		if (fbDescription.length > 200) {fbDescriptionDisplay = fbDescription.substring(0, 196)+'...';}
		$('.facebook-desktop-desc').html(fbDescriptionDisplay);
		$('.facebook-desktop-domain').html(domain.toUpperCase());
		if (fbImage != null && fbImage != '') {	
			$('.facebook-desktop-img').attr('style', 'background-image: url('+fbImage+');');
		} else {
			$('.facebook-desktop-img').attr('style', 'height:0px;border:0px;');
		}
	}

	function updateTwitter() {
		$('.twitter-desktop-title').html(twitterHeadline+' <a href="'+siteURL+'">'+displayURL.substring(0,27)+'...</a>');
		if (twitterImage != null && twitterImage != '') {			
			$('.twitter-desktop-img').attr('style', 'background-image: url('+twitterImage+');');
		} else {
			$('.twitter-desktop-img').attr('style', 'height:0px;border:0px;');			
		}
	}	

	function updateGoogle() {
		$('.google-desktop-img').attr('style', 'background-image: url('+image+');');
		$('.google-desktop-title').html(headline);
		$('.google-desktop-source').html(siteName.replace('.com',''));
		$('.google-desktop-desc').html(googleDescription);
	}

});
