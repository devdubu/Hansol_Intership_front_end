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
        <p>계획 정보 : 06월 3주 ~ 07월 1주 (2022.6.20 ~ 2022.7.3)</p>
      </div>
      <div class="grow"></div>

      <div>평일 80.0시간</div>
    </div>
    <!-- 컨텐츠 부분 -->
    <div class="ml-5 mt-10 text-white" style="width: 1294px">
      <!-- 표 만들기 -->

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
export default {
  name: 'RegisterPlan',
  data(){
    return{
      proj : project,
      proj_start : [],
      proj_end : [],
    }
  },
  mounted() {
    this.writeDate(project);
  },
  methods:{
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
    }
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
