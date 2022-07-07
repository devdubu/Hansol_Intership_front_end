<!--
  change에 대한 부분을 고려하지 않고, 단순히 뿌려주기만 하면 그만인 작업이기 때문에
  codeSubNm, codeMainNm만을 사용해서 화면에 띄워주기만 하면 됨

-->
<template>
  <!--검색 부분 -->
  <div style="height: 700px;" class="grow bg-slate-700	rounded-lg ml-2 mt-5 text-white main-scroll-bar">
    <div class="rounded-lg h-16 bg-slate-600 ml-5 flex" style="max-width:1230px">
      <div class="h-8 place-self-center flex mt-2 ml-3">
        <p>계획 정보 : {{ week }}</p>
      </div>
      <div class="grow"></div>
      <div class="mt-5 mr-3"><p class="text-l">평일 <span class="text-rose-500">{{ totalWeekWorkTime }}</span>시간</p></div>
    </div>
    <div style="width: 1250px" class="flex mt-4" >
      <div class="grow"></div>
    </div>
    <!--데이터 반복 시작 부분-->
    <div v-for="(date, dateIndex) in viewData" >
      <div v-if="isHoliday[dateIndex]" class="scroll-bar" style="height: 300px;">
        <div class="flex pt-4 mt-2 pb-2 ml-4 pl-5 bg-slate-800 rounded-t-lg" style="width: 1235px">
          <div class=" border-b-2">
            <p class="mb-1 ml-5 text-xl ">{{ Viewdate[dateIndex] }} <span class="bg-gray-500 pr-1 pl-1 rounded">{{ ViewDay[dateIndex] }}</span>
              <span class="text-teal-500" v-if="dateIndex < 7"> - 1주차</span>
              <span class="text-lime-500" v-if="dateIndex >= 7"> - 2주차</span>
            </p>
          </div>
          <div class="border-b-2 grow"></div>
          <div class="border-b-2 mr-">
          </div>
        </div>
        <!-- 컨텐츠 부분 -->
        <div class="pl-5 ml-4 pt-5 text-white sub-scroll-bar bg-slate-800 rounded-b-lg" style="width: 1235px; height: 200px;">
          <!-- 표 만들기 -->

          <div v-for="(Task,index) in viewData[dateIndex]" class="bg-slate-600 mr-4 rounded-xl mb-4" style="height: 120px">

            <div class="flex">
              <div class="mr-3 pt-4 ml-3 border-r" style="width:200px; height: 120px;">
                <div class="flex mt-2 ml-8">
                  <div class=" mr-1">
                    <p class="text-xl">{{[StartWorkTime[dateIndex].slice(0,2),':',StartWorkTime[dateIndex].slice(2,4)].join('')}}</p>
                  </div>
                  <span class="text-xl">~</span>
                  <div class="ml-1">
                    <p class="text-xl">{{ EndWorkTime[dateIndex] }}</p>
                  </div>
                </div>
                <div style="width:300px;" class="mt-2 ml-10">
                  <div style="width:105px;" class="bg-sky-300 w-16 h-6 rounded-md">재택근무</div>                
                </div>
              </div>
              <div class="ml-3 mt-5 pt-2" style="height:100px; width: 480px;">
                <div class="flex">
                  <div  class="mr-3">
                    <p style="width: 100px">{{Task.codeMainNm}}</p>
                  </div>
                  <div style="width: 600px;" class="">
                    <p style="width: 800px;">{{Task.codeSubNm}}</p>
                  </div>
                </div>
                <div style="width: 400px" class="mt-3">
                  <p>{{Task.workDetail}}</p>
                </div>
              </div>

              <div class="grow"></div>
              <div class="mr-4 mt-2">
                <div class="flex mt-5">
                  <div>
                    <p>시간 :</p>
                  </div>
                  <div class="pb-1">
                    <p>{{Task.taskHour}}</p>
                  </div>
                </div>
                <div class="mt-4 mr-4">
                  <p>{{ renderTaskStartHour[dateIndex][index] }} ~ {{ renderTaskEndHour[dateIndex][index] }}</p>
                </div>
              </div>
            </div>
          </div>
          <!--반복 종료 구간-->

        </div>

      </div>
    </div>
  </div>

</template>
<script>

import registerTask from '../assets/task.json';
import registerProject from '../assets/project.json'

export default {
  name: 'ViewPlanDetail',
  mounted() {
    this.MountDataSet()
    this.SetTaskHour_v2();
  },
  data() {
    return {
      //받는 데이터
      taskType: registerTask,
      project: registerProject,
      startDate : 20220704,
      week: '06월 3주 ~07월 1주',

      //보내는 데이터
      sendData: [],

      //화면에 뿌려주는 변수
      viewData: [[]],
      isHoliday : [true, true, true, true, true, true, true, true, true, true, true, true, true, true],
      detailTask: [],


      //날짜에 대한 변수
      Viewdate:[],
      ViewDay:['월','화','수','목','금','토','일','월','화','수','목','금','토','일'],


      //시간에 대한 변수
      StartWorkTime: [],
      EndWorkTime: [],

      //각 TaskTime
      planStartHour : "",
      taskStartHour : [],
      taskEndHour : [],
      taskTime :[],
      renderTaskStartHour:[],
      renderTaskEndHour:[],
      totalDayWorkTime: [],
      totalWeekWorkTime: 0,

      startTime: [
        {text: "8:00", value: "0800"},
        {text: "8:30", value: "0830"},
        {text: "9:00", value: "0900"},
        {text: "9:30", value: "0930"},
        {text: "10:00", value: "1000"}
      ],
      endTime: [
        {text: "16:00", value: "1600"},
        {text: "16:30", value: "1630"},
        {text: "17:00", value: "1700"},
        {text: "17:30", value: "0930"},
        {text: "18:00", value: "1800"},
        {text: "18:30", value: "1830"},
        {text: "19:00", value: "1900"},
        {text: "19:30", value: "1930"},
        {text: "20:00", value: "2000"}
      ],

      startWorkTimeView: [],
      endWorkTimeView: [],


      // 대분류, 소 분류 -> 따로 데이터를 받아오는 값
      mainGroup: [],
      subTask: [],
      subTaskCopy: [[[]]],
      subProejct: [],
    }
  },
  methods: {
    MountDataSet(){
      var arr = []
      for(var i = 0;i<14;i++){
         arr = [{
          seq:1,
          taskHour:8,
          plan_day: this.startDate+i,
          dayHour: 8,
          started_hour:"0900",
          endedHour: "1800",
          groupMainId:"TR001",
          groupSubId : "ZDUM1",
          codeId : "Z001",
          codeMainNm : "주업무",
          codeSubNm:"R&D 및 내부 PJT (NonPJT코드) - 시장조사, 분석, 계획, 설계/개발/테스트/이행",
          workDetail : "주업무",
          wfhYn : "0",
          enrollYn : "0",
          isHoliday : "N"
        }];
        if(i === 5 || i === 6 || i === 12 || i === 13){
          arr[0].isHoliday = "Y"
        }
        this.viewData[i] = arr;
      }

      //시간에 대한 변수의 2차원 배열 셋팅

      //select 변수의 2차원 배열의 형태 셋팅

      var date = []
      for(var i = 0;i<14;i++){
        var strdate = ''
        date[i] = this.startDate+i;
        strdate = String(date[i])
        this.Viewdate[i] = [strdate.slice(0,4),'.',strdate.slice(4,6),'.',strdate.slice(6,8)].join('');

        if(this.viewData[i][0].isHoliday === 'Y'){
          this.isHoliday[i] = false;
        }
      }
    },
    // ClassifyProject() {
    //   var MainArr = []
    //   for (var i = 0; i < this.project.length; i++) {
    //     MainArr.push({
    //       groupMainId: this.project[i].project_code,
    //       groupSubId: 'TR002',
    //       codeMainNm: this.project[i].project_nm
    //     });
    //   }
    //   for(var i = 0;i<14;i++){
    //     this.mainGroup.push(MainArr)
    //   }
    // },
    
    //2차원 배열로 셋팅해야함
    SetTaskHour_v2(){
      for(var j = 0; j<14;j++){
        var taskstart = [], taskend =[], tasktime =[];
        for(var i = 0;i<this.viewData[j].length;i++){
           taskstart.push(Number(this.viewData[j][i].started_hour))
           taskend.push(Number(this.viewData[j][i].endedHour))
           tasktime.push(this.viewData[j][i].taskHour)
        }
        this.taskStartHour[j] = taskstart
        this.taskEndHour[j] = taskend
        this.taskTime[j] = tasktime
      }
      for(var i = 0;i<14;i++){
        this.totalDayWorkTime[i] = this.viewData[i][0].dayHour;
        this.StartWorkTime[i] = this.viewData[i][0].started_hour;
      }

      for(var i = 0;i<this.totalDayWorkTime.length;i++){
        if(this.isHoliday[i]){
          this.totalWeekWorkTime += this.totalDayWorkTime[i];
        }
      }
      this.RenderTime_all()
    },
    RenderTime_all(){

      for(var i = 0; i<14; i++){
        var start_arr = [], end_arr = [];
        for(var j = 0;j<this.taskStartHour[i].length;j++){
          var start = this.taskStartHour[i][j];
          var end = this.taskEndHour[i][j];

          if(start/100 < 10){
            start = '0'+String(start);
          }else {
            start = String(start);
          }
          if(end/100 < 10){
            end = '0'+String(end)
          }else{
            end = String(end);
          }

          start_arr[j] = [start.slice(0,2),':',start.slice(2,4)].join('');
          end_arr[j] = [end.slice(0,2),':',end.slice(2,4)].join('');
        }
        this.renderTaskStartHour[i] = start_arr;
        this.renderTaskEndHour[i] = end_arr;
        this.EndWorkTime[i] = end_arr[end_arr.length-1]
      }
    },
    RenderTime_v2(dateIndex){
      for(var i = 0;i<this.taskStartHour[dateIndex].length;i++){
        var start = this.taskStartHour[dateIndex][i];
        var end = this.taskEndHour[dateIndex][i];

        if(start/100 < 10){
          start = '0'+String(start);
        }else {
          start = String(start);
        }
        if(end/100 < 10){
          end = '0'+String(end)
        }else{
          end = String(end);
        }
        this.renderTaskStartHour[dateIndex][i] = [start.slice(0,2),':',start.slice(2,4)].join('');
        this.renderTaskEndHour[dateIndex][i] = [end.slice(0,2),':',end.slice(2,4)].join('');
      }

      var start =  this.taskStartHour[dateIndex][0]
      this.StartWorkTime[dateIndex] = '0'+String(start)


      console.log(this.StartWorkTime[dateIndex][0])

      var index = this.taskStartHour[dateIndex].length-1
      var EndDay = String(this.taskEndHour[dateIndex][index])
      this.EndWorkTime[dateIndex] = [EndDay.slice(0,2),':',EndDay.slice(2,4)].join('');

    },
    //---------------------------------------경고창 모음집--------------------------------------
    alertTaskTime(e){
      var time = e.target.value;
      if(time <= 0){
        alert('음수는 입력할 수 없습니다.')
      }
    },
    SaveData(){
      alert: for(var i = 0;i<14;i++){
        for(var j = 0;j<this.viewData[i].length;j++){
          if(this.viewData[i][j].taskHour === 0){
            var warn_day = String(this.viewData[i][j].plan_day)
            warn_day = [warn_day.slice(0,4),'.',warn_day.slice(4,6),'.',warn_day.slice(6,8)].join('')
            alert(warn_day+'일의 시간을 입력해주세요')
            break alert;
          }
          var stringTaskStartHour = this.taskStartHour[i][j];
          var stringTaskEndHour = this.taskEndHour[i][j];

          if(stringTaskStartHour/100 <10){
            stringTaskStartHour = '0'+String(stringTaskStartHour);
          }else{
            stringTaskStartHour = String(stringTaskStartHour);
          }
          if(stringTaskEndHour/100 < 10){
            stringTaskEndHour = '0'+String(stringTaskEndHour);
          }else{
            stringTaskEndHour = '0'+String(stringTaskEndHour);
          }
          this.viewData[i][j].dayHour = this.totalDayWorkTime[i];
          this.viewData[i][j].started_hour = stringTaskStartHour;
          this.viewData[i][j].endedHour = stringTaskEndHour;
        }
      }

      var index = 0;
      for(var i = 0;i<14;i++){
        for(var j = 0; j<this.viewData[i].length;j++){
          this.sendData[index] = {
            plan_day: this.startDate+i,
            seq: this.viewData[i][j].seq,
            taskHour: this.view[i][j].taskHour,
            dayHour: this.viewData[i][j].dayHour,
            startedHour: this.viewData[i][j].started_hour,
            endedHour: this.viewData[i][j].endedHour,
            groupMainId: this.viewData[i][j].groupMainId,
            groupSubId: this.viewData[i][j].groupSubId,
            codeId : this.viewData[i][j].codeId,
            codeMainNm: this.viewData[i][j].codeMainNm,
            codeSubNm: this.viewData[i][j].codeSubNm,
            workDetail : this.viewData[i][j].workDetail,
            wfhYn: "0",
            enrollYn: '0',
            isHoliday :"N"
          }
          if(i === 5 || i === 6 || i === 12 || i === 13){
            this.sendData[index].isHoliday = "Y";
          }
          index++;
        }
      }
      console.log(this.sendData)
    },
  }
}
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main-scroll-bar{
  overflow-y: scroll;
}
.main-scroll-bar::-webkit-scrollbar{
  width: 10px;
  border-radius: 5px;
}
.main-scroll-bar::-webkit-scrollbar-thumb{
  border-radius: 5px;
  background-color: rgb(100 116 139);
}
.scroll-bar{
  overflow: hidden;
}
.sub-scroll-bar{
  overflow-y: scroll;
}
.sub-scroll-bar::-webkit-scrollbar{
  width: 10px;
  border-radius: 5px;
  background-color: rgb(30 41 59);
}
.sub-scroll-bar::-webkit-scrollbar-thumb{
  border-radius: 5px;
  background-color: rgb(100 116 139);
}

</style>
