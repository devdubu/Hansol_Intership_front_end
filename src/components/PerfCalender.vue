<!--

추가 사항 :
  1. 데이터 바인딩 시작 -> 주말은 고정적으로 빨간 색깔
  2. ajax로 데이터 바인딩 받기
  3. 계획과 실적 테이블 나누기
개선 사항 :
  1. 상단에 버튼 다시 하기
  2. alert 창 적용하여 경고문 날리기
  3. url로 detail 칸 작성하기
고려 사항 :
  1. 데이터에서 휴일일 경우 빨간색으로 표시
  2. wfh_yn 의 데이터 별로 확정, PM승인, 팀장 승인 등등을 구별해서  표기함
  3. 만약 캘린더 데이터가 많이 있을 경우 overflow 를 사용해서 자르기

Mon 부터 시작하기

-->


<template class="relative">
  <div class="relative modal-position">
    <PerfDetailVue v-if="viewModal" @closeModal="showViewModal()" @showEditModal="showViewModalEdit(), showViewModal()" :oneDayInfo="sendDetailInfo" :DayWorkTime="sendDayWorkTime"/>
    <PerfDetailEditVue v-if="editModal" @closeEditModal="showViewModalEdit()" :oneDayInfo="sendDetailInfo"/>
  </div>
    <div>
      <div class="text-white flex ml-8 text-xl">
        <h1>실적관리</h1>
      </div>
      <div class="grow"></div>
         <!--검색 부분 -->
      <div class="bg-slate-700 rounded-lg ml-2 mt-5">
                
          <div class="rounded-lg h-16 bg-slate-600 ml-5 flex" style="max-width:1230px">
            <div class="h-8 place-self-center flex">
                <div class="flex">
                    <div class="mt-1.5">
                        <span class="ml-4 text-white">년도</span>
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
                    <div class="mt-1.5 ml-4">
                      <div>
                        <select>
                          <option>05월 2주 ~ 05월 4주</option>
                          <option>06월 1주 ~ 06월 3주</option>
                          <option>06월 4주 ~ 07월 1주</option>
                          <option>07월 2주 ~ 07월 4주</option>
                        </select>
                      </div>
                    </div>
                    
                </div>

            </div>
            <div class="grow"></div>
            <div class="text-white mr-3 mt-2" style="max-width:1200px">
                <div>
                  <p class="text-left	">1주차 계획: <span class="text-cyan-400">{{ FirstPlanTotalHour }}Hr</span> - 개인실적: <span class="text-emerald-400">{{FirstPerfTotalHour}}Hr</span></p>
                </div>
                <div>
                  <p class="text-left	">2주차 계획: <span class="text-cyan-400">{{ SecondPlanTotalHour }}Hr</span> - 개인실적: <span class="text-emerald-400">{{ SecondPerfTotalHour }}Hr</span></p>
                </div>
            </div>
            <div class="mr-5 mt-5 text-white">
              <p>2주 총 실적 : <span class="text-rose-500">{{ FirstPlanTotalHour+SecondPlanTotalHour }}Hr</span></p>
            </div>
              <button class="w-10 h-8 place-self-center mr-5 text-white rounded-lg bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none ">검색</button>
          </div>
          <div class="flex text-white" style="max-width:1265px">
            <div class="ml-7 mt-7 text-xl">
                <p>DT개발팀 Web R&D 파트</p>
            </div>
            <div class="grow"></div>

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
                <div v-if="confirm[index]" class="absolute bottom-3 ml-2 ">
                  <div v-if="HolidayCheck[index]" class="w-10 h-6 text-center text-white rounded-lg bg-green-500">확정</div>
                </div>
                <div v-if="approve[index]" class="absolute bottom-3 ml-2 ">
                  <div v-if="HolidayCheck[index]" class="w-10 h-6 text-center text-white rounded-lg bg-fuchsia-500">팀장</div>
                </div>
                <div v-if="ended[index]" class="absolute bottom-3 ml-2 ">
                  <div v-if="HolidayCheck[index]" class="w-10 h-6 text-center text-white rounded-lg bg-rose-500">마감</div>
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
                  <div v-if="confirm[index+7]" class="absolute bottom-3 ml-2 ">
                    <div v-if="HolidayCheck[index+7]" class="w-10 h-6 text-center text-white rounded-lg bg-green-500">확정</div>
                  </div>
                  <div v-if="approve[index+7]" class="absolute bottom-3 ml-2 ">
                    <div v-if="HolidayCheck[index+7]" class="w-10 h-6 text-center text-white rounded-lg bg-fuchsia-500">팀장</div>
                  </div>
                  <div v-if="ended[index+7]" class="absolute bottom-3 ml-2 ">
                    <div v-if="HolidayCheck[index+7]" class="w-10 h-6 text-center text-white rounded-lg bg-rose-500">마감</div>
                  </div>
                  <div class="absolute bottom-3 right-0 mr-2 ">
                    <button v-if="HolidayCheck[index+7]" @click="showViewModal(index)" class="w-10 h-6 text-center text-white rounded-lg bg-gray-500 hover:bg-gray-600 active:bg-gray-700 focus:outline-none ">보기</button>
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
import PerfDetailVue from './PerfDetail.vue'
import PerfDetailEditVue from './PerfDetailEdit.vue';
import plandata from '../assets/planData.json';
import perfdata from '../assets/perfData.json';
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
import axios from "axios";
export default {
  name: 'PerfCalender',
  async created(){

  },
  mounted(){
    // this.calDate(this.perf[0].perf_day)
    // this.viewDay(this.Date)
    // this.calDayWorkTime(this.perf)

    this.calDate_v2(this.perf[0].perf_day, this.Date)
    this.calDayOfData()
    this.calDayWorkTime_v2()
    this.printPrevWorkType(this.perf)
    this.DistinguishHoliday()
    this.calApprovalTime()
    this.DistinguishStatus()
    this.calTotalWeekTime()
  },
  data: function () {
    return {
      //axios로 인해서 받은 데이터
      getPerf : [],
      responseCode: 0,
      backMessage: '',
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

      //받은 데이터
      perf: perfdata,
      plan: plandata,

      //보낼 데이터
      DayOfTheWeek: ['Mon', 'Tue', 'Web', 'Thu','Fri','Sat','Sun'],
      Date: [],// 완료
      DayOfData: [],//완료
      planDayOfDate:[],
      HolidayCheck: [true,true,true,true,true,true,true,true,true,true,true,true,true,true],


      //표시 데이터 셋
      viewDate:[], //완료
      DayWorkTime: [],
      DailyTask:[],
      approvalTime: 0,
      confirm : [false,false,false,false,false,false,false,false,false,false,false,false,false,false],
      approve : [false,false,false,false,false,false,false,false,false,false,false,false,false,false],
      ended : [false,false,false,false,false,false,false,false,false,false,false,false,false,false],

      FirstPlanTotalHour: 0,
      SecondPlanTotalHour: 0,
      FirstPerfTotalHour: 0,
      SecondPerfTotalHour : 0,

    }
  },
  methods:{
    // spring 서버와 통신 부분
    async GetServer(){
      await axios.get('/api/performance')
          .then((response)=>{
            this.getPerf = response.data.result;
            this.responseCode = response.data.code;
            this.backMessage = response.data.message;
            if(this.responseCode != 1000){
              alert("로그인 후에 이용해주세요")
              this.$router.push('/');
            }
          })
          .catch((response)=>{
            console.log(response);
          })
    },
    showViewModal(index){
      var tasknum = 0;

      for(var i = 0;i<this.perf.length;i++){
        if(this.Date[index] === this.perf[i].perf_day){
          this.sendDetailInfo[tasknum] = this.perf[i];
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
      var perftindex = 0;
      for(var i = 0; i<this.perf.length;i++){
        if(this.perf[i].seq === 1){
          this.DayOfData[perftindex] = this.perf[i];
          perftindex++;
        }
      }
      var planindex = 0;
      for(var i =0;i<this.plan.length;i++){
        if(this.plan[i].seq === 1){
          this.planDayOfDate[planindex] = this.plan[i];
          planindex++
        }
      }
    },
    calTotalWeekTime(){
      var perfTotalHour = 0, planTotalHour = 0;
      for(var i = 0;i<this.planDayOfDate.length;i++){
        if(i<7){
          if(this.planDayOfDate[i].is_Holiday === 'N'){
            this.FirstPlanTotalHour += this.planDayOfDate[i].day_hour;
          }
        }else{
          if(this.planDayOfDate[i].is_Holiday === 'N'){
            this.SecondPlanTotalHour += this.planDayOfDate[i].day_hour;
          }
        }
      }

      for(var i = 0;i<this.DayOfData.length;i++){
        if(i<7){
          if(this.DayOfData[i].is_Holiday === 'N'){
            this.FirstPerfTotalHour += this.DayOfData[i].day_hour;
          }
        }else{
          if(this.DayOfData[i].is_Holiday === 'N'){
            this.SecondPerfTotalHour += this.DayOfData[i].day_hour;
          }
        }
      }

    },
    //--------------------------------하루 당 데이터 구하는 함수 끝 ----------------------------

    //--------------------------------하루 업무 시간을 보여주는 함수--------------------------------
    calDayWorkTime_v2(){
      var startTime, endTime;
      var restTime = 100;
      for(var i = 0;i<this.DayOfData.length;i++){
        startTime = this.DayOfData[i].started_hour;
        endTime = (this.DayOfData[i].day_hour*100)+restTime;

        endTime = String(Number(startTime)+endTime);

        this.DayWorkTime[i] = [startTime.slice(0,2),':',startTime.slice(2,4),' ~ ',endTime.slice(0,2),':',endTime.slice(2,4)].join('');

      }
    },
    //--------------------------------하루 업무 시간을 보여주는 함수 끝--------------------------------

    //---------------------------캘린더에 W, P 와 수행시간을 보여주는 함수----------------------------
    printPrevWorkType(perf) {
      let total = this.perf.length;

      for(var i = 0;i<this.twoWeek;i++){
        var task = [];
        for(var j = 0;j<total;j++){
          if(this.Date[i] === perf[j].perf_day){//해당 일자에서
            if(this.perf[j].group_main_id === 'TR001'){
              task.push('W'+perf[j].task_hour+' '+perf[j].work_detail)//group_name이 아닌 기타사항이 들어가야함
            }else if(this.perf[j].group_sub_id === 'TR002'){
              task.push('P'+perf[j].task_hour+' '+perf[j].work_detail)//group_name이 아닌 기타사항이 들어가야함
            }
          }
        }
        this.DailyTask[i] = task;
      }
    },
    //------------------------캘린더에 W, P 와 수행시간을 보여주는 함수 끝 ----------------------------
    DistinguishHoliday(){
      for(var i = 0;i<this.twoWeek;i++){
        if(this.DayOfData[i].is_Holiday === 'Y'){
          this.HolidayCheck[i] = false;
        }
      }
    },
    calApprovalTime(){
      for(var i = 0;i<this.twoWeek;i++){
        if(this.DayOfData[i].is_Holiday === 'N'){
          this.approvalTime += this.DayOfData[i].day_hour;
        }
      }
    },
    DistinguishStatus(){
      for(var i = 0;i<this.twoWeek;i++){
        if(this.DayOfData[i].sign_status === '2'){
          this.confirm[i] = true;
        }else if(this.DayOfData[i].sign_status === '3'){
          this.approve[i] = true;
        }
        if(this.DayOfData[i].is_Deadline === '1'){
          this.ended[i] = true;
        }
      }

    },
    sendData(){
      //날짜 검색 부분에 데이터 전송  
    }


    //------------------------------------------------------------------------ 삭제 요망
    // calDate(startdate){
    //   for(var i = 0;i<14;i++){
    //     this.Date[i] = startdate+i;
    //   }
    //   for(var j = 0;j<this.perf.length;j++) {
    //     if (Date[1]===this.perf[j].perf_day && this.perf[j].seq == 1) {
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
    // calDayWorkTime(perf){
    //   var hour, min, restTime = 1, startTime, endTime;
    //   var start = [], end =[];
    //   let daytime = this.Date.length;
    //   let total = this.perf.length;
    //
    //
    //   for(var j = 0;j<daytime;j++) {
    //     for (var i = 0; i < total; i++) {
    //       if (perf[i].seq == 1) {
    //         startTime = perf[i].started_hour;
    //         //String을 시간과 분으로 분리
    //         hour = startTime.substr(0, 2);
    //         min = startTime.substr(2, 4);
    //         //시작 시간에 : 을 붙임
    //         startTime = hour + ':' + min;
    //         //끝나는 hour를 구하기 위해서 총 근로시간과 시작 시간을 더한다, 그리고 휴식 시간까지 더한다.
    //         hour = String(Number(hour) + Number(perf[i].day_hour) + restTime);
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
    PerfDetailVue: PerfDetailVue,
    PerfDetailEditVue: PerfDetailEditVue,
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