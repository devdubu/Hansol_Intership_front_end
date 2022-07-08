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
                  <span class="ml-4 text-white">주 시작일</span>
                </div>
                <div class="mt-1.5 ml-4">
                  <select v-model="selectYear">
                    <option v-for="year in searchYear" :value="year">{{ year }}</option>
                  </select>
                </div>
                <div>
                  <select v-model="selectMonth">
                    <option v-for="month in searchMonth" :value="month.value">{{ month.text }}</option>
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
            
            <button @click="SearchDate()" class="w-10 h-8 place-self-center mr-5 text-white rounded-lg bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none ">검색</button>
          </div>
          <div class="flex" style="width:1260px">
            <div class="grow"></div>
            <div class="mt-5">
              <button @click="CancleDeadline()" class="h-8 w-16 calendar-interval-day-check place-self-center mr-5 text-white rounded-lg bg-sky-500 hover:bg-sky-600 active:bg-sky-700 focus:outline-none ">마감철회</button>
              <button @click="ComfirmDeadline()" class="h-8 w-16 calendar-interval-day-check place-self-center mr-5 text-white rounded-lg bg-rose-500 hover:bg-rose-600 active:bg-rose-700 focus:outline-none ">마감처리</button>
            </div>
          </div>
          <!-- 컨텐츠 부분 -->
          <div class="ml-5 mt-5 ">
            <!--상단 요일 표시-->
            <div class="flex" style="width:1400px;">
                  <div class="bg-slate-500 text-white rounded-tl-lg border-slate-600 border-r-2 border-b-2 flex" style="width: 110px;">
                    <p class="ml-7">전체</p>
                    <input class="ml-3 mt-0.5 week-check-box-size" type="checkbox" v-model="allSelected">
                  </div>
                  <div class="bg-slate-500 text-white day-menu border-slate-600 border-r-2 border-b-2">
                    <button>Mon</button>
                  </div>
                  <div class="bg-slate-500 text-white border-slate-600 day-menu border-r-2 border-b-2">
                    <button>Tue</button>
                  </div>
                  <div class="bg-slate-500 text-white border-slate-600 day-menu border-r-2 border-b-2">
                    <button>Web</button>
                  </div>
                  <div class="bg-slate-500 text-white border-slate-600 day-menu border-r-2 border-b-2">
                    <button>Thu</button>
                  </div>
                  <div class="bg-slate-500 text-white border-slate-600 day-menu border-r-2 border-b-2">
                    <button>Fri</button>
                  </div>
                  <div class="bg-slate-500 text-white border-slate-600 day-menu border-r-2 border-b-2">
                    <button>Sat</button>
                  </div>
                  <div class="bg-slate-500 text-white rounded-tr-lg border-slate-600 day-menu border-b-2 border-r-2">
                    <button>Sun</button>
                  </div>
            </div>
            <!-- 날짜에 대한 데이터 -->
            <!--1주차-->
            <div v-if="showWeek[0]">
              <div  class="flex" style="width:1400px;">
                <div class="bg-zinc-200	 text-white border-r-2 calendar border-slate-600 border-b-2" style="width: 110px;">
                  <p class="text-black mt-5">1주차</p>
                  <input type="checkbox" class="week-check-box-size" v-model="firstWeekSelected">
                </div>

                <div v-for="(month,first) in calendarData[0]" class="bg-zinc-200 text-white  day-menu border-r-2 calendar border-slate-600 flex border-b-2 relative">
                  <div v-if="calendarInfo[0][first]" class="date bg-zinc-500">
                    <p class="pt-1">{{month.date.slice(6,8)}}</p>
                  </div>
                  <div v-if="calendarInfo[0][first]" class="mt-3 ml-20"><input class="check-box-size" v-model="sendData" :value="month" type="checkbox"></div>
                  <div v-if="month.isDeadline === '0' ? false : true" class="absolute bottom-2 left-2 bg-rose-500 w-10 h-7 rounded-xl">
                    <p class="mt-1">마감</p>
                  </div>
                </div>

              </div>
            </div>
            <!--2주차-->
            <div v-if="showWeek[1]">
              <div  class="flex" style="width:1400px;">
                <div class="bg-zinc-200	 text-white border-r-2 calendar border-slate-600 border-b-2" style="width: 110px;">
                  <p class="text-black mt-5">2주차</p>
                  <input type="checkbox" class="week-check-box-size" v-model="secondWeekSelected">
                </div>
                <div v-for="(month,second) in calendarData[1]" class="bg-zinc-200 text-white  day-menu border-r-2 calendar border-slate-600 flex border-b-2">
                  <div v-if="calendarInfo[1][second]" class="date bg-zinc-500">
                    <p class="pt-1">{{month.date.slice(6,8)}}</p>
                  </div>
                  <div v-if="calendarInfo[1][second]" class="mt-3 ml-20"><input v-model="sendData" :value="month" class="check-box-size" type="checkbox"></div>
                  <div v-if="month.isDeadline === '0' ? false : true" class="absolute bottom-2 left-2 bg-rose-500 w-10 h-7 rounded-xl">
                    <p class="mt-1">마감</p>
                  </div>
                </div>
              </div>
            </div>
            <!--3주차-->
            <div v-if="showWeek[2]">
              <div  class="flex" style="width:1400px;">
                <div class="bg-zinc-200	 text-white border-r-2 calendar border-slate-600 border-b-2" style="width: 110px;">
                  <p class="text-black mt-5">3주차</p>
                  <input type="checkbox" class="week-check-box-size" v-model="thirdWeekSelected">
                </div>
                <div v-for="(month,three) in calendarData[2]" class="bg-zinc-200 text-white  day-menu border-r-2 calendar border-slate-600 flex border-b-2">
                  <div v-if="calendarInfo[2][three]" class="date bg-zinc-500">
                    <p class="pt-1">{{month.date.slice(6,8)}}</p>
                  </div>
                  <div v-if="calendarInfo[2][three]" class="mt-3 ml-20"><input class="check-box-size" v-model="sendData" :value="month" type="checkbox"></div>
                  <div v-if="month.isDeadline === '0' ? false : true" class="absolute bottom-2 left-2 bg-rose-500 w-10 h-7 rounded-xl">
                    <p class="mt-1">마감</p>
                  </div>
                </div>
              </div>
            </div>
            <!--4주차-->
            <div v-if="showWeek[3]">
              <div  class="flex" style="width:1400px;">
                <div class="bg-zinc-200	 text-white border-r-2 calendar border-slate-600 border-b-2" style="width: 110px;">
                  <p class="text-black mt-5">4주차</p>
                  <input type="checkbox" class="week-check-box-size" v-model="fourthWeekSelected">
                </div>
                <div v-for="(month,four) in calendarData[3]" class="bg-zinc-200 text-white  day-menu border-r-2 calendar border-slate-600 flex border-b-2">
                  <div v-if="calendarInfo[3][four]" class="date bg-zinc-500">
                    <p class="pt-1">{{month.date.slice(6,8)}}</p>
                  </div>
                  <div v-if="calendarInfo[3][four]" class="mt-3 ml-20"><input class="check-box-size" v-model="sendData" :value="month" type="checkbox"></div>
                  <div v-if="month.isDeadline === '0' ? false : true" class="absolute bottom-2 left-2 bg-rose-500 w-10 h-7 rounded-xl">
                    <p class="mt-1">마감</p>
                  </div>
                </div>
              </div>
            </div>
            <!--5주차-->
            <div v-if="showWeek[4]">
              <div  class="flex" style="width:1400px;">
                <div class="bg-zinc-200	 text-white border-r-2 calendar border-slate-600 border-b-2" style="width: 110px;">
                  <p class="text-black mt-5">5주차</p>
                  <input type="checkbox" class="week-check-box-size" v-model="fifthWeekSelected">
                </div>
                <div v-for="(month,five) in calendarData[4]" class="bg-zinc-200 text-white  day-menu border-r-2 calendar border-slate-600 flex border-b-2">
                  <div v-if="calendarInfo[4][five]" class="date bg-zinc-500">
                    <p class="pt-1">{{month.date.slice(6,8)}}</p>
                  </div>
                  <div v-if="calendarInfo[4][five]" class="mt-3 ml-20"><input class="check-box-size" v-model="sendData" :value="month" type="checkbox"></div>
                  <div v-if="month.isDeadline === '0' ? false : true" class="absolute bottom-2 left-2 bg-rose-500 w-10 h-7 rounded-xl">
                    <p class="mt-1">마감</p>
                  </div>
                </div>
              </div>
            </div>
            <!--6주차-->
            <div v-if="showWeek[5]">
              <div  class="flex" style="width:1400px;">
                <div class="bg-zinc-200	 text-white border-r-2 calendar border-slate-600 border-b-2 rounded-bl-lg" style="width: 110px;">
                  <p class="text-black mt-5">6주차</p>
                  <input type="checkbox" class="week-check-box-size" v-model="sixthWeekSelected">
                </div>
                <div v-for="(month, six) in calendarData[5]" class="bg-zinc-200 text-white  day-menu border-r-2 calendar border-slate-600 flex border-b-2" :class="{'rounded-br-lg': six === 6}">
                  <div v-if="calendarInfo[5][six]" class="date bg-zinc-500">
                    <p class="pt-1">{{month.date.slice(6,8)}}</p>
                  </div>
                  <div v-if="calendarInfo[5][six]" class="mt-3 ml-20"><input class="check-box-size" v-model="sendData" :value="month" type="checkbox"></div>
                  <div v-if="month.isDeadline === '0' ? false : true" class="absolute bottom-2 left-2 bg-rose-500 w-10 h-7 rounded-xl">
                    <p class="mt-1">마감</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
    

</template>


<script>
import deadline from '../assets/deadlineData.json';
import axios from "axios";
import weekly from '../assets/biweekly.json'

export default {
    name: 'DeadlineCalender',
    data(){
        return{
          //상단 날짜 검색에 관한 데이터
          searchWeekly: weekly.twoWeeksDtos,
          searchYear: [],
          searchMonth: [
            {text: '1월', value: '01'},
            {text: '2월', value: '02'},
            {text: '3월', value: '03'},
            {text: '4월', value: '05'},
            {text: '6월', value: '06'},
            {text: '7월', value: '07'},
            {text: '8월', value: '09'},
            {text: '10월', value: '10'},
            {text: '11월', value: '11'},
            {text: '12월', value: '12'}],
          selectMonth: '',
          selectYear: weekly.startOfWeek.slice(0,4),

          //axios로 인해서 받은 데이터
          getDead : [],
          responseCode: 0,
          backMessage: '',

          deadline: deadline,

          setCalenderTime : 0,
          //실제 캘린더에 적용할 데이터들
          processingCalenderData : [],
          calendarData : [],
          calendarInfo: [],
          showWeek:[true, true, true, true, true, true],
          selectWeek: [false, false, false, false, false],

          //주별, 달 전체 선택에 대한 변수
          firstWeekData: [],
          secondWeekData: [],
          thirdWeekData: [],
          fourthWeekData: [],
          fifthWeekData: [],
          sixthWeekData: [],
          allData:[],
          //보내는 데이터
          sendData:[],
        }
    },
    beforeMount() {
    },
  async mounted() {

    await this.GetWeekData();
    this.calSelectYear();
    await this.getNowDeadline();
    
    this.SetCalender()

    this.SetCalenderData()
    this.SetCalenderInfo()
    this.setWeekAndAllSelect()
    },
  methods: {
    //------------------------------------ AXIOS -------------------------------------------
    async getNowDeadline(){
        const date = new Date();

        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        await axios.get('/api/deadline',{
          params:{
            year: year,
            month: month,
          }, withCredentials:true
        })
            .then((res)=>{
              this.responseCode = res.data.code;
              this.backMessage = res.data.message;
              this.getDead = res.data.result;
              if(this.responseCode != 1000){
                alert(this.backMessage)
                this.$router.push('/')
              }
            })
            .catch((res)=>{
              console.error(res);
            })
      },
    async GetWeekData(){
      await axios.get('/api/biweekly',{withCredentials: true})
          .then((res)=>{
            if(res.data.code === 1000){
              this.searchWeekly = res.data.result.twoWeeksDtos;
              console.log(this.searchWeekly)
            }else{
              alert(res.data.message);
            }
          })
          .catch((res)=>{
            console.error(res);
          })
    },
    async SearchDate(){
      await axios.get('/api/deadline',{
        params:{
          year: this.searchYear,
          month : this.selectMonth,
        },withCredentials:true
      })
          .then((res)=>{
            if(res.data.code != 1000){
              this.plan = res.data.result;
            }else{
              alert(res.data.message)
            }
          })
          .catch((res)=>{
            console.error(res)
          })
    },
    //------------------------------------ AXIOS -------------------------------------------
    calSelectYear(){
      var index = 0;
      for(var i = 0;i<this.searchWeekly.length;i++){
        if(index === 0 ){
          this.searchYear[index] = this.searchWeekly[i].year
          index++;
        }

        var selectyear = 0, datayear = 0;

        selectyear = Number(this.searchYear[index-1])
        datayear=Number(this.searchWeekly[i].year)

        if(selectyear < datayear){
          this.searchYear.push(this.searchWeekly[i].year)
          index++;
        }
      }
    },
    SetCalender() {
      // 1 > 일요일, 2 > 월요일, 3 > 화요일 --->
      //if => 1이면, +7로 설정 후에 단체로 -2를 한다.
      //원본 값이 변경되는 현상이 발생함
      var calender = []

      for(var i = 0;i<this.deadline.length;i++){
        calender.push({
          DeadlineDay : this.deadline[i].DeadlineDay,
          dayOfTheWeek: this.deadline[i].dayOfTheWeek,
          isDeadline : this.deadline[i].isDeadline
        })
      }

      for (var i = 0; i < calender.length; i++) {
        calender[i].dayOfTheWeek -= 1;
      }

      // for (var i = 0; i < calender.length; i++) {
      //   if (calender[i].dayOfTheWeek === 1) {
      //     calender[i].dayOfTheWeek += 7;
      //   }
      //   calender[i].dayOfTheWeek -= 2;
      // }



      this.processingCalenderData = [...calender]
      console.log('결과')
      console.log(this.processingCalenderData)

    },
    SetCalenderData(){
      var calender = [...this.processingCalenderData];
      var DeadLineMonth = []
      var index = 0

      end: for (var i = 0; i < 6; i++) {
        var week = []
        for (var j = 0; j < 7; j++) {
          if (calender[index].dayOfTheWeek === j && index < calender.length-1) {
            week.push({
              date: String(calender[index].DeadlineDay),
              isDeadline: calender[index].isDeadline,
            })
            index++;
          } else{
            week.push({
              date : '0',
              isDeadline: '0',
            })
          }
        }
        DeadLineMonth[i] = week;
      }

      this.calendarData = [...DeadLineMonth];
      console.log(this.calendarData)
    },
    SetCalenderInfo() {
      for (var i = 0; i < 6; i++) {
        var calenderArr = []
        var clearWeek = 0
        for (var j = 0; j < 7; j++) {
          if(clearWeek === 6){
            this.showWeek[i] = false
          }
          if (this.calendarData[i][j].date === '0') {
            calenderArr.push(false)
            clearWeek++;
          } else {
            calenderArr.push(true)
          }

        }
        this.calendarInfo[i] = calenderArr
      }
    },
    setWeekAndAllSelect(){
      for(var i = 0;i<7;i++){
        if(this.calendarData[0][i].date != '0'){
          this.firstWeekData.push(this.calendarData[0][i])
        }
      }
      for(var i = 0;i<7;i++){
        if(this.calendarData[1][i].date != '0'){
          this.secondWeekData.push(this.calendarData[1][i])
        }
      }
      for(var i = 0;i<7;i++){
        if(this.calendarData[2][i].date != '0'){
          this.thirdWeekData.push(this.calendarData[2][i])
        }
      }
      for(var i = 0;i<7;i++){
        if(this.calendarData[3][i].date != '0'){
          this.fourthWeekData.push(this.calendarData[3][i])
        }
      }for(var i = 0;i<7;i++){
        if(this.calendarData[4][i].date != '0'){
          this.fifthWeekData.push(this.calendarData[4][i])
        }
      }for(var i = 0;i<7;i++){
        if(this.calendarData[5][i].date != '0'){
          this.sixthWeekData.push(this.calendarData[5][i]);
        }
      }
      for(var i = 0;i<6;i++){
        for(var j = 0;j<7;j++){
          if(this.calendarData[i][j].date != '0'){
            this.allData.push(this.calendarData[i][j]);
          }
        }
      }
    },
    CancleDeadline(){
      var cancleData = []
      for(var i = 0;i<this.sendData.length;i++){
        if(this.sendData[i].isDeadline === '0') {
          var warningDate = [this.sendData[i].date.slice(4, 6), '월', this.sendData[i].date.slice(6, 8), '일'].join('')
          alert(warningDate + ' 은 마감 취소 할 수 없습니다.');
          return;
        }else{
          console.log('push')
          cancleData.push(this.sendData[i].date)
        }
      }
      console.log(this.sendData)
      console.log(cancleData)
    },
    ComfirmDeadline(){
      var confrimData = []
      for(var i = 0;i<this.sendData.length;i++){
        if(this.sendData[i].isDeadline === '1') {
          var warningDate = [this.sendData[i].date.slice(4, 6), '월', this.sendData[i].date.slice(6, 8), '일'].join('')
          alert(warningDate + ' 은 이미 마감된 날짜 입니다.');
          return;
        }
        confrimData.push(this.sendData[i].date)
      }
      console.log(confrimData)
    }
  },
  computed:{
    firstWeekSelected:{
      get: function (){
      },
      //setter
      set: function (e){
        return this.sendData = e ?  this.firstWeekData: [];
      },
    },
    secondWeekSelected:{
      get: function (){
      },
      //setter
      set: function (e){
        return this.sendData = e ?  this.secondWeekData: [];
      },
    },
    thirdWeekSelected:{
      get: function (){
      },
      //setter
      set: function (e){
        return this.sendData = e ?  this.thirdWeekData: [];
      },
    },
    fourthWeekSelected:{
      get: function (){
      },
      //setter
      set: function (e){
        return this.sendData = e ?  this.fourthWeekData: [];
      },
    },
    fifthWeekSelected:{
      get: function (){
      },
      //setter
      set: function (e){
        return this.sendData = e ?  this.fifthWeekData: [];
      },
    },
    sixthWeekSelected:{
      get: function (){
      },
      //setter
      set: function (e){
        return this.sendData = e ?  this.sixthWeekData: [];
      },
    },
    allSelected:{
      get: function (){
      },
      set: function (e){
        return this.sendData = e ?  this.allData: [];
      }
    }
  },
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
  height: 95px;
}
.check-box-size{
  width: 30px;
  height: 30px;
}
.week-check-box-size{
  width: 20px;
  height: 20px;
}
</style>