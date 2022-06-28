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
          <div class="flex text-white" style="max-width:1265px">
            <div class="ml-7 mt-7 text-xl">
                <p>DT개발팅 Web R&D 파트</p>
            </div>
            <div class="grow"></div>
            <div class="flex mt-7">
                <button class="mr-4 bg-orange-500 w-40 rounded-lg hover:bg-orange-600 active:bg-orange-700 focus:outline-none"><p class="mt-0.5 ml-0.5">미승인PM SMS전송</p></button>
                <button class="mr-4 bg-red-500	w-16 rounded-lg	hover:bg-red-600 active:bg-red-700 focus:outline-none"><p class="mt-0.5 ml-0.5">승인취소</p></button>
                <button class="mr-4 bg-yellow-500 w-10 rounded-lg	hover:bg-yellow-600 active:bg-yellow-700 focus:outline-none"><p class="mt-0.5 ml-0.5">반려</p></button>
                <button class="mr-4 bg-emerald-500	w-10 rounded-lg	hover:bg-emerald-600 active:bg-emerald-700 focus:outline-none"><p class="mt-0.5 ml-0.5">승인</p></button>
            </div>
          </div>
          <!-- 상단 검색 부분 끝 -->
          
          <!-- 컨텐츠 부분 -->
          <div class="ml-5 mt-5 text-white">
            <!-- 표 만들기 -->
            <!-- 상단 메뉴바 -->
            <div class="bg-slate-600 h-16 rounded-tl-lg rounded-tr-lg" style="max-width:1230px">
              <div class="flex">
                <div class="pt-2 border-r" style="width:180px;"><p class="mt-3">구분</p></div>
                <div class="pt-2 main-interval border-r" ><p>Mon <span><input type="checkbox"></span></p><p>{{viewDate[0]}}</p></div>
                <div class="pt-2 main-interval border-r" ><p>Tue <span><input type="checkbox"></span></p><p>{{ viewDate[1] }}</p></div>
                <div class="pt-2 main-interval border-r" ><p>Web <span><input type="checkbox"></span></p><p>{{ viewDate[2] }}</p></div>
                <div class="pt-2 main-interval border-r"><p>Thu <span><input type="checkbox"></span></p><p>{{ viewDate[3] }}</p></div>
                <div class="pt-2 main-interval border-r" ><p>Fri <span><input type="checkbox"></span></p><p>{{ viewDate[4] }}</p></div>
                <div class="pt-2 main-interval border-r"><p>Sat <span><input type="checkbox"></span></p><p>{{ viewDate[5] }}</p></div>
                <div class="pt-2 main-interval border-r"><p>Sun <span><input type="checkbox"></span></p><p>{{ viewDate[6] }}</p></div>
                <div class="pt-2 all" style="width: 70px;"><p class="mt-3">All <span><input type="checkbox"></span></p></div>
              </div>
            </div>

            
           
            <!-- 서브 메뉴 -->
            <div class="bg-slate-600 h-10 border-t" style="max-width:1230px" >
                <div class="flex">
                    <div class="border-r flex" style="width:180px;">
                        <div class=" pt-2" style="width:50%"><p>팀원</p></div>
                        <div class=" pt-2 border-l" style="width:50%"><p>승인제외</p></div>
                    </div>
                    <div class="flex sub-interval border-r" >
                        <div class=" hour-interval"><p class="pt-1">시간</p></div>
                        <div class=" hour-interval border-l"><p class="pt-1">상태</p></div>
                    </div>
                     <div class="flex sub-interval border-r" >
                        <div class=" hour-interval"><p class="pt-1">시간</p></div>
                        <div class=" hour-interval border-l"><p class="pt-1">상태</p></div>
                    </div>
                     <div class="flex sub-interval border-r" >
                        <div class=" hour-interval"><p class="pt-1">시간</p></div>
                        <div class=" hour-interval border-l"><p class="pt-1">상태</p></div>
                    </div>
                     <div class="flex sub-interval border-r" >
                        <div class=" hour-interval "><p class="pt-1">시간</p></div>
                        <div class=" hour-interval border-l"><p class="pt-1">상태</p></div>
                    </div>
                     <div class="flex sub-interval border-r" >
                        <div class=" hour-interval"><p class="pt-1">시간</p></div>
                        <div class=" hour-interval border-l"><p class="pt-1">상태</p></div>
                    </div>
                     <div class="flex sub-interval border-r" >
                        <div class=" hour-interval"><p class="pt-1">시간</p></div>
                        <div class=" hour-interval border-l"><p class="pt-1">상태</p></div>
                    </div>
                    <div class="flex sub-interval" >
                        <div class=" hour-interval"><p class="pt-1">시간</p></div>
                        <div class=" hour-interval border-l"><p class="pt-1">상태</p></div>
                    </div>
                    <div class="flex">
                      <div class="border-l " style="width: 71px;"><p class="pt-2 pl-1">전체시간</p></div>
                    </div>
                </div>
            <!-- 실제 데이터 인풋 -->
              <div class="bg-slate-600 h-10 border-t" style="max-width:1230px" v-for="(member,index) in viewApprovalTable">
                <div class="flex">
                    <div class="border-r flex" style="width:180px;">
                        <div class=" pt-2" style="width:50%"><p>{{ member[0].memberName }}</p></div>
                        <div class=" pt-2 border-l" style="width:50%"><input type="checkbox"> </div>
                    </div>
                    <div class="flex sub-interval border-r" >
                        <div class=" hour-interval"><p class="pt-1">{{ member[0].totalTime }}</p></div>
                        <div class=" hour-interval border-l">
                            <div :class="{blind:statusFunc(member[0].signStatus)}, confirmCheck(member[0].signStatus)" class="w-10 rounded-xl state-interval">
                              <p class="mt-1">{{ confirmText[member[0].signStatus] }}</p>
                            </div>
                        </div>
                    </div>
                     <div class="flex sub-interval border-r" >
                        <div class=" hour-interval"><p class="pt-1">{{ member[1].totalTime }}</p></div>
                        <div class=" hour-interval border-l">
                            <div :class="{blind:statusFunc(member[1].signStatus)}, confirmCheck(member[1].signStatus)" class="w-10 rounded-xl state-interval">
                              <p class="mt-1">{{ confirmText[member[1].signStatus] }}</p>
                            </div>
                        </div>
                    </div>
                     <div class="flex sub-interval border-r" >
                        <div class=" hour-interval"><p class="pt-1">{{ member[2].totalTime }}</p></div>
                        <div class=" hour-interval border-l">
                            <div :class="{blind:statusFunc(member[2].signStatus)}, confirmCheck(member[2].signStatus)" class="w-10 rounded-xl state-interval">
                              <p class="mt-1">{{ confirmText[member[2].signStatus] }}</p>
                            </div>
                        </div>
                    </div>
                     <div class="flex sub-interval border-r" >
                        <div class=" hour-interval "><p class="pt-1">{{ member[3].totalTime }}</p></div>
                        <div class=" hour-interval border-l">
                            <div :class="{blind:statusFunc(member[3].signStatus)}, confirmCheck(member[3].signStatus)" class="w-10  rounded-xl state-interval">
                              <p class="mt-1">{{ confirmText[member[3].signStatus] }}</p>
                            </div>
                        </div>
                    </div>
                     <div class="flex sub-interval border-r" >
                        <div class=" hour-interval"><p class="pt-1">{{ member[4].totalTime }}</p></div>
                        <div class=" hour-interval border-l">
                            <div :class="{blind:statusFunc(member[4].signStatus)}, confirmCheck(member[4].signStatus)" class="w-10  rounded-xl state-interval">
                              <p class="mt-1">{{ confirmText[member[4].signStatus] }}</p>
                            </div>
                        </div>
                    </div>
                     <div class="flex sub-interval border-r" >
                        <div class=" hour-interval"><p class="pt-1">{{ member[5].totalTime }}</p></div>
                        <div class=" hour-interval border-l">
                            <div :class="{blind:statusFunc(member[5].signStatus)}, confirmCheck(member[5].signStatus)" class="w-10  rounded-xl state-interval">
                              <p class="mt-1">{{ confirmText[member[5].signStatus] }}</p>
                            </div>
                        </div>
                    </div>
                     <div class="flex sub-interval" >
                        <div class=" hour-interval"><p class="pt-1">{{ member[6].totalTime }}</p></div>
                        <div class=" hour-interval border-l">
                            <div :class="{blind:statusFunc(member[6].signStatus)}, confirmCheck(member[6].signStatus)" class="w-10  rounded-xl state-interval">
                              <p class="mt-1">{{ confirmText[member[6].signStatus] }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex" >
                      <div class="border-l" style="width: 71px;"><p class="pt-2 pl-1">{{ member[0].dayHour }}</p></div>
                    </div>
                </div>
              </div>
            

            </div>
          </div>

          
      </div>

</template>
<script>
import approval from '../assets/approvalData.json';
export default {
  name: 'CompanyProject',
  data(){
    return{
      approval: approval,
      Date: [],
      viewDate: [],
      teamMember: [],
      viewApprovalTable: [],
      conform: "green",
      confirmText: ['','','확정','팀장','마감']
    }
  },
  mounted() {
    this.calDate(this.approval[0].perfDay);
    this.printDate();
    this.calTeamMember(this.approval);
    this.viewApprovalTableFunc(this.approval);
  },
  methods:{
   calDate(date){
     for(var i = 0;i<7;i++){
       this.Date[i] = date+i;
     }
     console.log(this.Date);
   },
    printDate(){
     var date = [...this.Date];
     var year, month, day;

      for(var i = 0;i<7;i++){
        date[i] = String(date[i]);
        year = date[i].substr(0,4);
        month = date[i].substr(4,2);
        day = date[i].substr(6,2);

        this.viewDate[i] = month+'.'+day;
      }
      console.log(this.viewDate)
    },
    calTeamMember(approval){
     for(var i = 0;i<approval.length;i++){
      if(this.Date[0] === approval[i].perfDay){
        this.teamMember.push(approval[i].memberId)
      }
     }
     console.log(this.teamMember);
    },
    viewApprovalTableFunc(approval){

      for(var i = 0; i<this.teamMember.length;i++){
        var arr = []
        for(var j = 0; j< approval.length;j++){
          if(this.teamMember[i] === approval[j].memberId){
            arr.push(approval[j])
          }
        }
        this.viewApprovalTable[i] = arr
      }

      console.log(this.viewApprovalTable)
    },
    statusFunc(status){
      //색상이랑, p태그만 교체하면됨
      if(status === 1){
        return true
      }else{
        return false
      }
    },
    confirmCheck(status){
      return{
        'bg-green-500': status === 2,
        'bg-fuchsia-500':status === 3,
        'bg-rose-500': status === 4
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
.max-width{
    max-width: 1200px;
}
.main-interval{
  width: 140px;
  height: 65px;
}
.sub-interval{
    width: 140px;
    height: 40px;
}
.hour-interval{
    width: 70px;
    height: 40px;
    padding-top: 3px;
}
.state-interval{
    margin-top: 20px;
    margin:auto;
}
.blind{
  display: none;
}

</style>
