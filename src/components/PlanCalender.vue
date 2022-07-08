<template class="relative">
  <div class="relative modal-position">
    <PlanDetailVue v-if="viewModal" @closeModal="showViewModal()" @showEditModal="showViewModalEdit(), showViewModal()" :oneDayInfo="sendDetailInfo" :DayWorkTime="sendDayWorkTime"/>
    <PlanDetailEditVue v-if="editModal" @closeEditModal="showViewModalEdit()" :oneDayInfo="sendDetailInfo"/>
  </div>
    <div>    
         <!--검색 부분 -->
      <div class="bg-slate-700 rounded-lg ml-2 mt-2">
        <div class="text-white">
          <p class="text-left ml-5 text-xl">계획관리</p>
        </div>
          <div class="mt-3 rounded-lg h-16 bg-slate-600 ml-5 flex" style="max-width:1230px">
            <div class="h-8 place-self-center flex">
                <div class="flex">
                    <div class="mt-1.5">
                        <span class="ml-4 text-white">년도</span>
                    </div>
                    <div class="mt-1.5 ml-4">
                        <select v-model="selectYear" @change="calSelectWeek()">
                            <option  v-for="year in searchWeekYear" :value="year">{{ year }}</option>
                        </select>
                    </div>
                    <div class="mt-1.5 ml-4">
                      <div>
                        <select v-model="selectWeek">
                          <option v-for="week in copySearchWeekly" :value="week.fromdt">{{ week.content }}</option>
                        </select>
                      </div>
                    </div>
                </div>

            </div>
            <div class="grow"></div>
            <div class="text-white mr-8 mt-5" style="max-width:1200px">
                <div>
                  <p class="text-left	">결제 시간 <span class="text-rose-500">{{ approvalTime }}Hr</span></p>
                </div>
            </div>
              <button @click="SearchDate()" class="w-10 h-8 place-self-center mr-5 text-white rounded-lg bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none ">검색</button>
          </div>
          <div class="flex text-white" style="max-width:1265px">
            <div class="ml-7 mt-7 text-xl">
                <p>DT개발팀 Web R&D 파트</p>
            </div>
            <div class="grow"></div>
            <div class="flex mt-7">
                <router-link to="/registerplan"><button style="width: 80px;" class="mr-4 bg-gray-500 w-16 rounded-lg hover:bg-gray-600 active:bg-gray-700 focus:outline-none"><p class="mt-0.5 ml-0.5">계획등록</p></button></router-link>
                <button style="width: 80px;" class="mr-4 bg-gray-500	w-16 rounded-lg	hover:bg-red-600 active:bg-red-700 focus:outline-none"><p class="mt-0.5 ml-0.5">템플릿</p></button>
                <router-link to="/viewplandetail"><button style="width: 80px;" class="mr-4 bg-gray-500 w-16 rounded-lg	hover:bg-gray-600 active:bg-gray-700 focus:outline-none"><p class="mt-0.5 ml-0.5">상세보기</p></button></router-link>
                <button style="width: 80px;" class="mr-4 bg-gray-500	w-16 rounded-lg	hover:bg-gray-600 active:bg-gray-700 focus:outline-none"><p class="mt-0.5 ml-0.5">계획수정</p></button>
            </div>
          </div>


          
          <!-- 컨텐츠 부분 -->
          <div class="ml-5 mt-10">
            <!--상단 요일 표시-->
            <div class="flex flex-row " style="width:1200px;">
                <div class="calendar-interval-top" v-for="(day, index) in DayOfTheWeek">
                    <p class="bg-slate-500 text-white ">{{day}}</p>
                  <!-- 1주차 월요일 -->
                    <div class="relative calendar-interval bg-gray-100 box-border border-2" style="width:175px;">
                      <div class="flex">
                        <div class="flex-inital w-10 h-10 rounded" :class="[HolidayCheck[index] ? 'bg-gray-500':'bg-rose-500']" >
                          <p class="mt-2 text-white">{{viewDate[index]}}</p>
                        </div>
                        <div v-if="HolidayCheck[index]" class="grow mt-2">
                          <p>{{ DayWorkTime[index] }}</p>
                        </div>
                      </div>
                        
                      <div class="mt-5 relative calendar-interval">
                        <div class="absolute ml-2" style="width: 400px;">
                          <p class="text-left text-ellipsis overflow-hidden" v-for="task in DailyTask[index]" >{{task}}</p>
                        </div>
                      </div>
                      <div v-if="status[index]" class="absolute bottom-3 right-3 ml-2 ">
                        <div v-if="HolidayCheck[index]" class="w-10 h-6 text-center text-white rounded-lg bg-green-500">확정</div>
                      </div>
                      <div class="absolute bottom-3 right-0 mr-2 ">
                        <button v-if="HolidayCheck[index]" @click="showViewModal(index)" class="w-10 h-6 text-center text-white rounded-lg bg-gray-500 hover:bg-gray-600 active:bg-gray-700 focus:outline-none ">보기</button>
                      </div>
                    </div>
                  <!--2주차 월요일-->
                    <div class="relative calendar-interval bg-gray-100 box-border border-2 " style="width:175px">
                      <div class="flex">
                        <div class="flex-inital w-10 h-10 rounded" :class="[HolidayCheck[index] ? 'bg-gray-500':'bg-rose-500']">
                          <p class="mt-2 text-white">{{viewDate[index+7]}}</p>
                        </div>
                        <div v-if="HolidayCheck[index+7]" class="grow mt-2">
                          <p>{{ DayWorkTime[index+7] }}</p>
                        </div>
                      </div>
                        
                      <div class="mt-5 relative calendar-interval">
                        <div class="absolute ml-2" style="width: 400px;">
                          <p class="text-left text-ellipsis overflow-hidden" v-for="task in DailyTask[index+7]" >{{task}}</p>
                        </div>
                        </div>
                      <div v-if="status[index+7]" class="absolute bottom-3 right-3 ml-2 ">
                        <div v-if="HolidayCheck[index]" class="w-10 h-6 text-center text-white rounded-lg bg-green-500">확정</div>
                      </div>
                      <div v-if="viewDetailBtn" class="absolute bottom-3 right-0 mr-2 ">
                        <button v-if="HolidayCheck[index+7]" @click="showViewModal(index+7)" class="w-10 h-6 text-center text-white rounded-lg bg-gray-500 hover:bg-gray-600 active:bg-gray-700 focus:outline-none ">보기</button>
                      </div>
                    </div>
                </div>
              <!-- 끝 -->
            </div>
        </div>
      </div>
    </div>
    

</template>


<script>
import PlanDetailVue from './PlanDetail.vue'
import PlanDetailEditVue from './PlanDetailEdit.vue';
import plandata from '../assets/planData.json';
/*
  사용한 데이터 정리하기
  ----- 보낼 데이터 -----
  요일,
  휴일 여부,
  세부사항 페이지에 보낼 데이터,

  ------표시 데이터 셋-----
  총 시간,
  시간,
  일자,
  업무 표시 부분,

  seq단위로 데이터 뽑는걸 해봐봐야할듯?


*/
import axios from 'axios';
import plan from '../assets/planData.json'
import weekly from '../assets/biweekly.json'
export default {
    name: 'PlanCalender',
  async mounted(){
    // this.calDate(this.plan[0].planDay)
    // this.viewDay(this.Date)
    await this.calNowDate()

    // await this.GetData()

    this.calSelectYear()
    this.calSelectWeek()


    this.calDate_v2(this.plan[0].planDay, this.Date)
    this.calDayOfData()
    this.calDayWorkTime_v2()
    this.printPrevWorkType(this.plan)
    this.DistinguishHoliday()
    this.calApprovalTime()
    this.DistinguishStatus()
  },
  data: function () {
    return {
      //AXIOS로 받아오는 데이터

      //상단에 날짜를 받아오는 변수
      getWeekly: [],
      searchWeekly: weekly.twoWeeksDtos,
      searchWeekYear: [],

      copySearchWeekly: [],

      selectWeek: weekly.startOfWeek,
      selectYear: weekly.startOfWeek.slice(0,4),

      selectDay : 0, //실제 파라미터 값으로 들어가는 값


      plan: plan, // AXIOS, 실제 데이터를 받는 부분 ------------------------------------------------>

      showGetData: [],
      //
      twoWeek: 14,
      //Detail button 유무
      viewDetailBtn: true,

      //Detail 창 띄워주는 변수
      viewModal: false,
      editModal: false,
      //Detail 창 데이터 전송
      sendDetailInfo: [],
      sendDayWorkTime: '',



      //보낼 데이터
      DayOfTheWeek: ['Mon', 'Tue', 'Web', 'Thu','Fri','Sat','Sun'],
      Date: [],// 완료
      DayOfData: [],//완료
      HolidayCheck: [true,true,true,true,true,true,true,true,true,true,true,true,true,true],


      //표시 데이터 셋
      viewDate:[], //완료
      DayWorkTime: [],
      DailyTask:[],
      approvalTime: 0,
      status : [false,false,false,false,false,false,false,false,false,false,false,false,false,false],

    }
  },
    methods:{

      //------------------------------------ AXIOS -------------------------------------------
      async GetWeekData(){
        await axios.get('/api/biweekly',{withCredentials: true})
            .then((res)=>{
              if(res.data.code === 1000){
                this.getWeekly = res.data.result.twoWeeksDtos;
                this.selectWeek = res.data.result.startOfWeek;
                console.log(this.getWeekly)
              }else{
                alert(res.data.message);
              }
            })
            .catch((res)=>{
              console.error(res);
            })
      },
      //AXIOS 로 데이터를 받아와서 vue데이터로 받아오는 방법
      async GetData(){
          await axios.get("api/plans",{
            params:{
              day: this.selectDay,
            },withCredentials : true})
          .then((res)=>{
            if(res.data.code === 1000){
              this.plan = res.data.result;
            }else{
              alert(res.data.message)
            }
            console.log(res)
          })
          .catch((res)=>{
            console.error(res)
          })
      },
      // 상단 검색 버튼을 누르면 실행되는 메서드
      async SearchDate(){
        await axios.get('/api/plans',{
          params:{
            day: this.selectWeek
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
      calNowDate(){
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        if(month<10){
          this.selectDay = (year*10000)+(month*100)+day;
        }else{
          this.selectDay = (year*1000)+(month*100)+day;
        }
      },

      calSelectYear(){
        var index = 0;
        for(var i = 0;i<this.searchWeekly.length;i++){
          if(index === 0 ){
            this.searchWeekYear[index] = this.searchWeekly[i].year
            index++;
          }

          var selectyear = 0, datayear = 0;

          selectyear = Number(this.searchWeekYear[index-1])
          datayear=Number(this.searchWeekly[i].year)

          if(selectyear < datayear){
            this.searchWeekYear.push(this.searchWeekly[i].year)
            index++;
          }
        }
      },

      calSelectWeek(){
        for(var i = 0;i<this.searchWeekly.length;i++){
          this.copySearchWeekly.push({
            year: this.searchWeekly[i].year,
            fromdt: this.searchWeekly[i].fromdt,
            content: this.searchWeekly[i].content
          })
        }
        console.log('week 데이터',this.copySearchWeekly)

        for(var i = 0;i<this.copySearchWeekly.length;i++){
          if(this.selectYear != this.copySearchWeekly[i].year){
            this.copySearchWeekly.splice(i,1);
          }
        }
        console.log('대조군',this.selectYear);
        console.log('결과 값',this.copySearchWeekly);
      },
      showViewModal(index){
        
        var tasknum = 0;

        for(var i = 0;i<this.plan.length;i++){
          if(this.Date[index] === this.plan[i].planDay){
            this.sendDetailInfo[tasknum] = this.plan[i];
            tasknum++;
          }
        }
        this.viewModal = !this.viewModal;
        this.sendDayWorkTime = this.DayWorkTime[index];
      },
      showViewModalEdit(){
        this.editModal = !this.editModal;
      },
      calDate_v2(startdate, date){
        //날짜를 데이터에 인풋
        for(var i = 0;i<this.twoWeek;i++){
          this.Date[i] = startdate+i;
        }
        //view 데이터에 인풋
        var viewdate = []
        for(var i = 0;i<this.twoWeek;i++){
          viewdate[i] = String(date[i])
          viewdate[i] = viewdate[i].substr(6, 2);
        }
        this.viewDate = viewdate;


      },

      //--------------------------------하루 당 데이터 구하는 함수 ------------------------------
      calDayOfData(){
        var index = 0;
        for(var i = 0; i<this.plan.length;i++){
          if(this.plan[i].seq === 1){
            this.DayOfData[index] = this.plan[i];
            index++;
          }

        }
      },
      //--------------------------------하루 당 데이터 구하는 함수 끝 ----------------------------

      //--------------------------------하루 업무 시간을 보여주는 함수--------------------------------
      calDayWorkTime_v2(){
        var startTime, endTime;
        var restTime = 100;
        for(var i = 0;i<this.DayOfData.length;i++){
          startTime = this.DayOfData[i].startedHour;
          endTime = (this.DayOfData[i].dayHour*100)+restTime;

          endTime = String(Number(startTime)+endTime);

          this.DayWorkTime[i] = [startTime.slice(0,2),':',startTime.slice(2,4),' ~ ',endTime.slice(0,2),':',endTime.slice(2,4)].join('');

        }
      },
      //--------------------------------하루 업무 시간을 보여주는 함수 끝--------------------------------

      //---------------------------캘린더에 W, P 와 수행시간을 보여주는 함수----------------------------
      printPrevWorkType(plan) {
        let total = this.plan.length;

        for(var i = 0;i<this.twoWeek;i++){
          var task = [];
          for(var j = 0;j<total;j++){
            if(this.Date[i] === plan[j].planDay){//해당 일자에서
              if(this.plan[j].groupMainId === 'TR001'){
                task.push('W'+plan[j].taskHour+' '+plan[j].workDetail)//codeMainNm이 아닌 기타사항이 들어가야함
              }else if(this.plan[j].groupSubId === 'TR002'){
                task.push('P'+plan[j].taskHour+' '+plan[j].workDetail)//codeMainNm이 아닌 기타사항이 들어가야함
              }
            }
          }
          this.DailyTask[i] = task;
        }
      },
      //------------------------캘린더에 W, P 와 수행시간을 보여주는 함수 끝 ----------------------------
      DistinguishHoliday(){
        console.log(this.DayOfData)
        for(var i = 0;i<this.twoWeek;i++){
          if(this.DayOfData[i].isHoliday === 'Y'){
            this.HolidayCheck[i] = false;
          }else{
            this.HolidayCheck[i] = true;
          }
        }
      },
      calApprovalTime(){
        for(var i = 0;i<this.twoWeek;i++){
          if(this.DayOfData[i].isHoliday === 'N'){
            this.approvalTime += this.DayOfData[i].dayHour;
          }
        }
      },
      DistinguishStatus(){
        for(var i = 0;i<this.twoWeek;i++){
         if(this.DayOfData[i].enrollYn === "2"){
           this.status[i] = true;
         }
        }
      }


      //------------------------------------------------------------------------ 삭제 요망
      // calDate(startdate){
      //   for(var i = 0;i<14;i++){
      //     this.Date[i] = startdate+i;
      //   }
      //   for(var j = 0;j<this.plan.length;j++) {
      //     if (Date[1]===this.plan[j].planDay && this.plan[j].seq == 1) {
      //       console.log('check');
      //     }
      //   }
      //
      // },
      // viewDay(date){
      //   var viewdate = []
      //   for(var i = 0;i<date.length;i++){
      //     viewdate[i] = String(date[i])
      //     viewdate[i] = viewdate[i].substr(6, 2);
      //   }
      //   this.viewDate = viewdate;
      // },
      //------------------------------------------------------------------------ 삭제 요망
      //변경사항 -> 시간을 통일해야할 듯



      //----------------------------------------- 삭제 --------------------------------------
      // calDayWorkTime(plan){
      //   var hour, min, restTime = 1, startTime, endTime;
      //   var start = [], end =[];
      //   let daytime = this.Date.length;
      //   let total = this.plan.length;
      //
      //
      //   for(var j = 0;j<daytime;j++) {
      //     for (var i = 0; i < total; i++) {
      //       if (plan[i].seq == 1) {
      //         startTime = plan[i].startedHour;
      //         //String을 시간과 분으로 분리
      //         hour = startTime.substr(0, 2);
      //         min = startTime.substr(2, 4);
      //         //시작 시간에 : 을 붙임
      //         startTime = hour + ':' + min;
      //         //끝나는 hour를 구하기 위해서 총 근로시간과 시작 시간을 더한다, 그리고 휴식 시간까지 더한다.
      //         hour = String(Number(hour) + Number(plan[i].dayHour) + restTime);
      //         //끝나는 시간을 더한다.
      //         endTime = hour + ":" + min;
      //
      //         //각각의 데이터를 push해준다.
      //         if (j === 5 || j === 6 || j === 12 || j === 13) {// 휴일 처럼 데이터가 없을때 골라내는 형식
      //           end[j] = ''
      //           start[j] = ''
      //         } else {
      //           start[j] = startTime;
      //           end[j] = endTime;
      //         }
      //       }
      //       if(start[j] === ''){
      //         this.DayWorkTime[j] = ''
      //       }else{
      //         this.DayWorkTime[j] = start[j] + ' ~ '+end[j];
      //       }
      //     }
      //   }
      // },
      //----------------------------------------- 삭제 --------------------------------------

    },
    components:{
      PlanDetailVue: PlanDetailVue,
      PlanDetailEditVue: PlanDetailEditVue,
    }

}
</script>
<style>
  .calendar-interval-top{
    width: 175px;
    height: 10px;
  }
  .calendar-interval{
    width: 175px;
    height: 180px;
  }
  .modal-position{
    right: 200px;
    bottom: 40px;
  }
</style>