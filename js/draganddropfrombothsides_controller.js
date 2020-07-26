class DraganddropfrombothsidesController extends Stimulus.Controller {


  connect() {
    console.log("From both side connect method..")
  }

  dragStart(event) {
    var dropTarget = document.querySelector(".main");
    if (event.target.id) {
      event.dataTransfer.setData("srcId",event.target.id);
    }
    else {
      event.dataTransfer.setData("srcId",this.data.get("id"))
    }

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

      let leftHeader = document.querySelector(".thumbnailsleft")
      let rightHeader = document.querySelector(".thumbnailsright")
      var spanEle = document.querySelectorAll("span")
     
      var thumbnailId = 0
      for(var i=0; i<spanEle.length; i++) {
        if(spanEle[i].getAttribute("data-draganddrop-id") == srcId) {
          thumbnailId = i
          break
        }
          
      }

      if (droppable11 || droppable12) { // left side drop
        if(leftHeader.childNodes.length === 0) {
          leftHeader.appendChild(spanEle[thumbnailId])
        }
        else {
          const allLeftSpan = leftHeader.querySelectorAll("span")
          for(var lhPos=0; lhPos<allLeftSpan.length; lhPos++) {
            if (Number(allLeftSpan[lhPos].getAttribute("data-draganddrop-id")) > Number(spanEle[thumbnailId].getAttribute("data-draganddrop-id"))) {
              break
            }

          }
          if (lhPos == allLeftSpan.length) {
          
            leftHeader.appendChild(spanEle[thumbnailId])
          }
          else {
            leftHeader.insertBefore(spanEle[thumbnailId], leftHeader.childNodes[lhPos+1])
          }
          
        }

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

      else if (droppable21 || droppable22) { // right side drop
        if(rightHeader.childNodes.length === 1) {
          rightHeader.appendChild(spanEle[thumbnailId])
        }
        else {
          const allRightSpan = rightHeader.querySelectorAll("span")
          for(var rhPos=0; rhPos<allRightSpan.length; rhPos++) {

           if(Number(allRightSpan[rhPos].getAttribute("data-draganddrop-id")) > Number(spanEle[thumbnailId].getAttribute("data-draganddrop-id"))) {
            break;
           }

          }
          if (rhPos == allRightSpan.length) {
            rightHeader.appendChild(spanEle[thumbnailId])
          }
          else {
            rightHeader.insertBefore(spanEle[thumbnailId], rightHeader.childNodes[rhPos+1])
          }
          
        }


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
}

application.register("draganddropfrombothsides", DraganddropfrombothsidesController)
