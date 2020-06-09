jQuery(document).ready(function() {

    $(".deletePage").click(function(e) {

        var pageId = $(this).data("pageid"),
            hitURL = baseURL + "delete-page",
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
                    data : { pageId : pageId } 
                    }).done(function(data){
                        if(data.status == true) { 
                            currentRow.parents('tr').remove();
                            swal("Deleted!", "Your Page has been deleted.", "success");
                        }
                        else if(data.status = false) { swal("Failed!", "Your Page has been not deleted.", "error"); }
                        else { swal("Information!", "Access denied..!", "info"); }
                    });

                }

            });
    });

    
});


    