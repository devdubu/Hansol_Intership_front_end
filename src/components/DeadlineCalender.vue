<!--
개선사항
  1. checkbox로 교체하기
-->
<template>
    <div>
         <!--검색 부분 -->
      <div class="grow bg-slate-700	rounded-lg ml-2 mt-5">
          <div class="rounded-lg h-16 bg-slate-600 ml-5 flex" style="max-width:1230px">
            <div class="h-8 place-self-center flex">
                <div class="flex">
                    <div class="mt-1.5">
                        <span class="ml-4 text-white">년 월</span>
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
                        <p class="ml-2 text-white" style="width:100px">조직</p>
                    </div>
                    <div class="mt-1.5">
                            <select>
                                <option>한솔PNS</option>
                                <option>한솔 인티큐브</option>
                            </select>
                        </div>           
                </div>
                

            </div>
            <div class="grow"></div>
            
            <button class="w-10 h-8 place-self-center mr-5 text-white rounded-lg bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none ">검색</button>
          </div>
          <div class="flex" style="width:1260px">
            <div class="grow"></div>
            <div class="mt-5">
                <button class="h-8 calendar-interval-day-check place-self-center mr-5 text-white rounded-lg bg-rose-500 hover:bg-rose-600 active:bg-rose-700 focus:outline-none ">마감처리</button>
            </div>
          </div>
          <!-- 컨텐츠 부분 -->
          <div class="ml-5 mt-5 ">
            <!--상단 요일 표시-->
            <div class="flex flex-row " style="width:1250px;">
                <div class="calendar-interval-day-check">
                    <p class="bg-slate-500 text-white rounded-tl-lg" @click="checkDay(40)" ><button> 전체 월 선택</button> </p>
                    <div class="bg-gray-100 box-border calendar-interval-day-check calendar-interval-day border-2" :class="{checkDay:thema[0] }" @click="checkDay(0)"><button class="mt-5">1주차</button></div>
                    <div class="bg-gray-100 box-border calendar-interval-day-check calendar-interval-day border-2" :class="{checkDay:thema[8] }" @click="checkDay(8)"><button class="mt-5">2주차</button></div>
                    <div class="bg-gray-100 box-border calendar-interval-day-check calendar-interval-day border-2" :class="{checkDay:thema[16] }" @click="checkDay(16)"><button class="mt-5">3주차</button></div>
                    <div class="bg-gray-100 box-border calendar-interval-day-check calendar-interval-day border-2" :class="{checkDay:thema[24] }" @click="checkDay(24)"><button class="mt-5">4주차</button></div>
                    <div class="bg-gray-100 box-border calendar-interval-day-check calendar-interval-day border-2  rounded-bl-lg" :class="{checkDay:thema[32] }" @click="checkDay(32)"><button class="mt-5">5주차</button></div>
                </div>
                <div class="calendar-interval">
                    <p class="bg-slate-500 text-white ">Sun</p>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[1] }" @click="checkDay(1)" style="height: 100px"></div>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[9] }" @click="checkDay(9)" style="height: 100px"></div>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[17] }" @click="checkDay(17)" style="height: 100px"></div>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[25] }" @click="checkDay(25)" style="height: 100px"></div>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[33] }" @click="checkDay(33)" style="height: 100px"></div>
                </div>
                <div class="calendar-interval">
                    <p class="bg-slate-500 text-white">Mon</p>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[2] }" @click="checkDay(2)" style="height: 100px"></div>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[10] }" @click="checkDay(10)" style="height: 100px"></div>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[18] }" @click="checkDay(18)" style="height: 100px"></div>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[26] }" @click="checkDay(26)" style="height: 100px"></div>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[34] }" @click="checkDay(34)" style="height: 100px"></div>
                </div>
                <div class="calendar-interval ">
                    <p class="bg-slate-500 text-white	">Tue</p>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[3] }" @click="checkDay(3)" style="height: 100px"></div>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[11] }" @click="checkDay(11)" style="height: 100px"></div>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[19] }" @click="checkDay(19)" style="height: 100px"></div>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[27] }" @click="checkDay(27)" style="height: 100px"></div>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[35] }" @click="checkDay(35)" style="height: 100px"></div>
                </div>
                <div class="calendar-interval">
                    <p class="bg-slate-500 text-white	">Web</p>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[4] }" @click="checkDay(4)" style="height: 100px"></div>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[12] }" @click="checkDay(12)" style="height: 100px"></div>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[20] }" @click="checkDay(20)" style="height: 100px"></div>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[28] }" @click="checkDay(28)" style="height: 100px"></div>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[36] }" @click="checkDay(36)" style="height: 100px"></div>
                </div>
                <div class="calendar-interval ">
                    <p class="bg-slate-500 text-white	">Thu</p>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[5] }" @click="checkDay(5)" style="height: 100px"></div>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[13] }" @click="checkDay(13)" style="height: 100px"></div>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[21] }" @click="checkDay(21)" style="height: 100px"></div>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[29] }" @click="checkDay(29)" style="height: 100px"></div>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[37] }" @click="checkDay(37)" style="height: 100px"></div>
                </div>
                <div class="calendar-interval ">
                    <p class="bg-slate-500 text-white	">Fri</p>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[6] }" @click="checkDay(6)" style="height: 100px"></div>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[14] }" @click="checkDay(14)" style="height: 100px"></div>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[22] }" @click="checkDay(22)" style="height: 100px"></div>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[30] }" @click="checkDay(30)" style="height: 100px"></div>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[38] }" @click="checkDay(38)" style="height: 100px"></div>
                </div>
                <div class="calendar-interval ">
                    <p class="bg-slate-500 text-white	rounded-tr-lg">Sat</p>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[7] }" @click="checkDay(7)" style="height: 100px"></div>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[15] }" @click="checkDay(15)" style="height: 100px"></div>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[23] }" @click="checkDay(23)" style="height: 100px"></div>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2" :class="{checkDay:thema[31] }" @click="checkDay(31)" style="height: 100px"></div>
                    <div class="bg-gray-100 box-border calendar-interval-day calendar-interval border-2 rounded-br-lg" :class="{checkDay:thema[39] }" @click="checkDay(40)" style="height: 100px"></div>
                </div>
            </div>
        </div>
      </div>
    </div>
    

</template>


<script>
export default {
    name: 'DeadlineCalender',
    data(){
        return{
            thema: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, 
            false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, 
            false, false, false, false, false, false, false, false, false, false]
        }
    },
    methods:{
        checkDay(i){
            if(i === 40){
                if(this.thema[0]===false){
                    for(var j = 0; j<40;j++){
                        this.thema[j] = true;
                    }
                }else if(this.thema[0] === true){
                    for(var j = 0; j<40; j++){
                        this.thema[j] = false;
                    }
                }
                
            }else{
                switch(i){
                    case 0:
                        if(this.thema[i] === false){
                            for(var j = i; j<8; j++){
                                this.thema[j] = true;
                                console.log(j)
                            }
                        }else{
                            for(var j = i; j<8;j++){
                                this.thema[j] = false;
                            }
                        }
                        break;
                    case 8:
                        if(this.thema[i] === false){
                            for(var j = i; j<16; j++){
                                this.thema[j] = true;
                                console.log(j)
                            }
                        }else{
                            for(var j = i; j<16;j++){
                                this.thema[j] = false;
                            }
                        }
                        break;
                    case 16:
                        if(this.thema[i] === false){
                            for(var j = i; j<24;j++){
                                this.thema[j] = true;
                            }
                        }else{
                            for(var j = i; j<24;j++){
                                this.thema[j] = false;
                            }
                        }
                        break;
                    case 24:
                        if(this.thema[i] === false){
                            for(var j = i; j<32;j++){
                                this.thema[j] = true;
                            }
                        }else{
                            for(var j = i; j<32;j++){
                                this.thema[j] = false;
                            }
                        }
                        break;
                    case 32:
                        if(this.thema[i] === false){
                            for(var j = i; j<40;j++){
                                this.thema[j] = true;
                            }
                        }else{
                            for(var j = i; j<40;j++){
                                this.thema[j] = false;
                            }
                        }
                        break;
                    default:
                        this.thema[i] = !this.thema[i]
                }
            }
        }

    }
}
</script>
<style>
.calendar-interval{
  width: 120px;
}
.calendar-interval-day{
    height: 100px;
}
.calendar-interval-day-check{
    width: 100px;
}
.checkDay{
    background-color: rgb(244 63 94);
}
</style>