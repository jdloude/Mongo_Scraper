$("#new-comment").on("click", function (e) {
  const id = $(this).data("id")
  const text = $("#com-text").val().trim()
  $.ajax({
    url: `/submit/${id}`,
    method: "POST",
    data: {
      text: text
    }
  }).done(data => {
    if(data != "not saved")  createComCard(data)
  })
})

$(".show").on("click", function (e) {
  const id = $(this).data("id")
  $.ajax({
    url: `/getCom/${id}`,
    method: "GET"
  }).done(data => {
    $(".prevCom").empty()
    data.forEach(com => {
      createComCard(com)
    })
    $("#new-comment").data("id", id)
    $("#comments").modal("show")
  })
})

$(".prevCom").on("click", ".remove", function (e) {
  const id = $(this).data("id")
  $.ajax({
    url: `/noteDel/${id}`,
    method: "DELETE"
  }).done(data => {
    $(this).closest('.card').remove()
  })
})

function createComCard(obj) {
  const card = $("<div>").addClass("card mb-2")
  const cardBody = $("<div>").addClass("card-body").text(obj.text)
  $("<button>").addClass("remove btn btn-secondary float-right").data("id", obj._id).text("x").appendTo(cardBody)
  card.append(cardBody).appendTo(".prevCom")
}