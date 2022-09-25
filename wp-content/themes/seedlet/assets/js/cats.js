jQuery(document).ready(function ($) {
  get_cat_breeds("#cats");

  /**
   * todo: This will collect all cat breeds and append it to html select tag options
   * @param {*} element_id
   */
  function get_cat_breeds(element_id) {
    $.ajax({
      url: "https://api.thecatapi.com/v1/breeds",
      type: "GET",
      dataType: "json",
      success: function (cats) {
        console.log(cats);
        $.each(cats, function (index, d) {
          console.log(index, d.name);
          let catname = d.name;
          let cat_id = d.id;
          $(element_id).append($("<option>", { value: cat_id, text: catname }));
        });
      },
    });
  }

  $("#cats").on("change", function () {
    localStorage.setItem("current_cat_selected", this.value);
    $.ajax({
      url:
        "https://api.thecatapi.com/v1/images/search?page=1&limit=10&breed_id=" +
        this.value,
      type: "GET",
      dataType: "json",
      success: function (cats) {
        var collected_cats = "";
        $.each(cats, function (index, d) {
          // Logic for adding rows after getting per 3 cats
          if (index % 3 == 0) {
            collected_cats += '<div class="row">';
          }

          collected_cats +=
            '<div class="col-md-4 col-sm-6 col-12"><div class="card"><img class="card-img-top" src="' +
            d.url +
            '"><div class="card-body"><button class="btn btn-primary btn-block view-cat" data-url="' +
            d.id +
            '">View details</button></div></div></div>';

          if (index % 3 == 2) collected_cats += "</div>";
        });
        $("#cats-wrapper").html(collected_cats);

        $(".view-cat").click(function () {
          var cat_url = $(this).attr("data-url");
          // Store to localstorage so we can reference what
          // image of cat we are viewing
          localStorage.setItem("cat_url", cat_url);
        });
      },
    });
  });
});
