jQuery(document).ready(function ($) {
  get_cat_breeds("#cats");

  /**
   * todo: This will collect all cat breeds and append it to html select tag options
   * @param {*} element_id
   */
  function get_breeds(element_id) {
    $.ajax({
      url: "https://api.thecatapi.com/v1/breeds",
      type: "GET",
      dataType: "json", // added data type
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

  function show_cat(id, name) {
    $("#cats").on("change", function () {
      alert(this.value);
    });
  }
});
