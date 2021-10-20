//Index class

class Index {

    constructor() {

        this.total_member = document.querySelector("#total_member")
        this.total_submission = document.querySelector("#total_submission")
        this.total_cost = document.querySelector("#total_cost")
        this.total_meal = document.querySelector("#total_meal")
        this.meal_rate = document.querySelector("#meal_rate")
        this.remaining_balance = document.querySelector("#remaining_balance")


        //
        this.totalMember()
        this.totalSubmission()
        this.totalCost()
        this.totalMeal()
        this.mealRate()
        this.remainingBalance()
    }


    //total member method
    totalMember() {

        let members = JSON.parse(localStorage.getItem("members"))
        this.total_member.innerHTML = members.length
    }

    //total submission method
    totalSubmission() {
        let submissions = JSON.parse(localStorage.getItem("submissions"))
        var sum = 0
        submissions.forEach(element => {
            sum += parseInt(element.amount)
        })
        this.total_submission.innerHTML = sum+" tk"

        return sum
    }

    //total cost method
    totalCost() {

        let costs = JSON.parse(localStorage.getItem("costs"))
        var sum = 0
        costs.forEach(element => {
            sum += parseInt(element.amount)
        })
        this.total_cost.innerHTML = sum+" tk"

        return sum
    }

    //total meal method
    totalMeal() {

        let meals = JSON.parse(localStorage.getItem("meals"))

        var total_meal = 0
        for(var i = 0; i < meals.length; i++){
          var sum = 0
           meals[i].meals.forEach(function(item){
               sum += item.amount
           })
           total_meal +=sum
        }
        this.total_meal.innerHTML = total_meal

        return total_meal
    }

    // meal rate method
    mealRate() {
         
        //total cost
       let totalCost =  this.totalCost()
       let totalMeal =  this.totalMeal()
       
       //calculate meal rate
       let mealRate = totalCost/totalMeal
       this.meal_rate.innerHTML = mealRate.toFixed(2)+" tk"
    }

    //remaining balance method
    remainingBalance() {


        let totalSubmission = this.totalSubmission()
        let totalCost       = this.totalCost()

        let remainingBalance = totalSubmission-totalCost
        this.remaining_balance.innerHTML = remainingBalance+" tk"
    }



}//end index class


//DOMContentLoader
window.addEventListener("DOMContentLoaded", function () {
    //create instance of index class
    let index = new Index()
})