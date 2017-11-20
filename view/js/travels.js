(function(){

angular
    .module('app')
    .controller('TravelsController',['$scope','$http',travelsController])
	.directive('customHeader', function(){
		return {
			restrict : 'E',
			templateUrl: '/directives/header.html',
			replace: true
    	};
	})
    .directive('customForm', function(){
		return {
			restrict : 'E',
			templateUrl: '/directives/form.html',
			replace: true
    	};
	})

function travelsController($scope,$http){
		$scope.destinations = [];
		getDestinations();
        let defaultCity = 
         {
            "city": "",
            "destinations":[
                {
                    "name":"",
                    "price":0
                }
            ]
        };
        $scope.city = angular.copy(defaultCity);
		$scope.cart = [];
		$scope.alert = '';
		
		$scope.saveDestination = function(destination){
			$http.post("http://localhost:3000/travels",destination)
            .then(function(response) {
                addAlert('Destinantion added sucesfully');
                getDestinations();
                angular.element("#destination-form").modal('hide');
                $scope.city = angular.copy(defaultCity);
            }).catch(function(error){
                addAlert('Error : ' + error);
            });
		};

        $scope.updateDestination = function(destination){
			$http.put("http://localhost:3000/travels/"+destination._id,destination)
            .then(function(response) {
                addAlert('Destinantion updated sucesfully');
                getDestinations();
                angular.element("#destination-form").modal('hide');
                $scope.city = angular.copy(defaultCity);
            }).catch(function(error){
                addAlert('Error : ' + error);
            });
		};

        $scope.updateCity = function(destination){
			$scope.city = angular.copy(destination)
		};

        $scope.cleanCity = function(){
			$scope.city = angular.copy(defaultCity)
		};
        
		$scope.removeDestination = function(destination){
           _.remove($scope.city.destinations,function(elem){
                return elem.name === destination.name && elem.price === destination.price;
           });
		};
        
        $scope.addLocation = function(){
		  $scope.city.destinations.push({
              "name":"",
              "price": 0
          })
		};
    
        $scope.removeCity = function(destination){
		   $http.delete("http://localhost:3000/travels/"+destination._id)
            .then(function(response) {
                addAlert('Destinantion removed sucesfully');
                getDestinations();
            }).catch(function(error){
                addAlert('Error : ' + error);
            });
		};

		$scope.emptyAlert = function(){
				$scope.alert = '';
		};

		function addAlert(message){
			 $scope.alert = '';
			 $scope.alert =message;
		}

        function getDestinations(){
             $http.get("http://localhost:3000/travels")
            .then(function(response) {
            $scope.destinations = response.data;
            });
        }

	}

    })();