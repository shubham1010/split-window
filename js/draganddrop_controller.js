class DraganddropController extends Stimulus.Controller {

  dragStart(event) {

    var dropTargets
    var acceptableDropLeft = document.querySelector(".thumbnailsleft")
    var acceptableDropRight = document.querySelector(".thumbnailsright")


    //dropTargets = [acceptableDropLeft, acceptableDropRight]
    dropTargets = [acceptableDropRight, acceptableDropLeft]

    var acceptableDropList = ['ARTICLE', 'IMG','A']

    var ghostElement = document.createElement("div")
    ghostElement.className = "ghost"
    ghostElement.innerHTML = "Drop Here"

    event.target.style.opacity = 0.4
    event.dataTransfer.setData("elementId", this.data.get("id"))

    dropTargets.forEach(elem=> {
    
      elem.addEventListener("dragend", (event) => {
        event.target.style.opacity = 1
        setTimeout(() => {
          if (ghostElement.parentNode) {
            ghostElement.parentNode.removeChild(ghostElement)
          }
        }, 100)
      })

      elem.addEventListener("dragover", (event)=> {
        event.preventDefault()
        if (acceptableDropList.indexOf(event.target.nodeName) != -1) {

          // delete all ghost elements
          if (Number(document.querySelectorAll(".ghost").length) > 0) {
            var ele = document.querySelectorAll(".ghost")
            if (ele) {
              for(var i=0; i<ele.length; i++) {
                ele[i].remove()
              }
            }
          }

          var className = elem.getAttribute("class")
          className = '.' + className

          var article = document.querySelector(className)
          var cList = article.childNodes
          var inserted = false


          if(!cList) {
            elem.appendChild(ghostElement)
            return
          }

          for(var i=0; i<cList.length; i++) {
            var childPos = cList[i].offsetLeft
            var parentPos = event.target.offsetLeft
            if (event.offsetX < childPos-parentPos) {
              //event.target.insertBefore(ghostElement, cList[i])
              elem.insertBefore(ghostElement, cList[i])
              inserted = true
              break
            }
          }

          if (!inserted) elem.appendChild(ghostElement)
        }
      })

      elem.addEventListener("drop", (event) => {
        var elementId = event.dataTransfer.getData("elementId")
        var draggedElement = document.querySelector('[data-draganddrop-id="'+ elementId + '"]')

        var mainElement = document.getElementById(elementId)
        if (ghostElement.parentNode) {
          
          var insertionSide

          if(ghostElement.parentNode.getAttribute("class") == "thumbnailsleft") {
            insertionSide = document.querySelector(".ourleft")
          }
          else {
            insertionSide = document.querySelector(".ourright")
          }

  

          ghostElement.parentNode.insertBefore(draggedElement, ghostElement)


          if (draggedElement.nextElementSibling.nextElementSibling) {
            var nextElementId = draggedElement.nextElementSibling.nextElementSibling.getAttribute("data-draganddrop-id")
            insertionSide.insertBefore(mainElement, document.getElementById(nextElementId))
         }
         else {
          insertionSide.appendChild(mainElement)
         }

       }

        event.preventDefault()
      })

    })

  }
}


application.register("draganddrop", DraganddropController)
