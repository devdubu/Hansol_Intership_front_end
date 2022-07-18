<template>
      <!--검색 부분 -->
     <div class="grow bg-gray-800	rounded-lg ml-2 mt-5">
          <div class="rounded-lg h-16 bg-gray-700 ml-5 flex" style="max-width:1230px">
            <div class="h-8 place-self-center flex">
                <div class="flex">
                    <div class="mt-1.5">
                        <span class="ml-4 text-white">구문</span>
                    </div>
                    <div class="mt-1.5 ml-4">
                        <select>
                            <option>전체</option>
                            <option>기타1</option>
                            <option>기타2</option>
                            <option>기타3</option>
                        </select>
                    </div>                    
              
                    <div class="flex">
                        <div class="ml-4" style="height: 30px;">
                            <input style="height: 25px;" class="mt-1.5 placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..." type="text" name="search"/>
                        </div>
                        <div class="mt-1.5">
                            <p class="ml-4 text-white">사용</p>
                        </div>
                        <div class="mt-1.5 ml-4">
                            <select>
                                <option>전체</option>
                                <option>기타1</option>
                                <option>기타2</option>
                                <option>기타3</option>
                            </select>
                        </div>
                    </div>
                </div>
                

            </div>
            <div class="grow"></div>
              <button class="w-10 h-8 place-self-center mr-5 text-white rounded-lg bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-500 focus:outline-none ">검색</button>
          </div>
          <!--상단 버튼 부분 -->
          <div class="flex up-btn">
                <div class="grow"></div>
                <div class="flex">
                    <button class="mr-4 bg-orange-500 rounded-lg hover:bg-orange-600 active:bg-orange-700 focus:outline-none " style="width: 80px"><p class="mt-0.5 ml-0.5 text-white">삭제</p></button>
                    <button class="mr-4 bg-teal-500 rounded-lg hover:bg-teal-600 active:bg-teal-700 focus:outline-none" style="width: 100px"><p class="mt-0.5 ml-0.5 text-white">코드추가</p></button>
                </div>
            </div>
          <!-- 컨텐츠 부분 -->
          <div class="ml-5 mt-5 text-white">
            <!-- 표 만들기 -->
            <!-- 상단 메뉴바 -->
            <div class="bg-gray-700 h-10 rounded-tl-lg rounded-tr-lg  table-size">
              <div class="flex table-size">
                <div class="mr-3 pt-2 ml-5 middle-table"><p>그룹</p></div>
                <div class="pt-2 border-l long-table"><p>그룹 명</p></div>
                <div class="pt-2  border-l middle-table"><p class="pl-1">코드</p></div>
                <div class="pt-2  border-l middle-table"><p class="pl-1">코드명</p></div>
                <div class="pt-2  border-l middle-table"><p class="pl-1">순서</p></div>
                <div class="pt-2  border-l short-table"><p class="pl-1">사용여부</p></div>
                <div class="pt-2  border-l short-table"><p class="pl-1">입력자</p></div>
                <div class="pt-2  border-l middle-table"><p class="pl-1">입력일</p></div>
                <div class="pt-2  border-l short-table"><p class="pl-1">삭제</p></div>
              </div>
            </div>
           
            <!-- 실제 데이터 인풋 -->
             <div class="bg-gray-600 h-10 border-t table-size" v-for="(standardcode,index) in standardcode">
              <div class="flex table-size">
                <div class="mr-3 pt-2 ml-5 middle-table"><p>{{ standardcode.group }}</p></div>
                <div class="pt-2 border-l long-table"><p>{{ standardcode.group_name }}</p></div>
                <div class="pt-2  border-l middle-table"><p class="pl-1">{{ standardcode.code_num }}</p></div>
                <div class="pt-2  border-l middle-table"><p class="l-1">{{ standardcode.code_name }}</p></div>
                <div class="pt-2  border-l middle-table"><p class="pl-1">{{ standardcode.sequence }}</p></div>
                <div class="pt-2  border-l short-table"><p class="pl-1">{{ standardcode.able_use }}</p></div>
                <div class="pt-2  border-l short-table"><p class="pl-1">{{ standardcode.writer }}</p></div>
                <div class="pt-2  border-l middle-table"><p class="pl-1">{{ inputDate[index] }}</p></div>
                <div class="pt-2  border-l short-table">
                    <button class="bg-rose-500 rounded-lg hover:bg-rose-600 active:bg-rose-700 focus:outline-none " style="width: 40px"><p class="mt-0.5 ml-0.5 text-white">삭제</p></button>
                </div>
              </div>
            </div>
          </div>

          
      </div>

</template>
<script>
import standardcode from '../assets/standardCode.json'
export default {
  name: 'StandardCode',
  data(){
    return{
      standardcode : standardcode,
      inputDate : [],
    }
  },
  mounted() {
    this.calInputDate(this.standardcode)
  },
  methods:{
    calInputDate(inputdate){
      var year, month, day
      for(var i = 0;i<inputdate.length;i++){
        year = inputdate[i].write_date.substr(0,4);
        month = inputdate[i].write_date.substr(4,2);
        day = inputdate[i].write_date.substr(6,2);
        this.inputDate[i] = year+'-'+month+'-'+day;
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

.up-btn{
    width: 1260px;
    margin-top: 20px;
}

.long-table{
    width: 400px;
}
.middle-table{
    width: 120px;
}
.short-table{
    width: 80px;
}
.table-size{
  height: 40px;
  width: 1230px;
}
.textover{
  overflow: hidden;
  text-overflow: ellipsis;
}


</style>
