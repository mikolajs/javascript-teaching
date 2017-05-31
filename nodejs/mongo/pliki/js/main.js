   function getList(){
     var xmlhttp = new XMLHttpRequest();
     var url = "/all";

     xmlhttp.onreadystatechange = function() {
      //  console.log("reolad");
       if (this.readyState == 4 && this.status == 200) {
         //console.log("ready");
         var articles = JSON.parse(this.responseText);
         insertArticles(articles);
         //console.log(this.responseText);
         if(articles.length > 0){
           getOneArticle(articles[0]._id);
         }
       } else {
        //  console.log("not ready status: " + this.status)
       };
     };
     xmlhttp.open("GET", url, true);
     xmlhttp.send();
   }
   function insertArticles(obj) {
     var data = "";
     for(var i = 0; i < obj.length; i++){
       data += '<li onclick="getOneArticle(\'' + obj[i]._id.toString() + '\')">';
       data +=  obj[i].title;
       data += '</li>';
     }
     //console.log(data);
     document.getElementById("list").innerHTML = data;
   }
   function getOneArticle(id){
     var xmlhttp = new XMLHttpRequest();
     var url = "/one/" + id;

     xmlhttp.onreadystatechange = function() {
       //console.log("reolad");
       if (this.readyState == 4 && this.status == 200) {
         //console.log("ready");
         var article = JSON.parse(this.responseText);
         if(article) {
           document.getElementById('article').innerHTML = article.body;
           document.getElementById('title').innerHTML = article.title;
           document.getElementById('editBtn').setAttribute("name", article._id);
           document.getElementById('delBtn').setAttribute("name", article._id);
         } else
           document.getElementById('title').innerHTML = "Brak artykuł";
         //console.log(this.responseText);
       } else {
         //console.log("not ready status: " + this.status)
       };
     };
     xmlhttp.open("GET", url, true);
     xmlhttp.send();

   }
   function saveArticle(){
     console.log("save clicked");
     var xmlhttp = new XMLHttpRequest();
     var id = document.getElementById("id").value;
     //console.log("id is: " + id);
     if(id.length < 1) id ="0";
     var url = "/add/" + id;
     var body = document.getElementById('editor').value;
     var title = document.getElementById('titleEdit').value;
     var params = "title=" + title + "&body=" + body;
     xmlhttp.onreadystatechange = function() {
       //console.log("reolad");
       if (this.readyState == 4 && this.status == 200) {
        setTimeout(function(){getList();},1000);
        //console.log("saved with success");
       } else {
         //console.log("not ready status: " + this.status)
       };
     };
     xmlhttp.open("POST", url, true);
     xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
     xmlhttp.send(params);

   }
   function delArticle(elem){
     var id = elem.getAttribute('name');
     var xmlhttp = new XMLHttpRequest();
     var url = "/del/" + id;

     xmlhttp.onreadystatechange = function() {
       //console.log("reolad");
       if (this.readyState == 4 && this.status == 200) {
        setTimeout(function(){getList();},1000);

       } else {
         //console.log("not ready status: " + this.status)
       };
     };
     xmlhttp.open("GET", url, true);
     xmlhttp.send();

   }

   function editArticle(elem){
     var id = elem.getAttribute('name');
     //console.log('id edit: ' + id);
     document.getElementById('editor').value =
      document.getElementById('article').innerHTML;
    document.getElementById('titleEdit').value =
     document.getElementById('title').innerHTML;
     document.getElementById('id').value = id;
   }
   function clearArticle(){
     document.getElementById('editor').value = "";
     document.getElementById('titleEdit').value = "";
     document.getElementById('id').value = "0";
   }

getList();
