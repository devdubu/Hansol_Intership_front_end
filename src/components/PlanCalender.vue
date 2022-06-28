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
    <PlanPerformanceDetailVue v-if="viewModal" @closeModal="showViewModal()" @showEditModal="showViewModalEdit(), showViewModal()" :oneDayInfo="sendDetailInfo"/>
    <PlanPerformanceDetailEditVue v-if="editModal" @closeEditModal="showViewModalEdit()" :oneDayInfo="sendDetailInfo"/>
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
            <div class="text-white mr-8 mt-5" style="max-width:1200px">
                <div>
                  <p class="text-left	">결제 시간 <span class="text-rose-500">{{ approvalTime }}Hr</span></p>
                </div>
            </div>
              <button class="w-10 h-8 place-self-center mr-5 text-white rounded-lg bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none ">검색</button>
          </div>
          <div class="flex text-white" style="max-width:1265px">
            <div class="ml-7 mt-7 text-xl">
                <p>DT개발팀 Web R&D 파트</p>
            </div>
            <div class="grow"></div>
            <div class="flex mt-7">
                <button class="mr-4 bg-gray-500 w-16 rounded-lg hover:bg-gray-600 active:bg-gray-700 focus:outline-none"><p class="mt-0.5 ml-0.5">계획등록</p></button>
                <button class="mr-4 bg-gray-500	w-16 rounded-lg	hover:bg-red-600 active:bg-red-700 focus:outline-none"><p class="mt-0.5 ml-0.5">템플릿</p></button>
                <button class="mr-4 bg-gray-500 w-16 rounded-lg	hover:bg-gray-600 active:bg-gray-700 focus:outline-none"><p class="mt-0.5 ml-0.5">상세보기</p></button>
                <button class="mr-4 bg-gray-500	w-16 rounded-lg	hover:bg-gray-600 active:bg-gray-700 focus:outline-none"><p class="mt-0.5 ml-0.5">계획수정</p></button>
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
                        <div class="flex-inital w-10 h-10 rounded" :class="[index === 5 || index === 6 ? 'bg-rose-500':'bg-gray-500']" >
                          <p class="mt-2 text-white">{{viewDate[index]}}</p>
                        </div>
                        <div class="grow mt-2">
                          <p>{{ DayWorkTime[index] }}</p>
                        </div>
                      </div>
                        
                      <div class="mt-5 relative calendar-interval">
                        <div class="absolute ml-2" style="width: 400px;">
                          <p class="text-left text-ellipsis overflow-hidden" v-for="task in DailyTask[index]" >{{task}}</p>
                        </div>
                      </div>
                      <div class="absolute bottom-3 right-0 mr-2 ">
                        <button @click="showViewModal(index)" class="w-10 h-6 text-center text-white rounded-lg bg-gray-500 hover:bg-gray-600 active:bg-gray-700 focus:outline-none ">보기</button>
                      </div>
                    </div>
                  <!--2주차 월요일-->
                    <div class="relative calendar-interval bg-gray-100 box-border border-2 " style="width:175px">
                      <div class="flex">
                        <div class="flex-inital w-10 h-10 rounded" :class="[index === 5 || index === 6 ? 'bg-rose-500':'bg-gray-500']">
                          <p class="mt-2 text-white">{{viewDate[index+7]}}</p>
                        </div>
                        <div class="grow mt-2">
                          <p>{{ DayWorkTime[index+7] }}</p>
                        </div>
                      </div>
                        
                      <div class="mt-5 relative calendar-interval">
                        <div class="absolute ml-2" style="width: 400px;">
                          <p class="text-left text-ellipsis overflow-hidden" v-for="task in DailyTask[index+7]" >{{task}}</p>
                        </div>
                        </div>
                      <div class="absolute bottom-3 right-0 mr-2 ">
                        <button @click="showViewModal(index+7)" class="w-10 h-6 text-center text-white rounded-lg bg-gray-500 hover:bg-gray-600 active:bg-gray-700 focus:outline-none ">보기</button>
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
import PlanPerformanceDetailVue from './PlanPerformanceDetail.vue'
import PlanPerformanceDetailEditVue from './PlanPerformanceDetailEdit.vue';
import plandata from '../assets/planData.json';

export default {
    name: 'PlanCalender',
  mounted(){
    this.calDate(this.plan[0].plan_day)
    this.viewDay(this.Date)
    this.calDayWorkTime(this.plan)
    this.printPrevWorkType(this.plan)
    this.calApprovalTime(this.plan)
  },
  data: function () {
    return {
      holiday : '',
      viewModal: false,
      sendDetailInfo: [],
      editModal: false,
      DayOfTheWeek: ['Mon', 'Tue', 'Web', 'Thu','Fri','Sat','Sun'],
      plan: plandata,
      viewDate:[],
      Date: [],
      DayWorkStart:[],
      DayWorkEnd: [],
      DayWorkTime: [],
      DailyTask:[],
      approvalTime: 0,
      viewDetailBtn: true,

    }
  },
    methods:{
      showViewModal(index){
        this.sendDetailInfo = [];
        for(var i = 0;i<this.plan.length;i++){
          if(this.Date[index] === this.plan[i].plan_day){
            this.sendDetailInfo.push(this.plan[i])
          }
        }
        this.viewModal = !this.viewModal;
      },
      showViewModalEdit(){
        this.editModal = !this.editModal;
      },
      calDate(startdate){
        for(var i = 0;i<14;i++){
          this.Date[i] = startdate+i;
        }
      },
      viewDay(date){
        var viewdate = []
        for(var i = 0;i<date.length;i++){
          viewdate[i] = String(date[i])
          viewdate[i] = viewdate[i].substr(6, 2);
        }
        this.viewDate = viewdate;
      },
      //변경사항 -> 시간을 통일해야할 듯
      calDayWorkTime(plan){
        var hour, min, restTime = 1, startTime, endTime;
        let daytime = this.Date.length;
        let total = this.plan.length;

        for(var j = 0;j<daytime;j++) {
          for (var i = 0; i < total; i++) {
            if (plan[i].seq == 1) {
              startTime = plan[i].started_hour;
              //String을 시간과 분으로 분리
              hour = startTime.substr(0, 2);
              min = startTime.substr(2, 4);
              //시작 시간에 : 을 붙임
              startTime = hour + ':' + min;
              //끝나는 hour를 구하기 위해서 총 근로시간과 시작 시간을 더한다, 그리고 휴식 시간까지 더한다.
              hour = String(Number(hour) + Number(plan[i].day_hour) + restTime);
              //끝나는 시간을 더한다.
              endTime = hour + ":" + min;

              //각각의 데이터를 push해준다.
              if (j === 5 || j === 6 || j === 12 || j === 13) {
                this.DayWorkEnd[j] = ''
                this.DayWorkStart[j] = ''
              } else {
                this.DayWorkStart[j] = startTime;
                this.DayWorkEnd[j] = endTime;
              }
            }
            if(this.DayWorkStart[j] === ''){
              this.DayWorkTime[j] = ''
            }else{
              this.DayWorkTime[j] = this.DayWorkStart[j] + ' ~ '+this.DayWorkEnd[j];
            }
          }
        }

      },
      printPrevWorkType(plan) {
        let daytime = this.Date.length;
        let total = this.plan.length;

        for(var i = 0;i<daytime;i++){
          var task = [];
          for(var j = 0;j<total;j++){
            if(this.Date[i] === plan[j].plan_day){//해당 일자에서
              if(this.plan[j].group_main_id === 'TR001'){
                task.push('W'+plan[j].task_hour+' '+plan[j].group_name)//group_name이 아닌 기타사항이 들어가야함
              }else if(this.plan[j].group_sub_id === 'TR002'){
                task.push('P'+plan[j].task_hour+' '+plan[j].group_name)//group_name이 아닌 기타사항이 들어가야함
              }
            }
          }
          this.DailyTask[i] = task;
        }
      },
      calApprovalTime(plan){
        for(var i = 0; i<plan.length;i++){
          if(plan[i].seq === 1){
            this.approvalTime += plan[i].day_hour;
          }
        }
      }
    },
    components:{
      PlanPerformanceDetailVue: PlanPerformanceDetailVue,
      PlanPerformanceDetailEditVue: PlanPerformanceDetailEditVue,
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