<template>
  <div class="bg-slate-700 relative">
    <div class="modal bg-slate-600 rounded-lg absolute">
      <div class="modal-title bg-green-500 rounded-t-lg text-white flex">
        <div><p class="ml-3 mt-3">실적</p></div>
        <div class="grow"></div>
        <button @click="$emit('closeEditModal')" class="mr-7 mt-1"><font-awesome-icon icon="fa-solid fa-xmark" /></button>
      </div>

      <!--상단 근로 시간 표시 부분-->
      <div class="modal-total-time bg-slate-500 mt-3 pt-3 rounded-md" style="margin-top:10px">
      <div class="flex text-white bg 	">
        <div class="ml-3 mr-3"><p>2022년 6월 21일</p></div>
        <div class="bg-sky-300 w-16 h-6 rounded-md">재택근무</div>
        <div class="grow"></div>
        <!--시작 시간-->
        <div class="text-black ml-3 mr-3">
          <select name="" id="">
            <option value="0800">08:00</option>
            <option value="0830">08:30</option>
            <option value="0900">09:00</option>
            <option value="0930">09:30</option>
            <option value="1000">10:00</option>
          </select>
        </div>
        <div>~</div>
        <!--끝나는 시간-->
        <div class="text-black ml-3 mr-3">
          <select>
            <option value="1600">16:00</option>
            <option value="1630">16:30</option>
            <option value="1700">17:00</option>
            <option value="1730">17:30</option>
            <option value="1800">18:00</option>
            <option value="1830">18:30</option>
            <option value="1900">19:00</option>
            <option value="1930">19:30</option>
            <option value="2000">20:00</option>
          </select>
        </div>
        <div class="mr-4"><p>총 <span class="text-rose-400">8</span>시간</p></div>
      </div>
      <div class="flex mt-3 ml-3 text-white">
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
                <div class="grow"></div>
                <button class="rounded-md bg-teal-500 w-6 h-6 mr-5 hover:bg-teal-600 active:bg-teal-700 focus:outline-none"><font-awesome-icon icon="fa-solid fa-plus" /></button>
              </div>
              <!-- 데이터 반복 구간-->
              <div class="border-2 modal-content rounded"  style="margin-bottom:10px">
                <div class="flex">
                  <div class=" mt-3 ml-3 pr-3 select-option">
                    <select class="rounded">
                        <option>신한생명/콜센터통합_유상_2022</option>
                        <option>한전/전기사용계약정보 시나리오 기계음 송출_22</option>
                        <option>KB국민은행/콜센토통합_유상_2022</option>
                        <option>SK매직 헤드셋</option>
                    </select>
                    
                  </div>
                  <div class="mt-3 ml-3 select-option">
                    <select name="" id="" class="rounded">
                        <option value="">프로젝트 사전 준비 - 장비출고/VOC취합/현황조사</option>
                        <option value="">프로젝트 계획/분석 - 기술 검토/착수/요구사항 수집/정의/명세/리뷰</option>
                        <option value="">프로젝트 설계 - 설계서/시험계획서</option>
                        <option value="">프로젝트 구현/개발 - 코딩/코드리뷰/시험/코드분석</option>
                    </select>
                  </div>
                  <div class="grow"></div>
                  <div @click="$emit('closeModal')" class="mr-4 mt-3 bg-rose-500 w-6 rounded"><font-awesome-icon icon="fa-solid fa-xmark" /></div>
                </div>
                <div class="flex">
                  <div><div class="ml-3 mt-2">
                    <input style="width:300px;" class="mt-4 h-6 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="기타사항을 입력하세요" type="text" name="search"/> 
                  </div></div>
                  <div class="grow"></div>
                  <div style="height:25px; width: 101px;" class="mt-3 mr-3 bg-teal-500 w-16 rounded flex">
                    <p class="pl-1">시간 :</p> 
                    <input type="number" class="ml-3 form-control block w-12 px-3 py-1.5 text-base font-normal text-gray-700 bg-white text-black bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
                    </div>
                  <div style="height:25px;" class="mt-3 mr-3 bg-teal-500 w-28 rounded">9:00 ~ 18:00</div>
                </div>
              </div>
                <!-- 업무 반복 구현 끝-->
               
                
               
            </div>
            <div>

          </div>
        </div>
        <div class="flex text-white mt-10 pb-10">
          <div class="grow"></div>
          <button class="bg-yellow-500 mr-4 w-10 hover:bg-yellow-600 active:bg-yellow-700 focus:outline-none rounded">수정</button>
          <button class="bg-teal-500 mr-4 w-10 hover:bg-teal-600 active:bg-teal-700 focus:outline-none rounded">저장</button>
          <button class="bg-cyan-500 w-10 hover:bg-cyan-600 active:bg-cyan-700 focus:outline-none rounded">확정</button>
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
  name: 'PlanPerformanceDetailEdit',
  data(){
    return{
    }
  },
  methods:{
  },
  components: {
  }
}
</script>

<style>

.modal{
  width: 1000px;
  height: 450px;
  left: 300px;
  top: 100px;
  z-index: 1;
  overflow: scroll;
}
.modal-title{
  width: 100%;
  height: 50px;
}
.modal-total-time{
  width: 95%;
  height: 80px;
  margin: auto;
}
.modal-content{
  margin: auto;
  width: 96%;
  height: 100px;
}
.select-option{
    color: black;
    width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
}

</style>
