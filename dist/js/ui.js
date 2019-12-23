// script kjs
$(function(){

	// logo 사라지는 현상
	$(window).on('load', function(){
		setTimeout(function(){
			$('.logo').addClass('on');
		},3000);
		setTimeout(function(){
			$('.header .keyWord').addClass('on');
		},4000);
	});

	// 헤더 검색창 bg
	$(document).on('click', '.inputBox.sch > .inp', function(){
		$(this).closest('.inputBox').addClass('on');
	});

	/// 공지사항 닫기
	$(document).on('click', '.noticeWrap > .btn.close', function(){
		$(this).closest('.noticeWrap').addClass('on');
	});

	//gnb 호출
	$(document).on('click', '.gnbOpen', function(){
		var wH = $(window).height();
		$('nav').addClass('on');
		setTimeout(function(){
			$('body').css('position','fixed');
			$('body').css('height',wH);
		},300);
	});

	//gnb 닫기
	$(document).on('click', '.navTop > button', function(){
		$('nav').removeClass('on');
		$('body').removeAttr('style');
	});

	//입력창 리셋 버튼
	InputReset();

	//Short Cut 메뉴 활성화/비활성화
	$('.scMenuBtn').on('click', function(){
		if ($('.shortCutList').css('display') == 'none') {
			$('.shortCutList').stop(true, true).slideDown();
			return false;
		} else {
			$('.shortCutList').stop(true, true).slideUp();
			return false;
		}
	});

	// main swiper
	if ( $('.recCourse').find('.swiper-slide').length > 1 )
	{
		var swiperH = new Swiper('.recCourse', {
			loop: true,
			pagination: {
				el: '.swiper-pager',
				clickable: true,
			},
		});
	} else {
		$('.recCourse .swiper-pagination').remove();
	}

	// page top
	$(document).on('click', '.gototop', function(){
		$('html, body').animate({ 
			scrollTop: 0 
		}, 500);
	});

	// toolbar 존재에 따른 하단 여백 조정
	if ( $('.toolBar').length > 0)
	{
		$('.content').css('padding-bottom','55px');
	}

	// input date label on off
	var InpDate = $('input[type=date]');
	$(InpDate).each(function(){
		$(this).on('change', function(){
			if($(this).val()) {
				$(this).prev('label').css('display','none');
			}
			if ( !$(this).val() )
			{
				$(this).prev('label').css('display','block');
			}
		});
	});

	$('.dateReset').on('click', function(){
		$(this).closest('.datePickers').find('input[type=date]').val('');
		$(this).closest('.datePickers').find('label').css('display','block');
	});

	$('.popCont').on('scroll', function(){
		var popWrapTop = $('.popCont').scrollTop();
		if (popWrapTop > 0)
		{
			$('.popTitle').addClass('on');
		} else {
			$('.popTitle').removeClass('on');
		}
	});

	// channel btn
	$('.channelBtn').on('click', function(){
		if ( $(this).hasClass('on') )
		{
			$(this).removeClass('on');
		} else {
			$(this).addClass('on');
		}
	});

	// scroll floating
	$(window).on('load', function(){
		var menuWrapOff = $('.menuWrap').offset();
		$(window).on('scroll', function(){
			// header box shadow on off
			var winTop = $(window).scrollTop();
			var listHeaderHeight = $('.listHeader').outerHeight();
			var detailHeaderHeight = $('.detailHeader').outerHeight();
			
			if (winTop > 0)
			{
				$('.header').addClass('on');
				$('.detailHeader').addClass('on');
				$('.listHeader').addClass('on');
			} else {
				$('.header').removeClass('on');
				$('.detailHeader').removeClass('on');
				$('.listHeader').removeClass('on');
			}

			// menuWrap floating
			if ($('.listHeader').length > 0 && $('.menuWrap').length > 0)
			{		
				if (winTop > (menuWrapOff.top - listHeaderHeight))
				{
					$('.listHeader').removeClass('on');
					$('.menuWrap').addClass('on');
					$('.menuWrap').css('top',listHeaderHeight);
				} else {
					$('.menuWrap').removeClass('on').removeAttr('style');
				}
			}

			if ($('.detailHeader').length > 0 && $('.menuWrap').length > 0)
			{	
				//console.log(winTop + ' , ' + detailHeaderHeight + ' , ' + menuWrapOff.top);
				//console.log(menuWrapOff.top - detailHeaderHeight);
				if (winTop > (menuWrapOff.top - detailHeaderHeight))
				{
					$('.detailHeader').addClass('none');
					$('.menuWrap').addClass('on');
					$('.menuWrap').css('top',detailHeaderHeight);
				} else {
					$('.detailHeader').removeClass('none');
					$('.menuWrap').removeClass('on').removeAttr('style');
				}
			}

			// page Top
			if ($('.recCourseWrap').length > 0)
			{
				var recOff = $('.recCourseWrap').offset();
				var recH = $('.recCourseWrap').outerHeight();
				var headerH = $('.header').outerHeight();
				var cut = (recOff.top + recH) - headerH;
				//console.log(winTop + ' , ' + cut);

				if (winTop > cut)
				{
					$('.pageTop').addClass('on');
				} else {
					$('.pageTop').removeClass('on');
				}
			}
		});
	});

	// My Page Chart
	$(window).on('load', function(){
		if ( $('#chart').length > 0)
		{
			var maxTh = Number($('.maxTh').html());
			var maxTm = Number($('.maxTm').html());
			var maxTotal = (maxTh * 60) + maxTm;
			var ltTh = Number($('.ltTh').html());
			var ltTm = Number($('.ltTm').html());
			var ltTotal = (ltTh * 60) + ltTm;
			var chartPerA = Math.floor((ltTotal / maxTotal) * 100);
			var chartPerB = 100 - chartPerA;
			chart(chartPerA, chartPerB);
		}
	});

	// mobile keypad show hide
	$('input:text, input:password, textarea').bind('focus', function(e) {
		$('.BtmBtn.floating').addClass('on');
	});

	$('input:text, input:password, textarea').bind('blur', function(e) {
		$('.BtmBtn.floating').removeClass('on');
	});

	// mobile script
});


// input reset
function InputReset() {
	// input reset
	$('.inpReset').click(function(){
		$(this).closest('.inputBox').find('.inp').val('');
		$(this).removeClass('on');
	});

	// input reset button display
	var InpObj = $('input:text, input:password');
	$(InpObj).on('keyup', function(e) {
		if($(this).val().length >= 1) {
			$(this).addClass('on');
			$(this).closest('.inputBox').find('.inpReset').addClass('on');
		}
		if ( $(this).val().length == 0 )
		{
			$(this).removeClass('on');
			$(this).closest('.inputBox').find('.inpReset').removeClass('on');
		}
	});

	$(InpObj).unbind('focusin').focusin(function(){
		//console.log('focus in');
		if($(this).val().length >= 1) {
			$(this).addClass('on');
			$(this).closest('.inputBox').find('.inpReset').addClass('on');
		}
	});

	$(InpObj).unbind('focusout').focusout(function(){
		obj = this;
		setTimeout(function(){
			$(obj).removeClass('on');
			$(obj).closest('.inputBox').find('.inpReset').removeClass('on');
		}, 10);
	});
}

// chart
function chart(a, b) {
	var config = {
		type: 'doughnut',
		data: {
			datasets: [{
				data: [a, b],
				backgroundColor: [
					'rgba(255, 102, 77, 1)',
					'rgba(84, 93, 139, 1)',
				],
				borderWidth: 0
			}]
		},
		options: {
			cutoutPercentage: 0,
			responsive: false,
			aspectRatio: 1,
			legend: {
				display: false
			},
			tooltips: {
				enabled: false
			},
			layout: {
                padding: 0,
            },
			animation: {
				duration: 0
			}
		}
	};

	var ctx = document.getElementById('chart').getContext('2d');
	var myChart = new Chart(ctx, config);
}

function chart2Call() {
	var maxTh = Number($('.maxTh2').html());
	var maxTm = Number($('.maxTm2').html());
	var maxTotal = (maxTh * 60) + maxTm;
	var ltTh = Number($('.ltTh2').html());
	var ltTm = Number($('.ltTm2').html());
	var ltTotal = (ltTh * 60) + ltTm;
	var chartPerA = Math.floor((ltTotal / maxTotal) * 100);
	var chartPerB = 100 - chartPerA;
	chart2(chartPerA, chartPerB);
}

function chart2(a, b) {
	var config = {
		type: 'doughnut',
		data: {
			datasets: [{
				data: [a, b],
				backgroundColor: [
					'rgba(255, 102, 77, 1)',
					'rgba(84, 93, 139, 1)',
				],
				borderWidth: 0
			}]
		},
		options: {
			cutoutPercentage: 0,
			responsive: false,
			aspectRatio: 1,
			legend: {
				display: false
			},
			tooltips: {
				enabled: false
			},
			layout: {
                padding: 0,
            },
			animation: {
				duration: 0
			}
		}
	};

	var ctx = document.getElementById('chart2').getContext('2d');
	var myChart = new Chart(ctx, config);
}




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