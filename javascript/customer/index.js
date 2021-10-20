//Customer class
class Customer {

    constructor() {

        this.customer_form = this.select_element("#customer_form")
        this.modal_show = this.select_element("#show_modal")
        this.modal = this.select_element("#modal")
        this.modal_close = this.select_element("#modal-close")
        this.customer_list = this.get_data_from_localstorage()
        this.customer_id = this.get_data_from_localstorage().length - 1 < 0 ? 1 : this.customer_list[this.get_data_from_localstorage().length - 1].id + 1
        this.table_item = this.select_element("#table_item")
        this.editable_id = 0
        //show customer into dom during page load
        this.show_customer()
    }

    //selector
    select_element(selector) {
        return document.querySelector(selector)
    }

    //show modal
    show_modal() {

        let self = this
        this.modal_show.addEventListener("click", function () {
            self.modal.classList.add("open-modal")
        })
       
    }

    //hide modal
    hide_modal() {

        let select_element = this.select_element
        let self = this
        this.modal_close.addEventListener("click", function (event) {
            event.preventDefault()

            self.modal.classList.remove("open-modal")
            //remove selected option
            let all_city = select_element("#city").children
            for (var i = 0; i < all_city.length; i++) {
                if (all_city[i].value !== 0) {
                    all_city[i].removeAttribute("selected")
                }
            }
            //back to default option of form
            select_element(".modal-header").firstElementChild.innerHTML = 'add new customer'
            select_element("#form-submit-btn").innerHTML = 'save'
            select_element("#form-submit-btn").style.display = 'block'

            self.customer_form.reset()
        })
    }


    //submit customer form
    submit_customer_form() {


        let submit_type = this.customer_form.lastElementChild.firstElementChild.textContent
        let select_element = this.select_element

        let name = select_element("#name").value
        let email = select_element("#email").value
        let phone = select_element("#phone").value
        let address = select_element("#address").value
        let city = select_element("#city").value
        let zipcode = select_element("#zipcode").value


        if (submit_type == "save") {
            //single customer
            let customer = {
                id: parseInt(this.customer_id),
                name: name,
                email: email,
                phone: phone,
                address: address,
                city: city,
                zipcode: zipcode
            }
            //push customer to customer-list
            this.customer_list.push(customer)
            //increase customer_id 
            this.customer_id++
            //customer from reset
            this.customer_form.reset()
            //set customer-list to localstorage
            this.set_data_to_localstorage(this.customer_list)
            //update dom after add customer
            this.update_dom()
            this.modal.classList.remove("open-modal")
            //console.log(this.customer_list)



        } else if (submit_type == "update") {
            let customer_list = this.customer_list
            let customer_index = customer_list.findIndex((customer => customer.id == this.editable_id));
            customer_list[customer_index].name = name
            customer_list[customer_index].email = email
            customer_list[customer_index].phone = phone
            customer_list[customer_index].address = address
            customer_list[customer_index].city = city
            customer_list[customer_index].zipcode = zipcode

            this.modal.classList.remove("open-modal")
            this.editable_id = 0
            this.set_data_to_localstorage(this.customer_list)
            this.customer_form.reset()
            this.update_dom()
            //console.log(customer_list)

        }



    }

     //get data from localstorage
     get_data_from_localstorage() {
        let customers = JSON.parse(localStorage.getItem('customers'))
        return customers || []
    }

    //set data to localstorage
    set_data_to_localstorage(customers) {
        localStorage.setItem('customers', JSON.stringify(customers));
    }

    //show customer in dom by traversing customer_list array
    show_customer() {

        let customers = this.customer_list
        var self = this;
        customers.forEach(function (customer) {
            self.add_customer(customer)
        })
        // console.log(customers)
    }

    //update dom
    update_dom() {
        this.table_item.firstElementChild.lastElementChild.textContent = ''
        let customers = this.customer_list
        var self = this;
        customers.forEach(function (customer) {
            self.add_customer(customer)
        })
    }


    //add customer to dom
    add_customer(customer) {

        //create new table row in dom
        const tr = document.createElement("tr")
        tr.innerHTML = `<td>${customer.id}</td>
             <td>${customer.name}</td>
             <td>${customer.email}</td>
             <td>${customer.phone}</td>
             <td>${customer.address}</td>
             <td>${customer.city}</td>
             <td>${customer.zipcode}</td>
             <td>
                 <a href="#" data-id="${customer.id}"><i class="fa fa-edit"></i></a>
                 <a href="#" data-id="${customer.id}"><i class="fa fa-eye"></i></a>
                 <a href="#" data-id="${customer.id}"><i class="fa fa-trash"></i></a>
             </td>`
        //appned customer in list   
        this.table_item.firstElementChild.lastElementChild.appendChild(tr)

    }

    //edit customer

    edit_customer(element) {

        let single_customer = this.get_customer_by_id(element.dataset.id)
        let select_element = this.select_element
        this.modal.classList.add("open-modal")

        let { id, name, email, phone, address, city, zipcode } = single_customer
        this.editable_id = id


        select_element("#name").value = name
        select_element("#email").value = email
        select_element("#phone").value = phone
        select_element("#address").value = address
        select_element("#zipcode").value = zipcode
        //select specifix city
        let all_city = select_element("#city").children
        for (var i = 0; i < all_city.length; i++) {
            if (city == all_city[i].value) {
                all_city[i].setAttribute('selected', 'selected')
            }
        }

        select_element("#form-submit-btn").innerHTML = 'update'
        select_element(".modal-header").firstElementChild.innerHTML = 'update customer'
    }

    //view customer

    view_customer(element) {


        let single_customer = this.get_customer_by_id(element.dataset.id)
        let select_element = this.select_element

        this.modal.classList.add("open-modal")
        let { name, email ,phone, address ,city, zipcode } = single_customer
        select_element("#name").value = name
        select_element("#email").value = email
        select_element("#phone").value = phone
        select_element("#address").value = address
        select_element("#city").value = city
        select_element("#zipcode").value = zipcode



        //select specifix city
        let all_city = select_element("#city").children
        for (var i = 0; i < all_city.length; i++) {
            if (city == all_city[i].value) {
                all_city[i].setAttribute('selected', 'selected')

              //  console.log(all_city[i])
            }
        }


        select_element("#form-submit-btn").style.display = 'none'
        select_element(".modal-header").firstElementChild.innerHTML = 'view customer'
    }

    //delete customer

    delete_customer(element) {

        let id = element.dataset.id
        let parent = element.parentElement.parentElement
        this.table_item.firstElementChild.lastElementChild.removeChild(parent)
        let customers = this.item_list.filter(function (customer) {
            return customer.id != id
        })
        this.customer_list = customers
        this.set_data_to_localstorage(this.customer_list)
        //console.log(this.customer_list)
    }


    //get single-customer by-id
    get_customer_by_id(customer_id) {

        let customer_list = this.customer_list
        //get customer from customer_list array by index
        let customer_index = customer_list.findIndex((customer => customer.id == customer_id))
        //return single customer  
        let single_customer = customer_list[customer_index]
        return single_customer
    }

}//end customer class


//DOM Content Loader
window.addEventListener("DOMContentLoaded", function () {

    //create instance of customer class
    let customer = new Customer()
    customer.show_modal()
    customer.hide_modal()

    //select customer form and add event listener
    let customer_form = document.getElementById("customer_form")
    customer_form.addEventListener("submit", function (event) {
        event.preventDefault()
        customer.submit_customer_form()
    })

    //edit and delte customer
    let customer_list = document.querySelector(".item-list")
    customer_list.addEventListener("click", function (event) {

        event.preventDefault()

        if (event.target.classList.contains('fa-edit')) {
            customer.edit_customer(event.target.parentElement);
        } else if (event.target.classList.contains('fa-eye')) {
            customer.view_customer(event.target.parentElement);
        } else if (event.target.classList.contains('fa-trash')) {
            customer.delete_customer(event.target.parentElement);
        }
    })


})//end dom content loader block