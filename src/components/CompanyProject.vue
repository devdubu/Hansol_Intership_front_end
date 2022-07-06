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
          <div class="ml-5 mt-10 text-white" style="width: 1294px">
            <!-- 표 만들기 -->
            <!-- 상단 메뉴바 -->
            <div class="bg-slate-600 h-10 mr-16 rounded-tl-lg rounded-tr-lg table-size">
              <div class="flex table-size">
                <div class="mr-3 pt-2 ml-5" style="width:150px"><p>프로젝트 코드</p></div>
                <div class="pt-2 border-l" style="width:480px"><p>프로젝트 명</p></div>
                <div class="pt-2 interval border-l"><p class="pr-2">PJ 시작일</p></div>
                <div class="pt-2 interval border-l"><p class="pr-2">PJ 종료일</p></div>
                <div class="pt-2 name-interval border-l"><p class="pr-2">PM</p></div>
                <div class="pt-2 name-interval border-l"><p class="pr-2">영업사원</p></div>
                <div class="pt-2 interval border-l"><p class="pr-2">SAP 등록일</p></div>
                <div class="pt-2 interval border-l"><p class="pr-2">추가</p></div>
              </div>
            </div>
           
            <!-- 실제 데이터 인풋 -->
            <div class="bg-slate-600 mr-16 border-t" v-for="(project,index) in proj" >
              <div class="flex table-size">
                <div class="mr-3 pt-2 ml-5 " style="width:150px"><p>{{ project.project_id }}</p></div>
                <div class="pt-2 textover border-l" style="height:40px; width: 480px;">
                  <p>{{ project.project_name }} </p>
                </div>
                <div class="pt-2 interval border-l"><p>{{proj_start[index]}}</p></div>
                <div class="pt-2 interval border-l"><p >{{ proj_end[index] }}</p></div>
                <div class="pt-2 name-interval border-l"><p class="pr-2">{{ project.PM }}</p></div>
                <!--영업 사원 이름 ajax 통신에는 교체 요망-->
                <div class="pt-2 name-interval border-l"><p class="pr-2">{{ project.PM }}</p></div>
                <!--SAP에 등록 날짜 임으로 ajax 요청 후에 교체 요망-->
                <div class="pt-2 interval border-l"><p>{{ proj_end[index] }}</p></div>
                <!---->
                <div class="interval border-l">
                  <button class="w-10 h-4 mt-2 text-white rounded-lg bg-sky-500 hover:bg-sky-600 active:bg-sky-700 focus:outline-none ">참여</button>
                </div>
              </div>
            </div>
          </div>

          
      </div>

</template>
<script>
import project from '../assets/projData.json';
import axios from "axios";
export default {
  name: 'CompanyProject',
  data(){
    return{
      //axios로 인해서 받은 데이터
      getProj : [],
      responseCode: 0,
      backMessage: '',

      proj : project,
      proj_start : [],
      proj_end : [],
    }
  },
  mounted() {
    this.writeDate(project);
  },
  methods:{
    //axios get 요청
    async GetProject(){
      await axios.get('/api/projects')
          .then((res)=>{
            this.getProj = res.data.result;
            this.responseCode = res.data.code;
            this.backMessage = res.data.message;

            if(this.responseCode != 1000){
              alert(this.backMessage);
            }
          })
          .catch((res)=>{
            console.error(res);
          })
    },
    writeDate(proj){
     var year = '', month = '', day = '';
     for(var i = 0; i<proj.length;i++){
       year = proj[i].project_start.substr(0,4);
       month = proj[i].project_start.substr(4,2);
       day = proj[i].project_start.substr(6,2);
       this.proj_start[i] = year +'-'+month+'-'+ day;
       console.log(this.proj_start[i])

       year = proj[i].project_ended.substr(0,4);
       month = proj[i].project_ended.substr(4,2);
       day = proj[i].project_ended.substr(6,2);
       this.proj_end[i] = year+'-'+month+'-'+day;
     }
   },

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
