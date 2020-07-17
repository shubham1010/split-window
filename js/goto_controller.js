class GotoController extends Stimulus.Controller {
 
  gotoLink() {
    let ele = document.getElementById(this.data.get("link"))
    ele.scrollIntoView({behavior:"smooth", block:"center"})
  }
}

application.register('goto', GotoController)
