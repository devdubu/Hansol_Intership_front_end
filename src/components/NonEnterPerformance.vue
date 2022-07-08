<!--
  변수 변경 완료
  AJAX요청 미완
  
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
                        <select v-model="selectYear">
                            <option v-for="year in searchYear" :value="year">{{ year }}</option>
                        </select>
                    </div>
                  <div>
                    <select v-model="selectMonth">
                      <option v-for="month in searchMonth" :value="month.value">{{ month.text }}</option>
                    </select>
                  </div>
                </div>
                <div class="flex">
                    <div class="flex">
                        <div class="mt-1.5">
                            <p class="ml-4 text-white">조직</p>
                        </div>
                        <div class="mt-1.5 ml-4">
                            <select>
                                <option>한솔PNS</option>
                                <option>한솔 인티큐브</option>
                            </select>
                        </div>    
                        <div class="mt-1.5 ml-4">
                            <select>
                                <option>재무팀</option>
                                <option>DT 개발팀</option>
                                <option>인사팀</option>
                            </select>
                        </div>
                        <div class="mt-1.5 ml-4">
                            <p class="text-white">성명/사번</p>
                        </div>
                        <div class="ml-4">
                            <input class="h-8 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..." type="text" name="search"/> 
                        </div>
                    </div>
                </div>
                

            </div>
            <div class="grow"></div>
              <button class="w-10 h-8 place-self-center mr-5 text-white rounded-lg bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none ">검색</button>
          </div>
          <!--상단 버튼 부분 -->
          <div class="flex up-btn">
                <div class="grow"></div>
                <div class="flex text-white">
                    <button class="mr-4 bg-teal-500 rounded-lg hover:bg-teal-600 active:bg-teal-700 focus:outline-none " style="width: 100px"><p class="mt-0.5 ml-0.5">엑셀 다운</p></button>
                    <button class="mr-4 bg-orange-500 rounded-lg hover:bg-orange-600 active:bg-orange-700 focus:outline-none " style="width: 100px"><p class="mt-0.5 ml-0.5">PUSH 전송</p></button>
                    <button class="mr-4 bg-blue-500 rounded-lg hover:bg-blue-600 active:bg-blue-700 focus:outline-none" style="width: 100px"><p class="mt-0.5 ml-0.5">SMS 전송</p></button>
                </div>
            </div>
          <!-- 컨텐츠 부분 -->
          <div class="ml-5 mt-5 text-white">
            <!-- 표 만들기 -->
            <!-- 상단 메뉴바 -->
            <div class="bg-slate-600 h-10 mr-16 rounded-tl-lg rounded-tr-lg  table-size">
              <div class="flex table-size">
                <div class="mr-3 pt-2 ml-5 middle-table"><p>부서 코드</p></div>
                <div class="pt-2 border-l middle-table"><p>부서 명</p></div>
                <div class="pt-2 interval border-l middle-table"><p class="">사원명</p></div>
                <div class="pt-2 interval border-l middle-table"><p class="">핸드폰 번호</p></div>
                <div class="pt-2 name-interval border-l short-table"><p class="">모바일타입</p></div>
                <div class="pt-2 name-interval border-l long-table"><p class="pr-2">미입력일</p></div>
              </div>
            </div>
           
            <!-- 실제 데이터 인풋 -->
            <div class="bg-slate-600 mr-16 border-t" style="width: 1230px;" v-for="(noenter,index) in noEnter">
              <div class="flex table-size">
                <div class="mr-3 pt-2 ml-5 middle-table"><p>{{ noenter.deptCode }}</p></div>
                <div class="pt-2 border-l middle-table">
                  <p>{{ noenter.deptNm }}</p>
                </div>
                <div class="pt-2 interval border-l middle-table"><p >{{ noenter.empolyee_name }}</p></div>
                <div class="pt-2 interval border-l middle-table"><p >{{ noenter.phoneNumber }}</p></div>
                <div class="pt-2 name-interval border-l short-table"><p class="pr-2">{{ noenter.mobileType }}</p></div>
                <div class="pt-2 name-interval border-l long-table"><p class="ml-4">{{ noenter.noEnterDays }}</p></div>
                
              </div>
            </div>
          </div>

          
      </div>

</template>
<script>
import noenter from '../assets/nonEnterData.json';
import axios from "axios";
import weekly from '../assets/biweekly.json'

export default {
  name: 'NonEnterPerformance',
  data(){
    return{
      //상단 날짜 검색에 관한 데이터
      searchWeekly: weekly.twoWeeksDtos,
      searchYear: [],
      searchMonth: [
        {text: '1월', value: '01'},
        {text: '2월', value: '02'},
        {text: '3월', value: '03'},
        {text: '4월', value: '05'},
        {text: '6월', value: '06'},
        {text: '7월', value: '07'},
        {text: '8월', value: '09'},
        {text: '10월', value: '10'},
        {text: '11월', value: '11'},
        {text: '12월', value: '12'}],
      selectMonth: '',
      selectYear: weekly.startOfWeek.slice(0,4),

      //axios로 인해서 받은 데이터
      getNoEnter : [],
      responseCode: 0,
      backMessage: '',

      noEnter : noenter,
    }
  },
  async mounted(){
    await this.GetWeekData();
    this.calSelectYear();
    await this.getNoEnter();
  },
  methods:{
    //------------------------------------ AXIOS -------------------------------------------
    async getNoEnter(){

     const date = new Date();

     const year = date.getFullYear();
     const month = date.getMonth() + 1;

     await axios.get('/api/performances/noenters',{
       params:{
         year: year,
         month : month,
       },withCredentials:true
     })
         .then((res)=>{
           this.getNoEnter = res.data.result;
           this.responseCode = res.data.code;
           this.backMessage = res.data.message;

           if(this.responseCode != 1000){
             alert(this.backMessage);
             this.$router.push('/');
           }

         })
   },
    async GetWeekData(){
      await axios.get('/api/biweekly',{withCredentials: true})
          .then((res)=>{
            if(res.data.code === 1000){
              this.searchWeekly = res.data.result.twoWeeksDtos;
              console.log(this.searchWeekly)
            }else{
              alert(res.data.message);
            }
          })
          .catch((res)=>{
            console.error(res);
          })
    },
    async SearchDate(){
      await axios.get('/api/performances/noenters',{
        params:{
          year: this.searchYear,
          month : this.selectMonth,
        },withCredentials:true
      })
          .then((res)=>{
            if(res.data.code != 1000){
              this.plan = res.data.result;
            }else{
              alert(res.data.message)
            }
          })
          .catch((res)=>{
            console.error(res)
          })
    },
    //------------------------------------ AXIOS -------------------------------------------
    calSelectYear(){
      var index = 0;
      for(var i = 0;i<this.searchWeekly.length;i++){
        if(index === 0 ){
          this.searchYear[index] = this.searchWeekly[i].year
          index++;
        }

        var selectyear = 0, datayear = 0;

        selectyear = Number(this.searchYear[index-1])
        datayear=Number(this.searchWeekly[i].year)

        if(selectyear < datayear){
          this.searchYear.push(this.searchWeekly[i].year)
          index++;
        }
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

.up-btn{
    width: 1260px;
    margin-top: 20px;
}

.long-table{
    width: 480px;
}
.middle-table{
    width: 150px;
}
.short-table{
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
