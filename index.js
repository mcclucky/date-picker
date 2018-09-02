(function(){
	var detepicker={};
	var dv;
	var monthData;
	detepicker.getMonthData=function(year,month){
		var ret=[];
		if(!year||!month){
			var today=new Date();
			year=today.getFullYear();
			month=today.getMonth()+1;
		}
		var thisMonthFirstDay=new Date(year,month-1,1);
		fristDay=thisMonthFirstDay.getDate();
		fristDayWeekDay=thisMonthFirstDay.getDay();
		if (fristDayWeekDay==0) {
			fristDayWeekDay=7;
		};
		var thisMonthLastDay=new Date(year,month,0);
		thislastDay=thisMonthLastDay.getDate();
		
		var lastMonthLastDay=new Date(year,month-1,0);
		lastlastDay=lastMonthLastDay.getDate();
		lastMonthLastDayCount=fristDayWeekDay-1;
		
		//获取一个星期的日期
		for(var i=0;i<6*7;i++){
			var date=i-lastMonthLastDayCount+1;
			var showdate=date;
			var thismonth=month;
			if(date<=0){
				showdate=lastlastDay+date;
				thismonth=month-1;
			}
			if(date>thislastDay){
				showdate=date-thislastDay;
				thismonth=month+1;
			}
			if(thismonth==0){
				thismonth=12;
			}else if(thismonth==13){
				thismonth=1;
			}
			ret.push({
				date:date,
				showDate:showdate,
				thismonth:thismonth,
			})
		}
		//函数执行完返回结果
		return {
			day:ret,
			year:year,
			month:month,
		}
	};
	detepicker.buildUi=function(year,month){
		monthData=detepicker.getMonthData(year,month);
		var calendarday=monthData.day;
		var html = '<div class="calendar-head">' +
			'<a href="#" class="left" >&lt;</a>' +
			'<a href="#" class="right">&gt;</a>' +
			'<span>' + monthData.year +  '</span>' +
			'<span>' + '-' +'</span>' +
			'<span>' + monthData.month + '</span>' +
			'</div>' +
			'<div class="calendar-body" id="calendar-body">' +
			'<table><tr><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th><th>日</th></tr>';

		for(var i = 0; i < calendarday.length; i++) {
			if(i % 7 == 0) {
				html += "<tr><td date='" + calendarday[i].date + "'>" + calendarday[i].showDate + "</td>";
			} else if(i % 7 == 6) {
				html += "<td date='" + calendarday[i].date + "'>" + calendarday[i].showDate + "</td></tr>";
			} else {
				html += "<td date='" + calendarday[i].date + "'>" + calendarday[i].showDate + "</td>";
			};
		}
		html += "</table></div>";
		return html; //返回HTML；
	};
	detepicker.init=function(){
		var html=detepicker.buildUi();
		dv=document.getElementsByClassName("calendar")[0];
		if (!dv) {
			dv=document.createElement("div");
			dv.className="calendar";
			document.getElementsByTagName("div")[0].appendChild(dv);
			dv.innerHTML=html;
			
		}
		var ipt=document.getElementsByTagName("input")[0];
		var calendaript=document.getElementsByClassName("calendar-input")[0];
		ipt.onclick=function(){
			if (dv.style.display=="block") {
				dv.style.display="none";
			} else{
				dv.style.display="block";
				dv.style.top=calendaript.offsetHeight+calendaript.offsetTop+5+"px";
				dv.style.left=calendaript.offsetLeft+"px";
				color();
			}
		};
		dv.addEventListener("click",function(e){
			target=e.target;
			var derection=target.className;
			detepicker.render(derection);
		},false);
		dv.addEventListener("click",function(e){
			target=e.target;
			if(target.tagName.toLowerCase()=="td"){
				var today= new Date(monthData.year,monthData.month-1,target.getAttribute("date"));
				ipt.value=today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
				dv.style.display="none";
			}else{
				return;
			}
		},false);
		detepicker.render=function(derection){
			var month=monthData.month;
			var year=monthData.year;
			if(derection=="left"){
				month=month-1;
				if (month==0) {
					month=12;
					year=year-1;
				}
			html=detepicker.buildUi(year,month);
			dv.innerHTML=html;
			color();
			}
			if (derection=="right") {
				month=month+1;
				if (month==13) {
					month=1;
					year=year+1;
				}
			html=detepicker.buildUi(year,month);
			dv.innerHTML=html;
			//
			color();
			} 
		}
		
		function color(){
			var tds=dv.getElementsByTagName("td");
			for (var i=0;i<tds.length;i++) {
				if (tds[i].getAttribute("date")!=tds[i].innerHTML) {
					tds[i].style.backgroundColor="#f2f2f2";
				}
			}
		}
	};
	window.detepicker=detepicker;
})();