/**
 * Created by JFCS on 2/26/16.
 */
var employeeArray = [];
var total = 0;
var primaryKey = 0;
var randomNum = 0;
var marvelArray=[];
var marvelCharId = 0;
var marvelApiImage = {};
var marvelApiDescription = '';
var marvelName ='';
var results = {};


$(document).ready(function(){
    init();

});

function init(){
    grabEmployeeArray();
    enable();

}

function enable(){
    $('.empContainer').on('click','.delete',deleteEmployee);
    $('.get-random-char').on('click',randomCharacter);
    $('.get-random-comic').on('click',randomComic);
    $('.get-random-series').on('click',randomSeries);
    //$('.empContainer').on('click','.moreinfo',comic);
    $('#employee-form').on('submit',processForm);

}

//function Employee(firstname, lastname, id , title, salary ) {
//    this.firstName = firstname;
//    this.lastName = lastname;
//    this.employeeId = id;
//    this.employeeTitle = title ;
//    this.employeeSalary = salary ;
//
//    employeeArray.push(this);
//}

//var ghostRider = new Employee('Johnny','Blaze',1968,"Ghost Rider",24000);
//var starLord = new Employee('Peter','Quill',1976,"Star-Lord",24000);

function deleteEmployee(){
    removeFromPayroll( $(this).parent().data().data );
    $(this).parent().remove();
}


function processForm(event){
    event.preventDefault();
// code from scott
    var values = {};
    $.each($('#employee-form').serializeArray(), function(i,field){
        values[field.name] = field.value;
    });
    console.log(values);
    postEmployees(values);
    //marvel(values);
    employeeArray.push(values);
    $('#employee-form').find('input[type=text],input[type=number]').val("");
    calcMonthlyPayroll(employeeArray);
}

function calcMonthlyPayroll(employeeArray) {
    total = 0;
    for (var i = 0; i < employeeArray.length; i++) {
        if (employeeArray[i].employee_salary) {
            total += Math.round((parseInt(employeeArray[i].employee_salary) / 12));
        }
    }
    $('.total-monthly-salary').html('Current Monthly Payroll is : $' + total);
}
console.log(employeeArray);

function removeFromPayroll(dataFromDiv){
    console.log(dataFromDiv);
    for(var i = 0; i < employeeArray.length; i++) {
        if (dataFromDiv == employeeArray[i].key){
            employeeArray.splice(i,1);

            calcMonthlyPayroll(employeeArray);
        }
    }
}

function marvel (employee){
    var name = employee.employee_title;
    $.ajax({
        type:'GET',
        url: '/employees/' + name,

        success: function(response){
            console.log(response);
            results = response.data.results;
            if(results.length > 0) {
                randomNum = randomNumber(0,results.length -1);
                marvelApiImage = results[randomNum].thumbnail.path + "/standard_xlarge.jpg";
                marvelCharId = results[randomNum].id;
                    if(results[randomNum].description.length > 0) {
                        marvelApiDescription = results[randomNum].description;
                    } else {
                        marvelApiDescription = "No Back Story Available ";
                }

            } else {
                marvelApiImage = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_xlarge.jpg";
                marvelApiDescription = "No Back Story Available ";
            }
            employee.image = marvelApiImage;
            employee.description = marvelApiDescription;
            employee.employeeId = marvelCharId;
            marvelArray.push(response);
            AppendDom(employee);
        }
    });


}

function randomNumber(min, max) {
return Math.floor(Math.random() * (1 + max - min) + min);

}

function randomCharacter (){
    var employee = {};
    $.ajax({
        type:'GET',
        url:'/characters',
        success: function(response){
            console.log(response);
            results = response.data.results;
            if(results.length > 0) {
                randomNum = randomNumber(0,results.length -1);
                marvelApiImage = results[randomNum].thumbnail.path + "/standard_xlarge.jpg";
                marvelCharId = results[randomNum].id;
                marvelName = results[randomNum].name;
                if(results[randomNum].description.length > 0) {
                    marvelApiDescription = results[randomNum].description;
                } else {
                    marvelApiDescription = "No Back Story Available ";
                }

            } else {
                marvelApiImage = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_xlarge.jpg";
                marvelApiDescription = "No Back Story Available ";
            }
            employee.employee_title = marvelName;
            employee.image = marvelApiImage;
            employee.description = marvelApiDescription;
            employee.employee_number = marvelCharId;
            marvelArray.push(response);
            AppendDom(employee);
        }
    });
}

function AppendDom(employee) {
    primaryKey++;
    employee.key = primaryKey;
    $('.empContainer').append("<div class='well col-sm-3'></div>");
    $el = $('.empContainer').children().last();
    $el.data('data', employee.key);
    $el.append('<p>Name: ' + employee.first_name + ' ' + employee.last_name + '</p>');
    $el.append('<p>Id #: ' + employee.employee_number + '</p>');
    $el.append('<p>Alias: ' + employee.employee_title + '</p>');
    $el.append('<p>Salary: ' + employee.employee_salary + '</p>');
    $el.append('<img class="img-responsive img-circle" src=' + employee.image + ' >');
    $el.append('<p>BackStory: ' + employee.description + '</p>');
    $el.append('<button class="btn btn-danger delete"> Remove Employee </button>');
    $el.append('<button class="btn btn-primary moreinfo"> More Info </button>');
}

function randomComic (){

    var employee = {};
    $.ajax({
        type:'GET',
        url:'/comic',
        success: function(response){
            console.log(response);
            employeeArray.push(response);
            console.log(employeeArray);
            results = response.data.results;
            if(results.length > 0) {
                randomNum = randomNumber(0,results.length -1);
                marvelApiImage = results[randomNum].thumbnail.path + "/standard_xlarge.jpg";
                marvelCharId = results[randomNum].id;
                marvelName = results[randomNum].title;
                if(results[randomNum].description !== null) {
                    marvelApiDescription = results[randomNum].description;
                } else {
                    marvelApiDescription = "No description Available ";
                }
                console.log(marvelCharId);
            } else {
                marvelApiImage = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_xlarge.jpg";
                marvelApiDescription = "No description Available ";
            }
            employee.employeeTitle = marvelName;
            employee.image = marvelApiImage;
            employee.description = marvelApiDescription;
            employee.employeeId = marvelCharId;
            marvelArray.push(response);
            AppendDomComic(employee);
        }
    });
}


function AppendDomComic(employee) {
    primaryKey++;
    employee.key = primaryKey;
    $('.empContainer').append("<div class='well col-sm-3'></div>");
    $el = $('.empContainer').children().last();
    $el.data('data', employee.key);
    //$el.append('<p>Name: ' + employee.firstName + ' ' + employee.lastName + '</p>');
    $el.append('<p>Id #: ' + employee.employeeId + '</p>');
    $el.append('<p>Title: ' + employee.employeeTitle + '</p>');
    $el.append('<img class="img-responsive " src=' + employee.image + ' >');
    $el.append('<p>Story: ' + employee.description + '</p>');
    $el.append('<button class="btn btn-danger delete"> Remove Employee </button>');
    //$el.append('<button class="btn btn-primary moreinfo"> More Info </button>');
}


function randomSeries (){
    var employee = {};
    $.ajax({
        type:'GET',
        url:'/series',
        success: function(response){
            console.log(response);
            results = response.data.results;
            if(results.length > 0) {
                randomNum = randomNumber(0,results.length -1);
                marvelApiImage = results[randomNum].thumbnail.path + "/standard_xlarge.jpg";
                marvelCharId = results[randomNum].id;
                marvelName = results[randomNum].title;
                if(results[randomNum].description !== null) {
                    marvelApiDescription = results[randomNum].description;
                } else {
                    marvelApiDescription = "No Back Story Available ";
                }
                console.log(marvelCharId);
            } else {
                marvelApiImage = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/standard_xlarge.jpg";
                marvelApiDescription = "No Back Story Available ";
            }
            employee.employeeTitle = marvelName;
            employee.image = marvelApiImage;
            employee.description = marvelApiDescription;
            employee.employeeId = marvelCharId;
            marvelArray.push(response);
            AppendDomComic(employee);
        }
    });
}



function grabEmployeeArray(){

    $.ajax({
        type:'GET',
        url:'/employees',
        success: function(response){
            console.log(response);
            employeeArray = response;
            for(var i = 0; i < employeeArray.length; i++) {
                marvel(employeeArray[i]);
                calcMonthlyPayroll(employeeArray);

            }
        }
    });

}

function postEmployees(newEmployee){
    console.log(newEmployee);
    var employee = newEmployee;
    $.ajax({
        type:'POST',
        url:'/employees',
        data: employee,
        success: function(response){
            console.log(response);
            employeeArray = response;

            for(var i = 0; i < employeeArray.length; i++) {
                marvel(employeeArray[i]);
                calcMonthlyPayroll(employeeArray);

            }
        }
    });

}