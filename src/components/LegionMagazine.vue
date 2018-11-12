<template>
	<div>
		<div align="center" style="margin-top: 5rem">
		<el-button @click="downloadCSV" type="success">Download Subscription List</el-button><br>
		<el-date-picker v-model="value6" value-format="yyyy-MM-dd" type="daterange" @change="dateChangebirthday($event)" range-separator="To" start-placeholder="Start date" end-placeholder="End date">
		</el-date-picker>
		</div>

		<div align="center">
		
		</div>
	</div>
</template>

<script>
	const start_date_adder = "T00:00:00-0700"
	const end_date_adder = "T23:59:59-0700"

	import axios from 'axios'

    export default {    	
        data(){
        	return{
        		value6: '',
        		created_at_min: '',
        		created_at_max: '',
        	}
        },

        methods: {
        	dateChangebirthday(event){
  			console.log(event)
  			console.log(event[0])
  			console.log(event[1])

  			this.created_at_min = event[0] + start_date_adder
  			this.created_at_max = event[1] + end_date_adder

  			console.log(this.created_at_min)
  			console.log(this.created_at_max)
        	},

        	downloadCSV(){
        		axios.get('https://grand-thought-219600.appspot.com/taewoo/accounting-export', {
        			params: {
        				created_at_min: this.created_at_min,
        				created_at_max: this.created_at_max
        			},
        			headers: {
			        'Content-Type' : 'application/json'
			        }
        		})

        		.then(res => {
        			console.log("csv succeed!")
        		})
        	}

   		}
    }
</script>