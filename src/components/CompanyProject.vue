<template>
      <!--검색 부분 -->
      <div class="grow bg-slate-700	rounded-lg ml-2 mt-5">
          <div class="rounded-lg h-16 bg-slate-600 ml-5 flex" style="max-width:1230px">
            <div class="h-8 place-self-center flex">
                <div class="flex">
                    <div class="mt-1.5">
                        <span class="ml-4 text-white">주 시작일</span>
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
                        <p class="ml-4 text-white" style="width:100px">성명/사번</p>
                    </div>
                    <div class="">
                        <input class="h-8 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..." type="text" name="search"/> 
                    </div>
                </div>
                

            </div>
            <div class="grow"></div>
            <div class="text-white flex mr-8 mt-4" style="max-width:1200px">
                <div class="flex h-8">
                    <div class="mr-2 w-10 bg-green-500 rounded-xl"><p class="mt-1">확정</p></div>
                    <div><p class="mt-1">확정</p></div>
                </div>
                <div class="flex ml-3 h-8">
                    <div class="mr-2 w-10 bg-sky-500 rounded-xl"><p class="mt-1">PM</p></div>
                    <div><p class="mt-1">PM승인</p></div>
                </div>
                <div class="flex ml-3 h-8">
                    <div class="mr-2 w-10 bg-fuchsia-500 rounded-xl"><p class="mt-1">팀장</p></div>
                    <div><p class="mt-1">팀장승인</p></div>
                </div>
                <div class="flex ml-3 h-8">
                    <div class="mr-2 w-12 bg-indigo-500 rounded-xl"><p class="mt-1">사업부</p></div>
                    <div><p class="mt-1">사업부승인</p></div>
                </div>
                <div class="flex ml-3 h-8">
                    <div class="mr-2 w-10 bg-rose-500 rounded-xl"><p class="mt-1">마감</p></div>
                    <div><p class="mt-1">마감</p></div>
                </div>
            </div>
              <button class="w-10 h-8 place-self-center mr-5 text-white rounded-lg bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none ">검색</button>
          </div>
          <!-- 컨텐츠 부분 -->
          <div class="ml-5 mt-10 text-white">
            <!-- 표 만들기 -->
            <!-- 상단 메뉴바 -->
            <div class="bg-slate-600 h-10 mr-16 rounded-tl-lg rounded-tr-lg border-b table-size">
              <div class="flex table-size">
                <div class="mr-3 pt-2 ml-5" style="width:150px"><p>프로젝트 코드</p></div>
                <div class="pt-2 border-l" style="width:480px"><p>프로젝트 명</p></div>
                <div class="pt-2 interval border-l"><p class="pr-2">PJ 시작일</p></div>
                <div class="pt-2 interval border-l"><p class="pr-2">PJ 종료일</p></div>
                <div class="pt-2 name-interval border-l"><p class="pr-2">PM</p></div>
                <div class="pt-2 name-interval border-l"><p class="pr-2">영업사원</p></div>
                <div class="pt-2 interval border-l"><p class="pr-2">SAP 등록일</p></div>
                <div class="pt-2 interval border"><p class="pr-2">추가</p></div>
              </div>
            </div>
           
            <!-- 실제 데이터 인풋 -->
            <div class="bg-slate-600 mr-16" >
              <div class="flex table-size">
                <div class="mr-3 pt-2 ml-5 " style="width:150px"><p>CRM-0054.119</p></div>
                <div class="pt-2 textover border-l" style="height:40px; width: 480px;">
                  <p>SKT/2022년_지능망 리빌딩에 따른 MMSC 연동 기능 변경 개발 </p>
                </div>
                <div class="pt-2 interval border-l"><p >2022-05-24</p></div>
                <div class="pt-2 interval border-l"><p >2022-08-23</p></div>
                <div class="pt-2 name-interval border-l"><p class="pr-2">손진호</p></div>
                <div class="pt-2 name-interval border-l"><p class="pr-2">손진호</p></div>
                <div class="pt-2 interval border-l"><p>2022-05-24</p></div>
                <div class="interval border-l">
                  <button class="w-10 h-4 mt-2 text-white rounded-lg bg-sky-500 hover:bg-sky-600 active:bg-sky-700 focus:outline-none ">참여</button>
                </div>
              </div>
            </div>
          </div>

          
      </div>

</template>
<script>
export default {
  name: 'CompanyProject',
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
