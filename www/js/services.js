angular.module('sparkle.services',[])

.service('EventService',['$http','$log',function($http,$log)
{
      return {
        all: function() {
          // Return promise (async callback)
          return $http.get("http://podargroup.com/SparkleMedia/getDataFromServer.php?getType=GetEventList");
            
        }  
      };
   
     
     
}])

.service('EventVideoService',['$http','$log',function($http,$log)
{
      return {
        all: function($EventID) {
          // Return promise (async callback)
          return $http.get("http://podargroup.com/SparkleMedia/getDataFromServer.php?getType=GetVideos&eventID="+$EventID);
            
        }
        
      };
   
     
     
}])

.service('EventImageService',['$http','$log',function($http,$log)
{
    
    /*var images = [
        {
            id:0,
            src:"http://dreamwood.in/images/team/shaikh.jpg"
        },
        {
            id:1,
            src:"http://dreamwood.in/images/team/Devendra.jpg"
        },
        {
            id:2,
            src:"http://dreamwood.in/images/team/Swapnil.jpg"
        },
        {
            id:3,
            src:"http://dreamwood.in/images/team/Atin.jpg"
        },
        {
            id:4,
            src:"http://dreamwood.in/images/team/arun.jpg"
        },
        {
            id:5,
            src:"http://dreamwood.in/images/team/dix.jpg"
        },
        {
            id:6,
            src:"http://dreamwood.in/images/team/priti.jpg"
        }
       
    ];*/
    var images;
    return {
    all: function($EventID) {
     $http.get("http://podargroup.com/SparkleMedia/getDataFromServer.php?getType=GetImages&eventID="+$EventID).then(function(result){
       images = result.data;
       //console.log(images[0].src);
     });
      
      
      return $http.get("http://podargroup.com/SparkleMedia/getDataFromServer.php?getType=GetImages&eventID="+$EventID);
      
      return images;
    },
    get: function(imageId) {
      
      console.log(images);
      
      for (var i = 0; i < images.length; i++) {
        if (images[i].id == imageId) {
          
          console.log(imageId);
          return images[i].src;
        }
      }
      return null;
    }
  };
      /*return {
        all: function($EventID) {
          // Return promise (async callback)
          return $http.get("http://dreamwood.in/getDataFromServer.php?getType=GetImages&eventID="+$EventID);
            
        }  
      };
   */
     
     
}])


.service('OfferService',['$http','$log',function($http,$log)
{
      return {
        all: function() {
          // Return promise (async callback)
          return $http.get("http://podargroup.com/SparkleMedia/getDataFromServer.php?getType=GetServiceList");
            
        }  
      };
   
     
     
}])