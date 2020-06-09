jQuery(document).ready(function() {

    $(".deleteSlider").click(function(e) {

        var sliderId = $(this).data("sliderid"),
            hitURL = baseURL + "delete-slider",
            currentRow = $(this);

            swal({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                type: "warning",
                showCancelButton: !0,
                confirmButtonText: "Yes, delete it!"
            }).then(function(e) {

                if(e.value == true){

                    jQuery.ajax({
                    type : "POST",
                    dataType : "json",
                    url : hitURL,
                    data : { sliderId : sliderId } 
                    }).done(function(data){
                        if(data.status == true) { 
                            currentRow.parents('tr').remove();
                            swal("Deleted!", "Your Slider has been deleted.", "success");
                        }
                        else if(data.status = false) { swal("Failed!", "Your Slider has been not deleted.", "error"); }
                        else { swal("Information!", "Access denied..!", "info"); }
                    });

                }

            });
    });

    
});


    