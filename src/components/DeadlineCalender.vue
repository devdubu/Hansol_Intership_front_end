<!--
개선사항
  1. checkbox로 교체하기
-->
<template>
    <div>
         <!--검색 부분 -->
      <div class="grow bg-slate-700	rounded-lg ml-2 mt-5">
          <div class="rounded-lg h-16 bg-slate-600 ml-5 flex" style="max-width:1230px">
            <div class="h-8 place-self-center flex">
                <div class="flex">
                    <div class="mt-1.5">
                        <span class="ml-4 text-white">년 월</span>
                    </div>
                    <div class="mt-1.5 ml-4">
                        <select>
                            <option>2021</option>
                            <option>2022</option>
                            <option>2023</option>
                            <option>2024</option>
                            <option>2025</option>
                            <option>2026</option>
                        </select>
                    </div>                    
                    
                </div>
                
                <div class="flex">
                    <div class="mt-1.5">
                        <p class="ml-2 text-white" style="width:100px">조직</p>
                    </div>
                    <div class="mt-1.5">
                            <select>
                                <option>한솔PNS</option>
                                <option>한솔 인티큐브</option>
                            </select>
                        </div>           
                </div>
                

            </div>
            <div class="grow"></div>
            
            <button class="w-10 h-8 place-self-center mr-5 text-white rounded-lg bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none ">검색</button>
          </div>
          <div class="flex" style="width:1260px">
            <div class="grow"></div>
            <div class="mt-5">
                <button class="h-8 calendar-interval-day-check place-self-center mr-5 text-white rounded-lg bg-rose-500 hover:bg-rose-600 active:bg-rose-700 focus:outline-none ">마감처리</button>
            </div>
          </div>
          <!-- 컨텐츠 부분 -->
          <div class="ml-5 mt-5 ">
            <!--상단 요일 표시-->
            <div class="flex" style="width:1400px;">
                  <div class="bg-slate-500 text-white rounded-tl-lg border-slate-600 border-r-2" style="width: 110px;">
                    <button>전체 월 선택</button>
                  </div>
                  <div class="bg-slate-500 text-white day-menu border-slate-600 border-r-2">
                    <button>Mon</button>
                  </div>
                  <div class="bg-slate-500 text-white border-slate-600 day-menu border-r-2">
                    <button>Tue</button>
                  </div>
                  <div class="bg-slate-500 text-white border-slate-600 day-menu border-r-2">
                    <button>Web</button>
                  </div>
                  <div class="bg-slate-500 text-white border-slate-600 day-menu border-r-2">
                    <button>Thu</button>
                  </div>
                  <div class="bg-slate-500 text-white border-slate-600 day-menu border-r-2">
                    <button>Fri</button>
                  </div>
                  <div class="bg-slate-500 text-white border-slate-600 day-menu border-r-2">
                    <button>Sat</button>
                  </div>
                  <div class="bg-slate-500 text-white rounded-tr-lg border-slate-600 day-menu">
                    <button>Sun</button>
                  </div>
            </div>
            <!-- 날짜에 대한 데이터 -->
            <div  class="flex" style="width:1400px;">
              <div class="bg-zinc-200	 text-white border-r-2 calendar border-slate-600" style="width: 110px;">
              </div>
              <div class="bg-zinc-200 text-white  day-menu border-r-2 calendar border-slate-600 flex">
                <div class="date bg-zinc-500">
                  <p class="pt-1">1</p>
                </div>
                <div class="mt-3 ml-20"><input class="check-box-size" type="checkbox"></div>
              </div>
              <div class="bg-zinc-200 text-white day-menu border-r-2 calendar border-slate-600 flex">
                <div class="date bg-zinc-500">
                  <p class="pt-1">1</p>
                </div>
                <div class="mt-3 ml-20"><input class="check-box-size" type="checkbox"></div>
              </div>
              <div class="bg-zinc-200 text-white day-menu border-r-2 calendar border-slate-600 flex">
                <div class="date bg-zinc-500">
                  <p class="pt-1">1</p>
                </div>
                <div class="mt-3 ml-20"><input class="check-box-size" type="checkbox"></div>
              </div>
              <div class="bg-zinc-200 text-white day-menu border-r-2 calendar border-slate-600 flex">
                <div class="date bg-zinc-500">
                  <p class="pt-1">1</p>
                </div>
                <div class="mt-3 ml-20"><input class="check-box-size" type="checkbox"></div>
              </div>
              <div class="bg-zinc-200 text-white day-menu border-r-2 calendar border-slate-600 flex">
                <div class="date bg-zinc-500">
                  <p class="pt-1">1</p>
                </div>
                <div class="mt-3 ml-20"><input class="check-box-size" type="checkbox"></div>
              </div>
              <div class="bg-zinc-200 text-white day-menu border-r-2 calendar border-slate-600 flex">
                <div class="date bg-zinc-500">
                  <p class="pt-1">1</p>
                </div>
                <div class="mt-3 ml-20"><input class="check-box-size" type="checkbox"></div>
              </div>
              <div class="bg-zinc-200 text-white day-menu border-r-2 calendar border-slate-600 flex">
                <div class="date bg-zinc-500">
                  <p class="pt-1">1</p>
                </div>
                <div class="mt-3 ml-20"><input class="check-box-size" type="checkbox"></div>
              </div>
            </div>
          </div>
      </div>
    </div>
    

</template>


<script>
import deadline from '../assets/deadlineData.json';
export default {
    name: 'DeadlineCalender',
    data(){
        return{
          deadline:deadline,
          year : 0,
          month: 0,
          calendarData : [],
          viewCalenderDate: [],
        }
    },
    mounted() {
      this.SetCalender()
    },
  methods: {
    SetCalender() {
      // 1 > 일요일, 2 > 월요일, 3 > 화요일 --->
      //if => 1이면, +7로 설정 후에 단체로 -2를 한다.
      var calenderCopy = []
      var calender = [...this.deadline]
      for (var i = 0; i < calender.length; i++) {
        if (calender[i].dayOfTheWeek === 1) {
          calender[i].dayOfTheWeek += 7;
        }
      }
      for (var i = 0; i < calender.length; i++) {
        calender[i].dayOfTheWeek -= 2;
      }
      console.log(calender);


      var startDate = calender[0].dayOfTheWeek;
      var DeadLineMonth = []


      for (var i = 0; i < 6; i++) {
        var week = []

        for (var j = 0; j < 7; j++) {
          var removed = 0;
          if (calender.length > 0 && calender[0].dayOfTheWeek === j) {
            week.push(String(calender[0].perfDay))
            removed = calender.splice(0, 1);
            console.log(removed)
          } else {
            week.push('0')
          }
          console.log(calender)
        }
        DeadLineMonth[i] = week;
      }

      console.log(DeadLineMonth)

      this.calendarData = DeadLineMonth;
    },
  }
}
</script>
<style>
.day-menu{
  width: 160px;
}
.date{
  margin-top: 10px;
  margin-left: 10px;
  width: 30px;
  height: 30px;
}
.calendar{
  height: 120px;
}
.check-box-size{
  width: 30px;
  height: 30px;
}
</style>