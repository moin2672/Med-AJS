// Code goes here


var app = angular.module('myApp', ['ngMessages','ngRoute']);

app.controller('HeaderController', function($scope, $location){
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
});

app.config(function ($routeProvider) {
             
    $routeProvider.when('/', {
        templateUrl: 'Main.html',
        controller: 'mainController'
    }).when('/addMed', {
        templateUrl: 'AddMed.html',
        controller: 'addMedController'
    }).when('/editMed/:medID', {
        templateUrl: 'EditMed.html',
        controller: 'editMedController'
    }).when('/aboutUs', {
        templateUrl: 'about.html',
        controller: 'aboutController'
    })
    .otherwise({
        redirectTo: "/"
    });
});

app.controller('mainController', function($scope, $http) {
    $scope.Products=[];
    $http.get("https://pure-meadow-85876.herokuapp.com/meds").then(function (response) {
      $scope.Products = response.data;
      console.log($scope.Products);
    }, function (err) {
    console.log(err);
    });
});

app.controller('addMedController', function($scope, $http, $location,$timeout) {
    $scope.count=0;
    $scope.mName="";
    $scope.myShow=false;
    $scope.click = function(){
         $scope.count= $scope.count+1;
        //console.log($scope.count+44);
    }
    
    $scope.click=function(){
    
    $timeout(function () {
      $scope.myShow=!$scope.myShow;
  }, 1000);
  $scope.myShow=!$scope.myShow;
    
    }
    
    
    $scope.cancel=function(){
        $location.path('/#!');
    }
    $scope.saveData=function(NewMed){
        console.log("Clicked");
        console.log(NewMed);
        $scope.mName=NewMed.medName;
        // var success=0;
        $http.post("https://pure-meadow-85876.herokuapp.com/meds",JSON.stringify(NewMed)).then(function(response){
           if (response.data) {
                console.log('Data Posted Successfully..!!!');
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers());
                // success=1;
                // console.log("success="+success);
                /*$timeout(function () {
                      $scope.myShow=true;
                  }, 2000);
                $scope.myShow=false;*/
                $scope.click();
                // alert($scope.mName+" saved successfully..!!!");
                $location.path('/#!');
           }
        },function(response){
            console.log('Data Not saved. Service Not Available. :( ');
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers());
            alert('Something went wrong');
        });
        // console.log("success="+success);
        // if(success===1){
        //     $location.path('/#!');
        // }
       
    };
    
    });

    app.controller('editMedController', function($scope, $routeParams, $http, $location, $timeout){
       
        $scope.Product={};
        $scope.medicineID=$routeParams.medID;
        console.log($scope.medicineID);
        $http.get("https://pure-meadow-85876.herokuapp.com/meds/"+$scope.medicineID).then(function (response) {
          $scope.Product = response.data;
          console.log("Product=");
          console.log($scope.Product);
         
            $scope.newMed={
              
                medName:$scope.Product.medName,
                brandName:$scope.Product.brandName,
                doseLevel:$scope.Product.doseLevel,
                medType:$scope.Product.medType,
                boxNo:$scope.Product.boxNo,
                quantity:$scope.Product.quantity,
                
            };
        }, function (err) {
        console.log(err);
        });
        
        
        //$scope.newMed=angular.copy(JSON.stringify($scope.Product));
        
        console.log("newMed=");
        console.log($scope.newMed);
      /*  $scope.obtainedMed={
            medName:$scope.Product.medName,
            brandName:$scope.Product.brandName,
            doseLevel:$scope.Product.doseLevel,
            medType:$scope.Product.medType,
            boxNo:$scope.Product.boxNo,
            quantity:$scope.Product.quantity
        };
        
        console.log($scope.obtainedMed);*/
         $scope.click=function(){
    
    $timeout(function () {
      $scope.myShow=!$scope.myShow;
  }, 1000);
  $scope.myShow=!$scope.myShow;
    
    }
    
    
    $scope.cancel=function(){
        $location.path('/#!');
    }
        
        $scope.updateData=function(){
            $http.patch("https://pure-meadow-85876.herokuapp.com/meds/"+$scope.medicineID,JSON.stringify($scope.newMed)).then(function(response){
           if (response.data) {
                console.log('Data Updated Successfully..!!!');
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers());
                // success=1;
                // console.log("success="+success);
                /*$timeout(function () {
                      $scope.myShow=true;
                  }, 2000);
                $scope.myShow=false;*/
                $scope.click();
                // alert($scope.mName+" saved successfully..!!!");
                $location.path('/#!');
           }
        },function(response){
            console.log('Data Not updated. Service Not Available. :( ');
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers());
            alert('Something went wrong');
        });
        }
        
        $scope.deleteMed=function(){
            if(confirm('Do you want to delete?')){
            $http.delete("https://pure-meadow-85876.herokuapp.com/meds/"+$scope.medicineID).then(function(response){
           if (response.data) {
                console.log('Data Deleted Successfully..!!!');
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers());
                // success=1;
                // console.log("success="+success);
                /*$timeout(function () {
                      $scope.myShow=true;
                  }, 2000);
                $scope.myShow=false;*/
                //$scope.click();
                // alert($scope.mName+" saved successfully..!!!");
                $location.path('/#!');
           }
        },function(response){
            console.log('Data Not deleted. Service Not Available. :( ');
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers());
            alert('Something went wrong');
        });
        }
        }
        
    });



/*function HeaderController($scope, $location) 
{ 
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
}*/

