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
        $.each(cats, function (index, d) {
          let catname = d.name;
          let cat_id = d.id;
          $(element_id).append($("<option>", { value: cat_id, text: catname }));
        });
      },
    });
  }

  function show_catDetails() {
    $(".entry-content .form-group").hide();
    $(".entry-content #cats-wrapper").hide();
    let cat_url = localStorage.getItem("cat_url");
    $.ajax({
      url: "https://api.thecatapi.com/v1/images/" + cat_url,
      type: "GET",
      dataType: "json",
      success: function (cats) {
        $(".cat-img").attr("src", cats.url);

        $.each(cats.breeds, function (index, d) {
          $(".cat-name").text(d.name);
          $(".cat-origin").text(d.origin);
          $(".cat-temperament").text(d.temperament);
          $(".cat-description").text(d.description);
        });

        $(".cat-details").show();
      },
    });
  }

  function get_catBreedByName(catname) {
    $.ajax({
      url:
        "https://api.thecatapi.com/v1/images/search?page=1&limit=10&breed_id=" +
        catname,
      type: "GET",
      dataType: "json",
      success: function (cats) {
        var collected_cats = "";
        $.each(cats, function (index, d) {
          // Logic for adding rows after getting per 3 cat data
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
          // image of cat we are currently viewing
          localStorage.setItem("cat_url", cat_url);
          show_catDetails();
        });
      },
    });
  }

  $("#cats").on("change", function () {
    localStorage.setItem("current_cat_selected", this.value);
    get_catBreedByName(this.value);
  });

  $(".back-to-cats").click(function () {
    $(".cat-details").hide();
    $(".entry-content .form-group").show();
    $(".entry-content #cats-wrapper").show();
    let cat_name = localStorage.getItem("current_cat_selected");
    get_catBreedByName(cat_name);
  });
});
