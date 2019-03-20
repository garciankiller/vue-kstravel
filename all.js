var app = new Vue({
    el:'#app',
    data:{
      data:[],
      currentPage:0,
      locations:[],
      currentLocation:'',
    },
    methods: {
      getUniqueList(){
        const locations =new Set(); //陣列內容不重複
        const vm = this;
        vm.data.forEach((item,i)=>{
          locations.add(item.Zone)
        })
        console.log(locations)
        vm.locations=Array.from(locations);
      }
    },
    computed: {
      filterData(){
        const vm = this;
        // 先過濾
        let items = [];
        if (vm.currentLocation !== ''){
          items= vm.data.filter((item,i)=>{
            console.log(item)
            return item.Zone == vm.currentLocation //回傳為 TRUE 的值
          })
        }else{
          items= vm.data
        }
  
  
        //分頁幾頁，每頁的資料內容
        //newData = [[1..],[2..],[3..]]
        console.log(vm.currentLocation)
        const newData= []
        items.forEach((item, i )=>{
         //i%10>取餘數10 
          if(i%10 ===0){
            newData.push([])
          }
          const page = parseInt(i/10)
          newData[page].push(item)
        })
        console.log(newData)
        return newData
        
      }
    },
    created() {
      const vm =this;
      axios.get('https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97')
    .then(function (response) {
      // handle success
      console.log(response);
      console.log(this);
      vm.data =response.data.result.records
      console.log(vm.data)
      vm.getUniqueList()
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
    }
  })