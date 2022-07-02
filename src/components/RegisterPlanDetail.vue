<!--
추가 사항
  1. 데이터 바인딩을 통해서 반복문 돌리기, ajax 사용하기
  2. 최대 height를 지정하고 overflow: scroll 적용하기(때에 따라서 무한 스크롤로 돌려보기)

개선 사항
  1. 위에 확정 표기 지우고 다시 재정비하기
  2. 추가 버튼 boarder 삭제하기
-->
<template>
  <!--검색 부분 -->
  <div class="grow bg-slate-700	rounded-lg ml-2 mt-5 text-white">
    <div class="rounded-lg h-16 bg-slate-600 ml-5 flex" style="max-width:1230px">
      <div class="h-8 place-self-center flex mt-2 ml-3">
        <p>계획 정보 : 06월 3주 ~ 07월 1주 (2022.6.20 ~ 2022.7.3)</p>
      </div>
      <div class="grow"></div>
      <div class="mt-5 mr-3"><p>평일 80.0시간</p></div>
    </div>
    <div class="flex mt-4" style="width: 1270px">
      <div class="grow"></div>
      <button v-if="deleteBox[index]" @click="removeTaskBox" class="mr-4 mt-3 bg-rose-500 w-6 rounded"><font-awesome-icon icon="fa-solid fa-xmark" /></button>
      <button @click="addTaskBox" class="rounded-md bg-teal-500 w-6 h-6 mr-5 hover:bg-teal-600 active:bg-teal-700 focus:outline-none"><font-awesome-icon icon="fa-solid fa-plus"/></button>
    </div>
    <!-- 컨텐츠 부분 -->
    <div class="ml-5 mt-5 text-white" style="width: 1294px">
      <!-- 표 만들기 -->

      <!-- 실제 데이터 인풋 -->
      <div v-for="(Task,index) in viewData" class="bg-slate-600 mr-16 rounded-xl mb-4" style="height: 120px">
        <div class="flex">
          <div class="mr-3 pt-4 ml-3 border-r" style="width:200px; height: 120px;">
            <p class="mr-3">{{ Task.Week }}</p>
            <div class="flex mt-2 ml-8">
              <div class="text-black mr-1">
                <select @change="onChangeStartHour_v2($event)" v-model="StartWorkTime">
                  <option  v-for="start in startTime" :value="start.value">{{ start.text}}</option>
                </select>
              </div>
              <span>~</span>
              <div class="ml-1">
                {{ EndWorkTime }}
              </div>
            </div>
            <div class="mt-2 mr-4">
              <p>재택근무<span><input type="checkbox"></span></p>
            </div>
          </div>
          <div class="ml-3 mt-5 pt-2" style="height:100px; width: 480px;">
            <div class="flex">
              <div class="mr-3 text-black">
                <select v-model="Task.group_sub_id" @change="onChangeSelectMain($event, index)" style="width: 300px">
                  <option v-for="main in mainGroup" :value="main.group_sub_id">{{ main.group_name }}</option>
                </select>
              </div>
              <div class="text-black">
                <select v-model="Task.code_id" @change="onChangeSelectSub($event, index)" style="width: 450px">
                  <option v-for="subtask in subTaskCopy[index]" :value="subtask.code_id">{{ subtask.code_name }}</option>
                </select>
              </div>
            </div>
            <div style="width: 400px" class="text-black mt-3">
              <input style="width: 400px" type="input">
            </div>
          </div>

          <div class="grow"></div>
          <div class="mr-4 mt-2">
            <div class="flex mt-5">
              <div>
                <p>시간 :</p>
              </div>
              <div class="pb-1">
                <input @change="onChangeTaskHour_v2($event,index)" v-model="Task.task_hour" style="width: 40px; height: 20px" class="ml-2 pl-3 text-black rounded" type="number">
              </div>
            </div>
            <div class="mt-4 mr-4 ">
              <p>{{ renderTaskStartHour[index] }} ~ {{ renderTaskEndHour[index] }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex mt-4">
        <div class="grow"></div>
        <router-link to="/registerplandetail"><button style="width: 150px" class="text-white bg-teal-500 rounded">날짜별 세부 계획</button></router-link>
        <button style="width: 50px" class="ml-4 text-white bg-rose-500 rounded">저장</button>
        <div class="grow"></div>
      </div>

    </div>


  </div>

</template>
<script>

import registerTask from '../assets/task.json';
import registerProject from '../assets/project.json'

export default {
  name: 'RegisterPlanDetail',
  mounted() {

    this.ClassifyTaskType();
    this.ClassifyProject();
    this.MountSelect();
    this.SetTaskHour_v2();
  },
  data() {
    return {
      taskType: registerTask,
      project: registerProject,

      //보내는 데이터
      sendData: [],

      //화면에 뿌려주는 변수
      viewData: [{
        Week: "7월 1주차 ~ 7월 2주차",
        seq: 1,
        task_hour: 8,
        started_hour: "0900",
        ended_hour: "1800",
        group_main_id: "TR001",
        group_sub_id: "ZDUM1",
        code_id: "Z001",
        group_name: "주업무",
        code_name: "R&D 및 내부 PJT (NonPJT코드) - 시장조사, 분석, 계획, 설계/개발/테스트/이행",
        work_detail: "주업무",
      }
      ],

      //시간에 대한 변수
      StartWorkTime: "",
      EndWorkTime: [],

      //각 TaskTime
      planStartHour : "",
      taskStartHour : [],
      taskEndHour : [],
      taskTime :[],
      renderTaskStartHour:[],
      renderTaskEndHour:[],
      totalDayWorkTime: 0,

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
      subTaskCopy: [],
      subProejct: [],
    }
  },
  methods: {
    MountSelect() { // subTask 완성
      //MainTask - 완성
      //이거 혹시 sendTaskData가 여러개라면, 여러개를 뿌려줘야하는데
      for(var j = 0;j<this.viewData.length;j++){
        this.subTaskCopy[j] = [...this.subTask];
      }
      console.log(this.subTaskCopy)


      for(var i = 0;i<this.viewData.length; i++){
        for(var j = 0; j<this.subTaskCopy[i].length; j++){

          if(this.subTaskCopy[i][j].group_sub_id != this.viewData[i].group_sub_id){
            this.subTaskCopy[i].splice(j,1)
            j--;
          }
        }
      }
      console.log(this.subTaskCopy)
    },

    ClassifyTaskType() {//완성
      for (var i = 0; i < this.taskType.length; i++) {
        if (this.taskType[i].group_id === 'TR001') {
          this.mainGroup.push({
            group_main_id: this.taskType[i].group_id,
            group_sub_id: this.taskType[i].code_id,
            group_name: this.taskType[i].code_nm
          });
        } else {
          this.subTask.push({
            group_sub_id: this.taskType[i].group_id,
            code_id: this.taskType[i].code_id,
            code_name: this.taskType[i].code_nm
          });
        }
      }
    },
    ClassifyProject() {
      for (var i = 0; i < this.project.length; i++) {
        this.mainGroup.push({
          group_main_id: this.project[i].project_code,
          group_sub_id: 'TR002',
          group_name: this.project[i].project_nm
        });
      }
    },
    addTaskBox() {
      this.viewData.push(
          {
            Week: "7월 1주차 ~ 7월 2주차",
            seq: 1,
            task_hour: 8,
            started_hour: "0900",
            ended_hour: "1200",
            group_main_id: "TR001",
            group_sub_id: "ZDUM1",
            code_id: "Z001",
            group_name: "주업무",
            code_name: "R&D 및 내부 PJT (NonPJT코드) - 시장조사, 분석, 계획, 설계/개발/테스트/이행",
            work_detail: "주업무",
          }
      );
      console.log(this.viewData);
    },
    onChangeSelectMain(event, index) {
      var sub = event.target.value

      this.viewData[index].group_sub_id = sub;

      for (var i = 0; i < this.mainGroup.length; i++) {
        if (sub === this.mainGroup[i].group_sub_id) {
          this.viewData[index].group_main_id = this.mainGroup[i].group_main_id;
          this.viewData[index].group_name = this.mainGroup[i].group_name;
          break;
        }
      }
      this.subTaskCopy[index] = [...this.subTask];


      for (var i = 0; i < this.subTaskCopy[index].length; i++) {
        if (sub != this.subTaskCopy[index][i].group_sub_id) {
          this.subTaskCopy[index].splice(i, 1);
          i--;
        }
      }
    },
    onChangeSelectSub(event, index) {

      var code = event.target.value;

      this.viewData[index].code_id = code;

      for (var i = 0; i < this.subTask.length; i++) {
        if (this.subTask[i].code_id === code) {
          this.viewData[index].code_name = this.subTask[i].code_name;
        }
      }
    },
    SetTaskHour_v2(){
      for(var i = 0;i<this.viewData.length;i++){
        this.taskStartHour.push(Number(this.viewData[i].started_hour))
        this.taskEndHour.push(Number(this.viewData[i].ended_hour))
        this.taskTime.push(this.viewData[i].task_hour)
      }
      this.totalDayWorkTime = this.viewData[0].day_hour;
      this.RenderTime_v2()
      console.log(this.taskStartHour)
    },
    onChangeStartHour_v2(e){
      var daystart = e.target.value;
      daystart = Number(daystart);
      this.taskStartHour[0] = daystart;
      this.calTime_v2();
    },
    onChangeTaskHour_v2(e,index){

      this.taskTime[index] = Number(e.target.value);
      var sumTime = 0
      for(var i = 0;i<this.taskTime.length;i++){
        sumTime += this.taskTime[i]
      }
      this.totalDayWorkTime = sumTime

      this.calTime_v2();

    },//시간 계산을 해주는 메서드 -> 시간 계산이 필요할 때 활용하면 된다.
    calTime_v2(){
      //12시 이전에 계획이 끝나는 경우
      var time = 0;
      //12시 이후에 계획이 끝나는 경우
      var lunch = 0;
      var lunchTime = 100;
      for(var i = 0;i<this.taskTime.length;i++){
        time = this.taskStartHour[i]+(this.taskTime[i]*100);
        if(lunch == 0 && time > 1200){
          time += lunchTime;
          this.taskEndHour[i] = time
          lunch++;
        }else if(time === 1200 && lunch === 0){
          this.taskEndHour[i] = time;
          time += lunchTime;
          lunch++;
        }else{//12시 이전이거나 혹은 12시 이후 일때
          this.taskEndHour[i] = time;
        }
        if(i < this.taskTime.length-1){
          this.taskStartHour[i+1] = time;
        }

      }
      console.log(this.taskStartHour);
      console.log(this.taskEndHour);
      this.RenderTime_v2();
    },
    RenderTime_v2(){
      for(var i = 0;i<this.taskStartHour.length;i++){
        var start = this.taskStartHour[i]
        var end = this.taskEndHour[i]

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
        this.renderTaskStartHour[i] = [start.slice(0,2),':',start.slice(2,4)].join('');
        this.renderTaskEndHour[i] = [end.slice(0,2),':',end.slice(2,4)].join('');
      }

      var start =  this.taskStartHour[0]
      this.StartWorkTime = '0'+String(start)
      console.log(start)
      var index = this.taskStartHour.length-1
      var EndDay = String(this.taskEndHour[index])
      this.EndWorkTime = [EndDay.slice(0,2),':',EndDay.slice(2,4)].join('');

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
.interval{
  width: 100px;
}
.name-interval{
  width: 100px;
}
.table-size{
  height: 40px;
}
.textover{
  overflow: hidden;
  text-overflow: ellipsis;
}


</style>
