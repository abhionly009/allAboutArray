let users = [{
    name:'Abhinandan',
    age:30,
    company:'IBM'
},{
    name:'Harshit',
    age:27,
    company:'TCS'
},{
    name:'Gaurav',
    age:28,
    company:'Infosys'
},{
    name:'Sandeep',
    age:27,
    company:'Lowes'
    }
,{
    name:'Utkarsh',
    age:29,
    company:'GT'
    }
,{
    name:'Anita',
    age:20,
    company:'IBM'
}];




const table = document.getElementById('usertable');

const searchBox = document.getElementById('search');

const nodata = document.getElementById('noData');


function displayUserInfo(filter ='', sort = '') {

    table.innerHTML = "";

    let row = table.insertRow(0)
    let cell0 = row.insertCell(0);
    let cell1 = row.insertCell(1);
    let cell2 = row.insertCell(2);

    cell0.innerHTML = 'Name';
    cell1.innerHTML = 'Age' + '<span><i class="fa fa-sort" id="sort"></i><span>'
    cell2.innerHTML = 'Comapny';
    
    const filteredUsers = !filter ? users : users.filter(user => (user.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    || user.company.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    ))

    // Need to sort this after getting filtered
    // filteredUsers = !sort ? users :users.sort(
    //     (a, b) => {
    //         if (a.age > b.age) {
    //             return 1;
    //         } else if (a.age === b.age) {
    //             return 0;
    //         } else {
    //             return -1;
    //         }
    //     }
    // )
    


    if (filteredUsers.length === 0) {
        table.classList.add('visible');
        nodata.classList.add('noData');
        nodata.innerHTML = "No Data Found";
        return;
    } else {
        table.classList.remove('visible');
        nodata.innerHTML = '';
        nodata.classList.remove('noData');
        let count = 1;
        filteredUsers.forEach((ele) => {
            row = table.insertRow(count++);
            let cell0 = row.insertCell(0);
            let cell1 = row.insertCell(1);
            let cell2 = row.insertCell(2);
            cell0.innerHTML = ele.name;
            cell1.innerHTML = ele.age;
            cell2.innerHTML = ele.company;
        })
    }


}

window.onload = displayUserInfo();

const createUserBtn = document.getElementById('createUser');
const sortBtn = document.getElementById('sort');


createUserBtn.addEventListener('click', function saveUser() {
    let nameUsrInpt = document.getElementById('name');
    let ageUsrInpt = document.getElementById('age');
    let companyUsrInpt = document.getElementById('company');

    let user = {
        name: nameUsrInpt.value,
        age: ageUsrInpt.value,
        company: companyUsrInpt.value
    }
    console.log(user);
    if (user.name === '' || user.age === '' || user.company === '') {
        return;
    }
    users.unshift(user);

    displayUserInfo();
    nameUsrInpt.value = '';
    ageUsrInpt.value = '';
    companyUsrInpt.value = '';

});

function getFilterData(filter) {
    displayUserInfo(filter);
  
}


const betterSearch = function callBackForFilter() {
    setTimeout(getFilterData(searchBox.value), 5000);
}

function sortUserHander() {
    displayUserInfo('', 'yes');

}

sortBtn.addEventListener('click', sortUserHander);