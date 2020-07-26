class PushandpopController extends Stimulus.Controller {
  static get targets() {
    return ["rightsection", "leftsection", "leftheaders", "rightheaders"]
  }
 

  connect() {
    this.load()
  }


  load() {
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://shubham1010.github.io/jsonfiles/ex01.json')
    
    ourRequest.onload = ()=> {
      var data = JSON.parse(ourRequest.responseText)
      
      var id;
      var name;
      var imgurl;


      for(var i=0; i<data.length; i++) {
        id = data[i].id;
        imgurl = data[i].imgurl        
        const html = `<span draggable="true" data-controller="draganddrop" data-action="dragstart->draganddrop#dragStart" data-draganddrop-id="${id}"><a data-controller="goto" data-goto-link="${id}" data-action="click->goto#gotoLink"><img src=${imgurl} /></a></span>`

        this.leftheadersTarget.innerHTML += html
      }



      for(var i=0; i<data.length ; i++) {
        id = data[i].id;
        name = data[i].name;
        imgurl = data[i].imgurl


        const html = `<div id=${id} data-controller="draganddropfrombothsides" class="info" draggable="true" data-action="dragstart->draganddropfrombothsides#dragStart"><input type="checkbox"/><h2>${id}</h2><h2>${name}</h2><a target="_blank" href=${imgurl}><img src=${imgurl} /></a></div>`

        this.leftsectionTarget.innerHTML += html

      }


    };

    ourRequest.send()
  }


  pushFromLeft() {
    const allLeftDiv = this.leftsectionTarget.querySelectorAll("div")
    const allLeftSpan = this.leftheadersTarget.querySelectorAll("span")

    var IDs = this.getIDArray(allLeftDiv, "id");

    var counter = 0;
    for(var i=0 ; i<IDs.length ; i++) {
      counter += this.shiftToRightSelected(IDs[i], allLeftSpan[i]);
    }
    if (counter == 1) {
      alert(counter + " item is shifted from left section to right section");
    }
    else if (counter>1){
      alert(counter + " items are shifted from left section to right section");
    }

  }

  // shift selected item from left to right
  shiftToRightSelected(id, spanItem) {

    var item =  document.getElementById(id);
    var check = item.querySelector("input[type=checkbox]")
    if (check.checked) { // selected element found
      check.checked = false;
      this.adjustingRightSide(item, id, spanItem);
      return 1;
    }

    return 0;
  }

  adjustingRightSide(item, id, spanItem) {
    const allRightDiv = this.rightsectionTarget.querySelectorAll("div") ;

    var array = this.getIDArray(allRightDiv, "id");
    
    if (array.length == 1) {
      this.rightsectionTarget.appendChild(item);
      this.rightheadersTarget.appendChild(spanItem)
    }
    else {
      for(var position=0 ; position<array.length ; position++) {
        if (Number(array[position]) > Number(id)) {
          break;
        }
      }
      if (position === array.length) {
        this.rightheadersTarget.appendChild(spanItem)
        this.rightsectionTarget.appendChild(item);
      }
      else {
        this.rightsectionTarget.insertBefore(item, this.rightsectionTarget.childNodes[position+1]);
        this.rightheadersTarget.insertBefore(spanItem, this.rightheadersTarget.childNodes[position+1]);
      }
    }

  }


  popFromRight() {
    const allRightDiv = this.rightsectionTarget.querySelectorAll("div") ;

    const allRightSpan = this.rightheadersTarget.querySelectorAll("span")
    var IDs = this.getIDArray(allRightDiv, "id");
    var counter = 0;
    for(var i=0 ; i<IDs.length ; i++) {
      counter += this.shiftToLeftSelected(IDs[i], allRightSpan[i]);
    }
    if (counter == 1) {
      alert(counter + " item is shifted from right section to left section");
    }
    else if (counter>1){
      alert(counter + " items are shifted from right section to left section");
    }
  }


  // shift selected item from right to left
  shiftToLeftSelected(id, spanItem) {

    var item =  document.getElementById(id);
    var check = item.querySelector("input[type=checkbox]")
    if (check.checked) { // selected element found
      check.checked = false;
      this.adjustingLeftSide(item, id, spanItem);
      return 1;
    }

    return 0;
  }

  // maintaining the order when element moves from 
  // right side to left side
  adjustingLeftSide(item, id, spanItem) {
    const allLeftDiv = this.leftsectionTarget.querySelectorAll("div") ;

    var array = this.getIDArray(allLeftDiv, "id");

    if (array.length == 1) {
      this.leftsectionTarget.appendChild(item);
      this.leftheadersTarget.appendChild(spanItem);
    }
    else {
      for(var position=0 ; position<array.length ; position++) {
        if (Number(array[position]) > Number(id)) {
          break;
        }
      }
      if (position === array.length) {
        this.leftsectionTarget.appendChild(item);
        this.leftheadersTarget.appendChild(spanItem);
      }
      else {
        this.leftsectionTarget.insertBefore(item, this.leftsectionTarget.childNodes[position+1]);
        this.leftheadersTarget.insertBefore(spanItem, this.leftheadersTarget.childNodes[position+1]);
      }
    }
  }

  // getting array which contains ID's of items in given DOM element as parameter
  getIDArray(divs, attrName) {
    if (divs === null) {
      return [];
    }
    const array = [];
    for(var i=0; i<divs.length ; i++) {
      const id = divs[i].getAttribute(attrName);
      array.push(id);
    }
    return array;
  }

  downloadLeftItems(){  
    const allLeftDiv = this.leftsectionTarget.querySelectorAll("div")
    var jsonObject = this.getDataIntoArray(allLeftDiv);

    if (jsonObject.length === 0) {
      alert("Left section is empty, downloading cancelled");
      return
    }


    var string = JSON.stringify(jsonObject)
    string = this.modifyString(string)
    this.download("leftsection.json", string)

  }  

  modifyString(string) {
    var newstring = ""
    var index = 0
    while (index < string.length) {
      if (string[index]==='{') {
        newstring += '\n'
        newstring += string[index]
        newstring += "\n    "
      }
      else if (string[index]==='}') {
        newstring += '\n'
        newstring += string[index]
      }
      else if(string[index]===',' && string[index+1]==='"') {
        newstring += string[index]
        newstring += "\n    "
      }
      else if (string[index]===']') {
        newstring += '\n'
        newstring += string[index]
      }
      else{
        newstring += string[index]
      }
      index += 1
    }
    return newstring 

  }

  downloadRightItems(){
    const allRightDiv = this.rightsectionTarget.querySelectorAll("div")
    var jsonObject = this.getDataIntoArray(allRightDiv);
    if (jsonObject.length === 0) {
      alert("Right section is empty, downloading cancelled");
      return
    }

    var string = JSON.stringify(jsonObject)
    string = this.modifyString(string)
    this.download("rightsection.json", string)

  }

  getDataIntoArray(section) {
    var array = []
    var string = ""
    for(var i=0; i<section.length; i++) {
      const node = section[i].childNodes
      var id = parseInt(node[1].innerHTML)
      var name = node[2].innerHTML
      var imgurl = node[3].href

      array.push({
      "id":id, 
      "name":name, 
      "imgurl":imgurl
      })
      
    }
    return array
  }


  download(filename, text) {
    var element = document.createElement('a') 
    element.style.display = 'none'

    element.setAttribute('href','data:text/json;charset=utf-8,'+ encodeURIComponent(text))

    element.setAttribute("download", filename)
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
  }

}

const application = Stimulus.Application.start()
application.register('pushandpop', PushandpopController)

