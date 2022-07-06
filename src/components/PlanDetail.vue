<!--
개선 사항

추가사항
  1. 데이터 바인딩 하기
  2. ajax를 통해서 데이터 바인딩하기
  3. view페이지는 위 시간대를 고정적으로 바꾸기(select구문 삭제 후 div 박스로 변경하기)
고려 사항
  1. 확정, 팀장 승인, 사업부 승인, 마감 등등 표기 버튼 만들기
  2. 입력한 시간에 따라서 동적으로 상단 시간 변경하기
-->
<template>
  <div class="bg-slate-700 relative">
    <div class="modal bg-slate-600 rounded-lg absolute">
      <div class="modal-title bg-green-500 rounded-t-lg text-white flex">
        <div><p class="ml-3 mt-3">계획</p></div>
        <div class="grow"></div>
        <button @click="$emit('closeModal')" class="mr-7 mt-1"><font-awesome-icon icon="fa-solid fa-xmark" /></button>
      </div>

      <!--상단 근로 시간 표시 부분-->
      <div class="modal-total-time bg-slate-500 mt-3 pt-3 rounded-md" style="margin-top:10px">
      <div class="flex text-white bg 	">
        <div class="ml-3 mr-3"><p>{{ selectDate }}</p></div>
        <div class="bg-sky-300 w-16 h-6 rounded-md">재택근무</div>
        <div class="grow"></div>
        <!--시작 시간-->
        <div class="text-white ml-3 mr-3 text-lg">
          <p class="">{{ DayWorkTime }}</p>
        </div>
        <div class="mr-4"><p>총 <span class="text-rose-400">{{ oneDayInfo[0].day_hour }}</span>시간</p></div>
      </div>
      <div class="flex mt-2 ml-3 text-white">
        <div class="text-sm mt-1"><p><span class="text-rose-400">12:00 ~ 13:00</span> 시간은 <span class="text-sky-400">점심시간(휴게시간)</span>으로 계산 됩니다. 
          <span class="text-rose-400">단, 휴일 및 휴일은 4시간당, 30분씩 휴게시간이 제외되어 다빈치에 반영됩니다.</span></p></div>
          <div class="grow"></div>
          <div class="mr-4">휴게시간 : <span class="text-sky-400">-1</span> 시간</div>
      </div>
     </div>


     <div class="flex">
      <div class="grow"></div>
        <div class="text-white flex mr-8 mt-4 text-xs">
                <div class="flex h-6">
                    <div class="mr-2 w-8 bg-green-500 rounded-xl"><p class="mt-1">확정</p></div>
                    <div><p class="mt-1">확정</p></div>
                </div>
                <div class="flex ml-3 h-6">
                    <div class="mr-2 w-8 bg-sky-500 rounded-xl"><p class="mt-1">PM</p></div>
                    <div><p class="mt-1">PM승인</p></div>
                </div>
                <div class="flex ml-3 h-6">
                    <div class="mr-2 w-8 bg-fuchsia-500 rounded-xl"><p class="mt-1">팀장</p></div>
                    <div><p class="mt-1">팀장승인</p></div>
                </div>
                <div class="flex ml-3 h-6">
                    <div class="mr-2 w-10 bg-indigo-500 rounded-xl"><p class="mt-1">사업부</p></div>
                    <div><p class="mt-1">사업부승인</p></div>
                </div>
                <div class="flex ml-3 h-6">
                    <div class="mr-2 w-8 bg-rose-500 rounded-xl"><p class="mt-1">마감</p></div>
                    <div><p class="mt-1">마감</p></div>
                </div>
            </div>
        </div>
          <!-- 프로젝트 작성 란-->
          <div class="text-white">
            <div class="mt-4">
              <div class="flex mb-2">
                <div class="ml-5 border-l border-green-400 ml-3"><p class="ml-3">실적업무</p></div>
                <div class="grow"></div><!--여기다가 그거 확정 넣어야함-->
              </div>
              <!-- 데이터 반복 구간-->
              <div class="border-2 modal-content rounded"  style="margin-bottom:10px" v-for="(data,index) in oneDayInfo">
                <div class="flex">
                  <div class=" mt-3 ml-3 pr-3 border-r-2"><p>{{ data.group_name }}</p></div>
                  <div class="mt-3 ml-3"><p>{{ data.code_name }}</p></div>
                  <div class="grow"></div>
                  <div v-if="status[index]" class="mt-2 h-7 w-11 mr-2 w-8 bg-green-500 rounded-xl"><p class="mt-0.5">확정</p></div>
                </div>
                <div class="flex">
                  <div><p class="mt-3 ml-3">{{ data.detail }}</p></div>
                  <div class="grow"></div>
                  <div class="mt-3 mr-3 bg-teal-500 w-16 rounded">시간 : {{ data.task_hour }}</div>
                  <div class="mt-3 mr-3 bg-teal-500 w-28 rounded">{{ taskHour[index] }}</div>
                </div>
              </div>
              <!-- 데이터 반복 구간 끝-->
            </div>
            <div>

          </div>
        </div>
        <div class="flex text-white mt-10 pb-10">
          <div class="grow"></div>
          <button v-if="showEditBtn" @click="$emit('showEditModal')" class="bg-yellow-500 mr-4 w-10 hover:bg-yellow-600 active:bg-yellow-700 focus:outline-none rounded">수정</button>
          <button @click="ConfirmData()" class="bg-cyan-500 w-10 hover:bg-cyan-600 active:bg-cyan-700 focus:outline-none rounded">확정</button>
          <div class="grow"></div>
        </div>  

    </div>
  </div>


</template>
<script>
import { library } from '@fortawesome/fontawesome-svg-core'

/* add some free styles */
import {faXmark} from '@fortawesome/free-solid-svg-icons'
import {faPlus} from '@fortawesome/free-solid-svg-icons'

/* add each imported icon to the library */
library.add(faXmark, faPlus)

export default {
  name: 'PlanDetail',
  props:{
    oneDayInfo: Object,
    DayWorkTime: String,
  },
  mounted() {
    this.partHour();
    this.DistinguishDetailStatus();
    this.NowDate();
  },
  // status ->  1 -  저장, 2 - 확정, 3 - 팀장, 4 - 마감
  // enroll ->  1 - 저장, 2 - 확정
  data(){
    return{
      TaskNum : 0,
      selectDate: '',
      DayHour : '',
      taskHour: [],
      status:[],
      nowdate: 0,
      showEditBtn: true,
    }
  },
  methods:{
    partHour(){
      this.TaskNum = this.oneDayInfo.length;
      for(var i = 0;i<this.TaskNum;i++){
        var startTask = this.oneDayInfo[i].started_hour;
        var endTask = this.oneDayInfo[i].ended_hour;

        this.taskHour[i] = [startTask.slice(0,2),':',startTask.slice(2,4),' ~ ',endTask.slice(0,2),':',endTask.slice(2,4)].join('');
      }
    },
    DistinguishDetailStatus(){
      this.TaskNum = this.oneDayInfo.length;
      for(var i = 0;i<this.TaskNum;i++) {
        if (this.oneDayInfo[i].enroll_yn === '2') {
          this.status[i] = true;
        } else {
          this.status[i] = false;
        }
      }
    },
    NowDate(){
      const date = new Date();

      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      if(month < 10){
        this.nowdate = (year*10000)+(month*100)+day;
      }else{
        this.nowdate = (year*1000)+(month*100)+day;
      }
      if(this.oneDayInfo[0].plan_day < this.nowdate){
        this.showEditBtn = false;
      }

    },
    ConfirmData(){
        
        const sendData = this.oneDayInfo[0].plan_day
        console.log(sendData)
    }
  },
  
  components: {
  }
}
</script>

<style>

.modal{
  width: 1200px;
  height: 500px;
  left: 300px;
  top: 100px;
  z-index: 1;
  overflow: auto;
}
.modal-title{
  width: 100%;
  height: 50px;
}
.modal-total-time{
  width: 1150px;
  height: 80px;
  margin: auto;
}
.modal-content{
  margin: auto;
  width:1150px;
  height: 100px;
}

</style>
