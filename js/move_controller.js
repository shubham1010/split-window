
class MoveController extends Stimulus.Controller {
  toTop() {
    alert("Working under process...")
  }
}

application.register("move", MoveController)
