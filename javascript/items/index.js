//item class
class Item {

    constructor() {

        this.item_form = this.select_element("#item_form")
        this.modal_show = this.select_element("#show_modal")
        this.modal = this.select_element("#modal")
        this.modal_close = this.select_element("#modal-close")
        this.item_list = this.get_data_from_localstorage()
        this.item_id = this.get_data_from_localstorage().length - 1 < 0 ? 1 : this.item_list[this.get_data_from_localstorage().length - 1].id + 1
        this.table_item = this.select_element("#table_item")
        this.editable_id = 0
        //show item into dom during page load
        this.show_item()
        this.show_category_on_item_form()
    }

    //selector
    select_element(selector) {
        return document.querySelector(selector)
    }



    //show category on item form

    show_category_on_item_form(){
        let categories = this.get_categories()  
        let category = this.select_element("#category")

        categories.forEach(function(cat){

            let option = document.createElement("option")
             option.setAttribute("value", `${cat.id}`)
             option.innerHTML = `${cat.name}`
             category.appendChild(option)
        })


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
            let all_category = select_element("#category").children
            for (var i = 0; i < all_category.length; i++) {
                if (all_category[i].value > 0) {
                    all_category[i].removeAttribute("selected")
                }
            }
            //back to default option of form

            select_element(".modal-header").firstElementChild.innerHTML = 'add new item'
            select_element("#form-submit-btn").innerHTML = 'save'
            select_element("#form-submit-btn").style.display = 'block'

            self.item_form.reset()
        })
    }


    //submit item form
    submit_item_form() {


        let submit_type = this.item_form.lastElementChild.firstElementChild.textContent
        let select_element = this.select_element

        let item_name = select_element("#item_name").value
        let item_quantity = select_element("#item_quantity").value
        let price_p_day = select_element("#price_p_day").value
        let price_p_week = select_element("#price_p_week").value

        let category = select_element("#category").value


        if (submit_type == "save") {
            //single item
            let item = {
                id: parseInt(this.item_id),
                name: item_name,
                quantity: parseInt(item_quantity),
                price_p_day: parseInt(price_p_day),
                price_p_week: parseInt(price_p_week),
                category: parseInt(category)
            }
            //push item to item-list
            this.item_list.push(item)
            //increase item_id 
            this.item_id++
            //item from reset
            this.item_form.reset()
            //set item-list to localstorage
            this.set_data_to_localstorage(this.item_list)
            //update dom after add item
            this.update_dom()
            this.modal.classList.remove("open-modal")
            console.log(this.item_list)



        } else if (submit_type == "update") {
            let item_list = this.item_list
            let item_index = item_list.findIndex((item => item.id == this.editable_id));
            item_list[item_index].name = item_name
            item_list[item_index].quantity = parseInt(item_quantity)
            item_list[item_index].price_p_day = parseInt(price_p_day)
            item_list[item_index].price_p_week = parseInt(price_p_week)
            item_list[item_index].category = parseInt(category)

            this.modal.classList.remove("open-modal")
            this.editable_id = 0
            this.set_data_to_localstorage(this.item_list)
            this.item_form.reset()
            this.update_dom()
            console.log(item_list)

        }



    }


    //get categories from localstorage
    get_categories() {
        let categories = JSON.parse(localStorage.getItem('categories'))
        return categories || []
    }

     //get data from localstorage
     get_data_from_localstorage() {
        let items = JSON.parse(localStorage.getItem('items'))
        return items || []
    }

    //set data to localstorage
    set_data_to_localstorage(items) {
        localStorage.setItem('items', JSON.stringify(items));
    }

    //show item in dom by traversing item_list array
    show_item() {

        let items = this.item_list
        var self = this;
        items.forEach(function (item) {
            self.add_item(item)
        })

        // console.log(items)
    }

    //update dom
    update_dom() {

        this.table_item.firstElementChild.lastElementChild.textContent = ''
        let items = this.item_list
        var self = this;
        items.forEach(function (item) {
            self.add_item(item)
        })
    }


    //add item to dom
    add_item(item) {

        //create new table row in dom
        const tr = document.createElement("tr")
        tr.innerHTML = `<td>${item.id}</td>
             <td>${item.name}</td>
             <td>$ ${item.price_p_day}</td>
             <td>$ ${item.price_p_week}</td>
             <td>${item.quantity}</td>
             <td>${item.quantity}</td>
             <td>${item.quantity}</td>
             <td>
                 <a href="#" data-id="${item.id}"><i class="fa fa-edit"></i></a>
                 <a href="#" data-id="${item.id}"><i class="fa fa-eye"></i></a>
                 <a href="#" data-id="${item.id}"><i class="fa fa-trash"></i></a>
             </td>`
        //appned item in list   
        this.table_item.firstElementChild.lastElementChild.appendChild(tr)

    }

    //edit item

    edit_item(element) {

        let single_item = this.get_item_by_id(element.dataset.id)
        let select_element = this.select_element
        this.modal.classList.add("open-modal")

        let { id, name, quantity, price_p_day, price_p_week,category } = single_item
        this.editable_id = id


        select_element("#item_name").value = name
        select_element("#item_quantity").value = quantity
        select_element("#price_p_day").value = price_p_day
        select_element("#price_p_week").value = price_p_week
        //select specifix category
        let all_item = select_element("#category").children
        for (var i = 0; i < all_item.length; i++) {
            if (category == all_item[i].value) {
                all_item[i].setAttribute('selected', 'selected')
            }
        }

        select_element("#form-submit-btn").innerHTML = 'update'
        select_element(".modal-header").firstElementChild.innerHTML = 'update item'
    }

    //view item

    view_item(element) {


        let single_item = this.get_item_by_id(element.dataset.id)
        let select_element = this.select_element

        this.modal.classList.add("open-modal")
        let { name, quantity ,price_p_day, price_p_week ,category } = single_item
        select_element("#item_name").value = name
        select_element("#item_quantity").value = quantity
        select_element("#price_p_day").value = price_p_day
        select_element("#price_p_week").value = price_p_week



        //select specifix category
        let all_category = select_element("#category").children
        for (var i = 0; i < all_category.length; i++) {
            if (category == all_category[i].value) {
                all_category[i].setAttribute('selected', 'selected')

              //  console.log(all_category[i])
            }
        }


        select_element("#form-submit-btn").style.display = 'none'
        select_element(".modal-header").firstElementChild.innerHTML = 'view item'
    }

    //delete item

    delete_item(element) {

        let id = element.dataset.id
        let parent = element.parentElement.parentElement
        this.table_item.firstElementChild.lastElementChild.removeChild(parent)
        let items = this.item_list.filter(function (item) {
            return item.id != id
        })
        this.item_list = items
        this.set_data_to_localstorage(this.item_list)
        //console.log(this.item_list)
    }


    //get single-item by-id
    get_item_by_id(item_id) {

        let item_list = this.item_list
        //get item from item_list array by index
        let item_index = item_list.findIndex((item => item.id == item_id))
        //return single item  
        let single_item = item_list[item_index]
        return single_item
    }

}//end item class


//DOM Content Loader
window.addEventListener("DOMContentLoaded", function () {

    //create instance of item class
    let item = new Item()
    item.show_modal()
    item.hide_modal()

    //select item form and add event listener
    let item_form = document.getElementById("item_form")
    item_form.addEventListener("submit", function (event) {
        event.preventDefault()
        item.submit_item_form()
    })

    //edit and delte item
    let item_list = document.querySelector(".item-list")
    item_list.addEventListener("click", function (event) {

        event.preventDefault()

        if (event.target.classList.contains('fa-edit')) {
            item.edit_item(event.target.parentElement);
        } else if (event.target.classList.contains('fa-eye')) {
            item.view_item(event.target.parentElement);
        } else if (event.target.classList.contains('fa-trash')) {
            item.delete_item(event.target.parentElement);
        }
    })


})//end dom content loader block