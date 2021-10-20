//console.log("component loader")

//toggle navigation
let navBar = document.getElementById("nav-bar")
let sidebarSection = document.querySelector(".sidebar-section")

navBar.addEventListener("click", function () {

    sidebarSection.classList.toggle("show-nav-bar")
})

// open modal
let show_modal = document.getElementById("show_modal")
let modal = document.getElementById("modal")
show_modal.addEventListener("click", function () {

    modal.classList.add("open-modal")
})

//close modal

 
    let modalClose = document.getElementById("modal-close")
    modalClose.addEventListener("click", function () {
    
        let form_data = document.querySelector("#member-form")
        form_data.reset()
    
        let modal_header = document.querySelector(".modal-header h3")
        modal_header.textContent = 'add new member'
    
        let form_sub_button = document.querySelector(".form-submit-button")
        form_sub_button.firstElementChild.textContent = "save"
    
        let form_submit_button = document.querySelector(".form-submit-button")
        form_submit_button.style.display = 'block'
        modal.classList.remove("open-modal")
    
        let all_status = document.querySelector("#status").children
        for (var i = 0; i < all_status.length; i++) {
            if (all_status[i].value > 0) {
    
                all_status[i].removeAttribute("selected")
            }
        }

 
    })
 

//select form




