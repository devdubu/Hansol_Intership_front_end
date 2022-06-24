<template>
  <div class="bg-slate-700 relative">

    <div class="flex" style="width:100vw;">
      <div class="bg-green-300 w-44 h-8">
        <img class="mt-2 ml-3 w-40" src="../public/hansol-timereport-logo.png">
      </div>
      <div class="grow bg-emerald-400 flex divide-x divide-dash ">
        <div class="flex-none w-10 mt-1">
          <button>버튼</button>
        </div>
        <div class="grow"></div>
        <div class="flex-none w-40 mt-1">
          <label>로그인</label>
        </div>
        <div class="flex-none w-40 mt-1">
          <button>dark mode</button>
        </div>
        <div class="flex-none w-40 mt-1">
          <label>Logout</label>
        </div>
      </div>
    </div>
    <!--내용 부분-->
    <div class="flex" style="height: 800px">
      <div class="flex-none w-44 bg-green-400 text-left ">
        <div class="mt-4">
          <div class="text-lg bg-green-300 w-44 pl-3" @click="smallMenuToggle('manour')">맨아워관리</div>
          <!--맨아워관리 폴더-->
          
            <ul v-if="LM_manoutToggle" class="text-left ml-8">
              <div>
                <label @click="smallMenuToggle('plan')" class="text-base">계획</label>
                  <ul v-if="LM_planToggle" class="ml-5 text-sm">
                    <router-link to="/plan"><li>계획관리</li></router-link>
                    <router-link to="/plan"><li>계획 현황</li></router-link>
                  </ul>
              </div>

              <div>
                <label @click="smallMenuToggle('performance')" class="text-base">실적</label>
                <ul v-if="LM_performanceToggle" class="ml-5 text-sm">
                  <router-link to="/performance"><li>실적관리</li></router-link>
                  <router-link to="/performance"><li>실적현황</li></router-link>
                </ul>
              </div>

            </ul>
          </div>
        <!--맨아워관리 폴더-->

        <!--프로젝트 관리 폴더-->
          <div>
            <div @click="smallMenuToggle('project')" class="text-lg bg-green-300 w-44 pl-3">프로젝트 관리</div>
            <ul v-if="LM_projectToggle" class="ml-8 text-sm">
              <a href="/project"><li>내 프로젝트</li></a>
            </ul>
          </div>
        <!--프로젝트 관리 폴더-->
        <!--승인 관리 폴더-->
          <div>
            <div @click="smallMenuToggle('approve')" class="text-lg bg-green-300 w-44 pl-3">승인관리</div>
              <ul v-if="LM_approveToggle" class="ml-10 text-sm">
                <router-link to="/confirm"><li>실적 팀장 승인</li></router-link>
                <router-link to="/nonenter"><li>미입력자 관리</li></router-link>
                <router-link to="/deadline"><li>마감 관리</li></router-link>
              </ul>
          </div>
          
          <!--승인 관리 폴더-->
          <!--관리자 폴더-->
          <div>
            <div @click="smallMenuToggle('manager')" class="text-lg bg-green-300 w-44 pl-3">관리자</div>
            <ul v-if="LM_managerToggle" class="ml-10 text-sm">
              <router-link to="/standard"><li>공통 코드 관리</li></router-link>
            </ul>
          </div>
          
          <!--관리자 폴더-->
      </div>
      <!--검색 부분 -->
      <div class="grow bg-slate-700	rounded-lg ml-2 mt-5" style="width:100vw;">
          <router-view></router-view>
      </div>
    </div>
  </div>


</template>
<script>
import { library } from '@fortawesome/fontawesome-svg-core'

/* add some free styles */
import {faXmark} from '@fortawesome/free-solid-svg-icons'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import PlanPerformanceDetail from './components/PlanPerformanceDetail.vue'

/* add each imported icon to the library */
library.add( faXmark, faPlus)

export default {
  name: 'App',
  data(){
    return{
      LM_manoutToggle : true,
      LM_planToggle : true,
      LM_performanceToggle : true,
      LM_projectToggle: true,
      LM_approveToggle:true,
      LM_managerToggle:true,
      
    }
  },
  methods:{
    smallMenuToggle(menuName){
      switch(menuName){
        case 'manour':
          if(this.LM_manoutToggle===true){
            this.LM_manoutToggle=false;
          }else{
            this.LM_manoutToggle=true;
          }
          console.log('manour 성공')
          break;
        case 'plan':
          if(this.LM_planToggle===true){
            this.LM_planToggle=false;
          }else{
            this.LM_planToggle=true;
          }
          console.log('plan 성공')
          break;

        case 'performance':
          if(this.LM_performanceToggle === true){
            this.LM_performanceToggle = false;
          }else{
            this.LM_performanceToggle = true;
          }
          console.log('performance 성공')
          break;
          
        case 'project':
          if(this.LM_projectToggle === true){
            this.LM_projectToggle = false;
          }else{
            this.LM_projectToggle = true;
          }
          console.log('project 성공')
          break;

        case 'approve':
          if(this.LM_approveToggle === true){
            this.LM_approveToggle = false;
          }else{
            this.LM_approveToggle = true;
          }
          console.log('approve 성공')
          break;

        case 'manager':
          if(this.LM_managerToggle === true){
            this.LM_managerToggle = false;
          }else{
            this.LM_managerToggle = true;
          }
          console.log('manager 성공')
          break;

        default:
          console.log('규격 외의 것이 들어옴');

      }
    }
  },
  components: { PlanPerformanceDetail:PlanPerformanceDetail,
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


</style>
