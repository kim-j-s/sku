

// script yjm

function inputDesign(){
	$('.inpD input').each(function(){
		if ($(this).prop('checked')) {
			// if ($(this).type = 'radio') {
			// 	var $name = $(this).attr('name');
			// 	$('input[name='+$name+']').parents('.inpD').removeClass('checked')
			// }
			$(this).closest('.inpD').addClass('checked')
		}else{
			$(this).closest('.inpD').removeClass('checked')
		}
	})
}

//코스카드 내 큐브카드 리스트 오픈
function courseCard(){	
	$('.cardToggle').click(function(){
		if ($(this).closest('.cardWrap').hasClass('open')){
			$(this).closest('.card').siblings().slideUp(300)
			.closest('.cardWrap').removeClass('open');
		} else {
			$(this).closest('.card').siblings().slideDown(300).css('display','block')
			.closest('.cardWrap').addClass('open');
		}
		return false;
	})
}

//아코디언 메뉴
function accordion(){
	$('.accordion').each(function(){
		$(this).children('.open').find('.sub').show();
		$(this).find('.anch').click(function(){
			if ($(this).closest('li').hasClass('open')) {
				$(this).closest('.viewBox').next('.sub').slideUp(200)
				.closest('li').removeClass('open');
				return false;
			} else {
				$(this).closest('.viewBox').next('.sub').slideDown(200)
				.closest('li').addClass('open')
				.siblings('li').removeClass('open').find('.sub').slideUp(200);
				return false;
			}
		})
	})
}

//별점주기
function starRate(){
	$('.starRate.edit > i').click(function(){
		$(this).addClass('on').siblings().removeClass('on');
		$(this).prevAll().addClass('on');
	})
}

//코멘트 입력박스 포커스
function cmntFocus(){
	$('.cmntEnter').each(function(){
		$('.cmntEnter textarea').focus(function(){
			$(this).closest('.cmntEnter').addClass('focus');
		})
		$('.cmntEnter textarea').blur(function(){
			$(this).closest('.cmntEnter').removeClass('focus');
		})
	})
}

//코멘트 입력 글자제한
function textByteLimit(){
	$('.cmntEnter').each(function(){
		var $inputArea = $(this).find('textarea');
		var $leftTxt = $(this).find('.left');
		var $totalTxt = $(this).find('.total');
		var maxLength = 500;
		// var maxLength = $inputArea.attr('maxlength');
		var txtLength = $inputArea.val().length;
		$leftTxt.text(txtLength);
		$totalTxt.text(maxLength);
		if (txtLength < 1) {
			$leftTxt.text(0);
			$(this).find('.btn').attr('disabled', true);
		}
		$inputArea.on("propertychange change keyup keydown paste input", function(){
			txtLength = $inputArea.val().length;
			$leftTxt.text(txtLength);
			if (maxLength < txtLength) {
				$(this).closest('.cmntEnter').addClass('txtOver')
				.find('.btn').attr('disabled', true);
			}if(1 <= txtLength && txtLength <= maxLength){				
				$(this).closest('.cmntEnter').removeClass('txtOver')
				.find('.btn').attr('disabled', false);
			}else{
				$(this).closest('.cmntEnter').find('.btn').attr('disabled', true);
			}
		})
	})	
}

//코멘트 리스트
function cmntViewReply(){
	$('.cmntArea .reply').hide()	.filter('.on').show()
	.siblings('.box').find('.moreReply').addClass('opened');
	$('.moreReply').click(function(){
		var $btnText = $(this).html();	
		var $reText;
		if ($(this).hasClass('opened')) {
			$(this).removeClass('opened')
			.closest('li').find('.reply').hide().removeClass('on');
			$reText = $btnText.replace('Hide','View');
			$(this).html($reText);
		} else {
			$(this).addClass('opened')
			.closest('li').find('.reply').show().addClass('on');
			$reText = $btnText.replace('View','Hide');
			$(this).html($reText);	
		}
	})
}

//코멘트 리스트 내 View more 버튼 위치
function btnViewPosition(){
	$('.cmntArea .cmntText').each(function(){
		var $cmntTextH= $(this).innerHeight();
		var $cmntTextPosition = $(this).position().top + $cmntTextH;
		$(this).siblings('.moreReplyArea').find('.moreRead').css('top', $cmntTextPosition);
		if ($cmntTextH < 23) {
			$(this).addClass('fit')
		}else{
			$(this).removeClass('fit')
		}
	})
}

//input file 디자인
function inputFileTxt(){
	$('.inputFile').each(function(){
		var $topParent = $(this).closest('.inputFile');
		$('input[type="file"]').on('change',function(){
			var $fileName = $(this).val();
			$topParent.addClass('on').find('input[type="text"]').val($fileName);
		})

		$(this).find('button.del').click(function(){
			$topParent.removeClass('on').find('input').val('');
		})
	})
}

//툴팁 너비 조절
function tooltipBox(){

	$('.tooltip').each(function(){
		var winWidth = $(window).width();
		var $target = $(this);
		var $tipBox = $(this).find('.tipBox');
		var $tipBoxLeft = $tipBox.offset().left;	
		var $tipBoxW = $tipBox.innerWidth();	
		var $tipBoxP = $tipBoxLeft + $tipBoxW;


		if ($tipBoxP > winWidth) {
			$(this).addClass('right')
		}else{
			$(this).removeClass('right')
		}

		if (winWidth < 360){
			$(this).find('.tipBox').addClass('narrow')
		}else{
			$(this).find('.tipBox').removeClass('narrow')
		}
	})
}


$(function(){

	//console.log('test yjm');
	inputDesign();
	inputFileTxt();
	courseCard();
	accordion();
	cmntViewReply();
	starRate();
	cmntFocus();
	textByteLimit();
	btnViewPosition();

	$('.inpD').find('input').on('change',function(){
		inputDesign();
	})

	$('.txtCont').bind('DOMSubtreeModified', function(){
		btnViewPosition();
	})

	$(window).resize(function(){
		btnViewPosition();
		tooltipBox();
	})

	$('.box .moreRead').click(function(){
		$(this).hide().closest('.box').find('.flowText').addClass('opened');
	})

	//툴팁 (러닝 디테일 페이지)
	$('.ico.tip').on('click', function(){		
		if ( $(this).next('.tipBox').css('display') == 'block'){
			$(this).next('.tipBox').hide().closest('.tooltip').removeClass('on');
		} else {
			$(this).next('.tipBox').show().closest('.tooltip').addClass('on');
			tooltipBox();
		}
	});

	$('.tipBox .closeTip').on('click', function(){
		$(this).closest('.tipBox').hide().closest('.tooltip').removeClass('on');
	});


	$('.menuWrap .menu').each(function(){
		var activeM = $(this).find('.active');
		var menuLeft = activeM.offset().left;
		$(this).scrollLeft(menuLeft - 35);
	})



	// mobile script
});