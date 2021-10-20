//category class
class Category {

    constructor() {

        this.category_form = this.select_element("#category-form")
        this.modal_show = this.select_element("#show_modal")
        this.modal = this.select_element("#modal")
        this.modal_close = this.select_element("#modal-close")
        this.category_list = this.get_data_from_localstorage()
        this.category_id = this.get_data_from_localstorage().length - 1 < 0 ? 1 : this.category_list[this.get_data_from_localstorage().length - 1].id + 1
        this.item_list = this.select_element(".item-list")
        this.editable_id = 0
        //show category into dom during page load
        this.show_category()

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
            let all_status = select_element("#status").children
            for (var i = 0; i < all_status.length; i++) {
                if (all_status[i].value > 0) {
                    all_status[i].removeAttribute("selected")
                }
            }
            //back to default option of form
            select_element(".modal-header").firstElementChild.innerHTML = 'add new category'
            select_element("#form-submit-btn").innerHTML = 'save'
            select_element("#form-submit-btn").style.display = 'block'
            self.category_form.reset()
        })
    }


   //submit category form
    submit_category_form() {

        let submit_type = this.category_form.lastElementChild.firstElementChild.textContent
        let select_element = this.select_element

        let category_name = select_element("#category_name").value
        let status = select_element("#status").value


        if (submit_type == "save") {
            //single category
            let category = {
                id: parseInt(this.category_id),
                name: category_name,
                status: status
            }
            //push category to category-list
            this.category_list.push(category)
            //increase category id
            this.category_id++
            //category from reset
            this.category_form.reset()
            //set category-list to localstorage
            this.set_data_to_localstorage(this.category_list)
            //update dom after add category
            this.update_dom()
            this.modal.classList.remove("open-modal")
            //console.log(this.category_list)



        } else if (submit_type == "update") {
            let category_list = this.category_list
            let category_index = category_list.findIndex((category => category.id == this.editable_id));
            category_list[category_index].name = category_name
            category_list[category_index].status = status

            this.modal.classList.remove("open-modal")
            this.editable_id = 0
            this.set_data_to_localstorage(this.category_list)
            this.category_form.reset()
            this.update_dom()
           // console.log(category_list)

        }

    }


    //get data from localstorage
    get_data_from_localstorage() {
        let categories = JSON.parse(localStorage.getItem('categories'))
        return categories || []
    }

    //set data to localstorage
    set_data_to_localstorage(categories) {
        localStorage.setItem('categories', JSON.stringify(categories));
    }

    //show category in dom by traversing category_list array
    show_category() {

        let categories = this.category_list
        var self = this;
        categories.forEach(function (category) {
            self.add_category(category)
        })

        // console.log(categories)
    }

    //update dom
    update_dom() {

        this.item_list.firstElementChild.lastElementChild.textContent = ''
        let categories = this.category_list
        var self = this;
        categories.forEach(function (category) {
            self.add_category(category)
        })
    }


    //add catgory to dom
    add_category(category) {

        //create new table row in dom
        const tr = document.createElement("tr")
        tr.innerHTML = `<td>${category.id}</td>
             <td>${category.name}</td>
             <td><span id="${category.status == 1 ? 'status-success' : 'status-danger'}">${category.status == 1 ? 'Active' : 'In-Active'}</span></td>
             <td>
                 <a href="#" data-id="${category.id}"><i class="fa fa-edit"></i></a>
                 <a href="#" data-id="${category.id}"><i class="fa fa-eye"></i></a>
                 <a href="#" data-id="${category.id}"><i class="fa fa-trash"></i></a>
             </td>`
        //appned category in list   
        this.item_list.firstElementChild.lastElementChild.appendChild(tr)

    }

    //edit category

    edit_category(element) {

        let single_category = this.get_category_by_id(element.dataset.id)
        let select_element = this.select_element
        this.modal.classList.add("open-modal")

        let { id, name, status } = single_category
        this.editable_id = id


        select_element("#category_name").value = name
        //select specifix status
        let all_status = select_element("#status").children
        for (var i = 0; i < all_status.length; i++) {
            if (status == all_status[i].value) {
                all_status[i].setAttribute('selected', 'selected')
            }
        }

        select_element("#form-submit-btn").innerHTML = 'update'
        select_element(".modal-header").firstElementChild.innerHTML = 'update category'
    }

    //view category

    view_category(element) {

        let single_category = this.get_category_by_id(element.dataset.id)
        let select_element = this.select_element 

        this.modal.classList.add("open-modal")
        let { name, status } = single_category
        select_element("#category_name").value = name



        //select specifix status
        let all_status = select_element("#status").children
        for (var i = 0; i < all_status.length; i++) {
            if (status == all_status[i].value) {
                all_status[i].setAttribute('selected', 'selected')
            }
        }


        select_element("#form-submit-btn").style.display = 'none'
        select_element(".modal-header").firstElementChild.innerHTML = 'view category'
    }

    //delete category

    delete_category(element) {

        let id = element.dataset.id
        let parent = element.parentElement.parentElement
        this.item_list.firstElementChild.lastElementChild.removeChild(parent)
        let categories = this.category_list.filter(function (category) {
            return category.id != id
        })
        this.category_list = categories
        this.set_data_to_localstorage(this.category_list)
        //console.log(this.category_list)
    }


    //get single-category by-id
    get_category_by_id(category_id) {

        let category_list = this.category_list
        //get category from category_list array by index
        let category_index = category_list.findIndex((category => category.id == category_id))
        //return single category  
        let single_category = category_list[category_index]
        return single_category
    }

}//end category class


//DOM Content Loader
window.addEventListener("DOMContentLoaded", function () {

    //create instance of category class
    let category = new Category()
    category.show_modal()
    category.hide_modal()

    //select category form and add event listener
    let category_form = document.getElementById("category-form")
    category_form.addEventListener("submit", function (event) {
        event.preventDefault()
        category.submit_category_form()
    })

    //edit and delte category
    let item_list = document.querySelector(".item-list")
    item_list.addEventListener("click", function (event) {

        event.preventDefault()

        if (event.target.classList.contains('fa-edit')) {
            category.edit_category(event.target.parentElement);
        } else if (event.target.classList.contains('fa-eye')) {
            category.view_category(event.target.parentElement);
        } else if (event.target.classList.contains('fa-trash')) {
            category.delete_category(event.target.parentElement);
        }
    })


})//end dom content loader block