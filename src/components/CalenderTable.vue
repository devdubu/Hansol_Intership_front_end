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
    <PlanPerformanceDetailVue v-if="viewModal" @closeModal="showViewModal()" @showEditModal="showViewModalEdit(), showViewModal()"/>
    <PlanPerformanceDetailEditVue v-if="editModal" @closeEditModal="showViewModalEdit()"/>
  </div>
    <div>    
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
            <div class="text-white mr-8 mt-2" style="max-width:1200px">
                <div>
                  <p class="text-left	">1주차 계획: 40.0Hr - 개인실적: 45.5Hr - 실적 : 97.5Hr</p>
                </div>
                <div>
                  <p class="text-left	">2주차 계획: 40.0Hr - 개인실적 52.0Hr - 실적 : 97.5Hr</p>
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
                <div class="mr-4 bg-orange-500 w-40 rounded-lg hover:bg-orange-600 active:bg-orange-700 focus:outline-none"><p class="mt-0.5 ml-0.5">미승인PM SMS전송</p></div>
                <div class="mr-4 bg-red-500	w-16 rounded-lg	hover:bg-red-600 active:bg-red-700 focus:outline-none"><p class="mt-0.5 ml-0.5">승인취소</p></div>
                <div class="mr-4 bg-yellow-500 w-10 rounded-lg	hover:bg-yellow-600 active:bg-yellow-700 focus:outline-none"><p class="mt-0.5 ml-0.5">반려</p></div>
                <div class="mr-4 bg-emerald-500	w-10 rounded-lg	hover:bg-emerald-600 active:bg-emerald-700 focus:outline-none"><p class="mt-0.5 ml-0.5">승인</p></div>
            </div>
          </div>


          
          <!-- 컨텐츠 부분 -->
          <div class="ml-5 mt-10 ">
            <!--상단 요일 표시-->
            <div class="flex flex-row " style="width:1200px;">
                <div class="calendar-interval-top">
                    <p class="bg-slate-500 text-white rounded-tl-lg">Sun</p>
                    <div class="relative calendar-interval bg-gray-100 box-border border-2" style="width:175px;">
                      <div class="flex">
                        <div class="flex-inital bg-rose-500 w-10 h-10 rounded">
                          <p class="mt-2">1</p>
                        </div>
                        <div class="grow mt-2">
                          <p>9:00 ~ 18:00</p> 
                        </div>
                      </div>
                        
                      <div class="mt-5 relative calendar-interval">
                        <div class="absolute ml-2">
                            
                          <p class="text-left">W3 주업무</p>
                          <p class="text-left">P3 프로젝트 운영</p>
                          <p class="text-left">W1 주업무</p>
                              
                          </div>
                        </div>
                      <div class="absolute bottom-3 right-0 mr-2 ">
                        <button @click="showViewModal()" class="w-10 h-6 text-center text-white rounded-lg bg-gray-500 hover:bg-gray-600 active:bg-gray-700 focus:outline-none ">보기</button>
                      </div>
                    </div>
                    <div class="relative calendar-interval bg-gray-100 box-border border-2" style="width:175px">
                      <div class="flex">
                        <div class="flex-inital bg-rose-500 w-10 h-10 rounded">
                          <p class="mt-2">1</p>
                        </div>
                        <div class="grow mt-2">
                          <p>9:00 ~ 18:00</p> 
                        </div>
                      </div>
                        
                      <div class="mt-5 relative calendar-interval">
                        <div class="absolute ml-2">
                            
                          <p class="text-left">W3 주업무</p>
                          <p class="text-left">P3 프로젝트 안영</p>
                          <p class="text-left">W1 주업무</p>
                              
                          </div>
                        </div>
                      <div class="absolute bottom-3 right-0 mr-2 ">
                        <button @click="showViewModalEdit()" class="w-10 h-6 text-center text-white rounded-lg bg-gray-500 hover:bg-gray-600 active:bg-gray-700 focus:outline-none ">보기</button>
                      </div>
                    </div>
                </div>
                <div class="calendar-interval-top">
                    <p class="bg-slate-500 text-white	">Mon</p>
                    <div class="relative calendar-interval bg-gray-100 box-border border-2" style="width:175px">
                      <div class="flex">
                        <div class="flex-inital bg-gray-400 w-10 h-10 rounded">
                          <p class="mt-2">1</p>
                        </div>
                        <div class="grow mt-2">
                          <p>9:00 ~ 18:00</p> 
                        </div>
                      </div>
                        
                      <div class="mt-5 relative calendar-interval">
                        <div class="absolute ml-2">
                            
                          <p class="text-left">W3 주업무</p>
                          <p class="text-left">P3 프로젝트 안영</p>
                          <p class="text-left">W1 주업무</p>
                              
                          </div>
                        </div>
                      <div class="absolute bottom-3 right-0 mr-2 ">
                        <button class="w-10 h-6 text-center text-white rounded-lg bg-gray-500 hover:bg-gray-600 active:bg-gray-700 focus:outline-none ">보기</button>
                      </div>
                    </div>
                    <div class="calendar-interval bg-gray-100 box-border border-2" style="width:175px"></div>
                </div>
                <div class="calendar-interval-top ">
                    <p class="bg-slate-500 text-white	">Tue</p>
                    <div class="calendar-interval bg-gray-100 box-border border-2" style="width:175px"></div>
                    <div class="calendar-interval bg-gray-100 box-border border-2" style="width:175px"></div>
                </div>
                <div class="calendar-interval-top">
                    <p class="bg-slate-500 text-white	">Web</p>
                    <div class="calendar-interval bg-gray-100 box-border border-2" style="width:175px"></div>
                    <div class="calendar-interval bg-gray-100 box-border border-2" style="width:175px"></div>
                </div>
                <div class="calendar-interval-top ">
                    <p class="bg-slate-500 text-white	">Thu</p>
                    <div class="calendar-interval bg-gray-100 box-border border-2" style="width:175px"></div>
                    <div class="calendar-interval bg-gray-100 box-border border-2" style="width:175px"></div>
                </div>
                <div class="calendar-interval-top ">
                    <p class="bg-slate-500 text-white	">Fri</p>
                    <div class="calendar-interval bg-gray-100 box-border border-2" style="width:175px"></div>
                    <div class="calendar-interval bg-gray-100 box-border border-2" style="width:175px"></div>
                </div>
                <div class="calendar-interval-top ">
                    <p class="bg-slate-500 text-white	rounded-tr-lg">Sat</p>
                    <div class="calendar-interval bg-gray-100 box-border border-2" style="width:175px"></div>
                    <div class="bg-gray-100 box-border calendar-interval border-2 rounded-br-lg" style="width:175px;"></div>
                </div>
            </div>
        </div>
      </div>
    </div>
    

</template>


<script>
import PlanPerformanceDetailVue from './PlanPerformanceDetail.vue'
import PlanPerformanceDetailEditVue from './PlanPerformanceDetailEdit.vue';

export default {
    name: 'CalendarTable',
    data(){
        return{
          viewModal: false,
          editModal: false,
        }
    },
    methods:{
      showViewModal(){
        this.viewModal = !this.viewModal;
      },
      showViewModalEdit(){
        this.editModal = !this.editModal;
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