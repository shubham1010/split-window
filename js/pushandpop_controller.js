class PushandpopController extends Stimulus.Controller {
  static get targets() {
    return ["rightsection", "leftsection", "leftbutton", "rightbutton"]
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

      for(var i=0; i<data.length ; i++) {
        id = data[i].id;
        name = data[i].name;
        imgurl = data[i].imgurl


        const html = `<div id=${id} class="info" draggable="true" data-action="dragstart->pushandpop#dragStart"><input type="checkbox"/><h2>${id}</h2><h2>${name}</h2><a target="_blank" href=${imgurl}><img src=${imgurl} /></a></div>`

        this.leftsectionTarget.innerHTML += html

      }


    };

    ourRequest.send()
  }

  pushFromLeft() {
    const allLeftDiv = this.leftsectionTarget.querySelectorAll("div")

    var IDs = this.getIDArray(allLeftDiv);

    var counter = 0;
    for(var i=0 ; i<IDs.length ; i++) {
      counter += this.shiftToRightSelected(IDs[i]);
    }
    if (counter == 1) {
      alert(counter + " item is shifted from left section to right section");
    }
    else if (counter>1){
      alert(counter + " items are shifted from left section to right section");
    }

  }

  // shift selected item from left to right
  shiftToRightSelected(id) {

    var item =  document.getElementById(id);
    var check = item.querySelector("input[type=checkbox]")
    if (check.checked) { // selected element found
      check.checked = false;
      this.adjustingRightSide(item, id);
      return 1;
    }

    return 0;
  }

  adjustingRightSide(item, id) {
    const allRightDiv = this.rightsectionTarget.querySelectorAll("div") ;

    var array = this.getIDArray(allRightDiv);

    if (array.length == 1) {
      this.rightsectionTarget.appendChild(item);
    }
    else {
      for(var position=0 ; position<array.length ; position++) {
        if (Number(array[position]) > Number(id)) {
          break;
        }
      }
      if (position === array.length) {
        this.rightsectionTarget.appendChild(item);
      }
      else {
        this.rightsectionTarget.insertBefore(item, this.rightsectionTarget.childNodes[position+1]);
      }
    }

  }

  popFromRight() {
    const allRightDiv = this.rightsectionTarget.querySelectorAll("div") ;

    var IDs = this.getIDArray(allRightDiv);
    var counter = 0;
    for(var i=0 ; i<IDs.length ; i++) {
      counter += this.shiftToLeftSelected(IDs[i]);
    }
    if (counter == 1) {
      alert(counter + " item is shifted from right section to left section");
    }
    else if (counter>1){
      alert(counter + " items are shifted from right section to left section");
    }
  }


  // shift selected item from right to left
  shiftToLeftSelected(id) {

    var item =  document.getElementById(id);
    var check = item.querySelector("input[type=checkbox]")
    if (check.checked) { // selected element found
      check.checked = false;
      this.adjustingLeftSide(item, id);
      return 1;
    }

    return 0;
  }

  // maintaining the order when element moves from 
  // right side to left side
  adjustingLeftSide(item, id) {
    const allLeftDiv = this.leftsectionTarget.querySelectorAll("div") ;

    var array = this.getIDArray(allLeftDiv);

    if (array.length == 1) {
      this.leftsectionTarget.appendChild(item);
    }
    else {
      for(var position=0 ; position<array.length ; position++) {
        if (Number(array[position]) > Number(id)) {
          break;
        }
      }
      if (position === array.length) {
        this.leftsectionTarget.appendChild(item);
      }
      else {
        this.leftsectionTarget.insertBefore(item, this.leftsectionTarget.childNodes[position+1]);
      }
    }
  }

  // getting array which contains ID's of items in given DOM element as parameter
  getIDArray(divs) {
    if (divs === null) {
      return [];
    }
    const array = [];
    for(var i=0; i<divs.length ; i++) {
      const id = divs[i].getAttribute("id");
      array.push(id);
    }
    return array;
  }

  dragStart(event) {
    var dropTarget = document.querySelector(".main");
    event.dataTransfer.setData("srcId",event.target.id);

    dropTarget.addEventListener("dragover", (event)=> {
      event.preventDefault();
    })

    dropTarget.addEventListener("drop", (event) => {
      let target = event.target;
      let srcId = event.dataTransfer.getData("srcId");
      event.preventDefault();

      // possible region to drop item
      let droppable11 = target.classList.contains("left");
      let droppable12 = target.classList.contains("ourleft");
      let droppable21 = target.classList.contains("right");
      let droppable22 = target.classList.contains("ourright");

      // getting leftsection and rightsection target element using class
      let leftside = document.querySelector(".ourleft");
      let rightside = document.querySelector(".ourright");
     
      
      if (droppable11 || droppable12) { // left side drop

        if (leftside.childNodes.length === 1) {
          leftside.appendChild(document.getElementById(srcId));
        }
        else {

          const allLeftDiv = leftside.querySelectorAll("div") ;
          const array = [];
          for(var i=0; i<allLeftDiv.length ; i++) {
            const id = allLeftDiv[i].getAttribute("id");
            array.push(id);
          }

          if (array.length === 1) {
            leftside.appendChild(document.getElementById(srcId));
          }
          else {
            for(var position=0 ; position<array.length ; position++) {
              if (Number(array[position]) > Number(srcId)) {
                break;
              }
            }
            if (position === array.length) {
              leftside.appendChild(document.getElementById(srcId));
            }
            else {
              leftside.insertBefore(document.getElementById(srcId), leftside.childNodes[position+1]);
            }
          }

        }
      }


      if (droppable21 || droppable22) { // right side drop
        if(rightside.childNodes.length === 1) {
        rightside.appendChild(document.getElementById(srcId));
        }
        else {
          const allRightDiv = rightside.querySelectorAll("div") ;
          const array = [];
          for(var i=0; i<allRightDiv.length ; i++) {
            const id = allRightDiv[i].getAttribute("id");
            array.push(id);
          }


          if (array.length === 1) {
            rightside.appendChild(document.getElementById(srcId));
          }
          else {
            for(var position=0 ; position<array.length ; position++) {
              if (Number(array[position]) > Number(srcId)) {
                break;
              }
            }
            if (position === array.length) {
              rightside.appendChild(document.getElementById(srcId));
            }
            else {
              rightside.insertBefore(document.getElementById(srcId), rightside.childNodes[position+1]);
            }
          }
        }
      }

    })

  }

  downloadLeftItems(){  
    console.log("Downloading left items...")
    const allLeftDiv = this.leftsectionTarget.querySelectorAll("div")
    var jsonObject = this.getDataIntoArray(allLeftDiv);

    if (jsonObject.length === 0) {
      alert("Left section is empty, downloading cancelled");
      return
    }


    var string = JSON.stringify(jsonObject)
    console.log(string)
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
    console.log("Downloading right items...")
    const allRightDiv = this.rightsectionTarget.querySelectorAll("div")
    var jsonObject = this.getDataIntoArray(allRightDiv);
    if (jsonObject.length === 0) {
      alert("Right section is empty, downloading cancelled");
      return
    }

    var string = JSON.stringify(jsonObject)
    console.log(string)
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

