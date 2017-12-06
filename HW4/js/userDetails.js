var API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjM4NThiOTAwNDg1ZmQ2MDg5ZWU2ZGRhMTgyODBlMjI0ODJmOGRjM2M4ZTkzYjU4NWMyZjk1NjFkN2JhNDQyMTY4ZTc0OTNlYzBiZmI2ZmEwIn0.eyJhdWQiOiIxMCIsImp0aSI6IjM4NThiOTAwNDg1ZmQ2MDg5ZWU2ZGRhMTgyODBlMjI0ODJmOGRjM2M4ZTkzYjU4NWMyZjk1NjFkN2JhNDQyMTY4ZTc0OTNlYzBiZmI2ZmEwIiwiaWF0IjoxNTA5NjQxNzk3LCJuYmYiOjE1MDk2NDE3OTcsImV4cCI6MTgyNTE3NDU5Nywic3ViIjoiNTI2Iiwic2NvcGVzIjpbInVzZXJCYXNlSW5mbyIsInVzZXJEZXRhaWxlZEluZm8iLCJ1c2VyQ291cnNlSW5mbyJdfQ.7HpA6KGg41Wa6vmUJ4sGt4v_dEXZm5SBrkAjO5dFYlSl0g5P8z49dyxTtIFSdBWDiZ65RoiBNGz9hEP5-8kZtsAAnpLdYddtILHbX3JFDckHvjl0VNqAzFFWNPduXzYyXcwxzdoT-EMzWxwUwLESEsNoeXM0fbyWSOOhsDQWJfpbYC7Ve2nfsy30b0tXp43iM5FrYL158K_4ow2lLafDTMXZpWkfxfqwe-R_6GF-L8VcLDItrUH64ypbgrPQJJ0v2RPZLNdn7lbgRIjlasmIwrSF77BNCHSpJmh9ginBo-jK-fkx0Nu6Jd82V_ItftxLqWrnwOgK4dUUIzrs4X0Uj6opHC4_9OJzDc2izTKHZSD6sWRfhctzTXOMlcuI7GrZ6DXGp-gtQwA2VdScT672hdU5fUmGwHIuI68a9x8ZrobOw3X79mLL1hPrELq39VBD9MpZ6CFeit2K6U9Gq1MSb_k_Kf7m3SQCnvHIu6fjF86EXnzGcTrZtRMPNH39wv36wwsWSTKPqo2fWv7ibQqBgCaPfpPr2gkKF5QkfYym8N2Bb5IYtZi6_TTRpn2aQ7QOI7WsNayRcdQx9zQ-xnGdlc4DD-Z7jZiyCgFf-0gpPXeIOA1qUwIKyOlgug9A6p2fYFtEW9hYFOO9XjAthbMD4FQOor_oxjI7EuxNljnAJ6U';
var client = new INTITAClient({
    key: API_KEY,
});



var lect = new Array();
//console.log(client.getModuleLectures());
/*client.getModuleLectures(function (error, data) {
    data.lectures.forEach(function (element) {
    console.log(element);
    });
   // lect[data.lecture_ID] = data.title_ua; 
});*/

client.getUserDetails( function (error, data) {
   
    document.getElementById("avatar").src = data.avatar;
    document.getElementById("firstName").innerHTML = data.firstName;
    document.getElementById("secondName").innerHTML = data.secondName;

    document.getElementById("email").innerHTML = data.email;
    document.getElementById("phone").innerHTML = data.phone;
    document.getElementById("skype").innerHTML = data.skype;

 document.getElementById("country").innerHTML = data.country;
 document.getElementById("city").innerHTML = data.city;
 document.getElementById("address").innerHTML = data.address;
 document.getElementById("education").innerHTML = data.education;
});


client.getUserCoursesAndModules( function (error, data) {

    data.courses.forEach(function (element) {
        var id = element.id;


        client.getCourseInfo(id, function (error, data) {
            document.getElementById("title").innerHTML = element.title;

            client.getCourseModules(id, function (error, data) {              
                var moduleContainer = document.getElementById("modules");
                var container = document.createElement('div');
                
                data.forEach(function (module, index) {
                    client.getModuleInfo(module.id, function (error, moduleInfo) {                        
                        var moduleInfoEl = document.createElement('div');
                            moduleInfoEl.setAttribute('class','module'); 
                            /*для блока модуля і списку лекції додав клас для подальшої стилізації, класи не використовую*/       
                            /*додав клас для блока і обгорнув назви модуля в спан додавши атрибут data-id і обробник onclick="show(this)", ф-я описана нижче*/                                   
                            moduleInfoEl.innerHTML = '<span class="nameModul" onclick="show(this)" data-id="'+moduleInfo.module_ID+'">'+moduleInfo.title_ua + '</span>';
                            /*всі лекції буду виводити через список додавши клас і атрибут id який для кожного блока лекці співпадає з атрибутом data-id назви модуля*/
                           var html = '<ul class="lectures" id="'+moduleInfo.module_ID+'" style="display:none">';/*початок списку і зразу ховаю його*/
                                client.getModuleLectures(module.id, function(error, data) {   /*це їхня ф-я яка повертає спиоск лекцій модуля, module.id це по ньому вивбирає лекці для модуля */                         
                                   for(var i=0; i<data.length; i++){/*тут приходить json, який через цикл виводжу формуюси елементи списку*/
                                        html += '<li>'+data[i]['title']+'</li>';
                                   }
                                html += '</ul>';
                                moduleInfoEl.innerHTML +=html; /*додаю все до блока модуля*/                       
                        });
                        container.appendChild(moduleInfoEl);
                        if (index === data.length - 1) {
                            moduleContainer.appendChild(container);
                        }                        
                    });
                });
            });
        });
    });
});
/*ф-я яка розкриває і згортає блок з лекціями*/
function show(el){
    var showLection = document.getElementById(el.getAttribute('data-id'));/*вивбираємо елемент по Id і який дорівнює data-id*/
    if(showLection.style.display=='none'){/*дивимось на значення display і міняємо його значення*/
        showLection.style.display='block';
    }else{
         showLection.style.display='none';
    }
}

