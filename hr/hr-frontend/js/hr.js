var Employee = function (employee) {
    var self = this;

    self.identityNo = ko.observable("")
                    .extend({minLength:11})
                    .extend({maxLength:11})
                    .extend({required: true});
    self.name = ko.observable("")
                .extend({minLength:5})
                .extend({maxLength:32})
                .extend({required: true});
    self.salary = ko.observable(50000)
                    .extend({min:15000})
                    .extend({required: true});
    self.photo = ko.observable(ImageUtil.NO_BODY);

    if (employee != undefined){
        self.identityNo(employee.identityNo);
        self.name(employee.name);
        self.salary(employee.salary);
        self.photo(employee.photo);
    }

    self.toJsonString = function(){
        var emp= {
            identityNo: self.identityNo(),
            salary: self.salary(),
            photo: self.photo(),
            name: self.name()
        };
        return JSON.stringify(emp);
    };

    self.update= function(employee){
        for (var attr in employee){
            if (self.hasOwnProperty(attr) && employee[attr]!=undefined){
                if (ko.isComputed(self[attr])) continue;
                if ((ko.isObservable(self[attr]) && ko.isObservable(employee[attr]))){
                   self[attr](employee[attr]());
                } else if ((ko.isObservable(self[attr]) && !ko.isObservable(employee[attr]))){
                   self[attr](employee[attr]);
                }
            }
        }
    }

    // is ViewModel valid?
    self.isValid= ko.computed(function(){
        for (prop in self){
            var o= self[prop];
            if (ko.isObservable(o) && o.hasOwnProperty('rules'))
                if (!o.isValid()) return false;
        }
        return true;
    });
};

var HRViewModel = function () {
    var self = this;

    self.employee = new Employee();
    self.employees = ko.observableArray([]);

    // Allows user to change the UI Language
    self.changeLng = function(lang){
        i18n.setLng(lang,function(){
            knockoutLocalize(lang);
            $(document).i18n();

            for (prop in self.employee){
                var o= self.employee[prop];
                if ( ko.isObservable(o) && o.hasOwnProperty('rules'))
                    ko.validation.validateObservable(o);
            }

        });
    }

    // Activates the Language Selection
    self.i18n = function(){
        $(document).i18n();
    };

    // Finds the employee by identityNo
    self.find = function() {
        $.ajax({
            method: "GET",
            url: AppConfig.URL("/employees/find?identityNo="+self.employee.identityNo()),
            cache: false,
            success: function(employee){
                self.employee.update(employee);
                self.fileData().dataUrl(ImageUtil.toImage(employee.photo));
            }
        });
    };

    // Finds all employees
    self.findAll = function () {
        $.ajax({
            method: "GET",
            url: AppConfig.URL("/employees"),
            cache: false,
            success: function(employees){
                self.employees([]);
                for (var i in employees){
                    var employee= employees[i];
                    self.employees.push(new Employee(employee));
                }
                self.i18n();
            }
        })
    };

    // Adds new employee
    self.addEmployee = function() {
        self.employee.photo(ImageUtil.toImageData(self.fileData().dataUrl()));
        $.ajax({
            method: "POST",
            url: AppConfig.URL("/employees"),
            data: self.employee.toJsonString(),
            contentType: "application/json",
            success: function(employee){
                self.findAll();
            }
        })
    };

    // Updates an existing employee
    self.updateEmployee = function(emp) {
        var jsonData= "";
        if (emp == self){
            self.employee.photo(ImageUtil.toImageData(self.fileData().dataUrl()));
            jsonData= self.employee.toJsonString();
        } else {
            jsonData= emp.toJsonString();
        }
        $.ajax({
            method: "PUT",
            url: AppConfig.URL("/employees"),
            data: jsonData,
            contentType: "application/json",
            success: function(employee){
                self.findAll();
            }
        })
    };

    // Removes an employee using self.employee.identityNo()
    self.removeEmployee = function() {
        self.deleteEmp();
    };

    // Removes a given employee
    self.deleteEmp = function(emp) {
        var identityNo= "";
        if (emp == undefined)
            identityNo= self.employee.identityNo();
        else
            identityNo= emp.identityNo();

        $.ajax({
            method: "DELETE",
            url: AppConfig.URL("/employees?identityNo="+identityNo+"&id="),
            success: function(employee){
                self.employee.update(employee);
                self.findAll();
            }
        });
    };

    // copies an employee to the view model
    self.displayEmp = function(emp) {
        self.employee.update(emp);
        self.fileData().dataUrl(ImageUtil.toImage(emp.photo()));
    };

    // photo related features
    self.fileData = ko.observable({
        dataUrl: ko.observable()
    });

    self.insertFile  = function(e, data) {
        e.preventDefault();
        var files = e.target.files || e.originalEvent.dataTransfer.files;
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function (event) {
            self.fileData().dataUrl(event.target.result);
            self.employee.photo(ImageUtil.toImageData(self.fileData().dataUrl()));
        };
    };

    self.dragover = function(e){
        e.preventDefault();
    };

};

$(document).ready(function () {
    i18n.init({
        lng: "en",
        resGetPath: "locale/__ns__-__lng__.json",
        fallbackLng: "en"
    },function(t){
        $(document).i18n();
        knockoutLocalize('en');
    });
    ko.applyBindings(new HRViewModel());
});