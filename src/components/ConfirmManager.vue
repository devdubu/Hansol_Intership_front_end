<!-- 완성 -->
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
                <button style="width: 200px; height: 40px;" class="mr-4 bg-orange-500 rounded-lg hover:bg-orange-600 active:bg-orange-700 focus:outline-none"><p class="mt-0.5 ml-0.5">미승인PM SMS전송</p></button>
                <button style="width: 100px; height: 40px;" class="mr-4 bg-red-500	w-16 rounded-lg	hover:bg-red-600 active:bg-red-700 focus:outline-none"><p class="mt-0.5 ml-0.5">승인취소</p></button>
                <button style="width: 50px; height: 40px;" class="mr-4 bg-yellow-500 w-10 rounded-lg	hover:bg-yellow-600 active:bg-yellow-700 focus:outline-none"><p class="mt-0.5 ml-0.5">반려</p></button>
                <button style="width: 50px; height: 40px;" @click="SendApprovalData" class="mr-4 bg-emerald-500	w-10 rounded-lg	hover:bg-emerald-600 active:bg-emerald-700 focus:outline-none"><p class="mt-0.5 ml-0.5">승인</p></button>
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
                <div class="pt-2 main-interval border-r" ><p>Mon <span><input v-model="checkDate" :value="SendDate[0]" type="checkbox"></span></p><p>{{viewDate[0]}}</p></div><!--0~6번 째로 해당 주차의 status를 구분한다.-->
                <div class="pt-2 main-interval border-r" ><p>Tue <span><input v-model="checkDate" :value="SendDate[1]" type="checkbox"></span></p><p>{{ viewDate[1] }}</p></div>
                <div class="pt-2 main-interval border-r" ><p>Web <span><input v-model="checkDate" :value="SendDate[2]" type="checkbox"></span></p><p>{{ viewDate[2] }}</p></div>
                <div class="pt-2 main-interval border-r"><p>Thu <span><input v-model="checkDate" :value="SendDate[3]" type="checkbox"></span></p><p>{{ viewDate[3] }}</p></div>
                <div class="pt-2 main-interval border-r" ><p>Fri <span><input v-model="checkDate" :value="SendDate[4]" type="checkbox"></span></p><p>{{ viewDate[4] }}</p></div>
                <div class="pt-2 main-interval border-r"><p>Sat <span><input v-model="checkDate" :value="SendDate[5]" type="checkbox"></span></p><p>{{ viewDate[5] }}</p></div>
                <div class="pt-2 main-interval border-r"><p>Sun <span><input v-model="checkDate" :value="SendDate[6]" type="checkbox"></span></p><p>{{ viewDate[6] }}</p></div>
                <div class="pt-2 all" style="width: 70px;"><p class="mt-3">All <span><input type="checkbox" v-model="checkDate" :value="SendDate" ></span></p></div>
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
                        <div class=" pt-2 border-l" style="width:50%"><input v-model="checkOutMember" :value="teamMember[index]" type="checkbox"> </div><!--멤버별 승인 제외 index로 구분한다.-->
                    </div>
                    <div class="flex sub-interval border-r" >
                        <div class=" hour-interval"><p class="pt-1">{{ member[0].dayHour }}</p></div>
                        <div class=" hour-interval border-l">
                            <div v-if="blindStatus(member[0].isDeadline)" :class="{blind:statusFunc(member[0].signStatus)}, confirmCheck(member[0].signStatus)" class="w-10 rounded-xl state-interval">
                              <p class="mt-1">{{ confirmText[member[0].signStatus] }}</p>
                            </div>
                            <div v-if="!(blindStatus(member[0].isDeadline))" class="w-10 bg-rose-500 rounded-xl state-interval">
                              <p class="mt-1">마감</p>
                            </div>
                        </div>
                    </div>
                     <div class="flex sub-interval border-r" >
                        <div class=" hour-interval"><p class="pt-1">{{ member[1].totalTime }}</p></div>
                        <div class=" hour-interval border-l">
                            <div v-if="blindStatus(member[1].isDeadline)" :class="{blind:statusFunc(member[1].signStatus)}, confirmCheck(member[1].signStatus)" class="w-10 rounded-xl state-interval">
                              <p class="mt-1">{{ confirmText[member[1].signStatus] }}</p>
                            </div>
                            <div v-if="!(blindStatus(member[1].isDeadline))" class="w-10 bg-rose-500 rounded-xl state-interval">
                              <p class="mt-1">마감</p>
                            </div>
                        </div>
                    </div>
                     <div class="flex sub-interval border-r" >
                        <div class=" hour-interval"><p class="pt-1">{{ member[2].dayHour }}</p></div>
                        <div class=" hour-interval border-l">
                            <div v-if="blindStatus(member[2].isDeadline)" :class="{blind:statusFunc(member[2].signStatus)}, confirmCheck(member[2].signStatus)" class="w-10 rounded-xl state-interval">
                              <p class="mt-1">{{ confirmText[member[2].signStatus] }}</p>
                            </div>
                            <div v-if="!(blindStatus(member[2].isDeadline))" class="w-10 bg-rose-500 rounded-xl state-interval">
                              <p class="mt-1">마감</p>
                            </div>
                        </div>
                    </div>
                     <div class="flex sub-interval border-r" >
                        <div class=" hour-interval "><p class="pt-1">{{ member[3].dayHour }}</p></div>
                        <div class=" hour-interval border-l">
                            <div v-if="blindStatus(member[3].isDeadline)" :class="{blind:statusFunc(member[3].signStatus)}, confirmCheck(member[3].signStatus)" class="w-10  rounded-xl state-interval">
                              <p class="mt-1">{{ confirmText[member[3].signStatus] }}</p>
                            </div>
                            <div v-if="!(blindStatus(member[3].isDeadline))" class="w-10 bg-rose-500 rounded-xl state-interval">
                              <p class="mt-1">마감</p>
                            </div>
                        </div>
                    </div>
                     <div class="flex sub-interval border-r" >
                        <div class=" hour-interval"><p class="pt-1">{{ member[4].dayHour }}</p></div>
                        <div class=" hour-interval border-l">
                            <div v-if="blindStatus(member[4].isDeadline)" :class="{blind:statusFunc(member[4].signStatus)}, confirmCheck(member[4].signStatus)" class="w-10  rounded-xl state-interval">
                              <p class="mt-1">{{ confirmText[member[4].signStatus] }}</p>
                            </div>
                            <div v-if="!(blindStatus(member[4].isDeadline))" class="w-10 bg-rose-500 rounded-xl state-interval">
                              <p class="mt-1">마감</p>
                            </div>
                        </div>
                    </div>
                     <div class="flex sub-interval border-r" >
                        <div class=" hour-interval"><p class="pt-1">{{ member[5].dayHour }}</p></div>
                        <div class=" hour-interval border-l">
                            <div v-if="blindStatus(member[5].isDeadline)" :class="{blind:statusFunc(member[5].signStatus)}, confirmCheck(member[5].signStatus)" class="w-10  rounded-xl state-interval">
                              <p class="mt-1">{{ confirmText[member[5].signStatus] }}</p>
                            </div>
                            <div v-if="!(blindStatus(member[5].isDeadline))" class="w-10 bg-rose-500 rounded-xl state-interval">
                              <p class="mt-1">마감</p>
                            </div>
                        </div>
                    </div>
                     <div class="flex sub-interval" >
                        <div class=" hour-interval"><p class="pt-1">{{ member[6].dayHour }}</p></div>
                        <div class=" hour-interval border-l">
                            <div v-if="blindStatus(member[6].isDeadline)" :class="{blind:statusFunc(member[6].signStatus)}, confirmCheck(member[6].signStatus)" class="w-10 rounded-xl state-interval">
                              <p class="mt-1">{{ confirmText[member[6].signStatus] }}</p>
                            </div>
                            <div v-if="!(blindStatus(member[6].isDeadline))" class="w-10 bg-rose-500 rounded-xl state-interval">
                              <p class="mt-1">마감</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex" >
                      <div class="border-l" style="width: 71px;"><p class="pt-2 pl-1">{{ member[0].totalTime }}</p></div>
                    </div>
                </div>
              </div>
            </div>
          </div>
      </div>

</template>
<script>
import axios from "axios";
import approval from '../assets/approvalData.json';
export default {
  name: 'CompanyProject',
  data(){
    return{
      //axios로 인해서 받은 데이터
      responseCode: 0,
      backMessage: '',

      nowdate: 0,
      //원본 데이터 파일
      approval: [],
      //화면이 보여주는 영역

      Date: [],
      viewDate: [],
      teamMember: [],
      viewApprovalTable: [],
      confirmText: ['','','확정','팀장'],

      //checking 데이터
      SendDate:[],
      checkOutMember:[],
      checkDate: [],
      checkDeadline:[],
      checkStatus: [],

      //보내주는 데이터 셋
      CopyApprovalDate: [],
      sendData:
        {
          "memberids": [],
          "days": []
        },
      ended:[]


    }
  },
  async mounted() {
    await this.GetApprove();
    this.SetCopyData()
    this.calDate(this.CopyApprovalDate[0].perfDay);
    this.extractionDeadline();
    this.calTeamMember(this.CopyApprovalDate);
    this.viewApprovalTableFunc(this.CopyApprovalDate);
  },
  methods:{
    //------------------------------------------- 마운트 되기 전에 실행되야하는 함수 --------------------------------
    async GetApprove(){

      const date = new Date();

      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      if(month < 10){
        this.nowdate = (year*10000)+(month*100)+day;
      }else{
        this.nowdate = (year*1000)+(month*100)+day;
      }
      await axios.get('/api/approvals',{
        params:{
          day: this.nowdate,
        }
      })
          .then((res)=>{
            this.responseCode = res.data.code;
            this.backMessage = res.data.message;
            this.approval = res.data.result;
            if(this.responseCode != 1000){
              alert('로그인 후 이용해주세요')
              this.$router.push('/');
            }
          })
          .catch((res)=>{
            console.error(res);
          })


    },
    SetCopyData(){
      for(var i = 0;i<this.approval.length;i++){
        this.CopyApprovalDate.push({
          perfDay : this.approval[i].perfDay,
          memberId: this.approval[i].memberId,
          memberName : this.approval[i].memberName,
          signStatus: this.approval[i].signStatus,
          totalTime : this.approval[i].totalTime,
          dayHour: this.approval[i].dayHour,
          isHoliday: this.approval[i].isHoliday,
          isDeadline: this.approval[i].isDeadline
        })
      }
    },
    //------------------------------------------- 데이터를 화면에 출력해주는 함수들 --------------------------------

    calDate(startdate){
      var Deadline =[]
      for(var i = 0;i<this.CopyApprovalDate.length;i++){
        if(this.CopyApprovalDate[0].memberId === this.CopyApprovalDate[i].memberId){
          Deadline.push(this.CopyApprovalDate[i].isDeadline);
        }
      }

     for(var i = 0;i<7;i++){
       this.Date[i] = startdate+i;
       this.SendDate.push({
         index: i,
         date: String(this.Date[i]),
         isDeadline: Deadline[i]
       })
     }

      var date = [...this.Date];

      for(var i = 0;i<7;i++){
        date[i] = String(date[i]);

        this.viewDate[i] = [date[i].slice(4,6),'.',date[i].slice(6,8)].join('');
      }

   },
    //-> 구조를 변경해야함,, 어쩔 수 없음
    //멤버를 멤버 리스트에 넣는 작업
    calTeamMember(approval){
     for(var i = 0;i<approval.length;i++){
      if(this.Date[0] === approval[i].perfDay){
        this.teamMember.push(approval[i].memberId)
      }
     }
     this.sendData.memberids = this.teamMember
    },//화면에 멤버 리스트가 뽑히는 부분
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
      }
    },
    //deadline 추출하기
    extractionDeadline(){
      var index = 0
      for(var i = 0;i<this.CopyApprovalDate.length;i++){
        if(this.CopyApprovalDate[0].memberId === this.CopyApprovalDate[i].memberId){
          this.checkDeadline.push({
            id: index,
            perfDay: String(this.CopyApprovalDate[i].perfDay),
            isDeadline:this.CopyApprovalDate[i].isDeadline,
          });
          index++
        }
      }
    },
    blindStatus(deadline){
      if(deadline === '1'){
        return false
      }else{
        return true
      }
    },
    //--------------------------------------------------- 데이터를 수집하는 함수 --------------------------------
    async SendApprovalData(){
      this.sendData.days = this.checkDate;
      const member = this.sendData.memberids;
      const checkoutMember = this.checkOutMember;
      this.sendData.memberids = member.filter(x=>!checkoutMember.includes(x))


      for(var i = 0;i<this.checkDate.length;i++){
        if(this.checkDate[i].isDeadline === '1'){
          alert([this.checkDate[i].date.slice(0,4),'년 ',this.checkDate[i].date.slice(4,6),'월 ',this.checkDate[i].date.slice(6,8),'일'].join('')+'은 마감일 이므로 승인이 불가능합니다.')
          return
        }
      }

      var totalMember = this.sendData.memberids.length;


      for(var j = 0;j<totalMember;j++){
        var memberData = []
        for(var i = 0;i<this.CopyApprovalDate.length;i++){
          if(this.sendData.memberids[j] === this.CopyApprovalDate[i].memberId){
            memberData.push({
              memberId: this.CopyApprovalDate[i].memberId,
              signStatus: this.CopyApprovalDate[i].signStatus
            })
          }
        }
        this.checkStatus.push(memberData);
      }

      var checkIndex = [];
      for(var i = 0;i<totalMember;i++){
        for(var j = 0;j<this.checkDate.length;j++){

          if(this.checkStatus[i][this.checkDate[j].index].signStatus === 1){
            alert('확정되지 않는 실적입니다.')
            return;
          }else if(this.checkStatus[i][this.checkDate[j].index].signStatus === 3){
            alert('이미 처리된 실적입니다.')
            return;
          }
        }
      }

      // memberid를 비교해서 결과물을 추출해본다.


      console.log(this.sendData)

      await axios.post('/api/approvals', this.sendData)
          .then((res)=>{
            this.responseCode = res.data.code;
            this.backMessage = res.data.message;
            if(this.responseCode === 1000){
              alert('승인 처리가 완료 되었습니다.')
            }else{
              alert(this.backMessage)
            }
          })
          .catch((res)=>{
            console.error(res);
          });

      await this.GetApprove();

      //마감, signStatus, memberId, perfDay



      // this.axios.post('/test', this.sendData)
      //     .then((res)=>{
      //       console.log(res.data)
      //     })
      //     .catch((error)=>{
      //       console.error(error)
      //     })
    },
    CancelApprovalFunc(){

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
