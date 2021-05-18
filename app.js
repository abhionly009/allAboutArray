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

const createUserBtn = document.getElementById('createUser');


/**  @Params(filter,sort) filter is the keyword which you are looking into either in name column or in company column,
 *  sort is parameter for sorting data according to age
 */
function displayUserInfo(filter ='', sort = '') {

    table.innerHTML = "";

    let row = table.insertRow(0)
    let cell0 = row.insertCell(0);
    let cell1 = row.insertCell(1);
    let cell2 = row.insertCell(2);

    cell0.innerHTML = 'Name';
    cell1.innerHTML = 'Age' + '<span id="sort"><i class="fa fa-sort" ></i><span>'
    cell2.innerHTML = 'Comapny';
    
    /** This will filter array based on name and company you are looking for.
     * Here you can see I have used array.filter(), I order to get get new array based on passed conditions.
    */
    let filteredUsers = !filter ? users : users.filter(user => (user.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    || user.company.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    ))

    //It will sort the array in ascending order
    filteredUsers = !sort ? filteredUsers :filteredUsers.sort(
        (a, b) => {
            if (a.age > b.age) {
                return 1;
            } else if (a.age === b.age) {
                return 0;
            } else {
                return -1;
            }
        }
    )
    

    /** If array's length is equal to zero remove table from dom and add no data message else otherwise */
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

// calling displayUserInfo onload of web page. 
window.onload = displayUserInfo();


// Added event listner to listen click event on create button once user fills the data into form.
createUserBtn.addEventListener('click', function saveUser() {
    let nameUsrInpt = document.getElementById('name');
    let ageUsrInpt = document.getElementById('age');
    let companyUsrInpt = document.getElementById('company');

    let user = {
        name: nameUsrInpt.value,
        age: ageUsrInpt.value,
        company: companyUsrInpt.value
    }
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

// Achiving throtteling and calling this method on every key press in search field.
const betterSearch = function callBackForFilter() {
    setTimeout(getFilterData(searchBox.value), 5000);
}

const sortBtn = document.getElementById('sort');

// sort Handler to be called on click event of sort button.
function sortUserHander() {
    displayUserInfo('', 'yes');

}
// added event listener on sort icon to sort array according to age.
sortBtn.addEventListener('click', sortUserHander);